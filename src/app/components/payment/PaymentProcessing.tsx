/**
 * 支付处理中页面组件
 * 显示支付二维码、倒计时和状态轮询
 */

import React, { useState, useEffect, useCallback } from 'react';
import { QrCode, Clock, AlertCircle, Loader2, Smartphone } from 'lucide-react';
import { PaymentMethod, PaymentStatus } from '@/app/services/paymentService';
import PaymentService from '@/app/services/paymentService';
import { Button } from '@/app/components/ui/button';
import { Alert } from '@/app/components/ui/status-indicator';
import { cn } from '@/lib/utils';

// ==================== 类型定义 ====================

export interface PaymentProcessingProps {
  paymentId: string;
  orderId: string;
  amount: number;
  method: PaymentMethod;
  qrCode?: string;
  redirectUrl?: string;
  expiresAt: Date;
  onSuccess: () => void;
  onFailed: (reason: string) => void;
  onCancel: () => void;
  onTimeout: () => void;
}

// ==================== 组件 ====================

export function PaymentProcessing({
  paymentId,
  orderId,
  amount,
  method,
  qrCode,
  redirectUrl,
  expiresAt,
  onSuccess,
  onFailed,
  onCancel,
  onTimeout,
}: PaymentProcessingProps) {
  const [status, setStatus] = useState<PaymentStatus>('pending');
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isPolling, setIsPolling] = useState(true);

  // 计算剩余时间
  useEffect(() => {
    const updateTimeLeft = () => {
      const seconds = PaymentService.getTimeoutSeconds(expiresAt);
      setTimeLeft(seconds);

      if (seconds <= 0) {
        setIsPolling(false);
        onTimeout();
      }
    };

    updateTimeLeft();
    const timer = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [expiresAt, onTimeout]);

  // 格式化倒计时
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 轮询支付状态
  const pollPaymentStatus = useCallback(async () => {
    if (!isPolling || status !== 'pending') return;

    try {
      const statusResponse = await PaymentService.queryPaymentStatus(paymentId);
      setStatus(statusResponse.status);

      if (statusResponse.status === 'success') {
        setIsPolling(false);
        setTimeout(() => onSuccess(), 1000);
      } else if (statusResponse.status === 'failed') {
        setIsPolling(false);
        onFailed(statusResponse.failureReason || '支付失败');
      }
    } catch (error) {
      console.error('查询支付状态失败:', error);
    }
  }, [paymentId, isPolling, status, onSuccess, onFailed]);

  // 定期轮询
  useEffect(() => {
    if (!isPolling) return;

    const interval = setInterval(pollPaymentStatus, 2000);
    return () => clearInterval(interval);
  }, [isPolling, pollPaymentStatus]);

  // 取消支付
  const handleCancel = async () => {
    setIsPolling(false);
    await PaymentService.cancelPayment(paymentId);
    onCancel();
  };

  // 跳转支付
  const handleRedirect = () => {
    if (redirectUrl) {
      window.open(redirectUrl, '_blank');
    }
  };

  const methodName = PaymentService.getPaymentMethodName(method);

  return (
    <div className="max-w-md mx-auto">
      {/* 标题 */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-text-primary mb-2">
          等待支付
        </h2>
        <p className="text-text-secondary">
          订单号：<span className="font-mono">{orderId}</span>
        </p>
      </div>

      {/* 支付金额 */}
      <div className="text-center mb-6">
        <div className="text-sm text-text-secondary mb-1">支付金额</div>
        <div className="text-4xl font-semibold text-[#0056b3] font-mono">
          {PaymentService.formatAmount(amount)}
        </div>
      </div>

      {/* 二维码或跳转按钮 */}
      <div className="bg-white border-2 border-border rounded-lg p-6 mb-6">
        {qrCode ? (
          <div className="text-center">
            {/* 二维码 */}
            <div className="inline-block p-4 bg-white border border-border rounded-lg mb-4">
              <QrCode className="w-48 h-48 text-gray-400" />
              <div className="text-xs text-text-tertiary mt-2">
                扫描二维码支付
              </div>
            </div>

            {/* 提示 */}
            <div className="flex items-center justify-center gap-2 text-sm text-text-secondary">
              <Smartphone className="w-4 h-4" />
              <span>使用{methodName}扫码支付</span>
            </div>
          </div>
        ) : redirectUrl ? (
          <div className="text-center">
            <Button
              size="lg"
              className="w-full mb-4"
              onClick={handleRedirect}
            >
              前往{methodName}支付
            </Button>
            <p className="text-sm text-text-secondary">
              点击按钮将在新窗口打开支付页面
            </p>
          </div>
        ) : (
          <div className="text-center py-8">
            <Loader2 className="w-12 h-12 mx-auto animate-spin text-[#0056b3] mb-4" />
            <p className="text-text-secondary">正在准备支付...</p>
          </div>
        )}
      </div>

      {/* 倒计时 */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <Clock className={cn(
          'w-5 h-5',
          timeLeft <= 60 ? 'text-red-500' : 'text-text-secondary'
        )} />
        <span className={cn(
          'text-lg font-semibold font-mono',
          timeLeft <= 60 ? 'text-red-500' : 'text-text-primary'
        )}>
          {formatTime(timeLeft)}
        </span>
        <span className="text-text-secondary">后超时</span>
      </div>

      {/* 低于1分钟提示 */}
      {timeLeft <= 60 && timeLeft > 0 && (
        <Alert type="warning" className="mb-6">
          支付即将超时，请尽快完成支付
        </Alert>
      )}

      {/* 支付状态 */}
      {status === 'processing' && (
        <div className="flex items-center justify-center gap-2 mb-6 p-4 bg-blue-50 rounded-lg">
          <Loader2 className="w-5 h-5 animate-spin text-[#0056b3]" />
          <span className="text-sm text-blue-700">
            支付处理中，请稍候...
          </span>
        </div>
      )}

      {status === 'success' && (
        <div className="flex items-center justify-center gap-2 mb-6 p-4 bg-green-50 rounded-lg animate-fade-in">
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
          <span className="text-sm text-green-700 font-semibold">
            支付成功！
          </span>
        </div>
      )}

      {/* 操作按钮 */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1"
          onClick={handleCancel}
          disabled={status === 'success'}
        >
          取消支付
        </Button>
        <Button
          className="flex-1"
          onClick={pollPaymentStatus}
          disabled={!isPolling}
        >
          {isPolling ? '检查支付状态' : '已完成'}
        </Button>
      </div>

      {/* 温馨提示 */}
      <div className="mt-6 p-4 bg-bg-secondary rounded-lg">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-text-tertiary flex-shrink-0 mt-0.5" />
          <div className="text-xs text-text-tertiary space-y-1">
            <p>• 请在{formatTime(timeLeft)}内完成支付</p>
            <p>• 支付成功后会自动跳转</p>
            <p>• 如遇问题请联系客服</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentProcessing;
