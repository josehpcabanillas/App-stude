/**
 * Storage Provider Interface
 * Allows swapping between LocalStorage and Supabase without touching UI or business logic.
 */

export class IStorageProvider {
  async getItem(key) {
    throw new Error('Not implemented');
  }

  async setItem(key, value) {
    throw new Error('Not implemented');
  }

  async removeItem(key) {
    throw new Error('Not implemented');
  }

  async query(collectionName, filterFn) {
    throw new Error('Not implemented');
  }
}
