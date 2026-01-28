/**
 * 优化图片组件
 * 提供懒加载、渐进式加载、错误处理等功能
 */

import React, { useState, useEffect, useRef } from 'react';
import { ImageOff, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// ==================== 类型定义 ====================

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  lazy?: boolean;
  blur?: boolean;
  aspectRatio?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  showLoader?: boolean;
  onLoadSuccess?: () => void;
  onLoadError?: () => void;
}

// ==================== 组件 ====================

export function OptimizedImage({
  src,
  alt,
  fallbackSrc,
  lazy = true,
  blur = true,
  aspectRatio,
  objectFit = 'cover',
  showLoader = true,
  onLoadSuccess,
  onLoadError,
  className,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 懒加载 Intersection Observer
  useEffect(() => {
    if (!lazy || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [lazy]);

  // 图片加载成功
  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoadSuccess?.();
  };

  // 图片加载失败
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    
    // 尝试使用 fallback
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
      setIsLoading(true);
    } else {
      onLoadError?.();
    }
  };

  // 更新 src
  useEffect(() => {
    if (src !== currentSrc && src !== fallbackSrc) {
      setCurrentSrc(src);
      setIsLoading(true);
      setHasError(false);
    }
  }, [src]);

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden bg-bg-secondary', className)}
      style={{
        aspectRatio: aspectRatio,
      }}
    >
      {/* 加载中 */}
      {isLoading && showLoader && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-text-tertiary" />
        </div>
      )}

      {/* 错误状态 */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-text-tertiary">
          <ImageOff className="w-12 h-12 mb-2" />
          <span className="text-sm">图片加载失败</span>
        </div>
      )}

      {/* 图片 */}
      {isInView && !hasError && (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'w-full h-full transition-opacity duration-300',
            isLoading && blur && 'blur-sm opacity-0',
            !isLoading && 'opacity-100',
            objectFit === 'contain' && 'object-contain',
            objectFit === 'cover' && 'object-cover',
            objectFit === 'fill' && 'object-fill',
            objectFit === 'none' && 'object-none',
            objectFit === 'scale-down' && 'object-scale-down'
          )}
          loading={lazy ? 'lazy' : 'eager'}
          {...props}
        />
      )}
    </div>
  );
}

export default OptimizedImage;
