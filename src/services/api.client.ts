import { AppConfig } from '../config/app.config';
import { ApiResponse } from '../types';

/**
 * 基础 API 客户端封装
 * 处理统一的请求头、错误处理及 NAS 连接逻辑
 */
class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = AppConfig.api.baseUrl;
  }

  /**
   * 通用请求方法
   */
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    // 如果配置为仅本地模拟，则直接抛出特殊错误供上层服务捕获处理
    if (!AppConfig.api.useRealBackend) {
      throw new Error('MOCK_MODE_ENABLED');
    }

    const url = `${this.baseUrl}${endpoint}`;
    
    // 默认请求头
    const headers = {
      'Content-Type': 'application/json',
      'X-Client-Version': AppConfig.version,
      ...options.headers,
    };

    // 可以在这里添加 JWT Token 逻辑
    // const token = localStorage.getItem('hailan_token');
    // if (token) headers['Authorization'] = `Bearer ${token}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const result: ApiResponse<T> = await response.json();

      if (!result.success) {
        throw new Error(result.error?.message || 'Unknown API Error');
      }

      // 强制转换 data 类型 (假设后端遵循 ApiResponse 结构)
      return result.data as T;

    } catch (error) {
      console.error(`API Request Failed [${endpoint}]:`, error);
      throw error;
    }
  }

  // 便捷方法
  get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  post<T>(endpoint: string, body: any) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }
}

export const apiClient = new ApiClient();
