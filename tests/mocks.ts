import { Browser } from 'webextension-polyfill';

export function createBrowserMock() {
  const browserMock = {
    storage: {
      onChanged: {
        addListener: jest.fn(),
      },
      sync: {
        get: jest.fn().mockReturnValue({}),
        set: jest.fn(),
      },
    },
  };

  return browserMock as unknown as Browser;
}

export function createMockedElementAndAppendToBody() {
  const scrollByMock = jest.fn();
  window.HTMLElement.prototype.scrollBy = scrollByMock;

  const element = document.createElement('div');
  document.body.appendChild(element);

  return { element, scrollByMock };
}
