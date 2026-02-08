---
@file: 092-前端-组件Props类型定义.md
@description: HaiLan Pro 前端组件Props类型定义，包含隐私组件、商城组件、AI组件等
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

# 092 前端-组件Props类型定义

## 概述

本文档详细描述HaiLan Pro-HaiLan-Pro-类型定义-前端-组件Props类型定义相关内容，确保项目按照YYC³标准规范进行开发和实施。

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
- 规范前端-组件Props类型定义相关的业务标准与技术落地要求
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

### 3. 前端组件Props类型定义

#### 3.1 基础组件Props类型

```typescript
/**
 * src/components/base/types.ts
 * 基础组件通用Props定义
 */

/**
 * 基础组件Props接口
 * 所有组件应继承此接口
 */
export interface BaseComponentProps {
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: Record<string, any>;
  /** 测试ID */
  testId?: string;
}

/**
 * 尺寸枚举
 */
export type Size = 'small' | 'medium' | 'large';

/**
 * 颜色类型
 */
export type ColorType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

/**
 * 按钮类型
 */
export type ButtonType = ColorType | 'text' | 'default';
```

#### 3.2 按钮组件Props

```typescript
/**
 * src/components/button/types.ts
 */

/**
 * HLButton组件Props
 */
export interface HLButtonProps extends BaseComponentProps {
  /** 按钮类型 */
  type?: ButtonType;
  /** 按钮尺寸 */
  size?: Size;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 是否块级按钮 */
  block?: boolean;
  /** 是否圆角按钮 */
  round?: boolean;
  /** 是否朴素按钮 */
  plain?: boolean;
  /** 图标名称（前缀） */
  icon?: string;
  /** 图标名称（后缀） */
  iconSuffix?: string;
  /** 点击事件 */
  onClick?: (event: MouseEvent) => void;
  /** 按钮原生type属性 */
  nativeType?: 'button' | 'submit' | 'reset';
}

/**
 * 快捷按钮配置
 */
export type QuickAction = {
  /** 操作类型 */
  type: 'primary' | 'success' | 'warning' | 'danger';
  /** 图标 */
  icon: string;
  /** 提示文字 */
  tooltip: string;
  /** 点击回调 */
  action: () => void;
};
```

#### 3.3 输入框组件Props

```typescript
/**
 * src/components/input/types.ts
 */

/**
 * HLInput组件Props
 */
export interface HLInputProps extends BaseComponentProps {
  /** 输入框类型 */
  type?: 'text' | 'password' | 'number' | 'email' | 'tel' | 'url';
  /** 输入框尺寸 */
  size?: Size;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 占位提示 */
  placeholder?: string;
  /** 最大长度 */
  maxlength?: number;
  /** 最小长度 */
  minlength?: number;
  /** 前缀图标 */
  prefix?: string;
  /** 后缀图标 */
  suffix?: string;
  /** 是否显示密码切换按钮 */
  showPassword?: boolean;
  /** 是否可清空 */
  clearable?: boolean;
  /** 绑定值 */
  modelValue?: string | number;
  /** 输入事件 */
  onInput?: (value: string) => void;
  /** 变化事件 */
  onChange?: (value: string) => void;
  /** 获得焦点事件 */
  onFocus?: (event: FocusEvent) => void;
  /** 失去焦点事件 */
  onBlur?: (event: FocusEvent) => void;
  /** 按回车事件 */
  onEnter?: () => void;
}

/**
 * 数字输入框Props
 */
export interface HLNumberInputProps extends HLInputProps {
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 步长 */
  step?: number;
  /** 精度（小数位数） */
  precision?: number;
  /** 是否显示控制按钮 */
  controls?: boolean;
}
```

#### 3.4 隐私组件Props类型

```typescript
/**
 * src/components/privacy/types.ts
 * 隐私相关组件Props类型定义
 */

/**
 * 隐私开关组件Props
 */
export interface PrivacySwitchProps extends BaseComponentProps {
  /** 是否启用隐私模式 */
  modelValue: boolean;
  /** 隐私等级 */
  privacyLevel?: PrivacyLevel;
  /** 尺寸 */
  size?: Size;
  /** 是否禁用 */
  disabled?: boolean;
  /** 变更事件 */
  onChange?: (value: boolean) => void;
}

/**
 * 隐身模式配置面板Props
 */
export interface StealthModePanelProps extends BaseComponentProps {
  /** 配置数据 */
  config: StealthConfig;
  /** 更新配置 */
  onUpdate: (config: StealthConfig) => void;
}

/**
 * 伪装模式配置面板Props
 */
export interface DisguiseModePanelProps extends BaseComponentProps {
  /** 配置数据 */
  config: DisguiseConfig;
  /** 虚拟信息 */
  virtualInfo?: VirtualInfo;
  /** 更新配置 */
  onUpdate: (config: DisguiseConfig) => void;
  /** 生成新虚拟信息 */
  onRegenerate?: () => Promise<void>;
}

/**
 * 生物识别验证Props
 */
export interface BiometricAuthProps extends BaseComponentProps {
  /** 验证类型 */
  type: 'fingerprint' | 'face_id' | 'iris';
  /** 验证通过回调 */
  onSuccess: () => void;
  /** 验证失败回调 */
  onFail: (error: Error) => void;
  /** 验证超时（秒） */
  timeout?: number;
  /** 是否自动触发 */
  autoTrigger?: boolean;
  /** 提示信息 */
  prompt?: string;
}

/**
 * 隐私浏览模式指示器Props
 */
export interface PrivacyIndicatorProps extends BaseComponentProps {
  /** 当前隐私模式状态 */
  privacyMode: boolean;
  /** 隐私等级 */
  privacyLevel: PrivacyLevel;
  /** 点击事件 */
  onClick?: () => void;
  /** 位置 */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'floating';
}
```

#### 3.5 商品组件Props类型

```typescript
/**
 * src/components/product/types.ts
 * 商品相关组件Props类型定义
 */

/**
 * 商品卡片组件Props
 */
export interface ProductCardProps extends BaseComponentProps {
  /** 商品数据 */
  product: Product;
  /** 是否显示库存 */
  showStock?: boolean;
  /** 是否显示评分 */
  showRating?: boolean;
  /** 是否显示价格优惠 */
  showDiscount?: boolean;
  /** 是否可点击 */
  clickable?: boolean;
  /** 点击事件 */
  onClick?: (product: Product) => void;
  /** 添加到购物车事件 */
  onAddToCart?: (product: Product, skuId?: string) => void;
  /** 收藏事件 */
  onFavorite?: (product: Product) => void;
  /** 图片懒加载 */
  lazyLoad?: boolean;
}

/**
 * 商品列表Props
 */
export interface ProductListProps extends BaseComponentProps {
  /** 商品列表数据 */
  products: Product[];
  /** 加载状态 */
  loading?: boolean;
  /** 是否没有更多数据 */
  noMore?: boolean;
  /** 列表类型 */
  listType?: 'grid' | 'list' | 'waterfall';
  /** 列头 */
  header?: string;
  /** 加载更多事件 */
  onLoadMore?: () => void;
  /** 下拉刷新 */
  onRefresh?: () => void;
}

/**
 * 商品筛选器Props
 */
export interface ProductFilterProps extends BaseComponentProps {
  /** 分类列表 */
  categories: CategoryOption[];
  /** 已选筛选条件 */
  modelValue: ProductFilterValue;
  /** 更新筛选 */
  onChange: (value: ProductFilterValue) => void;
  /** 重置筛选 */
  onReset: () => void;
  /** 收起/展开状态 */
  collapsible?: boolean;
}

/**
 * 商品筛选条件
 */
export interface ProductFilterValue {
  /** 分类 */
  category?: ProductCategoryCode;
  /** 关键词 */
  keyword?: string;
  /** 价格范围 */
  priceRange?: [number, number];
  /** 是否有库存 */
  inStock?: boolean;
  /** 标签 */
  tags?: string[];
  /** 排序 */
  sortBy?: 'default' | 'price_asc' | 'price_desc' | 'sales' | 'rating';
}

/**
 * 商品SKU选择器Props
 */
export interface SkuSelectorProps extends BaseComponentProps {
  /** SKU列表 */
  skus: ProductSku[];
  /** 已选SKU ID */
  modelValue?: string;
  /** 更新选择 */
  onChange: (sku: ProductSku) => void;
  /** 选中SKU */
  selectedSku?: ProductSku;
  /** 属性高亮 */
  highlightAttrs?: string[];
}
```

#### 3.6 AI组件Props类型

```typescript
/**
 * src/components/ai/types.ts
 * AI相关组件Props类型定义
 */

/**
 * AI对话卡片Props
 */
export interface AIChatCardProps extends BaseComponentProps {
  /** 会话数据 */
  conversation: AIConversation;
  /** 点击进入对话 */
  onEnter?: (conversation: AIConversation) => void;
  /** 删除会话 */
  onDelete?: (conversation: AIConversation) => void;
  /** 是否显示最新消息 */
  showLastMessage?: boolean;
}

/**
 * AI聊天窗口Props
 */
export interface AIChatWindowProps extends BaseComponentProps {
  /** 会话ID */
  conversationId?: string;
  /** 是否显示 */
  visible: boolean;
  /** 关闭事件 */
  onClose: () => void;
  /** 发送消息事件 */
  onSend: (content: string) => Promise<void>;
  /** 加载状态 */
  loading?: boolean;
  /** 是否显示语音输入 */
  showVoiceInput?: boolean;
  /** 语音识别结果 */
  voiceText?: string;
}

/**
 * AI消息气泡Props
 */
export interface AIMessageBubbleProps extends BaseComponentProps {
  /** 消息数据 */
  message: AIMessage;
  /** 是否显示时间 */
  showTime?: boolean;
  /** 是否显示头像 */
  showAvatar?: boolean;
  /** 消息长按操作 */
  onLongPress?: (message: AIMessage) => void;
}

/**
 * AI人格选择器Props
 */
export interface AIPersonalitySelectorProps extends BaseComponentProps {
  /** 当前选择 */
  modelValue: AIPersonality;
  /** 可用人格列表 */
  options: Array<{
    value: AIPersonality;
    label: string;
    description: string;
    avatar: string;
  }>;
  /** 更新选择 */
  onChange: (personality: AIPersonality) => void;
}

/**
 * 语音输入按钮Props
 */
export interface VoiceInputButtonProps extends BaseComponentProps {
  /** 是否录音中 */
  recording?: boolean;
  /** 开始录音 */
  onStart?: () => void;
  /** 停止录音 */
  onStop?: () => void;
  /** 识别结果 */
  result?: string;
  /** 语言类型 */
  lang?: 'zh-CN' | 'en-US';
}

/**
 * 快捷问题气泡Props
 */
export interface QuickQuestionProps extends BaseComponentProps {
  /** 问题列表 */
  questions: string[];
  /** 点击问题 */
  onClick: (question: string) => void;
  /** 随机显示 */
  random?: boolean;
  /** 显示数量 */
  limit?: number;
}
```

#### 3.7 IoT设备组件Props类型

```typescript
/**
 * src/components/iot/types.ts
 * IoT设备相关组件Props类型定义
 */

/**
 * 设备卡片Props
 */
export interface DeviceCardProps extends BaseComponentProps {
  /** 设备数据 */
  device: IoTDevice;
  /** 是否显示连接状态 */
  showStatus?: boolean;
  /** 连接操作 */
  onConnect?: (device: IoTDevice) => void;
  /** 断开连接 */
  onDisconnect?: (device: IoTDevice) => void;
  /** 打开控制面板 */
  onOpenControl?: (device: IoTDevice) => void;
  /** 设备详情 */
  onDetail?: (device: IoTDevice) => void;
}

/**
 * 设备控制面板Props
 */
export interface DeviceControlPanelProps extends BaseComponentProps {
  /** 设备数据 */
  device: IoTDevice;
  /** 是否显示 */
  visible: boolean;
  /** 关闭面板 */
  onClose: () => void;
  /** 发送命令 */
  onCommand: (command: DeviceCommand) => void;
  /** 控制模式 */
  mode?: 'basic' | 'advanced';
}

/**
 * 设备列表Props
 */
export interface DeviceListProps extends BaseComponentProps {
  /** 设备列表 */
  devices: IoTDevice[];
  /** 加载状态 */
  loading?: boolean;
  /** 点击设备 */
  onDeviceClick?: (device: IoTDevice) => void;
  /** 扫描设备 */
  onScan?: () => void;
  /** 空状态文本 */
  emptyText?: string;
}

/**
 * 蓝牙扫描器Props
 */
export interface BluetoothScannerProps extends BaseComponentProps {
  /** 是否显示 */
  visible: boolean;
  /** 关闭扫描器 */
  onClose: () => void;
  /** 选择设备 */
  onSelect: (device: BluetoothDevice) => void;
  /** 扫描超时（毫秒） */
  timeout?: number;
  /** 接受的设备名称前缀 */
  namePrefix?: string;
  /** 可选服务UUID列表 */
  optionalServices?: string[];
}

/**
 * 设备控制滑块Props
 */
export interface DeviceSliderProps extends BaseComponentProps {
  /** 控制类型 */
  type: 'intensity' | 'mode' | 'speed';
  /** 当前值 */
  modelValue: number;
  /** 最小值 */
  min: number;
  /** 最大值 */
  max: number;
  /** 步长 */
  step?: number;
  /** 刻度标签 */
  marks?: Record<number, string>;
  /** 变更事件 */
  onChange: (value: number) => void;
  /** 输入中事件（防抖） */
  onChanging?: (value: number) => void;
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * 设备模式选择器Props
 */
export interface DeviceModeSelectorProps extends BaseComponentProps {
  /** 模式列表 */
  modes: DeviceMode[];
  /** 当前模式 */
  modelValue: number;
  /** 更新模式 */
  onChange: (mode: number) => void;
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * 设备模式
 */
export interface DeviceMode {
  /** 模式值 */
  value: number;
  /** 模式名称 */
  label: string;
  /** 图标 */
  icon?: string;
  /** 描述 */
  description?: string;
}
```

#### 3.8 卡片组件Props类型

```typescript
/**
 * src/components/card/types.ts
 */

/**
 * HLCard组件Props
 */
export interface HLCardProps extends BaseComponentProps {
  /** 卡片标题 */
  title?: string;
  /** 额外操作区 */
  extra?: string;
  /** 是否可关闭 */
  closable?: boolean;
  /** 是否悬浮效果 */
  hoverable?: boolean;
  /** 阴影等级 */
  shadow?: 'never' | 'hover' | 'always';
  /** 是否有边框 */
  bordered?: boolean;
  /** 点击事件 */
  onClick?: () => void;
}

/**
 * 统计卡片Props
 */
export interface StatCardProps extends BaseComponentProps {
  /** 标题 */
  title: string;
  /** 数值 */
  value: number | string;
  /** 趋势 */
  trend?: {
    /** 趋势方向 */
    direction: 'up' | 'down' | 'flat';
    /** 趋势百分比 */
    percent: number;
  };
  /** 图标 */
  icon?: string;
  /** 图标颜色 */
  iconColor?: string;
  /** 单位 */
  unit?: string;
  /** 点击事件 */
  onClick?: () => void;
}

/**
 * 用户信息卡片Props
 */
export interface UserCardProps extends BaseComponentProps {
  /** 用户数据 */
  user: UserInfo;
  /** 是否显示隐私等级 */
  showPrivacyLevel?: boolean;
  /** 是否显示会员信息 */
  showMemberInfo?: boolean;
  /** 点击用户 */
  onClick?: () => void;
  /** 操作按钮列表 */
  actions?: QuickAction[];
}
```

#### 3.9 表单组件Props类型

```typescript
/**
 * src/components/form/types.ts
 * 表单相关组件Props类型定义
 */

/**
 * 表单项Props
 */
export interface FormItemProps extends BaseComponentProps {
  /** 字段名 */
  prop: string;
  /** 标签文本 */
  label?: string;
  /** 是否必填 */
  required?: boolean;
  /** 校验规则 */
  rules?: ValidationRule[];
  /** 错误信息 */
  error?: string;
  /** 标签宽度 */
  labelWidth?: string;
  /** 是否显示冒号 */
  showColon?: boolean;
}

/**
 * 表单Props
 */
export interface HLFormProps extends BaseComponentProps {
  /** 表单数据 */
  model: Record<string, any>;
  /** 表单规则 */
  rules?: Record<string, ValidationRule[]>;
  /** 标签宽度 */
  labelWidth?: string;
  /** 标签位置 */
  labelPosition?: 'left' | 'right' | 'top';
  /** 是否显示标签 */
  showLabel?: boolean;
  /** 提交事件 */
  onSubmit?: (data: Record<string, any>) => void;
  /** 重置事件 */
  onReset?: () => void;
}

/**
 * 上传组件Props
 */
export interface HLUploadProps extends BaseComponentProps {
  /** 文件列表 */
  fileList: UploadFile[];
  /** 上传地址 */
  action: string;
  /** 请求头 */
  headers?: Record<string, string>;
  /** 上传前校验 */
  beforeUpload?: (file: File) => boolean | Promise<boolean>;
  /** 上传进度 */
  onProgress?: (percent: number, file: File) => void;
  /** 上传成功 */
  onSuccess?: (response: any, file: File) => void;
  /** 上传失败 */
  onError?: (error: Error, file: File) => void;
  /** 预览文件 */
  onPreview?: (file: UploadFile) => void;
  /** 移除文件 */
  onRemove?: (file: UploadFile) => void;
  /** 最大上传数量 */
  limit?: number;
  /** 文件大小限制（MB） */
  maxSize?: number;
  /** 接受的文件类型 */
  accept?: string;
  /** 是否拖拽上传 */
  drag?: boolean;
  /** 列表类型 */
  listType?: 'text' | 'picture' | 'picture-card';
}

/**
 * 上传文件
 */
export interface UploadFile {
  /** 文件ID */
  uid: string;
  /** 文件名 */
  name: string;
  /** 文件状态 */
  status: 'uploading' | 'done' | 'error';
  /** 响应数据 */
  response?: any;
  /** 文件URL */
  url?: string;
  /** 本地文件对象 */
  file?: File;
  /** 上传进度 */
  percent?: number;
}
```

#### 3.10 模态框组件Props类型

```typescript
/**
 * src/components/modal/types.ts
 */

/**
 * HLModal组件Props
 */
export interface HLModalProps extends BaseComponentProps {
  /** 是否显示 */
  visible: boolean;
  /** 标题 */
  title?: string;
  /** 内容区自定义 */
  customContent?: boolean;
  /** 宽度 */
  width?: number | string;
  /** 是否全屏 */
  fullscreen?: boolean;
  /** 是否可拖拽 */
  draggable?: boolean;
  /** 点击遮罩关闭 */
  closeOnClickModal?: boolean;
  /** 是否显示关闭按钮 */
  closable?: boolean;
  /** 是否显示底部 */
  showFooter?: boolean;
  /** 确认按钮文字 */
  confirmText?: string;
  /** 取消按钮文字 */
  cancelText?: string;
  /** 确认事件 */
  onConfirm?: () => void;
  /** 取消事件 */
  onCancel?: () => void;
  /** 关闭事件 */
  onClose?: () => void;
}

/**
 * 确认对话框Props
 */
export interface ConfirmDialogProps extends Omit<HLModalProps, 'title' | 'confirmText'> {
  /** 对话框类型 */
  type?: 'info' | 'success' | 'warning' | 'danger';
  /** 标题 */
  title?: string;
  /** 内容 */
  content: string;
  /** 确认按钮文字 */
  confirmText?: string;
}

/**
 * 图片预览Props
 */
export interface ImagePreviewProps extends BaseComponentProps {
  /** 图片列表 */
  images: string[];
  /** 当前显示索引 */
  current?: number;
  /** 是否显示 */
  visible: boolean;
  /** 关闭事件 */
  onClose: () => void;
  /** 切换图片事件 */
  onChange?: (current: number) => void;
  /** 是否显示工具栏 */
  showToolbar?: boolean;
  /** 是否可旋转 */
  rotatable?: boolean;
  /** 是否可缩放 */
  scalable?: boolean;
}
```

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
