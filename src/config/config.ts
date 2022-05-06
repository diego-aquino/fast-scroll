import browser from 'webextension-polyfill';

export enum StorageKeys { // eslint-disable-line no-shadow
  SCROLL_SPEED_MULTIPLIER = 'SCROLL_SPEED_MULTIPLIER',
}

export class Config {
  static DEFAULT_SCROLL_SPEED_MULTIPLIER = 3;

  private _scrollSpeedMultiplier = Config.DEFAULT_SCROLL_SPEED_MULTIPLIER;
  hasBeenLoaded = false;

  constructor() {
    browser.storage.onChanged.addListener((changes) => {
      Object.entries(changes).forEach(([key, { newValue }]) => {
        if (key === StorageKeys.SCROLL_SPEED_MULTIPLIER) {
          this.setScrollSpeedMultiplier(newValue);
        }
      });
    });
  }

  scrollSpeedMultiplier(): number {
    return this._scrollSpeedMultiplier;
  }

  async setScrollSpeedMultiplier(multiplier: number) {
    this._scrollSpeedMultiplier = multiplier;

    await browser.storage.sync.set({
      [StorageKeys.SCROLL_SPEED_MULTIPLIER]: multiplier,
    });
  }

  async loadFromStorage() {
    const storageResult = await browser.storage.sync.get([StorageKeys.SCROLL_SPEED_MULTIPLIER]);

    const { [StorageKeys.SCROLL_SPEED_MULTIPLIER]: scrollSpeedMultiplier } = storageResult;

    if (scrollSpeedMultiplier !== undefined) {
      this.setScrollSpeedMultiplier(scrollSpeedMultiplier);
    }

    this.hasBeenLoaded = true;
  }
}

const config = new Config();

export default config;
