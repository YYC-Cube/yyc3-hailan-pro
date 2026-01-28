/**
 * 收藏按钮组件
 * 支持添加/取消收藏，带动画效果
 */

import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import FavoriteService from '@/app/services/favoriteService';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// ==================== 类型定义 ====================

export interface FavoriteButtonProps {
  productId: string;
  productName: string;
  productImage?: string;
  productPrice: number;
  productOriginalPrice?: number;
  inStock?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'icon' | 'text';
  className?: string;
  onToggle?: (isFavorite: boolean) => void;
}

// ==================== 组件 ====================

export function FavoriteButton({
  productId,
  productName,
  productImage,
  productPrice,
  productOriginalPrice,
  inStock = true,
  size = 'md',
  variant = 'icon',
  className,
  onToggle,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 检查收藏状态
  useEffect(() => {
    setIsFavorite(FavoriteService.isFavorite(productId));
  }, [productId]);

  // 切换收藏状态
  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;

    setIsLoading(true);

    try {
      if (isFavorite) {
        await FavoriteService.removeFavorite(productId);
        setIsFavorite(false);
        toast.success('已取消收藏');
        onToggle?.(false);
      } else {
        await FavoriteService.addFavorite(productId, {
          productName,
          productImage,
          productPrice,
          productOriginalPrice,
          inStock,
        });
        setIsFavorite(true);
        toast.success('已添加到收藏');
        onToggle?.(true);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '操作失败');
    } finally {
      setIsLoading(false);
    }
  };

  const sizeClasses = {
    sm: 'w-6 h-6 p-1',
    md: 'w-8 h-8 p-1.5',
    lg: 'w-10 h-10 p-2',
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  if (variant === 'text') {
    return (
      <button
        type="button"
        onClick={handleToggle}
        disabled={isLoading}
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all focus-ring',
          isFavorite
            ? 'bg-red-50 text-red-600 hover:bg-red-100'
            : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary',
          isLoading && 'opacity-50 cursor-not-allowed',
          className
        )}
        aria-label={isFavorite ? '取消收藏' : '添加收藏'}
      >
        <Heart
          className={cn(
            iconSizeClasses[size],
            isFavorite && 'fill-current',
            !isLoading && 'transition-transform hover:scale-110'
          )}
        />
        <span className="text-sm">
          {isFavorite ? '已收藏' : '收藏'}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isLoading}
      className={cn(
        'inline-flex items-center justify-center rounded-full transition-all focus-ring',
        sizeClasses[size],
        isFavorite
          ? 'bg-red-50 text-red-600 hover:bg-red-100'
          : 'bg-white/80 backdrop-blur text-text-secondary hover:bg-white',
        isLoading && 'opacity-50 cursor-not-allowed',
        className
      )}
      aria-label={isFavorite ? '取消收藏' : '添加收藏'}
    >
      <Heart
        className={cn(
          iconSizeClasses[size],
          isFavorite && 'fill-current animate-scale-in',
          !isLoading && 'transition-transform hover:scale-110'
        )}
      />
    </button>
  );
}

export default FavoriteButton;
