/**
 * 支付结果页面组件
 * 包含支付成功和支付失败两种状态
 */

import React from 'react';
import { CheckCircle2, XCircle, Home, FileText, RefreshCw } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import PaymentService from '@/app/services/paymentService';
import { cn } from '@/lib/utils';

// ==================== 类型定义 ====================

export interface PaymentSuccessProps {
  orderId: string;
  amount: number;
  paymentId: string;
  paidAt?: Date;
  onViewOrder: () => void;
  onBackToHome: () => void;
}

export interface PaymentFailedProps {
  orderId: string;
  amount: number;
  reason?: string;
  onRetry: () => void;
  onBackToHome: () => void;
}

// ==================== 支付成功组件 ====================

export function PaymentSuccess({
  orderId,
  amount,
  paymentId,
  paidAt,
  onViewOrder,
  onBackToHome,
}: PaymentSuccessProps) {
  return (
    <div className="max-w-md mx-auto text-center animate-fade-in">
      {/* 成功图标 */}
      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6 animate-scale-in">
        <CheckCircle2 className="w-16 h-16 text-green-600" strokeWidth={2} />
      </div>

      {/* 标题 */}
      <h2 className="text-3xl font-semibold text-text-primary mb-2">
        支付成功！
      </h2>

      <p className="text-text-secondary mb-8">
        您的订单已成功支付
      </p>

      {/* 支付信息 */}
      <div className="bg-bg-secondary rounded-lg p-6 mb-8 text-left">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-text-secondary">订单号</span>
            <span className="font-mono text-text-primary">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">支付金额</span>
            <span className="text-2xl font-semibold text-[#0056b3] font-mono">
              {PaymentService.formatAmount(amount)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">支付单号</span>
            <span className="font-mono text-sm text-text-primary">{paymentId}</span>
          </div>
          {paidAt && (
            <div className="flex justify-between">
              <span className="text-text-secondary">支付时间</span>
              <span className="text-sm text-text-primary">
                {paidAt.toLocaleString('zh-CN')}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="space-y-3">
        <Button
          className="w-full"
          size="lg"
          onClick={onViewOrder}
        >
          <FileText className="w-5 h-5 mr-2" />
          查看订单详情
        </Button>
        <Button
          variant="outline"
          className="w-full"
          size="lg"
          onClick={onBackToHome}
        >
          <Home className="w-5 h-5 mr-2" />
          返回首页
        </Button>
      </div>

      {/* 温馨提示 */}
      <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg text-left">
        <h4 className="font-semibold text-green-900 mb-2">
          接下来：
        </h4>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• 我们将尽快为您安排发货</li>
          <li>• 您可以在"我的订单"中查看物流信息</li>
          <li>• 收到商品后，欢迎评价</li>
        </ul>
      </div>
    </div>
  );
}

// ==================== 支付失败组件 ====================

export function PaymentFailed({
  orderId,
  amount,
  reason = '支付失败，请重试',
  onRetry,
  onBackToHome,
}: PaymentFailedProps) {
  return (
    <div className="max-w-md mx-auto text-center animate-fade-in">
      {/* 失败图标 */}
      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 mb-6 animate-scale-in">
        <XCircle className="w-16 h-16 text-red-600" strokeWidth={2} />
      </div>

      {/* 标题 */}
      <h2 className="text-3xl font-semibold text-text-primary mb-2">
        支付失败
      </h2>

      <p className="text-text-secondary mb-2">
        {reason}
      </p>

      <p className="text-sm text-text-tertiary mb-8">
        请检查支付方式或稍后重试
      </p>

      {/* 订单信息 */}
      <div className="bg-bg-secondary rounded-lg p-6 mb-8 text-left">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-text-secondary">订单号</span>
            <span className="font-mono text-text-primary">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">待支付金额</span>
            <span className="text-2xl font-semibold text-red-600 font-mono">
              {PaymentService.formatAmount(amount)}
            </span>
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="space-y-3">
        <Button
          className="w-full"
          size="lg"
          onClick={onRetry}
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          重新支付
        </Button>
        <Button
          variant="outline"
          className="w-full"
          size="lg"
          onClick={onBackToHome}
        >
          <Home className="w-5 h-5 mr-2" />
          返回首页
        </Button>
      </div>

      {/* 常见问题 */}
      <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
        <h4 className="font-semibold text-red-900 mb-2">
          可能的原因：
        </h4>
        <ul className="text-sm text-red-700 space-y-1">
          <li>• 支付超时，请重新发起支付</li>
          <li>• 账户余额不足</li>
          <li>• 银行卡状态异常</li>
          <li>• 网络连接问题</li>
        </ul>
        <div className="mt-3 pt-3 border-t border-red-200">
          <p className="text-sm text-red-700">
            如有疑问，请联系客服：400-123-4567
          </p>
        </div>
      </div>
    </div>
  );
}

// ==================== 导出 ====================

export { PaymentSuccess as default };
