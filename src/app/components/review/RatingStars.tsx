/**
 * 评分星星组件
 * 支持显示和交互式评分
 */

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

// ==================== 类型定义 ====================

export interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
  onChange?: (rating: number) => void;
  showNumber?: boolean;
  className?: string;
}

// ==================== 组件 ====================

export function RatingStars({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onChange,
  showNumber = false,
  className,
}: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  const displayRating = hoverRating !== null ? hoverRating : rating;
  const full = Math.floor(displayRating);
  const hasHalf = displayRating % 1 >= 0.5;

  const handleClick = (index: number) => {
    if (!interactive || !onChange) return;
    onChange(index + 1);
  };

  const handleMouseEnter = (index: number) => {
    if (!interactive) return;
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setHoverRating(null);
  };

  return (
    <div className={cn('inline-flex items-center gap-1', className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }).map((_, index) => {
          const isFilled = index < full;
          const isHalf = index === full && hasHalf;

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              disabled={!interactive}
              className={cn(
                'relative transition-transform',
                interactive && 'hover:scale-110 cursor-pointer focus-ring rounded',
                !interactive && 'cursor-default'
              )}
              aria-label={`${index + 1} 星`}
            >
              {/* 背景星星（空心） */}
              <Star
                className={cn(
                  sizeClasses[size],
                  'text-gray-300'
                )}
                strokeWidth={2}
              />

              {/* 填充星星 */}
              {(isFilled || isHalf) && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    width: isHalf ? '50%' : '100%',
                  }}
                >
                  <Star
                    className={cn(
                      sizeClasses[size],
                      interactive && hoverRating !== null
                        ? 'text-yellow-400'
                        : 'text-yellow-500',
                      'fill-current'
                    )}
                    strokeWidth={2}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* 显示数字评分 */}
      {showNumber && (
        <span className="text-sm font-medium text-text-primary ml-1">
          {displayRating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

export default RatingStars;
