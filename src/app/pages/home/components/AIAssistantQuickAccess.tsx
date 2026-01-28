import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MessageCircle, Lock, ChevronRight } from 'lucide-react';
import { cn } from '@/app/components/design-system/utils';
import aiLogo from 'figma:asset/d687e8c6eaff439058d15cc055f57aadc55a2b38.png';

interface AIAssistantQuickAccessProps {
  compact?: boolean;
  className?: string;
}

export function AIAssistantQuickAccess({ compact = false, className }: AIAssistantQuickAccessProps) {
  const navigate = useNavigate();

  if (compact) {
    return (
      <div 
        onClick={() => navigate('/ai-assistant')}
        className={cn("h-full cursor-pointer hover:bg-neutral-50 transition-colors p-4 flex flex-col items-center justify-center text-center", className)}
      >
        <div className="w-16 h-16 rounded-full bg-white border border-neutral-100 shadow-md flex items-center justify-center mb-4">
          <img src={aiLogo} alt="AI Logo" className="w-8 h-8 object-contain" />
        </div>
        <h3 className="text-lg font-bold text-text-primary mb-2">AI健康助手</h3>
        <p className="text-sm text-text-secondary mb-4">24小时在线的私密健康顾问</p>
        <button className="px-6 py-2 bg-brand-deep-blue text-white rounded-full text-sm font-medium">
            开始对话
        </button>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-border">
          <div className="md:flex">
            {/* 左侧内容 */}
            <div className="md:w-2/3 p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-white border border-neutral-100 shadow-sm flex items-center justify-center">
                  <img src={aiLogo} alt="AI Logo" className="w-8 h-8 object-contain" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
                  AI健康助手
                </h2>
              </div>
              
              <p className="text-text-secondary mb-6 text-lg">
                24小时在线的私密健康顾问，为您提供专业建议、产品推荐和使用指导。所有对话都经过端到端加密保护。
              </p>

              {/* 功能特点 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-[#0056b3]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary mb-1">智能对话</h3>
                    <p className="text-sm text-text-secondary">自然语言交流，快速解答疑问</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-[#6B46C1]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary mb-1">个性化推荐</h3>
                    <p className="text-sm text-text-secondary">基于需求精准匹配产品</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary mb-1">隐私保护</h3>
                    <p className="text-sm text-text-secondary">端到端加密，数据本地存储</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-[#ED8936]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary mb-1">专业指导</h3>
                    <p className="text-sm text-text-secondary">健康建议和使用教程</p>
                  </div>
                </div>
              </div>

              {/* CTA按钮 */}
              <button
                onClick={() => navigate('/ai-assistant')}
                className="
                  w-full md:w-auto
                  px-8 py-4 
                  bg-gradient-to-r from-[#0056b3] to-[#6B46C1]
                  text-white 
                  rounded-xl 
                  font-semibold 
                  hover:shadow-lg 
                  transition-all
                  flex items-center justify-center gap-2
                  group
                "
              >
                <span>开始对话</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* 右侧装饰 */}
            <div className="md:w-1/3 bg-gradient-to-br from-[#0056b3] to-[#6B46C1] p-8 md:p-12 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl opacity-30" />
              <div className="relative z-10 text-center text-white">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center animate-pulse">
                   <img src={aiLogo} alt="AI Logo" className="w-16 h-16 object-contain filter brightness-0 invert" />
                </div>
                <p className="text-lg font-medium mb-2">随时为您服务</p>
                <p className="text-sm text-white/80">智能、专业、保密</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
