import { Storage } from 'webextension-polyfill';

import { Config, StorageKeys } from '~/config/config';

describe('Config', () => {
  let config: Config;

  beforeEach(() => {
    config = new Config();
  });

  it('should not be loaded on initialization', () => {
    expect(config.hasBeenLoaded).toBe(false);
    expect(config.scrollSpeedMultiplier()).toBe(Config.DEFAULT_SCROLL_SPEED_MULTIPLIER);
  });

  it('should support to be loaded from storage', async () => {
    const preferencesSaveOnStorage: { [StorageKey in StorageKeys]: unknown } = {
      SCROLL_SPEED_MULTIPLIER: 5,
    };

    const mockStorageSyncGet = jest.fn();
    mockStorageSyncGet.mockImplementation((keys: string[]) => ({
      [StorageKeys.SCROLL_SPEED_MULTIPLIER]: keys.includes(StorageKeys.SCROLL_SPEED_MULTIPLIER)
        ? preferencesSaveOnStorage.SCROLL_SPEED_MULTIPLIER
        : undefined,
    }));
    browser.storage.sync.get = mockStorageSyncGet;

    await config.loadFromStorage();

    expect(config.hasBeenLoaded).toBe(true);
    expect(config.scrollSpeedMultiplier()).toBe(preferencesSaveOnStorage.SCROLL_SPEED_MULTIPLIER);
  });

  it('should update the internal scroll speed multiplier on storage change', () => {
    const onChangedListeners: ((changes: Record<string, Storage.StorageChange>) => void)[] = [];

    const mockOnChangedAddListener = jest.fn();
    mockOnChangedAddListener.mockImplementation((listener) => {
      onChangedListeners.push(listener);
    });
    browser.storage.onChanged.addListener = mockOnChangedAddListener;

    config = new Config();
    expect(config.scrollSpeedMultiplier()).toBe(Config.DEFAULT_SCROLL_SPEED_MULTIPLIER);

    const newScrollSpeedMultiplier = 20;

    onChangedListeners.forEach((listener) =>
      listener({
        [StorageKeys.SCROLL_SPEED_MULTIPLIER]: {
          newValue: newScrollSpeedMultiplier,
        },
      }),
    );

    expect(config.scrollSpeedMultiplier()).toBe(newScrollSpeedMultiplier);
  });

  it('should save scroll speed multipliers to storage', () => {
    const mockStorageSyncSet = jest.fn();
    browser.storage.sync.set = mockStorageSyncSet;

    const newScrollSpeedMultiplier = 20;

    config.setScrollSpeedMultiplier(newScrollSpeedMultiplier);

    expect(mockStorageSyncSet).toHaveBeenCalledWith({
      [StorageKeys.SCROLL_SPEED_MULTIPLIER]: newScrollSpeedMultiplier,
    });
  });
});
