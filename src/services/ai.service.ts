import { apiClient } from './api.client';
import { Message, Suggestion } from '../types';

/**
 * AI 客服业务服务
 * 负责处理用户对话、上下文管理及 NAS 后端通信
 */

interface AIResponse {
  content: string;
  suggestions?: Suggestion[];
}

export const AIService = {
  
  /**
   * 发送消息给 AI 助手
   * 自动降级处理：如果 NAS 连接失败或未启用，使用本地规则引擎
   */
  async sendMessage(content: string, history: Message[] = []): Promise<AIResponse> {
    try {
      // 尝试调用真实 NAS API
      // 假设后端接口为 POST /chat/completions
      return await apiClient.post<AIResponse>('/chat/completions', {
        message: content,
        history: history.slice(-5), // 仅发送最近5条记录以节省上下文
      });
    } catch (error) {
      // 如果是模拟模式或网络错误，回退到本地逻辑
      // console.warn('Switching to local AI logic:', error);
      return this.mockLocalResponse(content);
    }
  },

  /**
   * 本地模拟响应逻辑 (规则引擎)
   * 当无法连接 NAS 时使用
   */
  async mockLocalResponse(userInput: string): Promise<AIResponse> {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1000));

    const input = userInput.toLowerCase();
    
    // 基础关键词匹配
    if (input.includes('推荐') || input.includes('建议')) {
      return {
        content: '根据您的需求，我为您精心挑选了几款产品。这些产品均采用医用级材质，安全可靠，并且具有出色的用户评价。',
        suggestions: [
          { id: '1', text: '查看热销产品', action: '/products/hot' },
          { id: '2', text: '按价格筛选', action: 'filter:price' }
        ]
      };
    }
    
    if (input.includes('隐私') || input.includes('安全')) {
      return {
        content: '您的隐私和数据安全是我们的首要考虑。所有对话都经过端到端加密，我们不会存储任何敏感信息。您可以在隐私控制面板中管理您的数据设置。',
      };
    }

    if (input.includes('怎么') || input.includes('如何') || input.includes('教程')) {
      return {
        content: '您可以点击下方的“功能扩展”按钮，使用“产品匹配测试”功能，或者查看我们的在线使用指南。',
        suggestions: [
          { id: 'guide', text: '打开使用指南', action: 'open:guide' }
        ]
      };
    }

    // 默认回复
    return {
      content: '感谢您的反馈。作为您的私密健康助手，我还在不断学习中。您可以尝试询问关于“产品推荐”、“隐私保护”或“使用教程”的问题。',
    };
  }
};
