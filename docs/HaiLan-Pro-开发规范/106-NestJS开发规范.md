---
@file: 106-NestJS开发规范.md
@description: HaiLan Pro NestJS框架开发规范，包含模块、控制器、服务、中间件等
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2026-01-26
@updated: 2026-01-26
@status: published
@tags: [HaiLan-Pro-开发规范],[]
---

> ***YanYuCloudCube***
> **标语**：言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> **标语**：万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 106 NestJS开发规范

## 概述

本文档详细描述HaiLan Pro-HaiLan-Pro-开发规范-NestJS开发规范相关内容，确保项目按照YYC³标准规范进行开发和实施。

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
- 规范NestJS开发规范相关的业务标准与技术落地要求
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

### 3. NestJS开发规范

#### 3.1 模块结构规范

```typescript
// ========== 模块结构 ==========
// user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { UserProfileModule } from '../user-profile/user-profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserProfileModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
  ],
  exports: [UsersService, UserRepository],
})
export class UserModule {}

// ========== 全局模块 ==========
// config/config.module.ts
import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';

@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}

// ========== 动态模块 ==========
// database/database.module.ts
import { Module, DynamicModule } from '@nestjs/common';
import { DatabaseService } from './database.service';

interface DatabaseModuleOptions {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

@Module({})
export class DatabaseModule {
  static register(options: DatabaseModuleOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'DATABASE_OPTIONS',
          useValue: options,
        },
        DatabaseService,
      ],
      exports: [DatabaseService],
    };
  }
}

// 使用动态模块
@Module({
  imports: [
    DatabaseModule.register({
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'pass',
      database: 'hailan',
    }),
  ],
})
export class AppModule {}
```

#### 3.2 控制器规范

```typescript
// users.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  Query,
  Headers,
  Ip,
  Session,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ParseIntPipe,
  DefaultValuePipe,
  HttpCode,
  HttpStatus,
  Version,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor';
import { ValidationPipe } from '@/common/pipes/validation.pipe';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUsersDto } from './dto/query-users.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(TransformInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * 创建用户
   * POST /api/v1/users
   */
  @Post()
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  /**
   * 获取用户列表
   * GET /api/v1/users
   */
  @Get()
  @Roles('admin')
  async findAll(
    @Query() query: QueryUsersDto,
    @Headers('x-request-id') requestId: string,
    @Ip() ip: string,
  ) {
    return await this.usersService.findAll(query);
  }

  /**
   * 获取用户详情
   * GET /api/v1/users/:id
   */
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Session() session: Record<string, any>,
  ) {
    return await this.usersService.findOne(id);
  }

  /**
   * 更新用户
   * PATCH /api/v1/users/:id (部分更新)
   */
  @Patch(':id')
  @Roles('admin')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }

  /**
   * 删除用户
   * DELETE /api/v1/users/:id
   */
  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.remove(id);
  }

  /**
   * 批量操作
   * POST /api/v1/users/batch
   */
  @Post('batch')
  @Roles('admin')
  async batchOperation(@Body() operations: any[]) {
    return await this.usersService.batchOperation(operations);
  }
}

// ========== 版本控制 ==========
@Controller({
  path: 'users',
  version: '1',
})
export class UsersControllerV1 {
  @Get()
  findAll() {
    return 'API v1';
  }
}

@Controller({
  path: 'users',
  version: '2',
})
export class UsersControllerV2 {
  @Get()
  findAll() {
    return 'API v2';
  }
}
```

#### 3.3 服务层规范

```typescript
// users.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUsersDto } from './dto/query-users.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * 创建用户
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      this.logger.log(`Creating user with email: ${createUserDto.email}`);

      // 检查邮箱是否已存在
      const existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      // 创建用户实体
      const user = this.userRepository.create(createUserDto);

      // 保存到数据库
      const savedUser = await this.userRepository.save(user);

      this.logger.log(`User created successfully: ${savedUser.id}`);
      return savedUser;
    } catch (error) {
      this.logger.error('Failed to create user', error.stack);
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  /**
   * 查询用户列表
   */
  async findAll(query: QueryUsersDto): Promise<{ users: User[]; total: number }> {
    try {
      const { page = 1, pageSize = 20, keyword, status } = query;

      const queryBuilder = this.userRepository.createQueryBuilder('user');

      // 关键词搜索
      if (keyword) {
        queryBuilder.andWhere(
          '(user.nickname LIKE :keyword OR user.email LIKE :keyword)',
          { keyword: `%${keyword}%` },
        );
      }

      // 状态筛选
      if (status) {
        queryBuilder.andWhere('user.status = :status', { status });
      }

      // 分页
      queryBuilder
        .skip((page - 1) * pageSize)
        .take(pageSize)
        .orderBy('user.createdAt', 'DESC');

      const [users, total] = await queryBuilder.getManyAndCount();

      return { users, total };
    } catch (error) {
      this.logger.error('Failed to fetch users', error.stack);
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  /**
   * 查询单个用户
   */
  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      this.logger.error(`Failed to fetch user: ${id}`, error.stack);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch user');
    }
  }

  /**
   * 更新用户
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findOne(id);

      Object.assign(user, updateUserDto);

      const updatedUser = await this.userRepository.save(user);

      this.logger.log(`User updated: ${id}`);
      return updatedUser;
    } catch (error) {
      this.logger.error(`Failed to update user: ${id}`, error.stack);
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  /**
   * 删除用户
   */
  async remove(id: string): Promise<void> {
    try {
      const user = await this.findOne(id);
      await this.userRepository.remove(user);
      this.logger.log(`User deleted: ${id}`);
    } catch (error) {
      this.logger.error(`Failed to delete user: ${id}`, error.stack);
      throw new InternalServerErrorException('Failed to delete user');
    }
  }

  /**
   * 事务操作示例
   */
  async transferWithTransaction(
    fromUserId: string,
    toUserId: string,
    amount: number,
  ): Promise<void> {
    await this.userRepository.transaction(async (manager) => {
      // 在事务中执行多个操作
      const fromUser = await manager.findOne(User, { where: { id: fromUserId } });
      const toUser = await manager.findOne(User, { where: { id: toUserId } });

      // 转账操作
      fromUser.balance -= amount;
      toUser.balance += amount;

      await manager.save([fromUser, toUser]);
    });
  }
}
```

#### 3.4 装饰器规范

```typescript
// ========== 自定义参数装饰器 ==========
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// 获取当前用户
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

// 获取用户IP
export const ClientIp = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.ip || request.headers['x-forwarded-for'];
  },
);

// 获取请求头
export const RequestHeader = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return key ? request.headers[key.toLowerCase()] : request.headers;
  },
);

// ========== 自定义方法装饰器 ==========
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
export const Permissions = (...permissions: string[]) =>
  SetMetadata('permissions', permissions);
export const Public = () => SetMetadata('isPublic', true);

// ========== 自定义类装饰器 ==========
function Log(prefix: string) {
  return function (target: any) {
    const originalMethods = Object.getOwnPropertyNames(target.prototype);

    originalMethods.forEach((methodName) => {
      if (methodName === 'constructor') return;

      const originalMethod = target.prototype[methodName];

      target.prototype[methodName] = function (...args: any[]) {
        console.log(`[${prefix}] ${methodName} called with:`, args);
        const result = originalMethod.apply(this, args);
        console.log(`[${prefix}] ${methodName} returned:`, result);
        return result;
      };
    });
  };
}

@Log('UserService')
export class UsersService {
  // 所有方法调用都会被记录
}
```

#### 3.5 守卫规范

```typescript
// ========== JWT认证守卫 ==========
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      request.user = payload;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

// ========== 角色守卫 ==========
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    const hasRole = requiredRoles.some((role) => user.roles?.includes(role));

    if (!hasRole) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}

// ========== 权限守卫 ==========
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      'permissions',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    const hasPermission = requiredPermissions.some((permission) =>
      user.permissions?.includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}

// ========== 公开路由守卫 ==========
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// 在JWT守卫中使用
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    // JWT验证逻辑
    // ...
  }
}
```

#### 3.6 拦截器规范

```typescript
// ========== 响应转换拦截器 ==========
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  code: number;
  message: string;
  data: T;
  timestamp: string;
  requestId: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();
    const requestId = request.headers['x-request-id'] || this.generateRequestId();

    return next.handle().pipe(
      map((data) => ({
        code: HttpStatus.OK,
        message: 'Success',
        data,
        timestamp: new Date().toISOString(),
        requestId,
      })),
    );
  }

  private generateRequestId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

// ========== 日志拦截器 ==========
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, ip } = request;
    const now = Date.now();

    this.logger.log(`[${method}] ${url} - ${ip}`);

    return next.handle().pipe(
      tap({
        next: () => {
          const response = context.switchToHttp().getResponse();
          const delay = Date.now() - now;
          this.logger.log(
            `[${method}] ${url} - ${response.statusCode} - ${delay}ms`,
          );
        },
        error: (error) => {
          const delay = Date.now() - now;
          this.logger.error(
            `[${method}] ${url} - Error - ${delay}ms`,
            error.stack,
          );
        },
      }),
    );
  }
}

// ========== 缓存拦截器 ==========
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private cache = new Map<string, any>();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const cacheKey = `${request.method}:${request.url}`;

    const cachedResponse = this.cache.get(cacheKey);
    if (cachedResponse) {
      return of(cachedResponse);
    }

    return next.handle().pipe(
      tap((response) => {
        this.cache.set(cacheKey, response);
      }),
    );
  }
}
```

#### 3.7 管道规范

```typescript
// ========== 验证管道 ==========
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const messages = errors.map((error) => {
        return Object.values(error.constraints || {}).join(', ');
      });
      throw new BadRequestException(messages.join('; '));
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

// ========== URL参数解析管道 ==========
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}

// ========== 自定义业务管道 ==========
@Injectable()
export class UserByIdPipe implements PipeTransform<string> {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async transform(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}

// 使用自定义管道
@Get(':id')
async findOne(@Param('id', UserByIdPipe) user: User) {
  return user;
}
```

#### 3.8 异常过滤器规范

```typescript
// ========== HTTP异常过滤器 ==========
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorResponse = {
      code: status,
      message: this.extractMessage(exceptionResponse),
      timestamp: new Date().toISOString(),
      path: request.url,
      requestId: request.headers['x-request-id'],
    };

    // 记录错误日志
    console.error('HTTP Exception:', {
      ...errorResponse,
      stack: exception.stack,
    });

    response.status(status).json(errorResponse);
  }

  private extractMessage(exceptionResponse: any): string {
    if (typeof exceptionResponse === 'string') {
      return exceptionResponse;
    }
    if (exceptionResponse?.message) {
      if (Array.isArray(exceptionResponse.message)) {
        return exceptionResponse.message.join(', ');
      }
      return exceptionResponse.message;
    }
    return 'Internal server error';
  }
}

// ========== 全局异常过滤器 ==========
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    }

    const errorResponse = {
      code: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(status).json(errorResponse);
  }
}

// 应用全局过滤器
// main.ts
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

app.useGlobalFilters(new HttpExceptionFilter());
```

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***»
