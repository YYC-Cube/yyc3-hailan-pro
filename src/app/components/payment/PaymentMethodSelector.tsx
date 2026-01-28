/**
 * 支付方式选择器组件
 * 支持多种支付方式，包括隐私支付选项
 */

import React, { useState } from 'react';
import { CreditCard, Smartphone, Lock, Check } from 'lucide-react';
import { PaymentMethod } from '@/app/services/paymentService';
import { cn } from '@/lib/utils';

// ==================== 类型定义 ====================

export interface PaymentMethodOption {
  method: PaymentMethod;
  name: string;
  icon: React.ReactNode;
  description: string;
  privacyLevel?: 'standard' | 'enhanced' | 'maximum';
}

export interface PaymentMethodSelectorProps {
  selectedMethod?: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
  className?: string;
  disabled?: boolean;
}

// ==================== 组件 ====================

export function PaymentMethodSelector({
  selectedMethod = 'alipay',
  onMethodChange,
  className,
  disabled = false,
}: PaymentMethodSelectorProps) {
  const [selected, setSelected] = useState<PaymentMethod>(selectedMethod);

  // 支付方式选项
  const paymentMethods: PaymentMethodOption[] = [
    {
      method: 'alipay',
      name: '支付宝',
      icon: <Smartphone className="w-6 h-6" />,
      description: '快速便捷，支持花呗分期',
      privacyLevel: 'standard',
    },
    {
      method: 'wechat',
      name: '微信支付',
      icon: <Smartphone className="w-6 h-6" />,
      description: '微信扫码支付',
      privacyLevel: 'standard',
    },
    {
      method: 'card',
      name: '银行卡支付',
      icon: <CreditCard className="w-6 h-6" />,
      description: '支持借记卡和信用卡',
      privacyLevel: 'enhanced',
    },
    {
      method: 'privacy',
      name: '隐私支付',
      icon: <Lock className="w-6 h-6" />,
      description: '最高级别隐私保护，不记录支付详情',
      privacyLevel: 'maximum',
    },
  ];

  const handleSelect = (method: PaymentMethod) => {
    if (disabled) return;
    
    setSelected(method);
    onMethodChange(method);
  };

  const getPrivacyLevelColor = (level?: string) => {
    switch (level) {
      case 'standard':
        return 'text-blue-600';
      case 'enhanced':
        return 'text-purple-600';
      case 'maximum':
        return 'text-[#6B46C1]';
      default:
        return 'text-gray-600';
    }
  };

  const getPrivacyLevelLabel = (level?: string) => {
    switch (level) {
      case 'standard':
        return '标准';
      case 'enhanced':
        return '增强';
      case 'maximum':
        return '最高';
      default:
        return '';
    }
  };

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">
          选择支付方式
        </h3>
        <span className="text-sm text-text-secondary">
          支持多种支付方式
        </span>
      </div>

      <div className="grid gap-3">
        {paymentMethods.map((option) => {
          const isSelected = selected === option.method;
          const isPrivacy = option.method === 'privacy';

          return (
            <button
              key={option.method}
              type="button"
              onClick={() => handleSelect(option.method)}
              disabled={disabled}
              className={cn(
                'relative flex items-start gap-4 p-4 rounded-lg border-2 transition-all focus-ring text-left',
                isSelected
                  ? isPrivacy
                    ? 'border-[#6B46C1] bg-purple-50'
                    : 'border-[#0056b3] bg-blue-50'
                  : 'border-border bg-white hover:border-gray-300',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
              aria-label={`选择${option.name}`}
              aria-pressed={isSelected}
            >
              {/* 图标 */}
              <div
                className={cn(
                  'flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-colors',
                  isSelected
                    ? isPrivacy
                      ? 'bg-[#6B46C1] text-white'
                      : 'bg-[#0056b3] text-white'
                    : 'bg-bg-tertiary text-text-tertiary'
                )}
              >
                {option.icon}
              </div>

              {/* 内容 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-text-primary">
                    {option.name}
                  </span>
                  {option.privacyLevel && (
                    <span
                      className={cn(
                        'text-xs font-medium px-2 py-0.5 rounded-full',
                        option.privacyLevel === 'maximum'
                          ? 'bg-purple-100 text-purple-700'
                          : option.privacyLevel === 'enhanced'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      )}
                    >
                      {getPrivacyLevelLabel(option.privacyLevel)}隐私
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-secondary">
                  {option.description}
                </p>
              </div>

              {/* 选中标记 */}
              {isSelected && (
                <div
                  className={cn(
                    'flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center',
                    isPrivacy ? 'bg-[#6B46C1]' : 'bg-[#0056b3]'
                  )}
                >
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* 隐私提示 */}
      {selected === 'privacy' && (
        <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-[#6B46C1] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-purple-900 mb-1">
                隐私支付说明
              </h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• 支付过程全程加密，不记录支付详情</li>
                <li>• 订单信息自动脱敏处理</li>
                <li>• 支持匿名支付，保护个人隐私</li>
                <li>• 符合最高级别隐私保护标准</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentMethodSelector;
