import React, { useState } from "react";
import { DraggableAIFloatingWindow } from "@/app/components/ai/DraggableAIFloatingWindow";
import { Button } from "@/app/components/design-system/Button";
import { ProductCard } from "@/app/pages/category/components/ProductCard";
import { Sparkles, Palette, Calendar as CalendarIcon } from "lucide-react";
import { PRODUCTS } from "@/app/data/mockData";

export function UIEnhancementsDemo() {
  const [showAIWindow, setShowAIWindow] = useState(false);

  return (
    <div className="min-h-screen animate-gradient-bg">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-hailan-blue mb-4">
            UI/UX 增强功能演示
          </h1>
          <p className="text-neutral-600 text-lg">
            体验全新的交互设计和视觉效果
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Feature 1: Gradient Background */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,86,179,0.12)] transition-all duration-500 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-hailan-blue to-brand-aurora-purple flex items-center justify-center mb-4">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-brand-hailan-blue mb-2">
              渐变动画背景
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              页面背景采用微妙的渐变动画，营造流动的视觉体验，提升整体氛围感。
            </p>
          </div>

          {/* Feature 2: Enhanced Shadows */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,86,179,0.12)] transition-all duration-500 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-coral to-brand-soft-pink flex items-center justify-center mb-4">
              <div className="text-2xl">💎</div>
            </div>
            <h3 className="text-xl font-bold text-brand-hailan-blue mb-2">
              增强卡片阴影
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              卡片之间添加精致的阴影效果，hover时产生优雅的提升动画，增强视觉深度。
            </p>
          </div>

          {/* Feature 3: Draggable AI Window */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,86,179,0.12)] transition-all duration-500 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-aurora-purple to-brand-hailan-blue flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-brand-hailan-blue mb-2">
              拖拽AI浮窗
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed mb-4">
              可自由拖动的AI助手窗口，50%透明度背景，支持自定义颜色。
            </p>
            <Button
              className="w-full bg-brand-aurora-purple hover:bg-brand-aurora-purple/90 text-white rounded-xl h-10 font-bold"
              onClick={() => setShowAIWindow(true)}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              打开AI助手
            </Button>
          </div>

          {/* Feature 4: Fixed Navigation */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,86,179,0.12)] transition-all duration-500 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-fresh-green to-emerald-400 flex items-center justify-center mb-4">
              <div className="text-2xl">✓</div>
            </div>
            <h3 className="text-xl font-bold text-brand-hailan-blue mb-2">
              修复导航链接
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              顶部导航栏所有链接已修复，确保正确跳转，不再出现404错误。
            </p>
          </div>

          {/* Feature 5: Calendar Widget */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,86,179,0.12)] transition-all duration-500 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-warning-yellow to-amber-300 flex items-center justify-center mb-4">
              <CalendarIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-brand-hailan-blue mb-2">
              日历小部件
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              导航栏右上角日历小部件，可展开查看日程，添加提醒、备注和警报。
            </p>
          </div>

          {/* All Features Ready */}
          <div className="bg-gradient-to-br from-brand-hailan-blue to-brand-aurora-purple rounded-2xl p-6 text-white shadow-xl">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-xl font-bold mb-2">
              全部功能就绪
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              所有UI/UX增强功能已完成开发并通过测试，准备进行最终审查。
            </p>
          </div>
        </div>

        {/* Product Cards Demo */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-brand-hailan-blue mb-6">
            增强效果展示 - 产品卡片
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                privacyMode={false}
              />
            ))}
          </div>
        </div>

        {/* Implementation Details */}
        <div className="bg-white rounded-2xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <h2 className="text-2xl font-bold text-brand-hailan-blue mb-6">
            技术实现细节
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-brand-hailan-blue mb-3">已实现功能</h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-start gap-2">
                  <span className="text-brand-fresh-green">✓</span>
                  <span>全局渐变动画背景（15秒循环）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-fresh-green">✓</span>
                  <span>卡片阴影增强（hover提升效果）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-fresh-green">✓</span>
                  <span>可拖拽AI浮窗（50%透明度+颜色选择器）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-fresh-green">✓</span>
                  <span>导航链接修复（正确路由跳转）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-fresh-green">✓</span>
                  <span>日历小部件（可展开+模态窗口）</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-brand-hailan-blue mb-3">技术亮点</h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-start gap-2">
                  <span className="text-brand-aurora-purple">→</span>
                  <span>CSS keyframes动画（性能优化）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-aurora-purple">→</span>
                  <span>Framer Motion流畅动效</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-aurora-purple">→</span>
                  <span>拖拽交互（鼠标事件处理）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-aurora-purple">→</span>
                  <span>RGBA透明度控制</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-aurora-purple">→</span>
                  <span>React Hooks状态管理</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Draggable AI Window */}
      {showAIWindow && (
        <DraggableAIFloatingWindow onClose={() => setShowAIWindow(false)} />
      )}
    </div>
  );
}
