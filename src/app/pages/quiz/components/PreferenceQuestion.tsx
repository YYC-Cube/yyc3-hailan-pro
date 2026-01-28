import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Shield, 
  Volume2, 
  Droplet, 
  Smartphone,
  Battery,
  Heart,
  Star
} from 'lucide-react';

interface PreferenceQuestionProps {
  questionId: number;
  value?: string[];
  onChange: (value: string[]) => void;
}

// 根据问题ID返回不同的选项
const getOptions = (questionId: number) => {
  const optionsMap: Record<number, any[]> = {
    1: [
      { id: 'comfort', label: '舒适度', icon: <Heart className="w-6 h-6" />, description: '柔软亲肤' },
      { id: 'quality', label: '品质', icon: <Star className="w-6 h-6" />, description: '医用级材质' },
      { id: 'quiet', label: '静音', icon: <Volume2 className="w-6 h-6" />, description: '低噪音设计' },
      { id: 'waterproof', label: '防水', icon: <Droplet className="w-6 h-6" />, description: '可水下使用' },
      { id: 'smart', label: '智能', icon: <Smartphone className="w-6 h-6" />, description: 'APP控制' },
      { id: 'battery', label: '续航', icon: <Battery className="w-6 h-6" />, description: '长效电池' },
    ],
    6: [
      { id: 'vibration', label: '震动模式', icon: <Zap className="w-6 h-6" />, description: '多种频率' },
      { id: 'heating', label: '加热功能', icon: <Shield className="w-6 h-6" />, description: '恒温加热' },
      { id: 'remote', label: '遥控', icon: <Smartphone className="w-6 h-6" />, description: '远程控制' },
      { id: 'rechargeable', label: '可充电', icon: <Battery className="w-6 h-6" />, description: 'USB充电' },
    ],
    8: [
      { id: 'silicone', label: '医用硅胶', icon: <Shield className="w-6 h-6" />, description: '安全亲肤' },
      { id: 'abs', label: 'ABS塑料', icon: <Star className="w-6 h-6" />, description: '坚固耐用' },
      { id: 'tpe', label: 'TPE材质', icon: <Heart className="w-6 h-6" />, description: '环保柔软' },
    ],
    10: [
      { id: 'storage', label: '收纳盒', icon: <Shield className="w-6 h-6" />, description: '隐私保护' },
      { id: 'cleaner', label: '清洁套装', icon: <Droplet className="w-6 h-6" />, description: '专业清洁' },
      { id: 'charger', label: '充电器', icon: <Battery className="w-6 h-6" />, description: '快速充电' },
      { id: 'manual', label: '详细说明', icon: <Star className="w-6 h-6" />, description: '使用指南' },
    ],
  };

  return optionsMap[questionId] || optionsMap[1];
};

export function PreferenceQuestion({ questionId, value = [], onChange }: PreferenceQuestionProps) {
  const [selected, setSelected] = useState<string[]>(value);
  const options = getOptions(questionId);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const toggleOption = (id: string) => {
    const newSelected = selected.includes(id)
      ? selected.filter(item => item !== id)
      : [...selected, id];
    
    setSelected(newSelected);
    onChange(newSelected);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => toggleOption(option.id)}
          className={`
            p-4 rounded-xl border-2 transition-all text-left
            ${selected.includes(option.id)
              ? 'border-[#6B46C1] bg-purple-50'
              : 'border-border bg-white hover:border-[#6B46C1]/50'
            }
          `}
        >
          <div className="flex items-start gap-3">
            <div className={`
              p-3 rounded-lg flex-shrink-0
              ${selected.includes(option.id)
                ? 'bg-[#6B46C1] text-white'
                : 'bg-bg-secondary text-text-secondary'
              }
            `}>
              {option.icon}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-text-primary mb-1">{option.label}</div>
              <div className="text-sm text-text-secondary">{option.description}</div>
            </div>
            {selected.includes(option.id) && (
              <div className="w-6 h-6 bg-[#6B46C1] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
