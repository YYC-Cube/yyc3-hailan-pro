/**
 * IndexedDB存储相关类型定义
 * 严格遵循TypeScript最佳实践，避免使用any类型
 * @隐私保护 - 所有数据类型明确定义，便于隐私审计
 */

// ==================== 基础数据类型 ====================

/**
 * 产品数据
 */
export interface ProductData {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category?: string;
  tags?: string[];
  metadata?: Record<string, string | number | boolean>;
}

/**
 * 订单数据
 */
export interface OrderData {
  orderId: string;
  productId: string;
  quantity: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: number;
  totalAmount: number;
  metadata?: Record<string, string | number | boolean>;
}

/**
 * 评论数据
 */
export interface ReviewData {
  reviewId?: string;
  productId: string;
  rating: number;
  content: string;
  images?: string[];
  createdAt: number;
  metadata?: Record<string, string | number | boolean>;
}

/**
 * 购物车项目数据
 */
export interface CartItemData {
  productId: string;
  productData: ProductData;
  quantity: number;
  selectedVariant?: {
    size?: string;
    color?: string;
    [key: string]: string | undefined;
  };
  addedAt: number;
}

/**
 * 收藏数据
 */
export interface FavoriteData {
  productId: string;
  productData: ProductData;
  addedAt: number;
  note?: string;
}

// ==================== 离线数据类型 ====================

/**
 * 离线数据基础类型
 */
export type OfflineDataType = 'draft' | 'order' | 'cart' | 'review' | 'favorite';

/**
 * 离线数据联合类型
 */
export type OfflineDataContent = 
  | DraftData
  | OrderData
  | CartItemData
  | ReviewData
  | FavoriteData;

/**
 * 草稿数据
 */
export interface DraftData {
  draftId?: string;
  type: 'review' | 'post' | 'comment' | 'message';
  content: string | Record<string, unknown>;
  relatedId?: string;
  createdAt: number;
  updatedAt: number;
}

/**
 * 离线数据（已修复any类型）
 */
export interface OfflineData {
  id?: number;
  type: OfflineDataType;
  data: OfflineDataContent;
  timestamp: number;
  synced: boolean;
  encrypted?: boolean;
}

// ==================== 同步队列类型 ====================

/**
 * HTTP请求方法
 */
export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * 同步请求体类型
 */
export type SyncRequestBody = 
  | OrderData
  | ReviewData
  | CartItemData
  | FavoriteData
  | Record<string, unknown>;

/**
 * 同步队列项（已修复any类型）
 */
export interface SyncQueueItem {
  id?: number;
  endpoint: string;
  method: HTTPMethod;
  body: SyncRequestBody;
  headers?: Record<string, string>;
  timestamp: number;
  retryCount: number;
  maxRetries: number;
  priority?: 'low' | 'medium' | 'high';
}

// ==================== 草稿类型 ====================

/**
 * 草稿类型
 */
export type DraftType = 'review' | 'post' | 'comment' | 'message' | 'order';

/**
 * 草稿项
 */
export interface DraftItem<T = unknown> {
  id?: number;
  type: DraftType;
  content: T;
  timestamp: number;
  metadata?: {
    productId?: string;
    postId?: string;
    relatedId?: string;
    [key: string]: string | number | boolean | undefined;
  };
}

// ==================== 通用类型 ====================

/**
 * 数据库使用情况统计
 */
export interface DatabaseUsage {
  offlineData: number;
  syncQueue: number;
  drafts: number;
  favorites: number;
  cart: number;
  totalItems: number;
  estimatedSize?: number; // 字节
}

/**
 * 存储操作结果
 */
export interface StorageOperationResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: Error;
  timestamp: number;
}

/**
 * 批量操作结果
 */
export interface BatchOperationResult {
  successful: number;
  failed: number;
  errors: Array<{
    item: unknown;
    error: Error;
  }>;
}

// ==================== 类型守卫 ====================

/**
 * 检查是否为有效的离线数据
 */
export function isValidOfflineData(data: unknown): data is OfflineData {
  if (typeof data !== 'object' || data === null) return false;
  
  const d = data as Partial<OfflineData>;
  return (
    typeof d.type === 'string' &&
    d.data !== undefined &&
    typeof d.timestamp === 'number' &&
    typeof d.synced === 'boolean'
  );
}

/**
 * 检查是否为有效的同步队列项
 */
export function isValidSyncQueueItem(item: unknown): item is SyncQueueItem {
  if (typeof item !== 'object' || item === null) return false;
  
  const i = item as Partial<SyncQueueItem>;
  return (
    typeof i.endpoint === 'string' &&
    typeof i.method === 'string' &&
    i.body !== undefined &&
    typeof i.timestamp === 'number' &&
    typeof i.retryCount === 'number' &&
    typeof i.maxRetries === 'number'
  );
}

/**
 * 检查是否为产品数据
 */
export function isProductData(data: unknown): data is ProductData {
  if (typeof data !== 'object' || data === null) return false;
  
  const d = data as Partial<ProductData>;
  return (
    typeof d.id === 'string' &&
    typeof d.name === 'string' &&
    typeof d.price === 'number'
  );
}
