import React, { useState } from "react";
import { Product } from "@/app/data/mockData";
import { Button } from "@/app/components/design-system/Button";
import { Box, Ruler, Smartphone, Sparkles, X, ChevronRight, Scan } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/app/components/ui/dialog";
import { SafeModelViewer } from "@/app/components/ar/SafeModelViewer";
import { motion } from "motion/react";
import { cn } from "@/app/components/design-system/utils";
import { GlassCard } from "@/app/components/design-system/GlassCard";

interface ARSectionProps {
  product: Product;
}

export function ARSection({ product }: ARSectionProps) {
  const [showAR, setShowAR] = useState(false);

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

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center p-8 md:p-10">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full backdrop-blur-md text-xs font-semibold border border-white/20 shadow-lg shadow-black/10">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span className="tracking-wide text-blue-100">IMMERSIVE AR</span>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-2xl md:text-4xl font-bold leading-tight tracking-tight">
              Bring <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">{product.name}</span> into your space.
            </h3>
            <p className="text-blue-200/80 text-sm md:text-base leading-relaxed max-w-md">
              Unsure about the size? Use our AR tool to place the product in your room, check dimensions, and compare with daily objects instantly.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="liquid" // Assuming liquid variant exists or defaulting to primary style
                  className="bg-white text-[#1A365D] hover:bg-blue-50 border-none shadow-[0_0_20px_rgba(255,255,255,0.3)] px-6 py-6 h-auto text-base"
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  Launch AR View
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl w-[95vw] h-[85vh] p-0 bg-transparent border-none shadow-none outline-none">
                 <div className="relative w-full h-full bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 flex flex-col">
                    {/* Modal Header */}
                    <div className="absolute top-0 left-0 right-0 p-6 z-50 flex justify-between items-start pointer-events-none">
                        <div className="pointer-events-auto bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white text-sm font-medium flex items-center gap-2">
                           <Scan className="w-4 h-4 text-green-400" />
                           AR Preview Mode
                        </div>
                        <DialogClose className="pointer-events-auto p-3 bg-black/40 backdrop-blur-md rounded-full hover:bg-white/20 text-white transition-all border border-white/10">
                           <X className="w-5 h-5" />
                        </DialogClose>
                    </div>
                    
                    <div className="flex-1 relative">
                       <SafeModelViewer color="#1A365D" />
                    </div>

                    {/* Modal Footer Instructions */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 text-white/80 text-sm pointer-events-none">
                       Drag to rotate • Pinch to zoom
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
        <div className="hidden md:flex relative h-64 w-full bg-gradient-to-t from-white/5 to-white/10 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-sm items-center justify-center group/preview">
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
           
           <motion.div 
             animate={{ y: [0, -10, 0], rotateY: [0, 5, 0] }}
             transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
             className="relative z-10"
           >
              {/* Abstract representation of the product in AR */}
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-xl backdrop-blur-md border border-white/30 flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]">
                 <Box className="w-12 h-12 text-white/90" />
              </div>
           </motion.div>

           {/* Scanning Line Effect */}
           <motion.div 
             className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50 z-20"
             animate={{ top: ['0%', '100%', '0%'] }}
             transition={{ duration: 3, ease: "linear", repeat: Infinity }}
           />
           
           <div className="absolute bottom-4 right-4 flex gap-1">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-1.5 h-1.5 bg-white/20 rounded-full" />
              ))}
           </div>
        </div>
      </div>
    </GlassCard>
  );
}
