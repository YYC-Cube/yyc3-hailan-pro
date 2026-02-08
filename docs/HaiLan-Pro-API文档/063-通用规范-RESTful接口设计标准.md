---
file: 063-通用规范-RESTful接口设计标准.md
description: HaiLan Pro 全项目RESTful接口的统一设计标准，包含请求、响应、路径规范
author: YanYuCloudCube Team
version: v1.0.0
created: 2026-02-03
updated: 2026-02-03
status: published
tags:
  - API接口,[通用规范],[RESTful]
---

> ***YanYuCloudCube***
> **标语**：言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> **标语**：万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 063 通用规范-RESTful接口设计标准

## 概述

本文档详细描述HaiLan Pro项目RESTful接口的统一设计标准，包含请求、响应、路径规范，确保项目按照YYC³标准规范进行开发和实施。

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
- 规范RESTful接口设计标准，确保接口设计的一致性和规范性
- 为前后端开发人员提供清晰的接口设计指导
- 保障接口的可维护性、可扩展性和安全性

### 2. 设计原则

#### 2.1 RESTful架构原则

##### 2.1.1 资源导向
- 所有接口以资源为中心设计
- 使用名词而非动词表示资源
- 资源使用复数形式

##### 2.1.2 统一接口风格
- 遵循REST架构风格
- 使用标准HTTP方法
- 无状态设计
- 统一的响应格式

##### 2.1.3 版本控制
- 通过URL路径进行版本控制
- 版本号格式：`/api/v{version}/resource`
- 当前版本：v1.0.0

#### 2.2 安全性原则

##### 2.2.1 认证授权
- 所有接口必须进行身份认证
- 使用JWT Token进行身份验证
- 支持匿名DID匿名访问

##### 2.2.2 数据加密
- 敏感数据传输必须加密
- 使用HTTPS协议
- 支持端到端加密

##### 2.2.3 隐私保护
- 支持隐私模式访问
- 数据脱敏处理
- 匿名化请求支持

### 3. 接口命名规范

#### 3.1 URL路径规范

##### 3.1.1 基础路径格式
```
https://api.hailan.com/api/v1.0/{resource}
```

##### 3.1.2 资源命名规则
- 使用小写字母
- 使用连字符(-)分隔单词
- 使用复数形式
- 示例：`/api/v1.0/users`, `/api/v1.0/products`

##### 3.1.3 层级关系
- 使用路径表示资源层级关系
- 示例：`/api/v1.0/users/{userId}/orders`

#### 3.2 HTTP方法规范

| HTTP方法 | 用途 | 是否幂等 | 示例 |
|---------|------|---------|------|
| GET | 获取资源 | 是 | GET /api/v1.0/products |
| POST | 创建资源 | 否 | POST /api/v1.0/orders |
| PUT | 完整更新资源 | 是 | PUT /api/v1.0/users/{id} |
| PATCH | 部分更新资源 | 否 | PATCH /api/v1.0/users/{id} |
| DELETE | 删除资源 | 是 | DELETE /api/v1.0/orders/{id} |

### 4. 请求规范

#### 4.1 请求头规范

##### 4.1.1 标准请求头
```http
Content-Type: application/json
Accept: application/json
Authorization: Bearer {token}
X-Request-ID: {uuid}
X-Client-Version: {version}
X-Privacy-Mode: {STANDARD|STEALTH|DISGUISE}
```

##### 4.1.2 请求头说明
- `Content-Type`：请求内容类型，统一使用application/json
- `Accept`：期望的响应类型
- `Authorization`：认证Token，格式为Bearer {token}
- `X-Request-ID`：请求唯一标识，用于链路追踪
- `X-Client-Version`：客户端版本号
- `X-Privacy-Mode`：隐私模式标识

#### 4.2 请求参数规范

##### 4.2.1 路径参数
- 用于标识特定资源
- 示例：`/api/v1.0/users/{userId}`

##### 4.2.2 查询参数
- 用于过滤、排序、分页
- 格式：`?key=value&key2=value2`
- 示例：`/api/v1.0/products?page=1&limit=20&sort=price`

##### 4.2.3 请求体参数
- 用于创建或更新资源
- 格式：JSON
- 示例：
```json
{
  "name": "商品名称",
  "price": 199.00,
  "category": "CARE"
}
```

#### 4.3 分页规范

##### 4.3.1 分页参数
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|-------|------|------|--------|------|
| page | integer | 否 | 1 | 页码，从1开始 |
| limit | integer | 否 | 20 | 每页数量，最大100 |

##### 4.3.2 分页响应
```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

#### 4.4 排序规范

##### 4.4.1 排序参数
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|-------|------|------|--------|------|
| sort | string | 否 | createdAt | 排序字段 |
| order | string | 否 | desc | 排序方向：asc/desc |

##### 4.4.2 排序示例
```
/api/v1.0/products?sort=price&order=asc
/api/v1.0/orders?sort=createdAt&order=desc
```

#### 4.5 过滤规范

##### 4.5.1 过滤参数
- 使用字段名作为过滤参数
- 支持等值过滤、范围过滤
- 示例：
```
/api/v1.0/products?category=CARE
/api/v1.0/products?price[min]=100&price[max]=500
```

### 5. 响应规范

#### 5.1 统一响应格式

##### 5.1.1 成功响应
```json
{
  "success": true,
  "code": 200,
  "message": "操作成功",
  "data": {
    // 业务数据
  },
  "timestamp": "2026-02-03T10:00:00.000Z",
  "requestId": "uuid"
}
```

##### 5.1.2 错误响应
```json
{
  "success": false,
  "code": 400,
  "message": "请求参数错误",
  "error": {
    "type": "VALIDATION_ERROR",
    "details": [
      {
        "field": "email",
        "message": "邮箱格式不正确"
      }
    ]
  },
  "timestamp": "2026-02-03T10:00:00.000Z",
  "requestId": "uuid"
}
```

#### 5.2 响应状态码

| 状态码 | 说明 | 使用场景 |
|-------|------|---------|
| 200 | OK | 请求成功 |
| 201 | Created | 资源创建成功 |
| 204 | No Content | 删除成功，无返回内容 |
| 400 | Bad Request | 请求参数错误 |
| 401 | Unauthorized | 未授权 |
| 403 | Forbidden | 无权限 |
| 404 | Not Found | 资源不存在 |
| 422 | Unprocessable Entity | 业务逻辑错误 |
| 429 | Too Many Requests | 请求过于频繁 |
| 500 | Internal Server Error | 服务器内部错误 |

#### 5.3 响应头规范

```http
Content-Type: application/json
X-Request-ID: {uuid}
X-Rate-Limit-Remaining: {count}
X-Rate-Limit-Reset: {timestamp}
```

### 6. 业务接口规范

#### 6.1 用户端接口

##### 6.1.1 用户注册
```
POST /api/v1.0/users/register
```

##### 6.1.2 用户登录
```
POST /api/v1.0/users/login
```

##### 6.1.3 获取用户信息
```
GET /api/v1.0/users/{userId}
```

#### 6.2 商城接口

##### 6.2.1 获取商品列表
```
GET /api/v1.0/products
```

##### 6.2.2 获取商品详情
```
GET /api/v1.0/products/{productId}
```

##### 6.2.3 创建订单
```
POST /api/v1.0/orders
```

#### 6.3 隐私中心接口

##### 6.3.1 设置隐私模式
```
POST /api/v1.0/privacy/mode
```

##### 6.3.2 获取隐私设置
```
GET /api/v1.0/privacy/settings
```

#### 6.4 AI接口

##### 6.4.1 AI对话
```
POST /api/v1.0/ai/chat
```

##### 6.4.2 获取推荐
```
GET /api/v1.0/ai/recommendations
```

#### 6.5 IoT设备接口

##### 6.5.1 绑定设备
```
POST /api/v1.0/devices/bind
```

##### 6.5.2 获取设备列表
```
GET /api/v1.0/devices
```

### 7. 安全规范

#### 7.1 认证机制

##### 7.1.1 JWT Token认证
- 使用JWT进行身份认证
- Token有效期：24小时
- Token刷新机制：Refresh Token

##### 7.1.2 匿名DID认证
- 支持匿名DID访问
- 隐私模式下自动启用
- 不记录用户身份信息

#### 7.2 数据加密

##### 7.2.1 传输加密
- 全部使用HTTPS协议
- TLS 1.2+
- 证书有效期检查

##### 7.2.2 数据加密
- 敏感字段加密存储
- 使用AES-256加密算法
- 密钥管理规范

#### 7.3 隐私保护

##### 7.3.1 隐私模式
- STANDARD：标准模式，正常数据访问
- STEALTH：隐身模式，数据脱敏
- DISGUISE：伪装模式，匿名访问

##### 7.3.2 数据脱敏
- 手机号脱敏：138****1234
- 地址脱敏：北京市朝阳区****
- 姓名脱敏：张**

### 8. 性能规范

#### 8.1 响应时间要求

| 接口类型 | 响应时间要求 |
|---------|------------|
| 简单查询 | < 100ms |
| 复杂查询 | < 500ms |
| 创建操作 | < 300ms |
| 更新操作 | < 300ms |
| 删除操作 | < 200ms |

#### 8.2 并发处理

- 支持高并发访问
- 使用连接池管理
- 实现请求限流

#### 8.3 缓存策略

- GET请求支持缓存
- 缓存时间：5分钟
- 缓存键设计规范

### 9. 监控与日志

#### 9.1 接口监控

##### 9.1.1 监控指标
- 响应时间
- 错误率
- 并发数
- 吞吐量

##### 9.1.2 告警规则
- 错误率 > 5%
- 响应时间 > 1s
- 并发数 > 1000

#### 9.2 日志规范

##### 9.2.1 请求日志
- 记录请求参数
- 记录请求时间
- 记录请求ID

##### 9.2.2 响应日志
- 记录响应状态
- 记录响应时间
- 记录错误信息

### 10. 最佳实践

#### 10.1 接口设计

- 保持接口简洁性
- 避免过度设计
- 合理使用HTTP方法
- 统一命名规范

#### 10.2 错误处理

- 提供清晰的错误信息
- 使用标准错误码
- 记录详细错误日志
- 友好的用户提示

#### 10.3 版本管理

- 向后兼容旧版本
- 提前通知版本变更
- 维护版本文档
- 支持多版本共存

## 附录

### A. 参考文档

- RESTful API设计最佳实践
- HTTP/1.1规范
- JSON API规范
- YYC³项目规范文档

### B. 术语表

- REST：Representational State Transfer
- API：Application Programming Interface
- JWT：JSON Web Token
- DID：Decentralized Identity
- PWA：Progressive Web App

---

<div align="center">

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」

</div>
