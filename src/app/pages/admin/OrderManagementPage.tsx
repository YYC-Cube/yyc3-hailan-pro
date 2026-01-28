import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft,
  ShoppingCart,
  Search,
  Filter,
  Eye,
  Truck,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  Package,
  Lock,
  Phone,
  Mail,
  Download,
  RefreshCw
} from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  items: number;
  total: number;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'abnormal';
  paymentMethod: string;
  logistics?: {
    company: string;
    trackingNumber: string;
    status: string;
  };
  privacyLevel: 'high' | 'medium' | 'low';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export function OrderManagementPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const orders: Order[] = [
    {
      id: '1',
      orderNumber: 'HL2026012601',
      customer: {
        name: '张**',
        phone: '138****5678',
        email: 'zh***@example.com'
      },
      items: 2,
      total: 698,
      status: 'shipped',
      paymentMethod: '微信支付',
      logistics: {
        company: '顺丰速运',
        trackingNumber: 'SF1234567890',
        status: '运输中'
      },
      privacyLevel: 'high',
      createdAt: '2026-01-26 10:30',
      updatedAt: '2026-01-26 14:20'
    },
    {
      id: '2',
      orderNumber: 'HL2026012602',
      customer: {
        name: '李**',
        phone: '139****1234',
        email: 'li***@example.com'
      },
      items: 1,
      total: 299,
      status: 'processing',
      paymentMethod: '支付宝',
      privacyLevel: 'medium',
      createdAt: '2026-01-26 11:45',
      updatedAt: '2026-01-26 12:00'
    },
    {
      id: '3',
      orderNumber: 'HL2026012603',
      customer: {
        name: '王**',
        phone: '136****9876',
        email: 'wa***@example.com'
      },
      items: 3,
      total: 1247,
      status: 'abnormal',
      paymentMethod: '微信支付',
      privacyLevel: 'high',
      notes: '客户投诉：包装隐私保护不足',
      createdAt: '2026-01-26 09:15',
      updatedAt: '2026-01-26 15:30'
    },
    {
      id: '4',
      orderNumber: 'HL2026012604',
      customer: {
        name: '赵**',
        phone: '137****5432',
        email: 'zh***@example.com'
      },
      items: 1,
      total: 599,
      status: 'paid',
      paymentMethod: '信用卡',
      privacyLevel: 'high',
      createdAt: '2026-01-26 13:00',
      updatedAt: '2026-01-26 13:00'
    },
    {
      id: '5',
      orderNumber: 'HL2026012605',
      customer: {
        name: '陈**',
        phone: '135****7890',
        email: 'ch***@example.com'
      },
      items: 2,
      total: 458,
      status: 'delivered',
      paymentMethod: '支付宝',
      logistics: {
        company: '圆通速递',
        trackingNumber: 'YT9876543210',
        status: '已签收'
      },
      privacyLevel: 'medium',
      createdAt: '2026-01-24 14:20',
      updatedAt: '2026-01-25 16:30'
    }
  ];

  const statusConfig = {
    'pending': { label: '待支付', icon: Clock, color: 'yellow' },
    'paid': { label: '已支付', icon: CheckCircle, color: 'blue' },
    'processing': { label: '处理中', icon: Package, color: 'blue' },
    'shipped': { label: '已发货', icon: Truck, color: 'purple' },
    'delivered': { label: '已完成', icon: CheckCircle, color: 'green' },
    'cancelled': { label: '已取消', icon: XCircle, color: 'gray' },
    'abnormal': { label: '异常', icon: AlertTriangle, color: 'red' }
  };

  const privacyLevelConfig = {
    'high': { label: '高', color: 'text-error' },
    'medium': { label: '中', color: 'text-yellow-600' },
    'low': { label: '低', color: 'text-success' }
  };

  const filteredOrders = orders
    .filter(o => selectedStatus === 'all' || o.status === selectedStatus)
    .filter(o => 
      searchQuery === '' || 
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.phone.includes(searchQuery)
    );

  const handleViewDetail = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    alert(`更新订单 ${orderId} 状态为: ${newStatus}`);
  };

  const handleContactCustomer = (order: Order, method: 'phone' | 'email') => {
    if (method === 'phone') {
      alert(`拨打客户电话: ${order.customer.phone}`);
    } else {
      alert(`发送邮件到: ${order.customer.email}`);
    }
  };

  const handleUpdateLogistics = (orderId: string) => {
    alert(`更新订单 ${orderId} 的物流信息`);
  };

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 bg-white border-b border-border shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin')}
                className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-text-primary" />
              </button>
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-6 h-6 text-[#0056b3]" />
                <div>
                  <h1 className="text-xl font-bold text-text-primary">订单管理</h1>
                  <p className="text-xs text-text-secondary">全流程管控 · 联动物流/客服</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => alert('导出订单数据')}
                className="px-4 py-2 bg-bg-secondary text-text-primary rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>导出</span>
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-[#0056b3] text-white rounded-lg hover:bg-[#004494] transition-colors font-medium flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>刷新</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 py-8 space-y-6">
        {/* 统计卡片 */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {Object.entries(statusConfig).map(([status, config]) => {
            const Icon = config.icon;
            const count = orders.filter(o => o.status === status).length;
            
            return (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`bg-white rounded-xl p-4 shadow-sm border-2 transition-all ${
                  selectedStatus === status
                    ? 'border-[#0056b3] shadow-md'
                    : 'border-border hover:border-gray-300'
                }`}
              >
                <Icon className={`w-6 h-6 mb-2 ${
                  config.color === 'green' ? 'text-success' :
                  config.color === 'blue' ? 'text-[#0056b3]' :
                  config.color === 'purple' ? 'text-purple-600' :
                  config.color === 'yellow' ? 'text-yellow-600' :
                  config.color === 'red' ? 'text-error' :
                  'text-text-tertiary'
                }`} />
                <div className="text-2xl font-bold text-text-primary mb-1">{count}</div>
                <div className="text-xs text-text-secondary">{config.label}</div>
              </button>
            );
          })}
        </div>

        {/* 搜索和筛选 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
          <div className="flex gap-4">
            {/* 搜索框 */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                <input
                  type="text"
                  placeholder="搜索订单号、客户姓名或电话..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors"
                />
              </div>
            </div>

            {/* 状态筛选 */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors min-w-[150px]"
            >
              <option value="all">全部订单</option>
              {Object.entries(statusConfig).map(([status, config]) => (
                <option key={status} value={status}>{config.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 订单列表 */}
        <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
          {/* 表头 */}
          <div className="bg-bg-secondary px-6 py-4 border-b border-border">
            <div className="grid grid-cols-12 gap-4 items-center font-semibold text-sm text-text-primary">
              <div className="col-span-2">订单信息</div>
              <div className="col-span-2">客户信息</div>
              <div className="col-span-1 text-center">商品数</div>
              <div className="col-span-1 text-center">金额</div>
              <div className="col-span-1 text-center">状态</div>
              <div className="col-span-1 text-center">隐私级别</div>
              <div className="col-span-2">物流信息</div>
              <div className="col-span-1 text-center">创建时间</div>
              <div className="col-span-1 text-center">操作</div>
            </div>
          </div>

          {/* 订单列表 */}
          <div className="divide-y divide-border">
            {filteredOrders.length === 0 ? (
              <div className="p-12 text-center">
                <ShoppingCart className="w-16 h-16 text-text-tertiary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">暂无订单</h3>
                <p className="text-text-secondary">
                  {searchQuery ? '没有找到相关订单' : '该状态下暂时没有订单'}
                </p>
              </div>
            ) : (
              filteredOrders.map((order) => {
                const StatusIcon = statusConfig[order.status].icon;
                const statusColor = statusConfig[order.status].color;
                
                return (
                  <div 
                    key={order.id} 
                    className={`px-6 py-4 hover:bg-bg-secondary transition-colors ${
                      order.status === 'abnormal' ? 'bg-red-50' : ''
                    }`}
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* 订单信息 */}
                      <div className="col-span-2">
                        <div className="font-mono text-sm font-semibold text-text-primary mb-1">
                          {order.orderNumber}
                        </div>
                        <div className="text-xs text-text-tertiary">
                          {order.paymentMethod}
                        </div>
                      </div>

                      {/* 客户信息 */}
                      <div className="col-span-2">
                        <div className="flex items-center gap-2 mb-1">
                          <Lock className="w-3 h-3 text-text-tertiary" />
                          <span className="text-sm font-medium text-text-primary">
                            {order.customer.name}
                          </span>
                        </div>
                        <div className="text-xs text-text-tertiary blur-sm select-none">
                          {order.customer.phone}
                        </div>
                      </div>

                      {/* 商品数 */}
                      <div className="col-span-1 text-center">
                        <span className="font-semibold text-text-primary">
                          {order.items}
                        </span>
                      </div>

                      {/* 金额 */}
                      <div className="col-span-1 text-center">
                        <span className="font-bold text-[#0056b3]">
                          ¥{order.total}
                        </span>
                      </div>

                      {/* 状态 */}
                      <div className="col-span-1 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <StatusIcon className={`w-4 h-4 ${
                            statusColor === 'green' ? 'text-success' :
                            statusColor === 'blue' ? 'text-[#0056b3]' :
                            statusColor === 'purple' ? 'text-purple-600' :
                            statusColor === 'yellow' ? 'text-yellow-600' :
                            statusColor === 'red' ? 'text-error' :
                            'text-text-tertiary'
                          }`} />
                          <span className="text-xs font-medium text-text-secondary">
                            {statusConfig[order.status].label}
                          </span>
                        </div>
                      </div>

                      {/* 隐私级别 */}
                      <div className="col-span-1 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.privacyLevel === 'high' ? 'bg-red-100 text-error' :
                          order.privacyLevel === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-green-100 text-success'
                        }`}>
                          {privacyLevelConfig[order.privacyLevel].label}
                        </span>
                      </div>

                      {/* 物流信息 */}
                      <div className="col-span-2">
                        {order.logistics ? (
                          <div className="text-xs">
                            <div className="font-medium text-text-primary mb-1">
                              {order.logistics.company}
                            </div>
                            <div className="text-text-tertiary font-mono">
                              {order.logistics.trackingNumber}
                            </div>
                            <div className="text-purple-600 mt-1">
                              {order.logistics.status}
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-text-tertiary">暂无物流</span>
                        )}
                      </div>

                      {/* 创建时间 */}
                      <div className="col-span-1 text-center text-xs text-text-tertiary">
                        {new Date(order.createdAt).toLocaleString('zh-CN', {
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>

                      {/* 操作 */}
                      <div className="col-span-1 text-center">
                        <button
                          onClick={() => handleViewDetail(order)}
                          className="px-3 py-1 bg-[#0056b3] text-white rounded-lg hover:bg-[#004494] transition-colors text-xs font-medium"
                        >
                          查看详情
                        </button>
                      </div>
                    </div>

                    {/* 异常订单备注 */}
                    {order.notes && (
                      <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-text-secondary">{order.notes}</div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* 订单详情模态框 */}
        {showDetailModal && selectedOrder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-border p-6 z-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-text-primary">订单详情</h2>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
                  >
                    <XCircle className="w-6 h-6 text-text-tertiary" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* 订单基本信息 */}
                <section className="bg-bg-secondary rounded-xl p-6">
                  <h3 className="font-bold text-text-primary mb-4">基本信息</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-text-secondary mb-1">订单号</div>
                      <div className="font-mono font-semibold text-text-primary">
                        {selectedOrder.orderNumber}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-text-secondary mb-1">订单状态</div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          selectedOrder.status === 'delivered' ? 'bg-green-100 text-success' :
                          selectedOrder.status === 'abnormal' ? 'bg-red-100 text-error' :
                          'bg-blue-100 text-[#0056b3]'
                        }`}>
                          {statusConfig[selectedOrder.status].label}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-text-secondary mb-1">订单金额</div>
                      <div className="text-2xl font-bold text-[#0056b3]">
                        ¥{selectedOrder.total}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-text-secondary mb-1">隐私级别</div>
                      <div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          selectedOrder.privacyLevel === 'high' ? 'bg-red-100 text-error' :
                          selectedOrder.privacyLevel === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-green-100 text-success'
                        }`}>
                          {privacyLevelConfig[selectedOrder.privacyLevel].label}级隐私保护
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 客户信息 */}
                <section className="bg-bg-secondary rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-text-primary">客户信息</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleContactCustomer(selectedOrder, 'phone')}
                        className="px-3 py-1 bg-[#0056b3] text-white rounded-lg hover:bg-[#004494] transition-colors text-sm flex items-center gap-2"
                      >
                        <Phone className="w-4 h-4" />
                        <span>电话联系</span>
                      </button>
                      <button
                        onClick={() => handleContactCustomer(selectedOrder, 'email')}
                        className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm flex items-center gap-2"
                      >
                        <Mail className="w-4 h-4" />
                        <span>邮件联系</span>
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-text-secondary mb-1">客户姓名</div>
                      <div className="font-medium text-text-primary">{selectedOrder.customer.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-text-secondary mb-1">联系电话</div>
                      <div className="font-medium text-text-primary blur-sm">{selectedOrder.customer.phone}</div>
                    </div>
                    <div>
                      <div className="text-sm text-text-secondary mb-1">电子邮箱</div>
                      <div className="font-medium text-text-primary blur-sm">{selectedOrder.customer.email}</div>
                    </div>
                  </div>
                </section>

                {/* 物流信息 */}
                {selectedOrder.logistics && (
                  <section className="bg-bg-secondary rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-text-primary">物流信息</h3>
                      <button
                        onClick={() => handleUpdateLogistics(selectedOrder.id)}
                        className="px-3 py-1 bg-success text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                      >
                        更新物流
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-text-secondary mb-1">物流公司</div>
                        <div className="font-medium text-text-primary">{selectedOrder.logistics.company}</div>
                      </div>
                      <div>
                        <div className="text-sm text-text-secondary mb-1">物流单号</div>
                        <div className="font-mono font-medium text-text-primary">{selectedOrder.logistics.trackingNumber}</div>
                      </div>
                      <div>
                        <div className="text-sm text-text-secondary mb-1">物流状态</div>
                        <div className="font-medium text-purple-600">{selectedOrder.logistics.status}</div>
                      </div>
                    </div>
                  </section>
                )}

                {/* 操作按钮 */}
                <div className="flex gap-3">
                  <button
                    onClick={() => alert('处理订单')}
                    className="flex-1 py-3 bg-[#0056b3] text-white rounded-xl hover:bg-[#004494] transition-colors font-medium"
                  >
                    处理订单
                  </button>
                  <button
                    onClick={() => navigate(`/admin/orders/${selectedOrder.id}/service`)}
                    className="flex-1 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>联系客服</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
