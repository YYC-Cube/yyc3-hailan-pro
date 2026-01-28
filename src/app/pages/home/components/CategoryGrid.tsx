import React from "react";
import { HeartHandshake, Leaf, Cpu, Gem, BookOpen, Feather, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const categories = [
  { id: 1, name: "亲密连接", desc: "双人专属", icon: HeartHandshake, color: "text-rose-500", bg: "bg-rose-50" },
  { id: 2, name: "健康护理", desc: "身体关爱", icon: Leaf, color: "text-emerald-500", bg: "bg-emerald-50" },
  { id: 3, name: "智能科技", desc: "App 控制", icon: Cpu, color: "text-blue-500", bg: "bg-blue-50" },
  { id: 4, name: "生活方式", desc: "精选配件", icon: Gem, color: "text-purple-500", bg: "bg-purple-50" },
  { id: 5, name: "健康教育", desc: "学习成长", icon: BookOpen, color: "text-amber-500", bg: "bg-amber-50" },
  { id: 6, name: "品牌故事", desc: "理念传承", icon: Feather, color: "text-brand-gold", bg: "bg-yellow-50/50" },
];

export function CategoryGrid() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-end mb-8">
        <div>
           <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">探索类别</h2>
           <p className="text-neutral-500 mt-1">精心策划的各类收藏。</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group"
          >
            <Link to="/category" className="block h-full bg-white rounded-xl p-6 border border-neutral-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center gap-4">
               <div className={`w-14 h-14 rounded-full ${cat.bg} flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
                  <cat.icon className="w-7 h-7" strokeWidth={1.5} />
               </div>
               <div>
                  <h3 className="font-bold text-neutral-900 mb-1">{cat.name}</h3>
                  <p className="text-xs text-neutral-500">{cat.desc}</p>
               </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}