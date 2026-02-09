/**
 * 性能监控工具
 * 提供Web Vitals监控、资源加载监控、用户体验监控等功能
 * @隐私保护 - 所有数据仅在本地分析，不上传服务器（除非用户同意）
 */

// ==================== 类型定义 ====================

export interface PerformanceMetrics {
  // Core Web Vitals
  FCP?: number; // First Contentful Paint
  LCP?: number; // Largest Contentful Paint
  FID?: number; // First Input Delay
  CLS?: number; // Cumulative Layout Shift
  TTFB?: number; // Time to First Byte
  
  // 自定义指标
  domContentLoaded?: number;
  loadComplete?: number;
  firstInteraction?: number;
}

export interface ResourceTiming {
  name: string;
  type: string;
  duration: number;
  size: number;
  startTime: number;
}

export interface PerformanceReport {
  metrics: PerformanceMetrics;
  resources: ResourceTiming[];
  timestamp: number;
  userAgent: string;
  url: string;
}

// ==================== Core Web Vitals ====================

/**
 * 获取First Contentful Paint (FCP)
 */
export function getFCP(): Promise<number> {
  return new Promise((resolve) => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcpEntry = entries.find((entry) => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          const fcp = fcpEntry.startTime;
          console.log(`[v0] FCP: ${fcp.toFixed(2)}ms`);
          resolve(fcp);
          observer.disconnect();
        }
      });
      observer.observe({ entryTypes: ['paint'] });
    } else {
      resolve(0);
    }
  });
}

/**
 * 获取Largest Contentful Paint (LCP)
 */
export function getLCP(): Promise<number> {
  return new Promise((resolve) => {
    if ('PerformanceObserver' in window) {
      let lcp = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        lcp = lastEntry.startTime;
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });

      // 5秒后停止监听
      setTimeout(() => {
        console.log(`[v0] LCP: ${lcp.toFixed(2)}ms`);
        resolve(lcp);
        observer.disconnect();
      }, 5000);
    } else {
      resolve(0);
    }
  });
}

/**
 * 获取First Input Delay (FID)
 */
export function getFID(): Promise<number> {
  return new Promise((resolve) => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const firstInput = entries[0];
        if (firstInput) {
          const fid = firstInput.processingStart - firstInput.startTime;
          console.log(`[v0] FID: ${fid.toFixed(2)}ms`);
          resolve(fid);
          observer.disconnect();
        }
      });
      observer.observe({ entryTypes: ['first-input'] });

      // 30秒后超时
      setTimeout(() => {
        resolve(0);
        observer.disconnect();
      }, 30000);
    } else {
      resolve(0);
    }
  });
}

/**
 * 获取Cumulative Layout Shift (CLS)
 */
export function getCLS(): Promise<number> {
  return new Promise((resolve) => {
    if ('PerformanceObserver' in window) {
      let cls = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            cls += (entry as any).value;
          }
        }
      });
      observer.observe({ entryTypes: ['layout-shift'] });

      // 5秒后停止监听
      setTimeout(() => {
        console.log(`[v0] CLS: ${cls.toFixed(4)}`);
        resolve(cls);
        observer.disconnect();
      }, 5000);
    } else {
      resolve(0);
    }
  });
}

/**
 * 获取Time to First Byte (TTFB)
 */
export function getTTFB(): number {
  if ('performance' in window && 'timing' in performance) {
    const { responseStart, requestStart } = performance.timing;
    const ttfb = responseStart - requestStart;
    console.log(`[v0] TTFB: ${ttfb.toFixed(2)}ms`);
    return ttfb;
  }
  return 0;
}

// ==================== 资源加载监控 ====================

/**
 * 获取所有资源加载时间
 */
export function getResourceTimings(): ResourceTiming[] {
  if (!('performance' in window)) return [];

  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  
  return resources.map((resource) => ({
    name: resource.name,
    type: resource.initiatorType,
    duration: resource.duration,
    size: resource.transferSize || 0,
    startTime: resource.startTime,
  }));
}

/**
 * 按类型分组资源
 */
export function groupResourcesByType(): Record<string, ResourceTiming[]> {
  const resources = getResourceTimings();
  const grouped: Record<string, ResourceTiming[]> = {};

  resources.forEach((resource) => {
    if (!grouped[resource.type]) {
      grouped[resource.type] = [];
    }
    grouped[resource.type].push(resource);
  });

  return grouped;
}

/**
 * 获取最慢的资源
 */
export function getSlowestResources(count: number = 10): ResourceTiming[] {
  const resources = getResourceTimings();
  return resources
    .sort((a, b) => b.duration - a.duration)
    .slice(0, count);
}

/**
 * 获取最大的资源
 */
export function getLargestResources(count: number = 10): ResourceTiming[] {
  const resources = getResourceTimings();
  return resources
    .filter((r) => r.size > 0)
    .sort((a, b) => b.size - a.size)
    .slice(0, count);
}

// ==================== 页面加载监控 ====================

/**
 * 获取DOM加载时间
 */
export function getDOMLoadTime(): number {
  if (!('performance' in window)) return 0;
  
  const { domContentLoadedEventEnd, navigationStart } = performance.timing;
  const domLoadTime = domContentLoadedEventEnd - navigationStart;
  console.log(`[v0] DOM Load Time: ${domLoadTime.toFixed(2)}ms`);
  return domLoadTime;
}

/**
 * 获取页面完全加载时间
 */
export function getPageLoadTime(): number {
  if (!('performance' in window)) return 0;
  
  const { loadEventEnd, navigationStart } = performance.timing;
  const pageLoadTime = loadEventEnd - navigationStart;
  console.log(`[v0] Page Load Time: ${pageLoadTime.toFixed(2)}ms`);
  return pageLoadTime;
}

// ==================== 内存监控 ====================

/**
 * 获取内存使用情况（仅Chrome支持）
 */
export function getMemoryInfo(): {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
} | null {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    console.log(`[v0] Memory Usage: ${(memory.usedJSHeapSize / 1048576).toFixed(2)}MB / ${(memory.totalJSHeapSize / 1048576).toFixed(2)}MB`);
    return {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
    };
  }
  return null;
}

// ==================== 综合性能报告 ====================

/**
 * 生成完整性能报告
 */
export async function generatePerformanceReport(): Promise<PerformanceReport> {
  console.log('[v0] Generating performance report...');

  const metrics: PerformanceMetrics = {
    FCP: await getFCP(),
    LCP: await getLCP(),
    FID: await getFID(),
    CLS: await getCLS(),
    TTFB: getTTFB(),
    domContentLoaded: getDOMLoadTime(),
    loadComplete: getPageLoadTime(),
  };

  const resources = getResourceTimings();

  const report: PerformanceReport = {
    metrics,
    resources,
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
    url: window.location.href,
  };

  console.log('[v0] Performance report generated:', report);
  return report;
}

/**
 * 打印性能报告摘要
 */
export function logPerformanceSummary(report: PerformanceReport): void {
  console.group('[v0] Performance Summary');
  
  console.log('Core Web Vitals:');
  console.log(`  FCP: ${report.metrics.FCP?.toFixed(2)}ms`);
  console.log(`  LCP: ${report.metrics.LCP?.toFixed(2)}ms`);
  console.log(`  FID: ${report.metrics.FID?.toFixed(2)}ms`);
  console.log(`  CLS: ${report.metrics.CLS?.toFixed(4)}`);
  console.log(`  TTFB: ${report.metrics.TTFB?.toFixed(2)}ms`);
  
  console.log('\nPage Load:');
  console.log(`  DOM: ${report.metrics.domContentLoaded?.toFixed(2)}ms`);
  console.log(`  Full: ${report.metrics.loadComplete?.toFixed(2)}ms`);
  
  console.log('\nResources:');
  console.log(`  Total: ${report.resources.length}`);
  
  const grouped = groupResourcesByType();
  Object.entries(grouped).forEach(([type, resources]) => {
    const totalSize = resources.reduce((sum, r) => sum + r.size, 0);
    const avgDuration = resources.reduce((sum, r) => sum + r.duration, 0) / resources.length;
    console.log(`  ${type}: ${resources.length} files, ${(totalSize / 1024).toFixed(2)}KB, avg ${avgDuration.toFixed(2)}ms`);
  });
  
  console.groupEnd();
}

/**
 * 获取性能评分（0-100）
 */
export function calculatePerformanceScore(metrics: PerformanceMetrics): number {
  let score = 100;

  // FCP评分 (目标: <1800ms)
  if (metrics.FCP) {
    if (metrics.FCP > 3000) score -= 20;
    else if (metrics.FCP > 1800) score -= 10;
  }

  // LCP评分 (目标: <2500ms)
  if (metrics.LCP) {
    if (metrics.LCP > 4000) score -= 20;
    else if (metrics.LCP > 2500) score -= 10;
  }

  // FID评分 (目标: <100ms)
  if (metrics.FID) {
    if (metrics.FID > 300) score -= 20;
    else if (metrics.FID > 100) score -= 10;
  }

  // CLS评分 (目标: <0.1)
  if (metrics.CLS) {
    if (metrics.CLS > 0.25) score -= 20;
    else if (metrics.CLS > 0.1) score -= 10;
  }

  // TTFB评分 (目标: <600ms)
  if (metrics.TTFB) {
    if (metrics.TTFB > 1800) score -= 20;
    else if (metrics.TTFB > 600) score -= 10;
  }

  return Math.max(0, score);
}

// ==================== 自动监控 ====================

/**
 * 启动性能监控
 */
export function startPerformanceMonitoring(): void {
  console.log('[v0] Starting performance monitoring...');

  // 页面加载完成后生成报告
  if (document.readyState === 'complete') {
    setTimeout(() => {
      generatePerformanceReport().then((report) => {
        logPerformanceSummary(report);
        const score = calculatePerformanceScore(report.metrics);
        console.log(`[v0] Performance Score: ${score}/100`);
      });
    }, 1000);
  } else {
    window.addEventListener('load', () => {
      setTimeout(() => {
        generatePerformanceReport().then((report) => {
          logPerformanceSummary(report);
          const score = calculatePerformanceScore(report.metrics);
          console.log(`[v0] Performance Score: ${score}/100`);
        });
      }, 1000);
    });
  }
}

// ==================== 导出 ====================

export default {
  // Core Web Vitals
  getFCP,
  getLCP,
  getFID,
  getCLS,
  getTTFB,
  
  // 资源监控
  getResourceTimings,
  groupResourcesByType,
  getSlowestResources,
  getLargestResources,
  
  // 页面加载
  getDOMLoadTime,
  getPageLoadTime,
  
  // 内存监控
  getMemoryInfo,
  
  // 报告
  generatePerformanceReport,
  logPerformanceSummary,
  calculatePerformanceScore,
  
  // 自动监控
  startPerformanceMonitoring,
};
