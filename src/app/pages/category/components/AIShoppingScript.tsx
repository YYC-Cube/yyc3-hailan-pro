import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, MessageSquare, ArrowRight, Brain, Cpu, Bot, ShieldCheck, Database } from "lucide-react";
import { cn } from "@/app/components/design-system/utils";
import { MainCategoryType } from "@/app/data/mockData";
import { useNavigate } from "react-router";

interface AIShoppingScriptProps {
  category: MainCategoryType | "ALL";
}

const scripts: Record<string, { title: string; questions: string[]; hint: string }> = {
  "CARE": {
    title: "AI 健康咨询模式",
    hint: "基于您的 NAS 本地健康库，提供针对性的身体护理与数据同步建议。",
    questions: [
      "基于我本周的 HRV，有什么建议？",
      "如何将盆底健康数据同步至 NAS？",
      "针对产后恢复，NAS 库中有哪些方案？",
      "有哪些提升睡眠质量的配套方案？"
    ]
  },
  "PLAY": {
    title: "AI 灵感探索模式",
    hint: "寻找创意灵感，所有偏好数据仅保存在您的私有 NAS 节点中。",
    questions: [
      "纪念日礼物的创意推荐？",
      "如何为双人生活增加新鲜感？",
      "有哪些适合初学者的探索工具？",
      "如何打造一个沉浸式的居家 SPA？"
    ]
  },
  "SMART": {
    title: "AI 智感导购模式",
    hint: "海蓝 AI 核心（NAS）正在运行，为您匹配最先进的生物反馈硬件。",
    questions: [
      "生物反馈传感器是如何工作的？",
      "哪些设备支持海蓝 App 远程互动？",
      "如何通过数据追踪我的好感度变化？",
      "App 隐私伪装模式如何配置？"
    ]
  },
  "ALL": {
    title: "AI 智能全能助手",
    hint: "已连接至 HaiLan-Core-Alpha-01。为您解答全方位疑问。",
    questions: [
      "如何选择最适合我的系列？",
      "海蓝的隐私配送政策是怎样的？",
      "如何成为海蓝 Elite 尊享会员？",
      "如何预约一对一在线健康顾问？"
    ]
  }
};

export function AIShoppingScript({ category }: AIShoppingScriptProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const currentScript = scripts[category] || scripts["ALL"];

  return (
    <div className="fixed bottom-24 right-6 z-40 md:bottom-10 md:right-10">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[320px] sm:w-[380px] bg-white/80 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-neutral-900 p-6 text-white relative">
              <div className="flex items-center gap-3 mb-1">
                 <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-brand-gold" />
                 </div>
                 <div>
                    <h3 className="font-bold text-lg">{currentScript.title}</h3>
                    <div className="flex items-center gap-2">
                       <div className="flex items-center gap-1 text-[9px] text-emerald-400 font-bold uppercase tracking-widest">
                          <Database className="w-2.5 h-2.5" />
                          NAS Core Connected
                       </div>
                    </div>
                 </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
                {currentScript.hint}
              </p>

              <div className="space-y-3 mb-8">
                {currentScript.questions.map((q, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => navigate('/ai-assistant')}
                    className="w-full text-left p-4 rounded-2xl bg-neutral-50 border border-neutral-100 text-sm font-bold text-neutral-700 hover:bg-neutral-100 hover:border-neutral-200 transition-all flex items-center justify-between group"
                  >
                    {q}
                    <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-brand-deep-blue group-hover:translate-x-1 transition-all" />
                  </motion.button>
                ))}
              </div>

              {/* Input Placeholder */}
              <div className="relative cursor-pointer" onClick={() => navigate('/ai-assistant')}>
                 <div className="w-full h-14 rounded-2xl bg-neutral-100 border-none pl-5 pr-12 text-sm font-medium text-neutral-400 flex items-center">
                    询问更多基于您数据的问题...
                 </div>
                 <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center text-white">
                    <MessageSquare className="w-4 h-4" />
                 </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-4">
                 <div className="flex items-center gap-1 text-[10px] text-neutral-400 font-bold">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    LOCAL_STORAGE_ENCRYPTED
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 md:w-20 md:h-20 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-500",
          isOpen 
            ? "bg-neutral-900 text-white rotate-0" 
            : "bg-white text-brand-deep-blue hover:shadow-brand-deep-blue/20"
        )}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              <X className="w-8 h-8" />
            </motion.div>
          ) : (
            <motion.div
              key="sparkles"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              className="relative"
            >
              <Sparkles className="w-8 h-8 md:w-10 md:h-10" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
