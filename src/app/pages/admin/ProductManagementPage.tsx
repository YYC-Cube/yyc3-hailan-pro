import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft,
  Package,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  EyeOff,
  Trash2,
  Upload,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  MoreVertical,
  Tag,
  TrendingUp,
  Box
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  inventoryStatus: 'in-stock' | 'pre-sale' | 'out-of-stock';
  status: 'published' | 'draft' | 'reviewing' | 'rejected';
  distributionEnabled: boolean;
  commissionRate: number;
  sales: number;
  image: string;
  createdAt: string;
}

export function ProductManagementPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedInventoryStatus, setSelectedInventoryStatus] = useState<string>('all');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showBatchActions, setShowBatchActions] = useState(false);

  const categories = [
    { id: 'all', label: '全部分类' },
    { id: 'vibrator', label: '震动棒' },
    { id: 'toy', label: '情趣玩具' },
    { id: 'lubricant', label: '润滑液' },
    { id: 'condom', label: '安全套' }
  ];

  const products: Product[] = [
    {
      id: '1',
      name: '智能震动棒 Pro',
      sku: 'VIB-PRO-001',
      category: 'vibrator',
      price: 598,
      stock: 5,
      inventoryStatus: 'in-stock',
      status: 'published',
      distributionEnabled: true,
      commissionRate: 15,
      sales: 326,
      image: '',
      createdAt: '2026-01-20'
    },
    {
      id: '2',
      name: '高级情趣玩具套装',
      sku: 'TOY-SET-002',
      category: 'toy',
      price: 899,
      stock: 0,
      inventoryStatus: 'out-of-stock',
      status: 'published',
      distributionEnabled: false,
      commissionRate: 20,
      sales: 158,
      image: '',
      createdAt: '2026-01-18'
    },
    {
      id: '3',
      name: '水基润滑液 100ml',
      sku: 'LUB-WAT-003',
      category: 'lubricant',
      price: 89,
      stock: 245,
      inventoryStatus: 'in-stock',
      status: 'published',
      distributionEnabled: true,
      commissionRate: 10,
      sales: 892,
      image: '',
      createdAt: '2026-01-15'
    },
    {
      id: '4',
      name: '超薄安全套 12只装',
      sku: 'CON-TH-004',
      category: 'condom',
      price: 59,
      stock: 458,
      inventoryStatus: 'in-stock',
      status: 'published',
      distributionEnabled: true,
      commissionRate: 8,
      sales: 1245,
      image: '',
      createdAt: '2026-01-10'
    },
    {
      id: '5',
      name: '新品震动器',
      sku: 'VIB-NEW-005',
      category: 'vibrator',
      price: 399,
      stock: 50,
      inventoryStatus: 'pre-sale',
      status: 'reviewing',
      distributionEnabled: false,
      commissionRate: 12,
      sales: 0,
      image: '',
      createdAt: '2026-01-26'
    }
  ];

  const inventoryStatusConfig = {
    'in-stock': { label: '现货', color: 'green' },
    'pre-sale': { label: '预售', color: 'blue' },
    'out-of-stock': { label: '缺货', color: 'red' }
  };

  const statusConfig = {
    'published': { label: '已发布', icon: CheckCircle, color: 'green' },
    'draft': { label: '草稿', icon: Edit, color: 'gray' },
    'reviewing': { label: '审核中', icon: Clock, color: 'yellow' },
    'rejected': { label: '已驳回', icon: XCircle, color: 'red' }
  };

  const filteredProducts = products
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .filter(p => selectedStatus === 'all' || p.status === selectedStatus)
    .filter(p => selectedInventoryStatus === 'all' || p.inventoryStatus === selectedInventoryStatus)
    .filter(p => 
      searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  const handleSelectProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(pid => pid !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const handleBatchPublish = () => {
    alert(`批量发布 ${selectedProducts.length} 个商品`);
  };

  const handleBatchUnpublish = () => {
    alert(`批量下架 ${selectedProducts.length} 个商品`);
  };

  const handleBatchDelete = () => {
    if (confirm(`确定要删除选中的 ${selectedProducts.length} 个商品吗？`)) {
      alert('已删除');
      setSelectedProducts([]);
    }
  };

  const handleBatchSyncInventory = () => {
    alert(`同步 ${selectedProducts.length} 个商品的库存`);
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
                <Package className="w-6 h-6 text-[#0056b3]" />
                <div>
                  <h1 className="text-xl font-bold text-text-primary">商品管理</h1>
                  <p className="text-xs text-text-secondary">全生命周期 · 联动进销存</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => alert('导出商品数据')}
                className="px-4 py-2 bg-bg-secondary text-text-primary rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>导出</span>
              </button>
              <button
                onClick={() => alert('导入商品数据')}
                className="px-4 py-2 bg-bg-secondary text-text-primary rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>导入</span>
              </button>
              <button
                onClick={() => navigate('/admin/products/new')}
                className="px-4 py-2 bg-[#0056b3] text-white rounded-lg hover:bg-[#004494] transition-colors font-medium flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>新增商品</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 py-8 space-y-6">
        {/* 搜索和筛选 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* 搜索框 */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                <input
                  type="text"
                  placeholder="搜索商品名称或SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors"
                />
              </div>
            </div>

            {/* 分类筛选 */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>

            {/* 状态筛选 */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors"
            >
              <option value="all">全部状态</option>
              <option value="published">已发布</option>
              <option value="draft">草稿</option>
              <option value="reviewing">审核中</option>
              <option value="rejected">已驳回</option>
            </select>
          </div>

          {/* 进销存状态筛选 */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setSelectedInventoryStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedInventoryStatus === 'all'
                  ? 'bg-[#0056b3] text-white'
                  : 'bg-bg-secondary text-text-secondary hover:bg-gray-300'
              }`}
            >
              全部库存状态
            </button>
            <button
              onClick={() => setSelectedInventoryStatus('in-stock')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedInventoryStatus === 'in-stock'
                  ? 'bg-success text-white'
                  : 'bg-bg-secondary text-text-secondary hover:bg-gray-300'
              }`}
            >
              现货
            </button>
            <button
              onClick={() => setSelectedInventoryStatus('pre-sale')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedInventoryStatus === 'pre-sale'
                  ? 'bg-blue-500 text-white'
                  : 'bg-bg-secondary text-text-secondary hover:bg-gray-300'
              }`}
            >
              预售
            </button>
            <button
              onClick={() => setSelectedInventoryStatus('out-of-stock')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedInventoryStatus === 'out-of-stock'
                  ? 'bg-error text-white'
                  : 'bg-bg-secondary text-text-secondary hover:bg-gray-300'
              }`}
            >
              缺货
            </button>
          </div>
        </div>

        {/* 批量操作 */}
        {selectedProducts.length > 0 && (
          <div className="bg-blue-50 border-2 border-[#0056b3] rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-text-primary">
                  已选择 {selectedProducts.length} 个商品
                </span>
                <button
                  onClick={() => setSelectedProducts([])}
                  className="text-sm text-text-secondary hover:text-text-primary"
                >
                  取消选择
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleBatchPublish}
                  className="px-4 py-2 bg-success text-white rounded-lg hover:bg-green-600 transition-colors font-medium text-sm"
                >
                  批量上架
                </button>
                <button
                  onClick={handleBatchUnpublish}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium text-sm"
                >
                  批量下架
                </button>
                <button
                  onClick={handleBatchSyncInventory}
                  className="px-4 py-2 bg-[#0056b3] text-white rounded-lg hover:bg-[#004494] transition-colors font-medium text-sm flex items-center gap-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>同步库存</span>
                </button>
                <button
                  onClick={handleBatchDelete}
                  className="px-4 py-2 bg-error text-white rounded-lg hover:bg-red-600 transition-colors font-medium text-sm flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>批量删除</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 商品列表 */}
        <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
          {/* 表头 */}
          <div className="bg-bg-secondary px-6 py-4 border-b border-border">
            <div className="grid grid-cols-12 gap-4 items-center font-semibold text-sm text-text-primary">
              <div className="col-span-1">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-border"
                />
              </div>
              <div className="col-span-3">商品信息</div>
              <div className="col-span-1 text-center">库存状态</div>
              <div className="col-span-1 text-center">审核状态</div>
              <div className="col-span-1 text-center">库存</div>
              <div className="col-span-1 text-center">销量</div>
              <div className="col-span-2 text-center">分销设置</div>
              <div className="col-span-1 text-center">创建时间</div>
              <div className="col-span-1 text-center">操作</div>
            </div>
          </div>

          {/* 商品列表 */}
          <div className="divide-y divide-border">
            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center">
                <Package className="w-16 h-16 text-text-tertiary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">暂无商品</h3>
                <p className="text-text-secondary mb-6">
                  {searchQuery ? '没有找到相关商品' : '还没有添加商品'}
                </p>
                <button
                  onClick={() => navigate('/admin/products/new')}
                  className="px-6 py-3 bg-[#0056b3] text-white rounded-xl hover:bg-[#004494] transition-colors font-medium"
                >
                  添加第一个商品
                </button>
              </div>
            ) : (
              filteredProducts.map((product) => {
                const StatusIcon = statusConfig[product.status].icon;
                const statusColor = statusConfig[product.status].color;
                const inventoryStatusColor = inventoryStatusConfig[product.inventoryStatus].color;
                
                return (
                  <div key={product.id} className="px-6 py-4 hover:bg-bg-secondary transition-colors">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* 选择框 */}
                      <div className="col-span-1">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => handleSelectProduct(product.id)}
                          className="w-4 h-4 rounded border-border"
                        />
                      </div>

                      {/* 商品信息 */}
                      <div className="col-span-3">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 bg-bg-secondary rounded-lg flex items-center justify-center">
                            <Package className="w-8 h-8 text-text-tertiary" />
                          </div>
                          <div>
                            <div className="font-semibold text-text-primary mb-1 line-clamp-1">
                              {product.name}
                            </div>
                            <div className="text-xs text-text-tertiary font-mono">
                              SKU: {product.sku}
                            </div>
                            <div className="text-sm font-bold text-[#0056b3] mt-1">
                              ¥{product.price}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 库存状态 */}
                      <div className="col-span-1 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          inventoryStatusColor === 'green' ? 'bg-green-100 text-success' :
                          inventoryStatusColor === 'blue' ? 'bg-blue-100 text-blue-600' :
                          'bg-red-100 text-error'
                        }`}>
                          {inventoryStatusConfig[product.inventoryStatus].label}
                        </span>
                      </div>

                      {/* 审核状态 */}
                      <div className="col-span-1 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <StatusIcon className={`w-4 h-4 ${
                            statusColor === 'green' ? 'text-success' :
                            statusColor === 'yellow' ? 'text-yellow-600' :
                            statusColor === 'red' ? 'text-error' :
                            'text-text-tertiary'
                          }`} />
                          <span className="text-xs font-medium text-text-secondary">
                            {statusConfig[product.status].label}
                          </span>
                        </div>
                      </div>

                      {/* 库存 */}
                      <div className="col-span-1 text-center">
                        <span className={`font-bold ${
                          product.stock === 0 ? 'text-error' :
                          product.stock < 10 ? 'text-yellow-600' :
                          'text-text-primary'
                        }`}>
                          {product.stock}
                        </span>
                      </div>

                      {/* 销量 */}
                      <div className="col-span-1 text-center">
                        <span className="font-semibold text-text-primary">
                          {product.sales}
                        </span>
                      </div>

                      {/* 分销设置 */}
                      <div className="col-span-2 text-center">
                        {product.distributionEnabled ? (
                          <div className="flex items-center justify-center gap-2">
                            <CheckCircle className="w-4 h-4 text-success" />
                            <span className="text-sm text-text-secondary">
                              已启用 · {product.commissionRate}%
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <XCircle className="w-4 h-4 text-text-tertiary" />
                            <span className="text-sm text-text-tertiary">未启用</span>
                          </div>
                        )}
                      </div>

                      {/* 创建时间 */}
                      <div className="col-span-1 text-center text-xs text-text-tertiary">
                        {new Date(product.createdAt).toLocaleDateString('zh-CN')}
                      </div>

                      {/* 操作 */}
                      <div className="col-span-1 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                            className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                            title="编辑"
                          >
                            <Edit className="w-4 h-4 text-[#0056b3]" />
                          </button>
                          <button
                            onClick={() => alert(`${product.status === 'published' ? '下架' : '上架'}商品`)}
                            className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                            title={product.status === 'published' ? '下架' : '上架'}
                          >
                            {product.status === 'published' ? (
                              <EyeOff className="w-4 h-4 text-yellow-600" />
                            ) : (
                              <Eye className="w-4 h-4 text-success" />
                            )}
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`确定要删除商品"${product.name}"吗？`)) {
                                alert('已删除');
                              }
                            }}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                            title="删除"
                          >
                            <Trash2 className="w-4 h-4 text-error" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* 分页 */}
        {filteredProducts.length > 0 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              共 {filteredProducts.length} 个商品
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-white border border-border rounded-lg hover:bg-bg-secondary transition-colors text-sm font-medium">
                上一页
              </button>
              <button className="px-4 py-2 bg-[#0056b3] text-white rounded-lg hover:bg-[#004494] transition-colors text-sm font-medium">
                1
              </button>
              <button className="px-4 py-2 bg-white border border-border rounded-lg hover:bg-bg-secondary transition-colors text-sm font-medium">
                2
              </button>
              <button className="px-4 py-2 bg-white border border-border rounded-lg hover:bg-bg-secondary transition-colors text-sm font-medium">
                下一页
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
