import React from "react";
import { Product } from "@/app/data/mockData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { Table, TableBody, TableCell, TableRow } from "@/app/components/ui/table";
import { Package, Smartphone, Sparkles, FileText, Ruler } from "lucide-react";

interface SpecsSectionProps {
  product: Product;
}

export function SpecsSection({ product }: SpecsSectionProps) {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
      <h3 className="text-xl font-serif text-[#1A365D] mb-6">产品详情</h3>
      
      <Accordion type="single" collapsible defaultValue="specs" className="w-full">
        
        <AccordionItem value="specs" className="border-b-slate-100">
          <AccordionTrigger className="hover:no-underline hover:text-blue-600 text-slate-700">
            <span className="flex items-center gap-3">
               <Ruler className="w-4 h-4 text-slate-400" />
               技术规格
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-2 pb-4">
              <Table>
                <TableBody>
                   <TableRow className="hover:bg-transparent border-slate-100">
                     <TableCell className="font-medium text-slate-500 w-1/3">材质</TableCell>
                     <TableCell className="text-slate-700">{product.material?.join(", ") || "N/A"}</TableCell>
                   </TableRow>
                   <TableRow className="hover:bg-transparent border-slate-100">
                     <TableCell className="font-medium text-slate-500">尺寸</TableCell>
                     <TableCell className="text-slate-700">120mm x 45mm x 30mm (模拟数据)</TableCell>
                   </TableRow>
                   <TableRow className="hover:bg-transparent border-slate-100">
                     <TableCell className="font-medium text-slate-500">重量</TableCell>
                     <TableCell className="text-slate-700">145g (模拟数据)</TableCell>
                   </TableRow>
                   <TableRow className="hover:bg-transparent border-transparent">
                     <TableCell className="font-medium text-slate-500">防水等级</TableCell>
                     <TableCell className="text-slate-700">IPX7 (可浸泡)</TableCell>
                   </TableRow>
                </TableBody>
              </Table>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="box" className="border-b-slate-100">
          <AccordionTrigger className="hover:no-underline hover:text-blue-600 text-slate-700">
             <span className="flex items-center gap-3">
               <Package className="w-4 h-4 text-slate-400" />
               包装内容
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-1 pt-2 pb-4 text-slate-600 text-sm marker:text-slate-300">
              {product.boxContent ? (
                product.boxContent.map((item, i) => <li key={i}>{item}</li>)
              ) : (
                <>
                  <li>{product.name} 设备</li>
                  <li>用户手册</li>
                  <li>收纳袋</li>
                </>
              )}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="care" className="border-b-slate-100">
          <AccordionTrigger className="hover:no-underline hover:text-blue-600 text-slate-700">
            <span className="flex items-center gap-3">
               <Sparkles className="w-4 h-4 text-slate-400" />
               清洁与保养
            </span>
          </AccordionTrigger>
          <AccordionContent>
             <p className="text-sm text-slate-600 leading-relaxed pt-2 pb-4">
               {product.cleaningInstructions || "使用前后请用温水和温和肥皂清洗。存放在阴凉干燥处，避免阳光直射。"}
             </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="compatibility" className="border-transparent">
          <AccordionTrigger className="hover:no-underline hover:text-blue-600 text-slate-700">
            <span className="flex items-center gap-3">
               <Smartphone className="w-4 h-4 text-slate-400" />
               兼容性
            </span>
          </AccordionTrigger>
          <AccordionContent>
             <div className="pt-2 pb-4 space-y-2">
               {product.compatibility ? (
                 <div className="flex flex-wrap gap-2">
                    {product.compatibility.map((item, i) => (
                      <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium border border-slate-200">{item}</span>
                    ))}
                 </div>
               ) : (
                 <p className="text-sm text-slate-600">标准兼容性。</p>
               )}
             </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  );
}
