/**
 * Service Worker for HaiLan PWA
 * 提供离线支持、缓存管理和推送通知
 */

const CACHE_VERSION = 'hailan-v1.0.0';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;

// 需要预缓存的静态资源
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
];

// ==================== 安装事件 ====================
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...', event);
  
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Precaching static assets');
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.error('[SW] Failed to cache static assets:', err);
        // 即使缓存失败也继续安装
        return Promise.resolve();
      });
    })
  );
  
  // 强制立即激活
  self.skipWaiting();
});

// ==================== 激活事件 ====================
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...', event);
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName.startsWith('hailan-') && !cacheName.includes(CACHE_VERSION);
          })
          .map((cacheName) => {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
  );
  
  // 立即接管所有页面
  return self.clients.claim();
});

// ==================== Fetch事件 ====================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // 跳过非GET请求
  if (request.method !== 'GET') {
    return;
  }
  
  // 跳过Chrome扩展请求
  if (url.protocol === 'chrome-extension:') {
    return;
  }
  
  // 跳过非同源请求（除了图片）
  if (url.origin !== location.origin && request.destination !== 'image') {
    return;
  }
  
  // API请求 - 网络优先
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request));
    return;
  }
  
  // 图片请求 - 缓存优先
  if (request.destination === 'image') {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }
  
  // HTML请求 - 网络优先
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }
  
  // 其他静态资源 - 缓存优先
  event.respondWith(cacheFirst(request, STATIC_CACHE));
});

// ==================== 缓存策略 ====================

/**
 * 缓存优先策略
 */
async function cacheFirst(request, cacheName = DYNAMIC_CACHE) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    // 只缓存成功的响应
    if (networkResponse && networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache first strategy failed:', error);
    
    // 返回离线页面
    if (request.mode === 'navigate') {
      const offlinePage = await caches.match('/offline.html');
      if (offlinePage) {
        return offlinePage;
      }
    }
    
    // 返回基本错误响应
    return new Response('离线状态，请检查网络连接', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({
        'Content-Type': 'text/plain; charset=utf-8',
      }),
    });
  }
}

/**
 * 网络优先策略
 */
async function networkFirst(request, timeout = 3000) {
  try {
    const networkResponse = await Promise.race([
      fetch(request),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Network timeout')), timeout)
      ),
    ]);
    
    // 缓存成功的响应
    if (networkResponse && networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network first failed, trying cache:', error.message);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // 返回离线页面
    if (request.mode === 'navigate') {
      const offlinePage = await caches.match('/offline.html');
      if (offlinePage) {
        return offlinePage;
      }
    }
    
    throw error;
  }
}

// ==================== 推送通知 ====================
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received:', event);
  
  let notificationData = {
    title: '海蓝 HaiLan',
    body: '您有新消息',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
  };
  
  if (event.data) {
    try {
      notificationData = event.data.json();
    } catch (e) {
      notificationData.body = event.data.text();
    }
  }
  
  const options = {
    body: notificationData.body,
    icon: notificationData.icon || '/icons/icon-192x192.png',
    badge: notificationData.badge || '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    tag: notificationData.tag || 'default',
    data: {
      dateOfArrival: Date.now(),
      primaryKey: notificationData.id || 1,
      url: notificationData.url || '/',
    },
    actions: [
      {
        action: 'explore',
        title: '查看详情',
        icon: '/icons/action-explore.png',
      },
      {
        action: 'close',
        title: '关闭',
        icon: '/icons/action-close.png',
      },
    ],
    requireInteraction: false,
  };
  
  event.waitUntil(
    self.registration.showNotification(notificationData.title || '海蓝 HaiLan', options)
  );
});

// ==================== 通知点击 ====================
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event);
  
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || '/';
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
        // 如果已有窗口打开，则聚焦
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        // 否则打开新窗口
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
    );
  }
});

// ==================== 后台同步 ====================
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event);
  
  if (event.tag === 'sync-orders') {
    event.waitUntil(syncOrders());
  }
  
  if (event.tag === 'sync-cart') {
    event.waitUntil(syncCart());
  }
});

async function syncOrders() {
  console.log('[SW] Syncing orders...');
  try {
    // 获取待同步的订单
    const db = await openDatabase();
    const pendingOrders = await getPendingOrders(db);
    
    // 同步订单
    for (const order of pendingOrders) {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
    }
    
    console.log('[SW] Orders synced successfully');
  } catch (error) {
    console.error('[SW] Failed to sync orders:', error);
  }
}

async function syncCart() {
  console.log('[SW] Syncing cart...');
  // 实现购物车同步逻辑
}

// ==================== 定期同步 ====================
self.addEventListener('periodicsync', (event) => {
  console.log('[SW] Periodic sync:', event);
  
  if (event.tag === 'update-content') {
    event.waitUntil(updateContent());
  }
});

async function updateContent() {
  console.log('[SW] Updating content...');
  try {
    // 更新推荐内容
    const response = await fetch('/api/recommendations');
    const data = await response.json();
    
    // 缓存更新的内容
    const cache = await caches.open(DYNAMIC_CACHE);
    await cache.put('/api/recommendations', new Response(JSON.stringify(data)));
    
    console.log('[SW] Content updated successfully');
  } catch (error) {
    console.error('[SW] Failed to update content:', error);
  }
}

// ==================== 消息通信 ====================
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      }).then(() => {
        event.ports[0].postMessage({ success: true });
      })
    );
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_VERSION });
  }
});

// ==================== 辅助函数 ====================
async function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('HaiLanDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('pendingOrders')) {
        db.createObjectStore('pendingOrders', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

async function getPendingOrders(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['pendingOrders'], 'readonly');
    const store = transaction.objectStore('pendingOrders');
    const request = store.getAll();
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

console.log('[SW] Service Worker loaded successfully');
