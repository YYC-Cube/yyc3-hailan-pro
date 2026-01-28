/**
 * 支付状态管理Context
 * 管理全局支付状态、支付历史和支付方法
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import PaymentService, {
  PaymentMethod,
  PaymentStatus,
  PaymentRequest,
  PaymentResponse,
  PaymentHistory,
} from '@/app/services/paymentService';

// ==================== 类型定义 ====================

/**
 * 当前支付信息
 */
interface CurrentPayment {
  paymentId: string;
  orderId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  qrCode?: string;
  redirectUrl?: string;
  expiresAt: Date;
  createdAt: Date;
}

/**
 * Payment Context 状态
 */
interface PaymentContextState {
  // 当前支付
  currentPayment: CurrentPayment | null;
  
  // 支付历史
  paymentHistory: PaymentHistory[];
  
  // 加载状态
  isLoading: boolean;
  
  // 错误信息
  error: string | null;
  
  // 方法
  createPayment: (request: PaymentRequest) => Promise<PaymentResponse | null>;
  queryPaymentStatus: (paymentId: string) => Promise<void>;
  cancelPayment: (paymentId: string) => Promise<void>;
  loadPaymentHistory: (userId: string) => Promise<void>;
  clearCurrentPayment: () => void;
  clearError: () => void;
}

// ==================== Context ====================

const PaymentContext = createContext<PaymentContextState | undefined>(undefined);

// ==================== Provider ====================

interface PaymentProviderProps {
  children: ReactNode;
}

export function PaymentProvider({ children }: PaymentProviderProps) {
  const [currentPayment, setCurrentPayment] = useState<CurrentPayment | null>(null);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 创建支付订单
   */
  const createPayment = useCallback(async (request: PaymentRequest): Promise<PaymentResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await PaymentService.createPayment(request);

      // 保存当前支付信息
      setCurrentPayment({
        paymentId: response.paymentId,
        orderId: response.orderId,
        amount: response.amount,
        method: response.method,
        status: response.status,
        qrCode: response.qrCode,
        redirectUrl: response.redirectUrl,
        expiresAt: response.expiresAt,
        createdAt: response.createdAt,
      });

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '创建支付失败';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 查询支付状态
   */
  const queryPaymentStatus = useCallback(async (paymentId: string): Promise<void> => {
    if (!currentPayment || currentPayment.paymentId !== paymentId) {
      return;
    }

    try {
      const statusResponse = await PaymentService.queryPaymentStatus(paymentId);

      // 更新当前支付状态
      setCurrentPayment(prev => {
        if (!prev || prev.paymentId !== paymentId) {
          return prev;
        }

        return {
          ...prev,
          status: statusResponse.status,
        };
      });

      // 如果支付成功或失败，可以触发回调
      if (statusResponse.status === 'success') {
        console.log('支付成功！');
        // 这里可以触发全局事件或回调
      } else if (statusResponse.status === 'failed') {
        setError(statusResponse.failureReason || '支付失败');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '查询支付状态失败';
      setError(errorMessage);
    }
  }, [currentPayment]);

  /**
   * 取消支付
   */
  const cancelPayment = useCallback(async (paymentId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await PaymentService.cancelPayment(paymentId);

      // 更新当前支��状态
      setCurrentPayment(prev => {
        if (!prev || prev.paymentId !== paymentId) {
          return prev;
        }

        return {
          ...prev,
          status: 'cancelled',
        };
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '取消支付失败';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 加载支付历史
   */
  const loadPaymentHistory = useCallback(async (userId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const history = await PaymentService.getPaymentHistory(userId);
      setPaymentHistory(history);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '加载支付历史失败';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 清除当前支付信息
   */
  const clearCurrentPayment = useCallback(() => {
    setCurrentPayment(null);
    setError(null);
  }, []);

  /**
   * 清除错误信息
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Context value
  const value: PaymentContextState = {
    currentPayment,
    paymentHistory,
    isLoading,
    error,
    createPayment,
    queryPaymentStatus,
    cancelPayment,
    loadPaymentHistory,
    clearCurrentPayment,
    clearError,
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
}

// ==================== Hook ====================

/**
 * 使用Payment Context的Hook
 * @returns Payment Context状态和方法
 */
export function usePayment() {
  const context = useContext(PaymentContext);

  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }

  return context;
}

// ==================== 导出 ====================

export default PaymentContext;
