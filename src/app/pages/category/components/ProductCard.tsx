import React, { useState } from "react";
import { Product, CATEGORIES } from "@/app/data/mockData";
import { Eye, EyeOff, Heart, Star, ShoppingBag, ArrowRight } from "lucide-react";
import { cn } from "@/app/components/design-system/utils";
import { Button } from "@/app/components/design-system/Button";
import { Link } from "@/app/components/router";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  privacyMode: boolean;
  viewMode?: "grid" | "list";
}

export function ProductCard({ product, privacyMode, viewMode = "grid" }: ProductCardProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // If privacy mode is off, it's always revealed.
  // If privacy mode is on, it's revealed only if user explicitly revealed it.
  const isBlurred = privacyMode && !isRevealed;

  const categoryName = CATEGORIES.find(c => c.id === product.category)?.name || "其他分类";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "group relative bg-white rounded-2xl overflow-hidden transition-all duration-500",
        "border border-neutral-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
        "hover:shadow-[0_8px_30px_rgba(0,86,179,0.12)] hover:border-brand-hailan-blue/20",
        "hover:-translate-y-1",
        "active:scale-[0.98] touch-manipulation", 
        viewMode === "list" ? "flex gap-6 p-4" : "flex flex-col h-full"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className={cn(
        "relative overflow-hidden bg-neutral-100 shrink-0",
        viewMode === "list" ? "w-40 md:w-56 h-full rounded-xl" : "aspect-[4/5]"
      )}>
        <Link to={`/product/${product.id}`} className="block w-full h-full">
           <img
             src={product.images[0]}
             alt={product.name}
             className={cn(
               "w-full h-full object-cover transition-all duration-1000",
               isBlurred ? "blur-2xl scale-125" : "blur-0 scale-100",
               !isBlurred && isHovered ? "scale-110" : ""
             )}
           />
        </Link>
        
        {/* Privacy Overlay */}
        {isBlurred && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-navy/10 backdrop-blur-md z-10 p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center mb-3">
               <EyeOff className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-xs font-bold tracking-widest uppercase mb-4">隐私模式保护中</span>
            <Button 
              size="sm" 
              className="bg-white text-brand-hailan-blue hover:bg-neutral-100 font-bold px-6 rounded-full h-8 text-[10px]"
              onClick={(e) => {
                e.preventDefault();
                setIsRevealed(true);
              }}
            >
              点击查看
            </Button>
          </div>
        )}

        {/* Floating Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-20 md:translate-x-12 md:group-hover:translate-x-0 transition-transform duration-500">
           <Button 
             variant="ghost" 
             size="icon" 
             className="rounded-full w-9 h-9 shadow-lg bg-white/90 hover:bg-white text-brand-hailan-blue/60 hover:text-brand-coral active:scale-90 transition-all"
             aria-label="收藏"
           >
             <Heart className="w-4 h-4" />
           </Button>
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="px-2.5 py-1 text-[10px] font-bold tracking-tight bg-brand-coral text-white rounded-lg shadow-sm">
              NEW 新品
            </span>
          )}
          {product.isSmart && (
            <span className="px-2.5 py-1 text-[10px] font-bold tracking-tight bg-brand-hailan-blue text-white rounded-lg shadow-sm">
              SMART 智能
            </span>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className={cn(
        "flex flex-col flex-1",
        viewMode === "list" ? "justify-between py-2 pr-2" : "p-5"
      )}>
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] text-brand-hailan-blue uppercase font-bold tracking-widest">
              {categoryName}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-brand-hailan-blue">{product.rating}</span>
            </div>
          </div>

          <Link to={`/product/${product.id}`} className="block group-hover:text-brand-hailan-blue transition-colors mb-2">
            <h3 className={cn("font-bold text-brand-hailan-blue leading-tight line-clamp-2", viewMode === "list" ? "text-xl" : "text-lg")}>
              {product.name}
            </h3>
          </Link>
          
          {viewMode === "list" && (
            <p className="text-sm text-brand-hailan-blue mb-4 line-clamp-3 leading-relaxed">
              {product.description}
            </p>
          )}

          <div className="flex items-baseline gap-2 mt-auto">
            <span className="text-xl font-bold text-brand-hailan-blue">
              ¥{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-brand-hailan-blue/50 line-through">
                ¥{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className={cn(
          "mt-6 flex items-center gap-2",
          viewMode === "list" ? "justify-start" : "justify-between"
        )}>
           <Button className="flex-1 bg-brand-hailan-blue hover:bg-brand-hailan-blue/90 text-white rounded-xl h-10 font-bold transition-all active:scale-95 group/btn shadow-lg shadow-brand-hailan-blue/10">
             <ShoppingBag className="w-4 h-4 mr-2" />
             加入购物车
           </Button>
           
           {viewMode === "grid" && (
             <Link to={`/product/${product.id}`}>
               <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 text-brand-hailan-blue/60 hover:text-brand-hailan-blue hover:bg-brand-hailan-blue/5 border border-neutral-100">
                 <ArrowRight className="w-4 h-4" />
               </Button>
             </Link>
           )}

           {viewMode === "list" && (
             <Link to={`/product/${product.id}`}>
               <Button variant="outline" className="rounded-xl h-10 font-bold border-neutral-200 text-brand-hailan-blue">
                 查看详情
               </Button>
             </Link>
           )}
        </div>
      </div>
    </motion.div>
  );
}
