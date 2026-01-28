/**
 * 支付服务层
 * 提供支付相关的业务逻辑和API调用
 */

// ==================== 类型定义 ====================

/**
 * 支付方式
 */
export type PaymentMethod = 'alipay' | 'wechat' | 'card' | 'privacy';

/**
 * 支付状态
 */
export type PaymentStatus = 'pending' | 'processing' | 'success' | 'failed' | 'cancelled';

/**
 * 支付请求
 */
export interface PaymentRequest {
  orderId: string;
  amount: number;
  method: PaymentMethod;
  privacyMode?: boolean;
  returnUrl?: string;
}

/**
 * 支付响应
 */
export interface PaymentResponse {
  paymentId: string;
  orderId: string;
  status: PaymentStatus;
  amount: number;
  method: PaymentMethod;
  qrCode?: string;        // 二维码支付URL
  redirectUrl?: string;   // 跳转URL
  expiresAt: Date;        // 过期时间
  createdAt: Date;
}

/**
 * 支付状态查询响应
 */
export interface PaymentStatusResponse {
  paymentId: string;
  status: PaymentStatus;
  paidAt?: Date;
  failureReason?: string;
}

/**
 * 支付回调数据
 */
export interface PaymentCallbackData {
  paymentId: string;
  orderId: string;
  status: PaymentStatus;
  amount: number;
  paidAt?: string;
  signature: string;
}

/**
 * 支付历史记录
 */
export interface PaymentHistory {
  paymentId: string;
  orderId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  createdAt: Date;
  paidAt?: Date;
  privacyMode: boolean;
}

// ==================== 支付服务 ====================

/**
 * 支付服务类
 * 处理所有支付相关的业务逻辑
 */
export class PaymentService {
  private static readonly API_BASE = '/api/payment';
  
  /**
   * 创建支付订单
   * @param request 支付请求参数
   * @returns 支付响应信息
   */
  static async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      // 模拟API调用
      // 在实际项目中，这里应该调用真实的支付网关API
      
      // 验证金额
      if (request.amount <= 0) {
        throw new Error('支付金额必须大于0');
      }
      
      // 生成支付ID
      const paymentId = `PAY${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
      
      // 模拟不同支付方式的响应
      const response: PaymentResponse = {
        paymentId,
        orderId: request.orderId,
        status: 'pending',
        amount: request.amount,
        method: request.method,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15分钟后过期
        createdAt: new Date(),
      };
      
      // 根据支付方式生成不同的支付信息
      switch (request.method) {
        case 'alipay':
        case 'wechat':
          // 二维码支付
          response.qrCode = `https://qr.example.com/${paymentId}`;
          break;
          
        case 'card':
          // 跳转到支付页面
          response.redirectUrl = `https://pay.example.com/${paymentId}`;
          break;
          
        case 'privacy':
          // 隐私支付通道
          response.qrCode = `https://privacy-pay.example.com/${paymentId}`;
          break;
      }
      
      // 隐私模式下，不记录详细信息
      if (request.privacyMode) {
        console.log('隐私支付模式，不记录支付详情');
      }
      
      // 模拟延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return response;
    } catch (error) {
      console.error('创建支付订单失败:', error);
      throw error;
    }
  }
  
  /**
   * 查询支付状态
   * @param paymentId 支付ID
   * @returns 支付状态信息
   */
  static async queryPaymentStatus(paymentId: string): Promise<PaymentStatusResponse> {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // 模拟随机状态（实际应该查询真实状态）
      const statuses: PaymentStatus[] = ['pending', 'processing', 'success', 'failed'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      const response: PaymentStatusResponse = {
        paymentId,
        status: randomStatus,
      };
      
      if (randomStatus === 'success') {
        response.paidAt = new Date();
      } else if (randomStatus === 'failed') {
        response.failureReason = '支付失败，请重试';
      }
      
      return response;
    } catch (error) {
      console.error('查询支付状态失败:', error);
      throw error;
    }
  }
  
  /**
   * 取消支付
   * @param paymentId 支付ID
   */
  static async cancelPayment(paymentId: string): Promise<void> {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300));
      
      console.log(`支付已取消: ${paymentId}`);
    } catch (error) {
      console.error('取消支付失败:', error);
      throw error;
    }
  }
  
  /**
   * 处理支付回调
   * @param data 回调数据
   */
  static async handlePaymentCallback(data: PaymentCallbackData): Promise<void> {
    try {
      // 验证签名（实际项目中必须验证）
      if (!this.verifySignature(data)) {
        throw new Error('签名验证失败');
      }
      
      // 更新订单状态
      console.log('支付回调处理成功:', data);
      
      // 触发订单状态更新
      // 这里应该调用订单服务更新订单状态
      
    } catch (error) {
      console.error('处理支付回调失败:', error);
      throw error;
    }
  }
  
  /**
   * 获取支付历史记录
   * @param userId 用户ID
   * @param limit 记录数量限制
   * @returns 支付历史列表
   */
  static async getPaymentHistory(
    userId: string, 
    limit: number = 10
  ): Promise<PaymentHistory[]> {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // 模拟数据
      const history: PaymentHistory[] = [
        {
          paymentId: 'PAY1234567890',
          orderId: 'ORD1234567890',
          amount: 299.00,
          method: 'alipay',
          status: 'success',
          createdAt: new Date('2026-01-26'),
          paidAt: new Date('2026-01-26'),
          privacyMode: false,
        },
        {
          paymentId: 'PAY0987654321',
          orderId: 'ORD0987654321',
          amount: 599.00,
          method: 'wechat',
          status: 'success',
          createdAt: new Date('2026-01-25'),
          paidAt: new Date('2026-01-25'),
          privacyMode: true,
        },
      ];
      
      return history.slice(0, limit);
    } catch (error) {
      console.error('获取支付历史失败:', error);
      throw error;
    }
  }
  
  /**
   * 验证支付回调签名
   * @param data 回调数据
   * @returns 是否验证通过
   */
  private static verifySignature(data: PaymentCallbackData): boolean {
    // 实际项目中应该使用真实的签名验证算法
    // 这里仅作演示
    return data.signature && data.signature.length > 0;
  }
  
  /**
   * 格式化金额（保留两位小数）
   * @param amount 金额
   * @returns 格式化后的金额字符串
   */
  static formatAmount(amount: number): string {
    return `¥${amount.toFixed(2)}`;
  }
  
  /**
   * 获取支付方式的显示名称
   * @param method 支付方式
   * @returns 显示名称
   */
  static getPaymentMethodName(method: PaymentMethod): string {
    const names: Record<PaymentMethod, string> = {
      alipay: '支付宝',
      wechat: '微信支付',
      card: '银行卡',
      privacy: '隐私支付',
    };
    return names[method] || method;
  }
  
  /**
   * 获取支付状态的显示名称
   * @param status 支付状态
   * @returns 显示名称
   */
  static getPaymentStatusName(status: PaymentStatus): string {
    const names: Record<PaymentStatus, string> = {
      pending: '待支付',
      processing: '处理中',
      success: '支付成功',
      failed: '支付失败',
      cancelled: '已取消',
    };
    return names[status] || status;
  }
  
  /**
   * 计算支付超时时间（秒）
   * @param expiresAt 过期时间
   * @returns 剩余秒数
   */
  static getTimeoutSeconds(expiresAt: Date): number {
    const now = new Date();
    const diff = expiresAt.getTime() - now.getTime();
    return Math.max(0, Math.floor(diff / 1000));
  }
}

// ==================== 导出 ====================

export default PaymentService;
