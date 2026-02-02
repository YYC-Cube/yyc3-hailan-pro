/**
 * 评价列表组件
 * 显示商品评价列表，支持筛选和排序
 */

import React, { useState, useEffect } from 'react';
import { Filter, Image as ImageIcon, ShieldCheck, Loader2 } from 'lucide-react';
import { ReviewCard } from './ReviewCard';
import { ReviewStats } from './ReviewStats';
import ReviewService, { Review, ReviewFilter, ReviewStats as ReviewStatsType } from '@/app/services/reviewService';
import { Button } from '@/app/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { cn } from '@/lib/utils';

// ==================== 类型定义 ====================

export interface ReviewListProps {
  productId: string;
  className?: string;
}

// ==================== 组件 ====================

export function ReviewList({ productId, className }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStatsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<ReviewFilter>({});
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedImages, setSelectedImages] = useState<string[] | null>(null);
  const [imageStartIndex, setImageStartIndex] = useState(0);

  const pageSize = 10;

  // 加载评价数据
  useEffect(() => {
    loadReviews();
    loadStats();
  }, [productId, filter, page]);

  const loadReviews = async () => {
    try {
      setIsLoading(true);
      const result = await ReviewService.getProductReviews(productId, filter, page, pageSize);
      setReviews(result.reviews);
      setTotal(result.total);
    } catch (error) {
      console.error('加载评价失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const statsData = await ReviewService.getReviewStats(productId);
      setStats(statsData);
    } catch (error) {
      console.error('加载统计失败:', error);
    }
  };

  // 筛选评分
  const handleFilterByRating = (rating: number) => {
    setFilter(prev => ({
      ...prev,
      rating: prev.rating === rating ? undefined : rating,
    }));
    setPage(1);
  };

  // 筛选有图评价
  const handleFilterWithImages = () => {
    setFilter(prev => ({
      ...prev,
      withImages: !prev.withImages,
    }));
    setPage(1);
  };

  // 筛选实名评价
  const handleFilterVerified = () => {
    setFilter(prev => ({
      ...prev,
      verified: !prev.verified,
    }));
    setPage(1);
  };

  // 排序
  const handleSortChange = (value: string) => {
    setFilter(prev => ({
      ...prev,
      sortBy: value as ReviewFilter['sortBy'],
    }));
    setPage(1);
  };

  // 加载更多
  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  // 查看图片
  const handleImageClick = (images: string[], startIndex: number) => {
    setSelectedImages(images);
    setImageStartIndex(startIndex);
  };

  const hasMore = reviews.length < total;

  return (
    <div className={cn('space-y-6', className)}>
      {/* 评价统计 */}
      {stats && (
        <ReviewStats
          stats={stats}
          onFilterByRating={handleFilterByRating}
        />
      )}

      {/* 筛选和排序 */}
      <div className="bg-white border border-border rounded-lg p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* 筛选按钮 */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-text-tertiary" />
            <span className="text-sm font-medium text-text-secondary">筛选：</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleFilterWithImages}
            className={cn(
              filter.withImages && 'bg-blue-50 border-[#0056b3] text-[#0056b3]'
            )}
          >
            <ImageIcon className="w-4 h-4 mr-1" />
            有图评价
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleFilterVerified}
            className={cn(
              filter.verified && 'bg-green-50 border-green-600 text-green-700'
            )}
          >
            <ShieldCheck className="w-4 h-4 mr-1" />
            实名认证
          </Button>

          {filter.rating && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFilterByRating(filter.rating!)}
              className="bg-yellow-50 border-yellow-600 text-yellow-700"
            >
              {filter.rating} 星
            </Button>
          )}

          {/* 排序 */}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-text-secondary">排序：</span>
            <Select value={filter.sortBy || 'latest'} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">最新</SelectItem>
                <SelectItem value="helpful">最有用</SelectItem>
                <SelectItem value="rating_high">评分从高到低</SelectItem>
                <SelectItem value="rating_low">评分从低到高</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* 评价列表 */}
      <div className="space-y-4">
        {isLoading && page === 1 ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#0056b3]" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 bg-white border border-border rounded-lg">
            <p className="text-text-secondary">暂无评价</p>
          </div>
        ) : (
          <>
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onImageClick={handleImageClick}
              />
            ))}

            {/* 加载更多 */}
            {hasMore && (
              <div className="text-center pt-4">
                <Button
                  variant="outline"
                  onClick={handleLoadMore}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      加载中...
                    </>
                  ) : (
                    `加载更多 (${reviews.length}/${total})`
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* 图片查看器（简单版） */}
      {selectedImages && (
        <div
          className="fixed inset-0 z-50 bg-brand-navy/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImages(null)}
        >
          <button
            onClick={() => setSelectedImages(null)}
            className="absolute top-4 right-4 text-white text-xl hover:text-gray-300"
            aria-label="关闭"
          >
            ✕
          </button>
          <img
            src={selectedImages[imageStartIndex]}
            alt="评价图片"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default ReviewList;
