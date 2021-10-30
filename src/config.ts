import browser from 'webextension-polyfill';

enum StorageKeys { // eslint-disable-line no-shadow
  scrollSpeedMultiplier = 'scrollSpeedMultiplier',
}

class Config {
  private static DEFAULT_SCROLL_SPEED_MULTIPLIER = 3;

  private _scrollSpeedMultiplier = Config.DEFAULT_SCROLL_SPEED_MULTIPLIER;
  hasBeenLoaded = false;

  constructor() {
    browser.storage.onChanged.addListener((changes) => {
      Object.entries(changes).forEach(([key, { newValue }]) => {
        if (key in this) {
          this[key as keyof this] = newValue;
        }
      });
    });
  }

  get scrollSpeedMultiplier(): number {
    return this._scrollSpeedMultiplier;
  }

  private set scrollSpeedMultiplier(multiplier: number) {
    this._scrollSpeedMultiplier = multiplier;
  }

  async setScrollSpeedMultiplier(multiplier: number) {
    this.scrollSpeedMultiplier = multiplier;

    await browser.storage.sync.set({
      [StorageKeys.scrollSpeedMultiplier]: multiplier,
    });
  }

  async loadFromStorage() {
    const { [StorageKeys.scrollSpeedMultiplier]: scrollSpeedMultiplier } =
      await browser.storage.sync.get([StorageKeys.scrollSpeedMultiplier]);

    Object.assign(this, {
      scrollSpeedMultiplier:
        scrollSpeedMultiplier ?? this.scrollSpeedMultiplier,
    });

    this.hasBeenLoaded = true;
  }
}

const config = new Config();

export default config;
