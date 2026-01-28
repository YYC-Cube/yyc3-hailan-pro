import React, { useState, useEffect } from 'react';
import { GripVertical, Star, Shield, Zap, Heart, DollarSign, Package } from 'lucide-react';

interface RankingQuestionProps {
  questionId: number;
  value?: string[];
  onChange: (value: string[]) => void;
}

const getFactors = (questionId: number) => {
  const factorsMap: Record<number, any[]> = {
    3: [
      { id: 'quality', label: '产品品质', icon: <Star className="w-5 h-5" /> },
      { id: 'price', label: '价格合理', icon: <DollarSign className="w-5 h-5" /> },
      { id: 'comfort', label: '舒适度', icon: <Heart className="w-5 h-5" /> },
      { id: 'safety', label: '安全性', icon: <Shield className="w-5 h-5" /> },
      { id: 'feature', label: '功能性', icon: <Zap className="w-5 h-5" /> },
    ],
    9: [
      { id: 'smart', label: '智能控制', icon: <Zap className="w-5 h-5" /> },
      { id: 'quiet', label: '静音设计', icon: <Package className="w-5 h-5" /> },
      { id: 'waterproof', label: '防水功能', icon: <Shield className="w-5 h-5" /> },
      { id: 'battery', label: '续航能力', icon: <Star className="w-5 h-5" /> },
      { id: 'size', label: '尺寸大小', icon: <Heart className="w-5 h-5" /> },
    ],
  };

  return factorsMap[questionId] || factorsMap[3];
};

export function RankingQuestion({ questionId, value, onChange }: RankingQuestionProps) {
  const factors = getFactors(questionId);
  const [items, setItems] = useState<string[]>(value || factors.map(f => f.id));
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  useEffect(() => {
    if (value && value.length > 0) {
      setItems(value);
    }
  }, [value]);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    
    if (draggedItem && draggedItem !== targetId) {
      const newItems = [...items];
      const draggedIndex = newItems.indexOf(draggedItem);
      const targetIndex = newItems.indexOf(targetId);
      
      newItems.splice(draggedIndex, 1);
      newItems.splice(targetIndex, 0, draggedItem);
      
      setItems(newItems);
      onChange(newItems);
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const getFactor = (id: string) => {
    return factors.find(f => f.id === id);
  };

  return (
    <div className="space-y-3">
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-4">
        <p className="text-sm text-purple-800">
          💡 <strong>提示：</strong>拖动卡片改变顺序，越靠上表示越重要
        </p>
      </div>

      {items.map((id, index) => {
        const factor = getFactor(id);
        if (!factor) return null;

        return (
          <div
            key={id}
            draggable
            onDragStart={(e) => handleDragStart(e, id)}
            onDragOver={(e) => handleDragOver(e, id)}
            onDragEnd={handleDragEnd}
            className={`
              p-4 rounded-xl border-2 transition-all cursor-move
              ${draggedItem === id
                ? 'border-[#6B46C1] bg-purple-50 opacity-50'
                : 'border-border bg-white hover:border-[#6B46C1]/50 hover:shadow-md'
              }
            `}
          >
            <div className="flex items-center gap-4">
              {/* 排名数字 */}
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#6B46C1] to-[#ED8936] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">{index + 1}</span>
              </div>

              {/* 拖动图标 */}
              <GripVertical className="w-5 h-5 text-text-tertiary flex-shrink-0" />

              {/* 因素图标 */}
              <div className="p-2 bg-purple-100 text-[#6B46C1] rounded-lg flex-shrink-0">
                {factor.icon}
              </div>

              {/* 因素标签 */}
              <div className="flex-1">
                <span className="font-medium text-text-primary">{factor.label}</span>
              </div>

              {/* 重要性指示 */}
              <div className="flex-shrink-0">
                {index === 0 && (
                  <span className="text-xs font-medium text-[#6B46C1] bg-purple-100 px-2 py-1 rounded-full">
                    最重要
                  </span>
                )}
                {index === items.length - 1 && (
                  <span className="text-xs font-medium text-text-tertiary bg-bg-secondary px-2 py-1 rounded-full">
                    最不重要
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
