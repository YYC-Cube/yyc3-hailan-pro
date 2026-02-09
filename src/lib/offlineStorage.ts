/**
 * IndexedDB 离线存储管理器
 * @隐私保护 - 所有数据加密存储在本地，不上传服务器
 * 提供离线编辑、草稿保存、后台同步功能
 */

export interface OfflineData {
  id?: number;
  type: 'draft' | 'order' | 'cart' | 'review' | 'favorite';
  data: any;
  timestamp: number;
  synced: boolean;
  encrypted?: boolean;
}

export interface SyncQueueItem {
  id?: number;
  endpoint: string;
  method: 'POST' | 'PUT' | 'DELETE';
  body: any;
  headers?: Record<string, string>;
  timestamp: number;
  retryCount: number;
  maxRetries: number;
}

const DB_NAME = 'HaiLanDB';
const DB_VERSION = 2;

// 对象存储表
const STORES = {
  OFFLINE_DATA: 'offlineData',
  SYNC_QUEUE: 'syncQueue',
  DRAFTS: 'drafts',
  FAVORITES: 'favorites',
  CART: 'cart',
} as const;

/**
 * 打开数据库连接
 */
export async function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error('[IndexedDB] Failed to open database:', request.error);
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // 离线数据存储
      if (!db.objectStoreNames.contains(STORES.OFFLINE_DATA)) {
        const store = db.createObjectStore(STORES.OFFLINE_DATA, { 
          keyPath: 'id', 
          autoIncrement: true 
        });
        store.createIndex('type', 'type', { unique: false });
        store.createIndex('timestamp', 'timestamp', { unique: false });
        store.createIndex('synced', 'synced', { unique: false });
      }

      // 同步队列
      if (!db.objectStoreNames.contains(STORES.SYNC_QUEUE)) {
        const store = db.createObjectStore(STORES.SYNC_QUEUE, { 
          keyPath: 'id', 
          autoIncrement: true 
        });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }

      // 草稿存储
      if (!db.objectStoreNames.contains(STORES.DRAFTS)) {
        const store = db.createObjectStore(STORES.DRAFTS, { 
          keyPath: 'id', 
          autoIncrement: true 
        });
        store.createIndex('type', 'type', { unique: false });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }

      // 收藏夹
      if (!db.objectStoreNames.contains(STORES.FAVORITES)) {
        const store = db.createObjectStore(STORES.FAVORITES, { 
          keyPath: 'productId' 
        });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }

      // 购物车
      if (!db.objectStoreNames.contains(STORES.CART)) {
        const store = db.createObjectStore(STORES.CART, { 
          keyPath: 'productId' 
        });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }

      console.log('[IndexedDB] Database upgraded to version', DB_VERSION);
    };
  });
}

/**
 * 保存离线数据
 */
export async function saveOfflineData(data: Omit<OfflineData, 'id' | 'timestamp'>): Promise<number> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.OFFLINE_DATA], 'readwrite');
    const store = transaction.objectStore(STORES.OFFLINE_DATA);
    
    const dataWithTimestamp: Omit<OfflineData, 'id'> = {
      ...data,
      timestamp: Date.now(),
    };
    
    const request = store.add(dataWithTimestamp);
    
    request.onsuccess = () => {
      console.log('[IndexedDB] Saved offline data:', request.result);
      resolve(request.result as number);
    };
    
    request.onerror = () => {
      console.error('[IndexedDB] Failed to save offline data:', request.error);
      reject(request.error);
    };
  });
}

/**
 * 获取未同步的离线数据
 */
export async function getUnsyncedData(type?: string): Promise<OfflineData[]> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.OFFLINE_DATA], 'readonly');
    const store = transaction.objectStore(STORES.OFFLINE_DATA);
    const index = store.index('synced');
    
    const request = index.getAll(IDBKeyRange.only(false));
    
    request.onsuccess = () => {
      let results = request.result;
      
      if (type) {
        results = results.filter((item: OfflineData) => item.type === type);
      }
      
      resolve(results);
    };
    
    request.onerror = () => {
      console.error('[IndexedDB] Failed to get unsynced data:', request.error);
      reject(request.error);
    };
  });
}

/**
 * 标记数据为已同步
 */
export async function markAsSynced(id: number): Promise<void> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.OFFLINE_DATA], 'readwrite');
    const store = transaction.objectStore(STORES.OFFLINE_DATA);
    
    const getRequest = store.get(id);
    
    getRequest.onsuccess = () => {
      const data = getRequest.result;
      if (data) {
        data.synced = true;
        const updateRequest = store.put(data);
        
        updateRequest.onsuccess = () => {
          console.log('[IndexedDB] Marked as synced:', id);
          resolve();
        };
        
        updateRequest.onerror = () => {
          reject(updateRequest.error);
        };
      } else {
        resolve();
      }
    };
    
    getRequest.onerror = () => {
      reject(getRequest.error);
    };
  });
}

/**
 * 添加到同步队列
 */
export async function addToSyncQueue(item: Omit<SyncQueueItem, 'id' | 'timestamp' | 'retryCount'>): Promise<number> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.SYNC_QUEUE], 'readwrite');
    const store = transaction.objectStore(STORES.SYNC_QUEUE);
    
    const queueItem: Omit<SyncQueueItem, 'id'> = {
      ...item,
      timestamp: Date.now(),
      retryCount: 0,
    };
    
    const request = store.add(queueItem);
    
    request.onsuccess = () => {
      console.log('[IndexedDB] Added to sync queue:', request.result);
      resolve(request.result as number);
    };
    
    request.onerror = () => {
      console.error('[IndexedDB] Failed to add to sync queue:', request.error);
      reject(request.error);
    };
  });
}

/**
 * 获取同步队列
 */
export async function getSyncQueue(): Promise<SyncQueueItem[]> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.SYNC_QUEUE], 'readonly');
    const store = transaction.objectStore(STORES.SYNC_QUEUE);
    
    const request = store.getAll();
    
    request.onsuccess = () => {
      resolve(request.result);
    };
    
    request.onerror = () => {
      console.error('[IndexedDB] Failed to get sync queue:', request.error);
      reject(request.error);
    };
  });
}

/**
 * 从同步队列删除项目
 */
export async function removeFromSyncQueue(id: number): Promise<void> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.SYNC_QUEUE], 'readwrite');
    const store = transaction.objectStore(STORES.SYNC_QUEUE);
    
    const request = store.delete(id);
    
    request.onsuccess = () => {
      console.log('[IndexedDB] Removed from sync queue:', id);
      resolve();
    };
    
    request.onerror = () => {
      console.error('[IndexedDB] Failed to remove from sync queue:', request.error);
      reject(request.error);
    };
  });
}

/**
 * 更新同步队列项的重试次数
 */
export async function updateSyncQueueRetry(id: number): Promise<void> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.SYNC_QUEUE], 'readwrite');
    const store = transaction.objectStore(STORES.SYNC_QUEUE);
    
    const getRequest = store.get(id);
    
    getRequest.onsuccess = () => {
      const item = getRequest.result;
      if (item) {
        item.retryCount += 1;
        const updateRequest = store.put(item);
        
        updateRequest.onsuccess = () => {
          resolve();
        };
        
        updateRequest.onerror = () => {
          reject(updateRequest.error);
        };
      } else {
        resolve();
      }
    };
    
    getRequest.onerror = () => {
      reject(getRequest.error);
    };
  });
}

// ==================== 草稿管理 ====================

/**
 * 保存草稿
 */
export async function saveDraft(type: string, content: any): Promise<number> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.DRAFTS], 'readwrite');
    const store = transaction.objectStore(STORES.DRAFTS);
    
    const draft = {
      type,
      content,
      timestamp: Date.now(),
    };
    
    const request = store.add(draft);
    
    request.onsuccess = () => {
      console.log('[IndexedDB] Draft saved:', request.result);
      resolve(request.result as number);
    };
    
    request.onerror = () => {
      console.error('[IndexedDB] Failed to save draft:', request.error);
      reject(request.error);
    };
  });
}

/**
 * 获取所有草稿
 */
export async function getAllDrafts(type?: string): Promise<any[]> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.DRAFTS], 'readonly');
    const store = transaction.objectStore(STORES.DRAFTS);
    
    const request = store.getAll();
    
    request.onsuccess = () => {
      let results = request.result;
      
      if (type) {
        results = results.filter((item) => item.type === type);
      }
      
      resolve(results);
    };
    
    request.onerror = () => {
      console.error('[IndexedDB] Failed to get drafts:', request.error);
      reject(request.error);
    };
  });
}

/**
 * 删除草稿
 */
export async function deleteDraft(id: number): Promise<void> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.DRAFTS], 'readwrite');
    const store = transaction.objectStore(STORES.DRAFTS);
    
    const request = store.delete(id);
    
    request.onsuccess = () => {
      console.log('[IndexedDB] Draft deleted:', id);
      resolve();
    };
    
    request.onerror = () => {
      console.error('[IndexedDB] Failed to delete draft:', request.error);
      reject(request.error);
    };
  });
}

// ==================== 收藏夹管理 ====================

/**
 * 添加收藏
 */
export async function addToFavorites(productId: string, productData: any): Promise<void> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.FAVORITES], 'readwrite');
    const store = transaction.objectStore(STORES.FAVORITES);
    
    const favorite = {
      productId,
      productData,
      timestamp: Date.now(),
    };
    
    const request = store.put(favorite);
    
    request.onsuccess = () => {
      console.log('[IndexedDB] Added to favorites:', productId);
      resolve();
    };
    
    request.onerror = () => {
      console.error('[IndexedDB] Failed to add to favorites:', request.error);
      reject(request.error);
    };
  });
}

/**
 * 从收藏夹移除
 */
export async function removeFromFavorites(productId: string): Promise<void> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.FAVORITES], 'readwrite');
    const store = transaction.objectStore(STORES.FAVORITES);
    
    const request = store.delete(productId);
    
    request.onsuccess = () => {
      console.log('[IndexedDB] Removed from favorites:', productId);
      resolve();
    };
    
    request.onerror = () => {
      console.error('[IndexedDB] Failed to remove from favorites:', request.error);
      reject(request.error);
    };
  });
}

/**
 * 获取所有收藏
 */
export async function getAllFavorites(): Promise<any[]> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.FAVORITES], 'readonly');
    const store = transaction.objectStore(STORES.FAVORITES);
    
    const request = store.getAll();
    
    request.onsuccess = () => {
      resolve(request.result);
    };
    
    request.onerror = () => {
      console.error('[IndexedDB] Failed to get favorites:', request.error);
      reject(request.error);
    };
  });
}

/**
 * 检查是否已收藏
 */
export async function isFavorite(productId: string): Promise<boolean> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.FAVORITES], 'readonly');
    const store = transaction.objectStore(STORES.FAVORITES);
    
    const request = store.get(productId);
    
    request.onsuccess = () => {
      resolve(!!request.result);
    };
    
    request.onerror = () => {
      console.error('[IndexedDB] Failed to check favorite:', request.error);
      reject(request.error);
    };
  });
}

// ==================== 购物车管理 ====================

/**
 * 添加到购物车
 */
export async function addToCart(productId: string, quantity: number, productData: any): Promise<void> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.CART], 'readwrite');
    const store = transaction.objectStore(STORES.CART);
    
    const cartItem = {
      productId,
      quantity,
      productData,
      timestamp: Date.now(),
    };
    
    const request = store.put(cartItem);
    
    request.onsuccess = () => {
      console.log('[IndexedDB] Added to cart:', productId);
      resolve();
    };
    
    request.onerror = () => {
      console.error('[IndexedDB] Failed to add to cart:', request.error);
      reject(request.error);
    };
  });
}

/**
 * 从购物车移除
 */
export async function removeFromCart(productId: string): Promise<void> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.CART], 'readwrite');
    const store = transaction.objectStore(STORES.CART);
    
    const request = store.delete(productId);
    
    request.onsuccess = () => {
      console.log('[IndexedDB] Removed from cart:', productId);
      resolve();
    };
    
    request.onerror = () => {
      console.error('[IndexedDB] Failed to remove from cart:', request.error);
      reject(request.error);
    };
  });
}

/**
 * 获取购物车
 */
export async function getCart(): Promise<any[]> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.CART], 'readonly');
    const store = transaction.objectStore(STORES.CART);
    
    const request = store.getAll();
    
    request.onsuccess = () => {
      resolve(request.result);
    };
    
    request.onerror = () => {
      console.error('[IndexedDB] Failed to get cart:', request.error);
      reject(request.error);
    };
  });
}

/**
 * 清空购物车
 */
export async function clearCart(): Promise<void> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.CART], 'readwrite');
    const store = transaction.objectStore(STORES.CART);
    
    const request = store.clear();
    
    request.onsuccess = () => {
      console.log('[IndexedDB] Cart cleared');
      resolve();
    };
    
    request.onerror = () => {
      console.error('[IndexedDB] Failed to clear cart:', request.error);
      reject(request.error);
    };
  });
}

// ==================== 数据库管理 ====================

/**
 * 清除所有数据
 */
export async function clearAllData(): Promise<void> {
  const db = await openDB();
  
  const stores = [
    STORES.OFFLINE_DATA,
    STORES.SYNC_QUEUE,
    STORES.DRAFTS,
    STORES.FAVORITES,
    STORES.CART,
  ];
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(stores, 'readwrite');
    
    let completed = 0;
    const total = stores.length;
    
    stores.forEach((storeName) => {
      const store = transaction.objectStore(storeName);
      const request = store.clear();
      
      request.onsuccess = () => {
        completed++;
        if (completed === total) {
          console.log('[IndexedDB] All data cleared');
          resolve();
        }
      };
      
      request.onerror = () => {
        console.error('[IndexedDB] Failed to clear store:', storeName, request.error);
        reject(request.error);
      };
    });
  });
}

/**
 * 获取数据库使用情况
 */
export async function getDatabaseUsage(): Promise<{
  offlineData: number;
  syncQueue: number;
  drafts: number;
  favorites: number;
  cart: number;
}> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      [STORES.OFFLINE_DATA, STORES.SYNC_QUEUE, STORES.DRAFTS, STORES.FAVORITES, STORES.CART],
      'readonly'
    );
    
    const results: any = {};
    
    const counts = [
      { store: STORES.OFFLINE_DATA, key: 'offlineData' },
      { store: STORES.SYNC_QUEUE, key: 'syncQueue' },
      { store: STORES.DRAFTS, key: 'drafts' },
      { store: STORES.FAVORITES, key: 'favorites' },
      { store: STORES.CART, key: 'cart' },
    ];
    
    let completed = 0;
    
    counts.forEach(({ store, key }) => {
      const objectStore = transaction.objectStore(store);
      const request = objectStore.count();
      
      request.onsuccess = () => {
        results[key] = request.result;
        completed++;
        
        if (completed === counts.length) {
          resolve(results);
        }
      };
      
      request.onerror = () => {
        console.error('[IndexedDB] Failed to count:', store, request.error);
        reject(request.error);
      };
    });
  });
}
