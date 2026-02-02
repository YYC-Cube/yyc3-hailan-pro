import React from 'react';
import { useNavigate } from 'react-router';
import { View, Target, Sparkles, Lock } from 'lucide-react';
import { cn } from '@/app/components/design-system/utils';

export const features = [
  {
    id: 'ar-viewer',
    icon: View,
    title: 'AR产品体验',
    description: '使用增强现实技术，在真实环境中预览产品效果',
    gradient: 'from-purple-500 to-pink-500',
    color: 'purple',
    path: '/ar-start',
    tag: '沉浸体验'
  },
  {
    id: 'quiz',
    icon: Target,
    title: '智能产品配对',
    description: '通过科学问卷，为您推荐最适合的产品',
    gradient: 'from-blue-500 to-cyan-500',
    color: 'blue',
    path: '/quiz-intro',
    tag: '精准推荐'
  }
];

interface FeatureCardProps {
  feature: typeof features[0];
  compact?: boolean;
  className?: string;
}

export function FeatureCard({ feature, compact = false, className }: FeatureCardProps) {
  const navigate = useNavigate();
  const Icon = feature.icon;

  return (
    <div
      onClick={() => navigate(feature.path)}
      className={cn(
        "group relative overflow-hidden bg-white border-2 border-border rounded-2xl hover:border-[#0056b3] transition-all cursor-pointer hover:shadow-xl",
        compact ? "h-full flex flex-col p-6" : "",
        className
      )}
    >
      {/* 背景渐变装饰 */}
      <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${feature.gradient} opacity-5 group-hover:opacity-10 transition-opacity blur-3xl`} />
      
      <div className={cn("relative z-10", compact ? "flex flex-col h-full" : "p-8")}>
        {/* 标签 */}
        <div className="flex items-center justify-between mb-6">
          <span className={`px-3 py-1 bg-gradient-to-r ${feature.gradient} text-white text-xs font-medium rounded-full`}>
            {feature.tag}
          </span>
          {!compact && (
            <div className="flex items-center gap-1 text-success text-xs">
              <Lock className="w-3 h-3" />
              <span>隐私保护</span>
            </div>
          )}
        </div>

        {/* 图标 */}
        <div className={cn(
            "rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6 group-hover:scale-110 transition-transform",
            feature.gradient,
            compact ? "w-12 h-12" : "w-16 h-16"
        )}>
          <Icon className={cn("text-white", compact ? "w-6 h-6" : "w-8 h-8")} />
        </div>

        {/* 标题和描述 */}
        <h3 className={cn("font-bold text-text-primary mb-3 group-hover:text-[#0056b3] transition-colors", compact ? "text-xl" : "text-2xl")}>
          {feature.title}
        </h3>
        <p className="text-text-secondary mb-6 leading-relaxed flex-1">
          {feature.description}
        </p>

        {/* 功能特点 - Only show in full mode */}
        {!compact && (
           <div className="space-y-2 mb-6">
             {feature.id === 'ar-viewer' && (
               <>
                 <div className="flex items-center gap-2 text-sm text-text-tertiary">
                   <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                   <span>实时AR预览，真实场景展示</span>
                 </div>
                 <div className="flex items-center gap-2 text-sm text-text-tertiary">
                   <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                   <span>尺寸对比，精准测量</span>
                 </div>
                 <div className="flex items-center gap-2 text-sm text-text-tertiary">
                   <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                   <span>本地处理，数据不上传</span>
                 </div>
               </>
             )}
             {feature.id === 'quiz' && (
               <>
                 <div className="flex items-center gap-2 text-sm text-text-tertiary">
                   <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                   <span>科学问卷，精准匹配</span>
                 </div>
                 <div className="flex items-center gap-2 text-sm text-text-tertiary">
                   <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                   <span>个性化推荐报告</span>
                 </div>
                 <div className="flex items-center gap-2 text-sm text-text-tertiary">
                   <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                   <span>匿名测试，加密存储</span>
                 </div>
               </>
             )}
           </div>
        )}

        {/* CTA按钮 */}
        <button className="w-full py-3 px-4 bg-bg-secondary group-hover:bg-[#0056b3] text-text-primary group-hover:text-white rounded-xl transition-colors font-medium flex items-center justify-center gap-2 mt-auto">
          <span>立即体验</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function SmartFeaturesGrid() {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-[#0056b3]" />
            <h2 className="text-3xl font-bold text-text-primary">智能功能</h2>
          </div>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            创新技术驱动，为您提供更精准、更私密、更专业的选购体验
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>

        {/* 底部说明 */}
        <div className="mt-10 p-6 bg-blue-50 rounded-2xl border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5 text-[#0056b3]" />
            </div>
            <div>
              <h4 className="font-semibold text-text-primary mb-2">隐私保护承诺</h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                所有智能功能均在本地设备上运行，AR图像处理不上传服务器，问卷数据加密存储，您拥有完全的数据控制权。我们承诺不会将您的任何数据用于其他目的。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
