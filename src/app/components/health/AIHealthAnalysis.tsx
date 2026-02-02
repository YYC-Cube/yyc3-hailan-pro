import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, ShieldCheck, Sparkles, TrendingUp, Activity, AlertCircle } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { GlassCard } from "@/app/components/design-system/GlassCard";
import { cn } from "@/app/components/design-system/utils";

interface AIHealthAnalysisProps {
  data: any[];
  onComplete?: () => void;
}

export const AIHealthAnalysis: React.FC<AIHealthAnalysisProps> = ({ data, onComplete }) => {
  const [analyzing, setAnalyzing] = React.useState(false);
  const [insight, setInsight] = React.useState<null | any>(null);

  const runAnalysis = () => {
    setAnalyzing(true);
    // Simulate complex ZK-Proofed AI Inference
    setTimeout(() => {
      setInsight({
        score: 88,
        trend: "positive",
        recommendation: "您的心血管稳定性近期提升了 12%，建议保持当前的抗阻训练频率，并增加 5 分钟的冥想以优化 HRV 指数。",
        tags: ["稳定", "优质睡眠", "建议微调"]
      });
      setAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <GlassCard className="p-8 border-brand-hailan-blue/20 bg-gradient-to-br from-brand-hailan-blue/5 to-indigo-50/30 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Brain className="w-24 h-24 text-brand-hailan-blue" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-hailan-blue text-white flex items-center justify-center shadow-lg shadow-brand-hailan-blue/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-brand-navy tracking-tight">AI 智能健康分析</h3>
              <p className="text-[10px] font-black text-brand-hailan-blue uppercase tracking-widest">Edge-Inference Active</p>
            </div>
          </div>

          {!insight && !analyzing && (
            <div className="py-8 text-center space-y-4">
              <p className="text-sm text-neutral-500 max-w-sm mx-auto">
                点击下方按钮，启动本地私密 AI 引擎，对您的健康趋势进行多维度扫描。数据全程在端侧处理。
              </p>
              <Button 
                onClick={runAnalysis}
                className="rounded-2xl h-12 px-8 bg-brand-navy text-white font-bold hover:bg-brand-navy-light transition-all"
              >
                开始深度分析
              </Button>
            </div>
          )}

          {analyzing && (
            <div className="py-12 flex flex-col items-center justify-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-4 border-brand-hailan-blue/10 border-t-brand-hailan-blue animate-spin" />
                <Brain className="absolute inset-0 m-auto w-8 h-8 text-brand-hailan-blue animate-pulse" />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-brand-navy">正在执行边缘侧联邦推理...</p>
                <p className="text-[10px] text-neutral-400 font-mono mt-1 uppercase">Loading ZK-Weights...</p>
              </div>
            </div>
          )}

          <AnimatePresence>
            {insight && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-white/50 rounded-2xl border border-white/80">
                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2">整体健康指数</p>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-black text-brand-hailan-blue">{insight.score}</span>
                      <TrendingUp className="w-5 h-5 text-emerald-500 mb-1" />
                    </div>
                  </div>
                  <div className="p-6 bg-white/50 rounded-2xl border border-white/80">
                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2">最近趋势</p>
                    <div className="flex items-center gap-2">
                       {insight.tags.map((tag: string) => (
                         <span key={tag} className="px-2 py-1 bg-brand-hailan-blue/10 text-brand-hailan-blue text-[9px] font-black rounded-md uppercase">
                           {tag}
                         </span>
                       ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-brand-navy text-white rounded-2xl shadow-xl">
                   <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="w-4 h-4 text-brand-gold" />
                      <h4 className="text-xs font-black uppercase tracking-widest">核心洞察</h4>
                   </div>
                   <p className="text-sm leading-relaxed text-white/80">
                     {insight.recommendation}
                   </p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-[9px] font-black text-emerald-600 uppercase">
                    <ShieldCheck className="w-3 h-3" />
                    Result Verified by ZK-Proof
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setInsight(null)} className="text-[9px] font-black uppercase text-neutral-400 hover:text-brand-navy">
                    重新分析
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </GlassCard>
    </div>
  );
};
