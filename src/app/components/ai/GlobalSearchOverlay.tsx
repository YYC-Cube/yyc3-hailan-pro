import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  X, 
  Brain, 
  Database, 
  BookOpen, 
  Activity, 
  ChevronRight, 
  Sparkles,
  Zap,
  Lock,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/app/components/design-system/utils";

interface SearchResult {
  id: string;
  type: "local" | "encyclopedia" | "action";
  title: string;
  description: string;
  category: string;
}

const MOCK_RESULTS: SearchResult[] = [
  {
    id: "r1",
    type: "local",
    title: "上周 HRV 深度分析报告",
    description: "检测到压力指数在 D4 达到峰值，与‘午夜加班’场景触发相关。",
    category: "私有数据"
  },
  {
    id: "r2",
    type: "encyclopedia",
    title: "什么是副交感神经系统？",
    description: "自主神经系统的一个分支，主要负责身体的休息与消化，降低心率。",
    category: "医学百科"
  },
  {
    id: "r3",
    type: "action",
    title: "启动‘静谧睡眠’自动化",
    description: "一键配置 Nebula Pulse 与香薰机协同。",
    category: "快捷操作"
  },
  {
    id: "r4",
    type: "encyclopedia",
    title: "皮质醇与晨起焦虑的关联",
    description: "医学研究表明，晨起皮质醇觉醒反应（CAR）过高会导致心跳过快。",
    category: "专业文献"
  }
];

export function GlobalSearchOverlay({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length > 2) {
      setIsSearching(true);
      const timer = setTimeout(() => setIsSearching(false), 800);
      return () => clearTimeout(timer);
    }
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-brand-navy/40 backdrop-blur-2xl flex items-start justify-center pt-24 px-4"
          onClick={onClose}
        >
          <motion.div 
            initial={{ y: 20, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 20, scale: 0.95 }}
            className="w-full max-w-2xl bg-white/95 rounded-[2.5rem] shadow-2xl border border-white/20 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Search Input Header */}
            <div className="p-6 border-b border-neutral-100 flex items-center gap-4">
               <div className={cn(
                 "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                 isSearching ? "bg-indigo-600 text-white animate-pulse" : "bg-neutral-100 text-neutral-400"
               )}>
                  {isSearching ? <RefreshCw className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6" />}
               </div>
               <input 
                 ref={inputRef}
                 type="text"
                 placeholder="询问海蓝：关于我的健康、产品或百科知识..."
                 className="flex-1 bg-transparent border-none outline-none text-xl font-medium placeholder:text-neutral-300"
                 value={query}
                 onChange={e => setQuery(e.target.value)}
               />
               <button 
                 onClick={onClose}
                 className="w-10 h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors"
               >
                  <X className="w-5 h-5 text-neutral-400" />
               </button>
            </div>

            {/* Content Area */}
            <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
               {query.length > 0 ? (
                 <div className="p-4 space-y-2">
                    {MOCK_RESULTS.map((res, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={res.id}
                        className="group p-4 rounded-3xl hover:bg-neutral-50 transition-all border border-transparent hover:border-neutral-100 flex items-start gap-4 cursor-pointer"
                      >
                         <div className={cn(
                           "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                           res.type === 'local' ? "bg-emerald-50 text-emerald-600" :
                           res.type === 'encyclopedia' ? "bg-indigo-50 text-indigo-600" :
                           "bg-amber-50 text-amber-600"
                         )}>
                            {res.type === 'local' ? <Database className="w-5 h-5" /> :
                             res.type === 'encyclopedia' ? <BookOpen className="w-5 h-5" /> :
                             <Zap className="w-5 h-5" />}
                         </div>
                         <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                               <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">{res.category}</span>
                               {res.type === 'local' && <Lock className="w-2.5 h-2.5 text-neutral-300" />}
                            </div>
                            <h4 className="font-bold text-neutral-900 group-hover:text-brand-deep-blue transition-colors">{res.title}</h4>
                            <p className="text-sm text-neutral-500 mt-1 line-clamp-1">{res.description}</p>
                         </div>
                         <ChevronRight className="w-5 h-5 text-neutral-200 group-hover:text-neutral-400 transition-all group-hover:translate-x-1 self-center" />
                      </motion.div>
                    ))}

                    <div className="p-4 mt-4 bg-indigo-50/50 rounded-3xl border border-indigo-100/50 flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <Brain className="w-6 h-6 text-indigo-600" />
                          <div>
                             <h5 className="text-sm font-black text-indigo-900">AI 知识图谱扩展</h5>
                             <p className="text-xs text-indigo-600/60">关联了 12 个相关医学节点与您的本地趋势</p>
                          </div>
                       </div>
                       <button className="px-4 py-2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-indigo-700 transition-colors">
                          查看图谱
                       </button>
                    </div>
                 </div>
               ) : (
                 <div className="p-12 text-center">
                    <Sparkles className="w-12 h-12 text-neutral-100 mx-auto mb-4" />
                    <h5 className="text-neutral-400 font-medium">试试搜索：“我最近的睡眠趋势”或“如何调节副交感神经”</h5>
                    <div className="flex flex-wrap justify-center gap-2 mt-8">
                       {["压力分析", "Nebula 配置", "HRV 科普", "深度冥想"].map(tag => (
                         <button 
                           key={tag}
                           onClick={() => setQuery(tag)}
                           className="px-4 py-2 bg-neutral-50 rounded-full text-xs font-bold text-neutral-500 hover:bg-neutral-100 transition-colors"
                         >
                            {tag}
                         </button>
                       ))}
                    </div>
                 </div>
               )}
            </div>

            {/* Footer Status */}
            <div className="p-4 bg-neutral-50 flex items-center justify-between border-t border-neutral-100">
               <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Local E2E Search Active</span>
               </div>
               <div className="flex items-center gap-1 text-[10px] font-black text-neutral-400 uppercase">
                  <ArrowUpRight className="w-3 h-3" /> Press Enter to Ask AI
               </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function RefreshCw(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}
