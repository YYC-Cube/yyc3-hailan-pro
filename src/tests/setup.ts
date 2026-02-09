/**
 * Vitest测试环境配置
 * @隐私保护 - 测试环境使用mock数据，不涉及真实用户数据
 */

import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// 每个测试后清理
afterEach(() => {
  cleanup();
});

// Mock IndexedDB
class IDBFactoryMock {
  open(name: string, version?: number) {
    return {
      onerror: null,
      onsuccess: null,
      onupgradeneeded: null,
      result: null,
    };
  }
  
  deleteDatabase(name: string) {
    return {};
  }
}

global.indexedDB = new IDBFactoryMock() as IDBFactory;

// Mock Notification API
class NotificationMock {
  static permission: NotificationPermission = 'default';
  
  static requestPermission(): Promise<NotificationPermission> {
    return Promise.resolve('granted');
  }
  
  constructor(title: string, options?: NotificationOptions) {
    // Mock implementation
  }
  
  close() {}
}

global.Notification = NotificationMock as unknown as typeof Notification;

// Mock Service Worker
global.navigator.serviceWorker = {
  ready: Promise.resolve({
    showNotification: vi.fn(),
    getNotifications: vi.fn().mockResolvedValue([]),
  } as unknown as ServiceWorkerRegistration),
  controller: {} as ServiceWorker,
} as ServiceWorkerContainer;

// Mock Network Information API
Object.defineProperty(global.navigator, 'connection', {
  value: {
    effectiveType: '4g',
    downlink: 10,
    rtt: 50,
    saveData: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  },
  writable: true,
  configurable: true,
});

// Mock Battery API
Object.defineProperty(global.navigator, 'getBattery', {
  value: () => Promise.resolve({
    level: 0.8,
    charging: true,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }),
  writable: true,
  configurable: true,
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

global.localStorage = localStorageMock as Storage;
