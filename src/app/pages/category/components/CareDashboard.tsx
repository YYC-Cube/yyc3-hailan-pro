import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { motion } from "framer-motion";
import { Activity, Heart, ShieldCheck, Zap, Info, ArrowUpRight } from "lucide-react";
import { cn } from "@/app/components/design-system/utils";

const healthData = [
  { name: "Mon", score: 82, activity: 45 },
  { name: "Tue", score: 85, activity: 52 },
  { name: "Wed", score: 80, activity: 48 },
  { name: "Thu", score: 88, activity: 61 },
  { name: "Fri", score: 92, activity: 75 },
  { name: "Sat", score: 95, activity: 82 },
  { name: "Sun", score: 94, activity: 70 },
];

const sleepData = [
  { name: "Deep", value: 35, color: "#10b981" },
  { name: "Light", value: 45, color: "#3b82f6" },
  { name: "REM", value: 20, color: "#8b5cf6" },
];

export function CareDashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12 space-y-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
           <h2 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
             <Activity className="w-6 h-6 text-emerald-500" />
             健康数据看板
           </h2>
           <p className="text-sm text-neutral-500 mt-1">基于您的智能设备同步的实时身心状态分析</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
           <ShieldCheck className="w-3.5 h-3.5" />
           端到端加密保护中
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Health Score Chart */}
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 border border-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-1">Weekly Wellness Index</p>
              <h3 className="text-3xl font-bold text-neutral-900">89.4 <span className="text-sm font-medium text-emerald-500">+2.4%</span></h3>
            </div>
            <div className="flex gap-2">
               <button className="px-3 py-1 text-[10px] font-bold bg-neutral-900 text-white rounded-lg">Score</button>
               <button className="px-3 py-1 text-[10px] font-bold bg-neutral-100 text-neutral-500 rounded-lg hover:bg-neutral-200">Activity</button>
            </div>
          </div>
          
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={healthData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#A3A3A3' }}
                  dy={10}
                />
                <YAxis hide domain={[60, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '12px' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#10b981" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Metrics */}
        <div className="flex flex-col gap-6">
           <div className="flex-1 bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-[2rem] p-6 text-white relative overflow-hidden">
              <Heart className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 rotate-12" />
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                  <Heart className="w-5 h-5 text-rose-400" />
                </div>
                <h4 className="text-sm font-bold text-neutral-400 mb-1">实时压力指数</h4>
                <p className="text-2xl font-bold mb-4">Low · 32</p>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "32%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-emerald-400" 
                   />
                </div>
                <p className="text-[10px] text-neutral-500 mt-4 flex items-center gap-1">
                  <Info className="w-3 h-3" /> 您的生理反馈显示目前处于放松状态
                </p>
              </div>
           </div>

           <div className="flex-1 bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 border border-white shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-bold text-neutral-900">睡眠阶段分布</h4>
                <ArrowUpRight className="w-4 h-4 text-neutral-300" />
              </div>
              <div className="flex gap-1 h-6 rounded-lg overflow-hidden mb-6">
                {sleepData.map((d, i) => (
                  <motion.div 
                    key={i}
                    initial={{ flex: 0 }}
                    animate={{ flex: d.value }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                    style={{ backgroundColor: d.color }}
                  />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2">
                 {sleepData.map((d, i) => (
                   <div key={i}>
                      <p className="text-[10px] font-bold text-neutral-400 mb-1">{d.name}</p>
                      <p className="text-xs font-black text-neutral-900">{d.value}%</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Advice Bar */}
      <div className="p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex items-center gap-4">
         <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white shrink-0">
            <Zap className="w-6 h-6" />
         </div>
         <div>
            <h4 className="font-bold text-emerald-900 text-sm">今日智能建议</h4>
            <p className="text-emerald-700/70 text-xs mt-0.5">您的 HRV 数据今日较高，非常适合进行一次 20 分钟的盆底肌力量训练或深层呼吸放松。</p>
         </div>
         <Button variant="ghost" className="ml-auto text-xs font-bold text-emerald-600 hover:bg-emerald-100/50">
            立即开始
         </Button>
      </div>
    </motion.div>
  );
}

// Support component
function Button({ children, variant, className, ...props }: any) {
  return (
    <button 
      className={cn(
        "px-4 py-2 rounded-xl font-bold transition-all active:scale-95",
        variant === 'ghost' ? "hover:bg-neutral-100" : "bg-neutral-900 text-white",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
