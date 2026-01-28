import React, { useState } from 'react';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Heart, 
  Package, 
  Settings, 
  Shield,
  Eye,
  CreditCard,
  MapPin,
  Crown,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { FavoritesSection } from './components/FavoritesSection';
import { TransactionsSection } from './components/TransactionsSection';
import { PrivacyToggle } from '@/app/components/PrivacyBlur';
import { MOCK_FAVORITES } from '@/app/data/favoritesData';
import { MOCK_TRANSACTIONS, calculateTotalSpent } from '@/app/data/transactionsData';
import { useUser } from '@/app/context/UserContext';
import { cn } from '@/app/components/design-system/utils';

interface UserProfilePageProps {
  privacyMode?: boolean;
  onPrivacyToggle?: (enabled: boolean) => void;
}

export function UserProfilePage({ privacyMode, onPrivacyToggle }: UserProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'favorites' | 'orders' | 'settings'>('profile');
  const [favorites, setFavorites] = useState(MOCK_FAVORITES);
  const { user } = useUser();

  const tabs = [
    { id: 'profile', label: '个人资料', icon: User },
    { id: 'favorites', label: '我的收藏', icon: Heart, count: favorites.length },
    { id: 'orders', label: '订单历史', icon: Package, count: MOCK_TRANSACTIONS.length },
    { id: 'settings', label: '账户设置', icon: Settings },
  ];

  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileContent />;
      case 'favorites':
        return <FavoritesSection favorites={favorites} onRemove={handleRemoveFavorite} />;
      case 'orders':
        return <TransactionsSection transactions={MOCK_TRANSACTIONS} />;
      case 'settings':
        return <SettingsContent />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-sans">
      <Navbar privacyMode={privacyMode} onPrivacyToggle={onPrivacyToggle} />
      
      <main className="max-w-7xl mx-auto px-4 py-8 pb-24">
        {/* Header with Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-brand-deep-blue to-[#1e293b] rounded-3xl p-8 mb-8 text-white relative overflow-hidden shadow-xl shadow-brand-deep-blue/10"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-coral/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              {/* User Info */}
              <div className="flex items-center gap-6">
                <div className="relative">
                   <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-4xl font-serif text-white shadow-inner">
                     {user.name.charAt(0)}
                   </div>
                   <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center border-2 border-[#1A365D]">
                      <Crown className="w-4 h-4 text-[#1A365D]" />
                   </div>
                </div>
                
                <div>
                  <h1 className="text-3xl font-bold mb-1 tracking-tight">{user.name}</h1>
                  <p className="text-white/60 mb-3 font-light">{user.email}</p>
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-white/10 backdrop-blur rounded-full text-xs font-medium border border-white/10 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-brand-gold" />
                      {user.tier} 会员
                    </div>
                    <PrivacyToggle />
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 md:border-l border-white/10 md:pl-8">
                <StatCard label="总消费" value={`¥${calculateTotalSpent(MOCK_TRANSACTIONS)}`} />
                <StatCard label="订单数" value={MOCK_TRANSACTIONS.length} />
                <StatCard label="收藏" value={favorites.length} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-100 mb-8 p-1 overflow-x-auto sticky top-20 z-30">
          <div className="flex min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all relative flex-1 justify-center",
                  activeTab === tab.id 
                    ? "text-brand-deep-blue bg-blue-50/50" 
                    : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
                )}
              >
                <tab.icon className={cn("w-4 h-4", activeTab === tab.id && "fill-current opacity-20")} />
                <span className="text-sm">{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={cn(
                    "ml-1 px-1.5 py-0.5 rounded-full text-[10px]",
                    activeTab === tab.id 
                      ? "bg-brand-deep-blue text-white" 
                      : "bg-neutral-100 text-neutral-500"
                  )}>
                    {tab.count}
                  </span>
                )}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-deep-blue rounded-full mb-1"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="text-center">
      <p className="text-white/50 text-xs mb-1 uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold font-serif">{value}</p>
    </div>
  );
}

function ProfileContent() {
  const { user } = useUser();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InfoCard icon={User} title="基本信息">
        <InfoRow label="姓名" value={user.name} />
        <InfoRow label="邮箱" value={user.email} />
        <InfoRow label="会员等级" value={user.tier} />
        <InfoRow label="加入时间" value={new Date(user.memberSince).toLocaleDateString('zh-CN')} />
      </InfoCard>

      <InfoCard icon={Shield} title="隐私设置">
        <InfoRow label="隐私模式" value={<span className="text-emerald-600 flex items-center gap-1"><Shield className="w-3 h-3" /> 已启用</span>} />
        <InfoRow label="数据保留" value="30 天" />
        <InfoRow label="生物识别" value="未设置" />
        <InfoRow label="通知方式" value="谨慎模式" />
      </InfoCard>

      <InfoCard icon={MapPin} title="配送地址">
        <div className="flex items-center justify-between">
           <p className="text-sm text-neutral-900 font-medium">*** 保密地址 ***</p>
           <PrivacyToggle size="sm" />
        </div>
        <p className="text-xs text-neutral-500 mt-2">为保护隐私，完整地址默认隐藏。点击隐私开关可查看。</p>
      </InfoCard>

      <InfoCard icon={CreditCard} title="支付方式">
        <InfoRow label="信用卡" value="**** **** **** 1234" />
        <InfoRow label="支付宝" value="已绑定" />
        <InfoRow label="微信支付" value="已绑定" />
      </InfoCard>
    </div>
  );
}

function SettingsContent() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <SettingCard title="隐私设置">
        <SettingRow label="启用隐私模式" description="自动模糊敏感内容，隐藏订单详情" checked />
        <SettingRow label="谨慎通知" description="通知栏不显示具体商品名称和内容" checked />
        <SettingRow label="生物识别登录" description="使用指纹或面部识别解锁 App" />
      </SettingCard>

      <SettingCard title="数据管理">
        <SettingRow label="浏览历史" description="30天后自动清除本地记录" checked />
        <SettingRow label="搜索记录" description="退出应用时清除" />
        <div className="pt-4 mt-2 border-t border-neutral-100 flex justify-between items-center">
            <span className="text-sm text-neutral-900">导出个人数据</span>
            <button className="text-xs text-brand-deep-blue hover:underline">下载归档</button>
        </div>
      </SettingCard>

      <SettingCard title="账户安全">
        <div className="flex justify-between items-center py-3 border-b border-neutral-100">
           <div>
             <p className="text-sm font-medium text-neutral-900">修改密码</p>
             <p className="text-xs text-neutral-500 mt-1">上次修改: 2026-01-01</p>
           </div>
           <ChevronRight className="w-4 h-4 text-neutral-400" />
        </div>
        <SettingRow label="双重验证" description="登录时需要短信验证码" checked />
        <div className="flex justify-between items-center py-3">
           <div>
             <p className="text-sm font-medium text-neutral-900">登录设备管理</p>
             <p className="text-xs text-neutral-500 mt-1">当前在线: iPhone 15 Pro</p>
           </div>
           <ChevronRight className="w-4 h-4 text-neutral-400" />
        </div>
      </SettingCard>
    </div>
  );
}

function InfoCard({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-brand-deep-blue/5 rounded-xl">
          <Icon className="w-5 h-5 text-brand-deep-blue" />
        </div>
        <h3 className="text-lg font-medium text-neutral-900">{title}</h3>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-neutral-50 last:border-0">
      <span className="text-sm text-neutral-500">{label}</span>
      <span className="text-sm font-medium text-neutral-900">{value}</span>
    </div>
  );
}

function SettingCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
      <h3 className="text-lg font-medium text-neutral-900 mb-5 pb-3 border-b border-neutral-100">{title}</h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}

function SettingRow({ label, description, checked = false }: { label: string; description: string; checked?: boolean }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium text-neutral-900">{label}</p>
        <p className="text-xs text-neutral-500 mt-1 max-w-md">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" defaultChecked={checked} />
        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-deep-blue"></div>
      </label>
    </div>
  );
}
