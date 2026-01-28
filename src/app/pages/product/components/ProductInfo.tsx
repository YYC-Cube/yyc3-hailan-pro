import React from "react";
import { Product } from "@/app/data/mockData";
import { Badge } from "@/app/components/ui/badge";
import { Sparkles, ShieldCheck, Droplets, Wind, Battery, Smartphone } from "lucide-react";
import { motion } from "motion/react";
import { GlassCard } from "@/app/components/design-system/GlassCard";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  // Mock match score based on "User Profile"
  const matchScore = 94;

  const getFeatureIcon = (feature: string) => {
    const f = feature.toLowerCase();
    if (f.includes("app")) return <Smartphone className="w-4 h-4" />;
    if (f.includes("水") || f.includes("water")) return <Droplets className="w-4 h-4" />;
    if (f.includes("静音") || f.includes("quiet")) return <Wind className="w-4 h-4" />;
    if (f.includes("电") || f.includes("battery") || f.includes("续航")) return <Battery className="w-4 h-4" />;
    return <Sparkles className="w-4 h-4" />;
  };

  return (
    <GlassCard className="p-6 md:p-8 space-y-6 border-white/60 bg-white/60 backdrop-blur-md" hoverEffect={false}>
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight leading-tight">
              {product.name}
            </h1>
            {product.isNew && (
              <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none px-3 py-1 text-sm shadow-md shadow-emerald-500/20">
                New
              </Badge>
            )}
        </div>
        <p className="text-neutral-600 text-lg leading-relaxed font-light">{product.description}</p>
      </div>

      {/* Match Score */}
      <div className="bg-white/50 rounded-2xl p-4 flex items-center gap-5 border border-white/60 shadow-sm">
        <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-neutral-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <motion.path 
                    className="text-brand-deep-blue" 
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeDasharray={`${matchScore}, 100`}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                />
            </svg>
            <span className="absolute text-sm font-bold text-brand-deep-blue">{matchScore}%</span>
        </div>
        <div>
            <div className="font-bold text-neutral-900">Perfect Match</div>
            <div className="text-sm text-neutral-500">Based on your wellness profile</div>
        </div>
      </div>

      <div className="h-px bg-neutral-200/50" />

      {/* Key Features */}
      <div className="space-y-4">
        <h3 className="font-semibold text-neutral-900 flex items-center gap-2 text-sm uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-brand-gold" />
            Key Highlights
        </h3>
        <div className="grid grid-cols-2 gap-3">
            {product.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-neutral-700 bg-white/50 border border-white/60 rounded-xl p-3 shadow-sm">
                    <span className="text-brand-deep-blue">{getFeatureIcon(feature)}</span>
                    <span className="font-medium">{feature}</span>
                </div>
            ))}
        </div>
      </div>

      {/* Material Safety */}
      {product.material && product.material.length > 0 && (
          <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100/50">
              <h4 className="flex items-center gap-2 text-sm font-bold text-brand-deep-blue mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  Body-Safe Materials
              </h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                  Crafted from premium {product.material.join(" & ")}.
                  {product.material.some(m => m.toLowerCase().includes("silicone")) && " Non-porous, hypoallergenic, and easy to clean."}
              </p>
          </div>
      )}
    </GlassCard>
  );
}
