---
file: 004-HaiLan-Pro-快速开始指南.md
description: HaiLan Pro快速开始指南，包含环境准备、快速启动、新功能速览和组件使用示例
author: YanYuCloudCube Team
version: v1.0.0
created: 2026-02-03
updated: 2026-02-03
status: published
tags:
  - 快速开始,[开发指南],[组件使用]
---

> ***YanYuCloudCube***
> **标语**：言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> **标语**：万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 海蓝(HaiLan) 快速启动指南

> **版本**：v2.0 - 设计系统增强版
> **更新日期**：2026-01-27
> **适用人员**：开发者、设计师、产品经理

---

## 5分钟快速开始

### 1. 启动项目

```bash
# 安装依赖（首次运行）
npm install

# 启动开发服务器
npm run dev

# 访问应用
# 浏览器自动打开 http://localhost:5173
```

### 2. 查看新功能

访问演示页面查看第一阶段完成的所有新组件：

```
http://localhost:5173/design-system-demo
```

### 3. 立即使用

```tsx
// 导入新组件
import { Rating } from '@/app/components/ui/rating';
import { Stepper } from '@/app/components/ui/stepper';
import { PrivacyInput } from '@/app/components/ui/privacy-input';
import { StatusIndicator } from '@/app/components/ui/status-indicator';

// 使用组件
<Rating value={4.5} onChange={handleChange} />
<Stepper steps={steps} currentStep={1} />
<PrivacyInput privacyMode showPasswordStrength />
<StatusIndicator type="success">成功</StatusIndicator>
```

---

## 新功能速览

### Design Tokens（设计令牌）

**位置**：`/src/tokens/`

**包含**：
- `colors.json` - 颜色系统
- `spacing.json` - 间距系统
- `typography.json` - 字体系统
- `motion.json` - 动效系统

**快速使用**：
```tsx
// 在组件中使用Design Tokens
<div style={{
  color: 'var(--color-brand-primary)',
  padding: 'var(--spacing-4)',
  fontSize: 'var(--font-size-base)'
}}>
  使用Design Tokens
</div>
```

---

### 动效系统

**位置**：`/src/styles/motion.css`

**快速使用**：
```tsx
// 过渡效果
<button className="transition-fast hover:bg-blue-600">
  快速过渡
</button>

// 动画效果
<div className="animate-fade-in">淡入动画</div>
<div className="animate-slide-in-up">滑入动画</div>
<div className="animate-shimmer">闪烁加载</div>
```

**可用动画**：
- `animate-fade-in` / `animate-fade-out` - 淡入淡出
- `animate-slide-in-up` / `animate-slide-in-down` - 滑入
- `animate-scale-in` / `animate-scale-out` - 缩放
- `animate-pulse` - 脉冲
- `animate-spin` - 旋转
- `animate-bounce` - 弹跳
- `animate-shake` - 摇晃

---

### 新增UI组件

#### 1. Rating（评分组件）

```tsx
import { Rating } from '@/app/components/ui/rating';

<Rating
  value={4.5}
  max={5}
  onChange={(value) => console.log(value)}
  size="md"
  color="primary"
/>
```

**Props**：
- `value` - 当前评分值
- `max` - 最大评分（默认5）
- `onChange` - 评分变化回调
- `size` - 尺寸（sm/md/lg）
- `color` - 颜色主题
- `readonly` - 只读模式

---

#### 2. Stepper（步骤条组件）

```tsx
import { Stepper } from '@/app/components/ui/stepper';

const steps = [
  { title: '第一步', description: '选择商品' },
  { title: '第二步', description: '确认订单' },
  { title: '第三步', description: '完成支付' },
];

<Stepper
  steps={steps}
  currentStep={1}
  orientation="horizontal"
/>
```

**Props**：
- `steps` - 步骤数组
- `currentStep` - 当前步骤
- `orientation` - 方向（horizontal/vertical）

---

#### 3. PrivacyInput（隐私输入组件）

```tsx
import { PrivacyInput } from '@/app/components/ui/privacy-input';

<PrivacyInput
  type="password"
  label="密码"
  privacyMode={true}
  showPasswordStrength={true}
  onChange={(value) => console.log(value)}
/>
```

**Props**：
- `type` - 输入类型
- `label` - 标签文本
- `privacyMode` - 隐私模式
- `showPasswordStrength` - 显示密码强度
- `onChange` - 值变化回调

---

#### 4. StatusIndicator（状态指示器）

```tsx
import { StatusIndicator } from '@/app/components/ui/status-indicator';

<StatusIndicator type="success">成功</StatusIndicator>
<StatusIndicator type="warning">警告</StatusIndicator>
<StatusIndicator type="error">错误</StatusIndicator>
<StatusIndicator type="info">信息</StatusIndicator>
```

**Props**：
- `type` - 状态类型（success/warning/error/info）
- `children` - 子元素

---

## 开发环境配置

### 环境要求

- **Node.js**：>= 18.0.0
- **npm/pnpm**：>= 8.0.0
- **浏览器**：Chrome/Edge/Firefox 最新版

### 安装依赖

```bash
# 使用npm
npm install

# 使用pnpm（推荐）
pnpm install
```

### 启动开发服务器

```bash
# 开发模式
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview
```

### 环境变量配置

创建 `.env.local` 文件：

```env
# Supabase配置
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# API配置
VITE_API_BASE_URL=https://api.hailan.com

# 功能开关
VITE_ENABLE_PWA=true
VITE_ENABLE_AI=true
VITE_ENABLE_IOT=false
```

---

## 项目结构

```
hailan-pro/
├── src/
│   ├── app/                 # 应用主目录
│   │   ├── components/      # 组件库
│   │   │   ├── ui/         # 基础UI组件
│   │   │   ├── layout/     # 布局组件
│   │   │   └── business/  # 业务组件
│   │   ├── pages/          # 页面
│   │   ├── hooks/          # 自定义Hooks
│   │   ├── services/        # 服务层
│   │   ├── utils/          # 工具函数
│   │   └── styles/         # 样式文件
│   ├── tokens/             # Design Tokens
│   └── lib/               # 第三方库配置
├── public/                 # 静态资源
├── docs/                   # 文档
└── tests/                  # 测试文件
```

---

## 核心功能模块

### 1. 用户系统

```tsx
// 用户登录
import { useAuth } from '@/app/hooks/useAuth';

const { login, logout, user } = useAuth();

await login({
  email: 'user@example.com',
  password: 'password123'
});
```

### 2. 商品系统

```tsx
// 商品列表
import { useProducts } from '@/app/hooks/useProducts';

const { products, loading, error } = useProducts({
  category: 'care',
  page: 1,
  limit: 20
});
```

### 3. 购物车系统

```tsx
// 购物车操作
import { useCart } from '@/app/hooks/useCart';

const { addToCart, removeFromCart, updateQuantity, cart } = useCart();

addToCart({
  productId: '123',
  quantity: 1,
  variant: 'default'
});
```

### 4. 隐私系统

```tsx
// 隐私模式切换
import { usePrivacy } from '@/app/hooks/usePrivacy';

const { privacyMode, setPrivacyMode, camouflageMode } = usePrivacy();

setPrivacyMode('STEALTH');
```

---

## 样式系统

### 颜色系统

```css
/* 主色调 */
--color-brand-primary: #0056b3;
--color-brand-secondary: #002b5c;
--color-brand-accent: #6B46C1;

/* 语义色 */
--color-success: #38A169;
--color-warning: #ECC94B;
--color-error: #F56565;
--color-info: #0056b3;

/* 中性色 */
--color-neutral-50: #FAFAFA;
--color-neutral-100: #F5F5F5;
--color-neutral-900: #1A1A1A;
```

### 间距系统

```css
--spacing-1: 4px;
--spacing-2: 8px;
--spacing-3: 12px;
--spacing-4: 16px;
--spacing-6: 24px;
--spacing-8: 32px;
```

### 字体系统

```css
--font-size-xs: 12px;
--font-size-sm: 14px;
--font-size-base: 16px;
--font-size-lg: 18px;
--font-size-xl: 20px;
--font-size-2xl: 24px;
```

---

## 常见问题

### Q1: 如何切换隐私模式？

在个人中心页面，点击隐私设置，选择隐私模式：
- **STANDARD** - 标准模式
- **STEALTH** - 隐身模式
- **DISGUISE** - 伪装模式

### Q2: 如何启用PWA？

PWA功能默认启用，在支持的浏览器中：
1. 访问应用
2. 点击浏览器地址栏的安装图标
3. 按照提示安装到桌面

### Q3: 如何连接智能硬件？

在设备管理页面：
1. 确保设备蓝牙已开启
2. 点击"添加设备"
3. 选择设备类型并配对

### Q4: 如何使用AI助手？

在AI助手页面：
1. 点击输入框输入问题
2. 或点击快速问题入口
3. AI将实时回复并提供建议

---

## 开发指南

### 添加新页面

```tsx
// src/app/pages/NewPage.tsx
import { PageLayout } from '@/app/components/layout/PageLayout';

export const NewPage = () => {
  return (
    <PageLayout
      title="新页面"
      showBackButton={true}
    >
      {/* 页面内容 */}
    </PageLayout>
  );
};
```

### 添加新组件

```tsx
// src/app/components/ui/NewComponent.tsx
import { cn } from '@/app/utils/cn';

interface NewComponentProps {
  className?: string;
  children: React.ReactNode;
}

export const NewComponent = ({ className, children }: NewComponentProps) => {
  return (
    <div className={cn('base-styles', className)}>
      {children}
    </div>
  );
};
```

### 添加新API

```typescript
// src/app/services/api.ts
export const newApi = async (params: any) => {
  const response = await fetch('/api/new-endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  return response.json();
};
```

---

## 调试技巧

### 1. 开启调试模式

```typescript
// 在浏览器控制台执行
localStorage.setItem('debug', 'true');
```

### 2. 查看Redux状态

```typescript
// 在浏览器控制台执行
console.log(window.__REDUX_DEVTOOLS_EXTENSION__);
```

### 3. 查看网络请求

打开浏览器开发者工具 -> Network标签，查看所有API请求。

### 4. 查看组件树

安装React DevTools扩展，查看组件层级和状态。

---

## 性能优化

### 1. 代码分割

```tsx
import { lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));
```

### 2. 图片优化

```tsx
import { Image } from '@/app/components/ui/image';

<Image
  src="/image.jpg"
  alt="描述"
  loading="lazy"
  width={800}
  height={600}
/>
```

### 3. 缓存策略

```typescript
// 使用SWR或React Query进行数据缓存
import { useSWR } from 'swr';

const { data, error } = useSWR('/api/data', fetcher);
```

---

## 部署指南

### 1. 构建生产版本

```bash
npm run build
```

### 2. 部署到Vercel

```bash
# 安装Vercel CLI
npm install -g vercel

# 部署
vercel
```

### 3. 部署到Netlify

```bash
# 安装Netlify CLI
npm install -g netlify-cli

# 部署
netlify deploy --prod
```

---

## 技术支持

- **文档**：https://docs.hailan.com
- **GitHub**：https://github.com/hailan-pro
- **问题反馈**：https://github.com/hailan-pro/issues
- **邮件支持**：admin@0379.email

---

<div align="center">

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」

</div>
