/**
 * 收藏服务层
 * 提供商品收藏、取消收藏和收藏列表管理功能
 */

// ==================== 类型定义 ====================

/**
 * 收藏项
 */
export interface FavoriteItem {
  id: string;
  productId: string;
  productName: string;
  productImage?: string;
  productPrice: number;
  productOriginalPrice?: number;
  inStock: boolean;
  createdAt: Date;
}

/**
 * 收藏统计
 */
export interface FavoriteStats {
  total: number;
  inStock: number;
  onSale: number;
}

// ==================== 收藏服务 ====================

/**
 * 收藏服务类
 * 处理所有收藏相关的业务逻辑
 */
export class FavoriteService {
  private static readonly STORAGE_KEY = 'hailan_favorites';
  
  /**
   * 添加收藏
   * @param productId 商品ID
   * @param productData 商品数据
   */
  static async addFavorite(
    productId: string,
    productData: Omit<FavoriteItem, 'id' | 'createdAt'>
  ): Promise<FavoriteItem> {
    try {
      const favorites = this.getFavorites();
      
      // 检查是否已收藏
      if (favorites.some(f => f.productId === productId)) {
        throw new Error('商品已在收藏夹中');
      }
      
      const newFavorite: FavoriteItem = {
        id: `FAV${Date.now()}`,
        ...productData,
        productId,
        createdAt: new Date(),
      };
      
      favorites.unshift(newFavorite);
      this.saveFavorites(favorites);
      
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 200));
      
      return newFavorite;
    } catch (error) {
      console.error('添加收藏失败:', error);
      throw error;
    }
  }
  
  /**
   * 取消收藏
   * @param productId 商品ID
   */
  static async removeFavorite(productId: string): Promise<void> {
    try {
      const favorites = this.getFavorites();
      const filtered = favorites.filter(f => f.productId !== productId);
      this.saveFavorites(filtered);
      
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.error('取消收藏失败:', error);
      throw error;
    }
  }
  
  /**
   * 检查是否已收藏
   * @param productId 商品ID
   * @returns 是否已收藏
   */
  static isFavorite(productId: string): boolean {
    const favorites = this.getFavorites();
    return favorites.some(f => f.productId === productId);
  }
  
  /**
   * 获取收藏列表
   * @param page 页码
   * @param pageSize 每页数量
   * @returns 收藏列表
   */
  static async getFavoriteList(
    page: number = 1,
    pageSize: number = 20
  ): Promise<{ items: FavoriteItem[]; total: number }> {
    try {
      const favorites = this.getFavorites();
      
      // 分页
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const items = favorites.slice(start, end);
      
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        items,
        total: favorites.length,
      };
    } catch (error) {
      console.error('获取收藏列表失败:', error);
      throw error;
    }
  }
  
  /**
   * 获取收藏统计
   * @returns 收藏统计
   */
  static getFavoriteStats(): FavoriteStats {
    const favorites = this.getFavorites();
    
    return {
      total: favorites.length,
      inStock: favorites.filter(f => f.inStock).length,
      onSale: favorites.filter(f => f.productOriginalPrice && f.productOriginalPrice > f.productPrice).length,
    };
  }
  
  /**
   * 批量取消收藏
   * @param productIds 商品ID数组
   */
  static async removeFavorites(productIds: string[]): Promise<void> {
    try {
      const favorites = this.getFavorites();
      const filtered = favorites.filter(f => !productIds.includes(f.productId));
      this.saveFavorites(filtered);
      
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error('批量取消收藏失败:', error);
      throw error;
    }
  }
  
  /**
   * 清空收藏
   */
  static async clearFavorites(): Promise<void> {
    try {
      this.saveFavorites([]);
      
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.error('清空收藏失败:', error);
      throw error;
    }
  }
  
  // ==================== 私有方法 ====================
  
  /**
   * 从localStorage获取收藏列表
   */
  private static getFavorites(): FavoriteItem[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) return [];
      
      const favorites = JSON.parse(data);
      // 转换日期字符串为Date对象
      return favorites.map((f: any) => ({
        ...f,
        createdAt: new Date(f.createdAt),
      }));
    } catch (error) {
      console.error('读取收藏列表失败:', error);
      return [];
    }
  }
  
  /**
   * 保存收藏列表到localStorage
   */
  private static saveFavorites(favorites: FavoriteItem[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('保存收藏列表失败:', error);
      throw error;
    }
  }
}

// ==================== 导出 ====================

export default FavoriteService;
