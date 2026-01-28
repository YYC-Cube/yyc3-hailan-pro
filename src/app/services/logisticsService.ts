/**
 * 物流服务层
 * 提供物流查询、跟踪和管理功能
 */

// ==================== 类型定义 ====================

/**
 * 物流状态
 */
export type LogisticsStatus = 
  | 'pending'        // 待发货
  | 'picked'         // 已揽收
  | 'in_transit'     // 运输中
  | 'out_for_delivery' // 派送中
  | 'delivered'      // 已签收
  | 'exception'      // 异常
  | 'returned';      // 已退回

/**
 * 物流事件
 */
export interface LogisticsEvent {
  id: string;
  time: Date;
  location: string;
  description: string;
  status: LogisticsStatus;
}

/**
 * 物流信息
 */
export interface LogisticsInfo {
  trackingNumber: string;     // 运单号
  carrier: string;            // 承运商
  carrierCode: string;        // 承运商代码
  status: LogisticsStatus;    // 当前状态
  currentLocation?: string;   // 当前位置
  estimatedDelivery?: Date;   // 预计送达时间
  timeline: LogisticsEvent[]; // 物流轨迹
  privacyShipping: boolean;   // 是否隐私配送
  recipientName?: string;     // 收件人（脱敏）
  recipientAddress?: string;  // 收件地址（脱敏）
  createdAt: Date;            // 创建时间
  updatedAt: Date;            // 更新时间
}

/**
 * 物流异常
 */
export interface LogisticsException {
  id: string;
  trackingNumber: string;
  type: 'delay' | 'lost' | 'damaged' | 'wrong_address' | 'other';
  description: string;
  reportedAt: Date;
  resolved: boolean;
}

/**
 * 物流问题报告
 */
export interface LogisticsIssueReport {
  trackingNumber: string;
  issueType: LogisticsException['type'];
  description: string;
  images?: string[];
}

/**
 * 物流承运商
 */
export interface LogisticsCarrier {
  code: string;
  name: string;
  nameEn: string;
  phone: string;
  website: string;
  logo?: string;
}

// ==================== 物流服务 ====================

/**
 * 物流服务类
 * 处理所有物流相关的业务逻辑
 */
export class LogisticsService {
  private static readonly API_BASE = '/api/logistics';
  
  // 物流承运商列表
  private static readonly carriers: LogisticsCarrier[] = [
    {
      code: 'SF',
      name: '顺丰速运',
      nameEn: 'SF Express',
      phone: '95338',
      website: 'https://www.sf-express.com',
    },
    {
      code: 'YTO',
      name: '圆通速递',
      nameEn: 'YTO Express',
      phone: '95554',
      website: 'https://www.yto.net.cn',
    },
    {
      code: 'ZTO',
      name: '中通快递',
      nameEn: 'ZTO Express',
      phone: '95311',
      website: 'https://www.zto.com',
    },
    {
      code: 'STO',
      name: '申通快递',
      nameEn: 'STO Express',
      phone: '95543',
      website: 'https://www.sto.cn',
    },
    {
      code: 'EMS',
      name: '中国邮政EMS',
      nameEn: 'China Post EMS',
      phone: '11183',
      website: 'https://www.ems.com.cn',
    },
  ];
  
  /**
   * 查询物流信息
   * @param trackingNumber 运单号
   * @returns 物流详细信息
   */
  static async getLogisticsInfo(trackingNumber: string): Promise<LogisticsInfo> {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 生成模拟数据
      const carrier = this.carriers[Math.floor(Math.random() * this.carriers.length)];
      const status = this.getRandomStatus();
      
      // 生成物流轨迹
      const timeline = this.generateTimeline(status);
      
      const info: LogisticsInfo = {
        trackingNumber,
        carrier: carrier.name,
        carrierCode: carrier.code,
        status,
        currentLocation: timeline[0]?.location,
        estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2天后
        timeline,
        privacyShipping: Math.random() > 0.5, // 随机隐私配送
        recipientName: '王**',  // 脱敏
        recipientAddress: '北京市朝阳区****** （已隐藏详细地址）',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
      };
      
      return info;
    } catch (error) {
      console.error('查询物流信息失败:', error);
      throw error;
    }
  }
  
  /**
   * 订阅物流更新
   * @param trackingNumber 运单号
   * @param callback 更新回调函数
   * @returns 取消订阅函数
   */
  static subscribeToUpdates(
    trackingNumber: string,
    callback: (info: LogisticsInfo) => void
  ): () => void {
    // 模拟实时更新（实际应使用WebSocket或轮询）
    const interval = setInterval(async () => {
      try {
        const info = await this.getLogisticsInfo(trackingNumber);
        callback(info);
      } catch (error) {
        console.error('更新物流信息失败:', error);
      }
    }, 30000); // 每30秒更新一次
    
    // 返回取消订阅函数
    return () => clearInterval(interval);
  }
  
  /**
   * 报告物流问题
   * @param report 问题报告
   */
  static async reportIssue(report: LogisticsIssueReport): Promise<void> {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('物流问题已报告:', report);
      
      // 实际应该调用API提交问题
    } catch (error) {
      console.error('报告物流问题失败:', error);
      throw error;
    }
  }
  
  /**
   * 获取物流承运商信息
   * @param code 承运商代码
   * @returns 承运商信息
   */
  static getCarrierInfo(code: string): LogisticsCarrier | undefined {
    return this.carriers.find(c => c.code === code);
  }
  
  /**
   * 获取所有承运商列表
   * @returns 承运商列表
   */
  static getAllCarriers(): LogisticsCarrier[] {
    return [...this.carriers];
  }
  
  /**
   * 获取物流状态的显示名称
   * @param status 物流状态
   * @returns 显示名称
   */
  static getStatusName(status: LogisticsStatus): string {
    const names: Record<LogisticsStatus, string> = {
      pending: '待发货',
      picked: '已揽收',
      in_transit: '运输中',
      out_for_delivery: '派送中',
      delivered: '已签收',
      exception: '异常',
      returned: '已退回',
    };
    return names[status] || status;
  }
  
  /**
   * 获取物流状态的颜色
   * @param status 物流状态
   * @returns 颜色类名
   */
  static getStatusColor(status: LogisticsStatus): string {
    const colors: Record<LogisticsStatus, string> = {
      pending: 'text-gray-600',
      picked: 'text-blue-600',
      in_transit: 'text-purple-600',
      out_for_delivery: 'text-yellow-600',
      delivered: 'text-green-600',
      exception: 'text-red-600',
      returned: 'text-orange-600',
    };
    return colors[status] || 'text-gray-600';
  }
  
  /**
   * 格式化时间
   * @param date 日期
   * @returns 格式化的时间字符串
   */
  static formatTime(date: Date): string {
    return date.toLocaleString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  
  /**
   * 计算预计送达时间的友好显示
   * @param estimatedDelivery 预计送达时间
   * @returns 友好显示文本
   */
  static getEstimatedDeliveryText(estimatedDelivery?: Date): string {
    if (!estimatedDelivery) {
      return '暂无预计送达时间';
    }
    
    const now = new Date();
    const diff = estimatedDelivery.getTime() - now.getTime();
    const days = Math.ceil(diff / (24 * 60 * 60 * 1000));
    
    if (days < 0) {
      return '已延迟';
    } else if (days === 0) {
      return '今天';
    } else if (days === 1) {
      return '明天';
    } else if (days === 2) {
      return '后天';
    } else {
      return `${days}天后`;
    }
  }
  
  // ==================== 私有辅助方法 ====================
  
  /**
   * 生成随机物流状态（用于模拟）
   */
  private static getRandomStatus(): LogisticsStatus {
    const statuses: LogisticsStatus[] = [
      'picked',
      'in_transit',
      'out_for_delivery',
      'delivered',
    ];
    return statuses[Math.floor(Math.random() * statuses.length)];
  }
  
  /**
   * 生成物流轨迹（用于模拟）
   */
  private static generateTimeline(currentStatus: LogisticsStatus): LogisticsEvent[] {
    const events: LogisticsEvent[] = [];
    const baseTime = Date.now() - 2 * 24 * 60 * 60 * 1000; // 2天前
    
    // 根据当前状态生成对应的轨迹
    const statusFlow: LogisticsStatus[] = ['picked', 'in_transit', 'out_for_delivery', 'delivered'];
    const currentIndex = statusFlow.indexOf(currentStatus);
    
    const locations = [
      '北京市朝阳区分拣中心',
      '北京市转运中心',
      '天津市转运中心',
      '天津市和平区营业点',
      '天津市和平区派送站',
    ];
    
    const descriptions = [
      '快件已由【北京朝阳区】揽收',
      '快件在【北京转运中心】完成分拣',
      '快件已发往【天津转运中心】',
      '快件到达【天津和平区营业点】',
      '快件正在派送中，快递员【张师傅 158****1234】',
    ];
    
    for (let i = 0; i <= currentIndex && i < statusFlow.length; i++) {
      events.unshift({
        id: `EVENT${i + 1}`,
        time: new Date(baseTime + i * 8 * 60 * 60 * 1000), // 每8小时一个节点
        location: locations[i] || '处理中',
        description: descriptions[i] || '快件处理中',
        status: statusFlow[i],
      });
    }
    
    return events;
  }
}

// ==================== 导出 ====================

export default LogisticsService;
