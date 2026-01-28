/**
 * 评价表单组件
 * 用于创建和提交商品评价
 */

import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, Check } from 'lucide-react';
import { RatingStars } from './RatingStars';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { Checkbox } from '@/app/components/ui/checkbox';
import ReviewService, { CreateReviewRequest } from '@/app/services/reviewService';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// ==================== 类型定义 ====================

export interface ReviewFormProps {
  productId: string;
  orderId: string;
  productName: string;
  productImage?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  className?: string;
}

// ==================== 组件 ====================

export function ReviewForm({
  productId,
  orderId,
  productName,
  productImage,
  onSuccess,
  onCancel,
  className,
}: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 可选标签
  const availableTags = [
    '质量好',
    '物流快',
    '包装好',
    '隐私保护',
    '性价比高',
    '舒适',
    '推荐',
    '值得购买',
  ];

  // 处理图片选择
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (images.length + files.length > 5) {
      toast.error('最多只能上传5张图片');
      return;
    }

    // 验证文件大小和类型
    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} 文件过大，请选择小于5MB的图片`);
        return false;
      }
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} 不是图片文件`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setImages(prev => [...prev, ...validFiles]);
      
      // 生成预览
      validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreviews(prev => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // 删除图片
  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // 切换标签选择
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // 提交评价
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 验证
    if (rating === 0) {
      toast.error('请选择评分');
      return;
    }

    if (content.trim().length < 10) {
      toast.error('评价内容不能少于10个字');
      return;
    }

    setIsSubmitting(true);

    try {
      const request: CreateReviewRequest = {
        productId,
        orderId,
        rating,
        content: content.trim(),
        images: images.length > 0 ? images : undefined,
        tags: selectedTags.length > 0 ? selectedTags : undefined,
        isAnonymous,
      };

      await ReviewService.createReview(request);
      
      toast.success('评价提交成功！');
      
      // 重置表单
      setRating(5);
      setContent('');
      setImages([]);
      setImagePreviews([]);
      setSelectedTags([]);
      setIsAnonymous(false);
      
      onSuccess?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '提交失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-6', className)}>
      {/* 商品信息 */}
      <div className="flex items-center gap-4 p-4 bg-bg-secondary rounded-lg">
        {productImage && (
          <img
            src={productImage}
            alt={productName}
            className="w-16 h-16 rounded-lg object-cover"
          />
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-text-primary">{productName}</h3>
          <p className="text-sm text-text-secondary">订单号：{orderId}</p>
        </div>
      </div>

      {/* 评分 */}
      <div>
        <Label className="mb-2 block">
          整体评分 <span className="text-red-500">*</span>
        </Label>
        <RatingStars
          rating={rating}
          size="xl"
          interactive
          onChange={setRating}
          showNumber
        />
      </div>

      {/* 评价内容 */}
      <div>
        <Label htmlFor="review-content" className="mb-2 block">
          评价内容 <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="review-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="请分享您的使用体验（至少10个字）"
          rows={5}
          maxLength={500}
          className="resize-none"
        />
        <div className="text-xs text-text-tertiary mt-1 text-right">
          {content.length} / 500
        </div>
      </div>

      {/* 标签 */}
      <div>
        <Label className="mb-2 block">评价标签（可选）</Label>
        <div className="flex flex-wrap gap-2">
          {availableTags.map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={cn(
                'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
                selectedTags.includes(tag)
                  ? 'bg-[#0056b3] text-white'
                  : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary'
              )}
            >
              {selectedTags.includes(tag) && (
                <Check className="w-3 h-3 inline mr-1" />
              )}
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 图片上传 */}
      <div>
        <Label className="mb-2 block">
          上传图片（可选，最多5张）
        </Label>
        <div className="grid grid-cols-5 gap-3">
          {/* 已上传的图片 */}
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative aspect-square">
              <img
                src={preview}
                alt={`评价图片 ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="删除图片"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* 上传按钮 */}
          {images.length < 5 && (
            <label className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#0056b3] hover:bg-blue-50 transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                className="hidden"
              />
              <Upload className="w-6 h-6 text-text-tertiary mb-1" />
              <span className="text-xs text-text-tertiary">上传图片</span>
            </label>
          )}
        </div>
        <p className="text-xs text-text-tertiary mt-2">
          支持 JPG、PNG 格式，单张图片不超过 5MB
        </p>
      </div>

      {/* 匿名评价 */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="anonymous"
          checked={isAnonymous}
          onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
        />
        <Label htmlFor="anonymous" className="cursor-pointer">
          匿名评价（不显示用户名）
        </Label>
      </div>

      {/* 提交按钮 */}
      <div className="flex gap-3 pt-4">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1"
          >
            取消
          </Button>
        )}
        <Button
          type="submit"
          disabled={isSubmitting || content.trim().length < 10}
          className="flex-1"
        >
          {isSubmitting ? '提交中...' : '提交评价'}
        </Button>
      </div>
    </form>
  );
}

export default ReviewForm;
