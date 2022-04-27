import { fireEvent } from '@testing-library/dom';

import config from '~/config/config';
import { createElementMock } from '~/tests/mocks/html';

import { handleWheelEvent, main } from '../content';

describe('Content script', () => {
  beforeEach(async () => {
    jest.spyOn(window, 'scrollBy').mockImplementation(() => {});
  });

  it('should load config and attach a wheel event listener', async () => {
    const configLoadFromStorage = jest.spyOn(config, 'loadFromStorage');
    const windowAddEventListener = jest.spyOn(window, 'addEventListener');

    await main();

    expect(configLoadFromStorage).toHaveBeenCalled();
    expect(windowAddEventListener).toHaveBeenCalledWith('wheel', handleWheelEvent, { passive: false });
  });

  it('should apply the scroll speed multiplier to an element, after a wheel event with the alt key pressed', async () => {
    await main();

    const element = createElementMock('div');

    const scrollDeltaX = 50;
    const scrollDeltaY = 100;

    fireEvent.wheel(element, {
      altKey: true,
      bubbles: true,
      deltaX: scrollDeltaX,
      deltaY: scrollDeltaY,
    });

    expect(window.scrollBy).toHaveBeenCalledWith(scrollDeltaX * config.scrollSpeedMultiplier(), 0);
    expect(window.scrollBy).toHaveBeenCalledWith(0, scrollDeltaY * config.scrollSpeedMultiplier());
  });

  it('should apply the scroll speed multiplier to an element, in the perpendicular axis, after a wheel event with the alt and shift keys pressed', async () => {
    await main();

    const element = createElementMock('div');

    const scrollDeltaX = 150;
    const scrollDeltaY = 75;

    fireEvent.wheel(element, {
      altKey: true,
      shiftKey: true,
      bubbles: true,
      deltaX: scrollDeltaX,
      deltaY: scrollDeltaY,
    });

    expect(window.scrollBy).toHaveBeenCalledWith(0, scrollDeltaX * config.scrollSpeedMultiplier());
    expect(window.scrollBy).toHaveBeenCalledWith(scrollDeltaY * config.scrollSpeedMultiplier(), 0);
  });

  it('should not fast scroll an element after a wheel event with no alt key pressed', async () => {
    await main();

    const element = createElementMock('div');

    fireEvent.wheel(element, {
      altKey: false,
      bubbles: true,
    });

    expect(window.scrollBy).not.toHaveBeenCalled();
  });

  it('should not fast scroll an element after a wheel event with ctrl key pressed', async () => {
    await main();

    const element = createElementMock('div');

    fireEvent.wheel(element, {
      altKey: true,
      ctrlKey: true,
      bubbles: true,
    });

    expect(window.scrollBy).not.toHaveBeenCalled();

    fireEvent.wheel(element, {
      altKey: false,
      ctrlKey: true,
      bubbles: true,
    });

    expect(window.scrollBy).not.toHaveBeenCalled();
  });

  it('should not fast scroll an element after a prevented wheel event', async () => {
    await main();

    const element = createElementMock('div');

    const wheelEvent = new WheelEvent('wheel', {
      altKey: true,
      bubbles: true,
      cancelable: true,
    });
    wheelEvent.preventDefault();

    fireEvent(element, wheelEvent);

    expect(window.scrollBy).not.toHaveBeenCalled();
  });

  it('should disable smooth scroll of an element, if present', async () => {
    const element = createElementMock('div');

    const setCSSProperty = jest.spyOn(CSSStyleDeclaration.prototype, 'setProperty');

    jest.spyOn(element, 'scrollHeight', 'get').mockReturnValue(100);
    jest.spyOn(element, 'clientHeight', 'get').mockReturnValue(50);

    jest.spyOn(window, 'getComputedStyle').mockImplementation(() => {
      return { scrollBehavior: 'smooth', overflowY: 'auto' } as CSSStyleDeclaration;
    });

    await main();

    const scrollDeltaX = 50;
    const scrollDeltaY = 100;

    fireEvent.wheel(element, {
      altKey: true,
      bubbles: true,
      deltaX: scrollDeltaX,
      deltaY: scrollDeltaY,
    });

    expect(setCSSProperty).toHaveBeenCalledWith('scroll-behavior', 'auto', 'important');

    expect(element.scrollBy).toHaveBeenCalledWith(0, scrollDeltaY * config.scrollSpeedMultiplier());
    expect(window.scrollBy).toHaveBeenCalledWith(scrollDeltaX * config.scrollSpeedMultiplier(), 0);
  });

  describe('Fast scroll in iframes', () => {
    const pageURL = 'https://example.com';

    beforeAll(() => {
      jest.spyOn(document, 'URL', 'get').mockReturnValue(pageURL);
    });

    function createIframeMock(iframeSourceURL: string) {
      const iframe = document.createElement('iframe');
      iframe.src = iframeSourceURL;

      jest.spyOn(iframe, 'addEventListener').mockImplementation((eventName, handler) => {
        if (eventName !== 'load') return;

        const loadEvent = new Event('load');
        (handler as EventListener)(loadEvent);
      });

      jest.spyOn(iframe, 'contentWindow', 'get').mockReturnValue({
        addEventListener: jest.fn(),
      } as unknown as Window);

      document.body.appendChild(iframe);

      return iframe;
    }

    it('should support fast scrolling same-origin iframes', async () => {
      const iframe = createIframeMock(pageURL);

      await main();

      expect(iframe.contentWindow?.addEventListener).toHaveBeenCalledWith('wheel', handleWheelEvent, {
        passive: false,
      });
    });

    it('should not fast scroll iframes with origins different from the page', async () => {
      const differentOriginURL = 'https://example-iframe.com';
      const iframe = createIframeMock(differentOriginURL);

      await main();

      expect(iframe.contentWindow?.addEventListener).not.toHaveBeenCalled();
    });
  });
});
