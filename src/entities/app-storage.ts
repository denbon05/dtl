import type { AppStorageKeys } from '@/types/browser-storage';

/** Application browser storage type safe interface */
class AppStorage {
  getItem = (key: AppStorageKeys) => localStorage.getItem(key);

  setItem = (key: AppStorageKeys, value: string) =>
    localStorage.setItem(key, value);
}

export default new AppStorage();
