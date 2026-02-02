import React from "react";
import { HeartPulse, Rocket, Zap, ArrowRight, ShieldCheck, Sparkles, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@/app/components/router";
import { MainCategoryType } from "@/app/data/mockData";

const mainCategories = [
  { 
    id: "CARE", 
    name: "CARE", 
    label: "身心关爱", 
    desc: "专注健康、恢复与长期福祉", 
    icon: HeartPulse, 
    color: "text-emerald-500", 
    bg: "bg-emerald-50/50",
    border: "border-emerald-100",
    gradient: "from-emerald-500/10 to-transparent"
  },
  { 
    id: "PLAY", 
    name: "PLAY", 
    label: "愉悦探索", 
    desc: "释放灵感、建立连接与深度体验", 
    icon: Rocket, 
    color: "text-rose-500", 
    bg: "bg-rose-50/50",
    border: "border-rose-100",
    gradient: "from-rose-500/10 to-transparent"
  },
  { 
    id: "SMART", 
    name: "SMART", 
    label: "智感科技", 
    desc: "AI 赋能、生物反馈与数字化健康", 
    icon: Brain, 
    color: "text-blue-500", 
    bg: "bg-blue-50/50",
    border: "border-blue-100",
    gradient: "from-blue-500/10 to-transparent"
  },
];

export function CategoryGrid() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div className="max-w-xl">
           <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">探索核心分类</h2>
           <p className="text-neutral-500 mt-3 text-lg">海蓝严格遵循 CARE、PLAY、SMART 三大逻辑，为您构建全方位的健康管理体系。</p>
        </div>
        <Link to="/category" className="group flex items-center gap-2 text-brand-hailan-blue font-bold hover:underline transition-all">
          查看全部商品 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {mainCategories.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            whileHover={{ y: -8 }}
            className="relative group cursor-pointer"
          >
            <Link to={`/category?main=${cat.id}`} className="block relative h-full">
              {/* Card Background with Glassmorphism */}
              <div className={`h-full bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-10 border-2 ${cat.border} transition-all duration-500 group-hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] group-hover:bg-white/90 overflow-hidden`}>
                
                {/* Decorative Gradient Overlay */}
                <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${cat.gradient} blur-3xl -mr-10 -mt-10 opacity-60 group-hover:opacity-100 transition-opacity`} />
                
                {/* Icon Container */}
                <div className={`relative w-20 h-20 rounded-3xl ${cat.bg} flex items-center justify-center ${cat.color} mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                   <cat.icon className="w-10 h-10" strokeWidth={1.5} />
                </div>
                
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-black uppercase tracking-[0.2em] ${cat.color}`}>{cat.name}</span>
                    <ShieldCheck className="w-3 h-3 text-neutral-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4">{cat.label}</h3>
                  <p className="text-neutral-500 leading-relaxed mb-8">{cat.desc}</p>
                  
                  <div className={`inline-flex items-center gap-2 text-sm font-bold ${cat.color} group-hover:gap-3 transition-all`}>
                    立即探索 <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Trust Badge / Features Bar - Replaced bg-neutral-900 with bg-brand-navy */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-brand-navy rounded-[2rem] text-white shadow-2xl shadow-brand-navy/20"
      >
        <div className="flex flex-col items-center text-center p-4">
          <ShieldCheck className="w-8 h-8 text-blue-400 mb-3" />
          <h4 className="text-sm font-bold mb-1 uppercase tracking-widest">私密保障</h4>
          <p className="text-[10px] text-white/40">银行级加密与伪装技术</p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <Sparkles className="w-8 h-8 text-amber-400 mb-3" />
          <h4 className="text-sm font-bold mb-1 uppercase tracking-widest">智感交互</h4>
          <p className="text-[10px] text-white/40">实时生物反馈调节</p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <Zap className="w-8 h-8 text-rose-400 mb-3" />
          <h4 className="text-sm font-bold mb-1 uppercase tracking-widest">极速达</h4>
          <p className="text-[10px] text-white/40">全球仓储隐私物流</p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <Brain className="w-8 h-8 text-emerald-400 mb-3" />
          <h4 className="text-sm font-bold mb-1 uppercase tracking-widest">AI 顾问</h4>
          <p className="text-[10px] text-white/40">24/7 私人健康管家</p>
        </div>
      </motion.div>
    </section>
  );
}
