import { fireEvent } from '@testing-library/dom';

import config from '~/config/config';
import { createMockedElementAndAppendToBody } from '~/tests/mocks';

import { main } from '../content';

describe('Content script', () => {
  beforeEach(async () => {
    window.HTMLElement.prototype.scrollBy = jest.fn();

    await main();
  });

  it('should load config and attach a wheel event listener', async () => {
    const configLoadFromStorageMock = jest.fn();
    config.loadFromStorage = configLoadFromStorageMock;

    const windowAddEventListenerMock = jest.fn();
    window.addEventListener = windowAddEventListenerMock;

    await main();

    expect(configLoadFromStorageMock).toHaveBeenCalled();
    expect(windowAddEventListenerMock).toHaveBeenCalledWith('wheel', expect.any(Function), { passive: false });
  });

  it('should fast scroll an element vertically, after a wheel event with alt key pressed', () => {
    const { element, scrollByMock } = createMockedElementAndAppendToBody();

    const scrollDeltaY = 100;

    fireEvent(
      element,
      new WheelEvent('wheel', {
        altKey: true,
        bubbles: true,
        deltaY: scrollDeltaY,
      }),
    );

    expect(scrollByMock).toHaveBeenCalledWith(0, scrollDeltaY * config.scrollSpeedMultiplier());
  });

  it('should fast scroll an element horizontally, after a wheel event with alt and shift keys pressed', () => {
    const { element, scrollByMock } = createMockedElementAndAppendToBody();

    const scrollDeltaY = 100;

    fireEvent(
      element,
      new WheelEvent('wheel', {
        altKey: true,
        shiftKey: true,
        bubbles: true,
        deltaY: scrollDeltaY,
      }),
    );

    expect(scrollByMock).toHaveBeenCalledWith(scrollDeltaY * config.scrollSpeedMultiplier(), 0);
  });

  it('should not fast scroll an element after a wheel event with no alt key pressed', () => {
    const { element, scrollByMock } = createMockedElementAndAppendToBody();

    fireEvent(
      element,
      new WheelEvent('wheel', {
        altKey: false,
        bubbles: true,
      }),
    );

    expect(scrollByMock).not.toHaveBeenCalled();
  });

  it('should not fast scroll an element after a wheel event with ctrl key pressed', () => {
    const { element, scrollByMock } = createMockedElementAndAppendToBody();

    fireEvent(
      element,
      new WheelEvent('wheel', {
        altKey: true,
        ctrlKey: true,
        bubbles: true,
      }),
    );

    expect(scrollByMock).not.toHaveBeenCalled();

    fireEvent(
      element,
      new WheelEvent('wheel', {
        altKey: false,
        ctrlKey: true,
        bubbles: true,
      }),
    );

    expect(scrollByMock).not.toHaveBeenCalled();
  });

  it('should not fast scroll an element after a prevented wheel event', () => {
    const { element, scrollByMock } = createMockedElementAndAppendToBody();

    const wheelEvent = new WheelEvent('wheel', {
      altKey: true,
      bubbles: true,
      cancelable: true,
    });
    wheelEvent.preventDefault();

    fireEvent(element, wheelEvent);

    expect(scrollByMock).not.toHaveBeenCalled();
  });
});
