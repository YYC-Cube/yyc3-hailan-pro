/**
 * 推送通知管理器
 * @隐私保护 - 所有推送需明确用户授权，支持通知分组和免打扰
 * 提供个性化推送策略、通知分组、免打扰模式
 */

import { requestNotificationPermission, subscribeToPushNotifications } from './registerServiceWorker';

export type NotificationCategory = 
  | 'order'          // 订单通知
  | 'promotion'      // 促销通知
  | 'health'         // 健康提醒
  | 'system'         // 系统通知
  | 'social';        // 社交互动

export interface NotificationPreferences {
  enabled: boolean;
  categories: {
    [key in NotificationCategory]: boolean;
  };
  quietHours: {
    enabled: boolean;
    start: string; // HH:MM
    end: string;   // HH:MM
  };
  sound: boolean;
  vibrate: boolean;
}

export interface PushNotificationOptions {
  title: string;
  body: string;
  category: NotificationCategory;
  icon?: string;
  badge?: string;
  image?: string;
  tag?: string;
  url?: string;
  data?: any;
  requireInteraction?: boolean;
  silent?: boolean;
  actions?: Array<{
    action: string;
    title: string;
    icon?: string;
  }>;
}

const PREFERENCES_KEY = 'hailan_notification_preferences';
const DEFAULT_PREFERENCES: NotificationPreferences = {
  enabled: false,
  categories: {
    order: true,
    promotion: false,
    health: true,
    system: true,
    social: true,
  },
  quietHours: {
    enabled: false,
    start: '22:00',
    end: '08:00',
  },
  sound: true,
  vibrate: true,
};

/**
 * 获取通知偏好设置
 */
export function getNotificationPreferences(): NotificationPreferences {
  try {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    if (stored) {
      return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('[Notifications] Failed to load preferences:', error);
  }
  return DEFAULT_PREFERENCES;
}

/**
 * 保存通知偏好设置
 */
export function saveNotificationPreferences(preferences: NotificationPreferences): void {
  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
    console.log('[Notifications] Preferences saved');
  } catch (error) {
    console.error('[Notifications] Failed to save preferences:', error);
  }
}

/**
 * 检查是否在免打扰时段
 */
export function isQuietHours(): boolean {
  const preferences = getNotificationPreferences();
  
  if (!preferences.quietHours.enabled) {
    return false;
  }
  
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  const { start, end } = preferences.quietHours;
  
  // 处理跨天的情况（例如 22:00 - 08:00）
  if (start > end) {
    return currentTime >= start || currentTime <= end;
  }
  
  return currentTime >= start && currentTime <= end;
}

/**
 * 检查是否应该显示通知
 */
export function shouldShowNotification(category: NotificationCategory): boolean {
  const preferences = getNotificationPreferences();
  
  // 全局通知未启用
  if (!preferences.enabled) {
    console.log('[Notifications] Notifications are globally disabled');
    return false;
  }
  
  // 分类通知未启用
  if (!preferences.categories[category]) {
    console.log(`[Notifications] Category ${category} is disabled`);
    return false;
  }
  
  // 在免打扰时段（系统通知除外）
  if (category !== 'system' && isQuietHours()) {
    console.log('[Notifications] In quiet hours');
    return false;
  }
  
  // 浏览器通知权限未授予
  if (Notification.permission !== 'granted') {
    console.log('[Notifications] Permission not granted');
    return false;
  }
  
  return true;
}

/**
 * 请求并启用通知
 */
export async function enableNotifications(): Promise<boolean> {
  try {
    const permission = await requestNotificationPermission();
    
    if (permission === 'granted') {
      // 订阅推送服务
      await subscribeToPushNotifications();
      
      // 更新偏好设置
      const preferences = getNotificationPreferences();
      preferences.enabled = true;
      saveNotificationPreferences(preferences);
      
      console.log('[Notifications] Notifications enabled successfully');
      return true;
    }
    
    console.log('[Notifications] Permission denied');
    return false;
  } catch (error) {
    console.error('[Notifications] Failed to enable notifications:', error);
    return false;
  }
}

/**
 * 禁用通知
 */
export function disableNotifications(): void {
  const preferences = getNotificationPreferences();
  preferences.enabled = false;
  saveNotificationPreferences(preferences);
  
  console.log('[Notifications] Notifications disabled');
}

/**
 * 显示本地通知
 */
export async function showLocalNotification(options: PushNotificationOptions): Promise<void> {
  if (!shouldShowNotification(options.category)) {
    return;
  }
  
  const preferences = getNotificationPreferences();
  
  const notificationOptions: NotificationOptions = {
    body: options.body,
    icon: options.icon || '/icons/icon-192x192.png',
    badge: options.badge || '/icons/badge-72x72.png',
    image: options.image,
    tag: options.tag || `${options.category}-${Date.now()}`,
    data: {
      ...options.data,
      url: options.url || '/',
      category: options.category,
    },
    requireInteraction: options.requireInteraction || false,
    silent: options.silent || !preferences.sound,
    vibrate: preferences.vibrate ? [200, 100, 200] : undefined,
    actions: options.actions,
  };
  
  try {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      // 通过Service Worker显示通知
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(options.title, notificationOptions);
    } else {
      // 直接显示通知
      new Notification(options.title, notificationOptions);
    }
    
    console.log('[Notifications] Notification shown:', options.title);
  } catch (error) {
    console.error('[Notifications] Failed to show notification:', error);
  }
}

/**
 * 通知类别的中文名称
 */
export function getCategoryName(category: NotificationCategory): string {
  const names: Record<NotificationCategory, string> = {
    order: '订单通知',
    promotion: '促销通知',
    health: '健康提醒',
    system: '系统通知',
    social: '社交互动',
  };
  return names[category];
}

/**
 * 通知类别的描述
 */
export function getCategoryDescription(category: NotificationCategory): string {
  const descriptions: Record<NotificationCategory, string> = {
    order: '订单状态更新、发货提醒、配送通知',
    promotion: '限时优惠、新品上线、专属折扣',
    health: '使用提醒、健康记录、定时关怀',
    system: '系统更新、安全提示、重要公告',
    social: '评论回复、点赞收藏、关注动态',
  };
  return descriptions[category];
}

/**
 * 通知管理器类
 */
export class NotificationManager {
  private preferences: NotificationPreferences;
  
  constructor() {
    this.preferences = getNotificationPreferences();
  }
  
  /**
   * 更新偏好设置
   */
  updatePreferences(preferences: Partial<NotificationPreferences>): void {
    this.preferences = { ...this.preferences, ...preferences };
    saveNotificationPreferences(this.preferences);
  }
  
  /**
   * 切换分类通知
   */
  toggleCategory(category: NotificationCategory, enabled: boolean): void {
    this.preferences.categories[category] = enabled;
    saveNotificationPreferences(this.preferences);
  }
  
  /**
   * 设置免打扰时段
   */
  setQuietHours(enabled: boolean, start?: string, end?: string): void {
    this.preferences.quietHours.enabled = enabled;
    if (start) this.preferences.quietHours.start = start;
    if (end) this.preferences.quietHours.end = end;
    saveNotificationPreferences(this.preferences);
  }
  
  /**
   * 发送订单通知
   */
  async notifyOrder(title: string, body: string, orderId: string): Promise<void> {
    await showLocalNotification({
      title,
      body,
      category: 'order',
      tag: `order-${orderId}`,
      url: `/orders/${orderId}`,
      data: { orderId },
      requireInteraction: true,
      actions: [
        { action: 'view', title: '查看详情' },
        { action: 'close', title: '关闭' },
      ],
    });
  }
  
  /**
   * 发送促销通知
   */
  async notifyPromotion(title: string, body: string, promotionId?: string): Promise<void> {
    await showLocalNotification({
      title,
      body,
      category: 'promotion',
      tag: promotionId ? `promotion-${promotionId}` : undefined,
      url: promotionId ? `/promotions/${promotionId}` : '/shop',
      data: { promotionId },
    });
  }
  
  /**
   * 发送健康提醒
   */
  async notifyHealth(title: string, body: string, reminderType?: string): Promise<void> {
    await showLocalNotification({
      title,
      body,
      category: 'health',
      tag: reminderType ? `health-${reminderType}` : undefined,
      url: '/health',
      data: { reminderType },
      requireInteraction: true,
      actions: [
        { action: 'acknowledge', title: '知道了' },
        { action: 'snooze', title: '稍后提醒' },
      ],
    });
  }
  
  /**
   * 发送系统通知
   */
  async notifySystem(title: string, body: string): Promise<void> {
    await showLocalNotification({
      title,
      body,
      category: 'system',
      tag: 'system',
      requireInteraction: true,
    });
  }
  
  /**
   * 发送社交通知
   */
  async notifySocial(title: string, body: string, actionType: string, actionId: string): Promise<void> {
    await showLocalNotification({
      title,
      body,
      category: 'social',
      tag: `${actionType}-${actionId}`,
      url: `/activity/${actionId}`,
      data: { actionType, actionId },
    });
  }
  
  /**
   * 获取未读通知数量（模拟）
   */
  getUnreadCount(): number {
    // 实际应用中，这里应该从后端API获取
    return 0;
  }
  
  /**
   * 清除所有通知
   */
  async clearAll(): Promise<void> {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const notifications = await registration.getNotifications();
        
        notifications.forEach((notification) => {
          notification.close();
        });
        
        console.log('[Notifications] All notifications cleared');
      } catch (error) {
        console.error('[Notifications] Failed to clear notifications:', error);
      }
    }
  }
  
  /**
   * 获取当前显示的通知
   */
  async getActiveNotifications(): Promise<Notification[]> {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        return await registration.getNotifications();
      } catch (error) {
        console.error('[Notifications] Failed to get notifications:', error);
        return [];
      }
    }
    return [];
  }
}

/**
 * 全局通知管理器实例
 */
export const notificationManager = new NotificationManager();
