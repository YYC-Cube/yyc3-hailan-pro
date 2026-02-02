import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { PRODUCTS, Product } from "@/app/data/mockData";
import { Navbar } from "@/app/components/layout/Navbar";
import { Footer } from "@/app/components/layout/Footer";
import { motion } from "framer-motion";
import { ChevronRight, Home, ShoppingBag, Sparkles } from "lucide-react";
import { ProductGallery } from "./components/ProductGallery";
import { ProductInfo } from "./components/ProductInfo";
import { SpecsSection } from "./components/SpecsSection";
import { ReviewsSection } from "./components/ReviewsSection";
import { RelatedProducts } from "./components/RelatedProducts";
import { PurchasePanel } from "./components/PurchasePanel";
import { ARSection } from "./components/ARSection";
import { HealthCompatibility } from "./components/HealthCompatibility";
import { GlassCard } from "@/app/components/design-system/GlassCard";

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundProduct = PRODUCTS.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // Handle not found
    }
    setLoading(false);
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
       <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-deep-blue border-t-transparent rounded-full animate-spin" />
          <p className="text-neutral-500 font-medium">正在加载商品...</p>
       </div>
    </div>
  );
  
  if (!product) return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
       <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">未找到该商品</h2>
          <button onClick={() => navigate('/category')} className="text-brand-deep-blue hover:underline">
             返回分类浏览
          </button>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-brand-deep-blue/20 pb-20 md:pb-0">
      <Navbar />
      
      {/* Dynamic Background Element */}
      <div className="fixed top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-white to-transparent pointer-events-none -z-10" />
      <div className="fixed top-20 right-0 w-[500px] h-[500px] bg-brand-deep-blue/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      
      <main className="container mx-auto px-4 py-6 md:py-8 max-w-7xl relative z-0">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-neutral-500 mb-8 overflow-x-auto whitespace-nowrap pb-2 md:pb-0 scrollbar-hide">
          <button className="flex items-center hover:text-brand-deep-blue transition-colors" onClick={() => navigate('/')}>
             <Home className="w-3.5 h-3.5 mr-1" />
             首页
          </button>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-neutral-300" />
          <button className="hover:text-brand-deep-blue transition-colors" onClick={() => navigate('/category')}>
             分类
          </button>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-neutral-300" />
          <span className="font-semibold text-neutral-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Gallery (Sticky) */}
          <div className="lg:col-span-7 space-y-8 lg:sticky lg:top-24 transition-all">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
            >
              <ProductGallery product={product} />
            </motion.div>

            {/* AR Section (Desktop) */}
            <motion.div 
               className="hidden lg:block"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
            >
               <ARSection product={product} />
            </motion.div>
          </div>

          {/* Right Column: Info & Purchase */}
          <div className="lg:col-span-5 space-y-10 relative">
            <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6, delay: 0.1 }}
            >
               <ProductInfo product={product} />
            </motion.div>

            {/* NEW: Health Compatibility Module - Data Closure */}
            <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6, delay: 0.15 }}
            >
               <HealthCompatibility product={product} />
            </motion.div>
            
            <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="sticky top-24 z-10"
            >
               <GlassCard className="border-neutral-200/60 shadow-xl shadow-neutral-200/40 bg-white/80 backdrop-blur-xl">
                 <PurchasePanel product={product} />
               </GlassCard>
            </motion.div>
          </div>
        </div>

        {/* Mobile AR Section */}
        <div className="lg:hidden mt-12 mb-12">
           <ARSection product={product} />
        </div>
        
        {/* Full Width Sections */}
        <div className="mt-20 md:mt-32 space-y-20 md:space-y-32">
          {/* Specs */}
          <section className="relative">
             <div className="absolute inset-0 bg-neutral-50 transform -skew-y-2 -z-10 md:-mx-40" />
             <div className="max-w-4xl mx-auto">
                <SpecsSection product={product} />
             </div>
          </section>

          {/* Reviews */}
          <section className="max-w-5xl mx-auto">
             <ReviewsSection productId={product.id} />
          </section>
          
          {/* Related */}
          <section>
             <RelatedProducts currentProductId={product.id} category={product.category} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
