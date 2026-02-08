---
@file: 057-PWA-Service-Worker设计.md
@description: HaiLan Pro Service Worker注册、缓存策略、离线能力实现的详细设计
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2026-01-26
@updated: 2026-01-26
@status: published
@tags: [HaiLan-Pro-详细设计],[]
---

> ***YanYuCloudCube***
> **标语**：言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> **标语**：万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 057 PWA Service Worker设计

## 概述

本文档详细描述HaiLan Pro-HaiLan-Pro-详细设计-PWA Service Worker设计相关内容，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
HaiLan Pro (海蓝) 是新一代高端、私密、智能的情趣健康生活管理平台。项目基于「五高五标五化」理念，通过 PWA 技术结合 AI 智能辅助与物联网，为用户提供从生理健康到心理愉悦的全方位解决方案。

#### 1.2 项目愿景
打造极致隐私、智能陪伴、品质合规、全场景覆盖的情趣健康生活管理平台，为用户提供安全、专业、高端的健康生活体验。

#### 1.3 核心价值主张
- **极致隐私**：双重加密、隐私浏览模式及伪装发货机制
- **智能陪伴**：基于 LLM 的 AI 情感与生理健康顾问
- **品质合规**：医疗级标准商品，高端"海蓝蓝"视觉调性
- **全场景覆盖**：PWA 端支持离线浏览、桌面安装及无缝推送

#### 1.4 文档目标
- 规范PWA Service Worker设计相关的业务标准与技术落地要求
- 为项目相关人员提供清晰的参考依据
- 保障相关模块开发、实施、运维的一致性与规范性

### 2. 设计原则

#### 2.1 五高原则
- **高可用性**：确保系统7x24小时稳定运行，支持PWA离线能力
- **高性能**：优化响应时间和处理能力，支持高并发访问
- **高安全性**：保护用户数据和隐私安全，双重加密机制
- **高扩展性**：支持业务快速扩展，微服务架构设计
- **高可维护性**：便于后续维护和升级，模块化设计

#### 2.2 五标体系
- **标准化**：统一的技术和流程标准
- **规范化**：严格的开发和管理规范
- **自动化**：提高开发效率和质量，CI/CD自动化
- **智能化**：利用AI技术提升能力，LLM智能顾问
- **可视化**：直观的监控和管理界面

#### 2.3 五化架构
- **流程化**：标准化的开发流程
- **文档化**：完善的文档体系
- **工具化**：高效的开发工具链
- **数字化**：数据驱动的决策
- **生态化**：开放的生态系统

### 3. PWA Service Worker设计

#### 3.1 Service Worker架构

##### 3.1.1 SW生命周期

```typescript
// Service Worker生命周期管理
interface ServiceWorkerLifecycle {
  // 注册阶段
  registration: {
    entry: 'src/main.ts';
    code: `
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    }).then(registration => {
      console.log('SW registered:', registration);
    }).catch(error => {
      console.log('SW registration failed:', error);
    });
  });
}
    `;
  };

  // 安装阶段
  install: {
    event: 'install';
    actions: [
      '打开缓存 (Cache Storage API)',
      '预缓存核心资源 (CSS, JS, 字体)',
      '预缓存离线页面',
      '跳过等待 (skipWaiting)'
    ];
    strategy: 'CacheFirst';
  };

  // 激活阶段
  activate: {
    event: 'activate';
    actions: [
      '清理旧缓存',
      '接管所有客户端 (clients.claim())',
      '开启后台同步'
    ];
    strategy: 'VersionedCache';
  };

  // 运行阶段
  fetch: {
    event: 'fetch';
    actions: [
      '拦截网络请求',
      '应用缓存策略',
      '返回缓存或网络响应',
      '更新缓存'
    ];
  };
}
```

##### 3.1.2 Service Worker代码实现

```typescript
// public/sw.ts
/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'hailan-v1.0.0';
const RUNTIME_CACHE = 'hailan-runtime';

// 预缓存资源列表
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/assets/logo.png',
  '/fonts/main.woff2',
  // 核心CSS
  '/styles/main.css',
  '/styles/chunk-vendors.css',
  // 核心JS
  '/js/app.js',
  '/js/chunk-vendors.js'
];

// 安装事件
self.addEventListener('install', (event: ExtendableEvent) => {
  console.log('[SW] Install event triggered');

  event.waitUntil(
    (async () => {
      // 打开缓存
      const cache = await caches.open(CACHE_NAME);

      // 预缓存核心资源
      await cache.addAll(PRECACHE_URLS);

      // 预缓存离线页面
      await cache.add('/offline.html');

      // 立即激活新的SW
      await self.skipWaiting();
      console.log('[SW] Installation complete, precached items:', PRECACHE_URLS.length);
    })()
  );
});

// 激活事件
self.addEventListener('activate', (event: ExtendableEvent) => {
  console.log('[SW] Activate event triggered');

  event.waitUntil(
    (async () => {
      // 清理旧版本缓存
      const cacheNames = await caches.keys();
      const cachesToDelete = cacheNames.filter(name =>
        name !== CACHE_NAME && name !== RUNTIME_CACHE
      );

      await Promise.all(
        cachesToDelete.map(name => caches.delete(name))
      );

      // 接管所有客户端
      await self.clients.claim();
      console.log('[SW] Activation complete');
    })()
  );
});

// 拦截网络请求
self.addEventListener('fetch', (event: FetchEvent) => {
  const { request } = event;
  const url = new URL(request.url);

  // 只处理同源请求
  if (url.origin !== location.origin) {
    return;
  }

  // 根据请求类型应用不同策略
  if (request.method === 'GET') {
    event.respondWith(handleGetRequest(request));
  } else {
    event.respondWith(handlePostRequest(request));
  }
});

// 处理GET请求
async function handleGetRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);

  // 1. API请求 - NetworkFirst策略
  if (url.pathname.startsWith('/api/')) {
    return networkFirst(request);
  }

  // 2. 静态资源 - CacheFirst策略
  if (isStaticResource(request)) {
    return cacheFirst(request);
  }

  // 3. HTML页面 - StaleWhileRevalidate策略
  if (request.headers.get('accept')?.includes('text/html')) {
    return staleWhileRevalidate(request);
  }

  // 4. 图片资源 - CacheFirst策略
  if (request.destination === 'image') {
    return cacheFirst(request);
  }

  // 5. 默认NetworkFirst
  return networkFirst(request);
}

// 处理POST请求
async function handlePostRequest(request: Request): Promise<Response> {
  // POST请求不缓存，直接发起网络请求
  try {
    return await fetch(request.clone());
  } catch (error) {
    // 网络失败时的处理
    return new Response(JSON.stringify({
      error: 'offline',
      message: '网络连接失败，请检查您的网络设置'
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// ========== 缓存策略 ==========

/**
 * NetworkFirst: 优先从网络获取，失败时使用缓存
 */
async function networkFirst(request: Request): Promise<Response> {
  const cache = await caches.open(RUNTIME_CACHE);

  try {
    // 尝试网络请求
    const response = await fetch(request);

    // 如果成功，更新缓存
    if (response.ok) {
      await cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    // 网络失败，尝试从缓存获取
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // 缓存也没有，返回离线页面（仅HTML请求）
    if (request.headers.get('accept')?.includes('text/html')) {
      return caches.match('/offline.html') as Promise<Response>;
    }

    throw error;
  }
}

/**
 * CacheFirst: 优先从缓存获取，失败时发起网络请求
 */
async function cacheFirst(request: Request): Promise<Response> {
  const cache = await caches.open(CACHE_NAME);

  // 尝试从缓存获取
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  // 缓存未命中，发起网络请求
  try {
    const response = await fetch(request);
    if (response.ok) {
      await cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    throw error;
  }
}

/**
 * StaleWhileRevalidate: 立即返回缓存，同时在后台更新缓存
 */
async function staleWhileRevalidate(request: Request): Promise<Response> {
  const cache = await caches.open(RUNTIME_CACHE);

  // 尝试从缓存获取
  const cachedResponse = await cache.match(request);

  // 在后台发起网络请求更新缓存
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  });

  // 立即返回缓存（如果存在）
  if (cachedResponse) {
    return cachedResponse;
  }

  // 缓存未命中，等待网络请求
  return fetchPromise;
}

/**
 * NetworkOnly: 仅从网络获取，不使用缓存
 */
async function networkOnly(request: Request): Promise<Response> {
  return fetch(request);
}

/**
 * CacheOnly: 仅从缓存获取，不发起网络请求
 */
async function cacheOnly(request: Request): Promise<Response> {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  throw new Error('No cache match');
}

// ========== 工具函数 ==========

/**
 * 判断是否为静态资源
 */
function isStaticResource(request: Request): boolean {
  return /\.(?:css|js|woff2?|ttf|otf|eot)$/.test(request.url);
}

// 后台同步
self.addEventListener('sync', (event: any) => {
  console.log('[SW] Background sync triggered:', event.tag);

  if (event.tag === 'sync-cart') {
    event.waitUntil(syncCartData());
  }
});

// 推送通知
self.addEventListener('push', (event: PushEvent) => {
  const options = {
    body: event.data?.text() || '您有新消息',
    icon: '/assets/icon-192.png',
    badge: '/assets/badge-72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: '查看详情',
        icon: '/assets/explore.png'
      },
      {
        action: 'close',
        title: '关闭',
        icon: '/assets/close.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('海蓝', options)
  );
});

// 通知点击事件
self.addEventListener('notificationclick', (event: NotificationEvent) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      self.clients.openWindow('/mall')
    );
  }
});

export null;
```

#### 3.2 缓存策略设计

##### 3.2.1 缓存策略矩阵

```typescript
// 缓存策略配置
interface CacheStrategyConfig {
  // 策略定义
  strategies: {
    // API缓存 - NetworkFirst
    api: {
      pattern: '/api/**';
      strategy: 'NetworkFirst';
      cacheName: 'hailan-api';
      options: {
        networkTimeoutSeconds: 3,
        cacheableResponse: { statuses: [0, 200] },
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 300 // 5分钟
        }
      };
    };

    // 静态资源 - CacheFirst
    static: {
      pattern: '/**/*.{js,css,woff2,ttf,otf}';
      strategy: 'CacheFirst';
      cacheName: 'hailan-static';
      options: {
        cacheableResponse: { statuses: [0, 200] },
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 604800 // 7天
        }
      };
    };

    // 图片缓存 - CacheFirst
    images: {
      pattern: '/**/*.{png,jpg,jpeg,svg,webp,avif,gif}';
      strategy: 'CacheFirst';
      cacheName: 'hailan-images';
      options: {
        cacheableResponse: { statuses: [0, 200] },
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 2592000 // 30天
        }
      };
    };

    // HTML页面 - StaleWhileRevalidate
    html: {
      pattern: '/**/*.html';
      strategy: 'StaleWhileRevalidate';
      cacheName: 'hailan-html';
      options: {
        cacheableResponse: { statuses: [0, 200] }
      };
    };

    // 敏感操作 - NetworkOnly
    sensitive: {
      pattern: ['/api/users/login', '/api/users/register', '/api/orders/**'];
      strategy: 'NetworkOnly';
      cacheName: null;
      options: {};
    };
  };
}
```

##### 3.2.2 缓存优先级

```typescript
// 缓存优先级配置
interface CachePriority {
  // 高优先级 - 核心页面
  high: {
    paths: ['/', '/index.html', '/offline.html'];
    strategy: 'StaleWhileRevalidate';
    preload: true;
  };

  // 中优先级 - 常用资源
  medium: {
    patterns: ['/*.js', '/*.css', '/assets/fonts/*'];
    strategy: 'CacheFirst';
    preload: true;
  };

  // 低优先级 - 其他资源
  low: {
    patterns: ['/*.png', '/*.jpg', '/api/products/**'];
    strategy: 'CacheFirst or NetworkFirst';
    preload: false;
  };
}
```

#### 3.3 离线功能实现

##### 3.3.1 离线页面设计

```html
<!-- public/offline.html -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>离线 - 海蓝</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #E8F4FD 0%, #C5DCF5 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .offline-container {
      text-align: center;
      background: white;
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 8px 24px rgba(0, 86, 179, 0.15);
      max-width: 400px;
    }
    .offline-icon {
      font-size: 64px;
      margin-bottom: 20px;
    }
    h1 {
      color: #0056b3;
      margin-bottom: 10px;
    }
    p {
      color: #616161;
      margin-bottom: 20px;
      line-height: 1.6;
    }
    .retry-btn {
      background: #0056b3;
      color: white;
      border: none;
      padding: 12px 32px;
      border-radius: 16px;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s;
    }
    .retry-btn:hover {
      background: #004794;
    }
  </style>
</head>
<body>
  <div class="offline-container">
    <div class="offline-icon">🌐</div>
    <h1>网络连接失败</h1>
    <p>您当前处于离线状态，部分功能可能无法使用。<br>请检查您的网络连接后重试。</p>
    <button class="retry-btn" onclick="location.reload()">重新连接</button>
  </div>
  <script>
    // 监听网络恢复
    window.addEventListener('online', () => {
      location.reload();
    });
  </script>
</body>
</html>
```

##### 3.3.2 离线数据同步

```typescript
// 离线数据同步服务
interface OfflineSyncService {
  // 同步队列
  syncQueue: {
    storage: 'IndexedDB';
    dbName: 'HailanOfflineQueue';
    storeName: 'syncQueue';
  };

  // 队列操作
  operations: {
    // 添加到同步队列
    enqueue: async (action: SyncAction) => {
      const db = await openDB();
      await db.add('syncQueue', {
        id: generateId(),
        action,
        timestamp: Date.now(),
        retries: 0
      });
    };

    // 处理同步队列
    process: async () => {
      const actions = await getPendingActions();
      for (const action of actions) {
        try {
          await executeAction(action);
          await removeAction(action.id);
        } catch (error) {
          await incrementRetries(action.id);
        }
      }
    };
  };

  // 支持的离线操作
  supportedActions: [
    'addToCart',      // 加入购物车
    'updateQuantity',  // 更新数量
    'removeFromCart',  // 移除商品
    'submitOrder'      // 提交订单
  ];
}

// 购物车离线同步示例
class CartOfflineSync {
  // 离线添加到购物车
  async addToCartOffline(productId: string, quantity: number) {
    // 1. 添加到本地存储
    await this.addToLocalCart(productId, quantity);

    // 2. 添加到同步队列
    await enqueue({
      type: 'addToCart',
      data: { productId, quantity },
      timestamp: Date.now()
    });

    // 3. 注册后台同步
    await this.registerBackgroundSync();
  }

  // 注册后台同步
  async registerBackgroundSync() {
    if ('serviceWorker' in navigator && 'sync' in ServiceWorkerRegistration.prototype) {
      const registration = await navigator.serviceWorker.ready;
      await registration.sync.register('sync-cart');
    }
  }
}
```

#### 3.4 Web App Manifest

##### 3.4.1 Manifest配置

```json
{
  "name": "海蓝 - 高端私密智能健康生活管理平台",
  "short_name": "海蓝",
  "description": "新一代高端、私密、智能的情趣健康生活管理平台",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "theme_color": "#0056b3",
  "background_color": "#E8F4FD",
  "lang": "zh-CN",
  "dir": "ltr",
  "icons": [
    {
      "src": "/assets/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/assets/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/assets/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/assets/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/assets/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/assets/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/assets/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/assets/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/assets/icons/maskable-icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "screenshots": [
    {
      "src": "/assets/screenshots/home-wide.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide"
    },
    {
      "src": "/assets/screenshots/home-narrow.png",
      "sizes": "750x1334",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ],
  "shortcuts": [
    {
      "name": "商城首页",
      "short_name": "商城",
      "description": "浏览商品和优惠活动",
      "url": "/mall",
      "icons": [{ "src": "/assets/icons/shortcut-mall.png", "sizes": "96x96" }]
    },
    {
      "name": "AI助手",
      "short_name": "AI",
      "description": "智能健康咨询",
      "url": "/ai",
      "icons": [{ "src": "/assets/icons/shortcut-ai.png", "sizes": "96x96" }]
    },
    {
      "name": "购物车",
      "short_name": "购物车",
      "description": "查看购物车",
      "url": "/cart",
      "icons": [{ "src": "/assets/icons/shortcut-cart.png", "sizes": "96x96" }]
    }
  ],
  "categories": ["health", "lifestyle", "shopping"],
  "related_applications": [],
  "prefer_related_applications": false,
  "scope": "/",
  "protocol_handlers": []
}
```

#### 3.5 安装引导设计

##### 3.5.1 安装提示组件

```typescript
// PWA安装提示组件
// src/components/PWAInstallPrompt.vue
<template>
  <Transition name="fade">
    <div v-if="showPrompt" class="install-prompt">
      <div class="prompt-content">
        <div class="app-icon">
          <img src="/assets/icons/icon-192x192.png" alt="海蓝" />
        </div>
        <div class="app-info">
          <h3>安装海蓝到桌面</h3>
          <p>获得更好的使用体验</p>
          <ul class="features">
            <li>✓ 离线浏览</li>
            <li>✓ 快速启动</li>
            <li>✓ 消息推送</li>
          </ul>
        </div>
        <div class="prompt-actions">
          <button class="btn-install" @click="install">
            立即安装
          </button>
          <button class="btn-dismiss" @click="dismiss">
            暂不
          </button>
        </div>
        <button class="btn-close" @click="dismiss">✕</button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const showPrompt = ref(false);
let deferredPrompt: any = null;

onMounted(() => {
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
});

function handleBeforeInstallPrompt(e: Event) {
  // 阻止默认安装提示
  e.preventDefault();
  deferredPrompt = e;

  // 检查是否已安装
  const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
  if (!isInstalled) {
    // 延迟显示，避免影响首屏加载
    setTimeout(() => {
      showPrompt.value = true;
    }, 3000);
  }
}

async function install() {
  if (!deferredPrompt) {
    return;
  }

  // 显示安装提示
  deferredPrompt.prompt();

  // 等待用户响应
  const { outcome } = await deferredPrompt.userChoice;

  if (outcome === 'accepted') {
    console.log('PWA安装接受');
  } else {
    console.log('PWA安装拒绝');
  }

  deferredPrompt = null;
  showPrompt.value = false;
}

function dismiss() {
  showPrompt.value = false;
  // 记录用户拒绝，7天内不再提示
  localStorage.setItem('pwa-install-dismissed', Date.now().toString());
}
</script>

<style scoped>
.install-prompt {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: 90%;
  max-width: 400px;
}

.prompt-content {
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 86, 179, 0.2);
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
}

.app-icon img {
  width: 64px;
  height: 64px;
  border-radius: 16px;
}

.app-info {
  flex: 1;
}

.app-info h3 {
  color: #1A1A1A;
  font-size: 18px;
  margin-bottom: 4px;
}

.app-info p {
  color: #757575;
  font-size: 14px;
  margin-bottom: 8px;
}

.features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features li {
  color: #4CAF50;
  font-size: 12px;
  margin-bottom: 2px;
}

.prompt-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.btn-install {
  background: #0056b3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 12px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
}

.btn-dismiss {
  background: transparent;
  color: #757575;
  border: none;
  padding: 8px 16px;
  font-size: 13px;
  cursor: pointer;
}

.btn-close {
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #9E9E9E;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}
</style>
```

#### 3.6 性能监控

##### 3.6.1 性能指标监控

```typescript
// PWA性能监控
interface PWAPerformanceMonitoring {
  // 核心性能指标
  metrics: {
    // 首次内容绘制
    fcp: {
      name: 'First Contentful Paint';
      threshold: 2000; // 2秒
      measure: 'performance.getEntriesByName("first-contentful-paint")'
    };

    // 最大内容绘制
    lcp: {
      name: 'Largest Contentful Paint';
      threshold: 2500; // 2.5秒
      measure: 'new PerformanceObserver("lcp")'
    };

    // 首次输入延迟
    fid: {
      name: 'First Input Delay';
      threshold: 100; // 100ms
      measure: 'new PerformanceObserver("fid")'
    };

    // 累积布局偏移
    cls: {
      name: 'Cumulative Layout Shift';
      threshold: 0.1;
      measure: 'new PerformanceObserver("cls")'
    };
  };

  // 缓存命中率监控
  cacheHitRate: {
    total: 0;
    hits: 0;
    calculate: () => (hits / total) * 100,
    target: 80 // 目标80%
  };
}

// 性能监控Service Worker代码
self.addEventListener('fetch', (event: FetchEvent) => {
  const startTime = performance.now();

  event.respondWith(
    (async () => {
      const cache = await caches.open(RUNTIME_CACHE);
      const cachedResponse = await cache.match(event.request);

      if (cachedResponse) {
        // 缓存命中
        reportCacheHit(event.request.url, performance.now() - startTime);
        return cachedResponse;
      }

      // 缓存未命中
      const networkResponse = await fetch(event.request);
      reportCacheMiss(event.request.url, performance.now() - startTime);

      return networkResponse;
    })()
  );
});

function reportCacheHit(url: string, duration: number) {
  // 发送性能数据到分析服务
  sendAnalytics('cache-hit', { url, duration });
}

function reportCacheMiss(url: string, duration: number) {
  sendAnalytics('cache-miss', { url, duration });
}
```

---

## 附录

### A. Service Worker调试工具

### B. 缓存策略对比表

### C. 性能优化建议

### D. 术语表

| 术语 | 说明 |
|-----|------|
| **SW** | Service Worker |
| **CacheFirst** | 缓存优先策略 |
| **NetworkFirst** | 网络优先策略 |
| **StaleWhileRevalidate** | 后台更新策略 |

### E. 修订历史

| 版本 | 日期 | 修订人 | 修订内容 |
|-----|------|-------|---------|
| v1.0.0 | 2026-01-26 | YanYuCloudCube Team | 初始版本创建 |

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
