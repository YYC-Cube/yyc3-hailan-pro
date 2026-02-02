import React, { useState } from "react";
import { Product } from "@/app/data/mockData";
import { Button } from "@/app/components/design-system/Button"; // Use new Button
import { Label } from "@/app/components/ui/label";
import { Truck, Shield, ShoppingBag, Plus, Info, Check, Package } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { useCart } from "@/app/context/CartContext";
import { useNavigate } from "react-router";
import { cn } from "@/app/components/design-system/utils";
import { motion, AnimatePresence } from "framer-motion";
import { InteractiveListItem } from "@/app/components/design-system/GlassCard";

interface PurchasePanelProps {
  product: Product;
}

export function PurchasePanel({ product }: PurchasePanelProps) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState("midnight");
  const [packagingLevel, setPackagingLevel] = useState<'standard' | 'stealth' | 'premium'>("standard");
  const [quantity, setQuantity] = useState(1);
  const [accessories, setAccessories] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    // Simulate network/animation delay
    await new Promise(resolve => setTimeout(resolve, 800));
    addToCart(product, quantity, selectedColor, packagingLevel, accessories);
    setIsAdding(false);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, packagingLevel, accessories);
    navigate("/checkout");
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Price Header */}
      <div className="flex items-end justify-between">
        <div>
           <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-neutral-900 tracking-tight">¥{product.price.toFixed(2)}</span>
              {product.originalPrice && (
                 <span className="text-sm text-neutral-400 line-through">¥{product.originalPrice.toFixed(2)}</span>
              )}
           </div>
           <div className="text-xs text-brand-deep-blue font-medium mt-1">Free invisible shipping</div>
        </div>
        <div className="text-sm text-emerald-600 font-medium bg-emerald-50/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-emerald-100 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            In Stock
        </div>
      </div>

      <div className="space-y-8">
        {/* Model/Color Selection */}
        <div className="space-y-4">
          <Label className="text-neutral-500 text-xs uppercase tracking-wider font-semibold">Select Color</Label>
          <div className="grid grid-cols-2 gap-3">
             {[
               { id: 'midnight', label: 'Midnight', color: '#1A365D' },
               { id: 'pearl', label: 'Pearl', color: '#F1F5F9' }
             ].map((opt) => (
               <div 
                 key={opt.id}
                 className={cn(
                   "cursor-pointer rounded-xl border p-3 flex items-center gap-3 transition-all relative overflow-hidden",
                   selectedColor === opt.id 
                     ? "border-brand-deep-blue bg-brand-deep-blue/5 shadow-inner" 
                     : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                 )}
                 onClick={() => setSelectedColor(opt.id)}
               >
                  <div 
                    className="w-6 h-6 rounded-full shadow-sm border border-neutral-100" 
                    style={{ backgroundColor: opt.color }} 
                  />
                  <span className={cn("text-sm font-medium", selectedColor === opt.id ? "text-brand-deep-blue" : "text-neutral-700")}>
                    {opt.label}
                  </span>
                  {selectedColor === opt.id && (
                    <motion.div layoutId="color-check" className="ml-auto text-brand-deep-blue">
                      <Check className="w-4 h-4" />
                    </motion.div>
                  )}
               </div>
             ))}
          </div>
        </div>

        {/* Packaging Options - Using Interactive List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-neutral-500 text-xs uppercase tracking-wider font-semibold">Privacy Packaging</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-3.5 h-3.5 text-neutral-400 hover:text-neutral-600 transition-colors" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">We prioritize your privacy with discreet packaging options.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="space-y-2">
            {[
              { id: 'standard', label: 'Standard', desc: 'Generic box, no branding', icon: Package },
              { id: 'stealth', label: 'Stealth Mode', desc: 'Disguised as office supplies', icon: Shield }
            ].map((pkg) => (
               <InteractiveListItem
                  key={pkg.id}
                  active={packagingLevel === pkg.id}
                  onClick={() => setPackagingLevel(pkg.id as any)}
                  className="p-3 rounded-xl border border-transparent"
               >
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center mr-3 transition-colors",
                    packagingLevel === pkg.id ? "bg-white text-brand-deep-blue" : "bg-neutral-100 text-neutral-500"
                  )}>
                     <pkg.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left">
                     <div className={cn("text-sm font-semibold", packagingLevel === pkg.id ? "text-brand-deep-blue" : "text-neutral-900")}>{pkg.label}</div>
                     <div className="text-xs text-neutral-500">{pkg.desc}</div>
                  </div>
                  <div className={cn(
                    "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                    packagingLevel === pkg.id ? "border-brand-deep-blue bg-brand-deep-blue" : "border-neutral-300"
                  )}>
                     {packagingLevel === pkg.id && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
               </InteractiveListItem>
            ))}
          </div>
        </div>

         {/* Actions */}
         <div className="pt-4 space-y-4">
            <div className="flex gap-3 h-14">
                <Button 
                    variant="outline"
                    className="flex-1 h-full text-base border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-all"
                    onClick={handleAddToCart}
                    disabled={isAdding}
                >
                    {isAdding ? (
                       <div className="w-5 h-5 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                       <>
                         <ShoppingBag className="w-5 h-5 mr-2" />
                         Add to Cart
                       </>
                    )}
                </Button>
                <Button 
                    variant="liquid"
                    className="flex-[1.5] h-full text-base shadow-lg shadow-brand-deep-blue/20"
                    onClick={handleBuyNow}
                >
                    Buy Now
                </Button>
            </div>
            
            <div className="flex items-center justify-center gap-4 text-[10px] text-neutral-400 font-medium uppercase tracking-wide">
                <div className="flex items-center gap-1.5">
                   <Shield className="w-3.5 h-3.5 text-emerald-500" />
                   SSL Encrypted
                </div>
                <div className="w-1 h-1 bg-neutral-200 rounded-full" />
                <div className="flex items-center gap-1.5">
                   <Truck className="w-3.5 h-3.5 text-neutral-400" />
                   Private Shipping
                </div>
            </div>
         </div>
      </div>
    </div>
  );
}
