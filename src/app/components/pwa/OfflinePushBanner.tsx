import React, { useState, useEffect } from 'react';
import { WifiOff, ShieldCheck, Zap, RefreshCw, Radio, Server, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/app/components/design-system/utils';

export function OfflinePushBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const triggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  return (
    <>
      {isOffline && (
        <div className="fixed top-0 left-0 right-0 z-[100] px-4 pt-4 pointer-events-none animate-slideUp">
          <div className="max-w-xl mx-auto pointer-events-auto">
             <div className="bg-brand-navy text-white rounded-3xl p-4 shadow-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-xl bg-brand-navy/90">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-2xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                      <WifiOff className="w-5 h-5 text-amber-500" />
                   </div>
                   <div>
                      <h4 className="text-sm font-bold flex items-center gap-2">
                         离线智感模式已激活
                         <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest border border-emerald-400/30 px-1.5 rounded">Local Mode</span>
                      </h4>
                      <p className="text-[11px] text-white/50 mt-0.5">场景联动逻辑已切换至本地 NAS 核心运行，无需公网连接。</p>
                   </div>
                </div>
                
                <div className="flex items-center gap-2 w-full md:w-auto">
                   <button 
                     onClick={triggerSync}
                     disabled={isSyncing}
                     className="flex-1 md:flex-none h-10 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold transition-all flex items-center justify-center gap-2"
                   >
                      {isSyncing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                      同步状态
                   </button>
                   <div className="h-10 px-4 rounded-xl bg-emerald-500 text-brand-navy text-xs font-bold flex items-center justify-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      安全可用
                   </div>
                </div>
             </div>
             
             {/* Offline Capability Indicators */}
             <div className="flex justify-center gap-2 mt-2">
                <OfflineTag icon={Zap} label="自动化响应 0ms" />
                <OfflineTag icon={Server} label="NAS 链路加密中" />
                <OfflineTag icon={Radio} label="本地 P2P 网络活跃" />
             </div>
          </div>
        </div>
      )}
    </>
  );
}

function OfflineTag({ icon: Icon, label }: any) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1 bg-brand-navy/80 backdrop-blur-md rounded-full border border-white/5 text-[8px] font-black text-white/40 uppercase tracking-widest">
       <Icon className="w-2.5 h-2.5" />
       {label}
    </div>
  );
}
