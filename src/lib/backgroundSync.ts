/**
 * 后台同步管理器
 * @隐私保护 - 同步数据加密传输，用户完全控制同步行为
 * 提供智能同步策略、失败重试、网络状态监测
 */

import { 
  getSyncQueue, 
  removeFromSyncQueue, 
  updateSyncQueueRetry,
  type SyncQueueItem 
} from './offlineStorage';

export interface SyncOptions {
  onProgress?: (current: number, total: number) => void;
  onSuccess?: (item: SyncQueueItem) => void;
  onError?: (item: SyncQueueItem, error: Error) => void;
  onComplete?: (successful: number, failed: number) => void;
}

/**
 * 执行后台同步
 */
export async function executeBackgroundSync(options?: SyncOptions): Promise<void> {
  console.log('[BackgroundSync] Starting background sync...');
  
  try {
    const queue = await getSyncQueue();
    
    if (queue.length === 0) {
      console.log('[BackgroundSync] Sync queue is empty');
      options?.onComplete?.(0, 0);
      return;
    }
    
    console.log(`[BackgroundSync] Found ${queue.length} items to sync`);
    
    let successful = 0;
    let failed = 0;
    
    for (let i = 0; i < queue.length; i++) {
      const item = queue[i];
      options?.onProgress?.(i + 1, queue.length);
      
      try {
        await syncItem(item);
        await removeFromSyncQueue(item.id!);
        successful++;
        options?.onSuccess?.(item);
        console.log('[BackgroundSync] Item synced successfully:', item.id);
      } catch (error) {
        console.error('[BackgroundSync] Failed to sync item:', item.id, error);
        
        // 检查重试次数
        if (item.retryCount < item.maxRetries) {
          await updateSyncQueueRetry(item.id!);
          console.log(`[BackgroundSync] Will retry item ${item.id} (${item.retryCount + 1}/${item.maxRetries})`);
        } else {
          // 超过最大重试次数，从队列移除
          await removeFromSyncQueue(item.id!);
          console.log('[BackgroundSync] Item exceeded max retries, removed from queue:', item.id);
        }
        
        failed++;
        options?.onError?.(item, error as Error);
      }
    }
    
    console.log(`[BackgroundSync] Sync complete. Success: ${successful}, Failed: ${failed}`);
    options?.onComplete?.(successful, failed);
    
  } catch (error) {
    console.error('[BackgroundSync] Background sync failed:', error);
    throw error;
  }
}

/**
 * 同步单个项目
 */
async function syncItem(item: SyncQueueItem): Promise<Response> {
  const { endpoint, method, body, headers = {} } = item;
  
  const response = await fetch(endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: method !== 'DELETE' ? JSON.stringify(body) : undefined,
  });
  
  if (!response.ok) {
    throw new Error(`Sync failed with status ${response.status}: ${response.statusText}`);
  }
  
  return response;
}

/**
 * 监听网络状态变化并自动同步
 */
export function setupAutoSync(options?: SyncOptions): () => void {
  const handleOnline = () => {
    console.log('[BackgroundSync] Network is back online, starting auto sync...');
    executeBackgroundSync(options).catch((error) => {
      console.error('[BackgroundSync] Auto sync failed:', error);
    });
  };
  
  window.addEventListener('online', handleOnline);
  
  // 返回清理函数
  return () => {
    window.removeEventListener('online', handleOnline);
  };
}

/**
 * 定期执行后台同步
 */
export function setupPeriodicSync(intervalMinutes: number = 30, options?: SyncOptions): () => void {
  console.log(`[BackgroundSync] Setting up periodic sync every ${intervalMinutes} minutes`);
  
  const intervalMs = intervalMinutes * 60 * 1000;
  
  const intervalId = setInterval(() => {
    if (navigator.onLine) {
      console.log('[BackgroundSync] Running periodic sync...');
      executeBackgroundSync(options).catch((error) => {
        console.error('[BackgroundSync] Periodic sync failed:', error);
      });
    }
  }, intervalMs);
  
  // 返回清理函数
  return () => {
    clearInterval(intervalId);
  };
}

/**
 * 智能同步策略
 * 根据网络状况和电量自动调整同步频率
 */
export class SmartSyncManager {
  private syncInterval: number = 30; // 默认30分钟
  private cleanupFn: (() => void) | null = null;
  private options?: SyncOptions;
  
  constructor(options?: SyncOptions) {
    this.options = options;
  }
  
  start(): void {
    this.adjustSyncStrategy();
    this.setupListeners();
    this.cleanupFn = setupPeriodicSync(this.syncInterval, this.options);
    
    console.log('[SmartSync] Smart sync manager started');
  }
  
  stop(): void {
    if (this.cleanupFn) {
      this.cleanupFn();
      this.cleanupFn = null;
    }
    
    console.log('[SmartSync] Smart sync manager stopped');
  }
  
  private adjustSyncStrategy(): void {
    // 检查网络类型
    const connection = (navigator as any).connection;
    if (connection) {
      const effectiveType = connection.effectiveType;
      
      switch (effectiveType) {
        case '4g':
          this.syncInterval = 15; // 4G网络，15分钟同步
          break;
        case '3g':
          this.syncInterval = 30; // 3G网络，30分钟同步
          break;
        case '2g':
        case 'slow-2g':
          this.syncInterval = 60; // 2G网络，60分钟同步
          break;
        default:
          this.syncInterval = 30;
      }
      
      console.log(`[SmartSync] Adjusted sync interval to ${this.syncInterval} minutes based on network: ${effectiveType}`);
    }
    
    // 检查是否省电模式
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        if (battery.level < 0.2) {
          this.syncInterval = Math.max(60, this.syncInterval * 2); // 电量低于20%，延长同步间隔
          console.log(`[SmartSync] Low battery detected, adjusted sync interval to ${this.syncInterval} minutes`);
        }
      });
    }
  }
  
  private setupListeners(): void {
    // 监听网络变化
    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', () => {
        console.log('[SmartSync] Network changed, adjusting strategy...');
        this.adjustSyncStrategy();
        this.restart();
      });
    }
    
    // 监听电量变化
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        battery.addEventListener('levelchange', () => {
          console.log('[SmartSync] Battery level changed, adjusting strategy...');
          this.adjustSyncStrategy();
          this.restart();
        });
      });
    }
  }
  
  private restart(): void {
    this.stop();
    this.start();
  }
  
  /**
   * 立即执行同步
   */
  async syncNow(): Promise<void> {
    console.log('[SmartSync] Executing immediate sync...');
    await executeBackgroundSync(this.options);
  }
}

/**
 * 检查网络状态
 */
export function getNetworkStatus(): {
  online: boolean;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
} {
  const connection = (navigator as any).connection;
  
  return {
    online: navigator.onLine,
    effectiveType: connection?.effectiveType,
    downlink: connection?.downlink,
    rtt: connection?.rtt,
    saveData: connection?.saveData,
  };
}

/**
 * 判断是否适合同步
 */
export function shouldSync(): boolean {
  const networkStatus = getNetworkStatus();
  
  // 不在线
  if (!networkStatus.online) {
    return false;
  }
  
  // 用户启用了省流量模式
  if (networkStatus.saveData) {
    return false;
  }
  
  // 网络很慢
  if (networkStatus.effectiveType === 'slow-2g' || networkStatus.effectiveType === '2g') {
    return false;
  }
  
  return true;
}

/**
 * 等待网络恢复
 */
export function waitForOnline(timeoutMs: number = 60000): Promise<void> {
  return new Promise((resolve, reject) => {
    if (navigator.onLine) {
      resolve();
      return;
    }
    
    const timeout = setTimeout(() => {
      window.removeEventListener('online', handleOnline);
      reject(new Error('Network timeout'));
    }, timeoutMs);
    
    const handleOnline = () => {
      clearTimeout(timeout);
      window.removeEventListener('online', handleOnline);
      resolve();
    };
    
    window.addEventListener('online', handleOnline);
  });
}
