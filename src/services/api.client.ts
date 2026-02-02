import { AppConfig } from '../config/app.config';
import { ApiResponse } from '../types';

/**
 * 基础 API 客户端封装
 * 处理统一的请求头、错误处理及后端连接逻辑
 */
class ApiClient {
  private baseUrl: string;
  private anonKey: string;

  constructor() {
    this.baseUrl = AppConfig.api.baseUrl;
    this.anonKey = AppConfig.api.anonKey;
  }

  /**
   * 通用请求方法
   */
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    // 如果配置为仅本地模拟，则直接抛出特殊错误供上层服务捕获处理
    if (!AppConfig.api.useRealBackend) {
      throw new Error('MOCK_MODE_ENABLED');
    }

    // Ensure endpoint starts with /
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${this.baseUrl}${path}`;
    
    // 默认请求头
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'X-Client-Version': AppConfig.version,
      'Authorization': `Bearer ${this.anonKey}`,
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const result = await response.json();

      // Flexible response handling: support both { success: true, data: ... } and direct data
      if (result && typeof result === 'object' && 'success' in result && 'data' in result) {
          if (!result.success) {
             throw new Error(result.error?.message || 'Unknown API Error');
          }
          return result.data as T;
      }

      return result as T;

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
