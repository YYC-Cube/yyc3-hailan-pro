/**
 * Rating 评分组件
 * 支持可访问性、键盘导航和色盲友好设计
 */

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RatingProps {
  /** 当前评分值 */
  value?: number;
  /** 最大星数 */
  max?: number;
  /** 是否只读 */
  readonly?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 大小 */
  size?: 'sm' | 'md' | 'lg';
  /** 评分改变回调 */
  onChange?: (value: number) => void;
  /** 自定义类名 */
  className?: string;
  /** 是否显示数字 */
  showNumber?: boolean;
  /** 是否允许半星 */
  allowHalf?: boolean;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export function Rating({
  value = 0,
  max = 5,
  readonly = false,
  disabled = false,
  size = 'md',
  onChange,
  className,
  showNumber = false,
  allowHalf = false,
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const displayValue = hoverValue !== null ? hoverValue : value;

  const handleClick = (index: number) => {
    if (readonly || disabled) return;
    const newValue = index + 1;
    onChange?.(newValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (readonly || disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleClick(index);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        if (index < max - 1) {
          const nextIndex = index + 1;
          setFocusedIndex(nextIndex);
          // Focus next star
          const nextStar = event.currentTarget.nextElementSibling as HTMLElement;
          nextStar?.focus();
        }
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        if (index > 0) {
          const prevIndex = index - 1;
          setFocusedIndex(prevIndex);
          // Focus previous star
          const prevStar = event.currentTarget.previousElementSibling as HTMLElement;
          prevStar?.focus();
        }
        break;
      case 'Home':
        event.preventDefault();
        setFocusedIndex(0);
        // Focus first star
        const firstStar = event.currentTarget.parentElement?.firstElementChild as HTMLElement;
        firstStar?.focus();
        break;
      case 'End':
        event.preventDefault();
        setFocusedIndex(max - 1);
        // Focus last star
        const lastStar = event.currentTarget.parentElement?.lastElementChild as HTMLElement;
        lastStar?.focus();
        break;
    }
  };

  return (
    <div
      className={cn('inline-flex items-center gap-2', className)}
      role="group"
      aria-label={`评分: ${value} 星（满分 ${max} 星）`}
    >
      <div className="inline-flex gap-0.5" role="radiogroup" aria-label="评分选择">
        {Array.from({ length: max }, (_, i) => {
          const starValue = i + 1;
          const isFilled = displayValue >= starValue;
          const isHalfFilled = allowHalf && displayValue >= starValue - 0.5 && displayValue < starValue;

          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={value === starValue}
              aria-label={`${starValue} 星`}
              disabled={readonly || disabled}
              tabIndex={readonly || disabled ? -1 : focusedIndex === i || (focusedIndex === -1 && i === 0) ? 0 : -1}
              onClick={() => handleClick(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onMouseEnter={() => !readonly && !disabled && setHoverValue(starValue)}
              onMouseLeave={() => !readonly && !disabled && setHoverValue(null)}
              onFocus={() => setFocusedIndex(i)}
              onBlur={() => setFocusedIndex(-1)}
              className={cn(
                'transition-colors-fast focus-ring rounded-sm',
                readonly || disabled ? 'cursor-default' : 'cursor-pointer hover:scale-110 transition-transform-standard'
              )}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  'transition-colors-fast',
                  isFilled || isHalfFilled
                    ? 'fill-yellow-500 text-yellow-500'
                    : 'text-gray-300',
                  disabled && 'opacity-50'
                )}
                strokeWidth={2}
                style={
                  isHalfFilled
                    ? {
                        background: 'linear-gradient(90deg, #eab308 50%, transparent 50%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }
                    : undefined
                }
              />
            </button>
          );
        })}
      </div>

      {showNumber && (
        <span
          className="text-sm font-medium text-text-secondary tabular-nums"
          aria-hidden="true"
        >
          {value.toFixed(1)}
        </span>
      )}

      {/* 屏幕阅读器提示 */}
      {!readonly && !disabled && (
        <span className="sr-only">
          使用方向键或鼠标点击星星进行评分。按 Home 键选择 1 星，按 End 键选�� {max} 星。
        </span>
      )}
    </div>
  );
}

/**
 * 只读评分显示组件
 */
export function RatingDisplay({
  value,
  max = 5,
  size = 'sm',
  showNumber = true,
  className,
}: Pick<RatingProps, 'value' | 'max' | 'size' | 'showNumber' | 'className'>) {
  return (
    <Rating
      value={value}
      max={max}
      size={size}
      readonly
      showNumber={showNumber}
      className={className}
    />
  );
}
