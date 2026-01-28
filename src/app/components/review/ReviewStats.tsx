/**
 * 评价统计组件
 * 显示评分分布和统计信息
 */

import React from 'react';
import { Star, Image as ImageIcon, ShieldCheck } from 'lucide-react';
import { RatingStars } from './RatingStars';
import { ReviewStats as ReviewStatsType } from '@/app/services/reviewService';
import ReviewService from '@/app/services/reviewService';
import { cn } from '@/lib/utils';

// ==================== 类型定义 ====================

export interface ReviewStatsProps {
  stats: ReviewStatsType;
  onFilterByRating?: (rating: number) => void;
  className?: string;
}

// ==================== 组件 ====================

export function ReviewStats({
  stats,
  onFilterByRating,
  className,
}: ReviewStatsProps) {
  // 评分分布数据
  const ratingLevels = [5, 4, 3, 2, 1] as const;

  return (
    <div className={cn('bg-white border border-border rounded-lg p-6', className)}>
      <h3 className="text-lg font-semibold text-text-primary mb-6">
        用户评价
      </h3>

      {/* 总体评分 */}
      <div className="flex items-center gap-8 mb-8 pb-6 border-b border-border">
        {/* 平均分 */}
        <div className="text-center">
          <div className="text-5xl font-bold text-[#0056b3] mb-2">
            {stats.averageRating.toFixed(1)}
          </div>
          <RatingStars rating={stats.averageRating} size="lg" />
          <div className="text-sm text-text-secondary mt-2">
            {stats.totalReviews} 条评价
          </div>
        </div>

        {/* 统计信息 */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-[#0056b3]" />
            </div>
            <div>
              <div className="font-semibold text-text-primary">
                {stats.withImages}
              </div>
              <div className="text-xs text-text-secondary">有图评价</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="font-semibold text-text-primary">
                {stats.verifiedPurchase}
              </div>
              <div className="text-xs text-text-secondary">实名认证</div>
            </div>
          </div>
        </div>
      </div>

      {/* 评分分布 */}
      <div className="space-y-3">
        <h4 className="font-semibold text-text-primary mb-4">评分分布</h4>
        {ratingLevels.map((rating) => {
          const count = stats.ratingDistribution[rating];
          const percentage = ReviewService.getRatingPercentage(count, stats.totalReviews);

          return (
            <button
              key={rating}
              type="button"
              onClick={() => onFilterByRating?.(rating)}
              className="w-full flex items-center gap-3 group hover:bg-bg-secondary p-2 rounded-lg transition-colors focus-ring"
            >
              {/* 星级 */}
              <div className="flex items-center gap-1 w-20">
                <span className="text-sm font-medium text-text-primary">
                  {rating}
                </span>
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
              </div>

              {/* 进度条 */}
              <div className="flex-1 h-2 bg-bg-tertiary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {/* 数量和百分比 */}
              <div className="flex items-center gap-2 w-24 text-right">
                <span className="text-sm text-text-secondary">
                  {count}
                </span>
                <span className="text-sm font-medium text-text-primary w-12">
                  {percentage}%
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 提示 */}
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-xs text-text-tertiary">
          点击评分可筛选对应评价
        </p>
      </div>
    </div>
  );
}

export default ReviewStats;
