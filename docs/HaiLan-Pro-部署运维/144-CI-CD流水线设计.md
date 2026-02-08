---
file: 144-CI-CD流水线设计.md
description: HaiLan Pro CI/CD流水线设计，包含代码构建、自动化测试、自动部署
author: YanYuCloudCube Team
version: v1.0.0
created: 2026-01-26
updated: 2026-01-26
status: published
tags:
  - HaiLan-Pro-部署运维,[]
---

> ***YanYuCloudCube***
> **标语**：言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> **标语**：万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 144 CI/CD流水线设计

## 概述

本文档详细描述HaiLan Pro-HaiLan-Pro-部署运维-CI/CD流水线设计相关内容，确保项目按照YYC³标准规范进行开发和实施。

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
- 规范CI/CD流水线设计相关的业务标准与技术落地要求
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

### 3. CI/CD流水线设计

#### 3.1 CI/CD 架构概览

HaiLan Pro 采用 GitHub Actions 作为 CI/CD 平台，实现代码提交、测试、构建、部署的自动化流程。

**流水线架构：**

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          开发者工作流                                      │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐│
│  │  Feature    │ -> │    Pull     │ -> │    Code     │ -> │    Merge    ││
│  │  Branch     │    │   Request   │    │   Review    │    │   to Main   ││
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘│
└─────────────────────────────────────────────────────────────────────────┘
                                          │
                                          ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      GitHub Actions CI/CD                                │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                     持续集成 (CI)                                   │  │
│  ├───────────────────────────────────────────────────────────────────┤  │
│  │  1. 代码检出 (Checkout)                                            │  │
│  │  2. 依赖安装 (Install Dependencies)                                 │  │
│  │  3. 代码检查 (Lint: ESLint, Prettier)                              │  │
│  │  4. 类型检查 (Type Check: tsc)                                     │  │
│  │  5. 单元测试 (Unit Test: Vitest)                                   │  │
│  │  6. 构建检查 (Build: bun run build)                                │  │
│  │  7. 安全扫描 (Security Scan)                                       │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                          │                                │
│                                          ▼                                │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                     持续部署 (CD)                                   │  │
│  ├───────────────────────────────────────────────────────────────────┤  │
│  │  1. 构建镜像 (Docker Build)                                        │  │
│  │  2. 推送镜像 (Push to Registry)                                    │  │
│  │  3. 更新 Helm Chart (Package & Push)                               │  │
│  │  4. 部署到预发 (Deploy to Staging)                                 │  │
│  │  5. 冒烟测试 (Smoke Test)                                          │  │
│  │  6. 生产部署 (Deploy to Production)                                │  │
│  │  7. 健康检查 (Health Check)                                        │  │
│  │  8. 通知告警 (Notification)                                        │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
                                          │
                                          ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          部署目标环境                                      │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                 │
│  │ Development │ -> │  Staging    │ -> │ Production  │                 │
│  └─────────────┘    └─────────────┘    └─────────────┘                 │
└─────────────────────────────────────────────────────────────────────────┘
```

#### 3.2 GitHub Actions 工作流配置

**主工作流 (.github/workflows/ci-cd.yml)：**

```yaml
name: HaiLan Pro CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
  release:
    types: [published]

env:
  REGISTRY: registry.hailan.pro
  IMAGE_NAME: hailan-frontend
  NODE_VERSION: '20'
  BUN_VERSION: '1.1.0'

jobs:
  # CI: 代码质量检查与测试
  lint:
    name: Code Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: ${{ env.BUN_VERSION }}
      - run: bun install --frozen-lockfile
      - run: bun run lint

  type-check:
    name: Type Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: ${{ env.BUN_VERSION }}
      - run: bun install --frozen-lockfile
      - run: bun run type-check

  test:
    name: Unit Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: ${{ env.BUN_VERSION }}
      - run: bun install --frozen-lockfile
      - run: bun test --coverage
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  build:
    name: Build Application
    runs-on: ubuntu-latest
    needs: [lint, type-check, test]
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: ${{ env.BUN_VERSION }}
      - run: bun install --frozen-lockfile
      - name: Build production
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
        run: bun run build
      - uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/

  security-scan:
    name: Security Scan
    runs-on: ubuntu-latest
    needs: [build]
    steps:
      - uses: actions/checkout@v4
      - uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          format: 'sarif'
          output: 'trivy-results.sarif'

  build-and-push:
    name: Build and Push Docker Image
    runs-on: ubuntu-latest
    needs: [security-scan]
    if: github.event_name == 'push' || github.event_name == 'release'
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
      - uses: docker/metadata-action@v5
        id: meta
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=semver,pattern={{version}}
            type=sha,prefix={{branch}}-
      - uses: docker/build-push-action@v5
        with:
          context: .
          platforms: linux/amd64,linux/arm64
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}

  deploy-staging:
    name: Deploy to Staging
    runs-on: ubuntu-latest
    needs: [build-and-push]
    if: github.ref == 'refs/heads/develop'
    environment:
      name: staging
      url: https://staging.hailan.pro
    steps:
      - uses: actions/checkout@v4
      - uses: azure/k8s-set-context@v4
        with:
          method: kubeconfig
          kubeconfig: ${{ secrets.KUBE_CONFIG_STAGING }}
      - name: Deploy to Kubernetes
        run: |
          helm upgrade --install hailan-pro ./helm/hailan-pro \
            --namespace hailan-pro-staging \
            --create-namespace \
            --set image.tag=${{ github.sha }}

  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest
    needs: [build-and-push]
    if: github.event_name == 'release'
    environment:
      name: production
      url: https://hailan.pro
    steps:
      - uses: actions/checkout@v4
      - uses: azure/k8s-set-context@v4
        with:
          method: kubeconfig
          kubeconfig: ${{ secrets.KUBE_CONFIG_PROD }}
      - name: Deploy to Kubernetes
        run: |
          helm upgrade --install hailan-pro ./helm/hailan-pro \
            --namespace hailan-pro \
            --set image.tag=${{ github.sha }}
```

#### 3.3 分支策略

**Git Flow 工作流：**

| 分支类型 | 命名规范 | 用途 | 合并目标 | 保护规则 |
|----------|----------|------|----------|----------|
| main | main | 生产代码 | 仅接受来自 release/hotfix | 必需 PR + 审批 + CI 通过 |
| develop | develop | 开发集成 | 接受来自 feature/release | 必需 PR + CI 通过 |
| feature | feature/* | 功能开发 | 合并到 develop | 必需 PR + CI 通过 |
| release | release/* | 发布准备 | 合并到 main + develop | 必需 PR + 审批 + CI 通过 |
| hotfix | hotfix/* | 紧急修复 | 合并到 main + develop | 必需 PR + 审批 + CI 通过 |

#### 3.4 灰度发布策略

**金丝雀发布配置：**

```yaml
canary:
  enabled: true
  steps:
    - weight: 5
      duration: 15m
      metrics:
        - errorRate < 1%
        - p95Latency < 500ms
    - weight: 25
      duration: 15m
    - weight: 50
      duration: 15m
    - weight: 100
  rollback:
    enabled: true
    onFailure: true
```

#### 3.5 监控与告警

**部署监控指标：**

| 指标类型 | 监控项 | 告警阈值 | 动作 |
|----------|--------|----------|------|
| 部署 | 部署耗时 | > 30分钟 | 通知 |
| 部署 | 部署成功率 | < 95% | 告警 |
| 应用 | 错误率 | > 5% | 回滚 |
| 应用 | P95延迟 | > 2s | 告警 |
| 基础设施 | Pod重启次数 | > 3 | 回滚 |

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
