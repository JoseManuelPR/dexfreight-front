/**
 * Simple in-memory cache service
 * Provides caching functionality with TTL (Time To Live) support
 */

interface CacheEntry {
  data: any
  timestamp: number
}

export class CacheService {
  private cache: Map<string, CacheEntry>
  private defaultTTL: number

  constructor(defaultTTL: number = 5 * 60 * 1000) { // 5 minutes default
    this.cache = new Map()
    this.defaultTTL = defaultTTL
    
    // Start automatic cleanup
    this.startCleanupInterval()
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
      return null
    }

    return entry.data as T
  }

  /**
   * Set cache data with key
   * @param key Cache key
   * @param data Data to cache
   * @param ttl Optional TTL override (in milliseconds)
   */
  set(key: string, data: any, ttl?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    })
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
      return false
    }

    return true
  }

  /**
   * Delete a specific cache entry
   * @param key Cache key to delete
   */
  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  /**
   * Invalidate cache entries matching a pattern
   * @param pattern String pattern to match against keys
   */
  invalidatePattern(pattern: string): void {
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key)
      }
    }
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear()
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
      ttl: this.defaultTTL
    }
  }

  /**
   * Remove expired entries from cache
   */
  clearExpired(): void {
    const now = Date.now()
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp >= this.defaultTTL) {
        this.cache.delete(key)
      }
    }
  }

  /**
   * Start automatic cleanup interval
   */
  private startCleanupInterval(): void {
    // Run cleanup every 10 minutes
    setInterval(() => {
      this.clearExpired()
    }, 10 * 60 * 1000)
  }

  /**
   * Create a cache key from an object
   * @param prefix Key prefix
   * @param params Object to serialize into key
   */
  static createKey(prefix: string, params?: any): string {
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
