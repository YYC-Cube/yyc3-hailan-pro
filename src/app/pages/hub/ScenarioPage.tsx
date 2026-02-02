import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Activity, 
  Wind, 
  Moon, 
  Sun, 
  Bell, 
  ChevronRight, 
  Plus, 
  Settings, 
  ShieldCheck, 
  Database,
  ArrowRight,
  Play,
  Clock,
  Heart,
  Brain
} from "lucide-react";
import { Navbar } from "@/app/components/layout/Navbar";
import { BottomNav } from "@/app/components/layout/BottomNav";
import { Button } from "@/app/components/ui/button";
import { GlassCard } from "@/app/components/design-system/GlassCard";
import { cn } from "@/app/components/design-system/utils";

const MOCK_SCENARIOS = [
  {
    id: "sc-01",
    name: "深度减压闭环",
    trigger: "当压力值 (Stress) > 75 且持续 15 分钟",
    action: "激活 Essence Diffuser (冥想模式) + Nebula Pulse (静谧脉冲)",
    isActive: true,
    lastRun: "Yesterday, 22:30",
    icon: Brain,
    color: "text-indigo-500",
    bg: "bg-indigo-50"
  },
  {
    id: "sc-02",
    name: "生理期温感呵护",
    trigger: "健康记录：生理期首日",
    action: "推送温感按摩建议 + 调整 Aero Link 为恒温模式",
    isActive: true,
    lastRun: "12 Days ago",
    icon: Activity,
    color: "text-rose-500",
    bg: "bg-rose-50"
  },
  {
    id: "sc-03",
    name: "晨间活力唤醒",
    trigger: "检测到清醒状态且心率开始回升",
    action: "开启自然光氛围灯 + 同步健康摘要至 App",
    isActive: false,
    lastRun: "Never",
    icon: Sun,
    color: "text-amber-500",
    bg: "bg-amber-50"
  }
];

export function ScenarioPage() {
  const [scenarios, setScenarios] = useState(MOCK_SCENARIOS);

  const toggleScenario = (id: string) => {
    setScenarios(prev => prev.map(sc => 
      sc.id === id ? { ...sc, isActive: !sc.isActive } : sc
    ));
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-neutral-900 pb-32">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-10">
           <div className="flex items-center gap-2 text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4">
              <Zap className="w-3.5 h-3.5" />
              Smart Scenarios & Automation
           </div>
           <h1 className="text-4xl font-black text-neutral-900 tracking-tight">智能场景联动</h1>
           <p className="text-neutral-500 mt-4">
              基于您的 NAS 私有健康数据，自动化您的感官体验。所有逻辑均在本地节点运行，无需云端干预。
           </p>
        </header>

        {/* Create Card */}
        <section className="mb-10">
           <button className="w-full group">
              <div className="bg-neutral-900 rounded-[2.5rem] p-8 text-white flex items-center justify-between overflow-hidden relative shadow-xl shadow-neutral-200">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-gold/30 transition-colors" />
                 <div className="relative z-10 flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                       <Plus className="w-8 h-8 text-brand-gold" />
                    </div>
                    <div className="text-left">
                       <h3 className="text-xl font-bold">创建新场景</h3>
                       <p className="text-white/50 text-sm">定义“如果...那么...”的自动化闭环</p>
                    </div>
                 </div>
                 <ArrowRight className="w-6 h-6 text-white/30 group-hover:translate-x-2 transition-transform" />
              </div>
           </button>
        </section>

        {/* Scenarios List */}
        <div className="space-y-6">
           {scenarios.map((sc) => (
             <motion.div
               key={sc.id}
               layout
               className={cn(
                 "bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white shadow-sm transition-all",
                 !sc.isActive && "opacity-60 grayscale"
               )}
             >
                <div className="flex items-start justify-between mb-8">
                   <div className="flex items-center gap-4">
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner", sc.bg)}>
                         <sc.icon className={cn("w-7 h-7", sc.color)} />
                      </div>
                      <div>
                         <h4 className="text-xl font-black text-neutral-900">{sc.name}</h4>
                         <div className="flex items-center gap-2 mt-1">
                            <Database className="w-3 h-3 text-neutral-400" />
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Local Processing</span>
                         </div>
                      </div>
                   </div>
                   <button 
                     onClick={() => toggleScenario(sc.id)}
                     className={cn(
                       "w-14 h-8 rounded-full p-1 transition-all duration-300 relative",
                       sc.isActive ? "bg-emerald-500" : "bg-neutral-200"
                     )}
                   >
                      <motion.div 
                        animate={{ x: sc.isActive ? 24 : 0 }}
                        className="w-6 h-6 bg-white rounded-full shadow-md"
                      />
                   </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                   <div className="space-y-3">
                      <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">触发条件 (Trigger)</p>
                      <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center gap-3">
                         <Activity className="w-4 h-4 text-neutral-400" />
                         <span className="text-sm font-bold text-neutral-700">{sc.trigger}</span>
                      </div>
                   </div>
                   <div className="space-y-3">
                      <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">执行动作 (Action)</p>
                      <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center gap-3">
                         <Zap className="w-4 h-4 text-brand-gold" />
                         <span className="text-sm font-bold text-neutral-700">{sc.action}</span>
                      </div>
                   </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-neutral-50">
                   <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-400">
                         <Clock className="w-3.5 h-3.5" />
                         上次运行: {sc.lastRun}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500">
                         <ShieldCheck className="w-3.5 h-3.5" />
                         隐私保护已开启
                      </div>
                   </div>
                   <div className="flex gap-2">
                      <button className="p-2 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-neutral-400 transition-colors">
                         <Settings className="w-4 h-4" />
                      </button>
                      <button className="p-2 px-4 rounded-xl bg-neutral-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-brand-deep-blue transition-colors flex items-center gap-2">
                         <Play className="w-3 h-3 fill-current" /> 测试场景
                      </button>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>

        {/* Suggestion Section */}
        <section className="mt-16 bg-brand-deep-blue/5 rounded-[2.5rem] p-8 border border-brand-deep-blue/10">
           <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 rounded-3xl bg-brand-deep-blue text-white flex items-center justify-center shrink-0 shadow-xl shadow-brand-deep-blue/20">
                 <Brain className="w-12 h-12" />
              </div>
              <div>
                 <h3 className="text-xl font-bold text-brand-deep-blue">AI 智能场景建议</h3>
                 <p className="text-neutral-500 text-sm mt-2 leading-relaxed">
                    基于您过去 30 天的睡眠周期数据，NAS 建议创建“深睡衔接”场景：在凌晨 3:00 自动微调 Aero Link 的环境频率。
                 </p>
                 <button className="mt-4 text-sm font-black text-brand-deep-blue flex items-center gap-2 hover:gap-3 transition-all">
                    了解建议详情 <ArrowRight className="w-4 h-4" />
                 </button>
              </div>
           </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
