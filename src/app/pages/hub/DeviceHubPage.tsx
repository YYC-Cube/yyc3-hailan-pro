import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Database, 
  Smartphone, 
  Cpu, 
  Battery, 
  Wifi, 
  ShieldCheck, 
  Plus, 
  Settings, 
  RefreshCw, 
  Activity, 
  Zap, 
  HardDrive, 
  Clock, 
  ArrowUpRight, 
  Layers, 
  Diamond 
} from "lucide-react";
import { Navbar } from "@/app/components/layout/Navbar";
import { BottomNav } from "@/app/components/layout/BottomNav";
import { Button } from "@/app/components/ui/button";
import { GlassCard } from "@/app/components/design-system/GlassCard";
import { cn } from "@/app/components/design-system/utils";
import { useNavigate } from "react-router";
import { EdgeInferencePanel } from "@/app/components/ai/EdgeInferencePanel";

const MOCK_DEVICES = [
  {
    id: "dev-01",
    name: "Nebula Pulse",
    type: "Personal Massager",
    status: "Online",
    battery: 82,
    firmware: "v2.4.0",
    lastSync: "2 mins ago",
    syncScore: 98,
    isSmart: true,
    hasUpdate: true
  },
  {
    id: "dev-02",
    name: "Aero Link",
    type: "Remote Hub",
    status: "Online",
    battery: 100,
    firmware: "v1.1.2",
    lastSync: "Now",
    syncScore: 100,
    isSmart: true,
    hasUpdate: false
  },
  {
    id: "dev-03",
    name: "Essence Diffuser",
    type: "Aroma Therapy",
    status: "Offline",
    battery: 12,
    firmware: "v0.9.8",
    lastSync: "5h ago",
    syncScore: 0,
    isSmart: true,
    hasUpdate: false
  }
];

export function DeviceHubPage() {
  const [updating, setUpdating] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleUpdate = (id: string) => {
    setUpdating(id);
    setTimeout(() => setUpdating(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-neutral-900 pb-32">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-12">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                 <div className="flex items-center gap-2 text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4">
                    <Database className="w-3.5 h-3.5" />
                    HaiLan Network Infrastructure
                 </div>
                 <h1 className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tight">智感设备中心</h1>
                 <p className="text-neutral-500 text-lg mt-4 max-w-xl">管理您的私有健康网络。所有连接设备的数据均通过 AES-256 加密并存储在您���本地 NAS 节点中。</p>
              </div>
              <Button className="rounded-2xl h-14 px-8 bg-brand-hailan-blue text-white font-bold shadow-xl shadow-brand-hailan-blue/20 hover:bg-brand-hailan-blue-hover transition-all">
                 <Plus className="w-5 h-5 mr-2" /> 配对新设备
              </Button>
           </div>
        </header>

        {/* NAS Status Card */}
        <section className="mb-12">
           <div className="bg-gradient-to-br from-brand-hailan-blue to-brand-deep-night rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-brand-hailan-blue/20">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
              
              <div className="relative z-10 grid md:grid-cols-3 gap-12 items-center">
                 <div className="md:col-span-2 space-y-8">
                    <div className="flex items-center gap-4">
                       <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-inner">
                          <Database className="w-8 h-8 text-brand-gold" />
                       </div>
                       <div>
                          <h2 className="text-2xl font-bold text-white tracking-tight">HaiLan-Core-Alpha-01</h2>
                          <div className="flex items-center gap-2 mt-1">
                             <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                             <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">NAS Node: Active</span>
                          </div>
                       </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                       <Button 
                         onClick={() => navigate('/sync-protocol')}
                         className="rounded-2xl h-12 px-6 bg-white/10 text-white font-bold border border-white/10 hover:bg-white/20 transition-all backdrop-blur-sm"
                       >
                          <Layers className="w-4 h-4 mr-2 text-brand-gold" /> 多端协同律动
                       </Button>
                       <Button 
                         onClick={() => navigate('/medical-vault')}
                         className="rounded-2xl h-12 px-6 bg-white/10 text-white font-bold border border-white/10 hover:bg-white/20 transition-all backdrop-blur-sm"
                       >
                          <ShieldCheck className="w-4 h-4 mr-2 text-brand-gold" /> ZK 医学保险库
                       </Button>
                       <Button 
                         onClick={() => navigate('/health-assets')}
                         className="rounded-2xl h-12 px-6 bg-white/10 text-white font-bold border border-white/10 hover:bg-white/20 transition-all backdrop-blur-sm"
                       >
                          <Diamond className="w-4 h-4 mr-2 text-brand-gold" /> 健康资产确权
                       </Button>
                       <Button 
                         onClick={() => navigate('/scenarios')}
                         className="rounded-2xl h-12 px-6 bg-white/10 text-white font-bold border border-white/10 hover:bg-white/20 transition-all backdrop-blur-sm"
                       >
                          <Zap className="w-4 h-4 mr-2 text-brand-gold" /> 配置场景联动
                       </Button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                       <NASStat icon={HardDrive} label="存储状态" value="1.2TB / 4TB" />
                       <NASStat icon={Cpu} label="负载" value="12.4%" />
                       <NASStat icon={Activity} label="运行时间" value="142 Days" />
                       <NASStat icon={Wifi} label="本地带宽" value="1.2 Gbps" />
                    </div>
                 </div>

                 <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/10 space-y-6">
                    <div className="flex items-center justify-between">
                       <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider">实时安全状态</h3>
                       <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="space-y-4">
                       <div className="flex items-center justify-between text-xs font-bold text-white/90">
                          <span>加密协议</span>
                          <span className="text-brand-gold uppercase">AES-256-GCM</span>
                       </div>
                       <div className="flex items-center justify-between text-xs font-bold text-white/90">
                          <span>本地防火墙</span>
                          <span className="text-emerald-300">ENABLED</span>
                       </div>
                       <div className="flex items-center justify-between text-xs font-bold text-white/90">
                          <span>脱敏引擎</span>
                          <span className="text-emerald-300">OPTIMIZED</span>
                       </div>
                    </div>
                    <Button variant="ghost" className="w-full text-white hover:bg-white/20 border-white/10 h-10 text-xs font-bold rounded-xl bg-white/5">
                       查看节点拓扑
                    </Button>
                 </div>
              </div>
           </div>
        </section>

        {/* Edge Inference Section */}
        <section className="mb-12">
           <EdgeInferencePanel />
        </section>

        {/* Device Grid */}
        <section className="space-y-6">
           <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                 已配对设备
                 <span className="text-xs font-black text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-md">{MOCK_DEVICES.length}</span>
              </h3>
              <div className="flex gap-2">
                 <button className="p-2 rounded-xl bg-white border border-neutral-100 hover:bg-neutral-50 transition-colors">
                    <RefreshCw className="w-4 h-4 text-neutral-400" />
                 </button>
                 <button className="p-2 rounded-xl bg-white border border-neutral-100 hover:bg-neutral-50 transition-colors">
                    <Settings className="w-4 h-4 text-neutral-400" />
                 </button>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_DEVICES.map((dev) => (
                <DeviceCard 
                  key={dev.id} 
                  device={dev} 
                  onUpdate={() => handleUpdate(dev.id)}
                  isUpdating={updating === dev.id}
                />
              ))}
           </div>
        </section>

        {/* Sync History & Health Advice */}
        <section className="mt-16 grid lg:grid-cols-2 gap-8">
           <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 border border-white shadow-sm">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                 <Clock className="w-5 h-5 text-brand-deep-blue" />
                 近期同步日志
              </h3>
              <div className="space-y-4">
                 {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-neutral-50 transition-colors">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                             <ShieldCheck className="w-5 h-5 text-emerald-500" />
                          </div>
                          <div>
                             <p className="text-sm font-bold">健康数据全量同步</p>
                             <p className="text-[10px] text-neutral-400">Node: HaiLan-Core-01 · Today 10:2{i}</p>
                          </div>
                       </div>
                       <span className="text-[10px] font-black text-emerald-500 uppercase">Success</span>
                    </div>
                 ))}
              </div>
           </div>

           <div className="bg-brand-deep-blue rounded-[2rem] p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <Zap className="absolute -left-4 -bottom-4 w-32 h-32 text-white/5 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
              
              <div className="relative z-10 space-y-6">
                 <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Activity className="w-6 h-6 text-brand-gold" />
                 </div>
                 <h3 className="text-2xl font-bold leading-tight">固件更新建议</h3>
                 <p className="text-white/70 text-sm leading-relaxed">检测到 1 个关键固件更新。本次更新优化了 Nebula Pulse 的生物反馈采样频率，提升了 15% 的反应灵敏度。</p>
                 <Button className="w-full h-12 rounded-xl bg-white text-brand-deep-blue font-bold hover:bg-neutral-100 border-none transition-all active:scale-95">
                    立即一键升级
                 </Button>
              </div>
           </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

function NASStat({ icon: Icon, label, value }: any) {
  return (
    <div className="space-y-1.5">
       <div className="flex items-center gap-1.5 text-white/50">
          <Icon className="w-3 h-3" />
          <span className="text-[9px] font-bold uppercase tracking-widest">{label}</span>
       </div>
       <p className="text-xs md:text-sm font-black text-white tracking-wide">{value}</p>
    </div>
  );
}

function DeviceCard({ device, onUpdate, isUpdating }: any) {
  const isOnline = device.status === "Online";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 border border-white shadow-sm hover:shadow-xl hover:shadow-neutral-200/50 transition-all flex flex-col group"
    >
       <div className="flex items-start justify-between mb-6">
          <div className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500",
            isOnline ? "bg-brand-deep-blue text-white shadow-xl shadow-brand-deep-blue/20" : "bg-neutral-100 text-neutral-300"
          )}>
             <Smartphone className="w-7 h-7" />
          </div>
          <div className="text-right">
             <div className={cn(
               "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
               isOnline ? "bg-emerald-50 text-emerald-500 border border-emerald-100" : "bg-neutral-50 text-neutral-400 border border-neutral-100"
             )}>
                {isOnline && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                {device.status}
             </div>
             <p className="text-[10px] text-neutral-400 font-bold mt-2">ID: {device.id}</p>
          </div>
       </div>

       <div className="space-y-4 mb-8">
          <div>
             <h4 className="text-xl font-black text-neutral-900 group-hover:text-brand-deep-blue transition-colors">{device.name}</h4>
             <p className="text-xs font-bold text-neutral-400 mt-1 uppercase tracking-widest">{device.type}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-3 bg-neutral-50/50 rounded-2xl border border-neutral-50">
                <div className="flex items-center gap-2 mb-1">
                   <Battery className={cn("w-3.5 h-3.5", device.battery < 20 ? "text-rose-500" : "text-neutral-400")} />
                   <span className="text-[10px] font-bold text-neutral-400">电量</span>
                </div>
                <p className="text-sm font-black text-neutral-900">{device.battery}%</p>
             </div>
             <div className="p-3 bg-neutral-50/50 rounded-2xl border border-neutral-50">
                <div className="flex items-center gap-2 mb-1">
                   <Zap className="w-3.5 h-3.5 text-neutral-400" />
                   <span className="text-[10px] font-bold text-neutral-400">同步率</span>
                </div>
                <p className="text-sm font-black text-neutral-900">{device.syncScore}%</p>
             </div>
          </div>
       </div>

       <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between text-[10px] font-bold text-neutral-400 border-t border-neutral-50 pt-4">
             <span>固件版本: {device.firmware}</span>
             <span>最后同步: {device.lastSync}</span>
          </div>
          
          <div className="flex gap-2">
             <Button 
               onClick={onUpdate}
               disabled={!device.hasUpdate || isUpdating}
               className={cn(
                 "flex-1 h-10 rounded-xl text-xs font-bold transition-all",
                 device.hasUpdate 
                   ? "bg-neutral-900 text-white hover:bg-brand-deep-blue" 
                   : "bg-neutral-50 text-neutral-400 border border-neutral-100"
               )}
             >
                {isUpdating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 mr-2 animate-spin" />
                    升级中...
                  </>
                ) : device.hasUpdate ? "固件升级" : "已是最新"}
             </Button>
             <button className="w-10 h-10 rounded-xl bg-neutral-50 text-neutral-400 flex items-center justify-center hover:bg-neutral-100 transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </button>
          </div>
       </div>
    </motion.div>
  );
}
