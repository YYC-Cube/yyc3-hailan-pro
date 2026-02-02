import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Brain, 
  Activity, 
  ArrowLeft, 
  MessageSquare, 
  Share2, 
  Zap, 
  Database,
  CheckCircle2,
  Lock,
  Stethoscope,
  Sparkles,
  Info
} from "lucide-react";
import { Navbar } from "@/app/components/layout/Navbar";
import { BottomNav } from "@/app/components/layout/BottomNav";
import { Button } from "@/app/components/ui/button";
import { GlassCard } from "@/app/components/design-system/GlassCard";
import { cn } from "@/app/components/design-system/utils";

export function ZKReportDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAnalysing, setIsAnalysing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnalysing(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-32">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-neutral-400 hover:text-neutral-900 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">返回社区</span>
        </button>

        {/* Report Header */}
        <header className="mb-12">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100 text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-6">
              <ShieldCheck className="w-3.5 h-3.5" />
              ZK-Proof Authenticated Report
           </div>
           <h1 className="text-3xl md:text-5xl font-black text-neutral-900 leading-tight mb-6">
              匿名数据报告：<br />
              <span className="text-brand-deep-blue">高压环境下 HRV 恢复路径分析</span>
           </h1>
           <div className="flex items-center gap-4 text-sm font-bold text-neutral-400">
              <div className="flex items-center gap-2">
                 <div className="w-6 h-6 rounded-full bg-neutral-200" />
                 <span>匿名用户 #8292</span>
              </div>
              <div className="w-px h-3 bg-neutral-200" />
              <span>发布于 2026-01-28</span>
           </div>
        </header>

        {/* The ZK Data Card */}
        <GlassCard className="p-8 border-neutral-100 mb-12 overflow-hidden relative">
           <div className="absolute top-0 right-0 p-6">
              <Database className="w-12 h-12 text-neutral-50" />
           </div>
           <h3 className="text-lg font-black mb-8 flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand-deep-blue" />
              脱敏原始数据趋势
           </h3>
           <div className="h-48 w-full flex items-end gap-2 mb-8">
              {[60, 45, 80, 55, 90, 70, 40, 65, 85, 50, 75, 95].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                   <motion.div 
                     initial={{ height: 0 }}
                     animate={{ height: `${h}%` }}
                     transition={{ delay: i * 0.05, duration: 1, ease: "easeOut" }}
                     className="w-full bg-brand-deep-blue/10 rounded-t-lg relative group"
                   >
                      <div className="absolute inset-0 bg-brand-deep-blue opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg" />
                   </motion.div>
                   <span className="text-[8px] font-black text-neutral-300">D{i+1}</span>
                </div>
              ))}
           </div>
           <p className="text-neutral-500 text-sm leading-relaxed">
              该数据经过本地 NAS 节点的 ZK-Proof 验证，确认心率变异性 (HRV) 在使用“深度减压”场景后有显著回升。
           </p>
        </GlassCard>

        {/* Expert AI Mentor Section */}
        <section className="space-y-6 relative">
           <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-black text-neutral-900 flex items-center gap-3">
                 <Brain className="w-6 h-6 text-indigo-600" />
                 专家 AI 导师深度解读
              </h3>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                 <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest underline">AI Expert Core v4.2</span>
              </div>
           </div>

           <AnimatePresence mode="wait">
              {isAnalysing ? (
                <motion.div 
                  key="analysing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-indigo-50/50 border border-indigo-100 rounded-[2.5rem] p-12 text-center"
                >
                   <div className="relative w-20 h-20 mx-auto mb-6">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-4 border-indigo-200 border-t-indigo-600 rounded-full"
                      />
                      <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-indigo-600 animate-pulse" />
                   </div>
                   <h4 className="text-lg font-bold text-indigo-900">正在调取医学知识库...</h4>
                   <p className="text-indigo-600/60 text-sm mt-2">基于零知识证明数据，进行多维度健康建模分析</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                   <div className="bg-white rounded-[2.5rem] p-8 border border-neutral-100 shadow-xl shadow-indigo-500/5 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600" />
                      <div className="flex items-start gap-6">
                         <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-600/20">
                            <Stethoscope className="w-8 h-8" />
                         </div>
                         <div className="space-y-4">
                            <h4 className="text-xl font-black text-neutral-900">生理心理学分析报告</h4>
                            <div className="space-y-4 text-neutral-600 text-sm leading-relaxed">
                               <p>
                                  根据 ZK 验证的趋势图，用户在第 5-8 天（D5-D8）的心率变异性（HRV）呈现 **“U型”恢复曲线**。从医学角度分析，这表明副交感神经系统的抑制状态正在逐步解除。
                               </p>
                               <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 flex gap-4">
                                  <Info className="w-5 h-5 text-indigo-500 shrink-0" />
                                  <p className="text-[13px] font-medium italic">
                                     “该用户在 D9 出现的波峰与‘深度减压’场景的触发频率呈正相关，初步证明其压力感知阀值（Stress Perception Threshold）得到了有效调节。”
                                  </p>
                               </div>
                               <p>
                                  **核心建议**：建议继续保持当前的自动化联动强度。若未来 HRV 基准值连续 3 天低于均线 15%，系统将自动建议启动“二级深度冥想”预设，以防止自主神经系统失调。
                               </p>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="grid md:grid-cols-2 gap-6">
                      <GlassCard className="p-6 border-indigo-50 bg-indigo-50/10">
                         <h5 className="text-sm font-black text-indigo-900 uppercase mb-4">关键指标解读</h5>
                         <div className="space-y-4">
                            <MetricItem label="自主神经平衡度" value="良 (Active)" color="text-emerald-500" />
                            <MetricItem label="压力韧性指数" value="提升 12%" color="text-indigo-600" />
                         </div>
                      </GlassCard>
                      <GlassCard className="p-6 border-brand-gold/10 bg-brand-gold/5">
                         <h5 className="text-sm font-black text-brand-gold uppercase mb-4">进阶操作建议</h5>
                         <div className="space-y-4">
                            <button className="w-full py-3 bg-neutral-900 text-white rounded-xl text-xs font-bold hover:bg-brand-deep-blue transition-all flex items-center justify-center gap-2">
                               <Zap className="w-3.5 h-3.5" /> 复制该成功场景配置
                            </button>
                         </div>
                      </GlassCard>
                   </div>
                </motion.div>
              )}
           </AnimatePresence>
        </section>

        {/* Footer Actions */}
        <footer className="mt-16 pt-8 border-t border-neutral-100 flex items-center justify-between">
           <div className="flex gap-4">
              <Button variant="ghost" className="h-12 px-6 rounded-xl border border-neutral-100 text-neutral-400 font-bold hover:bg-neutral-50">
                 <MessageSquare className="w-4 h-4 mr-2" /> 匿名探讨
              </Button>
              <Button variant="ghost" className="h-12 px-6 rounded-xl border border-neutral-100 text-neutral-400 font-bold hover:bg-neutral-50">
                 <Share2 className="w-4 h-4 mr-2" /> 导出脱敏报告
              </Button>
           </div>
           <div className="flex items-center gap-2 text-[10px] font-black text-neutral-300 uppercase">
              <Lock className="w-3 h-3" /> E2E Encrypted View
           </div>
        </footer>
      </main>

      <BottomNav />
    </div>
  );
}

function MetricItem({ label, value, color }: any) {
  return (
    <div className="flex items-center justify-between">
       <span className="text-xs font-bold text-neutral-500">{label}</span>
       <span className={cn("text-sm font-black", color)}>{value}</span>
    </div>
  );
}
