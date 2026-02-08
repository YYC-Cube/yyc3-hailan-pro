import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "@/app/components/router";
import { PRODUCTS, CATEGORIES, MainCategoryType } from "@/app/data/mockData";
import { FilterSidebar } from "@/app/pages/category/components/FilterSidebar";
import { ProductCard } from "@/app/pages/category/components/ProductCard";
import { CareDashboard } from "@/app/pages/category/components/CareDashboard";
import { AIShoppingScript } from "@/app/pages/category/components/AIShoppingScript";
import { MainLayout } from "@/app/components/layout/MainLayout";
import { Button } from "@/app/components/design-system/Button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/app/components/ui/select";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetTitle,
  SheetHeader
} from "@/app/components/ui/sheet";

import { LayoutGrid, List, SlidersHorizontal, Search, Sparkles, ChevronRight, HeartPulse, Rocket, Brain, Filter, Info, ShieldCheck } from "lucide-react";
import { cn } from "@/app/components/design-system/utils";
import { motion, AnimatePresence } from "framer-motion";

interface CategoryPageProps {
  privacyMode: boolean;
  onPrivacyToggle: (enabled: boolean) => void;
}

const mainCatInfo: Record<string, any> = {
  "CARE": { 
    icon: HeartPulse, 
    label: "身心关爱", 
    color: "text-emerald-500", 
    bg: "bg-emerald-50",
    description: "通过科学的生理追踪与专业级护理工具，为您建立长期的健康保护。从盆底健康到日常恢复，CARE 始终关注您的身体状态。"
  },
  "PLAY": { 
    icon: Rocket, 
    label: "愉悦探索", 
    color: "text-rose-500", 
    bg: "bg-rose-50",
    description: "打破界限，建立深度连接。PLAY 系列旨在通过创新的感官体验与双人互动，让您与伴侣在私密时光中重新发现激情与灵感。"
  },
  "SMART": { 
    icon: Brain, 
    label: "智感科技", 
    color: "text-blue-500", 
    bg: "bg-blue-50",
    description: "数据驱动的智能进化。SMART 维度融合了生物反馈、AI 算法与实时互动技术，让您的每一个细微反应都能被精准捕捉并转化为愉悦体验。"
  }
};

export function CategoryPage({ privacyMode, onPrivacyToggle }: CategoryPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialMain = searchParams.get("main") as MainCategoryType | "ALL" || "ALL";
  
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("recommended");
  const [activeMainCategory, setActiveMainCategory] = useState<MainCategoryType | "ALL">(initialMain);
  const [activeSubCategory, setActiveSubCategory] = useState("all");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    const main = searchParams.get("main") as MainCategoryType | "ALL";
    if (main) setActiveMainCategory(main);
  }, [searchParams]);
  
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];
    
    // Main Category Filter
    if (activeMainCategory !== "ALL") {
      result = result.filter(p => p.mainCategory === activeMainCategory);
    }

    // Sub Category Filter
    if (activeSubCategory !== "all") {
      result = result.filter(p => p.category === activeSubCategory);
    }

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "new") {
      result = result.filter(p => p.isNew);
    }
    return result;
  }, [sortBy, activeMainCategory, activeSubCategory]);

  const currentMainInfo = activeMainCategory !== "ALL" ? mainCatInfo[activeMainCategory] : null;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* Top Header Section */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="max-w-2xl">
               <div className="flex items-center gap-2 text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-4">
                  <Link to="/" className="hover:text-brand-hailan-blue transition-colors">首页</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-brand-hailan-blue">探索空间</span>
               </div>
               <div className="flex items-center gap-5 mb-6">
                  <h1 className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tight flex items-center gap-4">
                    {currentMainInfo ? (
                      <>
                        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl shadow-neutral-100", currentMainInfo.bg)}>
                          <currentMainInfo.icon className={cn("w-8 h-8", currentMainInfo.color)} />
                        </div>
                        {currentMainInfo.label}
                      </>
                    ) : "全部探索"}
                  </h1>
                  <span className="text-xs font-black text-neutral-400 bg-neutral-100 px-4 py-1.5 rounded-full border border-neutral-200">
                    {filteredProducts.length} ITEMS
                  </span>
               </div>
               <p className="text-neutral-500 text-lg leading-relaxed font-medium">
                  {currentMainInfo ? currentMainInfo.description : "探索海蓝精心策划的三大核心健康管理维度，寻找最适合您的生活方案。"}
               </p>
            </div>

            <div className="flex flex-col gap-4">
               <div className="p-4 bg-white rounded-2xl border border-neutral-100 shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">隐私级别</p>
                    <p className="text-xs font-bold text-neutral-900">最高级别 (金融级加密)</p>
                  </div>
               </div>
               <Link to="/quiz-intro">
                 <Button className="w-full rounded-2xl bg-brand-hailan-blue text-white font-bold h-14 hover:bg-brand-hailan-blue/90 shadow-xl shadow-brand-hailan-blue/20 transition-all active:scale-95">
                    <Sparkles className="w-5 h-5 mr-2 text-brand-gold" /> 开启智能 AI 测品
                 </Button>
               </Link>
            </div>
          </div>
        </section>
        
        {/* Main Category Switcher */}
        <div className="flex gap-4 mb-16 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
           <MainCatPill 
             label="全部" 
             active={activeMainCategory === "ALL"} 
             onClick={() => { setActiveMainCategory("ALL"); setActiveSubCategory("all"); }}
             icon={LayoutGrid}
           />
           {Object.entries(mainCatInfo).map(([id, info]) => (
             <MainCatPill 
               key={id}
               label={info.label}
               active={activeMainCategory === id}
               onClick={() => { setActiveMainCategory(id as any); setActiveSubCategory("all"); }}
               icon={info.icon}
               activeColor={info.color}
             />
           ))}
        </div>

        {/* --- SMART Channel Interaction Enhancement: CARE Dashboard --- */}
        <AnimatePresence>
          {activeMainCategory === "CARE" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <CareDashboard />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Sidebar - Desktop */}
          <aside className="hidden md:block w-72 shrink-0 sticky top-24">
             <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white shadow-sm">
                <FilterSidebar privacyMode={privacyMode} />
             </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 w-full">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 bg-white/70 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-sm sticky top-20 z-10 md:static">
              
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide max-w-full">
                <Button 
                  variant="ghost" 
                  className={cn("h-11 px-6 rounded-2xl font-bold transition-all", activeSubCategory === "all" ? "bg-brand-hailan-blue text-white shadow-lg" : "text-neutral-400 hover:bg-neutral-100")}
                  onClick={() => setActiveSubCategory("all")}
                >
                  全部
                </Button>
                {activeMainCategory !== "ALL" && CATEGORIES.filter(c => c.mainCategory === activeMainCategory).map(cat => (
                  <Button 
                    key={cat.id}
                    variant="ghost" 
                    className={cn("h-11 px-6 rounded-2xl font-bold transition-all", activeSubCategory === cat.id ? "bg-brand-hailan-blue text-white shadow-lg" : "text-neutral-400 hover:bg-neutral-100")}
                    onClick={() => setActiveSubCategory(cat.id)}
                  >
                    {cat.name}
                  </Button>
                ))}
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
                  <SheetTrigger className="md:hidden flex-1 appearance-none bg-transparent border-none p-0 cursor-pointer">
                    <Button 
                      as="div"
                      variant="outline" 
                      className="w-full h-12 rounded-2xl border-neutral-200 font-bold"
                    >
                      <Filter className="w-4 h-4 mr-2" /> 筛选
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[85vh] rounded-t-[3rem] p-0 border-none">
                    <SheetHeader className="px-8 py-8 border-b border-neutral-50">
                      <SheetTitle className="text-3xl font-black text-brand-hailan-blue">精细筛选</SheetTitle>
                    </SheetHeader>
                    <div className="p-8 overflow-y-auto h-full pb-20">
                      <FilterSidebar privacyMode={privacyMode} />
                    </div>
                  </SheetContent>
                </Sheet>

                <Select defaultValue="recommended" onValueChange={(v) => setSortBy(v)}>
                  <SelectTrigger className="w-full sm:w-[180px] h-12 rounded-2xl font-bold border-neutral-100 bg-neutral-50/50">
                    <SelectValue placeholder="智能排序" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl shadow-2xl border-neutral-50 p-2">
                    <SelectItem value="recommended">推荐排序</SelectItem>
                    <SelectItem value="new">新品优先</SelectItem>
                    <SelectItem value="price-asc">价格：低到高</SelectItem>
                    <SelectItem value="price-desc">价格：高到低</SelectItem>
                  </SelectContent>
                </Select>

                <div className="hidden sm:flex items-center border border-neutral-100 rounded-2xl p-1 bg-neutral-50/50">
                  <ViewButton active={viewMode === "grid"} onClick={() => setViewMode("grid")} icon={LayoutGrid} />
                  <ViewButton active={viewMode === "list"} onClick={() => setViewMode("list")} icon={List} />
                </div>
              </div>
            </div>

            {/* Results */}
            <AnimatePresence mode="popLayout">
              {filteredProducts.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="flex flex-col items-center justify-center py-40 text-center bg-white rounded-[3rem] border-2 border-dashed border-neutral-100"
                >
                  <div className="w-32 h-32 bg-neutral-50 rounded-full flex items-center justify-center mb-10">
                    <Search className="w-12 h-12 text-neutral-200" />
                  </div>
                  <h3 className="text-3xl font-black text-neutral-900 mb-4 tracking-tight">暂无匹配项目</h3>
                  <p className="text-neutral-500 max-w-sm mb-12 text-lg font-medium leading-relaxed">
                    我们致力于为您提供最精准的匹配。尝试调整筛选条件，或直接咨询我们的智能助手。
                  </p>
                  <Button onClick={() => { setActiveMainCategory("ALL"); setActiveSubCategory("all"); }} className="rounded-2xl px-12 h-14 bg-brand-hailan-blue text-white font-bold text-lg shadow-xl shadow-brand-hailan-blue/20">
                    显示全部商品
                  </Button>
                </motion.div>
              ) : (
                <motion.div 
                  layout
                  className={cn(
                    "grid gap-10",
                    viewMode === "grid" 
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                      : "grid-cols-1"
                  )}
                >
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      privacyMode={privacyMode}
                      viewMode={viewMode}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        </div>
      </div>

      {/* --- SMART Channel Interaction: AI Shopping Script --- */}
      <AIShoppingScript category={activeMainCategory} />
    </MainLayout>
  );
}

function MainCatPill({ label, active, onClick, icon: Icon, activeColor }: any) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 px-10 py-5 rounded-[2rem] transition-all duration-500 border-2 whitespace-nowrap font-black tracking-tight text-lg",
        active 
          ? `bg-white border-brand-hailan-blue text-brand-hailan-blue shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)]` 
          : "bg-white border-transparent text-neutral-400 hover:border-neutral-100 hover:text-neutral-600"
      )}
    >
      <Icon className={cn("w-6 h-6 transition-all duration-500", active ? (activeColor || "text-brand-hailan-blue") : "text-neutral-300")} strokeWidth={2.5} />
      {label}
    </motion.button>
  );
}

function ViewButton({ active, onClick, icon: Icon }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-2.5 rounded-xl transition-all",
        active ? "bg-white shadow-xl text-brand-hailan-blue" : "text-neutral-400 hover:text-neutral-600"
      )}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}
