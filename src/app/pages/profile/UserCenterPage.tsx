import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import { BottomNav } from '@/app/components/layout/BottomNav';
import { 
  User, Package, Heart, Shield, Settings, Bell, ChevronRight, Lock, 
  Eye, Download, Trash2, CreditCard, MapPin, HelpCircle, MessageSquare, 
  Gift, TrendingUp, Award, Smartphone, Camera, ArrowUpRight
} from 'lucide-react';
import { useUser } from '@/app/context/UserContext';
import { motion } from 'framer-motion';
import { cn } from '@/app/components/design-system/utils';

interface UserCenterPageProps {
  privacyMode?: boolean;
  onPrivacyToggle?: (enabled: boolean) => void;
}

export function UserCenterPage({ privacyMode, onPrivacyToggle }: UserCenterPageProps) {
  const navigate = useNavigate();
  const { user } = useUser();
  const [privacyStatus, setPrivacyStatus] = useState(true);

  // 快速操作
  const quickActions = [
    {
      id: 'orders',
      icon: Package,
      label: '订单跟踪',
      badge: '3',
      color: 'blue',
      path: '/profile/orders'
    },
    {
      id: 'messages',
      icon: MessageSquare,
      label: '消息通知',
      badge: '2',
      color: 'green',
      path: '/profile/messages'
    },
    {
      id: 'favorites',
      icon: Heart,
      label: '我的收藏',
      badge: '12',
      color: 'red',
      path: '/profile/favorites'
    },
    {
      id: 'points',
      icon: Gift,
      label: '积分奖励',
      badge: '580',
      color: 'yellow',
      path: '/profile/points'
    }
  ];

  // 主要功能
  const mainFeatures = [
    {
      id: 'orders',
      icon: Package,
      title: '订单管理',
      description: '查看和管理您的订单',
      path: '/profile/orders',
      color: 'blue'
    },
    {
      id: 'privacy',
      icon: Shield,
      title: '隐私控制中心',
      description: '管理您的隐私设置和数据',
      path: '/profile/privacy',
      color: 'purple'
    },
    {
      id: 'preferences',
      icon: Settings,
      title: '偏好设置',
      description: '自定义您的使用体验',
      path: '/profile/preferences',
      color: 'gray'
    },
    {
      id: 'help',
      icon: HelpCircle,
      title: '帮助与支持',
      description: '常见问题和客服支持',
      path: '/profile/help',
      color: 'green'
    }
  ];

  const colorMap: Record<string, { bg: string; text: string; badge: string }> = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', badge: 'bg-blue-500' },
    green: { bg: 'bg-green-100', text: 'text-green-600', badge: 'bg-green-500' },
    red: { bg: 'bg-red-100', text: 'text-red-600', badge: 'bg-red-500' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', badge: 'bg-yellow-500' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', badge: 'bg-purple-500' },
    gray: { bg: 'bg-gray-100', text: 'text-gray-600', badge: 'bg-gray-500' }
  };

  return (
    <div className="min-h-screen bg-bg-secondary pb-20 md:pb-0">
      <Navbar privacyMode={privacyMode} onPrivacyToggle={onPrivacyToggle} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Mobile Layout (< 1024px) */}
        <div className="lg:hidden space-y-6">
          <ProfileHeroMobile user={user} />
          
          {/* 隐私状态指示 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  privacyStatus ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  {privacyStatus ? (
                    <Shield className="w-6 h-6 text-success" />
                  ) : (
                    <Eye className="w-6 h-6 text-text-tertiary" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">隐私保护状态</h3>
                  <p className="text-sm text-text-secondary">
                    {privacyStatus ? '已启用' : '已禁用'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPrivacyStatus(!privacyStatus)}
                className={`px-4 py-2 rounded-xl font-medium transition-all text-sm ${
                  privacyStatus
                    ? 'bg-success text-white'
                    : 'bg-bg-secondary text-text-secondary'
                }`}
              >
                {privacyStatus ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          {/* 快速操作 */}
          <div>
            <h2 className="text-lg font-bold text-text-primary mb-4">快速操作</h2>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                const colors = colorMap[action.color];
                return (
                  <button
                    key={action.id}
                    onClick={() => navigate(action.path)}
                    className="bg-white rounded-xl p-4 shadow-sm border border-border hover:border-[#0056b3] transition-all text-left"
                  >
                    <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center mb-3`}>
                      <Icon className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <div className="text-sm font-medium text-text-primary mb-1">{action.label}</div>
                    {action.badge && (
                      <span className={`text-xs ${colors.text} font-bold`}>{action.badge}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 列表菜单 */}
          <div className="bg-white rounded-2xl shadow-sm border border-border divide-y divide-border">
            {mainFeatures.map((feature) => (
              <MenuButton key={feature.id} icon={feature.icon} label={feature.title} description={feature.description} onClick={() => navigate(feature.path)} />
            ))}
            <MenuButton icon={CreditCard} label="支付方式" description="管理您的支付方式" onClick={() => navigate('/profile/payment')} />
            <MenuButton icon={MapPin} label="配送地址" description="管理您的配送地址" onClick={() => navigate('/profile/address')} />
            <MenuButton icon={Trash2} label="删除账户" description="永久删除您的账户" onClick={() => navigate('/profile/delete-account')} danger />
          </div>
        </div>

        {/* Desktop Bento Grid Layout (>= 1024px) */}
        <div className="hidden lg:grid grid-cols-12 grid-rows-[auto_auto_auto] gap-6">
          
          {/* Row 1: Profile Hero (8) + Privacy (4) */}
          <BentoTile className="col-span-8 bg-gradient-to-br from-[#0056b3] via-[#003a7a] to-[#6B46C1] text-white overflow-hidden relative shadow-2xl shadow-brand-hailan-blue/20">
             <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
             <div className="relative z-10 h-full flex flex-col justify-between p-8">
                <div className="flex items-start justify-between">
                   <div className="flex items-center gap-6">
                      <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border-4 border-white/30 flex items-center justify-center text-4xl font-bold text-white">
                         {user.name.charAt(0)}
                      </div>
                      <div>
                         <h1 className="text-3xl font-bold mb-2 text-white">{getGreeting()}，{user.name}</h1>
                         <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium flex items-center gap-2 text-white">
                               <Award className="w-4 h-4" />
                               {user.tier} 会员
                            </span>
                            <span className="text-white/80 text-sm font-light">{user.email}</span>
                         </div>
                      </div>
                   </div>
                   <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-white text-brand-deep-blue rounded-full font-bold text-sm"
                   >
                      编辑资料
                   </motion.button>
                </div>
                
                <div className="grid grid-cols-4 gap-4 mt-8">
                   <StatItem value="18" label="历史订单" />
                   <StatItem value="12" label="收藏商品" />
                   <StatItem value="580" label="会员积分" />
                   <StatItem value="3" label="待评价" />
                </div>
             </div>
          </BentoTile>

          <BentoTile className="col-span-4 bg-white border border-neutral-100 flex flex-col justify-between p-6">
             <div className="flex items-start justify-between">
                <div>
                   <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-success" />
                      隐私安全
                   </h3>
                   <p className="text-neutral-500 text-sm mt-1">数据保护状态监控</p>
                </div>
                <div className={cn("w-3 h-3 rounded-full", privacyStatus ? "bg-success animate-pulse" : "bg-neutral-300")} />
             </div>
             
             <div className="space-y-3 my-6">
                <div className="flex items-center justify-between text-sm">
                   <span className="text-neutral-600 flex items-center gap-2"><Lock className="w-4 h-4" /> SSL 加密传输</span>
                   <CheckIcon />
                </div>
                <div className="flex items-center justify-between text-sm">
                   <span className="text-neutral-600 flex items-center gap-2"><Eye className="w-4 h-4" /> 敏感内容模糊</span>
                   <CheckIcon />
                </div>
                <div className="flex items-center justify-between text-sm">
                   <span className="text-neutral-600 flex items-center gap-2"><Trash2 className="w-4 h-4" /> 本地数据管理</span>
                   <CheckIcon />
                </div>
             </div>

             <button 
                onClick={() => setPrivacyStatus(!privacyStatus)}
                className={cn(
                   "w-full py-3 rounded-xl font-medium transition-colors",
                   privacyStatus ? "bg-green-50 text-success hover:bg-green-100" : "bg-neutral-100 text-neutral-600"
                )}
             >
                {privacyStatus ? "隐私保护已激活" : "点击开启保护"}
             </button>
          </BentoTile>

          {/* Row 2: Quick Actions (4x3 cols) */}
          {quickActions.map((action) => (
             <BentoTile 
                key={action.id}
                className="col-span-3 bg-white border border-neutral-100 p-6 flex flex-col justify-between group cursor-pointer hover:border-brand-deep-blue/30"
                onClick={() => navigate(action.path)}
             >
                <div className="flex justify-between items-start">
                   <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", colorMap[action.color].bg)}>
                      <action.icon className={cn("w-6 h-6", colorMap[action.color].text)} />
                   </div>
                   {action.badge && (
                      <span className={cn("px-2 py-1 rounded-md text-xs font-bold text-white", colorMap[action.color].badge)}>
                         {action.badge}
                      </span>
                   )}
                </div>
                <div>
                   <h4 className="font-bold text-neutral-900 group-hover:text-brand-deep-blue transition-colors">{action.label}</h4>
                   <p className="text-xs text-neutral-400 mt-1">点击查看详情</p>
                </div>
             </BentoTile>
          ))}

          {/* Row 3: AR Entry (6) + Account Menu (6) */}
          <BentoTile 
             className="col-span-6 bg-brand-deep-night text-white p-8 relative overflow-hidden group cursor-pointer shadow-lg shadow-brand-deep-night/20"
             onClick={() => navigate('/ar-start')}
          >
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1633511090164-b43840ea1607?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity" />
             <div className="absolute inset-0 bg-gradient-to-t from-brand-deep-night/90 via-brand-deep-night/40 to-transparent" />
             
             <div className="relative z-10 h-full flex flex-col justify-end">
                <div className="mb-4">
                   <span className="inline-block px-3 py-1 bg-brand-coral/90 rounded-full text-xs font-bold mb-3 text-white">新功能</span>
                   <h3 className="text-2xl font-bold mb-2 text-white">沉浸式 AR 体验</h3>
                   <p className="text-neutral-100 max-w-md font-light">在您的私人空间中预览产品。无需购买即可体验真实尺寸与细节。</p>
                </div>
                <div className="flex items-center gap-2 font-bold text-brand-coral group-hover:translate-x-2 transition-transform">
                   <span>立即尝试</span>
                   <ArrowUpRight className="w-5 h-5" />
                </div>
             </div>
             
             <div className="absolute top-6 right-6 p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <Camera className="w-6 h-6 text-white" />
             </div>
          </BentoTile>

          <BentoTile className="col-span-6 bg-white border border-neutral-100 p-6 flex flex-col">
             <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-neutral-500" />
                更多服务
             </h3>
             <div className="grid grid-cols-2 gap-4 flex-1">
                {mainFeatures.slice(2).concat([
                   { id: 'payment', icon: CreditCard, title: '支付方式', description: '管理钱包', path: '/profile/payment', color: 'gray' },
                   { id: 'address', icon: MapPin, title: '地址管理', description: '配送信息', path: '/profile/address', color: 'gray' }
                ]).map((item) => (
                   <button 
                      key={item.id}
                      onClick={() => navigate(item.path)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors text-left"
                   >
                      <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                         <item.icon className="w-5 h-5 text-neutral-600" />
                      </div>
                      <div>
                         <div className="font-bold text-sm text-neutral-900">{item.title}</div>
                         <div className="text-xs text-neutral-500">{item.description}</div>
                      </div>
                   </button>
                ))}
             </div>
          </BentoTile>

        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}

// Sub-components

function BentoTile({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
   return (
      <motion.div 
         whileHover={onClick ? { y: -4, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" } : {}}
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.4 }}
         className={cn("rounded-3xl shadow-sm hover:shadow-md transition-all duration-300", className)}
         onClick={onClick}
      >
         {children}
      </motion.div>
   )
}

function StatItem({ value, label }: { value: string, label: string }) {
   return (
      <div className="text-center p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors cursor-default">
         <div className="text-xl font-bold mb-0.5 text-white">{value}</div>
         <div className="text-white/60 text-[10px] uppercase font-medium">{label}</div>
      </div>
   )
}

function CheckIcon() {
   return (
      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
         <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
         </svg>
      </div>
   )
}

function ProfileHeroMobile({ user }: { user: any }) {
   return (
      <div className="bg-gradient-to-br from-[#0056b3] via-[#003a7a] to-[#6B46C1] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden shadow-brand-hailan-blue/20">
        {/* 背景装饰 */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl border-2 border-white/30 flex items-center justify-center text-2xl font-bold text-white shadow-inner">
                {user.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1 text-white">
                  {getGreeting()}，{user.name}
                </h1>
                <p className="text-white/80 text-sm font-light">{user.tier} 会员</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 text-center">
              <div className="text-2xl font-bold mb-1">18</div>
              <div className="text-white/80 text-xs">订单数</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 text-center">
              <div className="text-2xl font-bold mb-1">12</div>
              <div className="text-white/80 text-xs">收藏</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 text-center">
              <div className="text-2xl font-bold mb-1">580</div>
              <div className="text-white/80 text-xs">积分</div>
            </div>
          </div>
        </div>
      </div>
   )
}

function MenuButton({ icon: Icon, label, description, onClick, danger = false }: any) {
  return (
    <button
      onClick={onClick}
      className="w-full p-5 flex items-center gap-4 hover:bg-bg-secondary transition-colors group"
    >
      <div className={`w-10 h-10 ${danger ? 'bg-red-100' : 'bg-bg-secondary'} rounded-lg flex items-center justify-center`}>
        <Icon className={`w-5 h-5 ${danger ? 'text-error' : 'text-text-tertiary'}`} />
      </div>
      <div className="flex-1 text-left">
        <h3 className={`font-medium ${danger ? 'text-error' : 'text-text-primary'}`}>
          {label}
        </h3>
        <p className="text-sm text-text-secondary">{description}</p>
      </div>
      <ChevronRight className={`w-5 h-5 ${danger ? 'text-error' : 'text-text-tertiary'}`} />
    </button>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 6) return '凌晨好';
  if (hour < 12) return '早上好';
  if (hour < 14) return '中午好';
  if (hour < 18) return '下午好';
  return '晚上好';
}
