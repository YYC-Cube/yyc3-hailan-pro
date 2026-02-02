import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wallet, 
  ShieldCheck, 
  Key, 
  Lock, 
  ChevronRight, 
  ExternalLink, 
  Fingerprint, 
  RefreshCw,
  CheckCircle2,
  FileCheck,
  Smartphone,
  Server,
  Plus
} from "lucide-react";
import { GlassCard } from "@/app/components/design-system/GlassCard";
import { cn } from "@/app/components/design-system/utils";
import { WebAuthnService } from "@/lib/webauthn";
import { toast } from "sonner";

export function WalletAuthPanel() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showSignRequest, setShowSignRequest] = useState(false);
  const [isWebAuthnRegistered, setIsWebAuthnRegistered] = useState(WebAuthnService.getDevices().length > 0);
  const [registeringWebAuthn, setRegisteringWebAuthn] = useState(false);

  const connectWallet = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 1500);
  };

  const handleWebAuthnRegistration = async () => {
    if (!WebAuthnService.isSupported()) {
      toast.error("当前浏览器不支持 WebAuthn");
      return;
    }

    try {
      setRegisteringWebAuthn(true);
      const credential = await WebAuthnService.registerCredential("HaiLan User");
      if (credential) {
        setIsWebAuthnRegistered(true);
        toast.success("生物识别验证已成功绑定");
        // Reload page or use an event emitter to update the parent if needed
        // For this mock, we just update local state
      }
    } catch (err: any) {
      if (err.name !== 'NotAllowedError') {
        toast.error(`绑定失败: ${err.message}`);
      }
    } finally {
      setRegisteringWebAuthn(false);
    }
  };

  const handleSignRequest = () => {
    setShowSignRequest(true);
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <GlassCard className="p-8 border-neutral-100 relative overflow-hidden">
         {!isConnected && (
           <div className="absolute inset-0 bg-neutral-900/5 backdrop-blur-sm z-10 flex items-center justify-center p-8 text-center">
              <div className="space-y-4">
                 <div className="w-16 h-16 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto border border-neutral-100">
                    <Wallet className="w-8 h-8 text-indigo-600" />
                 </div>
                 <h4 className="text-xl font-black text-neutral-900">启用 Web3 身份主权</h4>
                 <p className="text-sm text-neutral-500 max-w-xs mx-auto">使用加密钱包管理您的健康数据所有权与 ZK 报告分发授权。</p>
                 <button 
                   onClick={connectWallet}
                   disabled={isConnecting}
                   className="w-full h-14 bg-neutral-900 text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all shadow-xl shadow-neutral-900/20"
                 >
                    {isConnecting ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Wallet className="w-5 h-5" />}
                    {isConnecting ? "正在验证节点..." : "连接私有钱包"}
                 </button>
              </div>
           </div>
         )}

         <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Fingerprint className="w-6 h-6" />
               </div>
               <div>
                  <h4 className="font-black text-neutral-900">身份主权：已连接</h4>
                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-1 font-mono">0x71C...8eA2</p>
               </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 text-[10px] font-black uppercase tracking-widest">
               <ShieldCheck className="w-3.5 h-3.5" /> Verified
            </div>
         </div>

         <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
               <span className="text-[9px] font-black text-neutral-400 uppercase block mb-1">私钥托管节点</span>
               <div className="flex items-center gap-2">
                  <Server className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="text-xs font-bold">Local NAS (Active)</span>
               </div>
            </div>
            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
               <span className="text-[9px] font-black text-neutral-400 uppercase block mb-1">授权资产</span>
               <div className="flex items-center gap-2">
                  <FileCheck className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="text-xs font-bold">12 ZK-Reports</span>
               </div>
            </div>
         </div>
      </GlassCard>

      {/* Permissions Management */}
      <section className="space-y-4">
         <h5 className="text-sm font-black text-neutral-400 uppercase tracking-widest px-4">硬件级隐私保护</h5>
         <div className="space-y-3">
            <div className="p-6 bg-white border border-neutral-100 rounded-[2rem] shadow-sm">
               <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                     <div className={cn(
                       "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                       isWebAuthnRegistered ? "bg-emerald-50 text-emerald-600" : "bg-indigo-50 text-indigo-600"
                     )}>
                        <Fingerprint className="w-6 h-6" />
                     </div>
                     <div>
                        <h6 className="font-black text-neutral-900">生物识别 / 安全密钥 (WebAuthn)</h6>
                        <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-black">FIDO2 / Passwordless Standard</p>
                     </div>
                  </div>
                  {isWebAuthnRegistered && (
                     <div className="flex items-center gap-1 text-emerald-500">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">已绑定</span>
                     </div>
                  )}
               </div>
               <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
                  通过绑定您的设备生物识别（如 FaceID、TouchID）或硬件安全密钥，实现在不传输私钥的情况下完成身份验证。
               </p>
               <button 
                  onClick={handleWebAuthnRegistration}
                  disabled={registeringWebAuthn || isWebAuthnRegistered}
                  className={cn(
                    "w-full h-12 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2",
                    isWebAuthnRegistered 
                      ? "bg-neutral-50 text-neutral-400 cursor-not-allowed border border-neutral-100" 
                      : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/20"
                  )}
               >
                  {registeringWebAuthn ? <RefreshCw className="w-4 h-4 animate-spin" /> : isWebAuthnRegistered ? <ShieldCheck className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {registeringWebAuthn ? "正在调用设备接口..." : isWebAuthnRegistered ? "硬件身份已激活" : "立即绑定安全设备"}
               </button>
            </div>

            <h5 className="text-sm font-black text-neutral-400 uppercase tracking-widest px-4 pt-4">精细化授权管理 (ACL)</h5>
            <PermissionItem 
               icon={Smartphone} 
               label="Nebula Pulse 同步授权" 
               status="已授权"
               active
            />
            <PermissionItem 
               icon={ShieldCheck} 
               label="社区匿名 ZK 报告分发" 
               status="需签名"
               onClick={handleSignRequest}
            />
            <PermissionItem 
               icon={Lock} 
               label="第三方医疗机构临时访问" 
               status="未启用"
            />
         </div>
      </section>

      {/* Sign Request Modal */}
      <AnimatePresence>
        {showSignRequest && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-neutral-900/60 backdrop-blur-xl flex items-center justify-center p-6"
          >
             <motion.div 
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               className="w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl space-y-8"
             >
                <div className="text-center space-y-4">
                   <div className="w-20 h-20 bg-indigo-50 rounded-[2rem] flex items-center justify-center mx-auto">
                      <Key className="w-10 h-10 text-indigo-600 animate-pulse" />
                   </div>
                   <h3 className="text-2xl font-black text-neutral-900">签名请求</h3>
                   <p className="text-sm text-neutral-500">
                      您正在授权分享一份关于 **“HRV 深度恢复”** 的 ZK-Proof 报告。此操作将使用您的钱包私钥进行离线签名确认。
                   </p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 font-mono text-[10px] text-neutral-400 break-all leading-relaxed">
                   MESSAGE_HASH: 0x82ae...d91f<br />
                   TIMESTAMP: 1738080000<br />
                   PERM: READ_ZK_REPORT_ANON
                </div>

                <div className="flex gap-4">
                   <button 
                     onClick={() => setShowSignRequest(false)}
                     className="flex-1 h-14 rounded-2xl border border-neutral-100 text-neutral-400 font-bold hover:bg-neutral-50 transition-all"
                   >
                      取消
                   </button>
                   <button 
                     onClick={() => setShowSignRequest(false)}
                     className="flex-1 h-14 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
                   >
                      立即签名
                   </button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PermissionItem({ icon: Icon, label, status, active, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "p-4 rounded-[1.5rem] border transition-all flex items-center justify-between group",
        active ? "bg-white border-neutral-100 shadow-sm" : "bg-neutral-50 border-transparent opacity-60",
        onClick && "cursor-pointer hover:border-indigo-200 hover:bg-indigo-50/10"
      )}
    >
       <div className="flex items-center gap-4">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
            active ? "bg-indigo-600 text-white" : "bg-neutral-200 text-neutral-400"
          )}>
             <Icon className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold text-neutral-900">{label}</span>
       </div>
       <div className="flex items-center gap-2">
          <span className={cn(
            "text-[10px] font-black uppercase tracking-widest",
            status === '已授权' ? "text-emerald-500" : status === '需签名' ? "text-amber-500" : "text-neutral-400"
          )}>{status}</span>
          <ChevronRight className="w-4 h-4 text-neutral-200 group-hover:text-neutral-400 transition-all" />
       </div>
    </div>
  );
}
