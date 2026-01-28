/**
 * Service Worker注册和管理
 */

export interface ServiceWorkerConfig {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onOfflineReady?: () => void;
  onError?: (error: Error) => void;
}

/**
 * 注册Service Worker
 */
export function registerServiceWorker(config?: ServiceWorkerConfig) {
  // 只在生产环境和支持SW的浏览器中注册
  if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `/sw.js`;
      registerValidSW(swUrl, config);
    });
  }
}

/**
 * 注册并验证Service Worker
 */
async function registerValidSW(swUrl: string, config?: ServiceWorkerConfig) {
  try {
    const registration = await navigator.serviceWorker.register(swUrl);
    
    console.log('[SW Registration] Service Worker registered successfully');
    
    // 监听更新
    registration.addEventListener('updatefound', () => {
      const installingWorker = registration.installing;
      
      if (installingWorker) {
        installingWorker.addEventListener('statechange', () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // 有新版本可用
              console.log('[SW Registration] New content is available; please refresh.');
              config?.onUpdate?.(registration);
            } else {
              // 首次安装完成
              console.log('[SW Registration] Content is cached for offline use.');
              config?.onSuccess?.(registration);
              config?.onOfflineReady?.();
            }
          }
        });
      }
    });
    
    // 定期检查更新
    setInterval(() => {
      registration.update();
    }, 60 * 60 * 1000); // 每小时检查一次
    
  } catch (error) {
    console.error('[SW Registration] Service Worker registration failed:', error);
    config?.onError?.(error as Error);
  }
}

/**
 * 注销Service Worker
 */
export async function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      const unregistered = await registration.unregister();
      
      if (unregistered) {
        console.log('[SW Registration] Service Worker unregistered successfully');
      }
    } catch (error) {
      console.error('[SW Registration] Failed to unregister Service Worker:', error);
    }
  }
}

/**
 * 获取Service Worker版本
 */
export async function getServiceWorkerVersion(): Promise<string | null> {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    return new Promise((resolve) => {
      const messageChannel = new MessageChannel();
      
      messageChannel.port1.onmessage = (event) => {
        resolve(event.data.version || null);
      };
      
      navigator.serviceWorker.controller.postMessage(
        { type: 'GET_VERSION' },
        [messageChannel.port2]
      );
      
      // 超时处理
      setTimeout(() => resolve(null), 1000);
    });
  }
  
  return null;
}

/**
 * 清除所有缓存
 */
export async function clearAllCaches(): Promise<boolean> {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    return new Promise((resolve) => {
      const messageChannel = new MessageChannel();
      
      messageChannel.port1.onmessage = (event) => {
        resolve(event.data.success || false);
      };
      
      navigator.serviceWorker.controller.postMessage(
        { type: 'CLEAR_CACHE' },
        [messageChannel.port2]
      );
      
      // 超时处理
      setTimeout(() => resolve(false), 3000);
    });
  }
  
  return false;
}

/**
 * 检查是否在PWA模式下运行
 */
export function isPWA(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as any).standalone === true ||
         document.referrer.includes('android-app://');
}

/**
 * 请求推送通知权限
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    console.warn('[Notification] Notifications are not supported');
    return 'denied';
  }
  
  if (Notification.permission === 'granted') {
    return 'granted';
  }
  
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission;
  }
  
  return Notification.permission;
}

/**
 * 订阅推送通知
 */
export async function subscribeToPushNotifications(): Promise<PushSubscription | null> {
  try {
    const registration = await navigator.serviceWorker.ready;
    
    // 检查是否已订阅
    let subscription = await registration.pushManager.getSubscription();
    
    if (!subscription) {
      // 创建新订阅
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          import.meta.env.VITE_VAPID_PUBLIC_KEY || ''
        ),
      });
      
      console.log('[Push] Subscribed to push notifications');
    }
    
    return subscription;
  } catch (error) {
    console.error('[Push] Failed to subscribe to push notifications:', error);
    return null;
  }
}

/**
 * 取消推送通知订阅
 */
export async function unsubscribeFromPushNotifications(): Promise<boolean> {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    
    if (subscription) {
      const unsubscribed = await subscription.unsubscribe();
      console.log('[Push] Unsubscribed from push notifications');
      return unsubscribed;
    }
    
    return true;
  } catch (error) {
    console.error('[Push] Failed to unsubscribe from push notifications:', error);
    return false;
  }
}

/**
 * 注册后台同步
 */
export async function registerBackgroundSync(tag: string): Promise<boolean> {
  try {
    const registration = await navigator.serviceWorker.ready;
    
    if ('sync' in registration) {
      await (registration as any).sync.register(tag);
      console.log(`[Sync] Registered background sync: ${tag}`);
      return true;
    }
    
    console.warn('[Sync] Background sync is not supported');
    return false;
  } catch (error) {
    console.error('[Sync] Failed to register background sync:', error);
    return false;
  }
}

// ==================== 辅助函数 ====================

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  
  return outputArray;
}
