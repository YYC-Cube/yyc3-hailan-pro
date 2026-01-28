# 海蓝 (HaiLan) - 私密情趣健康生活平台

![HaiLan App](https://img.shields.io/badge/Status-Beta-blue) ![Privacy](https://img.shields.io/badge/Privacy-High-green) ![Stack](https://img.shields.io/badge/Stack-React_Vite_Tailwind-orange)

海蓝 (HaiLan) 是一个高端、私密的情趣健康生活管理平台。它采用渐进式 Web 应用 (PWA) 架构，专注于用户隐私保护、生物识别安全和本地化数据管理。

本项目设计为 **"Offline First, API Ready"**，既可以作为纯前端离线应用运行，也可以连接您的私有 NAS 服务器以获得更强大的 AI 和数据同步能力。

## 🌟 核心特性

- **隐私优先设计**：
  - **伪装入口**：启动时显示为全功能计算器，只有输入特定序列并通过生物验证后才进入主界面。
  - **本地加密**：核心数据默认存储在浏览器本地 (IndexedDB/LocalStorage)，不上传云端。
  - **生物识别**：集成 WebAuthn (FaceID/TouchID) 进行身份验证。

- **AI 智能助手**：
  - 内置本地规则引擎，无网环境下也能提供基础咨询。
  - 支持接入私有 LLM (如 Llama 3, Qwen) 运行在您的 NAS 上。

- **现代化 UI/UX**：
  - 基于 Tailwind CSS 的响应式设计。
  - 流畅的动画与交互 (React Router v7)。

## 📂 项目结构

```
src/
├── app/
│   ├── components/      # 通用 UI 组件 (Figma 导入组件)
│   ├── pages/           # 页面级组件 (AI助手, 仪表盘等)
│   └── App.tsx          # 应用入口与路由配置
├── config/
│   └── app.config.ts    # [关键] 全局配置与 API 设置
├── services/
│   ├── api.client.ts    # HTTP 请求封装
│   └── ai.service.ts    # AI 业务逻辑 (包含 Mock/Real 切换)
├── types/
│   └── index.ts         # TypeScript 类型定义
└── styles/              # 全局样式与 Tailwind 配置
```

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
# 或
pnpm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173` 即可体验。

## 🔌 连接私有 NAS (后端集成指南)

本项目完全支持私有化部署。如果您拥有 NAS (Synology, QNAP, 或自建 Linux 服务器)，可以部署配套的后端 API。

### 步骤 1: 修改配置

打开 `src/config/app.config.ts` 文件：

```typescript
export const AppConfig = {
  api: {
    // 将此处修改为您 NAS 的 API 地址
    baseUrl: "http://192.168.1.XX:3000/api",
    
    // 启用真实后端连接
    useRealBackend: true, 
  },
  // ...
};
```

### 步骤 2: API 接口规范

您的后端服务需要实现以下基础接口 (基于 `src/types/index.ts` 定义)：

- **POST /chat/completions**
  - Request: `{ message: string, history: Message[] }`
  - Response: `{ success: true, data: { content: string, suggestions: [] } }`

### 步骤 3: 跨域设置 (CORS)

请确保您的 NAS 后端允许前端域名的 CORS 请求。

## 🛡️ 生物识别 (WebAuthn) 说明

项目使用 `navigator.credentials.get()` 调用原生生物识别硬件。
- **开发环境**：由于 WebAuthn 安全限制，必须在 `localhost` 或 `https` 协议下才能生效。
- **纯前端模式**：在未连接后端时，系统会模拟验证通过，仅验证用户是否能触发系统 UI。

## 📦 构建与部署

```bash
npm run build
```

构建产物位于 `dist/` 目录，可直接部署到任何静态服务器 (Nginx, Vercel, 或 NAS 的 Web Station)。

---

© 2026 HaiLan Privacy Health. All Rights Reserved.
