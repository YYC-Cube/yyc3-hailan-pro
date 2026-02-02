import React, { useState } from "react";
import { Product } from "@/app/data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Share2, Heart, ShieldCheck, Box } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import Slider from "react-slick";

// Custom Minimal Slick Styles to avoid binary asset processing errors
const SlickStyles = () => (
  <style>{`
    .slick-slider { position: relative; display: block; box-sizing: border-box; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-touch-callout: none; -khtml-user-select: none; -ms-touch-action: pan-y; touch-action: pan-y; -webkit-tap-highlight-color: transparent; }
    .slick-list { position: relative; display: block; overflow: hidden; margin: 0; padding: 0; }
    .slick-list:focus { outline: none; }
    .slick-list.dragging { cursor: pointer; cursor: hand; }
    .slick-slider .slick-track, .slick-slider .slick-list { -webkit-transform: translate3d(0, 0, 0); -moz-transform: translate3d(0, 0, 0); -ms-transform: translate3d(0, 0, 0); -o-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
    .slick-track { position: relative; top: 0; left: 0; display: block; margin-left: auto; margin-right: auto; }
    .slick-track:before, .slick-track:after { display: table; content: ''; }
    .slick-track:after { clear: both; }
    .slick-loading .slick-track { visibility: hidden; }
    .slick-slide { display: none; float: left; height: 100%; min-height: 1px; }
    [dir='rtl'] .slick-slide { float: right; }
    .slick-slide img { display: block; }
    .slick-slide.slick-loading img { display: none; }
    .slick-slide.dragging img { pointer-events: none; }
    .slick-initialized .slick-slide { display: block; }
    .slick-loading .slick-slide { visibility: hidden; }
    .slick-vertical .slick-slide { display: block; height: auto; border: 1px solid transparent; }
    .slick-arrow.slick-hidden { display: none; }
    
    /* Dots Styling */
    .slick-dots { position: absolute; bottom: 20px; display: block; width: 100%; padding: 0; margin: 0; list-style: none; text-align: center; z-index: 30; }
    .slick-dots li { position: relative; display: inline-block; width: 8px; height: 8px; margin: 0 4px; padding: 0; cursor: pointer; }
    .slick-dots li button { font-size: 0; line-height: 0; display: block; width: 8px; height: 8px; padding: 5px; cursor: pointer; color: transparent; border: 0; outline: none; background: transparent; }
    .slick-dots li button:before { position: absolute; top: 0; left: 0; width: 8px; height: 8px; content: ''; background: white; opacity: 0.3; border-radius: 50%; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .slick-dots li.slick-active button:before { opacity: 1; transform: scale(1.2); background: #0056b3; }
  `}</style>
);

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
      <SlickStyles />
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
