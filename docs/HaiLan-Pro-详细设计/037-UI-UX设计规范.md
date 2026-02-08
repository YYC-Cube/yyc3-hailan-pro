---
@file: 037-UI-UX设计规范.md
@description: HaiLan Pro 前端界面设计、交互逻辑、视觉规范的统一标准，保障用户体验一致
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

# 037 UI-UX设计规范

## 概述

本文档详细描述HaiLan Pro-HaiLan-Pro-详细设计-UI-UX设计规范相关内容，确保项目按照YYC³标准规范进行开发和实施。

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
- 规范UI-UX设计规范相关的业务标准与技术落地要求
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

### 3. UI-UX设计规范

#### 3.1 设计理念

##### 3.1.1 核心设计哲学

```typescript
// 设计理念框架
interface DesignPhilosophy {
  // 核心理念
  core: {
    privacy: '隐私优先，安全第一';
    elegance: '简约优雅，高端品质';
    intelligence: '智能辅助，自然交互';
    intimacy: '亲密舒适，情感共鸣';
  };

  // 设计原则
  principles: {
    clarity: '清晰明确，降低认知负荷';
    consistency: '一致规范，建立信任感';
    feedback: '及时反馈，确认操作结果';
    forgiveness: '容错设计，允许后悔操作';
    efficiency: '高效操作，减少步骤路径';
  };
}
```

##### 3.1.2 设计关键词

| 关键词 | 中文 | 应用场景 |
|-------|------|---------|
| **Private** | 私密 | 隐私模式、数据加密、匿名功能 |
| **Elegant** | 优雅 | 视觉风格、交互动效、排版布局 |
| **Intelligent** | 智能 | AI对话、智能推荐、自适应界面 |
| **Intimate** | 亲密 | 情感化设计、温暖色调、柔和反馈 |
| **Professional** | 专业 | 医疗级标准、品质保证、合规展示 |

#### 3.2 视觉设计系统

##### 3.2.1 品牌色彩系统

```typescript
// 海蓝蓝色彩系统
interface HaiLanColorSystem {
  // 主色系 - 海蓝蓝
  primary: {
    blue50: '#E3F2FD';   // 极浅蓝 - 背景
    blue100: '#BBDEFB';  // 浅蓝 - 禁用状态
    blue300: '#64B5F6';  // 中蓝 - 悬停状态
    blue500: '#2196F3';  // 标准蓝 - 常规使用
    blue700: '#1976D2';  // 深蓝 - 按按下状态
    blue900: '#0D47A1';  // 极深蓝 - 强调色
    brandBlue: '#0056b3' // 品牌海蓝蓝 - 主品牌色
  };

  // 辅助色系
  secondary: {
    teal: {
      light: '#B2DFDB',
      main: '#009688',   // 青色 - 成功/确认
      dark: '#00695C'
    };
    coral: {
      light: '#FFCCBC',
      main: '#FF7043',   // 珊瑚红 - 警告/强调
      dark: '#D84315'
    };
    lavender: {
      light: '#E1BEE7',
      main: '#9C27B0',   // 薰衣草 - 亲密/柔和
      dark: '#6A1B9A'
    }
  };

  // 语义色
  semantic: {
    success: '#4CAF50';
    warning: '#FF9800';
    error: '#F44336';
    info: '#2196F3';
  };

  // 中性色
  neutral: {
    white: '#FFFFFF',
    gray50: '#FAFAFA',
    gray100: '#F5F5F5',
    gray200: '#EEEEEE',
    gray300: '#E0E0E0',
    gray400: '#BDBDBD',
    gray500: '#9E9E9E',
    gray600: '#757575',
    gray700: '#616161',
    gray800: '#424242',
    gray900: '#212121',
    black: '#000000'
  };

  // 隐私模式色
  privacyMode: {
    stealth: {
      background: '#1A1A2E',
      surface: '#16213E',
      text: '#EAEAEA',
      accent: '#0F3460'
    };
    disguise: {
      // 可伪装成其他应用的主题色
      calculator: '#37474F',
      weather: '#81D4FA',
      notes: '#FFF9C4'
    };
  };
}
```

##### 3.2.2 色彩使用规范

| 使用场景 | 色彩选择 | 用途说明 |
|---------|---------|---------|
| 主按钮 | brandBlue (#0056b3) | 主要行动点 |
| 次要按钮 | gray500 (#9E9E9E) | 辅助行动点 |
| 成功状态 | teal.main (#009688) | 操作成功确认 |
| 警告提示 | coral.main (#FF7043) | 需要注意的信息 |
| 错误反馈 | semantic.error (#F44336) | 错误/危险操作 |
| 链接文本 | blue700 (#1976D2) | 文本链接 |
| 禁用状态 | blue100 (#BBDEFB) | 不可用状态 |

##### 3.2.3 字体系统

```typescript
// 字体系统规范
interface TypographySystem {
  // 字体族
  fontFamily: {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial';
    secondary: '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
    mono: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", monospace';
    number: '"DIN Alternate", "Roboto Mono", monospace';
  };

  // 字体大小
  fontSize: {
    xs: '12px',    // 辅助说明
    sm: '14px',    // 正文小字
    base: '16px',  // 正文字号
    lg: '18px',    // 小标题
    xl: '20px',    // 中标题
    '2xl': '24px', // 大标题
    '3xl': '30px', // 特大标题
    '4xl': '36px'  // 页面标题
  };

  // 字重
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  };

  // 行高
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2
  };

  // 字间距
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em'
  };
}
```

##### 3.2.4 图标系统

| 图标类型 | 规格说明 | 使用场景 |
|---------|---------|---------|
| **线性图标** | 2px线宽，24x24px | 导航、工具栏 |
| **填充图标** | 实心填充，24x24px | 激活状态、强调 |
| **双色图标** | 主色+辅助色 | 品牌相关功能 |
| **品牌图标** | 海蓝元素设计 | 核心功能入口 |

##### 3.2.5 圆角系统

```typescript
// 圆角规范
interface BorderRadiusSystem {
  // 圆角尺寸
  radius: {
    none: '0',
    xs: '4px',     // 小元素、标签
    sm: '8px',     // 按钮、输入框
    md: '12px',    // 卡片、面板
    lg: '16px',    // 大卡片、模态框
    xl: '24px',    // 特殊容器
    full: '9999px' // 圆形头像、徽章
  };

  // 使用场景
  usage: {
    button: 'sm (8px)',
    input: 'sm (8px)',
    card: 'md (12px)',
    modal: 'lg (16px)',
    chip: 'full (圆形)',
    avatar: 'full (圆形)'
  };
}
```

##### 3.2.6 阴影系统

```typescript
// 阴影规范
interface ShadowSystem {
  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.05)';
    sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)';
    md: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)';
    lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)';
    xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)';
    '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)';
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)';
  };

  // 使用场景
  usage: {
    card: 'md',
    dropdown: 'lg',
    modal: 'xl',
    tooltip: 'lg',
    button: 'sm (hover时)'
  };
}
```

#### 3.3 布局与间距

##### 3.3.1 栅格系统

```typescript
// 栅格系统
interface GridSystem {
  // 断点定义
  breakpoints: {
    xs: '0px',      // 移动设备
    sm: '640px',    // 大屏手机
    md: '768px',    // 平板设备
    lg: '1024px',   // 小屏笔记本
    xl: '1280px',   // 桌面设备
    '2xl': '1536px' // 大屏显示器
  };

  // 栅格配置
  grid: {
    columns: 12;          // 12列栅格
    gutter: 16;           // 16px间距
    maxWidth: 1280;       // 最大宽度1280px
    containerPadding: {
      mobile: 16,
      tablet: 24,
      desktop: 32
    };
  };
}
```

##### 3.3.2 间距系统

```typescript
// 间距规范 (基于8px基准)
interface SpacingSystem {
  spacing: {
    0: '0px',
    1: '4px',     // 0.5x
    2: '8px',     // 1x - 最小间距
    3: '12px',    // 1.5x
    4: '16px',    // 2x - 常用间距
    5: '20px',    // 2.5x
    6: '24px',    // 3x - 中等间距
    8: '32px',    // 4x - 大间距
    10: '40px',   // 5x - 超大间距
    12: '48px',   // 6x
    16: '64px',   // 8x - 区块间距
    20: '80px',   // 10x
    24: '96px'    // 12x - 页面级间距
  };
}
```

##### 3.3.3 页面布局规范

| 布局类型 | 宽度 | 边距 | 适用场景 |
|---------|------|------|---------|
| **全屏布局** | 100% | 0 | 登录页、启动页 |
| **窄屏布局** | 640px | 16px | 表单页、详情页 |
| **标准布局** | 1024px | 24px | 列表页、搜索页 |
| **宽屏布局** | 1280px | 32px | 首页、仪表板 |

#### 3.4 组件设计规范

##### 3.4.1 按钮组件

```typescript
// 按钮设计规范
interface ButtonDesignSpec {
  // 尺寸变体
  size: {
    small: {
      height: '32px',
      padding: '0 12px',
      fontSize: '14px'
    };
    medium: {
      height: '40px',
      padding: '0 16px',
      fontSize: '16px'
    };
    large: {
      height: '48px',
      padding: '0 24px',
      fontSize: '18px'
    };
  };

  // 类型变体
  variant: {
    primary: {
      background: '#0056b3',
      color: '#FFFFFF',
      hover: '#004494'
    };
    secondary: {
      background: 'transparent',
      color: '#0056b3',
      border: '1px solid #0056b3'
    };
    ghost: {
      background: 'transparent',
      color: '#0056b3',
      hover: 'rgba(0, 86, 179, 0.08)'
    };
    danger: {
      background: '#F44336',
      color: '#FFFFFF'
    };
  };

  // 状态
  state: {
    disabled: {
      opacity: 0.5,
      cursor: 'not-allowed'
    };
    loading: {
      showSpinner: true,
      disableInteraction: true
    };
  };
}
```

##### 3.4.2 输入框组件

```typescript
// 输入框设计规范
interface InputDesignSpec {
  // 基础样式
  base: {
    height: '40px',
    padding: '0 12px',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'all 0.2s ease'
  };

  // 状态样式
  states: {
    normal: {
      border: '1px solid #E0E0E0',
      background: '#FFFFFF'
    };
    focus: {
      border: '2px solid #0056b3',
      boxShadow: '0 0 0 3px rgba(0, 86, 179, 0.1)'
    };
    error: {
      border: '1px solid #F44336',
      errorText: '#F44336'
    };
    disabled: {
      background: '#F5F5F5',
      color: '#9E9E9E'
    };
  };

  // 输入类型
  types: {
    text: '文本输入';
    password: '密码输入 (带显隐切换)';
    number: '数字输入';
    email: '邮箱输入 (带格式验证)';
    phone: '手机号输入 (带格式化)';
    search: '搜索输入 (带搜索图标)';
    textarea: '多行文本';
  };
}
```

##### 3.4.3 卡片组件

```typescript
// 卡片设计规范
interface CardDesignSpec {
  // 基础样式
  base: {
    background: '#FFFFFF',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  };

  // 内边距
  padding: {
    compact: '12px',
    default: '16px',
    spacious: '24px'
  };

  // 卡片类型
  types: {
    product: {
      imageRatio: '1:1',
      showPrice: true,
      showRating: true
    };
    content: {
      showThumbnail: true,
      showMeta: true,
      showActions: true
    };
    statistics: {
      showChart: true,
      showTrend: true
    };
  };
}
```

#### 3.5 交互设计规范

##### 3.5.1 动效规范

```typescript
// 动效规范
interface AnimationSpec {
  // 缓动函数
  easing: {
    ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)';
    easeIn: 'cubic-bezier(0.42, 0, 1, 1)';
    easeOut: 'cubic-bezier(0, 0, 0.58, 1)';
    easeInOut: 'cubic-bezier(0.42, 0, 0.58, 1)';
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  };

  // 动效时长
  duration: {
    fast: '150ms',      // 微交互
    normal: '300ms',    // 常规动效
    slow: '500ms',      // 复杂动效
    slower: '1000ms'    // 页面切换
  };

  // 动效类型
  types: {
    fade: '淡入淡出';
    slide: '滑动';
    scale: '缩放';
    rotate: '旋转';
    bounce: '弹性';
  };
}
```

##### 3.5.2 触摸反馈

| 交互类型 | 反馈方式 | 时长 | 强度 |
|---------|---------|------|------|
| 轻触 | 透明度变化 0.7 | 100ms | 弱 |
| 按下 | 缩放 0.95 | 200ms | 中 |
| 长按 | 震动 + 视觉反馈 | 300ms | 强 |
| 拖拽 | 阴影提升 8px | 持续 | 中 |

##### 3.5.3 加载状态

```typescript
// 加载状态设计
interface LoadingStates {
  // 骨架屏
  skeleton: {
    animation: 'shimmer 1.5s infinite';
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)';
    borderRadius: '4px'
  };

  // 加载指示器
  spinner: {
    size: '24px',
    color: '#0056b3',
    strokeWidth: '3px'
  };

  // 进度条
  progress: {
    height: '4px',
    background: '#E0E0E0',
    fill: '#0056b3',
    animation: 'progress 300ms ease-out'
  };
}
```

#### 3.6 响应式设计

##### 3.6.1 断点策略

| 断点 | 屏幕宽度 | 目标设备 | 布局调整 |
|-----|---------|---------|---------|
| xs | 0-640px | 手机竖屏 | 单列布局 |
| sm | 640-768px | 手机横屏 | 1-2列布局 |
| md | 768-1024px | 平板设备 | 2-3列布局 |
| lg | 1024-1280px | 笔记本 | 3-4列布局 |
| xl | 1280px+ | 桌面显示器 | 4-6列布局 |

##### 3.6.2 图片响应式

```typescript
// 图片响应式策略
interface ResponsiveImages {
  // 图片尺寸
  sizes: {
    thumbnail: '150x150',
    small: '400x400',
    medium: '800x800',
    large: '1200x1200',
    xlarge: '1920x1920'
  };

  // 格式选择
  formats: {
    modern: ['WebP', 'AVIF'],
    fallback: 'JPEG',
    vector: 'SVG'
  };

  // 懒加载
  lazyLoad: {
    method: 'IntersectionObserver',
    threshold: 0.1,
    rootMargin: '50px'
  };
}
```

#### 3.7 无障碍设计

##### 3.7.1 WCAG 2.1 合规

| WCAG级别 | 要求 | 实施状态 |
|---------|------|---------|
| A级 | 基础无障碍 | ✓ 已实现 |
| AA级 | 中级无障碍 | ✓ 已实现 |
| AAA级 | 高级无障碍 | 计划中 |

##### 3.7.2 无障碍特性

| 特性 | 实施方式 | 覆盖范围 |
|-----|---------|---------|
| **键盘导航** | Tab序列、焦点可见 | 全站 |
| **屏幕阅读器** | ARIA标签、语义化HTML | 全站 |
| **色彩对比** | 最小对比度4.5:1 | 全站 |
| **文字缩放** | 支持200%放大 | 全站 |
| **动画控制** | 尊重系统偏好 | 动画内容 |

#### 3.8 设计交付规范

##### 3.8.1 设计文件结构

```
HaiLan-Pro-Design/
├── 01-Design-System/           # 设计系统
│   ├── Colors.sketchpencil
│   ├── Typography.sketchpencil
│   └── Components.sketchpencil
├── 02-User-Flows/              # 用户流程
│   ├── Registration.flow
│   ├── Shopping.flow
│   └── Privacy-Mode.flow
├── 03-Wireframes/              # 线框图
│   ├── Mobile/
│   ├── Tablet/
│   └── Desktop/
├── 04-Mockups/                 # 高保真原型
│   ├── Home-Screens/
│   ├── Product-Pages/
│   └── Privacy-Center/
├── 05-Prototypes/              # 交互原型
│   ├── User-Journey.prototype
│   └── Key-Scenarios.prototype
└── 06-Assets/                  # 设计资源
    ├── Icons/
    ├── Illustrations/
    └── Images/
```

##### 3.8.2 标注规范

```typescript
// 设计标注规范
interface DesignAnnotations {
  // 尺寸标注
  dimensions: {
    width: '标注元素宽度 (px)',
    height: '标注元素高度 (px)',
    spacing: '标注间距 (px)',
    fontSize: '标注字号 (px)'
  };

  // 颜色标注
  colors: {
    hex: '#0056b3',
    rgba: 'rgba(0, 86, 179, 1)',
    variable: '$brand-primary'
  };

  // 交互标注
  interactions: {
    tap: '单击操作',
    doubleTap: '双击操作',
    swipe: '滑动操作',
    pinch: '缩放操作'
  };
}
```

##### 3.8.3 开发交付物

| 交付物 | 格式 | 说明 |
|-------|------|------|
| 设计源文件 | .fig | Figma源文件 |
| 标注图 | .png | 带标注的设计图 |
| 切图资源 | .svg, .png | 2x/3x倍图 |
| 设计规范文档 | .md | 在线文档 |
| 原型链接 | URL | 可交互原型 |

---

## 附录

### A. 组件库清单

### B. 设计模板下载

### C. 快捷键指南

### D. 术语表

| 术语 | 说明 |
|-----|------|
| **WCAG** | Web Content Accessibility Guidelines，Web内容无障碍指南 |
| **PWA** | Progressive Web App，渐进式Web应用 |
| **Skeleton** | 骨架屏，加载占位符 |
| **Micro-interaction** | 微交互，细微的交互反馈 |

### E. 修订历史

| 版本 | 日期 | 修订人 | 修订内容 |
|-----|------|-------|---------|
| v1.0.0 | 2026-01-26 | YanYuCloudCube Team | 初始版本创建 |

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
