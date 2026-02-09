/**
 * 图片优化工具库
 * 提供图片格式转换、尺寸优化、懒加载等功能
 * @隐私保护 - 所有图片处理在本地进行，不上传服务器
 */

// ==================== 类型定义 ====================

export interface ImageOptimizationConfig {
  quality?: number;
  width?: number;
  height?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

export interface CDNConfig {
  domain: string;
  params?: Record<string, string | number>;
}

// ==================== 常量定义 ====================

// 图片尺寸预设
export const IMAGE_SIZES = {
  thumbnail: 200,
  small: 400,
  medium: 800,
  large: 1200,
  xlarge: 1920,
} as const;

// 质量预设
export const IMAGE_QUALITY = {
  low: 60,
  medium: 75,
  high: 85,
  ultra: 95,
} as const;

// 支持的图片格式
export const SUPPORTED_FORMATS = ['webp', 'jpeg', 'jpg', 'png', 'gif', 'svg'] as const;

// ==================== 工具函数 ====================

/**
 * 获取优化后的图片URL
 * @param src - 原始图片URL
 * @param config - 优化配置
 * @returns 优化后的URL
 */
export function getOptimizedImageUrl(
  src: string,
  config: ImageOptimizationConfig = {}
): string {
  const { quality = IMAGE_QUALITY.high, width, height, format = 'webp' } = config;

  // 本地图片不做优化
  if (src.startsWith('/') || src.startsWith('./')) {
    return src;
  }

  // Unsplash图片优化
  if (src.includes('unsplash.com')) {
    const url = new URL(src);
    url.searchParams.set('q', quality.toString());
    url.searchParams.set('fm', format);
    url.searchParams.set('fit', 'crop');
    url.searchParams.set('auto', 'format');
    if (width) url.searchParams.set('w', width.toString());
    if (height) url.searchParams.set('h', height.toString());
    return url.toString();
  }

  // 其他外部图片，返回原URL
  return src;
}

/**
 * 获取响应式图片srcset
 * @param src - 原始图片URL
 * @param sizes - 尺寸数组
 * @returns srcset字符串
 */
export function getResponsiveImageSrcSet(
  src: string,
  sizes: number[] = [IMAGE_SIZES.small, IMAGE_SIZES.medium, IMAGE_SIZES.large]
): string {
  return sizes
    .map((width) => {
      const optimizedUrl = getOptimizedImageUrl(src, { width, format: 'webp' });
      return `${optimizedUrl} ${width}w`;
    })
    .join(', ');
}

/**
 * 检测浏览器是否支持WebP
 * @returns Promise<boolean>
 */
export function checkWebPSupport(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = function () {
      resolve(webP.height === 2);
    };
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

/**
 * 获取图片的最佳格式
 * @param originalFormat - 原始格式
 * @returns 最佳格式
 */
export async function getBestImageFormat(originalFormat: string): Promise<'webp' | 'jpeg' | 'png'> {
  const supportsWebP = await checkWebPSupport();
  
  // SVG和GIF保持原格式
  if (originalFormat === 'svg' || originalFormat === 'gif') {
    return 'png';
  }

  // 支持WebP则使用WebP
  if (supportsWebP) {
    return 'webp';
  }

  // PNG透明图使用PNG，其他使用JPEG
  return originalFormat === 'png' ? 'png' : 'jpeg';
}

/**
 * 预加载关键图片
 * @param urls - 图片URL数组
 */
export function preloadImages(urls: string[]): void {
  urls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
}

/**
 * 懒加载图片
 * @param imageElement - 图片元素
 * @param options - IntersectionObserver选项
 */
export function lazyLoadImage(
  imageElement: HTMLImageElement,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px',
    threshold: 0.01,
    ...options,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        const srcset = img.dataset.srcset;

        if (src) img.src = src;
        if (srcset) img.srcset = srcset;

        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  }, defaultOptions);

  observer.observe(imageElement);
  return observer;
}

/**
 * 计算图片占位尺寸（保持宽高比）
 * @param originalWidth - 原始宽度
 * @param originalHeight - 原始高度
 * @param targetWidth - 目标宽度
 * @returns 计算后的尺寸
 */
export function calculateAspectRatio(
  originalWidth: number,
  originalHeight: number,
  targetWidth: number
): { width: number; height: number } {
  const aspectRatio = originalHeight / originalWidth;
  return {
    width: targetWidth,
    height: Math.round(targetWidth * aspectRatio),
  };
}

/**
 * 获取图片占位符（Base64编码的模糊图）
 * @param width - 宽度
 * @param height - 高度
 * @param color - 背景色
 * @returns Base64编码的占位符
 */
export function getPlaceholderImage(
  width: number = 10,
  height: number = 10,
  color: string = '#e5e7eb'
): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
  }
  
  return canvas.toDataURL('image/png');
}

// ==================== CDN优化 ====================

/**
 * 配置CDN参数
 * @param src - 原始URL
 * @param config - CDN配置
 * @returns 带CDN参数的URL
 */
export function applyCDNConfig(src: string, config: CDNConfig): string {
  if (!config.params || Object.keys(config.params).length === 0) {
    return src;
  }

  const url = new URL(src.startsWith('http') ? src : `${config.domain}${src}`);
  
  Object.entries(config.params).forEach(([key, value]) => {
    url.searchParams.set(key, value.toString());
  });

  return url.toString();
}

// ==================== 性能监控 ====================

/**
 * 监控图片加载性能
 * @param imageUrl - 图片URL
 * @returns 加载时间（毫秒）
 */
export function measureImageLoadTime(imageUrl: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const startTime = performance.now();
    const img = new Image();

    img.onload = () => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      console.log(`[v0] Image loaded: ${imageUrl} in ${loadTime.toFixed(2)}ms`);
      resolve(loadTime);
    };

    img.onerror = () => {
      reject(new Error(`Failed to load image: ${imageUrl}`));
    };

    img.src = imageUrl;
  });
}

/**
 * 批量测量图片加载性能
 * @param imageUrls - 图片URL数组
 * @returns 平均加载时间
 */
export async function measureBatchImageLoadTime(imageUrls: string[]): Promise<number> {
  const loadTimes = await Promise.all(
    imageUrls.map((url) => measureImageLoadTime(url).catch(() => 0))
  );
  
  const validLoadTimes = loadTimes.filter((time) => time > 0);
  const averageLoadTime = validLoadTimes.reduce((sum, time) => sum + time, 0) / validLoadTimes.length;
  
  console.log(`[v0] Average image load time: ${averageLoadTime.toFixed(2)}ms`);
  return averageLoadTime;
}

// ==================== 导出 ====================

export default {
  getOptimizedImageUrl,
  getResponsiveImageSrcSet,
  checkWebPSupport,
  getBestImageFormat,
  preloadImages,
  lazyLoadImage,
  calculateAspectRatio,
  getPlaceholderImage,
  applyCDNConfig,
  measureImageLoadTime,
  measureBatchImageLoadTime,
  IMAGE_SIZES,
  IMAGE_QUALITY,
  SUPPORTED_FORMATS,
};
