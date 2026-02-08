---
file: 107-Prisma-ORM使用规范.md
description: HaiLan Pro Prisma ORM使用规范，包含Schema定义、查询、迁移、种子数据等
author: YanYuCloudCube Team
version: v1.0.0
created: 2026-01-26
updated: 2026-01-26
status: published
tags:
  - HaiLan-Pro-开发规范,[]
---

> ***YanYuCloudCube***
> **标语**：言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> **标语**：万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 107 Prisma ORM使用规范

## 概述

本文档详细描述HaiLan Pro-HaiLan-Pro-开发规范-Prisma ORM使用规范相关内容，确保项目按照YYC³标准规范进行开发和实施。

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
- 规范Prisma ORM使用规范相关的业务标准与技术落地要求
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

### 3. Prisma ORM使用规范

#### 3.1 Schema定义规范

```prisma
// prisma/schema.prisma

// 数据源配置
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// 生成配置
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["fullTextSearch", "fullTextIndex"]
}

// ========== 基础模型定义 ==========
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  nickname      String?
  passwordHash  String    @map("password_hash")
  avatar        String?
  memberLevel   MemberLevel @default(REGULAR)
  privacyLevel  PrivacyLevel @default(STANDARD)
  status        UserStatus @default(ACTIVE)
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")

  // 关联关系
  orders        Order[]
  addresses     UserAddress[]
  sessions      Session[]

  @@map("users")
  @@index([email])
  @@index([status])
}

// ========== 枚举定义 ==========
enum MemberLevel {
  REGULAR
  SILVER
  GOLD
  PLATINUM
}

enum PrivacyLevel {
  STANDARD
  STEALTH
  DISGUISE
}

enum UserStatus {
  ACTIVE
  INACTIVE
  BANNED
  PENDING
}

// ========== 关联关系示例 ==========
model Order {
  id              String      @id @default(uuid())
  orderNo         String      @unique @map("order_no")
  userId          String      @map("user_id")
  user            User        @relation(fields: [userId], references: [id])
  totalAmount     Decimal     @map("total_amount") @db.Decimal(10, 2)
  status          OrderStatus @default(PENDING)
  securityLevel   OrderSecurityLevel @default(NORMAL)
  createdAt       DateTime    @default(now()) @map("created_at")
  updatedAt       DateTime    @updatedAt @map("updated_at")

  items           OrderItem[]

  @@map("orders")
  @@index([userId])
  @@index([status])
}

model OrderItem {
  id          String   @id @default(uuid())
  orderId     String   @map("order_id")
  order       Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId   String   @map("product_id")
  quantity    Int
  unitPrice   Decimal  @map("unit_price") @db.Decimal(10, 2)

  @@map("order_items")
  @@index([orderId])
}

// ========== 多对多关系 ==========
model Product {
  id          String        @id @default(uuid())
  name        String
  categories  ProductCategory[]

  @@map("products")
}

model Category {
  id        String    @id @default(uuid())
  name      String    @unique
  products  Product[]
  createdAt DateTime  @default(now()) @map("created_at")

  @@map("categories")
}

model ProductCategory {
  productId  String
  categoryId String
  product    Product   @relation(fields: [productId], references: [id], onDelete: Cascade)
  category   Category  @relation(fields: [categoryId], references: [id], onDelete: Cascade)

  @@id([productId, categoryId])
  @@map("product_categories")
}

// ========== 索引定义 ==========
model Session {
  id           String   @id @default(uuid())
  userId       String   @map("user_id")
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  token        String   @unique
  refreshToken String?  @unique @map("refresh_token")
  expiresAt    DateTime @map("expires_at")
  createdAt    DateTime @default(now()) @map("created_at")

  @@map("sessions")
  @@index([userId])
  @@index([token])
  @@index([expiresAt])
}
```

#### 3.2 CRUD操作规范

```typescript
// src/modules/user/user.repository.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 创建用户
   */
  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  /**
   * 查找用户（唯一条件）
   */
  async findOne(
    where: Prisma.UserWhereUniqueInput,
    select?: Prisma.UserSelect,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where,
      select,
    });
  }

  /**
   * 查找多个用户
   */
  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    select?: Prisma.UserSelect;
  }): Promise<User[]> {
    const { skip, take, where, orderBy, select } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      where,
      orderBy,
      select,
    });
  }

  /**
   * 分页查询用户
   */
  async findWithPagination(params: {
    page?: number;
    pageSize?: number;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<{ users: User[]; total: number }> {
    const { page = 1, pageSize = 20, where, orderBy } = params;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where,
        orderBy,
      }),
      this.prisma.user.count({ where }),
    ]);

    return { users, total };
  }

  /**
   * 更新用户
   */
  async update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    // 检查用户是否存在
    const user = await this.findOne(where);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where,
      data,
    });
  }

  /**
   * 批量更新
   */
  async updateMany(
    where: Prisma.UserWhereInput,
    data: Prisma.UserUpdateInput,
  ): Promise<{ count: number }> {
    return this.prisma.user.updateMany({
      where,
      data,
    });
  }

  /**
   * 删除用户
   */
  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  /**
   * 批量删除
   */
  async deleteMany(where: Prisma.UserWhereInput): Promise<{ count: number }> {
    return this.prisma.user.deleteMany({
      where,
    });
  }

  /**
   * 统计用户数量
   */
  async count(where?: Prisma.UserWhereInput): Promise<number> {
    return this.prisma.user.count({ where });
  }

  /**
   * 聚合查询
   */
  async aggregate() {
    return this.prisma.user.aggregate({
      _count: { id: true },
      _avg: { id: true },
    });
  }
}
```

#### 3.3 关联查询规范

```typescript
// ========== 包含关联数据 ==========
async findUserWithOrders(userId: string) {
  return this.prisma.user.findUnique({
    where: { id: userId },
    include: {
      orders: {
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
      addresses: true,
    },
  });
}

// ========== 选择特定字段 ==========
async findUserBasicInfo(userId: string) {
  return this.prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      nickname: true,
      avatar: true,
      memberLevel: true,
      createdAt: true,
    },
  });
}

// ========== 关联创建 ==========
async createOrderWithItems(data: {
  userId: string;
  items: Array<{ productId: string; quantity: number; unitPrice: number }>;
}) {
  return this.prisma.order.create({
    data: {
      userId: data.userId,
      orderNo: generateOrderNo(),
      totalAmount: data.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
      items: {
        create: data.items,
      },
    },
    include: {
      items: true,
    },
  });
}

// ========== 关联更新 ==========
async updateOrderItems(orderId: string, items: Array<{ id: string; quantity: number }>) {
  return this.prisma.order.update({
    where: { id: orderId },
    data: {
      items: {
        updateMany: items.map(({ id, quantity }) => ({
          where: { id },
          data: { quantity },
        })),
      },
    },
  });
}

// ========== 事务操作 ==========
async transferOrder(
  fromOrderId: string,
  toUserId: string,
) {
  return this.prisma.$transaction(async (tx) => {
    // 获取原订单
    const fromOrder = await tx.order.findUnique({
      where: { id: fromOrderId },
      include: { items: true },
    });

    if (!fromOrder) {
      throw new NotFoundException('Order not found');
    }

    // 创建新订单
    const toOrder = await tx.order.create({
      data: {
        userId: toUserId,
        orderNo: generateOrderNo(),
        totalAmount: fromOrder.totalAmount,
        items: {
          create: fromOrder.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
        },
      },
    });

    // 更新原订单状态
    await tx.order.update({
      where: { id: fromOrderId },
      data: { status: 'TRANSFERRED' },
    });

    return toOrder;
  });
}
```

#### 3.4 查询优化

```typescript
// ========== 使用select减少数据传输 ==========
async getUsersBasicInfo() {
  return this.prisma.user.findMany({
    select: {
      id: true,
      nickname: true,
      avatar: true,
    },
  });
}

// ========== 分页加载 ==========
async getOrdersWithPagination(page: number, pageSize: number) {
  const [orders, total] = await Promise.all([
    this.prisma.order.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    }),
    this.prisma.order.count(),
  ]);

  return {
    orders,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  };
}

// ========== 游标分页（适合大数据量） ==========
async getOrdersWithCursor(cursor?: string, take = 20) {
  return this.prisma.order.findMany({
    take,
    ...(cursor && {
      skip: 1, // 跳过游标本身
      cursor: { id: cursor },
    }),
    orderBy: { createdAt: 'desc' },
  });
}

// ========== 批量操作 ==========
async updateMultipleUsers(userIds: string[], data: Prisma.UserUpdateInput) {
  return this.prisma.user.updateMany({
    where: {
      id: { in: userIds },
    },
    data,
  });
}

// ========== 使用事务批量操作 ==========
async batchCreateUsers(users: Array<{ email: string; nickname: string }>) {
  return this.prisma.$transaction(
    users.map((user) =>
      this.prisma.user.create({
        data: user,
      })
    )
  );
}

// ========== 索引提示（确保查询使用索引） ==========
async findUserByEmail(email: string) {
  return this.prisma.user.findUnique({
    where: { email }, // email字段有唯一索引
  });
}

async findActiveUsers() {
  return this.prisma.user.findMany({
    where: { status: 'ACTIVE' }, // status字段有索引
  });
}
```

#### 3.5 迁移管理

```bash
# 创建迁移
npx prisma migrate dev --name init

# 应用迁移（开发环境）
npx prisma migrate dev

# 应用迁移（生产环境）
npx prisma migrate deploy

# 重置数据库（开发环境）
npx prisma migrate reset

# 查看迁移状态
npx prisma migrate status

# 生成客户端
npx prisma generate

# 格式化Schema
npx prisma format

# 验证Schema
npx prisma validate
```

```typescript
// ========== 迁移文件示例 ==========
// prisma/migrations/20240101000000_init/migration.sql

-- CreateUserTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nickname" TEXT,
    "password_hash" TEXT NOT NULL,
    "avatar" TEXT,
    "member_level" TEXT NOT NULL DEFAULT 'REGULAR',
    "privacy_level" TEXT NOT NULL DEFAULT 'STANDARD',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE INDEX "users_status_idx" ON "users"("status");

-- CreateTable: orders
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "order_no" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "total_amount" DECIMAL(10,2) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "security_level" TEXT NOT NULL DEFAULT 'NORMAL',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
```

#### 3.6 种子数据

```typescript
// prisma/seeds/user.seed.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // 创建测试用户
  const hashedPassword = await bcrypt.hash('Password123!', 10);

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'admin@hailan.pro' },
      update: {},
      create: {
        email: 'admin@hailan.pro',
        nickname: 'Admin',
        passwordHash: hashedPassword,
        memberLevel: 'PLATINUM',
        status: 'ACTIVE',
      },
    }),
    prisma.user.upsert({
      where: { email: 'user@example.com' },
      update: {},
      create: {
        email: 'user@example.com',
        nickname: 'Test User',
        passwordHash: hashedPassword,
        memberLevel: 'REGULAR',
        status: 'ACTIVE',
      },
    }),
  ]);

  console.log({ users });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

```json
// package.json
{
  "prisma": {
    "seed": "ts-node prisma/seeds/user.seed.ts"
  }
}
```

```bash
# 运行种子数据
npx prisma db seed
```

#### 3.7 Prisma中间件

```typescript
// src/common/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
      errorFormat: 'pretty',
    });

    // 添加中间件
    this.$use(async (params, next) => {
      // 查询前日志
      console.log('Query:', params);

      // 执行查询
      const result = await next(params);

      // 查询后日志
      console.log('Result:', result);

      return result;
    });

    // 自动更新时间戳中间件
    this.$use(async (params, next) => {
      const before = Date.now();

      const result = await next(params);

      const after = Date.now();
      console.log(`Query took ${after - before}ms`);

      return result;
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
