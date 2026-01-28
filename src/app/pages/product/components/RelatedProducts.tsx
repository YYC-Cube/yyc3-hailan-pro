import React from "react";
import { PRODUCTS, Product } from "@/app/data/mockData";
import { ProductCard } from "@/app/pages/category/components/ProductCard";
import { Sparkles } from "lucide-react";

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
}

export function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  // Simple logic: same category, excluding current product
  const related = PRODUCTS
    .filter(p => p.category === category && p.id !== currentProductId)
    .slice(0, 4);

  // If not enough related products, fill with popular items
  if (related.length < 4) {
      const others = PRODUCTS
        .filter(p => p.id !== currentProductId && !related.find(r => r.id === p.id))
        .slice(0, 4 - related.length);
      related.push(...others);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <h3 className="text-2xl font-serif text-[#1A365D] font-medium flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            猜你喜欢
         </h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map(product => (
          <ProductCard key={product.id} product={product} privacyMode={true} />
        ))}
      </div>
    </div>
  );
}
