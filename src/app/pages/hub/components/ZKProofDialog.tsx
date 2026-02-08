import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { ShieldCheck, Copy, CheckCircle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface ZKProofDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ZKProofDialog({ open, onOpenChange }: ZKProofDialogProps) {
  const [step, setStep] = useState<"idle" | "generating" | "complete">("idle");
  const [proof, setProof] = useState<string>("");

  const handleGenerate = () => {
    setStep("generating");
    
    // Simulate complex proof generation
    setTimeout(() => {
      setProof("zk-snark-" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
      setStep("complete");
    }, 2500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(proof);
    // Could add toast here
  };

  const reset = () => {
    setStep("idle");
    setProof("");
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
        onOpenChange(val);
        if (!val) setTimeout(reset, 300);
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>生成零知识证明 (ZK-Proof)</DialogTitle>
          <DialogDescription>
            创建一个临时访问令牌。接收方可以验证您的健康数据真实性（如：COVID 阴性、无遗传病史），而无需查看原始医疗记录。
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 flex flex-col items-center justify-center min-h-[240px]">
          {step === "idle" && (
            <div className="text-center space-y-6">
               <div className="w-24 h-24 mx-auto bg-brand-hailan-blue/10 rounded-full flex items-center justify-center text-brand-hailan-blue">
                  <ShieldCheck className="w-12 h-12" />
               </div>
               <p className="text-sm text-neutral-500 max-w-xs mx-auto">
                 该操作将在您的设备本地计算生成加密证明。您的私钥不会离开设备。
               </p>
               <Button onClick={handleGenerate} className="bg-brand-hailan-blue text-white w-full">
                 开始生成证明
               </Button>
            </div>
          )}

          {step === "generating" && (
             <div className="text-center space-y-6">
                <div className="relative w-24 h-24 mx-auto">
                   <motion.div 
                     className="absolute inset-0 border-4 border-brand-hailan-blue/20 rounded-full" 
                   />
                   <motion.div 
                     className="absolute inset-0 border-4 border-t-brand-hailan-blue rounded-full"
                     animate={{ rotate: 360 }}
                     transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                   />
                   <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-brand-hailan-blue">
                     COMPUTING
                   </div>
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy">正在计算 SNARKs 证明...</h3>
                  <p className="text-xs text-neutral-400 mt-1">验证多项式承诺 / 混淆电路构建中</p>
                </div>
             </div>
          )}

          {step === "complete" && (
             <div className="w-full space-y-6 animate-in fade-in zoom-in duration-300">
                <div className="flex flex-col items-center gap-2 text-green-500">
                   <CheckCircle className="w-12 h-12" />
                   <span className="font-bold">生成成功</span>
                </div>
                
                <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100 space-y-2">
                   <label className="text-[10px] font-black uppercase text-neutral-400 tracking-widest">Proof Token</label>
                   <div className="flex items-center gap-2">
                      <code className="flex-1 bg-white p-2 rounded border border-neutral-100 text-xs font-mono text-neutral-600 truncate">
                         {proof}
                      </code>
                      <Button size="icon" variant="ghost" onClick={handleCopy}>
                         <Copy className="w-4 h-4" />
                      </Button>
                   </div>
                   <div className="text-[10px] text-neutral-400">有效时间: 15 分钟</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                   <Button variant="outline" onClick={reset}>
                      <RefreshCw className="w-4 h-4 mr-2" /> 重新生成
                   </Button>
                   <Button className="bg-brand-navy text-white" onClick={() => onOpenChange(false)}>
                      完成
                   </Button>
                </div>
             </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
