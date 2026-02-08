---
file: 103-Uni-app开发规范.md
description: HaiLan Pro Uni-app框架开发规范，包含多端兼容、生命周期、API使用等
author: YanYuCloudCube Team
version: v1.0.0
created: 2026-01-26
updated: 2026-01-26
status: published
tags:
  - HaiLan-Pro-开发规范,[]
---

> ***YanYuCloudCube***
> **标语**：言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> **标语**：万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 103 Uni-app开发规范

## 概述

本文档详细描述HaiLan Pro-HaiLan-Pro-开发规范-Uni-app开发规范相关内容，确保项目按照YYC³标准规范进行开发和实施。

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
- 规范Uni-app开发规范相关的业务标准与技术落地要求
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

### 3. Uni-app开发规范

#### 3.1 多端兼容性规范

```typescript
// 条件编译 - 平台特定代码
// #ifdef H5
console.log('这是H5端代码');
// #endif

// #ifdef MP-WEIXIN
console.log('这是微信小程序代码');
// #endif

// #ifdef MP-ALIPAY
console.log('这是支付宝小程序代码');
// #endif

// #ifndef H5
console.log('非H5平台执行');
// #endif

// API条件编译示例
function showToast(message: string) {
  // #ifdef H5
  uni.showToast({ title: message, icon: 'none' });
  // #endif

  // #ifdef MP-WEIXIN
  wx.showToast({ title: message, icon: 'none' });
  // #endif
}
```

**平台检测工具**

```typescript
// utils/platform.ts
export enum Platform {
  H5 = 'h5',
  MP_WEIXIN = 'mp-weixin',
  MP_ALIPAY = 'mp-alipay',
  APP = 'app',
}

export function getPlatform(): Platform {
  // #ifdef H5
  return Platform.H5;
  // #endif

  // #ifdef MP-WEIXIN
  return Platform.MP_WEIXIN;
  // #endif

  // #ifdef MP-ALIPAY
  return Platform.MP_ALIPAY;
  // #endif

  // #ifdef APP-PLUS
  return Platform.APP;
  // #endif

  return Platform.H5; // 默认
}

export function isH5(): boolean {
  // #ifdef H5
  return true;
  // #endif
  return false;
}

export function isMiniProgram(): boolean {
  // #ifdef MP-WEIXIN || MP-ALIPAY
  return true;
  // #endif
  return false;
}
```

#### 3.2 生命周期规范

```vue
<!-- 页面生命周期 -->
<template>
  <view class="page">
    <text>{{ message }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onLoad, onShow, onHide, onUnload, onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app';

const message = ref('Hello');

// 页面加载时触发，只触发一次
onLoad((options) => {
  console.log('页面参数:', options);
  // 获取页面跳转传递的参数
  const id = options?.id;
});

// 页面显示时触发
onShow(() => {
  console.log('页面显示');
  // 刷新数据
});

// 页面隐藏时触发
onHide(() => {
  console.log('页面隐藏');
  // 暂停定时器等
});

// 页面卸载时触发
onUnload(() => {
  console.log('页面卸载');
  // 清理资源
});

// 上拉加载
onReachBottom(() => {
  console.log('触底加载更多');
  loadMoreData();
});

// 下拉刷新
onPullDownRefresh(() => {
  console.log('下拉刷新');
  refreshData().then(() => {
    uni.stopPullDownRefresh(); // 停止下拉刷新动画
  });
});
</script>
```

**组件生命周期**

```vue
<!-- components/PrivacySwitch.vue -->
<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';

const isActive = ref(false);

// Vue 3标准生命周期 + uni-app组件生命周期
onMounted(() => {
  console.log('组件挂载完成');
  // 初始化组件
});

onBeforeUnmount(() => {
  console.log('组件即将卸载');
  // 清理资源
});
</script>
```

#### 3.3 路由与页面跳转

```typescript
// router/index.ts
export interface RouteOptions {
  url: string;
  params?: Record<string, any>;
  animationType?: 'pop-in' | 'slide-in-right' | 'fade-in';
}

// 页面跳转
export function navigateTo(options: RouteOptions) {
  const url = buildUrl(options.url, options.params);
  uni.navigateTo({
    url,
    animationType: options.animationType || 'slide-in-right',
  });
}

// 页面重定向
export function redirectTo(options: RouteOptions) {
  const url = buildUrl(options.url, options.params);
  uni.redirectTo({ url });
}

// Tab切换
export function switchTab(url: string) {
  uni.switchTab({ url });
}

// 返回上一页
export function navigateBack(delta: number = 1) {
  uni.navigateBack({ delta });
}

// 构建URL参数
function buildUrl(path: string, params?: Record<string, any>): string {
  if (!params) return path;
  const query = Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');
  return `${path}?${query}`;
}

// 使用示例
navigateTo({
  url: '/pages/mall/product-detail',
  params: { id: '123', from: 'home' }
});
```

#### 3.4 数据存储规范

```typescript
// utils/storage.ts
export class Storage {
  /**
   * 设置数据
   */
  static set(key: string, value: any): void {
    try {
      const data = JSON.stringify(value);
      uni.setStorageSync(key, data);
    } catch (error) {
      console.error('Storage set error:', error);
    }
  }

  /**
   * 获取数据
   */
  static get<T = any>(key: string): T | null {
    try {
      const data = uni.getStorageSync(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  }

  /**
   * 删除数据
   */
  static remove(key: string): void {
    uni.removeStorageSync(key);
  }

  /**
   * 清空所有数据
   */
  static clear(): void {
    uni.clearStorageSync();
  }

  /**
   * 获取存储信息
   */
  static getInfo() {
    return uni.getStorageInfoSync();
  }
}

// 敏感数据加密存储
import { encrypt, decrypt } from './crypto';

export class SecureStorage {
  static set(key: string, value: any): void {
    const encrypted = encrypt(JSON.stringify(value));
    Storage.set(key, encrypted);
  }

  static get<T = any>(key: string): T | null {
    const encrypted = Storage.get<string>(key);
    if (!encrypted) return null;
    try {
      const decrypted = decrypt(encrypted);
      return JSON.parse(decrypted);
    } catch {
      return null;
    }
  }
}
```

#### 3.5 网络请求封装

```typescript
// utils/request.ts
interface RequestOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  header?: Record<string, string>;
  showLoading?: boolean;
  loadingText?: string;
}

interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

class Request {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || '';
    this.token = uni.getStorageSync('auth_token');
  }

  request<T = any>(options: RequestOptions): Promise<T> {
    const { showLoading = false, loadingText = '加载中...' } = options;

    return new Promise((resolve, reject) => {
      // 显示加载提示
      if (showLoading) {
        uni.showLoading({ title: loadingText, mask: true });
      }

      uni.request({
        url: this.baseURL + options.url,
        method: options.method || 'GET',
        data: options.data,
        header: {
          'Content-Type': 'application/json',
          'Authorization': this.token ? `Bearer ${this.token}` : '',
          ...options.header,
        },
        success: (res: any) => {
          if (showLoading) uni.hideLoading();

          const response = res.data as ApiResponse<T>;

          if (response.code === 0) {
            resolve(response.data);
          } else {
            // 业务错误
            uni.showToast({
              title: response.message || '请求失败',
              icon: 'none',
            });
            reject(new Error(response.message));
          }
        },
        fail: (error) => {
          if (showLoading) uni.hideLoading();

          uni.showToast({
            title: '网络请求失败',
            icon: 'none',
          });
          reject(error);
        },
      });
    });
  }

  get<T = any>(url: string, data?: any): Promise<T> {
    return this.request<T>({ url, method: 'GET', data });
  }

  post<T = any>(url: string, data?: any): Promise<T> {
    return this.request<T>({ url, method: 'POST', data });
  }

  put<T = any>(url: string, data?: any): Promise<T> {
    return this.request<T>({ url, method: 'PUT', data });
  }

  delete<T = any>(url: string, data?: any): Promise<T> {
    return this.request<T>({ url, method: 'DELETE', data });
  }

  setToken(token: string) {
    this.token = token;
    uni.setStorageSync('auth_token', token);
  }

  clearToken() {
    this.token = null;
    uni.removeStorageSync('auth_token');
  }
}

export const request = new Request();
```

#### 3.6 平台特定API封装

```typescript
// utils/platform-api.ts
import { getPlatform, Platform } from './platform';

/**
 * 扫码功能
 */
export function scanCode(): Promise<string> {
  return new Promise((resolve, reject) => {
    // #ifdef H5
    uni.showToast({ title: 'H5不支持扫码', icon: 'none' });
    reject(new Error('Not supported'));
    // #endif

    // #ifdef MP-WEIXIN
    uni.scanCode({
      success: (res) => resolve(res.result),
      fail: reject,
    });
    // #endif

    // #ifdef APP-PLUS
    const barcode = plus.barcode.create('barcode', [plus.barcode.QR, plus.barcode.EAN]);
    // ... APP扫码实现
    // #endif
  });
}

/**
 * 定位功能
 */
export function getLocation(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    uni.getLocation({
      type: 'gcj02',
      success: (res) => {
        resolve({
          latitude: res.latitude,
          longitude: res.longitude,
        });
      },
      fail: reject,
    });
  });
}

/**
 * 选择图片
 */
export function chooseImage(options: {
  count?: number;
  sizeType?: Array<'original' | 'compressed'>;
  sourceType?: Array<'album' | 'camera'>;
}): Promise<string[]> {
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count: options.count || 1,
      sizeType: options.sizeType || ['compressed'],
      sourceType: options.sourceType || ['album', 'camera'],
      success: (res) => resolve(res.tempFilePaths),
      fail: reject,
    });
  });
}

/**
 * 支付功能
 */
export function requestPayment(orderInfo: any): Promise<void> {
  return new Promise((resolve, reject) => {
    const platform = getPlatform();

    // #ifdef MP-WEIXIN
    uni.requestPayment({
      provider: 'wxpay',
      ...orderInfo,
      success: () => resolve(),
      fail: reject,
    });
    // #endif

    // #ifdef MP-ALIPAY
    uni.requestPayment({
      provider: 'alipay',
      ...orderInfo,
      success: () => resolve(),
      fail: reject,
    });
    // #endif

    // #ifdef H5
    // H5使用支付宝/微信H5支付
    reject(new Error('H5支付待实现'));
    // #endif
  });
}
```

#### 3.7 性能优化规范

```typescript
// 图片懒加载
<template>
  <image :src="imageSrc" lazy-load mode="aspectFill" />
</template>

// 长列表性能优化 - 使用recycle-view
<template>
  <recycle-view :height="500" @scroll="onScroll">
    <recycle-item v-for="item in longList" :key="item.id">
      <view>{{ item.name }}</view>
    </recycle-item>
  </recycle-view>
</template>

// 分包加载配置
// pages.json
{
  "subPackages": [
    {
      "root": "pages/mall",
      "pages": [
        {
          "path": "index",
          "style": { "navigationBarTitleText": "商城" }
        }
      ]
    },
    {
      "root": "pages/privacy",
      "pages": [
        {
          "path": "index",
          "style": { "navigationBarTitleText": "隐私中心" }
        }
      ]
    }
  ],
  "preloadRule": {
    "pages/index/index": {
      "network": "all",
      "packages": ["pages/mall"]
    }
  }
}
```

#### 3.8 pages.json配置规范

```json
{
  "pages": [
    {
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "海蓝",
        "navigationBarBackgroundColor": "#0056b3",
        "navigationBarTextStyle": "white",
        "backgroundColor": "#f5f5f5",
        "enablePullDownRefresh": true
      }
    }
  ],
  "globalStyle": {
    "navigationBarTextStyle": "white",
    "navigationBarTitleText": "海蓝Pro",
    "navigationBarBackgroundColor": "#0056b3",
    "backgroundColor": "#f5f5f5",
    "backgroundTextStyle": "light"
  },
  "tabBar": {
    "color": "#999999",
    "selectedColor": "#0056b3",
    "backgroundColor": "#ffffff",
    "borderStyle": "black",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "static/icons/home.png",
        "selectedIconPath": "static/icons/home-active.png"
      },
      {
        "pagePath": "pages/mall/index",
        "text": "商城",
        "iconPath": "static/icons/mall.png",
        "selectedIconPath": "static/icons/mall-active.png"
      },
      {
        "pagePath": "pages/ai/index",
        "text": "AI伴侣",
        "iconPath": "static/icons/ai.png",
        "selectedIconPath": "static/icons/ai-active.png"
      },
      {
        "pagePath": "pages/privacy/index",
        "text": "隐私中心",
        "iconPath": "static/icons/privacy.png",
        "selectedIconPath": "static/icons/privacy-active.png"
      },
      {
        "pagePath": "pages/profile/index",
        "text": "我的",
        "iconPath": "static/icons/profile.png",
        "selectedIconPath": "static/icons/profile-active.png"
      }
    ]
  },
  "easycom": {
    "autoscan": true,
    "custom": {
      "^hl-(.*)": "@/components/hl-$1.vue"
    }
  }
}
```

#### 3.9 隐私安全规范

```typescript
// 隐私模式下隐藏敏感信息
import { usePrivacyStore } from '@/stores/privacy';

function formatPhoneNumber(phone: string): string {
  const privacyStore = usePrivacyStore();

  if (privacyStore.isStealthMode || privacyStore.isDisguiseMode) {
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  }

  return phone;
}

// 虚拟数据生成（伪装模式）
function generateVirtualData(realData: any): any {
  const privacyStore = usePrivacyStore();

  if (privacyStore.isDisguiseMode) {
    return {
      ...realData,
      nickname: generateVirtualNickname(),
      avatar: getDisguiseAvatar(),
      address: generateVirtualAddress(),
    };
  }

  return realData;
}
```

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
