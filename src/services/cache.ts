/**
 * Simple in-memory cache service with localStorage persistence
 * Provides caching functionality with TTL (Time To Live) support
 */

interface CacheEntry<T = unknown> {
  data: T
  timestamp: number
}

export class CacheService {
  private cache: Map<string, CacheEntry>
  private defaultTTL: number
  private storageKey: string
  private useLocalStorage: boolean

  constructor(defaultTTL: number = 60 * 60 * 1000, useLocalStorage = true) { // 60 minutes default
    this.cache = new Map()
    this.defaultTTL = defaultTTL
    this.storageKey = 'dexfreight-api-cache'
    this.useLocalStorage = useLocalStorage

    if (useLocalStorage) {
      this.loadFromStorage()
    }

    // Start automatic cleanup
    this.startCleanupInterval()
  }

  /**
   * Load cache data from localStorage
   */
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.storageKey)

      if (stored) {
        const data = JSON.parse(stored)
        const now = Date.now()

        for (const [key, entry] of Object.entries(data)) {
          const cacheEntry = entry as CacheEntry

          if (now - cacheEntry.timestamp < this.defaultTTL) {
            this.cache.set(key, cacheEntry)
          }
        }
      }
    } catch (error) {
      console.warn('Error loading cache from storage:', error)
    }
  }

  /**
   * Save cache data to localStorage
   */
  private saveToStorage(): void {
    if (!this.useLocalStorage) return

    try {
      const data = Object.fromEntries(this.cache)

      localStorage.setItem(this.storageKey, JSON.stringify(data))
    } catch (error) {
      console.warn('Error saving cache to storage:', error)
    }
  }

  /**
   * Get cached data by key
   * @param key Cache key
   * @returns Cached data or null if not found/expired
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key)

    if (!entry) {
      return null
    }

    // Check if entry is expired
    if (Date.now() - entry.timestamp >= this.defaultTTL) {
      this.cache.delete(key)
      this.saveToStorage()

      return null
    }

    return entry.data as T
  }

  /**
   * Set cache data with key
   * @param key Cache key
   * @param data Data to cache
   */
  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    })
    this.saveToStorage()
  }

  /**
   * Check if a key exists and is not expired
   * @param key Cache key
   * @returns True if key exists and is valid
   */
  has(key: string): boolean {
    const entry = this.cache.get(key)

    if (!entry) {
      return false
    }

    // Check if expired
    if (Date.now() - entry.timestamp >= this.defaultTTL) {
      this.cache.delete(key)
      this.saveToStorage()

      return false
    }

    return true
  }

  /**
   * Delete a specific cache entry
   * @param key Cache key to delete
   */
  delete(key: string): boolean {
    const result = this.cache.delete(key)

    if (result) {
      this.saveToStorage()
    }

    return result
  }

  /**
   * Invalidate cache entries matching a pattern
   * @param pattern String pattern to match against keys
   */
  invalidatePattern(pattern: string): void {
    let deletedCount = 0

    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key)
        deletedCount++
      }
    }

    if (deletedCount > 0) {
      this.saveToStorage()
    }
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear()
    if (this.useLocalStorage) {
      localStorage.removeItem(this.storageKey)
    }
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
      ttl: this.defaultTTL,
      useLocalStorage: this.useLocalStorage
    }
  }

  /**
   * Remove expired entries from cache
   */
  clearExpired(): void {
    const now = Date.now()
    let deletedCount = 0

    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp >= this.defaultTTL) {
        this.cache.delete(key)
        deletedCount++
      }
    }

    if (deletedCount > 0) {
      this.saveToStorage()
    }
  }

  /**
   * Start automatic cleanup interval
   */
  private startCleanupInterval(): void {
    // Run cleanup every 60 minutes
    setInterval(() => {
      this.clearExpired()
    }, 60 * 60 * 1000)
  }

  /**
   * Create a cache key from an object
   * @param prefix Key prefix
   * @param params Object to serialize into key
   */
  static createKey(prefix: string, params?: unknown): string {
    if (!params) {
      return prefix
    }

    return `${prefix}-${JSON.stringify(params)}`
  }
}

// Create and export default cache instance
export const apiCache = new CacheService()

// Export utilities for easy access
export const cacheUtils = {
  clear: () => apiCache.clear(),
  clearPattern: (pattern: string) => apiCache.invalidatePattern(pattern),
  size: () => apiCache.getStats().size,
  keys: () => apiCache.getStats().keys,
  stats: () => apiCache.getStats()
}
