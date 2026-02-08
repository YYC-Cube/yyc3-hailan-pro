---
@file: 091-前端-TypeScript全局类型声明.md
@description: HaiLan Pro 前端TS全局公共类型、接口、枚举的统一声明与约束
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2026-01-26
@updated: 2026-01-26
@status: published
@tags: [HaiLan-Pro-类型定义],[]
---

> ***YanYuCloudCube***
> **标语**：言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> **标语**：万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 091 前端-TypeScript全局类型声明

## 概述

本文档详细描述HaiLan Pro-HaiLan-Pro-类型定义-前端-TypeScript全局类型声明相关内容，确保项目按照YYC³标准规范进行开发和实施。

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
- 规范前端-TypeScript全局类型声明相关的业务标准与技术落地要求
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

### 3. 前端TypeScript全局类型声明

#### 3.1 全局类型定义文件结构

```
src/types/
├── global.d.ts           # 全局类型声明
├── api.d.ts              # API相关类型
├── user.d.ts             # 用户相关类型
├── product.d.ts          # 商品相关类型
├── order.d.ts            # 订单相关类型
├── privacy.d.ts          # 隐私相关类型
├── iot.d.ts              # IoT设备类型
├── ai.d.ts               # AI相关类型
├── common.d.ts           # 通用类型
└── env.d.ts              # 环境变量类型
```

#### 3.2 全局声明文件

```typescript
/**
 * src/types/global.d.ts
 * 全局类型声明文件
 */

/// <reference types="vite/client" />
/// <reference types="pinia" />

/* ==================== 全局变量扩展 ==================== */

declare global {
  // ==================== PWA ====================
  /**
   * Service Worker注册
   */
  const __SW_ENABLED__: boolean;
  const __SW__: ServiceWorker;

  // ==================== 环境变量 ====================
  interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_API_BASE_URL: string;
    readonly VITE_API_TIMEOUT: number;
    readonly VITE_APP_ID: string;
    readonly VITE_ENABLE_MOCK: string;
    readonly VITE_ENABLE_DEVTOOLS: string;
    readonly VITE_PLATFORM: 'h5' | 'wechat' | 'alipay';
    readonly VITE_APP_VERSION: string;
    readonly VITE_BUILD_TIME: string;
  }

  // ==================== uni-app 扩展 ====================
  namespace UniApp {
    interface UniConfig {
      globalStyle: {
        navigationBarBackgroundColor: string;
        navigationBarTextStyle: 'black' | 'white';
        navigationBarTitleText: string;
      };
      pages: string[];
      tabBar?: {
        color: string;
        selectedColor: string;
        backgroundColor: string;
        borderStyle: 'black' | 'white';
        list: Array<{
          pagePath: string;
          text: string;
          iconPath: string;
          selectedIconPath: string;
        }>;
      };
    }
  }
}

/* ==================== Window对象扩展 ==================== */

interface Window {
  // ==================== 数据埋点 ====================
  dataLayer?: Record<string, any>;

  // ==================== 隐私模式 ====================
  __privacyMode?: boolean;
  __stealthMode?: boolean;

  // ==================== 设备信息 ====================
  __deviceInfo?: {
    platform: string;
    model: string;
    system: string;
  };

  // ==================== 蓝牙设备 ====================
  __bluetooth?: {
    device: BluetoothDevice | null;
    server: BluetoothRemoteGATTServer | null;
  };
}

export {};
```

#### 3.3 API响应类型声明

```typescript
/**
 * src/types/api.d.ts
 * API响应类型定义
 */

/**
 * 统一API响应格式
 */
export interface ApiResponse<T = any> {
  /** 响应码：0成功，非0失败 */
  code: number;
  /** 响应消息 */
  message: string;
  /** 响应数据 */
  data?: T;
  /** 时间戳 */
  timestamp: number;
  /** 请求ID（用于问题追踪） */
  requestId: string;
}

/**
 * 分页响应数据
 */
export interface PaginatedData<T> {
  /** 数据列表 */
  items: T[];
  /** 总数 */
  total: number;
  /** 当前页 */
  page: number;
  /** 每页数量 */
  pageSize: number;
  /** 总页数 */
  totalPages: number;
}

/**
 * 分页请求参数
 */
export interface PaginationParams {
  /** 页码（从1开始） */
  page?: number;
  /** 每页数量 */
  pageSize?: number;
}

/**
 * API错误响应
 */
export interface ApiError {
  code: number;
  message: string;
  details?: Record<string, string[]>;
  requestId?: string;
}
```

#### 3.4 用户类型声明

```typescript
/**
 * src/types/user.d.ts
 * 用户相关类型定义
 */

/**
 * 用户信息
 */
export interface UserInfo {
  /** 用户ID */
  id: string;
  /** 邮箱 */
  email: string;
  /** 手机号 */
  phone?: string;
  /** 昵称 */
  nickname: string;
  /** 头像 */
  avatar: string;
  /** 性别 */
  gender?: 'male' | 'female' | 'other';
  /** 生日 */
  birthDate?: string;
  /** 隐私等级 */
  privacyLevel: PrivacyLevel;
  /** 隐私模式是否启用 */
  privacyModeEnabled: boolean;
  /** 隐身模式是否启用 */
  stealthModeEnabled: boolean;
  /** 账户状态 */
  status: UserStatus;
  /** 会员等级 */
  memberLevel: MemberLevel;
  /** 积分余额 */
  pointsBalance: number;
  /** 创建时间 */
  createdAt: string;
}

/**
 * 用户登录数据
 */
export interface LoginData {
  /** 访问令牌 */
  accessToken: string;
  /** 刷新令牌 */
  refreshToken: string;
  /** 过期时间（秒） */
  expiresIn: number;
  /** 用户信息 */
  user: UserInfo;
}

/**
 * 注册参数
 */
export interface RegisterParams {
  /** 邮箱 */
  email: string;
  /** 密码 */
  password: string;
  /** 确认密码 */
  confirmPassword: string;
  /** 昵称 */
  nickname?: string;
  /** 验证码 */
  verificationCode: string;
}

/**
 * 登录参数
 */
export interface LoginParams {
  /** 账号（邮箱或手机号） */
  account: string;
  /** 密码 */
  password: string;
  /** 图形验证码 */
  captchaCode?: string;
}

/**
 * 用户隐私设置
 */
export interface UserPrivacySettings {
  /** 隐私等级 */
  privacyLevel: PrivacyLevel;
  /** 隐私配置 */
  standardConfig?: StandardPrivacyConfig;
  stealthConfig?: StealthPrivacyConfig;
  disguiseConfig?: DisguisePrivacyConfig;
}
```

#### 3.5 商品类型声明

```typescript
/**
 * src/types/product.d.ts
 * 商品相关类型定义
 */

/**
 * 商品信息
 */
export interface Product {
  /** 商品ID */
  id: string;
  /** SKU编号 */
  sku: string;
  /** 分类ID */
  categoryId: string;
  /** 分类代码 */
  categoryCode: ProductCategoryCode;
  /** 商品名称 */
  name: string;
  /** URL友好名称 */
  slug: string;
  /** 简短描述 */
  shortDesc: string;
  /** 详细描述 */
  description: string;
  /** 主图 */
  mainImage: string;
  /** 图片列表 */
  images: string[];
  /** 价格 */
  price: number;
  /** 原价 */
  originalPrice?: number;
  /** 成本价 */
  costPrice?: number;
  /** 库存 */
  stock: number;
  /** 库存预警 */
  stockWarning: number;
  /** 品牌 */
  brand?: string;
  /** 材质 */
  material?: string;
  /** 尺寸 */
  size?: string;
  /** 颜色 */
  color?: string;
  /** 标签 */
  tags: string[];
  /** 是否新品 */
  isNew: boolean;
  /** 是否热销 */
  isHot: boolean;
  /** 是否推荐 */
  isRecommended: boolean;
  /** 销量 */
  salesCount: number;
  /** 浏览量 */
  viewCount: number;
  /** 收藏量 */
  favoriteCount: number;
  /** 平均评分 */
  ratingAvg: number;
  /** 评价数 */
  reviewCount: number;
  /** 状态 */
  status: ProductStatus;
  /** 是否上架 */
  isActive: boolean;
  /** 发布时间 */
  publishedAt?: string;
  /** 创建时间 */
  createdAt: string;
}

/**
 * 商品SKU
 */
export interface ProductSku {
  /** SKU ID */
  id: string;
  /** 商品ID */
  productId: string;
  /** SKU编码 */
  skuCode: string;
  /** 规格名称 */
  specName: string;
  /** 价格 */
  price: number;
  /** 库存 */
  stock: number;
  /** 规格属性 */
  specAttributes: Record<string, string>;
  /** 是否有效 */
  isActive: boolean;
}

/**
 * 商品查询参数
 */
export interface ProductQueryParams extends PaginationParams {
  /** 分类代码 */
  category?: ProductCategoryCode;
  /** 关键词搜索 */
  keyword?: string;
  /** 最低价格 */
  minPrice?: number;
  /** 最高价格 */
  maxPrice?: number;
  /** 是否有库存 */
  inStock?: boolean;
  /** 排序字段 */
  sortBy?: 'price' | 'sales' | 'rating' | 'createdAt';
  /** 排序方式 */
  sortOrder?: 'asc' | 'desc';
}
```

#### 3.6 订单类型声明

```typescript
/**
 * src/types/order.d.ts
 * 订单相关类型定义
 */

/**
 * 订单信息
 */
export interface Order {
  /** 订单ID */
  id: string;
  /** 用户ID */
  userId: string;
  /** 订单号 */
  orderNo: string;
  /** 订单总额 */
  totalAmount: number;
  /** 优惠金额 */
  discountAmount: number;
  /** 运费 */
  shippingAmount: number;
  /** 应付金额 */
  payableAmount: number;
  /** 实付金额 */
  paidAmount: number;
  /** 商品摘要 */
  productSummary: OrderProductSummary;
  /** 收货人 */
  receiverName: string;
  /** 收货电话 */
  receiverPhone: string;
  /** 收货地址 */
  receiverAddress: string;
  /** 订单状态 */
  status: OrderStatus;
  /** 支付状态 */
  paymentStatus: PaymentStatus;
  /** 物流状态 */
  shippingStatus: ShippingStatus;
  /** 安全等级 */
  securityLevel: OrderSecurityLevel;
  /** 支付时间 */
  paidAt?: string;
  /** 发货时间 */
  shippedAt?: string;
  /** 完成时间 */
  completedAt?: string;
  /** 取消时间 */
  cancelledAt?: string;
  /** 用户备注 */
  userRemark?: string;
  /** 创建时间 */
  createdAt: string;
}

/**
 * 订单商品摘要
 */
export interface OrderProductSummary {
  /** 商品列表 */
  items: OrderItemSummary[];
}

/**
 * 订单商品项摘要
 */
export interface OrderItemSummary {
  /** 商品ID */
  productId: string;
  /** 商品名称 */
  productName: string;
  /** 商品图片 */
  productImage: string;
  /** SKU编码 */
  skuCode?: string;
  /** 规格名称 */
  specName?: string;
  /** 单价 */
  unitPrice: number;
  /** 数量 */
  quantity: number;
  /** 小计 */
  subtotal: number;
}

/**
 * 创建订单参数
 */
export interface CreateOrderParams {
  /** 商品列表 */
  items: {
    productId: string;
    skuId?: string;
    quantity: number;
  }[];
  /** 收货地址ID */
  addressId: string;
  /** 用户备注 */
  remark?: string;
  /** 是否使用积分 */
  usePoints?: boolean;
}

/**
 * 订单统计
 */
export interface OrderStatistics {
  /** 待支付 */
  pendingCount: number;
  /** 待发货 */
  paidCount: number;
  /** 待收货 */
  shippedCount: number;
  /** 已完成 */
  completedCount: number;
  /** 售后中 */
  refundingCount: number;
}
```

#### 3.7 隐私类型声明

```typescript
/**
 * src/types/privacy.d.ts
 * 隐私相关类型定义
 */

/**
 * 隐私等级枚举
 */
export enum PrivacyLevel {
  /** 标准模式 */
  STANDARD = 'STANDARD',
  /** 隐身模式 */
  STEALTH = 'STEALTH',
  /** 伪装模式 */
  DISGUISE = 'DISGUISE'
}

/**
 * 隐私模式配置
 */
export interface PrivacyModeConfig {
  /** 是否启用隐私模式 */
  enabled: boolean;
  /** 隐私等级 */
  level: PrivacyLevel;
  /** 应用时间范围 */
  applyTimeRange?: {
    start: string; // HH:mm
    end: string;   // HH:mm
  };
}

/**
 * 隐身模式配置
 */
export interface StealthConfig {
  /** 隐藏在线状态 */
  hideOnlineStatus: boolean;
  /** 隐藏浏览记录 */
  hideViewHistory: boolean;
  /** 隐藏收藏记录 */
  hideFavoriteHistory: boolean;
  /** 头像模糊效果 */
  avatarBlur: boolean;
  /** 昵称部分隐藏 */
  nicknameMasked: boolean;
}

/**
 * 伪装模式配置
 */
export interface DisguiseConfig {
  /** 使用虚拟收货信息 */
  useVirtualAddress: boolean;
  /** 使用代收服务 */
  usePickupService: boolean;
  /** 伪装发货名称 */
  useDisguiseSender: boolean;
  /** 伪装发货备注 */
  useDisguiseNote: boolean;
  /** 虚拟信息 */
  virtualInfo?: {
    virtualReceiverName: string;
    virtualPhone: string;
    pickupPoint: PickupPoint;
  };
}

/**
 * 生物识别配置
 */
export interface BiometricConfig {
  /** 是否启用生物识别 */
  enabled: boolean;
  /** 生物识别类型 */
  type: 'fingerprint' | 'face_id' | 'iris';
  /** 验证超时时间（分钟） */
  timeout: number;
}

/**
 * 虚拟收货点信息
 */
export interface PickupPoint {
  /** 代收点ID */
  id: string;
  /** 代收点名称 */
  name: string;
  /** 代收点类型 */
  type: PickupPointType;
  /** 联系电话 */
  phone: string;
  /** 省份 */
  province: string;
  /** 城市 */
  city: string;
  /** 区县 */
  district: string;
  /** 详细地址 */
  address: string;
  /** 配送时效 */
  deliveryTime: string;
}

/**
 * 代收点类型
 */
export enum PickupPointType {
  /** 菜鸟驿站 */
  CAINIAO_STATION = 'cainiao_station',
  /** 丰巢柜 */
  FENGCHAO_LOCKER = 'fengchao_locker',
  /** 便利店代收 */
  CONVENIENCE_STORE = 'convenience_store',
  /** 社区服务站 */
  COMMUNITY_SERVICE = 'community_service',
  /** 物流网点 */
  LOGISTICS_OUTLET = 'logistics_outlet'
}
```

#### 3.8 IoT设备类型声明

```typescript
/**
 * src/types/iot.d.ts
 * IoT设备相关类型定义
 */

/**
 * IoT设备信息
 */
export interface IoTDevice {
  /** 设备ID */
  id: string;
  /** 用户ID */
  userId?: string;
  /** 设备唯一标识（蓝牙MAC等） */
  deviceId: string;
  /** 设备类型 */
  deviceType: IoTDeviceType;
  /** 设备名称 */
  deviceName: string;
  /** 品牌 */
  brand?: string;
  /** 型号 */
  model?: string;
  /** 蓝牙MAC地址 */
  bluetoothAddress?: string;
  /** 最后连接时间 */
  lastConnectedAt?: string;
  /** 连接次数 */
  connectionCount: number;
  /** 设备状态 */
  status: IoTDeviceStatus;
  /** 电量百分比 */
  batteryLevel?: number;
  /** 固件版本 */
  firmwareVersion?: string;
  /** 硬件版本 */
  hardwareVersion?: string;
  /** 是否在线 */
  isOnline: boolean;
  /** 创建时间 */
  createdAt: string;
}

/**
 * IoT设备类型枚举
 */
export enum IoTDeviceType {
  /** 按摩器 */
  MASSAGER = 'massager',
  /** 成人玩具 */
  ADULT_TOY = 'adult_toy',
  /** 智能戒指 */
  SMART_RING = 'smart_ring',
  /** 智能手环 */
  SMART_BAND = 'smart_band',
  /** 智能服饰 */
  SMART_CLOTHING = 'smart_clothing'
}

/**
 * IoT设备状态枚举
 */
export enum IoTDeviceStatus {
  /** 在线 */
  ONLINE = 'online',
  /** 离线 */
  OFFLINE = 'offline',
  /** 连接中 */
  CONNECTING = 'connecting',
  /** 错误 */
  ERROR = 'error',
  /** 低电量 */
  LOW_BATTERY = 'low_battery'
}

/**
 * 蓝牙连接配置
 */
export interface BluetoothConnectionConfig {
  /** 服务UUID */
  serviceUUID: string;
  /** 特征UUID */
  characteristicUUID: string;
  /** 连接超时（毫秒） */
  connectTimeout: number;
  /** 是否启用通知 */
  notifyEnabled: boolean;
}

/**
 * 设备控制命令
 */
export interface DeviceCommand {
  /** 命令类型 */
  type: 'power' | 'mode' | 'intensity' | 'pattern' | 'custom';
  /** 命令值 */
  value: number | string | object;
  /** 命令参数 */
  params?: Record<string, any>;
  /** 是否需要响应 */
  requireResponse: boolean;
}

/**
 * 设备数据
 */
export interface DeviceData {
  /** 数据类型 */
  dataType: 'session' | 'settings' | 'health' | 'status';
  /** 数据值 */
  dataValue: Record<string, any>;
  /** 时间戳 */
  timestamp: number;
}
```

#### 3.9 AI相关类型声明

```typescript
/**
 * src/types/ai.d.ts
 * AI相关类型定义
 */

/**
 * AI对话会话
 */
export interface AIConversation {
  /** 会话ID */
  id: string;
  /** 用户ID */
  userId: string;
  /** 会话标题 */
  title?: string;
  /** 会话类别 */
  category: ConversationCategory;
  /** AI人格 */
  aiPersonality: AIPersonality;
  /** 温度参数 */
  temperature: number;
  /** 最大token数 */
  maxTokens: number;
  /** 消息数量 */
  messageCount: number;
  /** 最后消息时间 */
  lastMessageAt?: string;
  /** 创建时间 */
  createdAt: string;
}

/**
 * AI消息
 */
export interface AIMessage {
  /** 消息ID */
  id: string;
  /** 会话ID */
  conversationId: string;
  /** 消息角色 */
  role: MessageRole;
  /** 消息内容 */
  content: string;
  /** 内容类型 */
  contentType: MessageContentType;
  /** 元数据 */
  metadata?: {
    tokens?: number;
    model?: string;
    latency?: number;
  };
  /** 创建时间 */
  createdAt: string;
}

/**
 * 会话类别
 */
export enum ConversationCategory {
  /** 通用对话 */
  GENERAL = 'general',
  /** 健康咨询 */
  HEALTH = 'health',
  /** 亲密顾问 */
  INTIMACY = 'intimacy',
  /** 情感陪伴 */
  COMPANIONSHIP = 'companionship',
  /** 购物顾问 */
  SHOPPING = 'shopping'
}

/**
 * AI人格类型
 */
export enum AIPersonality {
  /** 温柔体贴 */
  GENTLE = 'gentle',
  /** 专业严谨 */
  PROFESSIONAL = 'professional',
  /** 活泼开朗 */
  PLAYFUL = 'playful',
  /** 知性优雅 */
  ELEGANT = 'elegant'
}

/**
 * 消息角色
 */
export enum MessageRole {
  /** 用户 */
  USER = 'user',
  /** AI助手 */
  ASSISTANT = 'assistant',
  /** 系统 */
  SYSTEM = 'system'
}

/**
 * 消息内容类型
 */
export enum MessageContentType {
  /** 文本 */
  TEXT = 'text',
  /** 图片 */
  IMAGE = 'image',
  /** 音频 */
  AUDIO = 'audio',
  /** 文件 */
  FILE = 'file'
}

/**
 * 流式响应事件
 */
export interface StreamResponse {
  /** 事件类型 */
  event: 'start' | 'token' | 'end' | 'error';
  /** 内容 */
  content?: string;
  /** 错误信息 */
  error?: string;
  /** 是否结束 */
  done?: boolean;
}
```

#### 3.10 通用工具类型声明

```typescript
/**
 * src/types/common.d.ts
 * 通用工具类型定义
 */

/**
 * 选项类型
 */
export type Optional<T> = T | null | undefined;

/**
 * 深度Partial - 递归Partial
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * 提取函数返回值类型
 */
export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

/**
 * 只读类型
 */
export type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

/**
 * 可空类型
 */
export type Nullable<T> = T | null;

/**
 * 键值对类型
 */
export type KeyValue<K extends string | number, V> = Record<K, V>;

/**
 * 键值数组类型
 */
export type KeyValuePair<K extends string | number, V> = Array<{
  key: K;
  value: V;
}>;

/**
 * 分组类型
 */
export type Group<T, K extends keyof T> = keyof T> = Record<string, T[]>;

/**
 * 树形结构类型
 */
export interface TreeNode<T = any> {
  id: string;
  label: string;
  children?: TreeNode<T>[];
  data?: T;
  expanded?: boolean;
  disabled?: boolean;
}

/**
 * 表格列类型
 */
export interface TableColumn {
  /** 列键 */
  key: string;
  /** 列标题 */
  title: string;
  /** 列宽度 */
  width?: number;
  /** 是否可排序 */
  sortable?: boolean;
  /** 是否可筛选 */
  filterable?: boolean;
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right';
  /** 自定义渲染 */
  render?: (value: any, row: any) => any;
}

/**
 * 表单字段类型
 */
export interface FormField {
  /** 字段名 */
  name: string;
  /** 字段标签 */
  label: string;
  /** 字段类型 */
  type: 'text' | 'number' | 'email' | 'password' | 'tel' | 'select' | 'checkbox' | 'radio' | 'date' | 'textarea' | 'upload';
  /** 默认值 */
  defaultValue?: any;
  /** 占位提示 */
  placeholder?: string;
  /** 是否必填 */
  required?: boolean;
  /** 校验规则 */
  rules?: ValidationRule[];
  /** 选项列表 */
  options?: Array<{ label: string; value: any }>;
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * 校验规则
 */
export interface ValidationRule {
  /** 规则类型 */
  type: 'required' | 'email' | 'phone' | 'url' | 'min' | 'max' | 'pattern' | 'custom';
  /** 规则参数 */
  param?: any;
  /** 错误消息 */
  message: string;
}

/**
 * 下载任务
 */
export interface DownloadTask {
  /** 任务ID */
  id: string;
  /** 文件名 */
  filename: string;
  /** 文件大小 */
  fileSize: number;
  /** 下载URL */
  url: string;
  /** 下载进度 */
  progress: number;
  /** 状态 */
  status: 'pending' | 'downloading' | 'completed' | 'failed';
  /** 本地路径 */
  localPath?: string;
}

/**
 * 上传任务
 */
export interface UploadTask {
  /** 任务ID */
  id: string;
  /** 文件 */
  file: File;
  /** 上传URL */
  url?: string;
  /** 上传进度 */
  progress: number;
  /** 状态 */
  status: 'pending' | 'uploading' | 'completed' | 'failed';
  /** 错误信息 */
  error?: string;
}

/**
 * 地理位置
 */
export interface Location {
  /** 纬度 */
  latitude: number;
  /** 经度 */
  longitude: number;
  /** 地址 */
  address?: string;
  /** 省份 */
  province?: string;
  /** 城市 */
  city?: string;
  /** 区县 */
  district?: string;
}
```

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
