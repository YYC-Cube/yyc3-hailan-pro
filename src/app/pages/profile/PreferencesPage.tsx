import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ChevronLeft,
  Bell,
  Eye,
  TrendingUp,
  Truck,
  ChevronRight,
  Mail,
  MessageSquare,
  Smartphone,
  EyeOff,
  Filter,
  Star,
  Package,
  Settings
} from 'lucide-react';

export function PreferencesPage() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    recommendations: true,
    community: true,
    system: true
  });

  const [display, setDisplay] = useState({
    contentSensitivity: 'high',
    autoBlur: true,
    showRecommendations: true,
    compactMode: false
  });

  const [recommendations, setRecommendations] = useState({
    personalized: true,
    collaborative: true,
    trending: false,
    expert: true
  });

  const [delivery, setDelivery] = useState({
    defaultAddress: '北京市朝阳区***',
    preferredTime: 'anytime',
    contactMethod: 'phone',
    discreetPackaging: true
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleDisplay = (key: keyof typeof display) => {
    setDisplay(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleRecommendation = (key: keyof typeof recommendations) => {
    setRecommendations(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 bg-white border-b border-border shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/profile/center')}
              className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-text-primary" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-text-primary">偏好设置</h1>
              <p className="text-xs text-text-secondary">自定义您的使用体验</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* 通知偏好 */}
        <section className="bg-white rounded-2xl shadow-sm border border-border">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-[#0056b3]" />
              <div>
                <h2 className="text-xl font-bold text-text-primary">通知偏好</h2>
                <p className="text-sm text-text-secondary mt-1">
                  选择您希望接收的通知类型
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-border">
            <NotificationItem
              icon={Package}
              title="订单更新"
              description="订单状态变更、物流信息等"
              enabled={notifications.orderUpdates}
              onToggle={() => toggleNotification('orderUpdates')}
              channels={['推送', '短信', '邮件']}
            />
            <NotificationItem
              icon={Star}
              title="促销活动"
              description="特价商品、优惠券、限时折扣"
              enabled={notifications.promotions}
              onToggle={() => toggleNotification('promotions')}
              channels={['推送']}
            />
            <NotificationItem
              icon={TrendingUp}
              title="智能推荐"
              description="基于您的偏好的产品推荐"
              enabled={notifications.recommendations}
              onToggle={() => toggleNotification('recommendations')}
              channels={['推送']}
            />
            <NotificationItem
              icon={MessageSquare}
              title="社区动态"
              description="关注的话题、评论回复、点赞等"
              enabled={notifications.community}
              onToggle={() => toggleNotification('community')}
              channels={['推送']}
            />
            <NotificationItem
              icon={Settings}
              title="系统通知"
              description="账户安全、隐私政策更新等"
              enabled={notifications.system}
              onToggle={() => toggleNotification('system')}
              channels={['推送', '邮件']}
              required
            />
          </div>
        </section>

        {/* 显示偏好 */}
        <section className="bg-white rounded-2xl shadow-sm border border-border">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <Eye className="w-6 h-6 text-[#0056b3]" />
              <div>
                <h2 className="text-xl font-bold text-text-primary">显示偏好</h2>
                <p className="text-sm text-text-secondary mt-1">
                  控制内容的显示方式
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-border">
            {/* 内容敏感度 */}
            <div className="p-5 hover:bg-bg-secondary transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Filter className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary mb-1">内容敏感度</h3>
                  <p className="text-sm text-text-secondary mb-4">
                    选择您希望看到的内容类型
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {['low', 'medium', 'high'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setDisplay(prev => ({ ...prev, contentSensitivity: level }))}
                        className={`py-2 px-4 rounded-lg font-medium transition-all ${
                          display.contentSensitivity === level
                            ? 'bg-[#0056b3] text-white shadow-md'
                            : 'bg-bg-secondary text-text-secondary border border-border hover:border-[#0056b3]'
                        }`}
                      >
                        {level === 'low' ? '低' : level === 'medium' ? '中' : '高'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <PreferenceToggleItem
              icon={EyeOff}
              title="自动模糊"
              description="在公共场合自动模糊敏感内容"
              enabled={display.autoBlur}
              onToggle={() => toggleDisplay('autoBlur')}
              recommended
            />
            <PreferenceToggleItem
              icon={TrendingUp}
              title="显示推荐"
              description="在首页和分类页显示个性化推荐"
              enabled={display.showRecommendations}
              onToggle={() => toggleDisplay('showRecommendations')}
            />
            <PreferenceToggleItem
              icon={Settings}
              title="紧凑模式"
              description="使用更紧凑的布局以显示更多内容"
              enabled={display.compactMode}
              onToggle={() => toggleDisplay('compactMode')}
            />
          </div>
        </section>

        {/* 推荐偏好 */}
        <section className="bg-white rounded-2xl shadow-sm border border-border">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-[#0056b3]" />
              <div>
                <h2 className="text-xl font-bold text-text-primary">推荐偏好</h2>
                <p className="text-sm text-text-secondary mt-1">
                  调整推荐算法以获得更精准的结果
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-border">
            <PreferenceToggleItem
              icon={User}
              title="个性化推荐"
              description="基于您的浏览和购买历史"
              enabled={recommendations.personalized}
              onToggle={() => toggleRecommendation('personalized')}
            />
            <PreferenceToggleItem
              icon={Star}
              title="协同过滤"
              description="基于相似用户的偏好"
              enabled={recommendations.collaborative}
              onToggle={() => toggleRecommendation('collaborative')}
            />
            <PreferenceToggleItem
              icon={TrendingUp}
              title="热门趋势"
              description="当前流行和热销的产品"
              enabled={recommendations.trending}
              onToggle={() => toggleRecommendation('trending')}
            />
            <PreferenceToggleItem
              icon={Award}
              title="专家推荐"
              description="由健康顾问推荐的产品"
              enabled={recommendations.expert}
              onToggle={() => toggleRecommendation('expert')}
              recommended
            />
          </div>
        </section>

        {/* 配送偏好 */}
        <section className="bg-white rounded-2xl shadow-sm border border-border">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <Truck className="w-6 h-6 text-[#0056b3]" />
              <div>
                <h2 className="text-xl font-bold text-text-primary">配送偏好</h2>
                <p className="text-sm text-text-secondary mt-1">
                  设置默认的配送选项
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-border">
            <DeliveryOptionItem
              icon={MapPin}
              title="默认地址"
              value={delivery.defaultAddress}
              onClick={() => navigate('/profile/address')}
            />
            
            {/* 配送时间偏好 */}
            <div className="p-5 hover:bg-bg-secondary transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary mb-1">配送时间</h3>
                  <p className="text-sm text-text-secondary mb-4">
                    选择您希望的配送时间段
                  </p>
                  <div className="space-y-2">
                    {[
                      { id: 'anytime', label: '不限（最快送达）' },
                      { id: 'morning', label: '上午（9:00-12:00）' },
                      { id: 'afternoon', label: '下午（14:00-18:00）' },
                      { id: 'evening', label: '晚上（18:00-21:00）' }
                    ].map((option) => (
                      <label
                        key={option.id}
                        className="flex items-center gap-3 p-3 bg-bg-secondary rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                      >
                        <input
                          type="radio"
                          name="deliveryTime"
                          value={option.id}
                          checked={delivery.preferredTime === option.id}
                          onChange={(e) => setDelivery(prev => ({ ...prev, preferredTime: e.target.value }))}
                          className="w-4 h-4 text-[#0056b3] focus:ring-[#0056b3]"
                        />
                        <span className="text-sm text-text-primary">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 联系方式 */}
            <div className="p-5 hover:bg-bg-secondary transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary mb-1">联系方式</h3>
                  <p className="text-sm text-text-secondary mb-4">
                    配送员联系您的首选方式
                  </p>
                  <div className="flex gap-3">
                    {[
                      { id: 'phone', label: '电话', icon: Smartphone },
                      { id: 'sms', label: '短信', icon: MessageSquare }
                    ].map((option) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.id}
                          onClick={() => setDelivery(prev => ({ ...prev, contactMethod: option.id }))}
                          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                            delivery.contactMethod === option.id
                              ? 'bg-[#0056b3] text-white shadow-md'
                              : 'bg-bg-secondary text-text-secondary border border-border hover:border-[#0056b3]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <PreferenceToggleItem
              icon={Package}
              title="谨慎包装"
              description="使用无标识的普通包装箱"
              enabled={delivery.discreetPackaging}
              onToggle={() => setDelivery(prev => ({ ...prev, discreetPackaging: !prev.discreetPackaging }))}
              recommended
            />
          </div>
        </section>
      </div>
    </div>
  );
}

// 导入必要的图标
import { User, Award, MapPin, Clock } from 'lucide-react';

function NotificationItem({
  icon: Icon,
  title,
  description,
  enabled,
  onToggle,
  channels,
  required = false
}: {
  icon: any;
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  channels: string[];
  required?: boolean;
}) {
  return (
    <div className="p-5 hover:bg-bg-secondary transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-[#0056b3]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-text-primary">{title}</h3>
              {required && (
                <span className="px-2 py-0.5 bg-red-100 text-error text-xs rounded-full font-medium">
                  必需
                </span>
              )}
            </div>
            <p className="text-sm text-text-secondary">{description}</p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer ml-4">
          <input 
            type="checkbox" 
            className="sr-only peer" 
            checked={enabled}
            onChange={onToggle}
            disabled={required}
          />
          <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0056b3] ${
            required ? 'opacity-50 cursor-not-allowed' : ''
          }`}></div>
        </label>
      </div>
      {enabled && (
        <div className="ml-14 flex gap-2">
          {channels.map((channel) => (
            <span key={channel} className="px-2 py-1 bg-blue-100 text-[#0056b3] text-xs rounded-full font-medium">
              {channel}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function PreferenceToggleItem({
  icon: Icon,
  title,
  description,
  enabled,
  onToggle,
  recommended = false
}: {
  icon: any;
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  recommended?: boolean;
}) {
  return (
    <div className="p-5 flex items-center justify-between hover:bg-bg-secondary transition-colors">
      <div className="flex items-start gap-4 flex-1">
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-text-tertiary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-text-primary">{title}</h3>
            {recommended && (
              <span className="px-2 py-0.5 bg-green-100 text-success text-xs rounded-full font-medium">
                推荐
              </span>
            )}
          </div>
          <p className="text-sm text-text-secondary">{description}</p>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer ml-4">
        <input 
          type="checkbox" 
          className="sr-only peer" 
          checked={enabled}
          onChange={onToggle}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0056b3]"></div>
      </label>
    </div>
  );
}

function DeliveryOptionItem({
  icon: Icon,
  title,
  value,
  onClick
}: {
  icon: any;
  title: string;
  value: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full p-5 flex items-center gap-4 hover:bg-bg-secondary transition-colors group"
    >
      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
        <Icon className="w-5 h-5 text-text-tertiary" />
      </div>
      <div className="flex-1 text-left">
        <h3 className="font-semibold text-text-primary mb-1">{title}</h3>
        <p className="text-sm text-text-secondary">{value}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:text-[#0056b3] transition-colors" />
    </button>
  );
}
