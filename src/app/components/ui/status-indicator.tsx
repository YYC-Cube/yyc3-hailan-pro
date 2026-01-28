/**
 * StatusIndicator 状态指示器组件
 * 色盲友好设计 - 使用颜色+图标双重指示
 * 符合 WCAG 2.1 AA 标准
 */

import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, XCircle, Clock, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export type StatusType = 'success' | 'warning' | 'error' | 'info' | 'pending' | 'processing' | 'default';

export interface StatusIndicatorProps {
  /** 状态类型 */
  type: StatusType;
  /** 状态文本 */
  children: React.ReactNode;
  /** 自定义图标 */
  icon?: React.ReactNode;
  /** 大小 */
  size?: 'sm' | 'md' | 'lg';
  /** 是否显示背景 */
  showBackground?: boolean;
  /** 是否显示边框 */
  showBorder?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 是否为圆点指示器 */
  dot?: boolean;
}

const statusConfig: Record<
  StatusType,
  {
    icon: React.ComponentType<{ className?: string }>;
    colorClass: string;
    bgClass: string;
    borderClass: string;
    dotClass: string;
  }
> = {
  success: {
    icon: CheckCircle2,
    colorClass: 'text-green-700',
    bgClass: 'bg-green-50',
    borderClass: 'border-green-200',
    dotClass: 'bg-green-500',
  },
  warning: {
    icon: AlertTriangle,
    colorClass: 'text-yellow-700',
    bgClass: 'bg-yellow-50',
    borderClass: 'border-yellow-200',
    dotClass: 'bg-yellow-500',
  },
  error: {
    icon: XCircle,
    colorClass: 'text-red-700',
    bgClass: 'bg-red-50',
    borderClass: 'border-red-200',
    dotClass: 'bg-red-500',
  },
  info: {
    icon: Info,
    colorClass: 'text-blue-700',
    bgClass: 'bg-blue-50',
    borderClass: 'border-blue-200',
    dotClass: 'bg-blue-500',
  },
  pending: {
    icon: Clock,
    colorClass: 'text-gray-700',
    bgClass: 'bg-gray-50',
    borderClass: 'border-gray-200',
    dotClass: 'bg-gray-500',
  },
  processing: {
    icon: Zap,
    colorClass: 'text-purple-700',
    bgClass: 'bg-purple-50',
    borderClass: 'border-purple-200',
    dotClass: 'bg-purple-500',
  },
  default: {
    icon: AlertCircle,
    colorClass: 'text-gray-700',
    bgClass: 'bg-gray-50',
    borderClass: 'border-gray-200',
    dotClass: 'bg-gray-500',
  },
};

const sizeClasses = {
  sm: {
    icon: 'w-3.5 h-3.5',
    text: 'text-xs',
    padding: 'px-2 py-1',
    gap: 'gap-1',
    dot: 'w-2 h-2',
  },
  md: {
    icon: 'w-4 h-4',
    text: 'text-sm',
    padding: 'px-3 py-1.5',
    gap: 'gap-1.5',
    dot: 'w-2.5 h-2.5',
  },
  lg: {
    icon: 'w-5 h-5',
    text: 'text-base',
    padding: 'px-4 py-2',
    gap: 'gap-2',
    dot: 'w-3 h-3',
  },
};

export function StatusIndicator({
  type,
  children,
  icon: customIcon,
  size = 'md',
  showBackground = true,
  showBorder = true,
  className,
  dot = false,
}: StatusIndicatorProps) {
  const config = statusConfig[type];
  const sizeClass = sizeClasses[size];
  const Icon = config.icon;

  if (dot) {
    // 圆点指示器样式
    return (
      <div
        className={cn(
          'inline-flex items-center',
          sizeClass.gap,
          sizeClass.text,
          config.colorClass,
          className
        )}
        role="status"
        aria-label={`${type}: ${children}`}
      >
        <span
          className={cn(
            sizeClass.dot,
            'rounded-full',
            config.dotClass,
            'animate-pulse'
          )}
          aria-hidden="true"
        />
        <span className="font-medium">{children}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md font-medium',
        sizeClass.gap,
        sizeClass.text,
        sizeClass.padding,
        config.colorClass,
        showBackground && config.bgClass,
        showBorder && `border ${config.borderClass}`,
        className
      )}
      role="status"
      aria-label={`${type}: ${children}`}
    >
      {customIcon || <Icon className={sizeClass.icon} aria-hidden="true" />}
      <span>{children}</span>
    </div>
  );
}

/**
 * Badge 徽章组件
 * 用于计数、标签等
 */
export interface BadgeProps {
  /** 徽章内容 */
  children: React.ReactNode;
  /** 变体 */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  /** 大小 */
  size?: 'sm' | 'md' | 'lg';
  /** 圆点样式 */
  dot?: boolean;
  /** 自定义类名 */
  className?: string;
}

const badgeVariants = {
  default: 'bg-gray-100 text-gray-700 border-gray-200',
  primary: 'bg-[#0056b3] text-white border-[#0056b3]',
  success: 'bg-green-100 text-green-700 border-green-200',
  warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  error: 'bg-red-100 text-red-700 border-red-200',
  info: 'bg-blue-100 text-blue-700 border-blue-200',
};

export function Badge({ children, variant = 'default', size = 'sm', dot = false, className }: BadgeProps) {
  const sizeClass = sizeClasses[size];

  if (dot) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5',
          sizeClass.text,
          badgeVariants[variant],
          'px-2 py-0.5 rounded-full font-medium border',
          className
        )}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />
        {children}
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center',
        sizeClass.text,
        badgeVariants[variant],
        'px-2 py-0.5 rounded-md font-medium border',
        className
      )}
    >
      {children}
    </span>
  );
}

/**
 * Alert 警告组件
 * 用于重要的页面级消息
 */
export interface AlertProps {
  /** 警告类型 */
  type: Exclude<StatusType, 'pending' | 'processing' | 'default'>;
  /** 标题 */
  title?: string;
  /** 内容 */
  children: React.ReactNode;
  /** 是否可关闭 */
  closable?: boolean;
  /** 关闭回调 */
  onClose?: () => void;
  /** 自定义类名 */
  className?: string;
}

export function Alert({ type, title, children, closable = false, onClose, className }: AlertProps) {
  const config = statusConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'rounded-lg p-4 border',
        config.bgClass,
        config.borderClass,
        className
      )}
      role="alert"
    >
      <div className="flex gap-3">
        <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', config.colorClass)} aria-hidden="true" />
        <div className="flex-1 min-w-0">
          {title && (
            <h5 className={cn('font-semibold mb-1', config.colorClass)}>
              {title}
            </h5>
          )}
          <div className={cn('text-sm', config.colorClass)}>
            {children}
          </div>
        </div>
        {closable && (
          <button
            onClick={onClose}
            className={cn(
              'flex-shrink-0 rounded p-1 hover:bg-black/5 transition-colors focus-ring',
              config.colorClass
            )}
            aria-label="关闭"
          >
            <XCircle className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Toast 消息提示（纯UI组件，需配合toast库使用）
 */
export interface ToastProps {
  type: StatusType;
  message: string;
  description?: string;
}

export function ToastContent({ type, message, description }: ToastProps) {
  const config = statusConfig[type];
  const Icon = config.icon;

  return (
    <div className="flex gap-3 items-start">
      <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', config.colorClass)} aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm text-text-primary">
          {message}
        </div>
        {description && (
          <div className="text-sm text-text-secondary mt-0.5">
            {description}
          </div>
        )}
      </div>
    </div>
  );
}
