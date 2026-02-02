# 海蓝 (HaiLan) - 高端私密健康管理 PWA

海蓝 (HaiLan) 是一款基于 React 18.2、Vite 6 和 Supabase 构建的医疗级私密健康管理系统。项目致力于通过 ZK-Proof (零知识证明)、匿名 DID 和 IPFS 分布式存储，为精英用户提供绝对隐私的健康数据管理体验。

## 🌟 核心理念与设计规范

- **隐私至上**：采用匿名 DID 体系，所有敏感健康数据经加密后存储于 IPFS，仅用户持有解密密钥。
- **视觉逻辑**：
  - **禁用黑色**：全局严禁使用纯黑（#000000），采用品牌蓝（#0056b3）与深海蓝（#002b5c）替代。
  - **毛玻璃效果**：核心组件均采用高斯模糊（Backdrop Blur）与半透明白（White/10-20%）的拟态化设计。
  - **隐私遮罩**：集成 `CamouflageScreen`（伪装屏）与全局模糊滤镜，防止在公共场合泄露敏感信息。

## 🛠 技术栈架构

- **前端框架**：React 18.2.0 (已从 18.3.1 降级以确保生态兼容性)
- **构建工具**：Vite 6.3.5 + Tailwind CSS v4.0
- **路由系统**：`MemoryRouter` (集成于 `CustomRouter`)
  - _选择理由_：兼容 Figma 预览环境；确保 URL 不泄露内部操作路径，符合隐私标准。
- **安全底层**：Supabase (Auth/DB) + IPFS + ZK-Proof
- **UI 组件**：MUI v6 (稳定版) + Radix UI + Lucide React

## 📱 多端适配与操作指导

项目采用“单代码库，双感知模型”策略，通过自定义 Hook 识别设备环境：

### 1. 移动端 (Mobile PWA)

- **核心交互**：底部导航栏 (`BottomNav`) + 抽屉式组件 (`Drawer/Vaul`)。
- **操作方式**：
  - 侧滑返回，长按触发隐私遮罩。
  - PWA 模式下支持离线访问及沉浸式全屏。
- **安装建议**：在 Safari (iOS) 或 Chrome (Android) 中点击“添加到主屏幕”。

### 2. 桌面端 (Desktop/Figma)

- **核心交互**：顶部透明导航 (`Navbar`) + Bento Grid (模块化布局) + 弹窗式组件 (`Dialog`)。
- **预览环境**：完美兼容 Figma Sandbox 环境，无浏览历史报错。

## ⚠️ 核心问题解决记录 (Troubleshooting)

### 1. 浏览器白屏 (White Screen Fix)

- **现象**：系统启动后仅显示背景颜色或控制台报错 `ReactCurrentBatchConfig is undefined`。
- **根因**：React 18.3.x 对 Scheduler 内部 API 的 Breaking Change 导致 `framer-motion` 与 `MUI` 崩溃。
- **解决**：
  - 执行 `pnpm remove scheduler` 移除显式安装的调度器。
  - 将 `react` / `react-dom` 统一降级至 `18.2.0`。
  - 将 `@mui/material` 修正为稳定版本 `6.4.0`。

### 2. 路由白屏与警告

- **根因**：React Router v6 在特定环境下对 `future` 标识的强制要求。
- **解决**：在 `CustomRouter.tsx` 中显式开启 `v7_startTransition` 与 `v7_relativeSplatPath`。

## 🚀 开发与部署

### 环境准备

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产包
pnpm build
```

### 环境变量

需在 Supabase 中配置以下 Secret（通过 `create_supabase_secret` 工具）：

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 🛡 安全声明

本项目所有前端逻辑均不直接处理用户明文密码。所有身份验证均通过 Supabase Admin Auth 配合 ZK 验证链路完成。