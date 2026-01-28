import React, { useState } from 'react';
import { X, Palette, Grid, Ruler, Home, Bath, Moon } from 'lucide-react';

interface ARControlPanelProps {
  onClose: () => void;
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const products = [
  { id: 1, name: '舒适系列 A', size: 'S', emoji: '📦' },
  { id: 2, name: '智能系列 B', size: 'M', emoji: '🎁' },
  { id: 3, name: '高级系列 C', size: 'L', emoji: '💎' },
];

const colors = [
  { id: 'default', name: '默认色', value: '#0056b3' },
  { id: 'purple', name: '极光紫', value: '#6B46C1' },
  { id: 'pink', name: '柔和粉', value: '#ED8936' },
  { id: 'black', name: '经典黑', value: '#1a1a1a' },
  { id: 'white', name: '纯净白', value: '#ffffff' },
];

const materials = [
  { id: 'silicone', name: '医用硅胶', description: '柔软亲肤' },
  { id: 'abs', name: 'ABS塑料', description: '坚固耐用' },
  { id: 'tpe', name: 'TPE材质', description: '环保安全' },
];

const scenes = [
  { id: 'bedroom', name: '卧室', icon: <Moon className="w-5 h-5" />, description: '私密空间' },
  { id: 'bathroom', name: '浴室', icon: <Bath className="w-5 h-5" />, description: '防水场景' },
  { id: 'livingroom', name: '客厅', icon: <Home className="w-5 h-5" />, description: '日常环境' },
];

export function ARControlPanel({ onClose, selectedColor, onColorChange }: ARControlPanelProps) {
  const [activeTab, setActiveTab] = useState<'product' | 'color' | 'material' | 'scene' | 'measure'>('product');
  const [selectedProduct, setSelectedProduct] = useState(products[0].id);
  const [selectedMaterial, setSelectedMaterial] = useState('silicone');
  const [selectedScene, setSelectedScene] = useState('bedroom');

  return (
    <>
      {/* 遮罩层 */}
      <div 
        className="absolute inset-0 bg-black/50 z-20 animate-fadeIn"
        onClick={onClose}
      />

      {/* 面板内容 */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl z-30 animate-slideUp max-h-[80vh] overflow-y-auto">
        {/* 头部 */}
        <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-center justify-between rounded-t-3xl z-10">
          <h2 className="text-lg font-semibold text-text-primary">控制面板</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        {/* 标签切换 */}
        <div className="border-b border-border overflow-x-auto">
          <div className="flex px-6 gap-4 min-w-max">
            <button
              onClick={() => setActiveTab('product')}
              className={`py-3 px-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'product'
                  ? 'border-[#0056b3] text-[#0056b3]'
                  : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              产品切换
            </button>
            <button
              onClick={() => setActiveTab('color')}
              className={`py-3 px-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'color'
                  ? 'border-[#0056b3] text-[#0056b3]'
                  : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              颜色选择
            </button>
            <button
              onClick={() => setActiveTab('material')}
              className={`py-3 px-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'material'
                  ? 'border-[#0056b3] text-[#0056b3]'
                  : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              材质选择
            </button>
            <button
              onClick={() => setActiveTab('scene')}
              className={`py-3 px-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'scene'
                  ? 'border-[#0056b3] text-[#0056b3]'
                  : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              场景预设
            </button>
            <button
              onClick={() => setActiveTab('measure')}
              className={`py-3 px-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'measure'
                  ? 'border-[#0056b3] text-[#0056b3]'
                  : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              尺寸测量
            </button>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="p-6">
          {/* 产品切换 */}
          {activeTab === 'product' && (
            <div className="space-y-3">
              <h3 className="font-medium text-text-primary mb-4">选择产品</h3>
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelectedProduct(product.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    selectedProduct === product.id
                      ? 'border-[#0056b3] bg-blue-50'
                      : 'border-border bg-white hover:border-[#0056b3]/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{product.emoji}</span>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-text-primary">{product.name}</div>
                      <div className="text-sm text-text-secondary">尺寸: {product.size}</div>
                    </div>
                    {selectedProduct === product.id && (
                      <div className="w-6 h-6 bg-[#0056b3] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* 颜色选择 */}
          {activeTab === 'color' && (
            <div>
              <h3 className="font-medium text-text-primary mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5" />
                选择颜色
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => onColorChange(color.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedColor === color.id
                        ? 'border-[#0056b3] bg-blue-50'
                        : 'border-border bg-white hover:border-[#0056b3]/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full border-2 border-border shadow-sm"
                        style={{ backgroundColor: color.value }}
                      />
                      <div className="flex-1 text-left">
                        <div className="font-medium text-sm text-text-primary">{color.name}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 材质选择 */}
          {activeTab === 'material' && (
            <div className="space-y-3">
              <h3 className="font-medium text-text-primary mb-4 flex items-center gap-2">
                <Grid className="w-5 h-5" />
                选择材质
              </h3>
              {materials.map((material) => (
                <button
                  key={material.id}
                  onClick={() => setSelectedMaterial(material.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    selectedMaterial === material.id
                      ? 'border-[#0056b3] bg-blue-50'
                      : 'border-border bg-white hover:border-[#0056b3]/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <div className="font-medium text-text-primary">{material.name}</div>
                      <div className="text-sm text-text-secondary">{material.description}</div>
                    </div>
                    {selectedMaterial === material.id && (
                      <div className="w-6 h-6 bg-[#0056b3] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* 场景预设 */}
          {activeTab === 'scene' && (
            <div className="space-y-3">
              <h3 className="font-medium text-text-primary mb-4">选择场景</h3>
              {scenes.map((scene) => (
                <button
                  key={scene.id}
                  onClick={() => setSelectedScene(scene.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    selectedScene === scene.id
                      ? 'border-[#0056b3] bg-blue-50'
                      : 'border-border bg-white hover:border-[#0056b3]/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${
                      selectedScene === scene.id ? 'bg-[#0056b3] text-white' : 'bg-bg-secondary text-text-secondary'
                    }`}>
                      {scene.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-text-primary">{scene.name}</div>
                      <div className="text-sm text-text-secondary">{scene.description}</div>
                    </div>
                    {selectedScene === scene.id && (
                      <div className="w-6 h-6 bg-[#0056b3] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* 尺寸测量 */}
          {activeTab === 'measure' && (
            <div>
              <h3 className="font-medium text-text-primary mb-4 flex items-center gap-2">
                <Ruler className="w-5 h-5" />
                尺寸对比工具
              </h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                <h4 className="font-medium text-text-primary mb-2">产品实际尺寸</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[#0056b3]">15</div>
                    <div className="text-xs text-text-secondary">长度(cm)</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0056b3]">5</div>
                    <div className="text-xs text-text-secondary">宽度(cm)</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0056b3]">3</div>
                    <div className="text-xs text-text-secondary">高度(cm)</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-text-secondary text-sm">常见物品对比</h4>
                {[
                  { name: '智能手机', size: '约15cm长' },
                  { name: '口红', size: '约5cm高' },
                  { name: '鼠标', size: '约10cm长' },
                ].map((item, index) => (
                  <div key={index} className="p-3 bg-bg-secondary rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-primary">{item.name}</span>
                      <span className="text-xs text-text-secondary">{item.size}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
