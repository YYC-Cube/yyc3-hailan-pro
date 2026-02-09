/**
 * 智能缓存策略管理器
 * @隐私保护 - 敏感数据不缓存，用户行为数据仅本地存储
 * 基于用户行为预测和机器学习的智能预缓存
 */

export interface CacheStats {
  totalSize: number;
  itemCount: number;
  hitRate: number;
  lastUpdated: number;
}

export interface PageVisit {
  url: string;
  timestamp: number;
  duration: number;
}

export interface PredictionResult {
  url: string;
  probability: number;
  reason: string;
}

const VISIT_HISTORY_KEY = 'hailan_visit_history';
const CACHE_STATS_KEY = 'hailan_cache_stats';
const MAX_HISTORY_SIZE = 100;
const PREDICTION_THRESHOLD = 0.3;

/**
 * 记录页面访问
 */
export function recordPageVisit(url: string, duration: number): void {
  try {
    const history = getVisitHistory();
    
    history.push({
      url,
      timestamp: Date.now(),
      duration,
    });
    
    // 保持历史记录在合理大小
    if (history.length > MAX_HISTORY_SIZE) {
      history.shift();
    }
    
    localStorage.setItem(VISIT_HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('[SmartCache] Failed to record visit:', error);
  }
}

/**
 * 获取访问历史
 */
export function getVisitHistory(): PageVisit[] {
  try {
    const stored = localStorage.getItem(VISIT_HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('[SmartCache] Failed to load visit history:', error);
    return [];
  }
}

/**
 * 清除访问历史
 */
export function clearVisitHistory(): void {
  try {
    localStorage.removeItem(VISIT_HISTORY_KEY);
    console.log('[SmartCache] Visit history cleared');
  } catch (error) {
    console.error('[SmartCache] Failed to clear visit history:', error);
  }
}

/**
 * 预测用户可能访问的页面
 */
export function predictNextPages(currentUrl: string, limit: number = 5): PredictionResult[] {
  const history = getVisitHistory();
  
  if (history.length < 5) {
    // 历史记录太少，返回默认推荐
    return getDefaultRecommendations(currentUrl);
  }
  
  const predictions: Map<string, { count: number; reason: string }> = new Map();
  
  // 策略1: 查找当前页面后通常访问的页面
  for (let i = 0; i < history.length - 1; i++) {
    if (history[i].url === currentUrl) {
      const nextUrl = history[i + 1].url;
      const current = predictions.get(nextUrl) || { count: 0, reason: '历史访问模式' };
      predictions.set(nextUrl, { count: current.count + 1, reason: current.reason });
    }
  }
  
  // 策略2: 查找频繁访问的页面
  const urlCounts = new Map<string, number>();
  history.forEach((visit) => {
    if (visit.url !== currentUrl) {
      urlCounts.set(visit.url, (urlCounts.get(visit.url) || 0) + 1);
    }
  });
  
  urlCounts.forEach((count, url) => {
    if (count > 3) {
      const current = predictions.get(url) || { count: 0, reason: '频繁访问' };
      predictions.set(url, { 
        count: current.count + count * 0.3, 
        reason: current.reason 
      });
    }
  });
  
  // 策略3: 时间规律（例如工作日vs周末，白天vs晚上）
  const now = new Date();
  const currentHour = now.getHours();
  const currentDayOfWeek = now.getDay();
  
  history.forEach((visit) => {
    const visitDate = new Date(visit.timestamp);
    const visitHour = visitDate.getHours();
    const visitDayOfWeek = visitDate.getDay();
    
    // 相似时段
    if (Math.abs(visitHour - currentHour) <= 2) {
      const current = predictions.get(visit.url) || { count: 0, reason: '时间规律' };
      predictions.set(visit.url, { 
        count: current.count + 0.5, 
        reason: current.reason 
      });
    }
    
    // 相似工作日/周末
    const isCurrentWeekend = currentDayOfWeek === 0 || currentDayOfWeek === 6;
    const isVisitWeekend = visitDayOfWeek === 0 || visitDayOfWeek === 6;
    if (isCurrentWeekend === isVisitWeekend) {
      const current = predictions.get(visit.url) || { count: 0, reason: '日期规律' };
      predictions.set(visit.url, { 
        count: current.count + 0.3, 
        reason: current.reason 
      });
    }
  });
  
  // 转换为结果数组并计算概率
  const results: PredictionResult[] = [];
  const maxCount = Math.max(...Array.from(predictions.values()).map((p) => p.count));
  
  predictions.forEach((value, url) => {
    results.push({
      url,
      probability: maxCount > 0 ? value.count / maxCount : 0,
      reason: value.reason,
    });
  });
  
  // 排序并返回前N个
  return results
    .filter((r) => r.probability >= PREDICTION_THRESHOLD)
    .sort((a, b) => b.probability - a.probability)
    .slice(0, limit);
}

/**
 * 获取默认推荐页面
 */
function getDefaultRecommendations(currentUrl: string): PredictionResult[] {
  const recommendations: PredictionResult[] = [];
  
  // 根据当前页面推荐相关页面
  if (currentUrl === '/' || currentUrl.includes('/home')) {
    recommendations.push(
      { url: '/shop', probability: 0.7, reason: '首页用户常访问商城' },
      { url: '/health', probability: 0.5, reason: '首页用户常查看健康' }
    );
  } else if (currentUrl.includes('/shop') || currentUrl.includes('/products')) {
    recommendations.push(
      { url: '/cart', probability: 0.8, reason: '购物页用户常访问购物车' },
      { url: '/orders', probability: 0.6, reason: '购物页用户常查看订单' }
    );
  } else if (currentUrl.includes('/product/')) {
    recommendations.push(
      { url: '/shop', probability: 0.7, reason: '商品详情用户常返回商城' },
      { url: '/cart', probability: 0.9, reason: '商品详情用户常访问购物车' }
    );
  } else if (currentUrl.includes('/health')) {
    recommendations.push(
      { url: '/profile', probability: 0.6, reason: '健康页用户常访问个人中心' }
    );
  }
  
  return recommendations;
}

/**
 * 预缓存推荐页面
 */
export async function precachePredictedPages(currentUrl: string): Promise<void> {
  const predictions = predictNextPages(currentUrl);
  
  if (predictions.length === 0) {
    console.log('[SmartCache] No pages to precache');
    return;
  }
  
  console.log('[SmartCache] Precaching predicted pages:', predictions);
  
  // 请求Service Worker缓存这些页面
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    try {
      const cachePromises = predictions.map(async (prediction) => {
        try {
          // 使用fetch触发Service Worker缓存
          const response = await fetch(prediction.url, {
            method: 'GET',
            cache: 'force-cache',
          });
          
          if (response.ok) {
            console.log(`[SmartCache] Precached: ${prediction.url} (${Math.round(prediction.probability * 100)}%)`);
          }
        } catch (error) {
          console.warn(`[SmartCache] Failed to precache ${prediction.url}:`, error);
        }
      });
      
      await Promise.all(cachePromises);
    } catch (error) {
      console.error('[SmartCache] Precaching failed:', error);
    }
  }
}

/**
 * 获取缓存统计
 */
export async function getCacheStats(): Promise<CacheStats> {
  if (!('caches' in window)) {
    return {
      totalSize: 0,
      itemCount: 0,
      hitRate: 0,
      lastUpdated: Date.now(),
    };
  }
  
  try {
    const cacheNames = await caches.keys();
    let totalSize = 0;
    let itemCount = 0;
    
    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      itemCount += keys.length;
      
      // 估算大小（实际大小可能需要更复杂的计算）
      for (const request of keys) {
        const response = await cache.match(request);
        if (response) {
          const blob = await response.blob();
          totalSize += blob.size;
        }
      }
    }
    
    // 尝试从本地存储获取命中率
    const stats = localStorage.getItem(CACHE_STATS_KEY);
    const hitRate = stats ? JSON.parse(stats).hitRate : 0;
    
    return {
      totalSize,
      itemCount,
      hitRate,
      lastUpdated: Date.now(),
    };
  } catch (error) {
    console.error('[SmartCache] Failed to get cache stats:', error);
    return {
      totalSize: 0,
      itemCount: 0,
      hitRate: 0,
      lastUpdated: Date.now(),
    };
  }
}

/**
 * 清理过期缓存
 */
export async function cleanExpiredCache(maxAgeMs: number = 7 * 24 * 60 * 60 * 1000): Promise<number> {
  if (!('caches' in window)) {
    return 0;
  }
  
  let cleanedCount = 0;
  
  try {
    const cacheNames = await caches.keys();
    
    for (const cacheName of cacheNames) {
      // 跳过静态资源缓存
      if (cacheName.includes('static')) {
        continue;
      }
      
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      
      for (const request of keys) {
        const response = await cache.match(request);
        if (response) {
          const dateHeader = response.headers.get('date');
          if (dateHeader) {
            const cacheTime = new Date(dateHeader).getTime();
            const age = Date.now() - cacheTime;
            
            if (age > maxAgeMs) {
              await cache.delete(request);
              cleanedCount++;
              console.log(`[SmartCache] Cleaned expired cache: ${request.url}`);
            }
          }
        }
      }
    }
    
    console.log(`[SmartCache] Cleaned ${cleanedCount} expired cache items`);
    return cleanedCount;
  } catch (error) {
    console.error('[SmartCache] Failed to clean expired cache:', error);
    return 0;
  }
}

/**
 * 智能缓存管理器
 */
export class SmartCacheManager {
  private enabled: boolean = true;
  private currentUrl: string = '';
  
  /**
   * 启用智能缓存
   */
  enable(): void {
    this.enabled = true;
    console.log('[SmartCache] Smart cache enabled');
  }
  
  /**
   * 禁用智能缓存
   */
  disable(): void {
    this.enabled = false;
    console.log('[SmartCache] Smart cache disabled');
  }
  
  /**
   * 页面访问时调用
   */
  onPageVisit(url: string): void {
    if (!this.enabled) return;
    
    // 记录访问
    if (this.currentUrl) {
      const duration = performance.now();
      recordPageVisit(this.currentUrl, duration);
    }
    
    this.currentUrl = url;
    
    // 预测并预缓存
    setTimeout(() => {
      precachePredictedPages(url).catch((error) => {
        console.error('[SmartCache] Precaching error:', error);
      });
    }, 1000); // 延迟1秒，避免影响当前页面加载
  }
  
  /**
   * 定期清理过期缓存
   */
  startAutoCleanup(intervalHours: number = 24): () => void {
    const intervalMs = intervalHours * 60 * 60 * 1000;
    
    const intervalId = setInterval(() => {
      console.log('[SmartCache] Running auto cleanup...');
      cleanExpiredCache().catch((error) => {
        console.error('[SmartCache] Auto cleanup failed:', error);
      });
    }, intervalMs);
    
    // 立即执行一次
    cleanExpiredCache().catch((error) => {
      console.error('[SmartCache] Initial cleanup failed:', error);
    });
    
    return () => clearInterval(intervalId);
  }
  
  /**
   * 获取缓存报告
   */
  async getReport(): Promise<{
    stats: CacheStats;
    predictions: PredictionResult[];
    historySize: number;
  }> {
    const stats = await getCacheStats();
    const predictions = predictNextPages(this.currentUrl);
    const history = getVisitHistory();
    
    return {
      stats,
      predictions,
      historySize: history.length,
    };
  }
}

/**
 * 全局智能缓存管理器实例
 */
export const smartCacheManager = new SmartCacheManager();
