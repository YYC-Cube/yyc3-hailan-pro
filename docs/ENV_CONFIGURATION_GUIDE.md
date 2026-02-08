# 环境变量配置指南

## 概述

HaiLan Pro 项目使用环境变量来管理不同环境的配置，包括开发环境、测试环境和生产环境。所有敏感信息（密钥、密码、API Key 等）都通过环境变量进行管理，确保安全性。

## 文件说明

### 环境变量模板文件

- `.env.development.example` - 开发环境配置模板
- `.env.production.example` - 生产环境配置模板
- `.env.example` - 通用配置模板（已弃用，请使用上述两个文件）

### 实际使用文件

- `.env` - 当前激活的环境变量文件（不提交到版本控制）
- `.env.development` - 开发环境专用（不提交到版本控制）
- `.env.production` - 生产环境专用（不提交到版本控制）

## 快速开始

### 1. 选择环境模板

根据您的部署环境选择对应的模板文件：

```bash
# 开发环境
cp .env.development.example .env

# 生产环境
cp .env.production.example .env
```

### 2. 填写环境变量

打开 `.env` 文件，根据注释说明填写各个变量的值。

### 3. 启动应用

```bash
# 开发环境
npm run dev

# 生产环境
npm run build
npm start
```

## 环境变量分类

### 1. 安全认证配置

| 变量名 | 用途 | 获取方式 | 安全要求 |
|---------|------|---------|---------|
| `CSRF_SECRET` | 防止 CSRF 攻击 | `openssl rand -base64 32` | 必须保密，定期轮换 |
| `API_JWT_SECRET` | JWT Token 签名 | `openssl rand -base64 64` | 必须保密，定期轮换 |

### 2. AI/LLM 服务配置

| 变量名 | 用途 | 获取方式 |
|---------|------|---------|
| `OPENAI_API_KEY` | OpenAI GPT 调用 | https://platform.openai.com/api-keys |
| `ZHIPU_API_KEY` | 智谱 AI GLM-4 调用 | https://open.bigmodel.cn/usercenter/apikeys |

### 3. 数据库配置

| 变量名 | 用途 | 格式示例 |
|---------|------|---------|
| `DATABASE_URL` | PostgreSQL 连接 | `postgresql://user:pass@host:5432/db` |
| `REDIS_URL` | Redis 连接 | `redis://:pass@host:6379/0` |

### 4. PWA 推送通知配置

| 变量名 | 用途 | 获取方式 |
|---------|------|---------|
| `VAPID_PUBLIC_KEY` | Web Push 公钥 | https://web-push-codelab.glitch.me/ |
| `VAPID_PRIVATE_KEY` | Web Push 私钥 | 同上 |
| `VAPID_EMAIL` | 联系邮箱 | 有效的邮箱地址 |

### 5. 第三方服务配置

#### 阿里云 OSS

| 变量名 | 用途 | 获取方式 |
|---------|------|---------|
| `OSS_ACCESS_KEY_ID` | OSS 访问 ID | https://oss.console.aliyun.com/ |
| `OSS_ACCESS_KEY_SECRET` | OSS 访问密钥 | 同上 |
| `OSS_BUCKET` | 存储桶名称 | 创建或使用现有 Bucket |
| `OSS_REGION` | 区域 | 如：oss-cn-hangzhou |
| `OSS_ENDPOINT` | 访问端点 | 如：https://oss-cn-hangzhou.aliyuncs.com |

#### 短信服务

| 变量名 | 用途 | 获取方式 |
|---------|------|---------|
| `SMS_ACCESS_KEY_ID` | 短信服务 ID | 阿里云短信服务 |
| `SMS_ACCESS_KEY_SECRET` | 短信服务密钥 | 同上 |
| `SMS_SIGN_NAME` | 短信签名 | 申请的签名名称 |
| `SMS_TEMPLATE_CODE` | 短信模板 | 申请的模板代码 |

### 6. 应用配置

| 变量名 | 用途 | 默认值 |
|---------|------|---------|
| `NODE_ENV` | 运行环境 | production |
| `API_PORT` | API 服务端口 | 3000 |
| `FRONTEND_URL` | 前端 URL | https://hailan.com |
| `API_BASE_URL` | API 基础 URL | https://api.hailan.com |

### 7. 功能开关

| 变量名 | 用途 | 可选值 |
|---------|------|---------|
| `ENABLE_PWA` | 启用 PWA 功能 | true, false |
| `ENABLE_AI` | 启用 AI 功能 | true, false |
| `ENABLE_NOTIFICATIONS` | 启用推送通知 | true, false |
| `ENABLE_PUSH_SYNC` | 启用数据同步 | true, false |

### 8. 监控与日志

| 变量名 | 用途 | 可选值 |
|---------|------|---------|
| `LOG_LEVEL` | 日志级别 | error, warn, info, debug |
| `SENTRY_DSN` | Sentry DSN | 从 Sentry 项目获取 |

### 9. 性能与限流

| 变量名 | 用途 | 默认值 |
|---------|------|---------|
| `RATE_LIMIT_MAX` | 限流阈值 | 100 |
| `API_TIMEOUT` | 请求超时（毫秒） | 10000 |
| `MAX_CONCURRENT_CONNECTIONS` | 最大并发连接数 | 100 |

### 10. 隐私与合规

| 变量名 | 用途 | 默认值 |
|---------|------|---------|
| `DATA_RETENTION_DAYS` | 数据保留天数 | 30 |
| `ENABLE_ENCRYPTION` | 启用数据加密 | true |
| `PRIVACY_MODE_DEFAULT` | 隐私模式默认状态 | false |

## Docker 部署

### 使用 Docker Compose

1. 创建 `.env` 文件：

```bash
cp .env.production.example .env
# 编辑 .env 文件填写配置
```

2. 启动服务：

```bash
docker-compose up -d
```

3. 查看日志：

```bash
docker-compose logs -f
```

4. 停止服务：

```bash
docker-compose down
```

## 安全最佳实践

### 1. 密钥管理

- ✅ 使用强随机字符串生成密钥
- ✅ 定期轮换密钥（建议每 90 天）
- ✅ 不要在代码中硬编码密钥
- ✅ 使用不同的密钥用于不同环境

### 2. 访问控制

- ✅ 限制 API Key 的访问权限
- ✅ 使用最小权限原则配置服务账号
- ✅ 定期审计访问日志
- ✅ 及时撤销不再使用的密钥

### 3. 数据保护

- ✅ 生产环境必须启用数据加密
- ✅ 设置合理的数据保留期限
- ✅ 定期备份重要数据
- ✅ 遵循隐私法规要求

### 4. 环境隔离

- ✅ 开发、测试、生产环境使用不同的配置
- ✅ 不要在生产环境使用开发密钥
- ✅ 使用版本控制管理配置模板，而非实际配置

## 故障排查

### 问题：环境变量未生效

**解决方案：**
1. 检查 `.env` 文件是否在项目根目录
2. 确认变量名拼写正确（区分大小写）
3. 重启应用使配置生效

### 问题：密钥无效

**解决方案：**
1. 检查密钥是否完整复制（无多余空格）
2. 确认密钥权限配置正确
3. 检查密钥是否已过期或被撤销

### 问题：数据库连接失败

**解决方案：**
1. 检查 `DATABASE_URL` 格式是否正确
2. 确认数据库服务是否运行
3. 检查网络连接和防火墙设置

## 常用命令

### 生成密钥

```bash
# CSRF 密钥
openssl rand -base64 32

# JWT 密钥
openssl rand -base64 64
```

### 验证配置

```bash
# 检查环境变量是否加载
node -e "console.log(require('dotenv').config())"

# 测试数据库连接
npm run test:db
```

### 清理缓存

```bash
# 清理 Docker 缓存
docker-compose down -v

# 清理 npm 缓存
npm cache clean --force
```

## 参考资源

- [OpenAI API Keys](https://platform.openai.com/api-keys)
- [智谱 AI API Keys](https://open.bigmodel.cn/usercenter/apikeys)
- [阿里云 OSS](https://oss.console.aliyun.com/)
- [Web Push Codelab](https://web-push-codelab.glitch.me/)
- [Sentry](https://sentry.io/)

## 更新日志

- 2026-02-04: 创建详细的环境变量配置文档
- 添加开发和生产环境分离的配置模板
- 添加详细的变量说明和获取方式