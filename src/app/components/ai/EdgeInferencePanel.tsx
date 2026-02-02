import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, 
  WifiOff, 
  Activity, 
  Brain, 
  ChevronRight,
  Wifi
} from "lucide-react";
import { cn } from "@/app/components/design-system/utils";
import { supabase } from "@/lib/supabase";

const MOCK_PREDICTIONS = [
  { id: "p1", scene: "深度减压场景", confidence: 0.94, reason: "检测到微肌肉张力上升", action: "开启脉冲引导" },
  { id: "p2", scene: "工作专注模式", confidence: 0.88, reason: "心率变异性(HRV)进入稳定期", action: "激活环境调光" },
];

export function EdgeInferencePanel() {
  const [isOffline, setIsOffline] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activePredictions, setActivePredictions] = useState(MOCK_PREDICTIONS);
  const [systemStatus, setSystemStatus] = useState("ONLINE");

  // Realtime subscription to system status
  useEffect(() => {
    let isSubscribed = true;
    const channel = supabase.channel('system-status')
      .on('broadcast', { event: 'status-update' }, (payload) => {
        if (isSubscribed && payload.status) {
            setSystemStatus(payload.status);
            setIsOffline(payload.status === "OFFLINE");
        }
      });

    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log('[Realtime] Subscribed to system-status');
      }
    });

    const heartbeat = setInterval(() => {
        if (isSubscribed && Math.random() > 0.7) {
            setIsProcessing(true);
            setTimeout(() => {
              if (isSubscribed) setIsProcessing(false);
            }, 1500);
        }
    }, 3000);

    return () => {
        isSubscribed = false;
        supabase.removeChannel(channel).catch(err => {
          console.warn('[Realtime] Error removing channel:', err);
        });
        clearInterval(heartbeat);
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
         <div className="flex items-center gap-2">
            <Cpu className={cn("w-4 h-4 transition-colors", isOffline ? "text-amber-500" : "text-emerald-500")} />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-neutral-400">边缘计算节点 (Edge Node)</h3>
         </div>
         <div className={cn(
           "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter border transition-all flex items-center gap-1",
           isOffline ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"
         )}>
            {isOffline ? <WifiOff className="w-3 h-3" /> : <Wifi className="w-3 h-3" />}
            {isOffline ? "Offline: Edge-Only" : "Hybrid: NAS + Edge"}
         </div>
      </div>

      <div className="bg-brand-navy rounded-[2rem] p-6 text-white relative overflow-hidden shadow-xl shadow-brand-navy/20">
         {/* Background Grid for Tech Feel */}
         <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:20px_20px]" />
         </div>

         <div className="relative z-10 space-y-6">
            <div className="flex items-start justify-between">
               <div className="space-y-1">
                  <div className="flex items-center gap-2">
                     <Brain className="w-5 h-5 text-indigo-300" />
                     <span className="text-sm font-black uppercase tracking-tighter">本地场景预测</span>
                  </div>
                  <p className="text-[10px] text-white/60 leading-relaxed">基于本地 Tiny-ML 模型推理，无需数据上云</p>
               </div>
               {isProcessing && (
                 <div className="flex gap-1 h-4 items-end">
                    {[0.2, 0.4, 0.6].map(d => (
                      <motion.div 
                        key={d}
                        animate={{ height: [4, 12, 4] }}
                        transition={{ repeat: Infinity, duration: 1, delay: d }}
                        className="w-1 bg-indigo-300 rounded-full"
                      />
                    ))}
                 </div>
               )}
            </div>

            <div className="space-y-3">
               <AnimatePresence mode="popLayout">
                  {activePredictions.map((p, idx) => (
                    <motion.div 
                      key={p.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors group cursor-pointer"
                    >
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/5">
                             <Activity className="w-5 h-5 text-indigo-300" />
                          </div>
                          <div>
                             <div className="flex items-center gap-2">
                                <h4 className="text-xs font-bold">{p.scene}</h4>
                                <span className="text-[8px] font-black text-emerald-400 px-1.5 py-0.5 bg-emerald-400/10 rounded-md">
                                   {Math.round(p.confidence * 100)}% 匹配
                                </span>
                             </div>
                             <p className="text-[9px] text-white/60 mt-1">{p.reason}</p>
                          </div>
                       </div>
                       <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition-all group-hover:translate-x-1" />
                    </motion.div>
                  ))}
               </AnimatePresence>
            </div>

            {isOffline && (
              <div className="p-4 bg-amber-900/40 rounded-2xl border border-amber-500/20 flex items-center gap-3">
                 <WifiOff className="w-4 h-4 text-amber-500 shrink-0" />
                 <p className="text-[9px] text-amber-100/80 leading-tight">
                    当前处于离线状态。已切换至 **Local Edge Inference** 模式。预测准确度可能略有下降，但响应速度提升 40ms。
                 </p>
              </div>
            )}
         </div>
      </div>
    </div>
  );
}
