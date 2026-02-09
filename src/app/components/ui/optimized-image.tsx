/**
 * 优化图片组件
 * 提供懒加载、渐进式加载、错误处理、自动WebP转换等功能
 * @隐私保护 - 所有图片处理在客户端进行
 */

import React, { useState, useEffect, useRef } from 'react';
import { ImageOff, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  getOptimizedImageUrl, 
  getResponsiveImageSrcSet,
  IMAGE_SIZES 
} from '@/lib/imageOptimization';

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
  // 新增性能优化选项
  quality?: number;
  autoWebP?: boolean;
  responsive?: boolean;
  sizes?: string;
  priority?: boolean;
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
  quality = 85,
  autoWebP = true,
  responsive = true,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const [currentSrc, setCurrentSrc] = useState<string>(
    autoWebP ? getOptimizedImageUrl(src, { quality, format: 'webp' }) : src
  );
  const [srcSet, setSrcSet] = useState<string>('');
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

  // 生成响应式srcset
  useEffect(() => {
    if (responsive && autoWebP) {
      const responsiveSrcSet = getResponsiveImageSrcSet(src, [
        IMAGE_SIZES.small,
        IMAGE_SIZES.medium,
        IMAGE_SIZES.large,
      ]);
      setSrcSet(responsiveSrcSet);
    }
  }, [src, responsive, autoWebP]);

  // 更新 src
  useEffect(() => {
    const optimizedSrc = autoWebP 
      ? getOptimizedImageUrl(src, { quality, format: 'webp' }) 
      : src;
    
    if (optimizedSrc !== currentSrc && optimizedSrc !== fallbackSrc) {
      setCurrentSrc(optimizedSrc);
      setIsLoading(true);
      setHasError(false);
    }
  }, [src, autoWebP, quality]);

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
          srcSet={responsive ? srcSet : undefined}
          sizes={responsive ? sizes : undefined}
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
          loading={priority ? 'eager' : lazy ? 'lazy' : 'eager'}
          fetchPriority={priority ? 'high' : 'auto'}
          {...props}
        />
      )}
    </div>
  );
}

export default OptimizedImage;
