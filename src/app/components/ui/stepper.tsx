/**
 * Stepper 步骤指示器组件
 * 支持可访问性、键盘导航和响应式设计
 */

import React from 'react';
import { Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Step {
  /** 步骤标题 */
  label: string;
  /** 步骤描述（可选） */
  description?: string;
  /** 步骤图标（可选） */
  icon?: React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
}

export interface StepperProps {
  /** 步骤列表 */
  steps: Step[];
  /** 当前步骤索引（从0开始） */
  currentStep: number;
  /** 点击步骤回调 */
  onStepClick?: (step: number) => void;
  /** 方向 */
  orientation?: 'horizontal' | 'vertical';
  /** 自定义类名 */
  className?: string;
  /** 是否显示描述 */
  showDescription?: boolean;
  /** 大小 */
  size?: 'sm' | 'md' | 'lg';
  /** 是否允许点击已完成的步骤 */
  clickable?: boolean;
}

const sizeClasses = {
  sm: {
    circle: 'w-8 h-8 text-sm',
    font: 'text-sm',
    gap: 'gap-1',
  },
  md: {
    circle: 'w-10 h-10 text-base',
    font: 'text-base',
    gap: 'gap-2',
  },
  lg: {
    circle: 'w-12 h-12 text-lg',
    font: 'text-lg',
    gap: 'gap-3',
  },
};

export function Stepper({
  steps,
  currentStep,
  onStepClick,
  orientation = 'horizontal',
  className,
  showDescription = true,
  size = 'md',
  clickable = false,
}: StepperProps) {
  const isStepComplete = (index: number) => index < currentStep;
  const isStepCurrent = (index: number) => index === currentStep;
  const isStepUpcoming = (index: number) => index > currentStep;

  const handleStepClick = (index: number) => {
    if (!clickable) return;
    if (steps[index].disabled) return;
    if (isStepComplete(index) || isStepCurrent(index)) {
      onStepClick?.(index);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (!clickable) return;
    if (steps[index].disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleStepClick(index);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        if (orientation === 'horizontal' || orientation === 'vertical') {
          const nextIndex = Math.min(index + 1, steps.length - 1);
          const nextButton = event.currentTarget.parentElement?.nextElementSibling?.querySelector('button');
          nextButton?.focus();
        }
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        if (orientation === 'horizontal' || orientation === 'vertical') {
          const prevIndex = Math.max(index - 1, 0);
          const prevButton = event.currentTarget.parentElement?.previousElementSibling?.querySelector('button');
          prevButton?.focus();
        }
        break;
      case 'Home':
        event.preventDefault();
        const firstButton = event.currentTarget.parentElement?.parentElement?.firstElementChild?.querySelector('button');
        firstButton?.focus();
        break;
      case 'End':
        event.preventDefault();
        const lastButton = event.currentTarget.parentElement?.parentElement?.lastElementChild?.querySelector('button');
        lastButton?.focus();
        break;
    }
  };

  if (orientation === 'vertical') {
    return (
      <div
        className={cn('flex flex-col', className)}
        role="navigation"
        aria-label="步骤进度"
      >
        {steps.map((step, index) => {
          const isComplete = isStepComplete(index);
          const isCurrent = isStepCurrent(index);
          const isUpcoming = isStepUpcoming(index);
          const isDisabled = step.disabled;

          return (
            <div key={index} className="flex gap-3">
              {/* 左侧指示器 */}
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => handleStepClick(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  disabled={isDisabled || (!clickable && !isCurrent)}
                  aria-current={isCurrent ? 'step' : undefined}
                  aria-label={`步骤 ${index + 1}: ${step.label}`}
                  className={cn(
                    sizeClasses[size].circle,
                    'rounded-full flex items-center justify-center font-semibold transition-all focus-ring',
                    isComplete && 'bg-success text-white',
                    isCurrent && 'bg-[#0056b3] text-white ring-4 ring-blue-100',
                    isUpcoming && 'bg-bg-secondary text-text-tertiary',
                    isDisabled && 'opacity-50 cursor-not-allowed',
                    clickable && !isDisabled && (isComplete || isCurrent) && 'cursor-pointer hover:scale-110 transition-transform'
                  )}
                >
                  {isComplete ? (
                    <Check className="w-5 h-5" strokeWidth={3} />
                  ) : step.icon ? (
                    step.icon
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </button>

                {/* 连接线 */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'w-0.5 flex-1 min-h-[40px] mt-2',
                      isComplete ? 'bg-success' : 'bg-border'
                    )}
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* 右侧内容 */}
              <div className={cn('flex-1 pb-8', sizeClasses[size].gap)}>
                <div
                  className={cn(
                    sizeClasses[size].font,
                    'font-semibold',
                    isCurrent ? 'text-text-primary' : 'text-text-secondary'
                  )}
                >
                  {step.label}
                </div>
                {showDescription && step.description && (
                  <div className="text-sm text-text-tertiary mt-1">
                    {step.description}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // 水平方向
  return (
    <div
      className={cn('w-full', className)}
      role="navigation"
      aria-label="步骤进度"
    >
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isComplete = isStepComplete(index);
          const isCurrent = isStepCurrent(index);
          const isUpcoming = isStepUpcoming(index);
          const isDisabled = step.disabled;

          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center flex-1 min-w-0">
                {/* 圆圈指示器 */}
                <button
                  type="button"
                  onClick={() => handleStepClick(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  disabled={isDisabled || (!clickable && !isCurrent)}
                  aria-current={isCurrent ? 'step' : undefined}
                  aria-label={`步骤 ${index + 1}: ${step.label}`}
                  className={cn(
                    sizeClasses[size].circle,
                    'rounded-full flex items-center justify-center font-semibold transition-all focus-ring',
                    isComplete && 'bg-success text-white',
                    isCurrent && 'bg-[#0056b3] text-white ring-4 ring-blue-100',
                    isUpcoming && 'bg-bg-secondary text-text-tertiary',
                    isDisabled && 'opacity-50 cursor-not-allowed',
                    clickable && !isDisabled && (isComplete || isCurrent) && 'cursor-pointer hover:scale-110 transition-transform'
                  )}
                >
                  {isComplete ? (
                    <Check className="w-5 h-5" strokeWidth={3} aria-label="已完成" />
                  ) : step.icon ? (
                    step.icon
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </button>

                {/* 标签 */}
                <div className="mt-2 text-center px-1">
                  <div
                    className={cn(
                      'text-sm font-medium',
                      isCurrent ? 'text-text-primary' : 'text-text-secondary',
                      'hidden sm:block'
                    )}
                  >
                    {step.label}
                  </div>
                  {showDescription && step.description && (
                    <div className="text-xs text-text-tertiary mt-0.5 hidden md:block">
                      {step.description}
                    </div>
                  )}
                </div>
              </div>

              {/* 连接线 */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-2 transition-colors',
                    isComplete ? 'bg-success' : 'bg-border'
                  )}
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* 移动端当前步骤显示 */}
      <div className="mt-4 text-center sm:hidden">
        <div className="text-sm font-medium text-text-primary">
          {steps[currentStep]?.label}
        </div>
        {showDescription && steps[currentStep]?.description && (
          <div className="text-xs text-text-tertiary mt-1">
            {steps[currentStep].description}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 简单的步骤进度条
 */
export function StepperProgress({
  current,
  total,
  className,
}: {
  current: number;
  total: number;
  className?: string;
}) {
  const percentage = (current / total) * 100;

  return (
    <div className={cn('w-full', className)} role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total}>
      <div className="flex justify-between text-sm text-text-secondary mb-2">
        <span>步骤 {current} / {total}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-[#0056b3] transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
