import React, { useState } from "react";
import { Product } from "@/app/data/mockData";
import { motion, AnimatePresence } from "motion/react";
import { Eye, EyeOff, Share2, Heart, ShieldCheck, Box } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

interface ProductGalleryProps {
  product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [isPrivacyMaskOn, setIsPrivacyMaskOn] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
  };

  return (
    <div className="relative bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
      {/* Privacy Toggle & Badges Overlay */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
         <Badge variant="secondary" className="bg-white/90 backdrop-blur text-[#1A365D] border-slate-200 shadow-sm gap-1.5 px-3 py-1.5">
           <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
           <span className="text-xs font-medium">隐私保护</span>
         </Badge>
         {product.material && (
           <Badge variant="secondary" className="bg-white/90 backdrop-blur text-[#1A365D] border-slate-200 shadow-sm gap-1.5 px-3 py-1.5">
             <Box className="w-3.5 h-3.5 text-blue-500" />
             <span className="text-xs font-medium">医疗级</span>
           </Badge>
         )}
      </div>

      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <Button
          size="icon"
          variant="secondary"
          className="rounded-full bg-white/90 backdrop-blur hover:bg-white shadow-sm"
          onClick={() => setIsPrivacyMaskOn(!isPrivacyMaskOn)}
        >
          {isPrivacyMaskOn ? <EyeOff className="w-4 h-4 text-slate-600" /> : <Eye className="w-4 h-4 text-slate-600" />}
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="rounded-full bg-white/90 backdrop-blur hover:bg-white shadow-sm"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-rose-500 text-rose-500" : "text-slate-600"}`} />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="rounded-full bg-white/90 backdrop-blur hover:bg-white shadow-sm"
        >
          <Share2 className="w-4 h-4 text-slate-600" />
        </Button>
      </div>

      {/* Main Image Area */}
      <div className="relative aspect-[4/3] md:aspect-square bg-slate-50">
        <Slider {...sliderSettings} className="h-full">
          {product.images.map((img, index) => (
            <div key={index} className="relative h-full outline-none">
              <div className="relative w-full h-full flex items-center justify-center bg-slate-50 overflow-hidden">
                <motion.img 
                  src={img} 
                  alt={`${product.name} 视图 ${index + 1}`}
                  className="w-full h-full object-cover"
                  animate={{ filter: isPrivacyMaskOn ? "blur(20px)" : "blur(0px)" }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* AR Trigger (Bottom Center of Image) */}
      {product.arEnabled && (
         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
           <Button className="bg-[#1A365D]/90 backdrop-blur hover:bg-[#1A365D] text-white rounded-full shadow-lg gap-2 pl-3 pr-4">
             <Box className="w-4 h-4" />
             3D 预览
           </Button>
         </div>
      )}
    </div>
  );
}
