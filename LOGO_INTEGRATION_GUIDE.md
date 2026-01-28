# Logo集成指南

> **创建日期**：2026-01-27  
> **用途**：指导如何在海蓝平台中显示和使用Logo

---

## 📋 当前状态

✅ 已创建Logo组件：`/src/app/components/ui/logo.tsx`  
⏭️ 需要从Figma导出实际logo文件

---

## 🎨 从Figma导出Logo

### 步骤1：打开Figma设计

1. 访问您的Figma链接：
   - Node ID: 1-2（第一个设计）
   - Node ID: 0-1（第二个设计）

2. 在Figma中选择要导出的logo图层

### 步骤2：导出设置

**推荐导出格式**：

1. **SVG格式**（推荐，矢量格式）
   - 右键logo → Export
   - Format: SVG
   - 勾选 "Outline text"
   - 勾选 "Simplify stroke"

2. **PNG格式**（备用）
   - 导出 1x, 2x, 3x 三种分辨率
   - 背景透明

### 步骤3：命名规范

建议的文件命名：
```
logo.svg              # 主logo（深色背景用）
logo-light.svg        # 浅色版本（深色背景用）
logo-dark.svg         # 深色版本（浅色背景用）
logo-icon.svg         # 图标版本（方形）
logo-full.svg         # 完整版本（带文字）
```

### 步骤4：放置文件

将导出的文件放入：
```
/public/images/
├── logo.svg
├── logo-light.svg
├── logo-dark.svg
├── logo-icon.svg
└── logo-full.svg
```

---

## 💻 使用Logo组件

### 方法1：使用临时Logo（当前）

Logo组件已创建，当前使用临时SVG：

```tsx
import { Logo } from '@/app/components/ui/logo';

// 默认版本
<Logo />

// 不同尺寸
<Logo size="xs" />   // 24px
<Logo size="sm" />   // 32px
<Logo size="md" />   // 40px
<Logo size="lg" />   // 56px
<Logo size="xl" />   // 72px

// 不同变体
<Logo variant="default" />  // 默认（深色）
<Logo variant="light" />    // 浅色版本
<Logo variant="dark" />     // 深色版本
<Logo variant="icon" />     // 仅图标

// 可点击
<Logo onClick={() => navigate('/')} />
```

### 方法2：更新为实际Logo（推荐）

导出logo文件后，更新 `/src/app/components/ui/logo.tsx`：

**替换以下代码**：

```tsx
// 找到这段注释的代码
/*
return (
  <img
    src={logoSrc}
    alt="海蓝 HaiLan"
    style={{ height }}
    className={cn('object-contain', className)}
    onClick={onClick}
  />
);
*/

// 取消注释，启用实际logo
```

同时注释掉临时SVG代码：

```tsx
// 注释掉 renderTextLogo() 的调用
// return (
//   <div ...>
//     {renderTextLogo()}
//   </div>
// );
```

---

## 🎯 在项目中使用

### 1. 导航栏

```tsx
// /src/app/components/navigation/Header.tsx
import { Logo } from '@/app/components/ui/logo';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  
  return (
    <header>
      <Logo 
        size="md" 
        onClick={() => navigate('/')}
        className="cursor-pointer"
      />
    </header>
  );
}
```

### 2. 登录/注册页面

```tsx
// /src/app/pages/auth/LoginPage.tsx
import { Logo } from '@/app/components/ui/logo';

function LoginPage() {
  return (
    <div className="text-center mb-8">
      <Logo size="xl" variant="default" />
      <h1 className="mt-4 text-2xl font-bold">欢迎回来</h1>
    </div>
  );
}
```

### 3. 侧边栏

```tsx
// /src/app/components/navigation/Sidebar.tsx
import { Logo } from '@/app/components/ui/logo';

function Sidebar() {
  return (
    <aside>
      <div className="p-4 border-b">
        <Logo size="sm" variant="icon" />
      </div>
    </aside>
  );
}
```

### 4. Footer

```tsx
// /src/app/components/navigation/Footer.tsx
import { Logo } from '@/app/components/ui/logo';

function Footer() {
  return (
    <footer>
      <Logo size="md" variant="light" />
      <p className="text-sm text-gray-400 mt-2">
        © 2026 海蓝 HaiLan. All rights reserved.
      </p>
    </footer>
  );
}
```

---

## 🎨 Logo设计规范

### 颜色规范

```tsx
export const BRAND_COLORS = {
  primary: '#0056b3',      // 主蓝色
  secondary: '#6B46C1',    // 紫色
  accent: '#E0E7FF',       // 浅蓝紫
  dark: '#1E293B',         // 深色
  light: '#F8FAFC',        // 浅色
};
```

### 使用场景

| 场景 | 推荐变体 | 尺寸 | 说明 |
|------|---------|------|------|
| 导航栏 | default | md | 标准logo |
| 移动端导航 | icon | sm | 仅图标 |
| 登录页面 | default | xl | 大logo |
| Footer | light | md | 浅色版本 |
| Favicon | icon | xs | 16x16图标 |
| 侧边栏 | icon | sm | 紧凑图标 |

### 安全区域

- 最小尺寸：24px x 24px
- 周围留白：至少16px
- 点击区域：至少44px x 44px

---

## 🔧 高级配置

### 1. 响应式Logo

```tsx
function ResponsiveLogo() {
  return (
    <>
      {/* 移动端显示图标 */}
      <Logo 
        variant="icon" 
        size="sm" 
        className="md:hidden"
      />
      
      {/* 桌面端显示完整logo */}
      <Logo 
        variant="default" 
        size="md" 
        className="hidden md:inline-flex"
      />
    </>
  );
}
```

### 2. 深色模式适配

```tsx
function DarkModeLogo() {
  const isDark = useDarkMode(); // 假设有这个hook
  
  return (
    <Logo 
      variant={isDark ? 'light' : 'dark'} 
      size="md"
    />
  );
}
```

### 3. 加载动画

```tsx
function AnimatedLogo() {
  return (
    <Logo 
      size="lg"
      className="animate-fade-in"
    />
  );
}
```

---

## 📱 Favicon设置

### 生成Favicon

1. 从Figma导出logo图标版本
2. 使用在线工具生成多尺寸favicon：
   - https://realfavicongenerator.net/
   - 上传logo图标
   - 生成所有尺寸

### 更新HTML

在 `/index.html` 中添加：

```html
<head>
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/images/logo-icon.svg" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  
  <!-- PWA -->
  <link rel="manifest" href="/site.webmanifest" />
  <meta name="theme-color" content="#0056b3" />
</head>
```

---

## ✅ 检查清单

完成以下步骤以正确集成Logo：

### 导出Logo
- [ ] 从Figma导出SVG格式logo
- [ ] 导出PNG格式备用（1x, 2x, 3x）
- [ ] 导出图标版本（方形）
- [ ] 导出深色和浅色版本

### 放置文件
- [ ] 将文件放入 `/public/images/`
- [ ] 检查文件命名是否正确
- [ ] 生成并放置favicon

### 更新代码
- [ ] 更新 `logo.tsx` 使用实际logo
- [ ] 测试不同尺寸
- [ ] 测试不同变体
- [ ] 测试响应式显示

### 应用到页面
- [ ] 更新导航栏
- [ ] 更新登录页面
- [ ] 更新侧边栏
- [ ] 更新Footer
- [ ] 更新HTML favicon

---

## 🚀 快速开始

### 方式1：临时测试（立即可用）

Logo组件已创建并使用临时SVG，可立即使用：

```tsx
import { Logo } from '@/app/components/ui/logo';

<Logo size="md" variant="default" />
```

### 方式2：使用实际Logo（推荐）

1. 从Figma导出logo
2. 放入 `/public/images/`
3. 更新 `logo.tsx` 第46-52行
4. 测试并应用

---

## 📞 需要帮助？

如果遇到问题：

1. **Logo显示不正确**
   - 检查文件路径是否正确
   - 检查文件格式是否支持
   - 使用浏览器开发工具查看错误

2. **Logo尺寸不合适**
   - 调整 `size` 属性
   - 使用自定义 `className`
   - 检查父容器样式

3. **Logo在深色背景不清晰**
   - 使用 `variant="light"`
   - 确保导出了浅色版本
   - 检查颜色对比度

---

## 📋 示例代码

完整示例：

```tsx
import { Logo } from '@/app/components/ui/logo';
import { useNavigate } from 'react-router-dom';

function AppHeader() {
  const navigate = useNavigate();
  
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo 
            size="md" 
            variant="default"
            onClick={() => navigate('/')}
            className="hover:opacity-80 transition-opacity"
          />
          
          {/* 导航 */}
          <nav>...</nav>
        </div>
      </div>
    </header>
  );
}
```

---

**YanYuCloudCube**  
**admin@0379.email**  
**Words Initiate Quadrants, Language Serves as Core for the Future**

---

**创建时间**：2026-01-27  
**下次更新**：导入实际logo后
