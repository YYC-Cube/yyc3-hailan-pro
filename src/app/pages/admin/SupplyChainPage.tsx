import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ChevronLeft,
  Package,
  Truck,
  Building2,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Sparkles,
  ShoppingCart,
  Download,
  Upload,
  Search,
  Plus,
  Edit,
  Eye,
  Trash2,
  MapPin,
  BarChart3,
  FileText,
  Link2,
  Shield,
  QrCode
} from 'lucide-react';

interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplier: string;
  products: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'in-transit' | 'arrived' | 'completed';
  expectedDate: string;
  createdAt: string;
  aiGenerated?: boolean;
}

interface InventoryItem {
  id: string;
  productName: string;
  sku: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  status: 'normal' | 'low' | 'out' | 'excess';
  lastSaleDate: string;
  aiRecommendation?: string;
}

interface Supplier {
  id: string;
  name: string;
  category: string;
  rating: number;
  qualificationStatus: 'pending' | 'approved' | 'rejected';
  cooperationPeriod: string;
  qualityRate: number;
  fulfillmentRate: number;
  status: 'active' | 'frozen';
}

export function SupplyChainPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'purchase' | 'inventory' | 'suppliers' | 'logistics' | 'trace'>('purchase');

  // 采购订单数据
  const purchaseOrders: PurchaseOrder[] = [
    {
      id: '1',
      orderNumber: 'PO2026012601',
      supplier: '品质供应商A',
      products: 3,
      totalAmount: 45600,
      status: 'in-transit',
      expectedDate: '2026-01-30',
      createdAt: '2026-01-26 10:00',
      aiGenerated: true
    },
    {
      id: '2',
      orderNumber: 'PO2026012602',
      supplier: '优质供应商B',
      products: 5,
      totalAmount: 78900,
      status: 'confirmed',
      expectedDate: '2026-02-05',
      createdAt: '2026-01-26 14:30'
    },
    {
      id: '3',
      orderNumber: 'PO2026012603',
      supplier: '品质供应商A',
      products: 2,
      totalAmount: 23400,
      status: 'pending',
      expectedDate: '2026-02-10',
      createdAt: '2026-01-26 16:00'
    }
  ];

  // 库存数据
  const inventoryItems: InventoryItem[] = [
    {
      id: '1',
      productName: '智能震动棒 Pro',
      sku: 'VIB-PRO-001',
      currentStock: 5,
      minStock: 20,
      maxStock: 100,
      status: 'low',
      lastSaleDate: '2026-01-26',
      aiRecommendation: '建议采购50件，预计7天后缺货'
    },
    {
      id: '2',
      productName: '水基润滑液 100ml',
      sku: 'LUB-WAT-003',
      currentStock: 245,
      minStock: 100,
      maxStock: 300,
      status: 'normal',
      lastSaleDate: '2026-01-26'
    },
    {
      id: '3',
      productName: '高级情趣玩具套装',
      sku: 'TOY-SET-002',
      currentStock: 0,
      minStock: 10,
      maxStock: 50,
      status: 'out',
      lastSaleDate: '2026-01-24',
      aiRecommendation: '紧急补货，建议采购30件'
    },
    {
      id: '4',
      productName: '普通情趣用品',
      sku: 'TOY-NOR-005',
      currentStock: 458,
      minStock: 100,
      maxStock: 300,
      status: 'excess',
      lastSaleDate: '2026-01-15',
      aiRecommendation: '库存积压，建议分销折扣70%'
    }
  ];

  // 供应商数据
  const suppliers: Supplier[] = [
    {
      id: '1',
      name: '品质供应商A',
      category: '震动棒',
      rating: 4.8,
      qualificationStatus: 'approved',
      cooperationPeriod: '2年3个月',
      qualityRate: 98.5,
      fulfillmentRate: 96.2,
      status: 'active'
    },
    {
      id: '2',
      name: '优质供应商B',
      category: '情趣玩具',
      rating: 4.6,
      qualificationStatus: 'approved',
      cooperationPeriod: '1年8个月',
      qualityRate: 95.8,
      fulfillmentRate: 94.5,
      status: 'active'
    },
    {
      id: '3',
      name: '新入驻供应商C',
      category: '润滑液',
      rating: 0,
      qualificationStatus: 'pending',
      cooperationPeriod: '-',
      qualityRate: 0,
      fulfillmentRate: 0,
      status: 'frozen'
    }
  ];

  const statusConfig = {
    purchase: {
      pending: { label: '待确认', color: 'yellow', icon: Clock },
      confirmed: { label: '已确认', color: 'blue', icon: CheckCircle },
      'in-transit': { label: '运输中', color: 'purple', icon: Truck },
      arrived: { label: '已到货', color: 'green', icon: Package },
      completed: { label: '已完成', color: 'gray', icon: CheckCircle }
    },
    inventory: {
      normal: { label: '正常', color: 'green' },
      low: { label: '低库存', color: 'yellow' },
      out: { label: '缺货', color: 'red' },
      excess: { label: '积压', color: 'orange' }
    }
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
                <Package className="w-6 h-6 text-[#0056b3]" />
                <div>
                  <h1 className="text-xl font-bold text-text-primary">供应链管理</h1>
                  <p className="text-xs text-text-secondary">全链路管控 · 智能补货</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-lg">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-700">AI赋能</span>
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
              { id: 'purchase', label: '采购管理', icon: ShoppingCart },
              { id: 'inventory', label: '库存管理', icon: Package },
              { id: 'suppliers', label: '供应商管理', icon: Building2 },
              { id: 'logistics', label: '物流协同', icon: Truck },
              { id: 'trace', label: '溯源管理', icon: QrCode }
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

          {/* 采购管理 */}
          {activeTab === 'purchase' && (
            <div className="p-6 space-y-6">
              {/* AI采购建议 */}
              <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-text-primary mb-2">AI采购建议</h3>
                    <p className="text-sm text-text-secondary mb-4">
                      基于历史销量、季节波动分析，系统检测到3个商品需要补货
                    </p>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        <span>查看建议清单</span>
                      </button>
                      <button className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        <span>一键生成采购单</span>
                      </button>
                    </div>
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
                      placeholder="搜索采购单号或供应商..."
                      className="pl-10 pr-4 py-2 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors w-80"
                    />
                  </div>
                  <select className="px-4 py-2 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors">
                    <option>全部状态</option>
                    <option>待确认</option>
                    <option>已确认</option>
                    <option>运输中</option>
                    <option>已到货</option>
                  </select>
                </div>
                <button className="px-4 py-2 bg-[#0056b3] text-white rounded-lg hover:bg-[#004494] transition-colors font-medium flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>新建采购订单</span>
                </button>
              </div>

              {/* 采购订单列表 */}
              <div className="bg-white rounded-xl border border-border overflow-hidden">
                <div className="bg-bg-secondary px-6 py-3 border-b border-border grid grid-cols-12 gap-4 font-semibold text-sm">
                  <div className="col-span-2">订单号</div>
                  <div className="col-span-2">供应商</div>
                  <div className="col-span-1 text-center">商品数</div>
                  <div className="col-span-2 text-center">订单金额</div>
                  <div className="col-span-2 text-center">预计到货</div>
                  <div className="col-span-2 text-center">状态</div>
                  <div className="col-span-1 text-center">操作</div>
                </div>
                <div className="divide-y divide-border">
                  {purchaseOrders.map((order) => {
                    const StatusIcon = statusConfig.purchase[order.status].icon;
                    const statusColor = statusConfig.purchase[order.status].color;
                    
                    return (
                      <div key={order.id} className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-bg-secondary transition-colors">
                        <div className="col-span-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-semibold text-text-primary">
                              {order.orderNumber}
                            </span>
                            {order.aiGenerated && (
                              <Sparkles className="w-4 h-4 text-purple-600" title="AI生成" />
                            )}
                          </div>
                          <div className="text-xs text-text-tertiary mt-1">{order.createdAt}</div>
                        </div>
                        <div className="col-span-2 text-text-primary">{order.supplier}</div>
                        <div className="col-span-1 text-center font-semibold text-text-primary">
                          {order.products}
                        </div>
                        <div className="col-span-2 text-center font-bold text-[#0056b3]">
                          ¥{order.totalAmount.toLocaleString()}
                        </div>
                        <div className="col-span-2 text-center text-sm text-text-secondary">
                          {order.expectedDate}
                        </div>
                        <div className="col-span-2 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <StatusIcon className={`w-4 h-4 ${
                              statusColor === 'green' ? 'text-success' :
                              statusColor === 'blue' ? 'text-[#0056b3]' :
                              statusColor === 'purple' ? 'text-purple-600' :
                              statusColor === 'yellow' ? 'text-yellow-600' :
                              'text-text-tertiary'
                            }`} />
                            <span className="text-xs font-medium text-text-secondary">
                              {statusConfig.purchase[order.status].label}
                            </span>
                          </div>
                        </div>
                        <div className="col-span-1 text-center">
                          <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                            <Eye className="w-4 h-4 text-[#0056b3]" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 库存管理 */}
          {activeTab === 'inventory' && (
            <div className="p-6 space-y-6">
              {/* 库存统计 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: '正常库存', count: 1, color: 'green', icon: CheckCircle },
                  { label: '低库存预警', count: 1, color: 'yellow', icon: AlertTriangle },
                  { label: '缺货商品', count: 1, color: 'red', icon: AlertTriangle },
                  { label: '积压商品', count: 1, color: 'orange', icon: BarChart3 }
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="bg-white rounded-xl p-6 border border-border">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className={`w-6 h-6 ${
                          stat.color === 'green' ? 'text-success' :
                          stat.color === 'yellow' ? 'text-yellow-600' :
                          stat.color === 'red' ? 'text-error' :
                          'text-orange-600'
                        }`} />
                        <span className="text-sm text-text-secondary">{stat.label}</span>
                      </div>
                      <div className="text-3xl font-bold text-text-primary">{stat.count}</div>
                    </div>
                  );
                })}
              </div>

              {/* AI补货建议 */}
              <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                <div className="flex items-start gap-4">
                  <Sparkles className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-bold text-text-primary mb-2">AI智能补货建议</h3>
                    <p className="text-sm text-text-secondary mb-4">
                      系统已自动生成补货清单，建议优先处理2个紧急商品
                    </p>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      <span>一键生成采购订单</span>
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
                      placeholder="搜索商品名称或SKU..."
                      className="pl-10 pr-4 py-2 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors w-80"
                    />
                  </div>
                  <select className="px-4 py-2 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors">
                    <option>全部状态</option>
                    <option>正常</option>
                    <option>低库存</option>
                    <option>缺货</option>
                    <option>积压</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-bg-secondary text-text-primary rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    <span>批量盘点</span>
                  </button>
                  <button className="px-4 py-2 bg-bg-secondary text-text-primary rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center gap-2">
                    <QrCode className="w-4 h-4" />
                    <span>扫码盘点</span>
                  </button>
                </div>
              </div>

              {/* 库存列表 */}
              <div className="space-y-4">
                {inventoryItems.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-white rounded-xl border-2 p-6 ${
                      item.status === 'out' ? 'border-error bg-red-50' :
                      item.status === 'low' ? 'border-yellow-500 bg-yellow-50' :
                      item.status === 'excess' ? 'border-orange-500 bg-orange-50' :
                      'border-border'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-text-primary text-lg">{item.productName}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status === 'normal' ? 'bg-green-100 text-success' :
                            item.status === 'low' ? 'bg-yellow-100 text-yellow-600' :
                            item.status === 'out' ? 'bg-red-100 text-error' :
                            'bg-orange-100 text-orange-600'
                          }`}>
                            {statusConfig.inventory[item.status].label}
                          </span>
                        </div>
                        <div className="text-sm text-text-tertiary">SKU: {item.sku}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-text-secondary mb-1">当前库存</div>
                        <div className={`text-3xl font-bold ${
                          item.status === 'out' ? 'text-error' :
                          item.status === 'low' ? 'text-yellow-600' :
                          item.status === 'excess' ? 'text-orange-600' :
                          'text-success'
                        }`}>
                          {item.currentStock}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-text-secondary mb-1">最低库存</div>
                        <div className="font-semibold text-text-primary">{item.minStock}</div>
                      </div>
                      <div>
                        <div className="text-xs text-text-secondary mb-1">最高库存</div>
                        <div className="font-semibold text-text-primary">{item.maxStock}</div>
                      </div>
                      <div>
                        <div className="text-xs text-text-secondary mb-1">最后销售</div>
                        <div className="font-semibold text-text-primary">{item.lastSaleDate}</div>
                      </div>
                      <div>
                        <div className="text-xs text-text-secondary mb-1">库存周转</div>
                        <div className="font-semibold text-text-primary">15天</div>
                      </div>
                    </div>

                    {item.aiRecommendation && (
                      <div className="bg-purple-100 rounded-lg p-4 flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="font-semibold text-purple-900 mb-2">AI建议</div>
                          <p className="text-sm text-purple-700">{item.aiRecommendation}</p>
                        </div>
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium whitespace-nowrap">
                          执行建议
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 供应商管理 */}
          {activeTab === 'suppliers' && (
            <div className="p-6 space-y-6">
              {/* 操作栏 */}
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                    <input
                      type="text"
                      placeholder="搜索供应商名称..."
                      className="pl-10 pr-4 py-2 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors w-80"
                    />
                  </div>
                  <select className="px-4 py-2 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors">
                    <option>全部状态</option>
                    <option>已认证</option>
                    <option>待审核</option>
                    <option>已冻结</option>
                  </select>
                </div>
                <button className="px-4 py-2 bg-[#0056b3] text-white rounded-lg hover:bg-[#004494] transition-colors font-medium flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>添加供应商</span>
                </button>
              </div>

              {/* 供应商列表 */}
              <div className="bg-white rounded-xl border border-border overflow-hidden">
                <div className="bg-bg-secondary px-6 py-3 border-b border-border grid grid-cols-12 gap-4 font-semibold text-sm">
                  <div className="col-span-2">供应商名称</div>
                  <div className="col-span-2">品类</div>
                  <div className="col-span-1 text-center">评分</div>
                  <div className="col-span-2 text-center">资质状态</div>
                  <div className="col-span-1 text-center">合作周期</div>
                  <div className="col-span-1 text-center">合格率</div>
                  <div className="col-span-1 text-center">履约率</div>
                  <div className="col-span-1 text-center">状态</div>
                  <div className="col-span-1 text-center">操作</div>
                </div>
                <div className="divide-y divide-border">
                  {suppliers.map((supplier) => (
                    <div key={supplier.id} className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-bg-secondary transition-colors">
                      <div className="col-span-2">
                        <div className="font-semibold text-text-primary">{supplier.name}</div>
                      </div>
                      <div className="col-span-2 text-text-secondary text-sm">{supplier.category}</div>
                      <div className="col-span-1 text-center">
                        {supplier.rating > 0 ? (
                          <div className="flex items-center justify-center gap-1">
                            <span className="text-yellow-600">★</span>
                            <span className="font-bold text-text-primary">{supplier.rating}</span>
                          </div>
                        ) : (
                          <span className="text-text-tertiary text-sm">-</span>
                        )}
                      </div>
                      <div className="col-span-2 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          supplier.qualificationStatus === 'approved' ? 'bg-green-100 text-success' :
                          supplier.qualificationStatus === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-red-100 text-error'
                        }`}>
                          {supplier.qualificationStatus === 'approved' ? '已认证' :
                           supplier.qualificationStatus === 'pending' ? '待审核' : '已驳回'}
                        </span>
                      </div>
                      <div className="col-span-1 text-center text-sm text-text-secondary">
                        {supplier.cooperationPeriod}
                      </div>
                      <div className="col-span-1 text-center">
                        {supplier.qualityRate > 0 ? (
                          <span className="font-semibold text-success">{supplier.qualityRate}%</span>
                        ) : (
                          <span className="text-text-tertiary">-</span>
                        )}
                      </div>
                      <div className="col-span-1 text-center">
                        {supplier.fulfillmentRate > 0 ? (
                          <span className="font-semibold text-[#0056b3]">{supplier.fulfillmentRate}%</span>
                        ) : (
                          <span className="text-text-tertiary">-</span>
                        )}
                      </div>
                      <div className="col-span-1 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          supplier.status === 'active' ? 'bg-green-100 text-success' : 'bg-gray-100 text-text-tertiary'
                        }`}>
                          {supplier.status === 'active' ? '活跃' : '冻结'}
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

          {/* 物流协同 */}
          {activeTab === 'logistics' && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 采购物流 */}
                <div className="bg-white rounded-xl border border-border p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Truck className="w-6 h-6 text-[#0056b3]" />
                    <h3 className="font-bold text-text-primary">采购到货物流</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-text-primary">PO2026012601</span>
                        <span className="px-2 py-1 bg-purple-600 text-white rounded-full text-xs font-semibold">
                          运输中
                        </span>
                      </div>
                      <div className="text-sm text-text-secondary mb-3">
                        供应商：品质供应商A → 仓库
                      </div>
                      <div className="flex items-center gap-2 text-sm text-purple-600">
                        <MapPin className="w-4 h-4" />
                        <span>预计1月30日到达</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 订单发货物流 */}
                <div className="bg-white rounded-xl border border-border p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Package className="w-6 h-6 text-success" />
                    <h3 className="font-bold text-text-primary">订单发货物流</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-text-primary">HL2026012601</span>
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-purple-600" />
                          <span className="px-2 py-1 bg-success text-white rounded-full text-xs font-semibold">
                            配送中
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-text-secondary mb-3">
                        隐私物流 · 顺丰速运
                      </div>
                      <div className="flex items-center gap-2 text-sm text-success">
                        <MapPin className="w-4 h-4" />
                        <span>预计明天送达</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 隐私物流合作商 */}
              <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                  <h3 className="font-bold text-text-primary">隐私物流合作商</h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {['顺丰速运', '圆通速递', '韵达快递'].map((name, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-purple-200">
                      <div className="font-semibold text-text-primary mb-2">{name}</div>
                      <div className="text-xs text-text-secondary">优先分配隐私订单</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 溯源管理 */}
          {activeTab === 'trace' && (
            <div className="p-6 space-y-6">
              <div className="bg-blue-50 rounded-xl p-6 border-2 border-[#0056b3]">
                <div className="flex items-start gap-4">
                  <QrCode className="w-8 h-8 text-[#0056b3] flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-bold text-text-primary mb-2">商品全链路溯源</h3>
                    <p className="text-sm text-text-secondary mb-4">
                      扫描商品二维码或输入SKU，查看完整供应链路径
                    </p>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="输入SKU或扫描二维码..."
                        className="flex-1 px-4 py-2 bg-white border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors"
                      />
                      <button className="px-6 py-2 bg-[#0056b3] text-white rounded-lg hover:bg-[#004494] transition-colors font-medium">
                        查询
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 溯源示例 */}
              <div className="bg-white rounded-xl border border-border p-6">
                <h3 className="font-bold text-text-primary mb-6">溯源路径示例</h3>
                <div className="space-y-6">
                  {[
                    { step: '采购批次', time: '2026-01-15 10:00', info: 'PO2026011501 · 品质供应商A' },
                    { step: '入库时间', time: '2026-01-20 14:30', info: '仓库A · 质检合格' },
                    { step: '销售订单', time: '2026-01-26 10:30', info: 'HL2026012601 · 隐私订单' },
                    { step: '物流轨迹', time: '2026-01-26 15:00', info: '顺丰速运 · SF1234567890' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#0056b3] rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-text-primary mb-1">{item.step}</div>
                        <div className="text-sm text-text-secondary mb-1">{item.time}</div>
                        <div className="text-sm text-text-tertiary">{item.info}</div>
                      </div>
                      {index < 3 && (
                        <div className="w-px h-12 bg-border ml-5" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
