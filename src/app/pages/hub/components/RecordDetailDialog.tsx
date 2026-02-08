import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { HealthRecord } from "@/lib/healthRecord";
import { Lock, Unlock, FileText, Download, Share2, Printer, Activity, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface RecordDetailDialogProps {
  record: HealthRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RecordDetailDialog({ record, open, onOpenChange }: RecordDetailDialogProps) {
  const [decrypted, setDecrypted] = useState(false);
  const [decrypting, setDecrypting] = useState(false);

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (open) {
      setDecrypted(false);
      setDecrypting(false);
    }
  }, [open]);

  if (!record) return null;

  const handleDecrypt = () => {
    setDecrypting(true);
    setTimeout(() => {
      setDecrypting(false);
      setDecrypted(true);
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
             <span className="px-2 py-1 rounded-md bg-neutral-100 text-[10px] font-black uppercase text-neutral-500 tracking-wider">
               {record.type}
             </span>
             {record.securityLevel === 'Maximum' && (
               <span className="px-2 py-1 rounded-md bg-rose-100 text-[10px] font-black uppercase text-rose-600 tracking-wider flex items-center gap-1">
                 <AlertCircle className="w-3 h-3" /> Top Secret
               </span>
             )}
          </div>
          <DialogTitle className="text-2xl">{record.title}</DialogTitle>
          <DialogDescription className="font-mono text-xs">
            ID: {record.id} • {record.date} • SHA-256: 8f43...a91z
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* File Preview Area */}
          <div className="relative w-full aspect-[4/3] bg-neutral-900 rounded-xl overflow-hidden flex items-center justify-center text-neutral-500 border border-neutral-800 shadow-inner">
             
             {!decrypted ? (
               <div className="text-center p-8">
                  <Lock className="w-16 h-16 mx-auto mb-4 text-neutral-700" />
                  <h3 className="text-neutral-300 font-bold mb-2">内容已加密</h3>
                  <p className="text-xs text-neutral-500 max-w-xs mx-auto mb-6">
                    文件内容受到端到端加密保护。请点击下方按钮，使用您的私钥在本地进行解密查看。
                  </p>
                  <Button 
                    onClick={handleDecrypt} 
                    disabled={decrypting}
                    className="bg-brand-hailan-blue hover:bg-brand-hailan-blue-hover text-white min-w-[160px]"
                  >
                    {decrypting ? "正在解密..." : "解密内容"}
                  </Button>
               </div>
             ) : (
               <motion.div 
                 initial={{ opacity: 0, filter: "blur(10px)" }}
                 animate={{ opacity: 1, filter: "blur(0px)" }}
                 className="w-full h-full bg-white text-neutral-900 p-8 overflow-y-auto text-left"
               >
                  {/* Mock Decrypted Content */}
                  <div className="max-w-none prose prose-sm">
                    <h3 className="flex items-center gap-2 border-b pb-2 mb-4">
                      <Activity className="w-5 h-5 text-brand-hailan-blue" /> 
                      医学检测报告单
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-xs font-mono mb-6 bg-neutral-50 p-4 rounded-lg">
                       <div>
                         <span className="text-neutral-400">检测编号:</span> 2026-XJ-9281
                       </div>
                       <div>
                         <span className="text-neutral-400">样本采集:</span> {record.date} 09:30
                       </div>
                       <div>
                         <span className="text-neutral-400">检测机构:</span> 海蓝高端医疗中心
                       </div>
                       <div>
                         <span className="text-neutral-400">主治医师:</span> Dr. Sarah Jen
                       </div>
                    </div>
                    <p className="font-bold mb-2">临床发现：</p>
                    <p className="mb-4">
                      受检者各项生命体征平稳。心血管系统功能分析显示左心室射血分数正常 (65%)。
                      血液生化指标中，高密度脂蛋白 (HDL) 略有升高，建议保持当前运动习惯。
                      神经系统扫描未发现异常信号灶。
                    </p>
                    <p className="font-bold mb-2">建议：</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>建议每 6 个月进行一次例行复查。</li>
                      <li>继续保持低钠饮食。</li>
                      <li>补充维生素 D3。</li>
                    </ul>
                  </div>
               </motion.div>
             )}

             {/* Matrix Rain Effect Overlay while decrypting */}
             <AnimatePresence>
                {decrypting && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 z-10 flex items-center justify-center font-mono text-green-500 text-xs overflow-hidden leading-none break-all p-4 opacity-50"
                  >
                     {/* Just a visual noise placeholder */}
                     01010101011001010101001010101110101010010101001010101...
                  </motion.div>
                )}
             </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
             <Button variant="outline" size="sm" disabled={!decrypted}>
                <Printer className="w-4 h-4 mr-2" /> 打印
             </Button>
             <Button variant="outline" size="sm" disabled={!decrypted}>
                <Share2 className="w-4 h-4 mr-2" /> 安全分享
             </Button>
             <Button className="bg-brand-navy text-white" size="sm" disabled={!decrypted}>
                <Download className="w-4 h-4 mr-2" /> 导出文件
             </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
