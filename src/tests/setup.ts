import type { Browser } from 'webextension-polyfill';

import { createBrowserMock } from './mocks/browser';

import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace global {
  let browser: Browser;
}

global.browser = createBrowserMock();
