---
@file: 142-Docker部署方案.md
@description: HaiLan Pro Docker部署方案，包含Dockerfile编写、镜像构建、容器编排
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2026-01-26
@updated: 2026-01-26
@status: published
@tags: [HaiLan-Pro-部署运维],[]
---

> ***YanYuCloudCube***
> **标语**：言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> **标语**：万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 142 Docker部署方案

## 概述

本文档详细描述HaiLan Pro-HaiLan-Pro-部署运维-Docker部署方案相关内容，确保项目按照YYC³标准规范进行开发和实施。

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
- 规范Docker部署方案相关的业务标准与技术落地要求
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

### 3. Docker部署方案

#### 3.1 Docker 环境准备

**系统要求：**

| 组件 | 最低要求 | 推荐配置 |
|------|----------|----------|
| 操作系统 | Ubuntu 20.04+ / CentOS 8+ | Ubuntu 22.04 LTS |
| CPU | 2 核心 | 4 核心以上 |
| 内存 | 4 GB | 8 GB 以上 |
| 磁盘 | 50 GB | 100 GB SSD |

**Docker 安装：**

```bash
# Ubuntu/Debian 安装脚本
#!/bin/bash

# 卸载旧版本
sudo apt-get remove -y docker docker-engine docker.io containerd runc

# 更新包索引
sudo apt-get update

# 安装依赖
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# 添加 Docker 官方 GPG 密钥
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# 设置仓库
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 安装 Docker Engine
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# 启动 Docker
sudo systemctl start docker
sudo systemctl enable docker

# 添加用户到 docker 组
sudo usermod -aG docker $USER

# 验证安装
docker version
docker compose version
```

#### 3.2 前端 Dockerfile

**多阶段构建 Dockerfile：**

```dockerfile
# ============================================
# Stage 1: 依赖安装
# ============================================
FROM node:20-alpine AS deps
WORKDIR /app

# 安装 bun
RUN apk add --no-cache curl
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

# 复制依赖文件
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# ============================================
# Stage 2: 构建
# ============================================
FROM node:20-alpine AS builder
WORKDIR /app

# 复制 bun
COPY --from=deps /root/.bun /root/.bun
ENV PATH="/root/.bun/bin:${PATH}"

# 复制源代码
COPY . .

# 设置构建时环境变量
ARG VITE_API_URL
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY

ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
ENV VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}

# 构建生产版本
RUN bun run build

# ============================================
# Stage 3: 生产镜像
# ============================================
FROM nginx:alpine AS runner

# 安装基础工具
RUN apk add --no-cache curl

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制 Nginx 配置
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/default.conf /etc/nginx/conf.d/default.conf

# 创建非 root 用户
RUN addgroup -g 1001 -S nginx && \
    adduser -S -D -H -u 1001 -h /usr/share/nginx/html -s /sbin/nologin -G nginx -g nginx nginx

# 设置权限
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# 切换用户
USER nginx

# 暴露端口
EXPOSE 8080

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

# 启动 Nginx (前台运行)
CMD ["nginx", "-g", "daemon off;"]
```

**Nginx 配置 (default.conf)：**

```nginx
server {
    listen 8080;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # PWA 支持
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache";
    }

    # 静态资源缓存
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 健康检查端点
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }

    # 禁止访问隐藏文件
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
```

#### 3.3 后端 Dockerfile (Supabase Edge Functions)

```dockerfile
# ============================================
# Supabase Edge Functions
# ============================================
FROM denoland/deno:alpine-1.38.0 AS runtime

WORKDIR /app

# 复制函数文件
COPY supabase/functions ./functions

# 安装依赖
RUN deno cache --reload $(find ./functions -name "*.ts")

# 环境变量
ARG SUPABASE_URL
ARG SUPABASE_ANON_KEY
ARG SUPABASE_SERVICE_ROLE_KEY

ENV SUPABASE_URL=${SUPABASE_URL}
ENV SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
ENV SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}

# 暴露端口
EXPOSE 8080

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD deno run --allow-net --allow-env /app/health-check.ts

# 启动服务
CMD ["deno", "run", "--allow-net", "--allow-env", "--allow-read", "functions/index.ts"]
```

#### 3.4 Docker Compose 配置

**docker-compose.yml：**

```yaml
version: "3.9"

services:
  # ============================================
  # 前端服务
  # ============================================
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        VITE_API_URL: ${VITE_API_URL:-http://localhost:3000}
        VITE_SUPABASE_URL: ${VITE_SUPABASE_URL}
        VITE_SUPABASE_ANON_KEY: ${VITE_SUPABASE_ANON_KEY}
    image: hailan-frontend:${IMAGE_TAG:-latest}
    container_name: hailan-frontend
    restart: unless-stopped
    ports:
      - "${FRONTEND_PORT:-8080}:8080"
    environment:
      - NODE_ENV=production
    networks:
      - hailan-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 10s
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  # ============================================
  # Supabase Studio (管理界面)
  # ============================================
  supabase-studio:
    image: supabase/studio:latest
    container_name: hailan-studio
    restart: unless-stopped
    ports:
      - "${STUDIO_PORT:-3000}:3000"
    environment:
      - STUDIO_PG_META_URL=http://meta:8080
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - DEFAULT_ORGANIZATION_NAME=${ORGANIZATION_NAME:-HaiLan Pro}
      - DEFAULT_PROJECT_NAME=${PROJECT_NAME:-hailan-pro}
    networks:
      - hailan-network
    depends_on:
      - meta

  # ============================================
  # Supabase Meta (数据库管理)
  # ============================================
  meta:
    image: supabase/postgres-meta:latest
    container_name: hailan-meta
    restart: unless-stopped
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=postgresql://postgres:${POSTGRES_PASSWORD}@db:5432/postgres
    networks:
      - hailan-network
    depends_on:
      - db

  # ============================================
  # PostgreSQL 数据库
  # ============================================
  db:
    image: supabase/postgres:15.1.0.147
    container_name: hailan-db
    restart: unless-stopped
    ports:
      - "${DB_PORT:-5432}:5432"
    environment:
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=postgres
      - POSTGRES_USER=postgres
      - JWT_SECRET=${JWT_SECRET}
      - JWT_EXP=${JWT_EXP:-3600000}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./docker/db/init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - hailan-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  # ============================================
  # Redis 缓存
  # ============================================
  redis:
    image: redis:7-alpine
    container_name: hailan-redis
    restart: unless-stopped
    ports:
      - "${REDIS_PORT:-6379}:6379"
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    networks:
      - hailan-network
    healthcheck:
      test: ["CMD", "redis-cli", "-a", "${REDIS_PASSWORD}", "ping"]
      interval: 10s
      timeout: 3s
      retries: 3

  # ============================================
  # IPFS 节点 (敏感数据存储)
  # ============================================
  ipfs:
    image: ipfs/kubo:latest
    container_name: hailan-ipfs
    restart: unless-stopped
    ports:
      - "${IPFS_API_PORT:-5001}:5001"
      - "${IPFS_SWARM_PORT:-4001}:4001"
      - "${IPFS_GATEWAY_PORT:-8081}:8080"
    environment:
      - IPFS_PROFILE=server
    volumes:
      - ipfs_data:/data/ipfs
      - ./docker/ipfs/config:/data/ipfs/config
    networks:
      - hailan-network

  # ============================================
  # Nginx 反向代理
  # ============================================
  nginx:
    image: nginx:alpine
    container_name: hailan-nginx
    restart: unless-stopped
    ports:
      - "${HTTP_PORT:-80}:80"
      - "${HTTPS_PORT:-443}:443"
    volumes:
      - ./docker/nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./docker/nginx/ssl:/etc/nginx/ssl:ro
      - ./docker/nginx/logs:/var/log/nginx
    networks:
      - hailan-network
    depends_on:
      - frontend
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/health"]
      interval: 30s
      timeout: 3s
      retries: 3

networks:
  hailan-network:
    driver: bridge
    name: hailan-network

volumes:
  postgres_data:
    name: hailan-postgres-data
  redis_data:
    name: hailan-redis-data
  ipfs_data:
    name: hailan-ipfs-data
```

#### 3.5 镜像构建与优化

**构建脚本 (build.sh)：**

```bash
#!/bin/bash

set -e

# 配置
IMAGE_NAME="hailan-frontend"
REGISTRY="registry.hailan.pro"
VERSION=${VERSION:-$(git describe --tags --always --dirty)}
CACHE_FROM="--cache-from ${REGISTRY}/${IMAGE_NAME}:latest"

echo "Building ${IMAGE_NAME}:${VERSION}"

# 多架构构建
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --tag ${REGISTRY}/${IMAGE_NAME}:${VERSION} \
  --tag ${REGISTRY}/${IMAGE_NAME}:latest \
  ${CACHE_FROM} \
  --push \
  .

echo "Build complete: ${REGISTRY}/${IMAGE_NAME}:${VERSION}"
```

**镜像优化最佳实践：**

| 优化项 | 技术 | 效果 |
|--------|------|------|
| 镜像大小 | 多阶段构建 | 减少 80% |
| 构建速度 | BuildKit 缓存 | 减少 60% |
| 安全性 | 非 root 用户 | 降低权限风险 |
| 扫描漏洞 | Trivy 扫描 | 安全合规 |

#### 3.6 容器编排命令

**常用运维命令：**

```bash
# 启动所有服务
docker compose up -d

# 查看服务状态
docker compose ps

# 查看日志
docker compose logs -f frontend

# 重启服务
docker compose restart frontend

# 扩容服务
docker compose up -d --scale frontend=3

# 停止所有服务
docker compose down

# 停止并删除数据卷
docker compose down -v

# 进入容器
docker compose exec frontend sh

# 查看资源使用
docker stats

# 清理未使用资源
docker system prune -a --volumes
```

#### 3.7 容器健康检查

**健康检查配置：**

```yaml
# docker-compose.yml 中的健康检查
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
  interval: 30s      # 检查间隔
  timeout: 3s        # 超时时间
  retries: 3         # 重试次数
  start_period: 10s  # 启动宽限期
```

**健康检查端点实现：**

```typescript
// src/health.ts
import { Request, Response } from 'express';

export function healthCheck(req: Request, res: Response): void {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
    },
    checks: {
      database: checkDatabase(),
      redis: checkRedis(),
      ipfs: checkIPFS(),
    }
  };

  const isHealthy = Object.values(health.checks).every(check => check.status === 'ok');
  const statusCode = isHealthy ? 200 : 503;

  res.status(statusCode).json(health);
}
```

#### 3.8 容器日志管理

**日志配置：**

```yaml
logging:
  driver: "json-file"
  options:
    max-size: "10m"      # 单个日志文件最大 10MB
    max-file: "3"        # 保留 3 个日志文件
    compress: "true"     # 压缩旧日志
```

**日志收集方案：**

```bash
# 使用 ELK 收集容器日志
docker run -d \
  --name filebeat \
  --volume=/var/lib/docker/containers:/var/lib/docker/containers:ro \
  --volume=/var/run/docker.sock:/var/run/docker.sock:ro \
  --volume="$(pwd)/filebeat.yml:/usr/share/filebeat/filebeat.yml:ro" \
  elastic/filebeat:latest
```

#### 3.9 安全加固

**容器安全配置：**

```dockerfile
# 安全基础镜像
FROM node:20-alpine AS builder

# 非 root 用户运行
RUN addgroup -g 1001 -S appuser && \
    adduser -S -D -H -u 1001 -s /sbin/nologin -G appuser appuser

# 切换用户
USER appuser

# 只读根文件系统
RUN --mount=type=cache,target=/var/cache/apk \
    apk add --no-cache dumb-init

# 限制权限
HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:8080/health || exit 1

# 入口点
ENTRYPOINT ["dumb-init", "--"]
```

**Docker 安全扫描：**

```bash
# 使用 Trivy 扫描镜像漏洞
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy image hailan-frontend:latest

# 使用 Dive 分析镜像层
dive hailan-frontend:latest
```

#### 3.10 部署流程

**完整部署流程：**

```bash
#!/bin/bash

# 1. 构建镜像
./scripts/build.sh

# 2. 推送镜像到仓库
docker push registry.hailan.pro/hailan-frontend:v1.0.0

# 3. 拉取最新镜像
docker compose pull

# 4. 停止旧容器
docker compose down

# 5. 启动新容器
docker compose up -d

# 6. 健康检查
./scripts/health-check.sh

# 7. 清理旧镜像
docker image prune -f
```

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
