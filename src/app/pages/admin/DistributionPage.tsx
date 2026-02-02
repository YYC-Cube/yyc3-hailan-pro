import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ChevronLeft,
  Users,
  Package,
  DollarSign,
  TrendingUp,
  Award,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  Download,
  Settings,
  Eye,
  Edit,
  Lock,
  Unlock,
  BarChart3,
  Sparkles
} from 'lucide-react';

interface Agent {
  id: string;
  agentId: string;
  name: string;
  phone: string;
  email: string;
  level: 'level1' | 'level2';
  status: 'active' | 'frozen' | 'pending';
  commissionRate: number;
  totalSales: number;
  totalCommission: number;
  monthSales: number;
  registeredAt: string;
}

interface DistributionProduct {
  id: string;
  productName: string;
  sku: string;
  price: number;
  level1Commission: number;
  level2Commission: number;
  distributionStatus: 'enabled' | 'disabled';
  totalSales: number;
}

interface CommissionOrder {
  id: string;
  orderNumber: string;
  agentName: string;
  productName: string;
  orderAmount: number;
  commissionAmount: number;
  commissionRate: number;
  status: 'pending' | 'completed' | 'paid';
  createdAt: string;
}

export function DistributionPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'agents' | 'products' | 'commission' | 'stats'>('agents');

  // 代理数据
  const agents: Agent[] = [
    {
      id: '1',
      agentId: 'AG2026001',
      name: '张代理',
      phone: '138****5678',
      email: 'agent***@example.com',
      level: 'level1',
      status: 'active',
      commissionRate: 15,
      totalSales: 245680,
      totalCommission: 36852,
      monthSales: 45680,
      registeredAt: '2025-06-15'
    },
    {
      id: '2',
      agentId: 'AG2026002',
      name: '李代理',
      phone: '139****1234',
      email: 'agent***@example.com',
      level: 'level2',
      status: 'active',
      commissionRate: 10,
      totalSales: 156780,
      totalCommission: 15678,
      monthSales: 28900,
      registeredAt: '2025-08-20'
    },
    {
      id: '3',
      agentId: 'AG2026003',
      name: '王代理',
      phone: '136****9876',
      email: 'agent***@example.com',
      level: 'level1',
      status: 'pending',
      commissionRate: 0,
      totalSales: 0,
      totalCommission: 0,
      monthSales: 0,
      registeredAt: '2026-01-26'
    }
  ];

  // 分销商品数据
  const products: DistributionProduct[] = [
    {
      id: '1',
      productName: '智能震动棒 Pro',
      sku: 'VIB-PRO-001',
      price: 598,
      level1Commission: 15,
      level2Commission: 10,
      distributionStatus: 'enabled',
      totalSales: 326
    },
    {
      id: '2',
      productName: '高级情趣玩具套装',
      sku: 'TOY-SET-002',
      price: 899,
      level1Commission: 20,
      level2Commission: 15,
      distributionStatus: 'enabled',
      totalSales: 158
    },
    {
      id: '3',
      productName: '水基润滑液 100ml',
      sku: 'LUB-WAT-003',
      price: 89,
      level1Commission: 10,
      level2Commission: 8,
      distributionStatus: 'disabled',
      totalSales: 892
    }
  ];

  // 佣金订单数据
  const commissionOrders: CommissionOrder[] = [
    {
      id: '1',
      orderNumber: 'HL2026012601',
      agentName: '张代理',
      productName: '智能震动棒 Pro',
      orderAmount: 598,
      commissionAmount: 89.7,
      commissionRate: 15,
      status: 'completed',
      createdAt: '2026-01-26 10:30'
    },
    {
      id: '2',
      orderNumber: 'HL2026012602',
      agentName: '李代理',
      productName: '高级情趣玩具套装',
      orderAmount: 899,
      commissionAmount: 134.85,
      commissionRate: 15,
      status: 'pending',
      createdAt: '2026-01-26 11:45'
    }
  ];

  const levelConfig = {
    level1: { label: '一级代理', color: 'purple' },
    level2: { label: '二级代理', color: 'blue' }
  };

  const statusConfig = {
    active: { label: '活跃', color: 'green', icon: CheckCircle },
    frozen: { label: '冻结', color: 'gray', icon: Lock },
    pending: { label: '待审核', color: 'yellow', icon: Clock }
  };

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 bg-white border-b border-border shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin-dashboard')}
                className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-text-primary" />
              </button>
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-[#0056b3]" />
                <div>
                  <h1 className="text-xl font-bold text-text-primary">代理分销管理</h1>
                  <p className="text-xs text-text-secondary">层级管控 · 佣金闭环</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm text-text-secondary">本月分销销售额</div>
                <div className="text-xl font-bold text-[#0056b3]">¥74,580</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 py-8 space-y-6">
        {/* 标签页 */}
        <div className="bg-white rounded-2xl shadow-sm border border-border">
          <div className="flex border-b border-border">
            {[
              { id: 'agents', label: '代理管理', icon: Users },
              { id: 'products', label: '分销商品', icon: Package },
              { id: 'commission', label: '佣金结算', icon: DollarSign },
              { id: 'stats', label: '数据统计', icon: BarChart3 }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? 'text-[#0056b3] bg-blue-50'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0056b3]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* 代理管理 */}
          {activeTab === 'agents' && (
            <div className="p-6 space-y-6">
              {/* AI推荐 */}
              <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                <div className="flex items-start gap-4">
                  <Sparkles className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-bold text-text-primary mb-2">AI高潜力代理推荐</h3>
                    <p className="text-sm text-text-secondary mb-4">
                      系统检测到「张代理」本月销售额增长45%，建议提升为一级代理并增加佣金比例
                    </p>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                      查看推荐详情
                    </button>
                  </div>
                </div>
              </div>

              {/* 操作栏 */}
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                    <input
                      type="text"
                      placeholder="搜索代理名称或ID..."
                      className="pl-10 pr-4 py-2 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors w-80"
                    />
                  </div>
                  <select className="px-4 py-2 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors">
                    <option>全部层级</option>
                    <option>一级代理</option>
                    <option>二级代理</option>
                  </select>
                  <select className="px-4 py-2 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors">
                    <option>全部状态</option>
                    <option>活跃</option>
                    <option>待审核</option>
                    <option>冻结</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-bg-secondary text-text-primary rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    <span>导出</span>
                  </button>
                  <button className="px-4 py-2 bg-bg-secondary text-text-primary rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    <span>批量调整佣金</span>
                  </button>
                </div>
              </div>

              {/* 代理列表 */}
              <div className="bg-white rounded-xl border border-border overflow-hidden">
                <div className="bg-bg-secondary px-6 py-3 border-b border-border grid grid-cols-12 gap-4 font-semibold text-sm">
                  <div className="col-span-2">代理信息</div>
                  <div className="col-span-1 text-center">层级</div>
                  <div className="col-span-1 text-center">状态</div>
                  <div className="col-span-1 text-center">佣金比例</div>
                  <div className="col-span-2 text-center">累计销售额</div>
                  <div className="col-span-2 text-center">累计佣金</div>
                  <div className="col-span-2 text-center">本月销售</div>
                  <div className="col-span-1 text-center">操作</div>
                </div>
                <div className="divide-y divide-border">
                  {agents.map((agent) => {
                    const StatusIcon = statusConfig[agent.status].icon;
                    
                    return (
                      <div key={agent.id} className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-bg-secondary transition-colors">
                        <div className="col-span-2">
                          <div className="font-semibold text-text-primary mb-1">{agent.name}</div>
                          <div className="text-xs text-text-tertiary font-mono">{agent.agentId}</div>
                          <div className="text-xs text-text-tertiary mt-1">{agent.phone}</div>
                        </div>
                        <div className="col-span-1 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            agent.level === 'level1' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                          }`}>
                            {levelConfig[agent.level].label}
                          </span>
                        </div>
                        <div className="col-span-1 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <StatusIcon className={`w-4 h-4 ${
                              statusConfig[agent.status].color === 'green' ? 'text-success' :
                              statusConfig[agent.status].color === 'yellow' ? 'text-yellow-600' :
                              'text-text-tertiary'
                            }`} />
                            <span className="text-xs font-medium text-text-secondary">
                              {statusConfig[agent.status].label}
                            </span>
                          </div>
                        </div>
                        <div className="col-span-1 text-center">
                          {agent.commissionRate > 0 ? (
                            <span className="font-bold text-[#0056b3]">{agent.commissionRate}%</span>
                          ) : (
                            <span className="text-text-tertiary">-</span>
                          )}
                        </div>
                        <div className="col-span-2 text-center font-bold text-text-primary">
                          ¥{agent.totalSales.toLocaleString()}
                        </div>
                        <div className="col-span-2 text-center font-bold text-success">
                          ¥{agent.totalCommission.toLocaleString()}
                        </div>
                        <div className="col-span-2 text-center">
                          {agent.monthSales > 0 ? (
                            <span className="font-semibold text-text-primary">
                              ¥{agent.monthSales.toLocaleString()}
                            </span>
                          ) : (
                            <span className="text-text-tertiary">-</span>
                          )}
                        </div>
                        <div className="col-span-1 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button 
                              className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                              title="查看详情"
                            >
                              <Eye className="w-4 h-4 text-[#0056b3]" />
                            </button>
                            <button 
                              className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                              title="编辑"
                            >
                              <Edit className="w-4 h-4 text-success" />
                            </button>
                            {agent.status === 'active' ? (
                              <button 
                                className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                                title="冻结"
                              >
                                <Lock className="w-4 h-4 text-error" />
                              </button>
                            ) : (
                              <button 
                                className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                                title="解冻"
                              >
                                <Unlock className="w-4 h-4 text-success" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 分销商品 */}
          {activeTab === 'products' && (
            <div className="p-6 space-y-6">
              {/* 操作栏 */}
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                    <input
                      type="text"
                      placeholder="搜索商品名称或SKU..."
                      className="pl-10 pr-4 py-2 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors w-80"
                    />
                  </div>
                  <select className="px-4 py-2 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors">
                    <option>全部状态</option>
                    <option>已启用</option>
                    <option>已禁用</option>
                  </select>
                </div>
                <button className="px-4 py-2 bg-[#0056b3] text-white rounded-lg hover:bg-[#004494] transition-colors font-medium flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span>批量设置佣金</span>
                </button>
              </div>

              {/* 商品列表 */}
              <div className="bg-white rounded-xl border border-border overflow-hidden">
                <div className="bg-bg-secondary px-6 py-3 border-b border-border grid grid-cols-12 gap-4 font-semibold text-sm">
                  <div className="col-span-3">商品信息</div>
                  <div className="col-span-2 text-center">零售价</div>
                  <div className="col-span-2 text-center">一级佣金</div>
                  <div className="col-span-2 text-center">二级佣金</div>
                  <div className="col-span-1 text-center">分销销量</div>
                  <div className="col-span-1 text-center">状态</div>
                  <div className="col-span-1 text-center">操作</div>
                </div>
                <div className="divide-y divide-border">
                  {products.map((product) => (
                    <div key={product.id} className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-bg-secondary transition-colors">
                      <div className="col-span-3">
                        <div className="font-semibold text-text-primary mb-1">{product.productName}</div>
                        <div className="text-xs text-text-tertiary font-mono">{product.sku}</div>
                      </div>
                      <div className="col-span-2 text-center font-bold text-text-primary">
                        ¥{product.price}
                      </div>
                      <div className="col-span-2 text-center">
                        <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-lg font-semibold">
                          {product.level1Commission}%
                        </span>
                      </div>
                      <div className="col-span-2 text-center">
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg font-semibold">
                          {product.level2Commission}%
                        </span>
                      </div>
                      <div className="col-span-1 text-center font-semibold text-text-primary">
                        {product.totalSales}
                      </div>
                      <div className="col-span-1 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          product.distributionStatus === 'enabled' ? 'bg-green-100 text-success' : 'bg-gray-100 text-text-tertiary'
                        }`}>
                          {product.distributionStatus === 'enabled' ? '已启用' : '已禁用'}
                        </span>
                      </div>
                      <div className="col-span-1 text-center">
                        <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-[#0056b3]" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 价格区间设置 */}
              <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-bold text-text-primary mb-2">自定义定价区间</h3>
                    <p className="text-sm text-text-secondary mb-4">
                      代理可在设定的价格区间内自定义定价，避免低价竞争。系统自动监控违规定价并预警。
                    </p>
                    <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium">
                      设置价格区间
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 佣金结算 */}
          {activeTab === 'commission' && (
            <div className="p-6 space-y-6">
              {/* 结算统计 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: '待结算佣金', value: '¥12,580', color: 'yellow', icon: Clock },
                  { label: '本月已结算', value: '¥45,680', color: 'green', icon: CheckCircle },
                  { label: '待审核提现', value: '¥8,900', color: 'blue', icon: DollarSign },
                  { label: '累计佣金', value: '¥234,560', color: 'purple', icon: Award }
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="bg-white rounded-xl p-6 border border-border">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className={`w-6 h-6 ${
                          stat.color === 'green' ? 'text-success' :
                          stat.color === 'yellow' ? 'text-yellow-600' :
                          stat.color === 'blue' ? 'text-[#0056b3]' :
                          'text-purple-600'
                        }`} />
                        <span className="text-sm text-text-secondary">{stat.label}</span>
                      </div>
                      <div className="text-3xl font-bold text-text-primary">{stat.value}</div>
                    </div>
                  );
                })}
              </div>

              {/* 操作栏 */}
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <select className="px-4 py-2 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors">
                    <option>全部状态</option>
                    <option>待结算</option>
                    <option>已完成</option>
                    <option>已支付</option>
                  </select>
                  <select className="px-4 py-2 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors">
                    <option>本月</option>
                    <option>上月</option>
                    <option>近3个月</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-bg-secondary text-text-primary rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    <span>导出结算明细</span>
                  </button>
                  <button className="px-4 py-2 bg-success text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>批量结算</span>
                  </button>
                </div>
              </div>

              {/* 佣金订单列表 */}
              <div className="bg-white rounded-xl border border-border overflow-hidden">
                <div className="bg-bg-secondary px-6 py-3 border-b border-border grid grid-cols-12 gap-4 font-semibold text-sm">
                  <div className="col-span-2">订单号</div>
                  <div className="col-span-2">代理</div>
                  <div className="col-span-2">商品</div>
                  <div className="col-span-2 text-center">订单金额</div>
                  <div className="col-span-2 text-center">佣金金额</div>
                  <div className="col-span-1 text-center">状态</div>
                  <div className="col-span-1 text-center">操作</div>
                </div>
                <div className="divide-y divide-border">
                  {commissionOrders.map((order) => (
                    <div key={order.id} className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-bg-secondary transition-colors">
                      <div className="col-span-2">
                        <div className="font-mono font-semibold text-text-primary">{order.orderNumber}</div>
                        <div className="text-xs text-text-tertiary mt-1">{order.createdAt}</div>
                      </div>
                      <div className="col-span-2 text-text-primary">{order.agentName}</div>
                      <div className="col-span-2 text-text-secondary text-sm">{order.productName}</div>
                      <div className="col-span-2 text-center font-bold text-text-primary">
                        ¥{order.orderAmount.toLocaleString()}
                      </div>
                      <div className="col-span-2 text-center">
                        <div className="font-bold text-success">¥{order.commissionAmount.toFixed(2)}</div>
                        <div className="text-xs text-text-tertiary">({order.commissionRate}%)</div>
                      </div>
                      <div className="col-span-1 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'completed' ? 'bg-green-100 text-success' :
                          order.status === 'paid' ? 'bg-blue-100 text-[#0056b3]' :
                          'bg-yellow-100 text-yellow-600'
                        }`}>
                          {order.status === 'completed' ? '已完成' :
                           order.status === 'paid' ? '已支付' : '待结算'}
                        </span>
                      </div>
                      <div className="col-span-1 text-center">
                        <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-[#0056b3]" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 数据统计 */}
          {activeTab === 'stats' && (
            <div className="p-6 space-y-6">
              {/* 业绩排行 */}
              <div className="bg-white rounded-xl border border-border p-6">
                <h3 className="font-bold text-text-primary mb-6">代理业绩排行（本月）</h3>
                <div className="space-y-4">
                  {agents
                    .filter(a => a.status === 'active')
                    .sort((a, b) => b.monthSales - a.monthSales)
                    .map((agent, index) => (
                      <div key={agent.id} className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                          index === 0 ? 'bg-yellow-500' :
                          index === 1 ? 'bg-gray-400' :
                          index === 2 ? 'bg-orange-600' :
                          'bg-[#0056b3]'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-text-primary">{agent.name}</div>
                          <div className="text-sm text-text-secondary">{levelConfig[agent.level].label}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-[#0056b3]">
                            ¥{agent.monthSales.toLocaleString()}
                          </div>
                          <div className="text-sm text-success">+12.5%</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* 分销渠道转化 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-border p-6">
                  <h3 className="font-bold text-text-primary mb-6">分销渠道转化率</h3>
                  <div className="space-y-4">
                    {[
                      { channel: '一级代理', rate: 6.8, color: 'purple' },
                      { channel: '二级代理', rate: 5.2, color: 'blue' },
                      { channel: '平台自营', rate: 5.1, color: 'green' }
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-text-primary">{item.channel}</span>
                          <span className="text-lg font-bold text-text-primary">{item.rate}%</span>
                        </div>
                        <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              item.color === 'purple' ? 'bg-purple-600' :
                              item.color === 'blue' ? 'bg-[#0056b3]' :
                              'bg-success'
                            }`}
                            style={{ width: `${(item.rate / 10) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                  <div className="flex items-start gap-4">
                    <Sparkles className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-bold text-text-primary mb-2">AI分销政策优化</h3>
                      <p className="text-sm text-text-secondary mb-4">
                        基于数据分析，建议：
                      </p>
                      <ul className="space-y-2 text-sm text-text-secondary">
                        <li>• 提升一级代理佣金比例至18%</li>
                        <li>• 增加新品类分销权限</li>
                        <li>• 优化代理培训体系</li>
                      </ul>
                      <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                        查看详细建议
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
