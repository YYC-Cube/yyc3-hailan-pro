import React from "react";
import { Star, ShoppingBag, EyeOff, Info, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/app/components/design-system/Button";
import { Badge } from "@/app/components/design-system/Badge";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { cn } from "@/app/components/design-system/utils";
import { Link } from "@/app/components/router";
import { ProductCategory } from "@/types";

interface ProductItem {
  id: string;
  name: string;
  price: string;
  rating: number;
  image: string;
  tag: string;
  isPrivate?: boolean;
}

interface SmartRecommendationsProps {
  privacyMode?: boolean;
  className?: string;
  compact?: boolean;
}

export function SmartRecommendations({ privacyMode = false, className, compact = false }: SmartRecommendationsProps) {
  const [loading, setLoading] = React.useState(false);
  const [visibleCount, setVisibleCount] = React.useState(4);

  const products: ProductItem[] = [
    {
      id: "1",
      name: "静谧脉动按摩器",
      price: "¥899.00",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1544384050-f80fac6e525a?q=80&w=1080&auto=format&fit=crop",
      tag: "热销",
    },
    {
      id: "2",
      name: "丝绒触感润滑液",
      price: "¥168.00",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1765329843292-39b5129fce61?q=80&w=1080&auto=format&fit=crop",
      tag: "新品",
    },
    {
      id: "3",
      name: "精粹焕能香薰",
      price: "¥256.00",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1760113559708-84e7a148ec68?q=80&w=1080&auto=format&fit=crop",
      tag: "健康",
    },
    {
        id: "4",
        name: "和谐之环智能戒",
        price: "¥1,259.00",
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1747224317356-6dd1a4a078fd?q=80&w=1080&auto=format&fit=crop",
        tag: "智能",
        isPrivate: true,
    },
    {
        id: "5",
        name: "灵动曲线体验版",
        price: "¥599.00",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1563172105-04353d5a4993?q=80&w=1080&auto=format&fit=crop",
        tag: "推荐",
    },
    {
        id: "6",
        name: "晨曦之露护理套装",
        price: "¥328.00",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1080&auto=format&fit=crop",
        tag: "超值",
    }
  ];

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 2);
      setLoading(false);
    }, 800);
  };

  const displayProducts = compact ? products.slice(0, 2) : products.slice(0, visibleCount);

  return (
    <section className={cn("bg-neutral-50/50 rounded-3xl", compact ? "h-full flex flex-col p-6" : "container mx-auto px-4 py-12 my-8", className)}>
      <div className="flex items-center justify-between mb-8 shrink-0">
         <div>
            <h2 className={cn("font-bold text-neutral-900", compact ? "text-xl" : "text-2xl md:text-3xl")}>为您推荐</h2>
            <p className="text-neutral-500 mt-1 text-sm">
               {privacyMode ? "隐私模式已开启：图片已模糊" : "基于您的偏好 AI 智能匹配"}
            </p>
         </div>
         <Link to="/category">
            <Button variant="ghost" className="text-brand-deep-blue flex items-center gap-1 group">
               查看全部 <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
         </Link>
      </div>

      <div className={cn("grid gap-6 flex-1", compact ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4")}>
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} privacyMode={privacyMode} />
        ))}
      </div>

      {!compact && visibleCount < products.length && (
        <div className="mt-12 flex justify-center">
            <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-12 border-neutral-200 text-neutral-600 hover:border-brand-deep-blue hover:text-brand-deep-blue"
                onClick={handleLoadMore}
                disabled={loading}
            >
                {loading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> 加载中...</>
                ) : (
                    "加载更多商品"
                )}
            </Button>
        </div>
      )}
    </section>
  );
}

function ProductCard({ product, privacyMode }: { product: ProductItem, privacyMode: boolean }) {
    const [isHovered, setIsHovered] = React.useState(false);
    
    const shouldBlur = !isHovered && (privacyMode || product.isPrivate);

    return (
        <div 
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-level-2 transition-all duration-300 border border-neutral-100"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-neutral-100">
                <ImageWithFallback 
                    src={product.image} 
                    alt={product.name}
                    className={cn(
                        "w-full h-full object-cover transition-transform duration-700",
                        isHovered ? "scale-105" : "scale-100",
                        shouldBlur ? "blur-xl" : ""
                    )}
                />
                
                {shouldBlur && (
                    <div className="absolute inset-0 flex items-center justify-center bg-brand-navy/5 backdrop-blur-[2px]">
                        <EyeOff className="w-8 h-8 text-white drop-shadow-md" />
                    </div>
                )}

                <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-white/90 backdrop-blur text-neutral-900 shadow-sm">
                        {product.tag}
                    </Badge>
                </div>

                {/* Quick Actions Overlay */}
                <div className={cn(
                    "absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-brand-navy/60 to-transparent flex justify-between items-end translate-y-full transition-transform duration-300",
                    isHovered ? "translate-y-0" : ""
                )}>
                    <Button size="sm" variant="secondary" className="bg-white/90 text-neutral-900 hover:bg-white">
                        快速查看
                    </Button>
                    <Button size="icon" className="bg-brand-coral text-white border-none rounded-full h-8 w-8">
                        <ShoppingBag className="w-4 h-4" />
                    </Button>
                </div>
            </Link>

            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <Link to={`/product/${product.id}`}>
                        <h3 className="font-bold text-neutral-900 hover:text-brand-deep-blue transition-colors line-clamp-1">{product.name}</h3>
                    </Link>
                    <div className="flex items-center gap-1 text-xs font-medium text-neutral-500 bg-neutral-50 px-1.5 py-0.5 rounded">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {product.rating}
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-brand-deep-blue font-bold">{product.price}</p>
                    <div className="text-xs text-neutral-400 flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        隐私包装
                    </div>
                </div>
            </div>
        </div>
    )
}