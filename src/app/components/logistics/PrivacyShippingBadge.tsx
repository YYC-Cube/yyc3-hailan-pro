/**
 * 隐私配送标识组件
 * 显示隐私配送的标识和说明
 */

import React, { useState } from 'react';
import { Shield, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

// ==================== 类型定义 ====================

export interface PrivacyShippingBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
  className?: string;
}

// ==================== 组件 ====================

export function PrivacyShippingBadge({
  size = 'md',
  showTooltip = true,
  className,
}: PrivacyShippingBadgeProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const sizeClasses = {
    sm: {
      badge: 'px-2 py-1 text-xs gap-1',
      icon: 'w-3 h-3',
    },
    md: {
      badge: 'px-3 py-1.5 text-sm gap-1.5',
      icon: 'w-4 h-4',
    },
    lg: {
      badge: 'px-4 py-2 text-base gap-2',
      icon: 'w-5 h-5',
    },
  };

  const sizeClass = sizeClasses[size];

  return (
    <div className={cn('relative inline-block', className)}>
      <div
        className={cn(
          'inline-flex items-center rounded-full font-medium',
          'bg-purple-100 text-purple-700 border border-purple-200',
          sizeClass.badge,
          showTooltip && 'cursor-help'
        )}
        onMouseEnter={() => showTooltip && setIsTooltipVisible(true)}
        onMouseLeave={() => showTooltip && setIsTooltipVisible(false)}
        aria-label="隐私配送"
      >
        <Shield className={cn(sizeClass.icon, 'flex-shrink-0')} />
        <span>隐私配送</span>
        {showTooltip && (
          <Info className={cn(sizeClass.icon, 'flex-shrink-0 opacity-60')} />
        )}
      </div>

      {/* Tooltip */}
      {showTooltip && isTooltipVisible && (
        <div className="absolute z-50 top-full right-0 mt-2 w-64 animate-fade-in">
          <div className="bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg">
            <div className="font-semibold mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              隐私配送保护
            </div>
            <ul className="space-y-1.5 text-gray-200">
              <li>• 收件人信息已加密</li>
              <li>• 地址详情已脱敏</li>
              <li>• 快递面单无敏感信息</li>
              <li>• 保护您的隐私安全</li>
            </ul>
            {/* 小箭头 */}
            <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PrivacyShippingBadge;
