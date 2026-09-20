import { IStorageProvider } from './IStorageProvider';

/**
 * LocalStorage implementation of IStorageProvider.
 * Returns Promises to simulate network/database latency if needed
 * and maintains exact compatibility with Supabase client wrappers.
 */
export class LocalStorageProvider extends IStorageProvider {
  constructor(prefix = 'stude_preu_') {
    super();
    this.prefix = prefix;
  }

  _getKey(key) {
    return `${this.prefix}${key}`;
  }

  async getItem(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(this._getKey(key));
      if (data === null) return defaultValue;
      return JSON.parse(data);
    } catch (err) {
      console.warn(`[Storage] Failed to read ${key}:`, err);
      return defaultValue;
    }
  }

  async setItem(key, value) {
    try {
      localStorage.setItem(this._getKey(key), JSON.stringify(value));
      return true;
    } catch (err) {
      console.error(`[Storage] Failed to write ${key}:`, err);
      return false;
    }
  }

  async removeItem(key) {
    try {
      localStorage.removeItem(this._getKey(key));
      return true;
    } catch (err) {
      return false;
    }
  }

  async query(collectionName, filterFn = null) {
    const list = await this.getItem(collectionName, []);
    if (!filterFn) return list;
    return list.filter(filterFn);
  }
}

// Default singleton instance ready for DI
export const storageProvider = new LocalStorageProvider();
