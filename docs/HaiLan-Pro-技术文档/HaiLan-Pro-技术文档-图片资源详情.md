# 海蓝项目 - 全局图片资源路径及最佳尺寸文档

> 本文档定义了项目中所有图片资源的路径、用途和最佳使用尺寸

**创建日期**: 2026-02-03
**作者**: YYC³ Team
**版本**: 1.1.0
**更新日期**: 2026-02-03

---

## 📁 资源目录结构

```
public/
├── logo.svg                    # 品牌主 Logo (SVG 矢量格式)
├── icon.svg                    # 品牌图标 (SVG 矢量格式)
├── logo.png                    # 品牌主 Logo (PNG 位图格式)
├── logo.icon.png               # 品牌图标 (PNG 位图格式)
├── logo_icon.svg               # 品牌图标 (SVG 矢量格式)
├── placeholder-logo.png        # Logo 占位符
├── placeholder-logo.svg        # Logo 占位符 (SVG)
├── placeholder-user.jpg        # 用户头像占位符
├── placeholder.jpg             # 通用占位符
├── placeholder.svg             # 通用占位符 (SVG)
├── manifest.json               # PWA 清单文件
├── sw.js                       # Service Worker 文件
├── offline.html                # 离线页面
├── yyc3-pwa-icon.png           # PWA 应用图标
├── yyc3-logo-*.png             # 各色品牌 Logo
└── yyc3-article-cover-*.png    # 文章封面图
```

---

## 🎨 品牌标识资源

### 主 Logo

| 资源路径 | 格式 | 尺寸 | 用途 | 最佳显示尺寸 |
|---------|------|------|------|------------|
| `/logo.svg` | SVG | 30×27 | 品牌主标识（推荐使用） | 任意（矢量图） |
| `/logo.png` | PNG | 未指定 | 品牌主标识（位图） | 120×120px |
| `/logo.icon.png` | PNG | 未指定 | 品牌图标 | 48×48px |

### Logo 变体

| 资源路径 | 格式 | 用途 | 最佳显示尺寸 |
|---------|------|------|------------|
| `/yyc3-logo-blue.png` | PNG | 蓝色 Logo | 120×120px |
| `/yyc3-logo-royalblue.png` | PNG | 皇家蓝 Logo | 120×120px |
| `/yyc3-logo-cyan.png` | PNG | 青色 Logo | 120×120px |
| `/yyc3-logo-black-01.png` | PNG | 黑色 Logo | 120×120px |
| `/yyc3-logo-black-02.png` | PNG | 黑色 Logo（变体） | 120×120px |
| `/yyc3-logo-gray.png` | PNG | 灰色 Logo | 120×120px |
| `/yyc3-logo-red.png` | PNG | 红色 Logo | 120×120px |
| `/yyc3-logo-white.png` | PNG | 白色 Logo（深色背景） | 120×120px |

### 图标

| 资源路径 | 格式 | 尺寸 | 用途 | 最佳显示尺寸 |
|---------|------|------|------|------------|
| `/icon.svg` | SVG | 未指定 | 品牌图标（推荐使用） | 任意（矢量图） |
| `/logo_icon.svg` | SVG | 未指定 | 品牌图标 | 任意（矢量图） |

---

## 📱 PWA 资源

| 资源路径 | 格式 | 用途 | 最佳尺寸 |
|---------|------|------|---------|
| `/yyc3-pwa-icon.png` | PNG | PWA 应用图标 | 192×192px |
| `/manifest.json` | JSON | PWA 清单文件 | - |
| `/sw.js` | JS | Service Worker | - |
| `/offline.html` | HTML | 离线页面 | - |

---

## 📄 占位符资源

| 资源路径 | 格式 | 用途 | 最佳显示尺寸 |
|---------|------|------|------------|
| `/placeholder-logo.png` | PNG | Logo 占位符 | 120×120px |
| `/placeholder-logo.svg` | SVG | Logo 占位符（矢量） | 任意 |
| `/placeholder-user.jpg` | JPG | 用户头像占位符 | 200×200px |
| `/placeholder.jpg` | JPG | 通用占位符 | 800×600px |
| `/placeholder.svg` | SVG | 通用占位符（矢量） | 任意 |

---

## 📰 文章封面资源

| 资源路径 | 格式 | 用途 | 最佳显示尺寸 |
|---------|------|------|------------|
| `/yyc3-article-cover-01.png` | PNG | 文章封面图 1 | 800×450px |
| `/yyc3-article-cover-02.png` | PNG | 文章封面图 2 | 800×450px |
| `/yyc3-article-cover-03.png` | PNG | 文章封面图 3 | 800×450px |
| `/yyc3-article-cover-05.png` | PNG | 文章封面图 5 | 800×450px |
| `/yyc3-article-cover-06.png` | PNG | 文章封面图 6 | 800×450px |

---

## 🔗 外部资源 (External Resources)

### Unsplash 图片资源

项目中使用来自 Unsplash 的高质量图片作为产品展示和运营内容。

#### 产品展示类

| 资源路径 | 用途 | 最佳尺寸 | 风格 |
|---------|------|---------|------|
| `https://images.unsplash.com/photo-1544384050-f80fac6e525a` | 按摩类产品 | 1080×1080px | 医疗、科技 |
| `https://images.unsplash.com/photo-1765329843292-39b5129fce61` | 护理类产品 | 1080×1080px | 医疗、健康 |
| `https://images.unsplash.com/photo-1760113559708-84e7a148ec68` | 香薰类产品 | 1080×1080px | 舒适、生活 |
| `https://images.unsplash.com/photo-1747224317356-6dd1a4a078fd` | 智能穿戴 | 1080×1080px | 科技、未来 |

#### 运营内容类

| 资源路径 | 用途 | 最佳尺寸 | 风格 |
|---------|------|---------|------|
| `https://images.unsplash.com/photo-1544367563-12123d8965cd` | 健康生活 | 1920×1080px | 活力、健康 |
| `https://images.unsplash.com/photo-1516307362420-332053641f6e` | 社区故事 | 1920×1080px | 社交、温暖 |
| `https://images.unsplash.com/photo-1518310383802-640c2de311b2` | 专家文章 | 1920×1080px | 专业、知识 |

#### 装饰纹理

| 资源路径 | 用途 | 说明 |
|---------|------|------|
| `https://grainy-gradients.vercel.app/noise.svg` | 全局噪点纹理 | 提升毛玻璃质感 |

---

## 🎨 Figma 资源规范

### Figma 资源导入

项目中使用来自 Figma 的导出图片时，必须使用虚拟模块协议 `figma:asset`。

#### 导入格式

```typescript
// ✅ 正确：使用 figma:asset 协议
import img from "figma:asset/HASH_ID.png";

// ❌ 错误：不要在路径前加 ./ 或 ../
import img from "./figma:asset/HASH_ID.png";
import img from "../figma:asset/HASH_ID.png";
```

#### Figma 品牌资源

| 资源路径 | 格式 | 用途 | 说明 |
|---------|------|------|------|
| `figma:asset/d687e8c6eaff439058d15cc055f57aadc55a2b38.png` | PNG | 品牌 Logo（图标版） | 用于 AI 助手、小尺寸 Logo |
| `figma:asset/923893d6867889983442c75dc0c39278f7c805f0.png` | PNG | 品牌 Logo（完整版） | 用于导航栏、登录页 |

#### SVG 资源存储

所有从 Figma 导入的 SVG 统一存储在 `/src/imports` 目录下。

```typescript
// 导入方式
import svgIcon from "@/imports/svg-filename";

// 使用方式
// 直接作为路径或组件使用，视具体导入内容而定
```

---

## 🎯 使用指南

### Logo 使用规范

#### 导入方式

```typescript
// 推荐：使用 SVG 矢量图（可任意缩放）
import logo from '/logo.svg';

// 备选：使用 PNG 位图
import logo from '/logo.png';
```

#### 组件中使用

```tsx
// 小尺寸（导航栏、按钮）
<img src="/logo.svg" alt="Brand Logo" className="w-8 h-8 object-contain" />

// 中尺寸（卡片标题）
<img src="/logo.svg" alt="Brand Logo" className="w-12 h-12 object-contain" />

// 大尺寸（页面标题）
<img src="/logo.svg" alt="Brand Logo" className="w-16 h-16 object-contain" />
```

#### BrandLogo 组件使用

```tsx
import { BrandLogo } from '@/app/components/BrandLogo';

// 图标模式
<BrandLogo variant="icon" size="sm" />  // w-8 h-8
<BrandLogo variant="icon" size="md" />  // w-12 h-12
<BrandLogo variant="icon" size="lg" />  // w-16 h-16
<BrandLogo variant="icon" size="xl" />  // w-24 h-24

// 完整 Logo 模式
<BrandLogo variant="full" size="sm" />  // h-8
<BrandLogo variant="full" size="md" />  // h-10
<BrandLogo variant="full" size="lg" />  // h-12
<BrandLogo variant="full" size="xl" />  // h-16
```

### AI 助手 Logo 使用

```tsx
// AI 浮窗按钮
<img src="/logo.svg" alt="AI" className="w-10 h-10 object-contain" />

// AI 助手头像
import { AssistantAvatar } from '@/app/pages/ai-assistant/components/AssistantAvatar';
<AssistantAvatar size="sm" />  // w-10 h-10
<AssistantAvatar size="md" />  // w-12 h-12
<AssistantAvatar size="lg" />  // w-16 h-16
<AssistantAvatar size="xl" />  // w-24 h-24
```

### 深色背景 Logo 使用

```tsx
// 在深色背景上使用白色 Logo
<img src="/yyc3-logo-white.png" alt="Brand Logo" className="w-12 h-12 object-contain" />

// 或使用 CSS 滤镜反转颜色
<img src="/logo.svg" alt="Brand Logo" className="w-12 h-12 object-contain filter brightness-0 invert" />
```

### 外部图片使用规范

#### 使用 ImageWithFallback 组件

所有外部图片（Unsplash 等）必须使用 `@/app/components/figma/ImageWithFallback` 组件。

```tsx
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

<ImageWithFallback 
  src="https://images.unsplash.com/photo-1544384050-f80fac6e525a" 
  alt="按摩类产品" 
  className="w-full h-auto rounded-lg"
/>
```

#### Unsplash 图片选择规范

- **风格统一**: 选择医疗、科技、办公类高质量图片
- **色彩协调**: 与品牌色（蓝、紫、白）保持协调
- **内容相关**: 图片内容与使用场景匹配
- **尺寸适配**: 根据显示位置选择合适尺寸

---

## 📐 尺寸规范

### Logo 尺寸对照表

| 用途场景 | Tailwind 类名 | 实际尺寸 | 推荐资源 |
|---------|-------------|---------|---------|
| 导航栏 Logo | `h-8` | 32px | `/logo.svg` |
| 小图标 | `w-8 h-8` | 32×32px | `/logo.svg` |
| 中等图标 | `w-12 h-12` | 48×48px | `/logo.svg` |
| 大图标 | `w-16 h-16` | 64×64px | `/logo.svg` |
| 超大图标 | `w-24 h-24` | 96×96px | `/logo.svg` |
| 页面标题 | `h-10` | 40px 高度 | `/logo.svg` |
| 大标题 | `h-12` | 48px 高度 | `/logo.svg` |
| 超大标题 | `h-16` | 64px 高度 | `/logo.svg` |

### 文章封面尺寸

| 用途场景 | 尺寸 | 推荐资源 |
|---------|------|---------|
| 文章列表缩略图 | 200×113px | `/yyc3-article-cover-*.png` |
| 文章详情页封面 | 800×450px | `/yyc3-article-cover-*.png` |
| 社交媒体分享 | 1200×630px | `/yyc3-article-cover-*.png` |

### 用户头像尺寸

| 用途场景 | 尺寸 | 推荐资源 |
|---------|------|---------|
| 评论头像 | 32×32px | `/placeholder-user.jpg` |
| 用户列表 | 48×48px | `/placeholder-user.jpg` |
| 个人资料 | 200×200px | `/placeholder-user.jpg` |

### 资源尺寸与比例规范（综合）

为保证 PWA 性能与各端显示一致性，请遵循以下规范：

| 资源类型 | 建议比例 | 建议尺寸 | 使用场景 |
| :--- | :--- | :--- | :--- |
| **品牌图标** | 1:1 | 512×512 px | PWA 图标, App Icon, Favicon |
| **完整 Logo** | 4:1 ~ 5:1 | 1200×300 px | 导航栏, 启动页, 页脚 |
| **商品主图** | 1:1 | 1080×1080 px | 商品详情, 推荐列表 |
| **内容大图** | 16:9 | 1920×1080 px | 首页文章封面, 专题横幅 |
| **文章缩略图** | 1:1 | 400×400 px | 侧边栏列表, 搜索结果 |
| **用户头像** | 1:1 | 200×200 px | 个人中心, AI 助手头像 |

---

## 🎨 颜色变体使用场景

| 颜色 | 资源路径 | 使用场景 |
|------|---------|---------|
| 蓝色 | `/yyc3-logo-blue.png` | 默认品牌色，通用场景 |
| 皇家蓝 | `/yyc3-logo-royalblue.png` | 强调品牌色，重要场景 |
| 青色 | `/yyc3-logo-cyan.png` | 活力场景，年轻化设计 |
| 黑色 | `/yyc3-logo-black-*.png` | 深色主题，正式场合 |
| 灰色 | `/yyc3-logo-gray.png` | 禁用状态，低调场景 |
| 红色 | `/yyc3-logo-red.png` | 警示场景，特殊强调 |
| 白色 | `/yyc3-logo-white.png` | 深色背景，反白设计 |

---

## ⚡ 性能优化建议

### 1. 优先使用 SVG 格式

```tsx
// ✅ 推荐：SVG 矢量图，可任意缩放不失真
import logo from '/logo.svg';

// ⚠️ 备选：PNG 位图，固定尺寸
import logo from '/logo.png';
```

### 2. 使用 object-contain 保持比例

```tsx
<img src="/logo.svg" alt="Logo" className="object-contain" />
```

### 3. 避免不必要的滤镜

```tsx
// ❌ 不推荐：使用滤镜反转颜色（性能开销）
<img src="/logo.svg" alt="Logo" className="filter brightness-0 invert" />

// ✅ 推荐：直接使用白色 Logo
<img src="/yyc3-logo-white.png" alt="Logo" />
```

### 4. 响应式图片

```tsx
// 使用 srcset 提供不同尺寸
<img
  src="/yyc3-article-cover-01.png"
  srcSet="/yyc3-article-cover-01.png 800w, /yyc3-article-cover-01.png 1200w"
  sizes="(max-width: 768px) 100vw, 800px"
  alt="Article Cover"
/>
```

### 5. 使用 ImageWithFallback 组件

```tsx
// ✅ 推荐：使用 ImageWithFallback 组件处理外部图片
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

<ImageWithFallback 
  src="https://images.unsplash.com/..." 
  alt="描述" 
  className="w-full h-auto rounded-lg"
/>
```

---

## 🔧 维护指南

### 添加新资源

1. 将图片文件放入 `public/` 目录
2. 在本文档中添加资源信息
3. 更新相关组件的导入路径

### 添加 Figma 资源

1. 从 Figma 导出图片，获取 HASH_ID
2. 使用 `figma:asset/HASH_ID.png` 格式导入
3. 更新本文档的 Figma 资源清单

### 添加外部图片

1. 选择符合风格的高质量图片（Unsplash 等）
2. 使用 `ImageWithFallback` 组件包装
3. 更新本文档的外部资源清单

### 更新资源

1. 替换 `public/` 目录中的文件
2. 确保文件名保持一致
3. 测试所有使用该资源的地方

### 删除资源

1. 从 `public/` 目录删除文件
2. 从本文档中移除相关信息
3. 更新所有引用该资源的组件

---

## 📋 资源使用统计

### 当前使用情况

| 资源路径 | 使用位置 | 使用次数 |
|---------|---------|---------|
| `/logo.svg` | BrandLogo, GlobalAIAssistant, AIAssistantQuickAccess, AssistantAvatar | 4 |
| `/icon.svg` | 已替换为 `/logo.svg` | 0 |
| `/yyc3-logo-*.png` | 历史遗留，建议替换为 `/logo.svg` | 0 |
| `/yyc3-article-cover-*.png` | 文章相关组件 | 待统计 |
| `/placeholder-*.png` | 占位符组件 | 待统计 |
| `figma:asset/*.png` | Figma 导入资源 | 待统计 |
| `https://images.unsplash.com/*` | 外部图片资源 | 待统计 |

---

## 📚 相关文档

- **[009-HaiLan-Pro-项目开发-本地衔接指南.md](../009-HaiLan-Pro-项目开发-本地衔接指南.md)** - 项目开发完整指南
- **[HaiLan-Pro-设计规范/](../HaiLan-Pro-设计规范/)** - 设计规范文档
- **[HaiLan-Pro-技术文档/](./)** - 技术文档目录

---

## 📞 技术支持

如有疑问，请联系：
- **技术文档**: `/docs/HaiLan-Pro-技术文档/`
- **设计规范**: `/docs/HaiLan-Pro-设计规范/`
- **开发团队**: YYC³ Team

---

<div align="center">

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」

</div>
