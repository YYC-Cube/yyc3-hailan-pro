import React from "react";
import { CATEGORIES } from "@/app/data/mockData";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/app/components/ui/accordion";
import { Slider } from "@/app/components/ui/slider";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Sparkles, Leaf, Activity, Users, Zap, Smartphone, Filter, RefreshCw, Star } from "lucide-react";
import { cn } from "@/app/components/design-system/utils";

interface FilterSidebarProps {
  className?: string;
  privacyMode: boolean;
}

export function FilterSidebar({ className, privacyMode }: FilterSidebarProps) {
  const [priceRange, setPriceRange] = React.useState([0, 2000]);

  return (
    <div className={cn("space-y-6 pb-20", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
           <Filter className="w-4 h-4 text-brand-deep-blue" />
           <h3 className="text-lg font-bold text-neutral-900">精细筛选</h3>
        </div>
        <Button variant="ghost" size="sm" className="text-xs text-neutral-400 hover:text-brand-coral h-auto p-0 flex items-center gap-1">
          <RefreshCw className="w-3 h-3" /> 重置
        </Button>
      </div>

      {/* Quick Tags Section - Convenience Focus */}
      <div className="space-y-3">
         <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest px-1">快速选择</p>
         <div className="flex flex-wrap gap-2">
            {["24h送达", "新品", "智能控制", "高评分", "医用材质"].map((tag) => (
               <Badge 
                 key={tag} 
                 variant="secondary" 
                 className="bg-white border border-neutral-100 text-neutral-600 hover:border-brand-deep-blue hover:text-brand-deep-blue cursor-pointer px-3 py-1.5 transition-all active:scale-95"
               >
                 {tag}
               </Badge>
            ))}
         </div>
      </div>

      <Accordion type="multiple" defaultValue={["category", "price", "rating"]} className="w-full">
        {/* Categories */}
        <AccordionItem value="category" className="border-neutral-100">
          <AccordionTrigger className="text-sm font-bold hover:no-underline py-4">
            产品分类
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1">
              {CATEGORIES.map((cat) => (
                <div key={cat.id} className="space-y-2">
                  <div className="flex items-center space-x-2 group">
                    <Checkbox id={`cat-${cat.id}`} className="data-[state=checked]:bg-brand-deep-blue" />
                    <Label 
                      htmlFor={`cat-${cat.id}`}
                      className="text-sm font-medium leading-none cursor-pointer group-hover:text-brand-deep-blue transition-colors"
                    >
                      {cat.name}
                    </Label>
                  </div>
                  <div className="pl-6 space-y-1.5 border-l border-neutral-100 ml-1.5">
                    {cat.subcategories.slice(0, 3).map((sub) => (
                      <div key={sub} className="text-xs text-neutral-500 hover:text-brand-deep-blue cursor-pointer py-0.5 flex items-center gap-2 group/sub">
                        <div className="w-1 h-1 rounded-full bg-neutral-200 group-hover/sub:bg-brand-deep-blue transition-colors" />
                        {sub}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Rating */}
        <AccordionItem value="rating" className="border-neutral-100">
          <AccordionTrigger className="text-sm font-bold hover:no-underline py-4">
            用户评分
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1">
               {[4.5, 4.0, 3.5].map((rating) => (
                  <div key={rating} className="flex items-center gap-2 cursor-pointer group">
                     <Checkbox id={`rate-${rating}`} />
                     <Label htmlFor={`rate-${rating}`} className="text-sm flex items-center gap-1 cursor-pointer">
                        {rating} <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 以上
                     </Label>
                  </div>
               ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price" className="border-neutral-100">
          <AccordionTrigger className="text-sm font-bold hover:no-underline py-4">
            价格区间
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 px-1 space-y-6">
              <Slider 
                defaultValue={[0, 2000]} 
                max={5000} 
                step={100} 
                value={priceRange}
                onValueChange={setPriceRange}
                className="my-4"
              />
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] text-neutral-400 uppercase font-bold">最低</span>
                   <span className="text-sm font-bold text-neutral-900">¥{priceRange[0]}</span>
                </div>
                <div className="w-8 h-px bg-neutral-200" />
                <div className="flex flex-col gap-1 text-right">
                   <span className="text-[10px] text-neutral-400 uppercase font-bold">最高</span>
                   <span className="text-sm font-bold text-neutral-900">¥{priceRange[1]}+</span>
                </div>
              </div>
              {privacyMode && (
                <div className="flex items-start gap-2 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                  <Activity className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <p className="text-[10px] text-neutral-500 leading-tight">
                     <b>隐私保护</b>：您的筛选条件仅在本地运行，不会上传至云端分析。
                  </p>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Promo Card */}
      <div className="mt-8 p-5 rounded-2xl bg-brand-deep-blue text-white relative overflow-hidden shadow-lg shadow-brand-deep-blue/20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center mb-4">
             <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h4 className="font-bold text-sm mb-2">需要专家建议？</h4>
          <p className="text-xs text-white/70 mb-4 leading-relaxed">基于您的生理特征与喜好，AI 助手为您深度匹配。</p>
          <Button size="sm" className="w-full h-9 bg-white text-brand-deep-blue hover:bg-neutral-100 border-none font-bold rounded-xl transition-all active:scale-95">
            咨询 AI 助手
          </Button>
        </div>
      </div>
    </div>
  );
}
