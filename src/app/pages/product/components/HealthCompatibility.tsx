import React from "react";
import { motion } from "framer-motion";
import { 
  Activity, 
  ShieldCheck, 
  Smartphone, 
  Zap, 
  Heart, 
  Brain, 
  Database,
  Lock,
  ArrowRight,
  Info
} from "lucide-react";
import { Product } from "@/app/data/mockData";
import { cn } from "@/app/components/design-system/utils";

interface HealthCompatibilityProps {
  product: Product;
}

export function HealthCompatibility({ product }: HealthCompatibilityProps) {
  const isSmart = product.isSmart || product.mainCategory === "SMART";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-brand-deep-blue" />
          健康数据兼容性
        </h3>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 border border-emerald-100">
          <ShieldCheck className="w-3 h-3 text-emerald-500" />
          <span className="text-[10px] font-black text-emerald-600 uppercase">Secure Link</span>
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 border border-white shadow-sm space-y-6">
        {/* Connection Status */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
             <Smartphone className={cn("w-6 h-6", isSmart ? "text-brand-gold" : "text-neutral-400")} />
          </div>
          <div className="flex-1">
             <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Connectivity</p>
             <h4 className="text-sm font-black">{isSmart ? "海蓝 App 智联已就绪" : "手动健康管理模式"}</h4>
          </div>
          {isSmart && (
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
               <span className="text-[10px] font-bold text-emerald-400">ONLINE</span>
            </div>
          )}
        </div>

        {/* Bio-Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <MetricCard 
            icon={Heart} 
            label="实时心率追踪" 
            active={isSmart} 
            color="text-rose-500"
            bg="bg-rose-50"
          />
          <MetricCard 
            icon={Brain} 
            label="压力水平监测" 
            active={isSmart} 
            color="text-indigo-500"
            bg="bg-indigo-50"
          />
          <MetricCard 
            icon={Zap} 
            label="愉悦曲线量化" 
            active={isSmart} 
            color="text-amber-500"
            bg="bg-amber-50"
          />
          <MetricCard 
            icon={Database} 
            label="周期数据存档" 
            active={true} 
            color="text-emerald-500"
            bg="bg-emerald-50"
          />
        </div>

        {/* Logic Link / Privacy */}
        <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
           <div className="flex items-start gap-3">
              <Lock className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
              <div>
                 <p className="text-xs font-bold text-neutral-700 mb-1">端到端私密闭环</p>
                 <p className="text-[11px] text-neutral-500 leading-relaxed">
                   该设备的交互数据将通过金融级加密路径，直接反馈至您的海蓝 AI 核心（NAS）进行本地化脱敏处理，不经过公共云端。
                 </p>
              </div>
           </div>
           
           <button className="w-full mt-4 h-10 rounded-xl bg-white border border-neutral-200 text-xs font-bold text-neutral-600 flex items-center justify-center gap-2 hover:bg-neutral-50 transition-colors group">
              查看数据流向图 <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-all" />
           </button>
        </div>
      </div>
      
      {/* Compatibility Badge Area */}
      <div className="flex items-center gap-3">
         <span className="text-[10px] font-black text-neutral-400 uppercase">Support</span>
         <div className="flex gap-2">
            {["iOS", "Android", "WatchOS", "Web3"].map(t => (
               <span key={t} className="px-2 py-0.5 rounded-md bg-neutral-100 text-[9px] font-bold text-neutral-500 uppercase tracking-tighter">{t}</span>
            ))}
         </div>
      </div>
    </motion.div>
  );
}

function MetricCard({ icon: Icon, label, active, color, bg }: any) {
  return (
    <div className={cn(
      "p-3 rounded-2xl border transition-all flex flex-col gap-2",
      active ? "bg-white border-neutral-100 shadow-sm" : "bg-neutral-50/50 border-neutral-100 opacity-60 grayscale"
    )}>
      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", active ? bg : "bg-neutral-200")}>
        <Icon className={cn("w-4 h-4", active ? color : "text-neutral-400")} />
      </div>
      <p className="text-[10px] font-bold text-neutral-700">{label}</p>
    </div>
  );
}
