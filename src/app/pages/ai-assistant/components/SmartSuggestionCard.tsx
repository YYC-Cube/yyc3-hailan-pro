import React from 'react';
import { 
  ShoppingBag, 
  Heart, 
  BookOpen, 
  UserCheck, 
  ArrowRight,
  Star
} from 'lucide-react';

interface Suggestion {
  type: 'product' | 'health' | 'tutorial' | 'expert';
  title: string;
  description: string;
  action: string;
  data?: any;
}

interface SmartSuggestionCardProps {
  suggestion: Suggestion;
}

export function SmartSuggestionCard({ suggestion }: SmartSuggestionCardProps) {
  const getIcon = () => {
    switch (suggestion.type) {
      case 'product':
        return <ShoppingBag className="w-5 h-5" />;
      case 'health':
        return <Heart className="w-5 h-5" />;
      case 'tutorial':
        return <BookOpen className="w-5 h-5" />;
      case 'expert':
        return <UserCheck className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getColor = () => {
    switch (suggestion.type) {
      case 'product':
        return 'from-[#0056b3] to-[#004494]';
      case 'health':
        return 'from-[#38A169] to-[#2f855a]';
      case 'tutorial':
        return 'from-[#6B46C1] to-[#5a3ba3]';
      case 'expert':
        return 'from-[#ED8936] to-[#dd7728]';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getTypeLabel = () => {
    switch (suggestion.type) {
      case 'product':
        return '产品推荐';
      case 'health':
        return '健康建议';
      case 'tutorial':
        return '使用教程';
      case 'expert':
        return '专家咨询';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* 顶部标签栏 */}
      <div className={`bg-gradient-to-r ${getColor()} px-4 py-2 flex items-center gap-2`}>
        <div className="text-white">
          {getIcon()}
        </div>
        <span className="text-white font-medium text-sm">{getTypeLabel()}</span>
      </div>

      {/* 内容区域 */}
      <div className="p-4">
        <h3 className="font-semibold text-text-primary mb-2">{suggestion.title}</h3>
        <p className="text-sm text-text-secondary mb-4">{suggestion.description}</p>

        {/* 产品列表 - 如果是产品推荐 */}
        {suggestion.type === 'product' && suggestion.data?.products && (
          <div className="space-y-2 mb-4">
            {suggestion.data.products.map((product: any) => (
              <div 
                key={product.id}
                className="flex items-center justify-between p-3 bg-bg-secondary rounded-lg hover:bg-bg-tertiary transition-colors cursor-pointer"
              >
                <div className="flex-1">
                  <div className="font-medium text-sm text-text-primary">{product.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[#0056b3] font-semibold">{product.price}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-warning fill-warning" />
                      <span className="text-xs text-text-tertiary">{product.rating}</span>
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-text-tertiary" />
              </div>
            ))}
          </div>
        )}

        {/* 健康建议 - 科学依据说明 */}
        {suggestion.type === 'health' && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-2">
              <Heart className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
              <p className="text-xs text-green-800">
                基于医学研究和专业健康指导，帮助您建立科学的生活方式
              </p>
            </div>
          </div>
        )}

        {/* 操作按钮 */}
        <button className="w-full py-2.5 px-4 bg-[#0056b3] text-white rounded-lg hover:bg-[#004494] transition-colors flex items-center justify-center gap-2 font-medium">
          <span>{suggestion.action}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
