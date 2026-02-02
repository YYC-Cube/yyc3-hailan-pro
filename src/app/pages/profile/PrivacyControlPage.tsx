import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft,
  ShieldCheck,
  Server,
  Fingerprint,
  Lock,
  ChevronRight,
  Database,
  Trash2,
  Smartphone,
  Plus
} from 'lucide-react';
import { Navbar } from "@/app/components/layout/Navbar";
import { BottomNav } from "@/app/components/layout/BottomNav";
import { GlassCard } from "@/app/components/design-system/GlassCard";
import { cn } from "@/app/components/design-system/utils";
import { WalletAuthPanel } from "./components/WalletAuthPanel";
import { WebAuthnService } from "@/lib/webauthn";
import { toast } from "sonner";

export function PrivacyControlPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("identity");
  const [devices, setDevices] = useState(WebAuthnService.getDevices());

  const handleRevoke = (id: string) => {
    WebAuthnService.revokeDevice(id);
    setDevices(WebAuthnService.getDevices());
    toast.success("设备访问权限已撤销");
  };

  const handleRegisterNew = async () => {
    try {
      await WebAuthnService.registerCredential();
      setDevices(WebAuthnService.getDevices());
      toast.success("新设备绑定成功");
    } catch (err: any) {
      if (err.name !== 'NotAllowedError') {
        toast.error("设备绑定失败");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-32">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-neutral-400 hover:text-neutral-900 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">返回个人中心</span>
        </button>

        <header className="mb-12">
           <h1 className="text-4xl font-black text-neutral-900 tracking-tight">隐私主权中心</h1>
           <p className="text-neutral-500 mt-4 leading-relaxed">
              您的数据完全由您掌控。在这里管理 Web3 身份、零知识证明分发以及本地 NAS 的同步权限。
           </p>
        </header>

        {/* Custom Tabs */}
        <div className="flex gap-2 mb-8 bg-neutral-100 p-1.5 rounded-2xl w-fit">
           <TabBtn active={activeTab === 'identity'} onClick={() => setActiveTab('identity')} label="身份主权" icon={Fingerprint} />
           <TabBtn active={activeTab === 'nas'} onClick={() => setActiveTab('nas')} label="NAS 同步" icon={Server} />
           <TabBtn active={activeTab === 'acl'} onClick={() => setActiveTab('acl')} label="授权审计" icon={ShieldCheck} />
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === 'identity' && (
            <div className="space-y-8">
              <WalletAuthPanel />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-brand-navy">已绑定生物识别设备</h3>
                    <p className="text-xs text-neutral-400">这些设备可以使用硬件级 WebAuthn 解锁您的医学保险库</p>
                  </div>
                  <button 
                    onClick={handleRegisterNew}
                    className="flex items-center gap-2 px-4 h-10 rounded-xl bg-brand-hailan-blue/10 text-brand-hailan-blue text-[10px] font-black uppercase tracking-widest hover:bg-brand-hailan-blue/20 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" /> 绑定新设备
                  </button>
                </div>

                <motion.div 
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <AnimatePresence mode="popLayout">
                    {devices.map((dev: any) => (
                      <motion.div
                        key={dev.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                      >
                        <GlassCard className="p-6 border-neutral-100 hover:border-brand-hailan-blue/20 transition-all group h-full">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-neutral-50 text-neutral-400 group-hover:bg-brand-hailan-blue/5 group-hover:text-brand-hailan-blue transition-all flex items-center justify-center">
                                <Smartphone className="w-6 h-6" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-neutral-900">{dev.name}</p>
                                <p className="text-[10px] text-neutral-400 font-mono mt-0.5 uppercase tracking-tighter">ID: {dev.id.substring(0, 12)}...</p>
                              </div>
                            </div>
                            <button 
                              onClick={() => handleRevoke(dev.id)}
                              className="p-2 rounded-lg bg-white border border-neutral-100 text-neutral-300 hover:text-rose-500 hover:border-rose-100 hover:bg-rose-50 transition-all"
                              title="撤销权限"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="mt-6 flex items-center justify-between border-t border-neutral-50 pt-4">
                            <div className="flex flex-col">
                              <span className="text-[9px] font-black text-neutral-300 uppercase tracking-widest">安全等级</span>
                              <div className="flex items-center gap-1 mt-1">
                                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                                <span className="text-[10px] font-bold text-emerald-600">硬件级加密</span>
                              </div>
                            </div>
                            <div className="text-right flex flex-col items-end">
                               <span className="text-[9px] font-black text-neutral-300 uppercase tracking-widest">最后活动</span>
                               <span className="text-[10px] font-bold text-neutral-500 mt-1">{new Date(dev.lastUsed).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </GlassCard>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          )}

          {activeTab === 'nas' && (
            <div className="space-y-6">
               <GlassCard className="p-8 border-neutral-100">
                  <div className="flex items-center justify-between mb-8">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                           <Server className="w-6 h-6" />
                        </div>
                        <div>
                           <h4 className="font-black text-neutral-900">本地 NAS 节点</h4>
                           <p className="text-xs text-neutral-400">同步序列：HL-NAS-9281 (Online)</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black text-emerald-500 uppercase">Connected</span>
                     </div>
                  </div>
                  
                  <div className="space-y-6">
                     <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                        <div className="space-y-1">
                           <span className="text-sm font-bold">端到端同步加密</span>
                           <p className="text-[10px] text-neutral-400">所有传输数据通过 AES-256 位加密</p>
                        </div>
                        <div className="w-12 h-6 bg-neutral-900 rounded-full relative">
                           <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow-md" />
                        </div>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-white border border-neutral-100">
                           <span className="text-[9px] font-black text-neutral-400 uppercase block mb-1">同步频率</span>
                           <span className="text-sm font-bold">实时同步</span>
                        </div>
                        <div className="p-4 rounded-2xl bg-white border border-neutral-100">
                           <span className="text-[9px] font-black text-neutral-400 uppercase block mb-1">已用空间</span>
                           <span className="text-sm font-bold">2.4 GB / 2 TB</span>
                        </div>
                     </div>
                  </div>
               </GlassCard>

               <GlassCard className="p-6 border-rose-50 bg-rose-50/10">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                           <Trash2 className="w-5 h-5" />
                        </div>
                        <div>
                           <h4 className="text-sm font-black text-rose-900">销毁本地镜像</h4>
                           <p className="text-[10px] text-rose-600/60">立即擦除手机端的健康缓存数据</p>
                        </div>
                     </div>
                     <button className="px-4 py-2 bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-rose-600/20">
                        立即执行
                     </button>
                  </div>
               </GlassCard>
            </div>
          )}

          {activeTab === 'acl' && (
             <div className="space-y-6 text-center py-20">
                <div className="w-20 h-20 bg-neutral-100 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-neutral-300">
                   <Database className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-black text-neutral-900">审计日志加载中...</h3>
                <p className="text-sm text-neutral-400">正在从您的本地 NAS 节点检索访问记录</p>
             </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

function TabBtn({ active, onClick, label, icon: Icon }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "h-10 px-6 rounded-[14px] flex items-center gap-2 text-xs font-bold transition-all whitespace-nowrap",
        active ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-400 hover:text-neutral-600"
      )}
    >
       <Icon className="w-3.5 h-3.5" />
       {label}
    </button>
  );
}
