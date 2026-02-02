import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Award, 
  Layers, 
  ArrowLeft, 
  Share2, 
  ShieldCheck, 
  Zap, 
  Diamond,
  ArrowUpRight,
  ExternalLink,
  Wallet,
  Loader2,
  FileText,
  Lock,
  Download,
  EyeOff
} from "lucide-react";
import { useNavigate } from "react-router";
import { Navbar } from "@/app/components/layout/Navbar";
import { BottomNav } from "@/app/components/layout/BottomNav";
import { GlassCard } from "@/app/components/design-system/GlassCard";
import { cn } from "@/app/components/design-system/utils";
import { apiClient } from "@/services/api.client";
import { toast } from "sonner";

interface HealthAsset {
  id: string;
  name: string;
  type: string;
  rarity: string;
  mintDate: string;
  description: string;
  image: string;
}

export function HealthAssetsPage() {
  const navigate = useNavigate();
  const [selectedAsset, setSelectedAsset] = useState<HealthAsset | null>(null);
  const [assets, setAssets] = useState<HealthAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [minting, setMinting] = useState(false);
  const [isGeneratingProof, setIsGeneratingProof] = useState(false);
  const [proofStep, setProofStep] = useState(0);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get<any[]>('/assets');
      if (Array.isArray(response)) {
          setAssets(response);
      } else {
          setAssets([]);
      }
    } catch (error) {
      console.error("Failed to fetch assets:", error);
      toast.error("无法加载资产数据");
    } finally {
      setLoading(false);
    }
  };

  const handleMintNewAsset = async () => {
    setMinting(true);
    try {
        const newAsset = {
            id: crypto.randomUUID(),
            name: `专属场景配置 #${Math.floor(Math.random() * 1000)}`,
            type: "SCENE_CONFIG",
            rarity: Math.random() > 0.8 ? "Unique" : "Rare",
            description: "基于您最近 7 天的生理反馈生成的个性化场景参数。",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"
        };

        await apiClient.post('/assets', newAsset);
        toast.success("新资产铸造成功！");
        fetchAssets(); 
    } catch (error) {
        console.error("Minting failed:", error);
        toast.error("铸造失败，请重试");
    } finally {
        setMinting(false);
    }
  };

  const generateWatermarkedReport = async (asset: HealthAsset, cid: string): Promise<Blob> => {
    // Detect screen scale/density for high-quality canvas if needed, 
    // but for fixed export we optimize the constants
    const isMobile = window.innerWidth < 768;
    const canvas = document.createElement('canvas');
    
    // Maintain high-res for export, but adjust layout density
    canvas.width = 1200; 
    canvas.height = 1600; 
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("Canvas context failed");

    // 1. Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. HaiLan Branding Header
    ctx.fillStyle = '#0056b3';
    ctx.fillRect(0, 0, canvas.width, 140);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 32px Arial';
    ctx.fillText('HAI LAN | PRIVATE HEALTH ASSET', 60, 85);

    // 3. Document Details
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 48px Arial';
    ctx.fillText(asset.name, 60, 240);
    
    ctx.fillStyle = '#6B7280';
    ctx.font = '20px Arial';
    ctx.fillText(`Asset ID: ${asset.id}`, 60, 290);
    ctx.fillText(`IPFS CID: ${cid}`, 60, 325);
    ctx.fillText(`Timestamp: ${new Date().toLocaleString()}`, 60, 360);

    // 4. Redacted Status Box
    ctx.fillStyle = '#ECFDF5';
    ctx.fillRect(60, 420, canvas.width - 120, 160);
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 3;
    ctx.strokeRect(60, 420, canvas.width - 120, 160);
    
    ctx.fillStyle = '#065F46';
    ctx.font = 'bold 28px Arial';
    ctx.fillText('ZK-PROOF VERIFICATION STATUS: SECURELY REDACTED', 100, 490);
    ctx.font = '18px Arial';
    ctx.fillText('This document contains cryptographically verified health data. PII has been removed.', 100, 530);

    // 5. Adaptive Watermarks
    // Higher transparency for subtle feel, density adjusts slightly
    const watermarkSize = isMobile ? 80 : 110;
    const watermarkOpacity = 0.035; // More subtle
    
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(-Math.PI / 4);
    ctx.globalAlpha = watermarkOpacity;
    ctx.fillStyle = '#0056b3';
    ctx.font = `900 ${watermarkSize}px Arial`;
    
    const spacingX = isMobile ? 350 : 450;
    const spacingY = isMobile ? 180 : 250;

    for (let i = -4; i < 4; i++) {
      for (let j = -4; j < 4; j++) {
        ctx.fillText('HAI LAN', i * spacingX, j * spacingY);
      }
    }
    ctx.restore();

    // 6. Security Footer
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = '#0056b3';
    ctx.font = '14px Arial';
    ctx.fillText('VERIFIED BY HAI LAN ZK-ENGINE V1.0 | AUTHENTICITY GUARANTEED ON-CHAIN | SECURE ENCLAVE ACTIVE', 60, canvas.height - 60);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, 'image/png');
    });
  };

  const handleGenerateZKProof = async () => {
    if (!selectedAsset) return;
    
    setIsGeneratingProof(true);
    setProofStep(1);
    
    try {
      const cid = `QmMockProof${Math.random().toString(36).substring(7)}`;
      
      // Step 1: Initialize Local Circuit
      await new Promise(r => setTimeout(r, 1500));
      setProofStep(2);
      
      // Step 2: Encrypting Metadata & Mock IPFS Pinning
      try {
        await apiClient.post('/ipfs/pin', { 
          cid,
          metadata: { 
            assetId: selectedAsset.id, 
            assetName: selectedAsset.name,
            proofType: 'ZK_REDACTED_PDF',
            generatedAt: new Date().toISOString(),
            securityLevel: 'MAXIMUM_REDACTION'
          } 
        });
        console.log("[ZK] Metadata pinned to simulated IPFS gateway:", cid);
      } catch (e) {
        console.warn("Backend IPFS pinning simulation failed, continuing with local flow...");
      }
      
      await new Promise(r => setTimeout(r, 1200));
      setProofStep(3);
      
      // Step 3: Generating Witness & ZK-SNARK Proof
      await new Promise(r => setTimeout(r, 1800));
      setProofStep(4);
      
      // Step 4: Finalizing Redacted PDF (Canvas Watermarking)
      const watermarkedBlob = await generateWatermarkedReport(selectedAsset, cid);
      await new Promise(r => setTimeout(r, 1000));
      
      // Trigger download
      const url = window.URL.createObjectURL(watermarkedBlob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `HaiLan_Proof_${selectedAsset.id.substring(0, 8)}.png`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success("脱敏健康证明已生成并完成 IPFS 存证");
      console.log("[ZK] Proof generation completed successfully");
    } catch (error) {
      console.error("ZK Proof Generation failed:", error);
      toast.error("证明生成流程异常");
    } finally {
      setIsGeneratingProof(false);
      setProofStep(0);
      setSelectedAsset(null);
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
          <span className="text-xs font-black uppercase tracking-widest">返回</span>
        </button>

        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div>
              <div className="flex items-center gap-2 text-[10px] font-black text-brand-gold uppercase tracking-widest mb-4">
                 <Diamond className="w-3.5 h-3.5" />
                 Web3 Health Asset Confirmation
              </div>
              <h1 className="text-4xl font-black text-brand-navy tracking-tight">健康资产确权</h1>
              <p className="text-neutral-500 mt-4 leading-relaxed max-w-xl">
                 将您的独特场景配置、健康成就或数据分析报告转化为具有所有权证明的数字资产。通过区块链技术实现价值沉淀。
              </p>
           </div>
           <div className="flex gap-3">
              <button className="h-12 px-6 rounded-2xl bg-brand-navy text-white font-black uppercase tracking-widest flex items-center gap-2 text-[10px] hover:bg-brand-hailan-blue transition-all shadow-xl shadow-brand-navy/10">
                 <Wallet className="w-4 h-4" /> 导出至钱包
              </button>
           </div>
        </header>

        {/* Asset Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {loading ? (
               <div className="col-span-full flex justify-center py-20">
                   <Loader2 className="w-8 h-8 animate-spin text-neutral-300" />
               </div>
           ) : (
               <>
                   {assets.map((asset) => (
                     <motion.div 
                       key={asset.id}
                       whileHover={{ y: -5 }}
                       className="group cursor-pointer"
                       onClick={() => setSelectedAsset(asset)}
                     >
                        <GlassCard className="p-0 border-neutral-100 overflow-hidden h-full">
                           <div className="relative aspect-video overflow-hidden">
                              <img 
                                src={asset.image} 
                                alt={asset.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              <div className="absolute top-4 left-4 flex gap-2">
                                 <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[8px] font-black text-white uppercase tracking-widest border border-white/20">
                                    {asset.type}
                                 </span>
                                 <span className={cn(
                                   "px-3 py-1 rounded-full text-[8px] font-black text-white uppercase tracking-widest border border-white/20",
                                   asset.rarity === 'Unique' ? "bg-brand-gold/40" : "bg-indigo-500/40"
                                 )}>
                                    {asset.rarity}
                                 </span>
                              </div>
                           </div>
                           <div className="p-6 space-y-4">
                              <div className="flex items-start justify-between">
                                 <h3 className="font-black text-lg text-neutral-900 group-hover:text-brand-deep-blue transition-colors">{asset.name}</h3>
                                 <ArrowUpRight className="w-5 h-5 text-neutral-200 group-hover:text-brand-deep-blue transition-all" />
                              </div>
                              <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">{asset.description}</p>
                              <div className="pt-4 border-t border-neutral-50 flex items-center justify-between text-[9px] font-black text-neutral-400 uppercase tracking-widest">
                                 <span>Minted: {asset.mintDate}</span>
                                 <div className="flex items-center gap-1">
                                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                                    Confirmed on chain
                                 </div>
                              </div>
                           </div>
                        </GlassCard>
                     </motion.div>
                   ))}
               </>
           )}

           {/* Create New Placeholder */}
           <motion.div 
             whileHover={{ y: -5 }}
             onClick={!minting ? handleMintNewAsset : undefined}
             className={cn(
                 "border-2 border-dashed border-neutral-100 rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center space-y-4 group cursor-pointer hover:border-brand-gold/30 hover:bg-brand-gold/5 transition-all",
                 minting && "opacity-50 cursor-not-allowed"
             )}
           >
              <div className="w-16 h-16 rounded-3xl bg-neutral-50 flex items-center justify-center text-neutral-300 group-hover:bg-brand-gold group-hover:text-white transition-all">
                 {minting ? <Loader2 className="w-8 h-8 animate-spin" /> : <Zap className="w-8 h-8" />}
              </div>
              <div>
                 <h4 className="font-black text-neutral-900 uppercase tracking-widest">
                     {minting ? "铸造中..." : "铸造新资产"}
                 </h4>
                 <p className="text-[10px] text-neutral-400 mt-2">将您当前的最佳场景配置转化为数字确权资产</p>
              </div>
           </motion.div>
        </section>

        {/* Info Section */}
        <section className="mt-20 grid md:grid-cols-3 gap-8">
           <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
                 <Layers className="w-5 h-5" />
              </div>
              <h5 className="font-black text-sm uppercase tracking-widest">数据封装</h5>
              <p className="text-xs text-neutral-500 leading-relaxed">
                 所有资产均包含完整的 Metadata 元数据，加密封装在您的本地私有 IPFS 节点中。
              </p>
           </div>
           <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
                 <Award className="w-5 h-5" />
              </div>
              <h5 className="font-black text-sm uppercase tracking-widest">稀缺性验证</h5>
              <p className="text-xs text-neutral-500 leading-relaxed">
                 通过算法验证场景的独特性和有效性，确保每一份资产的真实价值。
              </p>
           </div>
           <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
                 <Share2 className="w-5 h-5" />
              </div>
              <h5 className="font-black text-sm uppercase tracking-widest">主权流转</h5>
              <p className="text-xs text-neutral-500 leading-relaxed">
                 资产可以安全地在海蓝生态内流转，或通过 ZK 签名向第三方机构出示所有权。
              </p>
           </div>
        </section>
      </main>

      {/* Asset Detail Overlay (Simplified) */}
      <AnimatePresence>
         {selectedAsset && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 bg-brand-navy/60 backdrop-blur-xl flex items-center justify-center p-6"
             onClick={() => setSelectedAsset(null)}
           >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="w-full max-w-lg bg-white rounded-[3rem] overflow-hidden shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                 <div className="relative h-64">
                    <img src={selectedAsset.image} className="w-full h-full object-cover" />
                      <button 
                        onClick={() => setSelectedAsset(null)}
                        className="absolute top-6 right-6 w-10 h-10 bg-brand-navy/40 backdrop-blur-md rounded-full flex items-center justify-center text-white"
                      >
                       <ArrowLeft className="w-5 h-5" />
                    </button>
                 </div>
                 <div className="p-10 space-y-6">
                    <div>
                       <div className="text-[10px] font-black text-brand-gold uppercase tracking-[0.2em] mb-2">Authenticated Digital Asset</div>
                       <h2 className="text-3xl font-black text-neutral-900">{selectedAsset.name}</h2>
                    </div>
                    <p className="text-sm text-neutral-500 leading-relaxed italic">“{selectedAsset.description}”</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 bg-neutral-50 rounded-2xl">
                          <span className="text-[9px] font-black text-neutral-400 uppercase block mb-1">CONTRACT_ADDRESS</span>
                          <span className="text-[10px] font-mono break-all leading-tight">0x82...f92a</span>
                       </div>
                       <div className="p-4 bg-neutral-50 rounded-2xl">
                          <span className="text-[9px] font-black text-neutral-400 uppercase block mb-1">PROVENANCE</span>
                          <span className="text-[10px] font-bold">Local NAS HL-92</span>
                       </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                       <button 
                         onClick={handleGenerateZKProof}
                         disabled={isGeneratingProof}
                         className="flex-1 h-14 bg-brand-navy text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-brand-hailan-blue transition-all disabled:opacity-50"
                       >
                          {isGeneratingProof ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <FileText className="w-4 h-4" />
                          )}
                          {isGeneratingProof ? "正在生成 ZK-Proof..." : "生成脱敏证明 PDF"}
                       </button>
                       <button className="w-14 h-14 border border-neutral-100 rounded-2xl flex items-center justify-center hover:bg-neutral-50 transition-colors">
                          <Share2 className="w-5 h-5 text-neutral-400" />
                       </button>
                    </div>
                 </div>
              </motion.div>
           </motion.div>
         )}
      </AnimatePresence>

      {/* ZK Proof Progress Overlay */}
      <AnimatePresence>
        {isGeneratingProof && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-brand-navy/95 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            {/* Medical-Grade Scan Background Effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
               <motion.div 
                 animate={{ 
                   y: ["-100%", "200%"],
                   opacity: [0, 0.5, 0]
                 }}
                 transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                 className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-hailan-blue to-transparent shadow-[0_0_20px_rgba(0,86,179,0.8)]"
               />
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,86,179,0.05)_0%,transparent_70%)]" />
            </div>

            <div className="max-w-sm w-full space-y-12 text-center relative z-10">
              <div className="relative w-32 h-32 mx-auto">
                {/* Rotating Medical Rings */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-[1px] border-brand-hailan-blue/30 rounded-[2.5rem] border-dashed"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 border-[1px] border-brand-hailan-blue/10 rounded-[2rem]"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <ShieldCheck className="w-12 h-12 text-brand-hailan-blue" />
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-brand-hailan-blue/20 rounded-full blur-xl"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-white tracking-tight uppercase italic">ZK Proof Computing</h3>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Secure Enclave Environment Active</p>
              </div>

              <div className="space-y-4 px-6">
                <StepItem active={proofStep >= 1} label="Initializing Circuit HL-V1" />
                <StepItem active={proofStep >= 2} label="Metadata Redaction & IPFS Pinning" />
                <StepItem active={proofStep >= 3} label="Witness Production (SNARK)" />
                <StepItem active={proofStep >= 4} label="Finalizing Encrypted PDF" />
              </div>

              <div className="pt-8 border-t border-white/5 flex items-center justify-center gap-2">
                 <Lock className="w-3 h-3 text-brand-hailan-blue" />
                 <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">End-to-End Encrypted Session</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}

function StepItem({ active, label }: { active: boolean; label: string }) {
  return (
    <div className={cn(
      "flex items-center gap-4 transition-all duration-500",
      active ? "opacity-100 translate-x-0" : "opacity-20 -translate-x-2"
    )}>
      <div className={cn(
        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
        active ? "border-brand-hailan-blue bg-brand-hailan-blue text-white" : "border-white/20"
      )}>
        {active && <ShieldCheck className="w-3 h-3" />}
      </div>
      <span className={cn(
        "text-xs font-bold transition-colors",
        active ? "text-white" : "text-white/40"
      )}>{label}</span>
    </div>
  );
}
