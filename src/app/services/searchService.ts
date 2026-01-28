/**
 * 搜索服务层
 * 提供搜索、搜索建议、搜索历史等功能
 */

// ==================== 类型定义 ====================

/**
 * 搜索建议
 */
export interface SearchSuggestion {
  id: string;
  keyword: string;
  type: 'product' | 'category' | 'brand';
  count?: number;
}

/**
 * 搜索历史
 */
export interface SearchHistory {
  id: string;
  keyword: string;
  timestamp: Date;
}

/**
 * 热门搜索
 */
export interface HotSearch {
  id: string;
  keyword: string;
  rank: number;
  trend: 'up' | 'down' | 'new' | 'stable';
}

/**
 * 搜索结果
 */
export interface SearchResult {
  products: Array<{
    id: string;
    name: string;
    price: number;
    image?: string;
  }>;
  total: number;
  suggestions?: string[];
}

// ==================== 搜索服务 ====================

/**
 * 搜索服务类
 * 处理所有搜索相关的业务逻辑
 */
export class SearchService {
  private static readonly HISTORY_KEY = 'hailan_search_history';
  private static readonly MAX_HISTORY = 10;
  
  /**
   * 搜索商品
   * @param keyword 关键词
   * @param page 页码
   * @param pageSize 每页数量
   * @returns 搜索结果
   */
  static async search(
    keyword: string,
    page: number = 1,
    pageSize: number = 20
  ): Promise<SearchResult> {
    try {
      // 记录搜索历史
      this.addHistory(keyword);
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // 返回模拟数据
      return {
        products: [],
        total: 0,
        suggestions: this.getSuggestions(keyword).map(s => s.keyword),
      };
    } catch (error) {
      console.error('搜索失败:', error);
      throw error;
    }
  }
  
  /**
   * 获取搜索建议
   * @param keyword 关键词
   * @returns 搜索建议列表
   */
  static getSuggestions(keyword: string): SearchSuggestion[] {
    if (!keyword || keyword.length < 2) return [];
    
    // 模拟搜索建议
    const suggestions: SearchSuggestion[] = [
      { id: '1', keyword: `${keyword} 推荐`, type: 'product', count: 128 },
      { id: '2', keyword: `${keyword} 新品`, type: 'product', count: 56 },
      { id: '3', keyword: `${keyword} 品牌`, type: 'brand', count: 32 },
    ];
    
    return suggestions.slice(0, 5);
  }
  
  /**
   * 获取热门搜索
   * @returns 热门搜索列表
   */
  static getHotSearches(): HotSearch[] {
    return [
      { id: '1', keyword: '情趣用品', rank: 1, trend: 'up' },
      { id: '2', keyword: '成人玩具', rank: 2, trend: 'stable' },
      { id: '3', keyword: '私密健康', rank: 3, trend: 'new' },
      { id: '4', keyword: '情趣内衣', rank: 4, trend: 'up' },
      { id: '5', keyword: '安全套', rank: 5, trend: 'stable' },
    ];
  }
  
  /**
   * 添加搜索历史
   * @param keyword 关键词
   */
  static addHistory(keyword: string): void {
    if (!keyword || keyword.trim().length === 0) return;
    
    try {
      const history = this.getHistory();
      
      // 移除重复项
      const filtered = history.filter(h => h.keyword !== keyword);
      
      // 添加新记录
      const newHistory: SearchHistory = {
        id: `HIST${Date.now()}`,
        keyword,
        timestamp: new Date(),
      };
      
      filtered.unshift(newHistory);
      
      // 限制数量
      const limited = filtered.slice(0, this.MAX_HISTORY);
      
      localStorage.setItem(this.HISTORY_KEY, JSON.stringify(limited));
    } catch (error) {
      console.error('保存搜索历史失败:', error);
    }
  }
  
  /**
   * 获取搜索历史
   * @returns 搜索历史列表
   */
  static getHistory(): SearchHistory[] {
    try {
      const data = localStorage.getItem(this.HISTORY_KEY);
      if (!data) return [];
      
      const history = JSON.parse(data);
      return history.map((h: any) => ({
        ...h,
        timestamp: new Date(h.timestamp),
      }));
    } catch (error) {
      console.error('读取搜索历史失败:', error);
      return [];
    }
  }
  
  /**
   * 删除单条搜索历史
   * @param id 历史记录ID
   */
  static removeHistory(id: string): void {
    try {
      const history = this.getHistory();
      const filtered = history.filter(h => h.id !== id);
      localStorage.setItem(this.HISTORY_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('删除搜索历史失败:', error);
    }
  }
  
  /**
   * 清空搜索历史
   */
  static clearHistory(): void {
    try {
      localStorage.removeItem(this.HISTORY_KEY);
    } catch (error) {
      console.error('清空搜索历史失败:', error);
    }
  }
}

// ==================== 导出 ====================

export default SearchService;
