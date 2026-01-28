/**
 * 评价服务层
 * 提供商品评价、评分和评价管理功能
 */

// ==================== 类型定义 ====================

/**
 * 评分维度
 */
export interface ReviewDimension {
  name: string;
  score: number; // 1-5
}

/**
 * 评价图片
 */
export interface ReviewImage {
  id: string;
  url: string;
  thumbnail?: string;
}

/**
 * 评价信息
 */
export interface Review {
  id: string;
  productId: string;
  productName: string;
  productImage?: string;
  orderId: string;
  userId: string;
  userName: string;        // 脱敏后的用户名
  userAvatar?: string;
  rating: number;          // 总评分 1-5
  dimensions?: ReviewDimension[]; // 多维度评分
  content: string;
  images?: ReviewImage[];
  tags?: string[];         // 标签（如：质量好、物流快）
  helpful: number;         // 有用数
  isVerified: boolean;     // 是否实名认证
  isAnonymous: boolean;    // 是否匿名
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 评价统计
 */
export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  withImages: number;      // 有图评价数
  verifiedPurchase: number; // 实名认证评价数
}

/**
 * 评价请求
 */
export interface CreateReviewRequest {
  productId: string;
  orderId: string;
  rating: number;
  dimensions?: ReviewDimension[];
  content: string;
  images?: File[];
  tags?: string[];
  isAnonymous?: boolean;
}

/**
 * 评价过滤器
 */
export interface ReviewFilter {
  rating?: number;         // 按评分筛选
  withImages?: boolean;    // 只看有图
  verified?: boolean;      // 只看实名
  sortBy?: 'latest' | 'helpful' | 'rating_high' | 'rating_low';
}

// ==================== 评价服务 ====================

/**
 * 评价服务类
 * 处理所有评价相关的业务逻辑
 */
export class ReviewService {
  private static readonly API_BASE = '/api/reviews';
  
  /**
   * 创建评价
   * @param request 评价请求
   * @returns 创建的评价
   */
  static async createReview(request: CreateReviewRequest): Promise<Review> {
    try {
      // 验证评分范围
      if (request.rating < 1 || request.rating > 5) {
        throw new Error('评分必须在1-5之间');
      }
      
      // 验证评价内容
      if (!request.content || request.content.trim().length < 10) {
        throw new Error('评价内容不能少于10个字');
      }
      
      // 模拟图片上传
      const uploadedImages: ReviewImage[] = [];
      if (request.images && request.images.length > 0) {
        for (let i = 0; i < request.images.length; i++) {
          uploadedImages.push({
            id: `IMG${Date.now()}${i}`,
            url: URL.createObjectURL(request.images[i]),
            thumbnail: URL.createObjectURL(request.images[i]),
          });
        }
      }
      
      // 生成评价ID
      const reviewId = `REV${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
      
      // 创建评价对象
      const review: Review = {
        id: reviewId,
        productId: request.productId,
        productName: '示例商品', // 实际应该从产品信息中获取
        orderId: request.orderId,
        userId: 'USER123',
        userName: request.isAnonymous ? '匿名用户' : '王**',
        rating: request.rating,
        dimensions: request.dimensions,
        content: request.content,
        images: uploadedImages,
        tags: request.tags,
        helpful: 0,
        isVerified: true,
        isAnonymous: request.isAnonymous || false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('评价创建成功:', review);
      return review;
    } catch (error) {
      console.error('创建评价失败:', error);
      throw error;
    }
  }
  
  /**
   * 获取商品评价列表
   * @param productId 商品ID
   * @param filter 过滤条件
   * @param page 页码
   * @param pageSize 每页数量
   * @returns 评价列表
   */
  static async getProductReviews(
    productId: string,
    filter?: ReviewFilter,
    page: number = 1,
    pageSize: number = 10
  ): Promise<{ reviews: Review[]; total: number }> {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // 生成模拟数据
      const mockReviews = this.generateMockReviews(productId, 20);
      
      // 应用过滤器
      let filteredReviews = mockReviews;
      
      if (filter) {
        if (filter.rating) {
          filteredReviews = filteredReviews.filter(r => r.rating === filter.rating);
        }
        if (filter.withImages) {
          filteredReviews = filteredReviews.filter(r => r.images && r.images.length > 0);
        }
        if (filter.verified) {
          filteredReviews = filteredReviews.filter(r => r.isVerified);
        }
        
        // 排序
        if (filter.sortBy === 'helpful') {
          filteredReviews.sort((a, b) => b.helpful - a.helpful);
        } else if (filter.sortBy === 'rating_high') {
          filteredReviews.sort((a, b) => b.rating - a.rating);
        } else if (filter.sortBy === 'rating_low') {
          filteredReviews.sort((a, b) => a.rating - b.rating);
        }
      }
      
      // 分页
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedReviews = filteredReviews.slice(start, end);
      
      return {
        reviews: paginatedReviews,
        total: filteredReviews.length,
      };
    } catch (error) {
      console.error('获取评价列表失败:', error);
      throw error;
    }
  }
  
  /**
   * 获取评价统计
   * @param productId 商品ID
   * @returns 评价统计
   */
  static async getReviewStats(productId: string): Promise<ReviewStats> {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // 生成模拟统计数据
      const stats: ReviewStats = {
        totalReviews: 128,
        averageRating: 4.6,
        ratingDistribution: {
          5: 85,
          4: 28,
          3: 10,
          2: 3,
          1: 2,
        },
        withImages: 56,
        verifiedPurchase: 120,
      };
      
      return stats;
    } catch (error) {
      console.error('获取评价统计失败:', error);
      throw error;
    }
  }
  
  /**
   * 标记评价有用
   * @param reviewId 评价ID
   */
  static async markReviewHelpful(reviewId: string): Promise<void> {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 200));
      
      console.log('已标记评价有用:', reviewId);
    } catch (error) {
      console.error('标记评价有用失败:', error);
      throw error;
    }
  }
  
  /**
   * 删除评价
   * @param reviewId 评价ID
   */
  static async deleteReview(reviewId: string): Promise<void> {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300));
      
      console.log('评价已删除:', reviewId);
    } catch (error) {
      console.error('删除评价失败:', error);
      throw error;
    }
  }
  
  /**
   * 获取用户待评价订单
   * @param userId 用户ID
   * @returns 待评价订单列表
   */
  static async getPendingReviewOrders(userId: string): Promise<Array<{
    orderId: string;
    productId: string;
    productName: string;
    productImage?: string;
    purchaseDate: Date;
  }>> {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // 返回模拟数据
      return [
        {
          orderId: 'ORD123456',
          productId: 'PROD001',
          productName: '高端情趣用品',
          productImage: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400',
          purchaseDate: new Date('2026-01-20'),
        },
      ];
    } catch (error) {
      console.error('获取待评价订单失败:', error);
      throw error;
    }
  }
  
  /**
   * 格式化评分为星星显示
   * @param rating 评分
   * @returns 星星数组
   */
  static formatRatingStars(rating: number): { full: number; half: boolean; empty: number } {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    
    return { full, half, empty };
  }
  
  /**
   * 获取评分百分比
   * @param rating 某个评分的数量
   * @param total 总评价数
   * @returns 百分比
   */
  static getRatingPercentage(rating: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((rating / total) * 100);
  }
  
  /**
   * 生成模拟评价数据
   */
  private static generateMockReviews(productId: string, count: number): Review[] {
    const reviews: Review[] = [];
    const contents = [
      '质量很好，物流也很快，非常满意！',
      '包装很隐私，收到后很惊喜，商品质量不错',
      '第二次购买了，一如既往的好，推荐！',
      '物流速度快，包装严实，商品质量好',
      '性价比很高，用着很舒服，会回购',
    ];
    
    const tags = [
      ['质量好', '物流快'],
      ['包装好', '隐私保护'],
      ['性价比高', '值得购买'],
      ['舒适', '推荐'],
    ];
    
    for (let i = 0; i < count; i++) {
      const rating = Math.floor(Math.random() * 2) + 4; // 4-5分
      reviews.push({
        id: `REV${i}`,
        productId,
        productName: '示例商品',
        orderId: `ORD${i}`,
        userId: `USER${i}`,
        userName: `用户${i}**`,
        rating,
        content: contents[Math.floor(Math.random() * contents.length)],
        tags: tags[Math.floor(Math.random() * tags.length)],
        helpful: Math.floor(Math.random() * 50),
        isVerified: Math.random() > 0.1,
        isAnonymous: Math.random() > 0.7,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
      });
    }
    
    return reviews;
  }
}

// ==================== 导出 ====================

export default ReviewService;
