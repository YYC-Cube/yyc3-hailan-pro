import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft,
  BarChart3,
  TrendingUp,
  Users,
  ShoppingCart,
  Eye,
  Shield,
  Target,
  Zap,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Download,
  CheckCircle,
  MessageSquare,
  Lock
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { BentoGrid, BentoItem } from '@/app/components/design-system/BentoGrid';
import { ChartTooltip } from '@/app/components/design-system/charts/ChartTooltip';
import { Button } from '@/app/components/design-system/Button';
import { GlassCard } from '@/app/components/design-system/GlassCard';
import { motion } from 'motion/react';

export function DataAnalyticsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'behavior' | 'product' | 'recommendation' | 'privacy'>('behavior');
  const [dateRange, setDateRange] = useState('7days');

  // --- Mock Data ---

  // Funnel Data for Chart
  const funnelData = [
    { name: '首页', value: 10000, rate: 100, fill: '#0056b3' },
    { name: '分类', value: 6500, rate: 65, fill: '#3182ce' },
    { name: '详情', value: 3200, rate: 32, fill: '#63b3ed' },
    { name: '购物车', value: 1280, rate: 12.8, fill: '#90cdf4' },
    { name: '下单', value: 512, rate: 5.12, fill: '#48bb78' }
  ];

  // Privacy Trend
  const privacyTrendData = [
    { date: '01-20', rate: 68.5, orders: 78.5 },
    { date: '01-21', rate: 70.2, orders: 79.2 },
    { date: '01-22', rate: 72.1, orders: 80.1 },
    { date: '01-23', rate: 73.5, orders: 81.5 },
    { date: '01-24', rate: 74.8, orders: 81.8 },
    { date: '01-25', rate: 75.0, orders: 82.0 },
    { date: '01-26', rate: 75.2, orders: 82.3 }
  ];

  // Product Sales Data
  const productSalesData = [
    { name: '震动棒 Pro', sales: 326, revenue: 19494, amt: 2400 },
    { name: '情趣套装', sales: 158, revenue: 14204, amt: 2210 },
    { name: '润滑液', sales: 892, revenue: 7938, amt: 2290 },
    { name: '安全套', sales: 1245, revenue: 7345, amt: 2000 },
  ];

  // Sentiment Data
  const sentimentData = [
    { name: '正面', value: 78.5, color: '#48bb78' },
    { name: '中性', value: 15.2, color: '#ecc94b' },
    { name: '负面', value: 6.3, color: '#f56565' },
  ];

  // AB Test Data
  const abTestData = [
    { name: 'Group A', conversion: 5.2, revenue: 45680 },
    { name: 'Group B', conversion: 6.1, revenue: 52340 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'behavior':
        return (
          <BentoGrid>
            {/* Conversion Funnel - Large */}
            <BentoItem 
              colSpan={4} 
              rowSpan={2} 
              title="全链路转化漏斗" 
              subtitle="用户从访问到下单的转化路径"
            >
               <div className="h-[300px] w-full mt-4">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart
                     data={funnelData}
                     layout="vertical"
                     margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                   >
                     <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.2} />
                     <XAxis type="number" hide />
                     <YAxis dataKey="name" type="category" width={60} tick={{fill: '#666'}} />
                     <Tooltip content={<ChartTooltip />} cursor={{fill: 'transparent'}} />
                     <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                        {funnelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                     </Bar>
                   </BarChart>
                 </ResponsiveContainer>
               </div>
            </BentoItem>

            {/* Key Stats */}
            <BentoItem colSpan={1} rowSpan={1} title="匿名浏览占比" className="bg-purple-50/50">
               <div className="flex flex-col items-center justify-center h-full pb-6">
                  <Eye className="w-8 h-8 text-purple-600 mb-2" />
                  <span className="text-3xl font-bold text-neutral-900">68.5%</span>
                  <span className="text-sm text-green-600 flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" /> +3.2%
                  </span>
               </div>
            </BentoItem>
            
             <BentoItem colSpan={1} rowSpan={1} title="匿名下单占比" className="bg-blue-50/50">
               <div className="flex flex-col items-center justify-center h-full pb-6">
                  <ShoppingCart className="w-8 h-8 text-brand-deep-blue mb-2" />
                  <span className="text-3xl font-bold text-neutral-900">82.3%</span>
                  <span className="text-sm text-green-600 flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" /> +5.1%
                  </span>
               </div>
            </BentoItem>

             <BentoItem colSpan={2} rowSpan={1} title="高转化路径 TOP3">
               <div className="space-y-3 mt-2">
                 {[
                   { path: '首页 → 分类 → 详情 → 下单', count: 1245, rate: '5.2%' },
                   { path: '首页 → 搜索 → 详情 → 下单', count: 856, rate: '4.8%' },
                   { path: '首页 → 推荐 → 详情 → 下单', count: 634, rate: '6.1%' }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between text-sm p-2 bg-white/50 rounded-lg">
                      <span className="truncate flex-1 font-medium text-neutral-700">{item.path}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-neutral-500">{item.count}人</span>
                        <span className="text-brand-deep-blue font-bold">{item.rate}</span>
                      </div>
                   </div>
                 ))}
               </div>
            </BentoItem>
          </BentoGrid>
        );

      case 'product':
        return (
          <BentoGrid>
             {/* Sales Chart */}
            <BentoItem colSpan={2} rowSpan={2} title="热销商品营收对比">
               <div className="h-[250px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productSalesData} margin={{top: 10, right: 10, left: -20, bottom: 0}}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                      <XAxis dataKey="name" tick={{fontSize: 12, fill: '#888'}} />
                      <YAxis tick={{fontSize: 12, fill: '#888'}} />
                      <Tooltip content={<ChartTooltip />} cursor={{fill: 'rgba(0,0,0,0.05)'}} />
                      <Bar dataKey="revenue" name="销售额" fill="#0056b3" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
               </div>
            </BentoItem>

            {/* Sentiment Pie */}
            <BentoItem colSpan={2} rowSpan={2} title="评价情感分布">
               <div className="h-[250px] w-full flex items-center justify-center">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sentimentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {sentimentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<ChartTooltip />} />
                      <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                 </ResponsiveContainer>
               </div>
            </BentoItem>

             {/* Inventory Alerts */}
             <BentoItem colSpan={4} rowSpan={1} title="库存预警">
                <div className="flex gap-4 mt-2 overflow-x-auto pb-2">
                   {[
                     { name: '智能震动棒 Pro', stock: 5, status: 'low' },
                     { name: '水基润滑液', stock: 245, status: 'normal' }
                   ].map((item, i) => (
                      <div key={i} className={`flex-1 min-w-[200px] p-3 rounded-xl border flex items-center justify-between ${
                        item.status === 'low' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
                      }`}>
                         <div>
                            <div className="font-semibold text-neutral-900">{item.name}</div>
                            <div className="text-xs text-neutral-500">库存: {item.stock}</div>
                         </div>
                         {item.status === 'low' && <AlertTriangle className="text-red-500 w-5 h-5" />}
                         {item.status === 'normal' && <CheckCircle className="text-green-500 w-5 h-5" />}
                      </div>
                   ))}
                </div>
             </BentoItem>
          </BentoGrid>
        );
      
      case 'privacy':
        return (
           <BentoGrid>
              <BentoItem colSpan={4} rowSpan={2} title="隐私模式使用趋势" subtitle="近7天使用率走势">
                 <div className="h-[300px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={privacyTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#6B46C1" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#6B46C1" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0056b3" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#0056b3" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="date" />
                          <YAxis />
                          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                          <Tooltip content={<ChartTooltip />} />
                          <Area type="monotone" dataKey="rate" name="隐私模式使用率" stroke="#6B46C1" fillOpacity={1} fill="url(#colorRate)" />
                          <Area type="monotone" dataKey="orders" name="匿名下单率" stroke="#0056b3" fillOpacity={1} fill="url(#colorOrders)" />
                          <Legend />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </BentoItem>
              
               <BentoItem colSpan={2} rowSpan={1} title="脱敏数据总量" className="bg-neutral-900 text-white">
                 <div className="flex flex-col justify-center h-full">
                    <div className="flex items-end gap-2">
                       <span className="text-4xl font-bold">2,458</span>
                       <span className="text-sm text-neutral-400 mb-1">条记录</span>
                    </div>
                    <div className="w-full bg-neutral-800 h-2 rounded-full mt-4 overflow-hidden">
                       <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 w-[75%]" />
                    </div>
                 </div>
              </BentoItem>

              <BentoItem colSpan={2} rowSpan={1} title="实时隐私警报">
                 <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-100 mt-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <div>
                       <div className="text-sm font-bold text-red-700">隐私投诉激增</div>
                       <div className="text-xs text-red-500">订单管理模块 · 14:30</div>
                    </div>
                 </div>
              </BentoItem>
           </BentoGrid>
        );
        
      default: // Recommendation
         return (
           <BentoGrid>
              <BentoItem colSpan={2} rowSpan={2} title="A/B 测试效果">
                 <div className="h-[250px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={abTestData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip content={<ChartTooltip />} />
                          <Bar dataKey="conversion" name="转化率 (%)" fill="#3182ce" />
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
              </BentoItem>

              <BentoItem colSpan={2} rowSpan={1} title="AI 建议" className="bg-gradient-to-br from-indigo-50 to-purple-50">
                 <div className="space-y-3 mt-2">
                    <div className="flex gap-3 items-start">
                       <Zap className="w-5 h-5 text-purple-600 mt-0.5" />
                       <p className="text-sm text-neutral-700">提高「震动棒」类商品在隐私模式下的推荐权重 (+15%)</p>
                    </div>
                    <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                       应用优化
                    </Button>
                 </div>
              </BentoItem>
              
              <BentoItem colSpan={2} rowSpan={1} title="整体准确率">
                  <div className="grid grid-cols-3 gap-2 mt-2 text-center">
                     <div className="p-2 bg-white rounded-lg border">
                        <div className="text-xs text-neutral-500">隐私</div>
                        <div className="font-bold text-purple-600">89.5%</div>
                     </div>
                     <div className="p-2 bg-white rounded-lg border">
                        <div className="text-xs text-neutral-500">普通</div>
                        <div className="font-bold text-blue-600">85.2%</div>
                     </div>
                     <div className="p-2 bg-white rounded-lg border">
                        <div className="text-xs text-neutral-500">综合</div>
                        <div className="font-bold text-green-600">87.3%</div>
                     </div>
                  </div>
              </BentoItem>
           </BentoGrid>
         );
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50/50">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin-dashboard')}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
               <div className="p-2 bg-brand-deep-blue/10 rounded-lg">
                 <BarChart3 className="w-6 h-6 text-brand-deep-blue" />
               </div>
               <div>
                  <h1 className="text-xl font-bold text-neutral-900">数据分析</h1>
                  <p className="text-xs text-neutral-500">Data Analytics Center</p>
               </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <select 
               value={dateRange}
               onChange={(e) => setDateRange(e.target.value)}
               className="h-10 px-3 bg-white border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-deep-blue/20"
             >
                <option value="7days">近7天</option>
                <option value="30days">近30天</option>
             </select>
             <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" /> 导出
             </Button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="max-w-[1600px] mx-auto px-6">
           <div className="flex gap-8">
             {[
               { id: 'behavior', label: '用户行为', icon: Users },
               { id: 'product', label: '产品表现', icon: ShoppingCart },
               { id: 'recommendation', label: '算法效果', icon: Target },
               { id: 'privacy', label: '隐私洞察', icon: Lock }
             ].map(tab => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id as any)}
                 className={cn(
                   "flex items-center gap-2 py-4 text-sm font-medium border-b-2 transition-all",
                   activeTab === tab.id 
                     ? "text-brand-deep-blue border-brand-deep-blue" 
                     : "text-neutral-500 border-transparent hover:text-neutral-800"
                 )}
               >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
               </button>
             ))}
           </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-6 py-8">
         <motion.div
           key={activeTab}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.3 }}
         >
            {renderContent()}
         </motion.div>
      </main>
    </div>
  );
}
