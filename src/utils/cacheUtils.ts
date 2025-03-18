
/**
 * Cache utility functions to improve application performance
 */

// Set an item in cache with expiration
export const setCacheItem = (key: string, value: any, expirationMinutes = 60) => {
  try {
    const item = {
      value,
      expiry: new Date().getTime() + expirationMinutes * 60 * 1000,
    };
    localStorage.setItem(`annadata-cache-${key}`, JSON.stringify(item));
    return true;
  } catch (error) {
    console.error('Error setting cache item:', error);
    return false;
  }
};

// Get an item from cache
export const getCacheItem = (key: string) => {
  try {
    const itemStr = localStorage.getItem(`annadata-cache-${key}`);
    if (!itemStr) return null;
    
    const item = JSON.parse(itemStr);
    const now = new Date().getTime();
    
    // Check if the item is expired
    if (now > item.expiry) {
      localStorage.removeItem(`annadata-cache-${key}`);
      return null;
    }
    
    return item.value;
  } catch (error) {
    console.error('Error getting cache item:', error);
    return null;
  }
};

// Clear all cached items
export const clearCache = () => {
  try {
    const cacheKeys = Object.keys(localStorage).filter(key => 
      key.startsWith('annadata-cache-')
    );
    
    cacheKeys.forEach(key => localStorage.removeItem(key));
    return true;
  } catch (error) {
    console.error('Error clearing cache:', error);
    return false;
  }
};

// Invalidate specific cache items by prefix
export const invalidateCacheByPrefix = (prefix: string) => {
  try {
    const cacheKeys = Object.keys(localStorage).filter(key => 
      key.startsWith(`annadata-cache-${prefix}`)
    );
    
    cacheKeys.forEach(key => localStorage.removeItem(key));
    return true;
  } catch (error) {
    console.error('Error invalidating cache:', error);
    return false;
  }
};

// Use the Cache API for resource caching (better for larger files)
export const cacheResource = async (url: string, cacheName = 'annadata-resources') => {
  if ('caches' in window) {
    try {
      const cache = await caches.open(cacheName);
      await cache.add(url);
      return true;
    } catch (error) {
      console.error('Error caching resource:', error);
      return false;
    }
  }
  return false;
};

// Get a resource from the Cache API
export const getResourceFromCache = async (url: string, cacheName = 'annadata-resources') => {
  if ('caches' in window) {
    try {
      const cache = await caches.open(cacheName);
      return await cache.match(url);
    } catch (error) {
      console.error('Error getting resource from cache:', error);
      return null;
    }
  }
  return null;
};

// Memory-based cache for application data
const memoryCache: Record<string, {value: any, expiry: number}> = {};

// Set an item in memory cache (faster than localStorage)
export const setMemoryCacheItem = (key: string, value: any, expirationSeconds = 60) => {
  try {
    memoryCache[key] = {
      value,
      expiry: new Date().getTime() + expirationSeconds * 1000,
    };
    return true;
  } catch (error) {
    console.error('Error setting memory cache item:', error);
    return false;
  }
};

// Get an item from memory cache
export const getMemoryCacheItem = (key: string) => {
  try {
    const item = memoryCache[key];
    if (!item) return null;
    
    const now = new Date().getTime();
    
    // Check if the item is expired
    if (now > item.expiry) {
      delete memoryCache[key];
      return null;
    }
    
    return item.value;
  } catch (error) {
    console.error('Error getting memory cache item:', error);
    return null;
  }
};

// Clear all memory cache
export const clearMemoryCache = () => {
  try {
    Object.keys(memoryCache).forEach(key => {
      delete memoryCache[key];
    });
    return true;
  } catch (error) {
    console.error('Error clearing memory cache:', error);
    return false;
  }
};
