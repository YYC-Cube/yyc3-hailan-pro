import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Wifi, 
  ShieldCheck, 
  Smartphone, 
  Activity, 
  Layers, 
  Cpu, 
  RefreshCw,
  Plus,
  Play,
  Square,
  Settings2,
  Lock,
  Brain,
  ArrowRight
} from "lucide-react";
import { Navbar } from "@/app/components/layout/Navbar";
import { BottomNav } from "@/app/components/layout/BottomNav";
import { Button } from "@/app/components/ui/button";
import { GlassCard } from "@/app/components/design-system/GlassCard";
import { cn } from "@/app/components/design-system/utils";

const SYNCED_DEVICES = [
  { id: "dev-01", name: "Nebula Pulse", latency: "2ms", status: "master", icon: Smartphone },
  { id: "dev-02", name: "Aero Link", latency: "0.5ms", status: "slave", icon: Activity },
  { id: "dev-03", name: "Essence Diffuser", latency: "12ms", status: "slave", icon: Wifi },
];

export function MultiDeviceSyncPage() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isSyncing) {
      interval = setInterval(() => {
        setPulsePhase(prev => (prev + 1) % 360);
      }, 20);
    }
    return () => clearInterval(interval);
  }, [isSyncing]);

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-neutral-900 pb-32">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-12">
           <div className="flex items-center gap-2 text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4">
              <Layers className="w-3.5 h-3.5" />
              Multi-Device Rhythm Sync Protocol v1.0
           </div>
           <h1 className="text-4xl font-black text-neutral-900 tracking-tight">多设备协同律动</h1>
           <p className="text-neutral-500 mt-4 leading-relaxed">
              通过海蓝私有同步协议，实现物理层面的毫秒级感官对齐。您的所有设备将共享统一的振动频率与脉冲节奏。
           </p>
        </header>

        {/* Master Pulse Visualizer */}
        <section className="mb-12">
           <div className="bg-brand-navy rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl shadow-brand-navy/20">
              <div className="absolute inset-0 opacity-20">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/10 rounded-full" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/20 rounded-full" />
              </div>

              <div className="relative z-10 flex flex-col items-center">
                 <div className="relative w-48 h-48 mb-12">
                    {/* Sync Wave Rings */}
                    <AnimatePresence>
                       {isSyncing && [1, 2, 3].map(i => (
                         <motion.div 
                           key={i}
                           initial={{ scale: 0.5, opacity: 0.8 }}
                           animate={{ scale: 2.5, opacity: 0 }}
                           transition={{ repeat: Infinity, duration: 2, delay: i * 0.6 }}
                           className="absolute inset-0 border-2 border-brand-gold rounded-full"
                         />
                       ))}
                    </AnimatePresence>
                    
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl rounded-full border border-white/10 flex items-center justify-center">
                       <Zap className={cn("w-16 h-16 transition-all duration-300", isSyncing ? "text-brand-gold scale-110" : "text-white/20")} />
                    </div>
                 </div>

                 <div className="text-center space-y-4 mb-12">
                    <h2 className="text-3xl font-black">协同节奏：深度冥想脉冲</h2>
                    <div className="flex items-center justify-center gap-6">
                       <div className="flex flex-col items-center">
                          <span className="text-[10px] font-black text-white/40 uppercase">当前频率</span>
                          <span className="text-xl font-bold">4.2 Hz</span>
                       </div>
                       <div className="w-px h-8 bg-white/10" />
                       <div className="flex flex-col items-center">
                          <span className="text-[10px] font-black text-white/40 uppercase">同步偏差</span>
                          <span className="text-xl font-bold text-emerald-400">± 0.2ms</span>
                       </div>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <button 
                      onClick={() => setIsSyncing(!isSyncing)}
                      className={cn(
                        "h-16 px-12 rounded-2xl font-black uppercase tracking-widest flex items-center gap-4 transition-all active:scale-95 shadow-xl",
                        isSyncing ? "bg-rose-600 text-white shadow-rose-600/20" : "bg-white text-neutral-900 shadow-white/20"
                      )}
                    >
                       {isSyncing ? (
                         <>
                           <Square className="w-5 h-5 fill-current" /> 停止同步
                         </>
                       ) : (
                         <>
                           <Play className="w-5 h-5 fill-current" /> 开启全域协同
                         </>
                       )}
                    </button>
                    <button className="w-16 h-16 rounded-2xl bg-white/10 text-white flex items-center justify-center hover:bg-white/20 border border-white/10 transition-colors">
                       <Settings2 className="w-6 h-6" />
                    </button>
                 </div>
              </div>
           </div>
        </section>

        {/* Sync Device List */}
        <section className="space-y-6">
           <div className="flex items-center justify-between px-4">
              <h3 className="text-xl font-black flex items-center gap-3">
                 节点队列
                 <span className="text-xs font-black text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-md">3 Devices</span>
              </h3>
              <button className="text-xs font-black text-brand-deep-blue flex items-center gap-2 uppercase tracking-widest">
                 <Plus className="w-4 h-4" /> 添加协同节点
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SYNCED_DEVICES.map((dev) => (
                <GlassCard key={dev.id} className="p-6 border-neutral-100 relative group overflow-hidden">
                   {isSyncing && (
                     <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold overflow-hidden">
                        <motion.div 
                          animate={{ x: [-100, 200] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                          className="w-1/2 h-full bg-white/50"
                        />
                     </div>
                   )}
                   <div className="flex items-start justify-between mb-8">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                        isSyncing ? "bg-brand-deep-blue text-white" : "bg-neutral-100 text-neutral-400"
                      )}>
                         <dev.icon className="w-6 h-6" />
                      </div>
                      <div className={cn(
                        "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter border",
                        dev.status === 'master' ? "bg-brand-gold/10 text-brand-gold border-brand-gold/20" : "bg-neutral-50 text-neutral-400 border-neutral-100"
                      )}>
                         {dev.status}
                      </div>
                   </div>
                   <div>
                      <h4 className="font-black text-neutral-900 truncate">{dev.name}</h4>
                      <div className="flex items-center gap-2 mt-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                         <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Latency: {dev.latency}</span>
                      </div>
                   </div>
                </GlassCard>
              ))}
           </div>
        </section>

        {/* Sync Logic Information */}
        <section className="mt-16 bg-neutral-50 rounded-[2.5rem] p-8 border border-neutral-100">
           <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                 <div className="w-10 h-10 rounded-xl bg-brand-navy text-white flex items-center justify-center">
                    <Cpu className="w-5 h-5" />
                 </div>
                 <h4 className="text-lg font-black">P2P 物理层对齐</h4>
                 <p className="text-sm text-neutral-500 leading-relaxed">
                    不同于传统的应用层同步，海蓝协同协议直接在 P2P 物理层建立时钟同步，消除蓝牙协议栈带来的延迟抖动。
                 </p>
              </div>
              <div className="space-y-4">
                 <div className="w-10 h-10 rounded-xl bg-brand-navy text-white flex items-center justify-center">
                    <Lock className="w-5 h-5" />
                 </div>
                 <h4 className="text-lg font-black">感官主权加密</h4>
                 <p className="text-sm text-neutral-500 leading-relaxed">
                    您的同步指令经过 E2E 加密，只有经过授权的节点才能解密并执行协同律动指令。
                 </p>
              </div>
           </div>
        </section>

        {/* AI Rhythm Suggestion */}
        <div className="mt-12 p-8 bg-brand-deep-blue rounded-[2.5rem] text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl shadow-brand-deep-blue/20">
           <div className="shrink-0 w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center">
              <Brain className="w-10 h-10 text-brand-gold" />
           </div>
           <div>
              <h4 className="text-xl font-bold">AI 律动建议</h4>
              <p className="text-white/60 text-sm mt-2">基于您目前的呼吸频率，AI 建议将全域协同频率下调至 3.8Hz，以加速进入深度入眠状态。</p>
              <button className="mt-4 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-brand-gold hover:gap-3 transition-all">
                 接受并应用建议 <ArrowRight className="w-4 h-4" />
              </button>
           </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
