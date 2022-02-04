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
        if (key === StorageKeys.scrollSpeedMultiplier) {
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
      [StorageKeys.scrollSpeedMultiplier]: multiplier,
    });
  }

  async loadFromStorage() {
    const { [StorageKeys.scrollSpeedMultiplier]: scrollSpeedMultiplier } =
      await browser.storage.sync.get([StorageKeys.scrollSpeedMultiplier]);

    if (scrollSpeedMultiplier !== undefined) {
      this.setScrollSpeedMultiplier(scrollSpeedMultiplier);
    }

    this.hasBeenLoaded = true;
  }
}

const config = new Config();

export default config;
