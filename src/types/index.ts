/**
 * 海蓝 (HaiLan) - 全局类型定义系统
 * 包含所有核心业务实体、场景分类及状态枚举
 */

// --- 隐私与安全枚举 ---

export enum PrivacyLevel {
  STANDARD = 'STANDARD', // 标准模式
  STEALTH = 'STEALTH',  // 隐身模式
  DISGUISE = 'DISGUISE' // 伪装模式
}

export enum OrderSecurityStatus {
  NORMAL = 'NORMAL',
  ENCRYPTED_ADDR = 'ENCRYPTED_ADDR', // 地址加密
  ANONYMOUS = 'ANONYMOUS' // 匿名购买
}

// --- 商品与分类 ---

export enum ProductCategory {
  CARE = 'CARE',           // 健康护理 / Care Products
  PLAY = 'PLAY',           // 愉悦探索 / Pleasure Toys
  INTIMACY = 'INTIMACY',   // 亲密增进 / Intimacy Enhancers
  LINGERIE = 'LINGERIE',   // 贴身服饰 / Lingerie
  SMART = 'SMART'          // 智能硬件 / Smart Tech
}

export enum ProductStatus {
  DRAFT = 'DRAFT',
  ON_SHELF = 'ON_SHELF',
  OFF_SHELF = 'OFF_SHELF',
  AUDITING = 'AUDITING' // 内容合规审核中
}

export interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviewCount: number;
  image: string;
  tag: string;
  category: ProductCategory;
  isPrivate: boolean;
  description?: string;
  features?: string[];
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  matchScore?: number; // AI 匹配度
}

// --- 用户系统 ---

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  privacyMode: boolean;
  biometricEnabled: boolean;
  autoDeleteHistory: boolean;
  autoDeleteDays: number;
  privacyLevel: PrivacyLevel;
}

export interface UserProfile {
  id: string;
  username: string;
  avatarUrl?: string;
  preferences: UserPreferences;
  createdAt: string;
  isMember: boolean;
  memberLevel: 'standard' | 'plus' | 'pro';
}

// --- 内容与社区 ---

export interface Article {
  id: string;
  title: string;
  summary: string;
  category: 'EXPERT' | 'COMMUNITY' | 'HEALTH' | 'GUIDE';
  categoryLabel: string;
  author: string;
  readCount: string;
  commentCount: string;
  imageUrl: string;
  publishDate: string;
  tags: string[];
}

// --- AI 与对话 ---

export type MessageType = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date | string;
  status?: 'sending' | 'sent' | 'error';
  suggestions?: string[];
}

// --- 通用响应 ---

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  timestamp: string;
}
