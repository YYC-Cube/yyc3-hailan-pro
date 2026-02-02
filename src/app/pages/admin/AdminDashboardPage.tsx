import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { 
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  Package,
  AlertTriangle,
  Bell,
  Eye,
  Shield,
  Lock,
  RefreshCw,
  ChevronRight,
  DollarSign,
  BarChart3,
  Activity
} from 'lucide-react';

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // 模拟数据自动刷新
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000); // 每30秒刷新

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLastUpdate(new Date());
    }, 1000);
  };

  // 核心经营指标
  const coreMetrics = [
    {
      id: 'uv',
      label: '独立访客(UV)',
      value: '12,458',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'blue',
      detail: '较昨日'
    },
    {
      id: 'conversion',
      label: '转化率',
      value: '3.8%',
      change: '+0.5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'green',
      detail: '访客-下单'
    },
    {
      id: 'sales',
      label: '今日销售额',
      value: '¥45,680',
      change: '+18.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'purple',
      detail: '较昨日'
    },
    {
      id: 'orders',
      label: '订单数',
      value: '286',
      change: '-2.3%',
      trend: 'down',
      icon: ShoppingCart,
      color: 'orange',
      detail: '较昨日'
    }
  ];

  // 隐私保护指标
  const privacyMetrics = [
    {
      id: 'privacy-usage',
      label: '隐私设置使用率',
      value: '87.5%',
      status: 'normal',
      icon: Shield,
      color: 'green'
    },
    {
      id: 'data-desensitization',
      label: '数据脱敏统计',
      value: '2,458条',
      status: 'normal',
      icon: Eye,
      color: 'blue'
    },
    {
      id: 'encrypted-orders',
      label: '加密订单比例',
      value: '92.3%',
      status: 'normal',
      icon: Lock,
      color: 'purple'
    }
  ];

  // 实时监控数据
  const realtimeMonitoring = {
    orders: {
      pending: 23,
      processing: 45,
      shipped: 128,
      abnormal: 3
    },
    inventory: {
      lowStock: 12,
      outOfStock: 3,
      normal: 156
    },
    feedback: {
      negative: 5,
      neutral: 18,
      positive: 142
    }
  };

  // 智能提醒
  const alerts = [
    {
      id: '1',
      type: 'inventory',
      severity: 'high',
      title: '库存不足预警',
      message: '商品「智能产品A」库存仅剩5件',
      time: '5分钟前',
      action: '/admin/products'
    },
    {
      id: '2',
      type: 'order',
      severity: 'high',
      title: '异常订单',
      message: '订单#HL2026012601 存在隐私投诉',
      time: '10分钟前',
      action: '/admin/orders'
    },
    {
      id: '3',
      type: 'content',
      severity: 'medium',
      title: '待审核内容',
      message: '3条社区内容待审核',
      time: '15分钟前',
      action: '/admin/content'
    },
    {
      id: '4',
      type: 'commission',
      severity: 'low',
      title: '佣金结算提醒',
      message: '本月分销佣金待结算：¥12,580',
      time: '1小时前',
      action: '/admin/commission'
    }
  ];

  const colorMap: Record<string, { bg: string; text: string; icon: string }> = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', icon: 'text-blue-600' },
    green: { bg: 'bg-green-100', text: 'text-success', icon: 'text-success' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', icon: 'text-purple-600' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600', icon: 'text-orange-600' },
    red: { bg: 'bg-red-100', text: 'text-error', icon: 'text-error' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', icon: 'text-yellow-600' }
  };

  const severityMap = {
    high: { color: 'red', label: '高' },
    medium: { color: 'yellow', label: '中' },
    low: { color: 'blue', label: '低' }
  };

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 bg-white border-b border-border shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0056b3] to-[#6B46C1] rounded-xl flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-text-primary">管理后台</h1>
                <p className="text-xs text-text-secondary">数据中枢 · 智能预警</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-medium text-text-primary">管理员</div>
                <div className="text-xs text-text-secondary">
                  上次更新: {lastUpdate.toLocaleTimeString('zh-CN')}
                </div>
              </div>
              <button
                onClick={handleRefresh}
                className={`p-2 hover:bg-bg-secondary rounded-lg transition-all ${
                  refreshing ? 'animate-spin' : ''
                }`}
              >
                <RefreshCw className="w-5 h-5 text-text-tertiary" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 py-8 space-y-8">
        {/* 核心经营指标 */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text-primary">核心经营指标</h2>
            <button className="text-sm text-[#0056b3] hover:text-[#004494] font-medium flex items-center gap-1">
              <span>查看详细分析</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreMetrics.map((metric) => {
              const Icon = metric.icon;
              const colors = colorMap[metric.color];
              
              return (
                <div
                  key={metric.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 ${colors.icon}`} />
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                      metric.trend === 'up' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {metric.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-error" />
                      )}
                      <span className={`text-xs font-semibold ${
                        metric.trend === 'up' ? 'text-success' : 'text-error'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>

                  <div className="mb-1">
                    <div className="text-3xl font-bold text-text-primary mb-1">
                      {metric.value}
                    </div>
                    <div className="text-sm text-text-secondary">{metric.label}</div>
                  </div>

                  <div className="text-xs text-text-tertiary">{metric.detail}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 隐私保护指标 */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-[#0056b3]" />
            <h2 className="text-2xl font-bold text-text-primary">隐私保护指标</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {privacyMetrics.map((metric) => {
              const Icon = metric.icon;
              const colors = colorMap[metric.color];
              
              return (
                <div
                  key={metric.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-border"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-7 h-7 ${colors.icon}`} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-text-secondary mb-1">{metric.label}</div>
                      <div className="text-2xl font-bold text-text-primary">{metric.value}</div>
                    </div>
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 实时监控面板 */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-[#0056b3]" />
            <h2 className="text-2xl font-bold text-text-primary">实时监控面板</h2>
            <span className="px-3 py-1 bg-green-100 text-success text-xs rounded-full font-semibold">
              实时更新
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 订单监控 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-text-primary">订单监控</h3>
                <button
                  onClick={() => navigate('/admin/orders')}
                  className="text-sm text-[#0056b3] hover:text-[#004494] font-medium"
                >
                  查看全部
                </button>
              </div>

              <div className="space-y-3">
                <MonitorItem
                  label="待支付"
                  value={realtimeMonitoring.orders.pending}
                  color="yellow"
                  onClick={() => navigate('/admin/orders?status=pending')}
                />
                <MonitorItem
                  label="处理中"
                  value={realtimeMonitoring.orders.processing}
                  color="blue"
                  onClick={() => navigate('/admin/orders?status=processing')}
                />
                <MonitorItem
                  label="已发货"
                  value={realtimeMonitoring.orders.shipped}
                  color="green"
                  onClick={() => navigate('/admin/orders?status=shipped')}
                />
                {realtimeMonitoring.orders.abnormal > 0 && (
                  <MonitorItem
                    label="异常订单"
                    value={realtimeMonitoring.orders.abnormal}
                    color="red"
                    highlight
                    onClick={() => navigate('/admin/orders?status=abnormal')}
                  />
                )}
              </div>
            </div>

            {/* 库存监控 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-text-primary">库存监控</h3>
                <button
                  onClick={() => navigate('/admin/inventory')}
                  className="text-sm text-[#0056b3] hover:text-[#004494] font-medium"
                >
                  查看全部
                </button>
              </div>

              <div className="space-y-3">
                {realtimeMonitoring.inventory.outOfStock > 0 && (
                  <MonitorItem
                    label="缺货商品"
                    value={realtimeMonitoring.inventory.outOfStock}
                    color="red"
                    highlight
                    onClick={() => navigate('/admin/inventory?status=out-of-stock')}
                  />
                )}
                {realtimeMonitoring.inventory.lowStock > 0 && (
                  <MonitorItem
                    label="低库存商品"
                    value={realtimeMonitoring.inventory.lowStock}
                    color="yellow"
                    onClick={() => navigate('/admin/inventory?status=low-stock')}
                  />
                )}
                <MonitorItem
                  label="正常商品"
                  value={realtimeMonitoring.inventory.normal}
                  color="green"
                  onClick={() => navigate('/admin/inventory?status=normal')}
                />
              </div>
            </div>

            {/* 用户反馈监控 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-text-primary">用户反馈</h3>
                <button
                  onClick={() => navigate('/admin/feedback')}
                  className="text-sm text-[#0056b3] hover:text-[#004494] font-medium"
                >
                  查看全部
                </button>
              </div>

              <div className="space-y-3">
                {realtimeMonitoring.feedback.negative > 0 && (
                  <MonitorItem
                    label="负面评价"
                    value={realtimeMonitoring.feedback.negative}
                    color="red"
                    highlight
                    onClick={() => navigate('/admin/feedback?type=negative')}
                  />
                )}
                <MonitorItem
                  label="中性评价"
                  value={realtimeMonitoring.feedback.neutral}
                  color="yellow"
                  onClick={() => navigate('/admin/feedback?type=neutral')}
                />
                <MonitorItem
                  label="正面评价"
                  value={realtimeMonitoring.feedback.positive}
                  color="green"
                  onClick={() => navigate('/admin/feedback?type=positive')}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 智能提醒中心 */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-[#0056b3]" />
            <h2 className="text-2xl font-bold text-text-primary">智能提醒中心</h2>
            <span className="px-3 py-1 bg-red-100 text-error text-xs rounded-full font-semibold">
              {alerts.filter(a => a.severity === 'high').length} 个高优先级
            </span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-border divide-y divide-border">
            {alerts.map((alert) => {
              const severity = severityMap[alert.severity];
              const severityColors = colorMap[severity.color];
              
              return (
                <div
                  key={alert.id}
                  className="p-5 hover:bg-bg-secondary transition-colors cursor-pointer group"
                  onClick={() => navigate(alert.action)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 ${severityColors.bg} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <AlertTriangle className={`w-5 h-5 ${severityColors.icon}`} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-text-primary group-hover:text-[#0056b3] transition-colors">
                          {alert.title}
                        </h3>
                        <span className={`px-2 py-0.5 ${severityColors.bg} ${severityColors.text} text-xs rounded-full font-semibold`}>
                          {severity.label}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary mb-2">{alert.message}</p>
                      <div className="text-xs text-text-tertiary">{alert.time}</div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:text-[#0056b3] transition-colors flex-shrink-0" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 text-center">
            <button className="text-sm text-[#0056b3] hover:text-[#004494] font-medium">
              查看所有提醒
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function MonitorItem({ 
  label, 
  value, 
  color, 
  highlight = false,
  onClick 
}: { 
  label: string; 
  value: number; 
  color: string; 
  highlight?: boolean;
  onClick?: () => void;
}) {
  const colorMap: Record<string, { bg: string; text: string }> = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    green: { bg: 'bg-green-100', text: 'text-success' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
    red: { bg: 'bg-red-100', text: 'text-error' }
  };

  const colors = colorMap[color];

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
        highlight 
          ? `${colors.bg} border-2 ${colors.text.replace('text-', 'border-')}` 
          : 'bg-bg-secondary hover:bg-gray-200'
      }`}
    >
      <span className="text-sm font-medium text-text-primary">{label}</span>
      <span className={`text-lg font-bold ${highlight ? colors.text : 'text-text-primary'}`}>
        {value}
      </span>
    </button>
  );
}
