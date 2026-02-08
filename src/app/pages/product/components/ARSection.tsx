import React, { useState, useEffect } from "react";
import { Product } from "@/app/data/mockData";
import { Button } from "@/app/components/design-system/Button";
import { Box, Ruler, Smartphone, Sparkles, X, ChevronRight, Scan, Activity, Database, Zap, Battery, ShieldCheck, Heart } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/app/components/ui/dialog";
import { SafeModelViewer } from "@/app/components/ar/SafeModelViewer";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/app/components/design-system/utils";
import { GlassCard } from "@/app/components/design-system/GlassCard";

interface ARSectionProps {
  product: Product;
}

export function ARSection({ product }: ARSectionProps) {
  if (!product.arEnabled) return null;

  return (
    <GlassCard 
      className="p-0 overflow-hidden border-0 bg-gradient-to-br from-[#1A365D] to-[#102a4e] text-white relative group"
      hoverEffect={true}
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-300 transition-colors duration-700" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 group-hover:bg-purple-400 transition-colors duration-700" />
      </div>

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center p-8 md:p-10">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full backdrop-blur-md text-xs font-semibold border border-white/20 shadow-lg shadow-black/10">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span className="tracking-wide text-blue-100">IMMERSIVE DATA OVERLAY</span>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-2xl md:text-4xl font-bold leading-tight tracking-tight">
              所见即所连：<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">AR 数据可视化重叠</span>
            </h3>
            <p className="text-blue-200/80 text-sm md:text-base leading-relaxed max-w-md">
              不仅是外观展示。在 AR 模式下，实时查看 {product.name} 的感应点位、电池状态及 NAS 同步链路，体验“智感科技”的透明化。
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <Dialog>
              <DialogTrigger className="appearance-none bg-transparent border-none p-0 cursor-pointer">
                <Button 
                  as="div"
                  variant="liquid"
                  className="bg-white text-[#1A365D] hover:bg-blue-50 border-none shadow-[0_0_30px_rgba(59,130,246,0.5)] px-6 py-6 h-auto text-base"
                >
                  <Scan className="w-5 h-5 mr-2" />
                  开启增强预览
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl w-[95vw] h-[85vh] p-0 bg-transparent border-none shadow-none outline-none overflow-hidden">
                 <div className="relative w-full h-full bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 flex flex-col">
                    {/* AR Data Overlay Header */}
                    <div className="absolute top-0 left-0 right-0 p-6 z-50 flex justify-between items-start">
                        <div className="bg-brand-navy/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white text-sm font-medium flex items-center gap-3">
                           <div className="flex items-center gap-1.5">
                              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                              <span>LIVE TELEMETRY</span>
                           </div>
                           <div className="w-px h-3 bg-white/20" />
                           <div className="flex items-center gap-1.5 text-white/60">
                              <Database className="w-3.5 h-3.5" />
                              <span>NAS CORE ACTIVE</span>
                           </div>
                        </div>
                        <DialogClose className="p-3 bg-brand-navy/40 backdrop-blur-md rounded-full hover:bg-white/20 text-white transition-all border border-white/10">
                           <X className="w-5 h-5" />
                        </DialogClose>
                    </div>
                    
                    {/* Main AR Viewport */}
                    <div className="flex-1 relative">
                       <SafeModelViewer color="#1A365D" />
                       
                       {/* Mock Data Points Layer */}
                       <div className="absolute inset-0 pointer-events-none">
                          <DataMarker x="40%" y="30%" label="触感感应阵列" value="ACTIVE" icon={Activity} />
                          <DataMarker x="65%" y="55%" label="生物反馈芯片" value="SYNCING" icon={Zap} />
                          <DataMarker x="30%" y="70%" label="磁吸充电触点" value="98%" icon={Battery} />
                       </div>

                       {/* Sidebar Telemetry */}
                       <div className="absolute right-6 top-24 bottom-24 w-64 bg-brand-navy/30 backdrop-blur-xl rounded-[2rem] border border-white/10 p-6 flex flex-col gap-6 hidden md:flex">
                          <div>
                             <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-4">Real-time Feed</h4>
                             <div className="space-y-4">
                                <TelemetryRow label="Signal" value="48ms" status="Excellent" />
                                <TelemetryRow label="Encryption" value="AES-256" status="Secure" />
                                <TelemetryRow label="Storage" value="NAS Node 01" status="Syncing" />
                             </div>
                          </div>
                          
                          <div className="mt-auto">
                             <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-3">
                                <div className="flex items-center justify-between">
                                   <span className="text-xs font-bold text-white/60">心率同步</span>
                                   <Heart className="w-4 h-4 text-rose-500 animate-pulse" />
                                </div>
                                <div className="h-10 w-full flex items-end gap-1 overflow-hidden">
                                   {[40, 60, 45, 70, 55, 80, 65, 90, 75, 85].map((h, i) => (
                                      <motion.div 
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ repeat: Infinity, duration: 1, repeatType: 'reverse', delay: i * 0.1 }}
                                        className="flex-1 bg-rose-500/40 rounded-t-sm"
                                      />
                                   ))}
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>

                    {/* Modal Footer Controls */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-brand-navy/60 backdrop-blur-md px-8 py-4 rounded-full border border-white/10">
                       <button className="flex items-center gap-2 text-white/80 text-xs font-bold px-4 py-1 hover:text-white transition-colors">
                          <Activity className="w-4 h-4" /> 开启压力点位
                       </button>
                       <div className="w-px h-4 bg-white/10" />
                       <button className="flex items-center gap-2 text-white/80 text-xs font-bold px-4 py-1 hover:text-white transition-colors">
                          <ShieldCheck className="w-4 h-4" /> 隐私脱敏视图
                       </button>
                    </div>
                 </div>
              </DialogContent>
            </Dialog>

            <Button variant="ghost" className="text-white hover:bg-white/10 border border-white/20 hover:border-white/40 h-auto py-3.5 px-5">
              <Ruler className="w-4 h-4 mr-2" />
              Size Guide
            </Button>
          </div>
        </div>

        {/* Visual representation of AR - Mock UI */}
        <div className="hidden md:flex relative h-80 w-full bg-gradient-to-t from-white/5 to-white/10 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-sm items-center justify-center group/preview">
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
           
           <motion.div 
             animate={{ y: [0, -10, 0], rotateY: [0, 5, 0] }}
             transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
             className="relative z-10"
           >
              <div className="w-40 h-40 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-3xl backdrop-blur-md border border-white/30 flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]">
                 <Box className="w-16 h-16 text-white/90" />
              </div>
              
              {/* Floating Mini Indicators */}
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 flex items-center justify-center">
                 <Zap className="w-5 h-5 text-emerald-400" />
              </div>
           </motion.div>

           <motion.div 
             className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50 z-20"
             animate={{ top: ['0%', '100%', '0%'] }}
             transition={{ duration: 3, ease: "linear", repeat: Infinity }}
           />
           
           <div className="absolute bottom-6 left-6 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] font-black text-white/60 tracking-widest">DATA_OVERLAY_ENABLED</span>
              </div>
           </div>
        </div>
      </div>
    </GlassCard>
  );
}

function DataMarker({ x, y, label, value, icon: Icon }: any) {
  return (
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5 }}
      style={{ left: x, top: y }}
      className="absolute flex items-center gap-3 group/marker pointer-events-auto"
    >
       <div className="relative">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/50 flex items-center justify-center group-hover/marker:scale-110 transition-transform">
             <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          </div>
          <div className="absolute -inset-2 bg-blue-400/10 rounded-full animate-ping" />
       </div>
       <div className="bg-brand-navy/40 backdrop-blur-xl px-3 py-2 rounded-xl border border-white/10 opacity-0 group-hover/marker:opacity-100 translate-y-2 group-hover/marker:translate-y-0 transition-all">
          <div className="flex items-center gap-2 mb-0.5">
             <Icon className="w-3 h-3 text-blue-300" />
             <span className="text-[10px] font-bold text-white/90 whitespace-nowrap">{label}</span>
          </div>
          <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">{value}</p>
       </div>
    </motion.div>
  );
}

function TelemetryRow({ label, value, status }: any) {
  return (
    <div className="flex items-center justify-between">
       <span className="text-xs font-bold text-white/30">{label}</span>
       <div className="text-right">
          <p className="text-[11px] font-bold text-white/90">{value}</p>
          <p className="text-[8px] font-black text-emerald-500 uppercase">{status}</p>
       </div>
    </div>
  );
}
