import type { Browser } from 'webextension-polyfill';

import { createBrowserMock } from './mocks';

import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace globalThis {
  let browser: Browser;
}

globalThis.browser = createBrowserMock();
