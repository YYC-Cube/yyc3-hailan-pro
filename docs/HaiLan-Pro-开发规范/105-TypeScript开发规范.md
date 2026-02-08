---
@file: 105-TypeScript开发规范.md
@description: HaiLan Pro TypeScript开发规范，包含类型定义、泛型、接口、装饰器等
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

# 105 TypeScript开发规范

## 概述

本文档详细描述HaiLan Pro-HaiLan-Pro-开发规范-TypeScript开发规范相关内容，确保项目按照YYC³标准规范进行开发和实施。

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
- 规范TypeScript开发规范相关的业务标准与技术落地要求
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

### 3. TypeScript开发规范

#### 3.1 基础类型定义

```typescript
// ========== 基本类型 ==========
const username: string = 'user123';
const age: number = 25;
const isActive: boolean = true;
const data: null = null;
const value: undefined = undefined;

// 数组
const numbers: number[] = [1, 2, 3];
const strings: Array<string> = ['a', 'b', 'c'];

// 元组
const user: [string, number] = ['Alice', 25];
const coordinates: [number, number, number] = [1, 2, 3];

// 对象
interface User {
  id: string;
  name: string;
  age?: number; // 可选属性
  readonly email: string; // 只读属性
}

// 联合类型
type Status = 'pending' | 'success' | 'error';
type ID = string | number;

// 交叉类型
type Person = { name: string } & { age: number };

// 字面量类型
type Direction = 'up' | 'down' | 'left' | 'right';
const move: Direction = 'up';

// any和unknown - 避免使用any
const anything: any = 'anything'; // 避免使用
const something: unknown = 'something'; // 推荐，需要类型检查
if (typeof something === 'string') {
  console.log(something.toUpperCase());
}

// never - 表示永不存在的类型
function throwError(message: string): never {
  throw new Error(message);
}
```

#### 3.2 接口与类型别名

```typescript
// ========== 接口 vs 类型别名 ==========

// 接口 - 可扩展，支持声明合并
interface UserInfo {
  id: string;
  name: string;
  email: string;
}

// 接口扩展
interface UserInfoWithAddress extends UserInfo {
  address: string;
  phone: string;
}

// 接口声明合并
interface UserInfo {
  age?: number; // 声明合并，添加可选属性
}

// 类型别名 - 更灵活，支持联合、交叉、条件类型
type Status = 'active' | 'inactive' | 'suspended';

type UserStatus = UserInfo & {
  status: Status;
};

// 条件类型
type NonNullable<T> = T extends null | undefined ? never : T;
type TypeName<T> = T extends string ? 'string' :
  T extends number ? 'number' :
  T extends boolean ? 'boolean' :
  'object';

// 映射类型
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

// 实际应用
type UpdateUserDto = Partial<UserInfo>;
type ReadonlyUser = Readonly<UserInfo>;
```

#### 3.3 泛型

```typescript
// ========== 泛型函数 ==========
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42);
const str = identity('hello');

// 泛型约束
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): void {
  console.log(arg.length);
}

// 泛型类
class Container<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  get(): T {
    return this.value;
  }

  set(value: T): void {
    this.value = value;
  }
}

const numberContainer = new Container<number>(42);
const stringContainer = new Container<string>('hello');

// 泛型接口
interface Repository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(entity: Omit<T, 'id'>): Promise<T>;
  update(id: string, entity: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

// 多个泛型参数
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

// 泛型默认值
interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// 实际应用
type UserResponse = ApiResponse<UserInfo>;
type EmptyResponse = ApiResponse<void>;
```

#### 3.4 高级类型

```typescript
// ========== 条件类型 ==========
type NonNullable<T> = T extends null | undefined ? never : T;

// 提取函数返回值
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// 提取函数参数
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

// 提取Promise的值类型
type Awaited<T> = T extends Promise<infer U> ? U : T;

// 实际应用
type User = Awaited<Promise<{ name: string }>>; // { name: string }

// ========== 映射类型 ==========
type Readonly<T> = { readonly [P in keyof T]: T[P] };
type Partial<T> = { [P in keyof T]?: T[P] };
type Required<T> = { [P in keyof T]-?: T[P] };

// 映射修饰符
type Modifiers<T> = {
  -readonly [P in keyof T]: T[P];
  [P in keyof T]+?: T[P];
};

// 映射类型 + 条件类型
type Getters<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

interface User {
  name: string;
  age: number;
}

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number }

// ========== 模板字面量类型 ==========
type EventName<T extends string> = `on${Capitalize<T>}`;

type UserEvents = EventName<'click' | 'focus'>;
// 'onClick' | 'onFocus'

// ========== Keyof类型查询 ==========
type UserKeys = keyof UserInfo; // 'id' | 'name' | 'email' | 'age'

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// ========== typeof类型推断 ==========
const user = {
  name: 'Alice',
  age: 25,
};

type UserType = typeof user; // { name: string; age: number; }

// 数组/元组
const colors = ['red', 'green', 'blue'] as const;
type Colors = typeof colors; // readonly ['red', 'green', 'blue']

// 函数返回类型
function createUser() {
  return { name: 'Bob', age: 30 };
}
type CreateUserReturn = typeof createUser; // () => { name: string; age: number }
```

#### 3.5 类型守卫与断言

```typescript
// ========== typeof类型守卫 ==========
function processValue(value: string | number) {
  if (typeof value === 'string') {
    console.log(value.toUpperCase()); // string
  } else {
    console.log(value.toFixed(2)); // number
  }
}

// ========== instanceof类型守卫 ==========
class Dog {
  bark() { console.log('Woof!'); }
}

class Cat {
  meow() { console.log('Meow!'); }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}

// ========== 自定义类型守卫 ==========
interface User {
  type: 'user';
  name: string;
}

interface Admin {
  type: 'admin';
  name: string;
  permissions: string[];
}

type Account = User | Admin;

function isAdmin(account: Account): account is Admin {
  return account.type === 'admin';
}

function handleAccount(account: Account) {
  if (isAdmin(account)) {
    console.log(account.permissions); // Admin特有属性
  } else {
    console.log(account.name); // User属性
  }
}

// ========== in操作符类型守卫 ==========
interface Bird {
  fly: () => void;
  layEggs: () => void;
}

interface Fish {
  swim: () => void;
  layEggs: () => void;
}

function move(animal: Bird | Fish) {
  if ('fly' in animal) {
    animal.fly();
  } else {
    animal.swim();
  }
}

// ========== 类型断言 ==========
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const value = someValue as string;

// 非空断言
function processValue(value: string | null) {
  const trimmed = value!.trim(); // 断言非null
}

// 双重断言
const value = someValue as unknown as string;
```

#### 3.6 装饰器（Experimental）

```typescript
// ========== 类装饰器 ==========
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class MyClass {
  // ...
}

// ========== 方法装饰器 ==========
function log(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with`, args);
    const result = originalMethod.apply(this, args);
    console.log(`${propertyKey} returned`, result);
    return result;
  };

  return descriptor;
}

class UserService {
  @log
  getUser(id: string) {
    return { id, name: 'User' };
  }
}

// ========== 参数装饰器 ==========
function required(target: any, propertyKey: string, parameterIndex: number) {
  const requiredParameters: number[] = Reflect.getOwnMetadata(
    'requiredParameters',
    target,
    propertyKey
  ) || [];
  requiredParameters.push(parameterIndex);
  Reflect.defineMetadata(
    'requiredParameters',
    requiredParameters,
    target,
    propertyKey
  );
}

class Validator {
  validate(@required value: string, @required config: any) {
    // ...
  }
}

// ========== 属性装饰器 ==========
function format(fmt: string) {
  return function (target: any, propertyKey: string) {
    let value: string;

    const getter = () => value;
    const setter = (newValue: string) => {
      value = fmt.replace(/\{0\}/g, newValue);
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
}

class Person {
  @format('Hello, {0}!')
  greeting: string;
}
```

#### 3.7 工具类型

```typescript
// ========== Partial<T> - 所有属性可选 ==========
type PartialUser = Partial<UserInfo>;

// ========== Required<T> - 所有属性必需 ==========
type RequiredUser = Required<{ name?: string; age?: number }>;

// ========== Readonly<T> - 只读 ==========
type ReadonlyUser = Readonly<UserInfo>;

// ========== Record<K, T> - 构建对象类型 ==========
type PageInfo = Record<string, { title: string; url: string }>;

const pages: PageInfo = {
  home: { title: 'Home', url: '/' },
  about: { title: 'About', url: '/about' }
};

// ========== Pick<T, K> - 选取部分属性 ==========
type UserBasicInfo = Pick<UserInfo, 'id' | 'name'>;

// ========== Omit<T, K> - 排除部分属性 ==========
type UserWithoutEmail = Omit<UserInfo, 'email'>;

// ========== Exclude<T, U> - 排除联合类型 ==========
type T = Exclude<'a' | 'b' | 'c', 'a'>; // 'b' | 'c'

// ========== Extract<T, U> - 提取联合类型 ==========
type T = Extract<'a' | 'b' | 'c', 'a' | 'b'>; // 'a' | 'b'

// ========== NonNullable<T> - 排除null/undefined ==========
type T = NonNullable<string | null | undefined>; // string

// ========== ReturnType<T> - 函数返回值 ==========
type R = ReturnType<() => string>; // string

// ========== Parameters<T> - 函数参数 ==========
type P = Parameters<(x: number, y: number) => void>; // [number, number]

// ========== Uppercase/Lowercase/Capitalize/Uncapitalize ==========
type T = 'hello';
type U = Uppercase<T>; // 'HELLO'
type L = Lowercase<U>; // 'hello'
type C = Capitalize<T>; // 'Hello'
type Un = Uncapitalize<C>; // 'hello'
```

#### 3.8 配置文件规范

```json
// tsconfig.json
{
  "compilerOptions": {
    // 基础选项
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowImportingTsExtensions": false,

    // 输出
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "removeComments": false,

    // 严格检查
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,

    // 额外检查
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,

    // 模块
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,

    // 路径映射
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/utils/*": ["src/utils/*"],
      "@/types/*": ["src/types/*"],
      "@/stores/*": ["src/stores/*"],
      "@/api/*": ["src/api/*"]
    },

    // 类型声明
    "types": ["vite/client", "node"]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "build"
  ]
}
```

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
