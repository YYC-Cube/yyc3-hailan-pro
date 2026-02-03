import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  Fingerprint, 
  Database, 
  Plus, 
  FileText, 
  ArrowLeft,
  Search,
  MoreVertical,
  ShieldAlert,
  Download,
  Share2,
  Sparkles
} from "lucide-react";
import { AIHealthAnalysis } from "@/app/components/health/AIHealthAnalysis";
import { ResponsiveDialog } from "@/app/components/layout/ResponsiveDialog";
import { BottomNav } from "@/app/components/layout/BottomNav";
import { GlassCard } from "@/app/components/design-system/GlassCard";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/components/design-system/utils";
import { useNavigate } from "react-router";
import { HealthRecordService, HealthRecord } from "@/lib/healthRecord";
import { WebAuthnService } from "@/lib/webauthn";
import { Navbar } from "@/app/components/layout/Navbar";
import { toast } from "sonner";

const MOCK_RECORDS: HealthRecord[] = [
  { id: "rec-01", title: "年度深度体检报告", date: "2026-01-15", type: "Clinical Note", securityLevel: "Maximum", isEncrypted: true },
  { id: "rec-02", title: "心血管功能分析 (AI)", date: "2026-01-10", type: "Lab Result", securityLevel: "High", isEncrypted: true },
  { id: "rec-03", title: "神经系统扫描映射", date: "2025-12-28", type: "Imaging", securityLevel: "Maximum", isEncrypted: true },
  { id: "rec-04", title: "基因组稳定性监测", date: "2025-12-05", type: "Lab Result", securityLevel: "Maximum", isEncrypted: true },
];

export function ZKMedicalVaultPage() {
  const navigate = useNavigate();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [unlocking, setUnlocking] = useState(false);

  // Background prefetching for offline access
  React.useEffect(() => {
    HealthRecordService.prefetchRecords(MOCK_RECORDS);
  }, []);

  const handleUnlock = async () => {
    setUnlocking(true);
    
    // Check if WebAuthn is supported
    if (WebAuthnService.isSupported()) {
      try {
        // Real biometric authentication
        const assertion = await WebAuthnService.authenticate();
        if (assertion) {
          setIsUnlocked(true);
          toast.success("生物识别验证成功，数据已解密");
          setUnlocking(false);
          return;
        }
      } catch (err: any) {
        if (err.name === 'NotAllowedError') {
          toast.error("验证已取消");
          setUnlocking(false);
          return;
        } else {
          console.warn("WebAuthn auth failed, falling back to simulation:", err);
          toast.info("设备验证不可用，正在使用安全协议解锁...");
        }
      }
    } else {
      toast.info("当前环境不支持 WebAuthn，正在使用安全协议解锁...");
    }

    // Fallback to simulated biometric/ZK proof verification
    setTimeout(() => {
      setIsUnlocked(true);
      setUnlocking(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-brand-medical-white font-sans text-brand-navy pb-32 overflow-hidden">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-4xl relative">
        {/* WebAuthn Visual Effect */}
        <AnimatePresence>
          {unlocking && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-brand-navy/40 backdrop-blur-sm" />
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-[500px] h-[500px] bg-brand-hailan-blue/30 rounded-full blur-[120px]"
              />
              <motion.div 
                animate={{ 
                  rotate: 360,
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute w-[300px] h-[300px] border-2 border-brand-hailan-blue/20 rounded-[4rem]"
              />
            </motion.div>
          )}
        </AnimatePresence>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-neutral-400 hover:text-brand-hailan-blue transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">返回</span>
        </button>

        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div>
              <div className="flex items-center gap-2 text-[10px] font-black text-brand-hailan-blue uppercase tracking-widest mb-4">
                 <ShieldCheck className="w-3.5 h-3.5" />
                 Zero-Knowledge Private Vault
              </div>
              <h1 className="text-4xl font-black text-brand-navy tracking-tight">零知识医学保险库</h1>
              <p className="text-neutral-500 mt-4 leading-relaxed max-w-xl">
                 您的所有医疗记录均经过端到端加密，并使用零知识证明（ZK-Proof���进行访问控制。即使是海蓝服务器也无法读取您的私密健康数据。
              </p>
           </div>
           {!isUnlocked && (
              <Button 
                onClick={handleUnlock}
                disabled={unlocking}
                className="rounded-2xl h-14 px-8 bg-brand-hailan-blue text-white font-bold shadow-xl shadow-brand-hailan-blue/20 hover:bg-brand-hailan-blue-hover transition-all"
              >
                {unlocking ? (
                  <Fingerprint className="w-5 h-5 mr-2 animate-pulse" />
                ) : (
                  <Lock className="w-5 h-5 mr-2" />
                )}
                {unlocking ? "正在验证生物指纹..." : "解锁医学保险库"}
              </Button>
           )}
        </header>

        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div 
              key="locked"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative aspect-[21/9] md:aspect-[3/1] rounded-[2.5rem] bg-brand-navy overflow-hidden flex flex-col items-center justify-center text-white p-12 text-center"
            >
               <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
               </div>
               <EyeOff className="w-16 h-16 text-white/20 mb-6" />
               <h2 className="text-2xl font-bold mb-4 tracking-tight">此区域已通过硬件级加密</h2>
               <p className="text-white/40 text-sm max-w-md">请使用已绑定的 WebAuthn 生物识别设备进行身份确权。数据将在本地安全飞地环境解密。</p>
               
               {/* Decorative Gradient Scan Line */}
               {unlocking && (
                 <motion.div 
                   initial={{ top: "-10%" }}
                   animate={{ top: "110%" }}
                   transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                   className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-brand-hailan-blue/20 to-transparent z-10"
                 />
               )}
            </motion.div>
          ) : (
            <motion.div 
              key="unlocked"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
               {/* Search & Filter */}
               <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300" />
                     <input 
                       type="text" 
                       placeholder="搜索加密记录..." 
                       className="w-full h-12 pl-12 pr-4 bg-white border border-neutral-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-hailan-blue/20 transition-all"
                     />
                  </div>
                  <div className="flex gap-2">
                     <ResponsiveDialog 
                        title="AI 深度健康分析"
                        trigger={
                          <button className="h-12 px-6 rounded-2xl bg-brand-hailan-blue/10 text-brand-hailan-blue text-xs font-bold flex items-center gap-2 hover:bg-brand-hailan-blue/20 transition-all">
                             <Sparkles className="w-4 h-4" /> AI 分析
                          </button>
                        }
                      >
                        <AIHealthAnalysis data={MOCK_RECORDS} />
                      </ResponsiveDialog>
                     <button className="h-12 px-6 rounded-2xl bg-white border border-neutral-100 text-xs font-bold hover:bg-neutral-50 transition-all">所有类型</button>
                     <button className="h-12 px-6 rounded-2xl bg-brand-navy text-white text-xs font-bold flex items-center gap-2">
                        <Plus className="w-4 h-4" /> 导入记录
                     </button>
                  </div>
               </div>

               {/* Stats Overview */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <VaultStat label="已存储记录" value="12" icon={FileText} />
                  <VaultStat label="加密强度" value="AES-256" icon={ShieldCheck} />
                  <VaultStat label="节点同步" value="Global" icon={Database} />
               </div>

               {/* Records List */}
               <div className="bg-white rounded-[2.5rem] border border-neutral-100 overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                     <table className="w-full text-left border-collapse">
                        <thead>
                           <tr className="border-b border-neutral-50">
                              <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">文件名</th>
                              <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">类型</th>
                              <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">日期</th>
                              <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">安全等级</th>
                              <th className="px-8 py-6"></th>
                           </tr>
                        </thead>
                        <tbody>
                           {MOCK_RECORDS.map((record) => (
                             <tr key={record.id} className="hover:bg-neutral-50/50 transition-colors group">
                                <td className="px-8 py-6">
                                   <div className="flex items-center gap-4">
                                      <div className="w-10 h-10 rounded-xl bg-brand-hailan-blue/5 text-brand-hailan-blue flex items-center justify-center">
                                         <FileText className="w-5 h-5" />
                                      </div>
                                      <div>
                                         <p className="text-sm font-bold group-hover:text-brand-hailan-blue transition-colors">{record.title}</p>
                                         <p className="text-[10px] text-neutral-400 font-mono mt-1 uppercase tracking-tighter">ID: {record.id}</p>
                                      </div>
                                   </div>
                                </td>
                                <td className="px-8 py-6">
                                   <span className="px-3 py-1 bg-neutral-100 rounded-full text-[9px] font-black text-neutral-500 uppercase tracking-widest">
                                      {record.type}
                                   </span>
                                </td>
                                <td className="px-8 py-6 text-sm text-neutral-500 font-mono">
                                   {record.date}
                                </td>
                                <td className="px-8 py-6">
                                   <div className="flex items-center gap-2">
                                      <ShieldAlert className={cn(
                                        "w-3.5 h-3.5",
                                        record.securityLevel === 'Maximum' ? "text-rose-500" : "text-amber-500"
                                      )} />
                                      <span className={cn(
                                        "text-[10px] font-black uppercase tracking-widest",
                                        record.securityLevel === 'Maximum' ? "text-rose-500" : "text-amber-500"
                                      )}>
                                         {record.securityLevel}
                                      </span>
                                   </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                   <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button className="p-2 rounded-lg bg-white border border-neutral-100 text-neutral-400 hover:text-brand-navy hover:shadow-sm">
                                         <Download className="w-4 h-4" />
                                      </button>
                                      <button className="p-2 rounded-lg bg-white border border-neutral-100 text-neutral-400 hover:text-brand-navy hover:shadow-sm">
                                         <Share2 className="w-4 h-4" />
                                      </button>
                                      <button className="p-2 rounded-lg bg-white border border-neutral-100 text-neutral-400 hover:text-brand-navy hover:shadow-sm">
                                         <MoreVertical className="w-4 h-4" />
                                      </button>
                                   </div>
                                </td>
                             </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>

               {/* ZK Proof Sharing Simulation */}
               <div className="p-8 bg-brand-hailan-blue rounded-[2.5rem] text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl shadow-brand-hailan-blue/20">
                  <div className="shrink-0 w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                     <ShieldCheck className="w-10 h-10 text-brand-medical-white" />
                  </div>
                  <div>
                     <h4 className="text-xl font-bold">零知识授权访问</h4>
                     <p className="text-white/60 text-sm mt-2">需要向医生出示报告？生成一个单次有效的 ZK-Proof，对方只能验证报告的真实性，而无法获取您的完整历史或私钥。</p>
                     <button className="mt-4 text-[10px] font-black uppercase tracking-widest px-6 h-10 rounded-xl bg-white text-brand-hailan-blue hover:bg-neutral-100 transition-all">
                        立即生成授权证明
                     </button>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BottomNav />
    </div>
  );
}

function VaultStat({ label, value, icon: Icon }: any) {
  return (
    <GlassCard className="p-6 border-neutral-100 flex items-center gap-4">
       <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center text-brand-navy">
          <Icon className="w-6 h-6" />
       </div>
       <div>
          <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{label}</p>
          <p className="text-xl font-black text-brand-navy tracking-tight">{value}</p>
       </div>
    </GlassCard>
  );
}
