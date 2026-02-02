import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  Sparkles, 
  MessageSquare, 
  ShoppingBag, 
  ArrowRight, 
  Volume2, 
  Activity,
  CheckCircle2,
  X
} from "lucide-react";
import { cn } from "@/app/components/design-system/utils";

const MOCK_GUIDANCE = [
  {
    id: 1,
    text: "基于您的 NAS 数据，检测到近期静息心率波动。建议搭配 Nebula Pulse 使用。",
    type: "health_insight"
  },
  {
    id: 2,
    text: "这款产品的‘深度减压’预设与您当前的压力指数高度契合。",
    type: "recommendation"
  },
  {
    id: 3,
    text: "您已拥有 Aero Link，该设备可实现毫秒级协同律动。",
    type: "ecosystem"
  }
];

export function ARSmartShopOverlay() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsTyping(false), 2000);
    return () => clearTimeout(timer);
  }, [currentStep]);

  if (!isVisible) return null;

  const guidance = MOCK_GUIDANCE[currentStep];

  return (
    <motion.div 
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="absolute right-4 top-24 bottom-32 w-72 z-30 pointer-events-none"
    >
      <div className="h-full flex flex-col pointer-events-auto">
        {/* AI Consultant Head */}
        <div className="bg-neutral-900/90 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 shadow-2xl space-y-6">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
                    <Brain className="w-5 h-5 text-white" />
                 </div>
                 <div>
                    <h4 className="text-white text-xs font-black uppercase tracking-widest">AI Consultant</h4>
                    <p className="text-[8px] text-emerald-400 font-bold uppercase tracking-tighter">Live Analysis Active</p>
                 </div>
              </div>
              <button 
                onClick={() => setIsVisible(false)}
                className="text-white/30 hover:text-white transition-colors"
              >
                 <X className="w-4 h-4" />
              </button>
           </div>

           {/* Message Bubble */}
           <div className="relative">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-white/90 text-[11px] leading-relaxed italic">
                 <AnimatePresence mode="wait">
                    {isTyping ? (
                      <motion.div 
                        key="typing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex gap-1"
                      >
                         <div className="w-1 h-1 bg-white/50 rounded-full animate-bounce" />
                         <div className="w-1 h-1 bg-white/50 rounded-full animate-bounce delay-75" />
                         <div className="w-1 h-1 bg-white/50 rounded-full animate-bounce delay-150" />
                      </motion.div>
                    ) : (
                      <motion.p
                        key="text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                         “{guidance.text}”
                      </motion.p>
                    )}
                 </AnimatePresence>
              </div>
              <div className="absolute -left-2 top-4 w-4 h-4 bg-white/5 border-l border-t border-white/5 rotate-[-45deg]" />
           </div>

           {/* Health Stats Mini View */}
           <div className="p-4 rounded-2xl bg-indigo-900/40 border border-indigo-500/20">
              <div className="flex items-center justify-between mb-2">
                 <span className="text-[9px] font-black text-indigo-300 uppercase">Personal Fit Score</span>
                 <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              </div>
              <div className="flex items-end gap-2">
                 <span className="text-2xl font-black text-white">94%</span>
                 <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "94%" }}
                      transition={{ duration: 1.5 }}
                      className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    />
                 </div>
              </div>
           </div>

           {/* Action Buttons */}
           <div className="space-y-2">
              <button 
                onClick={() => setCurrentStep((prev) => (prev + 1) % MOCK_GUIDANCE.length)}
                className="w-full h-10 rounded-xl bg-white text-neutral-900 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-gold transition-colors"
              >
                 <ArrowRight className="w-3 h-3" /> 下一个建议
              </button>
              <button className="w-full h-10 rounded-xl bg-white/10 text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 border border-white/10 hover:bg-white/20">
                 <ShoppingBag className="w-3 h-3" /> 立即选购方案
              </button>
           </div>
        </div>

        {/* Real-time Bio-feedback (Visual Only) */}
        <div className="mt-4 p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/5 space-y-3">
           <div className="flex items-center gap-2">
              <Volume2 className="w-3 h-3 text-white/50 animate-pulse" />
              <span className="text-[8px] font-black text-white/50 uppercase tracking-widest">AI Voice Guidance Active</span>
           </div>
           <div className="flex gap-1 h-6 items-center justify-center">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <motion.div 
                  key={i}
                  animate={{ height: [4, 16, 8, 20, 4][i % 5] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                  className="w-1 bg-brand-gold rounded-full"
                />
              ))}
           </div>
        </div>
      </div>
    </motion.div>
  );
}
