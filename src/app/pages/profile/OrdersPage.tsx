import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  XCircle,
  ChevronLeft,
  RotateCcw,
  Eye,
  Lock,
  AlertCircle
} from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  itemCount: number;
  total: string;
  trackingNumber?: string;
}

export function OrdersPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | Order['status']>('all');
  const [showVerification, setShowVerification] = useState<string | null>(null);

  const orders: Order[] = [
    {
      id: '1',
      orderNumber: 'HL2026012601',
      date: '2026-01-26',
      status: 'delivered',
      itemCount: 2,
      total: '¥598',
      trackingNumber: 'SF1234567890'
    },
    {
      id: '2',
      orderNumber: 'HL2026012402',
      date: '2026-01-24',
      status: 'shipped',
      itemCount: 1,
      total: '¥299',
      trackingNumber: 'YT9876543210'
    },
    {
      id: '3',
      orderNumber: 'HL2026012203',
      date: '2026-01-22',
      status: 'processing',
      itemCount: 3,
      total: '¥897'
    },
    {
      id: '4',
      orderNumber: 'HL2026011804',
      date: '2026-01-18',
      status: 'delivered',
      itemCount: 1,
      total: '¥399'
    },
    {
      id: '5',
      orderNumber: 'HL2026011505',
      date: '2026-01-15',
      status: 'cancelled',
      itemCount: 2,
      total: '¥699'
    }
  ];

  const statusConfig = {
    pending: {
      label: '待支付',
      icon: Clock,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
      border: 'border-yellow-300'
    },
    processing: {
      label: '处理中',
      icon: Package,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      border: 'border-blue-300'
    },
    shipped: {
      label: '已发货',
      icon: Truck,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
      border: 'border-purple-300'
    },
    delivered: {
      label: '已完成',
      icon: CheckCircle,
      color: 'text-success',
      bg: 'bg-green-100',
      border: 'border-green-300'
    },
    cancelled: {
      label: '已取消',
      icon: XCircle,
      color: 'text-error',
      bg: 'bg-red-100',
      border: 'border-red-300'
    }
  };

  const filters = [
    { id: 'all', label: '全部订单' },
    { id: 'processing', label: '进行中' },
    { id: 'shipped', label: '已发货' },
    { id: 'delivered', label: '已完成' }
  ];

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const handleViewDetails = (orderId: string) => {
    setShowVerification(orderId);
  };

  const handleReorder = (orderId: string) => {
    alert(`重新购买订单 ${orderId} 中的商品`);
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
            <h1 className="text-lg font-semibold text-text-primary">订单管理</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* 隐私提示 */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-[#0056b3] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-text-primary mb-1">隐私保护</h3>
              <p className="text-sm text-text-secondary">
                为保护您的隐私，订单列表不显示具体商品名称。查看订单详情需要额外验证。
              </p>
            </div>
          </div>
        </div>

        {/* 筛选器 */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                filter === f.id
                  ? 'bg-[#0056b3] text-white shadow-md'
                  : 'bg-white text-text-secondary border border-border hover:border-[#0056b3]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* 订单列表 */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center">
              <Package className="w-16 h-16 text-text-tertiary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">暂无订单</h3>
              <p className="text-text-secondary mb-6">该分类下暂时没有订单</p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-[#0056b3] text-white rounded-xl hover:bg-[#004494] transition-colors font-medium"
              >
                开始购物
              </button>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const config = statusConfig[order.status];
              const Icon = config.icon;
              
              return (
                <div
                  key={order.id}
                  className={`bg-white rounded-2xl p-6 shadow-sm border-2 ${config.border} hover:shadow-md transition-all`}
                >
                  {/* 订单头部 */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-mono text-text-tertiary">
                          {order.orderNumber}
                        </span>
                        <div className={`px-3 py-1 ${config.bg} ${config.color} rounded-full text-xs font-semibold flex items-center gap-1`}>
                          <Icon className="w-3 h-3" />
                          <span>{config.label}</span>
                        </div>
                      </div>
                      <p className="text-xs text-text-tertiary">
                        下单时间：{new Date(order.date).toLocaleDateString('zh-CN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#0056b3]">{order.total}</div>
                      <div className="text-xs text-text-tertiary">{order.itemCount} 件商品</div>
                    </div>
                  </div>

                  {/* 订单内容（模糊显示） */}
                  <div className="mb-4 p-4 bg-bg-secondary rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="w-4 h-4 text-text-tertiary" />
                      <span className="text-sm font-medium text-text-secondary">
                        订单内容（隐私保护）
                      </span>
                    </div>
                    <div className="space-y-1">
                      {Array.from({ length: order.itemCount }).map((_, idx) => (
                        <div key={idx} className="text-sm text-text-tertiary blur-sm select-none">
                          商品 {idx + 1}: ********** × 1
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 物流信息 */}
                  {order.trackingNumber && (
                    <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-purple-600" />
                          <span className="text-sm text-text-secondary">物流单号:</span>
                          <span className="text-sm font-mono font-semibold text-text-primary">
                            {order.trackingNumber}
                          </span>
                        </div>
                        <button className="text-xs text-purple-600 hover:text-purple-700 font-medium">
                          查看物流
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 操作按钮 */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleViewDetails(order.id)}
                      className="flex-1 py-3 px-4 bg-bg-secondary border border-border hover:border-[#0056b3] text-text-primary rounded-xl transition-all font-medium flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>查看详情</span>
                    </button>
                    {(order.status === 'delivered' || order.status === 'cancelled') && (
                      <button
                        onClick={() => handleReorder(order.id)}
                        className="flex-1 py-3 px-4 bg-[#0056b3] text-white rounded-xl hover:bg-[#004494] transition-all font-medium flex items-center justify-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>再次购买</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* 验证对话框 */}
        {showVerification && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-[#0056b3]" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">安全验证</h3>
                <p className="text-text-secondary">
                  为了保护您的隐私，查看订单详情需要验证您的身份
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <button className="w-full py-3 px-4 bg-[#0056b3] text-white rounded-xl hover:bg-[#004494] transition-colors font-medium">
                  使用生物识别验证
                </button>
                <button className="w-full py-3 px-4 bg-bg-secondary text-text-primary rounded-xl hover:bg-gray-300 transition-colors font-medium">
                  输入密码验证
                </button>
              </div>

              <button
                onClick={() => setShowVerification(null)}
                className="w-full py-3 px-4 text-text-secondary hover:text-text-primary transition-colors font-medium"
              >
                取消
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
