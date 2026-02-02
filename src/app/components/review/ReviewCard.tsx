/**
 * 评价卡片组件
 * 展示单条评价信息
 */

import React, { useState } from 'react';
import { ThumbsUp, ShieldCheck, Image as ImageIcon } from 'lucide-react';
import { RatingStars } from './RatingStars';
import { Review } from '@/app/services/reviewService';
import ReviewService from '@/app/services/reviewService';
import { Button } from '@/app/components/ui/button';
import { cn } from '@/lib/utils';

// ==================== 类型定义 ====================

export interface ReviewCardProps {
  review: Review;
  onImageClick?: (images: string[], startIndex: number) => void;
  className?: string;
}

// ==================== 组件 ====================

export function ReviewCard({
  review,
  onImageClick,
  className,
}: ReviewCardProps) {
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);

  // 标记有用
  const handleMarkHelpful = async () => {
    if (isHelpful) return;

    try {
      await ReviewService.markReviewHelpful(review.id);
      setIsHelpful(true);
      setHelpfulCount(prev => prev + 1);
    } catch (error) {
      console.error('标记有用失败:', error);
    }
  };

  // 格式化日期
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className={cn('bg-white border border-border rounded-lg p-6', className)}>
      {/* 用户信息 */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* 头像 */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
            {review.userName.charAt(0)}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-text-primary">
                {review.userName}
              </span>
              {review.isVerified && (
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <ShieldCheck className="w-3 h-3" />
                  <span>实名认证</span>
                </div>
              )}
              {review.isAnonymous && (
                <span className="text-xs text-text-tertiary px-2 py-0.5 bg-gray-100 rounded">
                  匿名
                </span>
              )}
            </div>
            <div className="text-sm text-text-secondary mt-0.5">
              {formatDate(review.createdAt)}
            </div>
          </div>
        </div>

        {/* 评分 */}
        <RatingStars rating={review.rating} size="sm" />
      </div>

      {/* 评价内容 */}
      <div className="mb-4">
        <p className="text-text-primary leading-relaxed whitespace-pre-wrap">
          {review.content}
        </p>
      </div>

      {/* 标签 */}
      {review.tags && review.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {review.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* 评价图片 */}
      {review.images && review.images.length > 0 && (
        <div className="mb-4">
          <div className="grid grid-cols-4 gap-2">
            {review.images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => onImageClick?.(
                  review.images!.map(img => img.url),
                  index
                )}
                className="relative aspect-square rounded-lg overflow-hidden group focus-ring"
              >
                <img
                  src={image.thumbnail || image.url}
                  alt={`评价图片 ${index + 1}`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/20 transition-colors flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 底部操作 */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleMarkHelpful}
          disabled={isHelpful}
          className={cn(
            'text-text-secondary hover:text-[#0056b3]',
            isHelpful && 'text-[#0056b3]'
          )}
        >
          <ThumbsUp className={cn('w-4 h-4 mr-1', isHelpful && 'fill-current')} />
          {isHelpful ? '已标记有用' : '有用'} ({helpfulCount})
        </Button>
      </div>
    </div>
  );
}

export default ReviewCard;
