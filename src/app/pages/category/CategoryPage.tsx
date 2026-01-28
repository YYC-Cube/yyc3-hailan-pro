import React, { useState, useMemo } from "react";
import { PRODUCTS, CATEGORIES } from "@/app/data/mockData";
import { FilterSidebar } from "@/app/pages/category/components/FilterSidebar";
import { ProductCard } from "@/app/pages/category/components/ProductCard";
import { Navbar } from "@/app/components/layout/Navbar";
import { Footer } from "@/app/components/layout/Footer";
import { BottomNav } from "@/app/components/layout/BottomNav";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/app/components/ui/breadcrumb";
import { Button } from "@/app/components/ui/button";
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
  SheetDescription,
  SheetHeader
} from "@/app/components/ui/sheet";
import { LayoutGrid, List, SlidersHorizontal, Search, Sparkles, ChevronRight, HeartHandshake, Leaf, Cpu, Gem, BookOpen, Feather, Users, Zap } from "lucide-react";
import { cn } from "@/app/components/design-system/utils";
import { motion, AnimatePresence } from "motion/react";

interface CategoryPageProps {
  privacyMode: boolean;
  onPrivacyToggle: (enabled: boolean) => void;
}

const catIcons: Record<string, any> = {
  "smart-toys": Cpu,
  "massage": HeartHandshake,
  "wellness": Leaf,
  "apparel": Gem,
  "couples": Users, // Re-mapped or dynamic
  "tech": Zap
};

export function CategoryPage({ privacyMode, onPrivacyToggle }: CategoryPageProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("recommended");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];
    
    // Category Filter
    if (activeCategory !== "all") {
      result = result.filter(p => p.category === activeCategory);
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
  }, [sortBy, activeCategory]);

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-neutral-900 pb-20 md:pb-0">
      <Navbar 
        privacyMode={privacyMode} 
        onPrivacyToggle={onPrivacyToggle}
      />

      <main className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        
        {/* Category Quick Switcher - Visual Navigation */}
        <section className="mb-10 overflow-hidden">
           <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-sm font-bold text-neutral-400 uppercase tracking-widest">快速切换品类</h2>
              <Link to="/quiz-intro" className="text-xs font-bold text-brand-deep-blue flex items-center gap-1 hover:underline">
                 <Sparkles className="w-3 h-3" /> 智能测品
              </Link>
           </div>
           
           <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 snap-x">
              <CategoryPill 
                label="全部商品" 
                active={activeCategory === "all"} 
                onClick={() => setActiveCategory("all")}
                icon={LayoutGrid}
              />
              {CATEGORIES.map(cat => (
                <CategoryPill 
                  key={cat.id}
                  label={cat.name}
                  active={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  icon={catIcons[cat.id] || LayoutGrid}
                />
              ))}
           </div>
        </section>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar - Desktop (Flexible Sticky) */}
          <aside className="hidden md:block w-72 shrink-0 sticky top-24">
             <div className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm">
                <FilterSidebar privacyMode={privacyMode} />
             </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 w-full">
            {/* Toolbar - Aesthetics & Convenience */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white shadow-sm sticky top-20 z-10 md:static">
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                  {activeCategory === "all" ? "全部商品" : CATEGORIES.find(c => c.id === activeCategory)?.name}
                  <span className="text-xs font-medium text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-full">
                    {filteredProducts.length} 件
                  </span>
                </h1>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Mobile Filter Sheet */}
                <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
                  <SheetTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="md:hidden flex-1 sm:flex-none h-10 rounded-xl active:scale-95 transition-all border-neutral-200"
                    >
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      筛选
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0 overflow-hidden border-none shadow-2xl">
                    <div className="w-12 h-1.5 bg-neutral-200 rounded-full mx-auto mt-4 mb-2" />
                    <SheetHeader className="px-6 py-4 border-b border-neutral-100">
                      <SheetTitle className="text-xl font-bold text-neutral-900 text-left">精细筛选</SheetTitle>
                    </SheetHeader>
                    <div className="p-6 overflow-y-auto h-full pb-20">
                      <FilterSidebar privacyMode={privacyMode} />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort & View Controls */}
                <div className="flex items-center gap-2 flex-1 sm:flex-none">
                  <Select defaultValue="recommended" onValueChange={(v) => setSortBy(v)}>
                    <SelectTrigger className="w-full sm:w-[140px] h-10 rounded-xl text-xs font-medium border-neutral-200 focus:ring-1 focus:ring-brand-deep-blue/20">
                      <SelectValue placeholder="智能排序" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl shadow-xl border-neutral-100">
                      <SelectItem value="recommended">推荐排序</SelectItem>
                      <SelectItem value="new">新品优先</SelectItem>
                      <SelectItem value="price-asc">价格：低到高</SelectItem>
                      <SelectItem value="price-desc">价格：高到低</SelectItem>
                      <SelectItem value="rating">好评优先</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="hidden sm:flex items-center border border-neutral-200 rounded-xl p-1 bg-neutral-50 shadow-inner">
                    <ViewButton active={viewMode === "grid"} onClick={() => setViewMode("grid")} icon={LayoutGrid} />
                    <ViewButton active={viewMode === "list"} onClick={() => setViewMode("list")} icon={List} />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Grid/List */}
            <AnimatePresence mode="popLayout">
              {filteredProducts.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="flex flex-col items-center justify-center py-24 text-center"
                >
                  <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mb-6 border border-neutral-100">
                    <Search className="w-10 h-10 text-neutral-300" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">未找到匹配商品</h3>
                  <p className="text-neutral-500 max-w-xs mb-8">尝试放宽筛选条件，或咨询我们的 AI 助手获取专业建议。</p>
                  <Button onClick={() => { setActiveCategory("all"); setSortBy("recommended"); }} variant="outline" className="rounded-xl px-8">
                    重置所有
                  </Button>
                </motion.div>
              ) : (
                <motion.div 
                  layout
                  className={cn(
                    "grid gap-6",
                    viewMode === "grid" 
                      ? "grid-cols-2 lg:grid-cols-3" 
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

            {/* Pagination / Load More */}
            {filteredProducts.length > 0 && (
              <div className="mt-16 flex justify-center">
                <Button variant="ghost" className="text-neutral-400 hover:text-brand-deep-blue font-bold flex items-center gap-2 group">
                  正在查看全部商品 <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            )}
            
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}

function CategoryPill({ label, active, onClick, icon: Icon }: any) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-3 p-4 min-w-[100px] rounded-3xl transition-all duration-300 snap-center border-2",
        active 
          ? "bg-brand-deep-blue border-brand-deep-blue text-white shadow-lg shadow-brand-deep-blue/20" 
          : "bg-white border-transparent text-neutral-600 hover:border-neutral-200 hover:shadow-sm"
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
        active ? "bg-white/20" : "bg-neutral-50"
      )}>
        <Icon className={cn("w-6 h-6", active ? "text-white" : "text-brand-deep-blue")} />
      </div>
      <span className="text-xs font-bold whitespace-nowrap">{label}</span>
    </motion.button>
  );
}

function ViewButton({ active, onClick, icon: Icon }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-2 rounded-lg transition-all",
        active ? "bg-white shadow-sm text-brand-deep-blue" : "text-neutral-400 hover:text-neutral-600"
      )}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}
