import browser, { Tabs } from 'webextension-polyfill';

import { canInjectScript } from '~/utils/browser/browser';

const injectedTabIds = new Set<number>();

main();

export async function main() {
  registerContentScriptInjectListeners();
  await injectContentScriptIntoExistingTabs();
}

function registerContentScriptInjectListeners() {
  browser.tabs.onCreated.addListener(async (tab) => {
    await injectContentScript(tab);
  });

  browser.tabs.onUpdated.addListener(async (_tabId, _changeInfo, tab) => {
    await injectContentScript(tab);
  });
}

async function injectContentScriptIntoExistingTabs() {
  const existingTabs = await browser.tabs.query({});

  const injectPromises = existingTabs.map(async (tab) => {
    await injectContentScript(tab);
  });

  await Promise.all(injectPromises);
}

async function injectContentScript(tab: Tabs.Tab) {
  if (!tab.id || injectedTabIds.has(tab.id)) {
    return;
  }

  if (!tab.url || !canInjectScript(tab.url)) {
    return;
  }

  injectedTabIds.add(tab.id);

  await browser.scripting.executeScript({
    target: { tabId: tab.id, allFrames: true },
    files: ['content.js'],
  });
}
