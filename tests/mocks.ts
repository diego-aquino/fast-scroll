import { Browser } from 'webextension-polyfill';

export function createBrowserMock() {
  const browserMock = {
    storage: {
      onChanged: { addListener: jest.fn() },
      sync: { get: jest.fn(), set: jest.fn() },
    },
  };

  return browserMock as unknown as Browser;
}
