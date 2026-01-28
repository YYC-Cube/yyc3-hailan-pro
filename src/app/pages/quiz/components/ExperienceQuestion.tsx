import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Award, Rocket } from 'lucide-react';

interface ExperienceQuestionProps {
  value?: string;
  onChange: (value: string) => void;
}

const experienceLevels = [
  {
    id: 'beginner',
    label: '初学者',
    icon: <Sparkles className="w-8 h-8" />,
    description: '第一次尝试或刚开始使用',
    color: 'from-blue-100 to-blue-200',
    textColor: 'text-blue-600',
  },
  {
    id: 'intermediate',
    label: '有一定经验',
    icon: <TrendingUp className="w-8 h-8" />,
    description: '使用过几次，了解基本使用方法',
    color: 'from-purple-100 to-purple-200',
    textColor: 'text-purple-600',
  },
  {
    id: 'advanced',
    label: '经验丰富',
    icon: <Award className="w-8 h-8" />,
    description: '经常使用，熟悉各种产品',
    color: 'from-pink-100 to-pink-200',
    textColor: 'text-pink-600',
  },
  {
    id: 'expert',
    label: '资深用户',
    icon: <Rocket className="w-8 h-8" />,
    description: '非常了解，追求高端体验',
    color: 'from-orange-100 to-orange-200',
    textColor: 'text-orange-600',
  },
];

export function ExperienceQuestion({ value, onChange }: ExperienceQuestionProps) {
  const [selected, setSelected] = useState<string>(value || '');

  useEffect(() => {
    if (value) {
      setSelected(value);
    }
  }, [value]);

  const handleSelect = (id: string) => {
    setSelected(id);
    onChange(id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {experienceLevels.map((level) => (
        <button
          key={level.id}
          onClick={() => handleSelect(level.id)}
          className={`
            p-6 rounded-xl border-2 transition-all text-left relative overflow-hidden
            ${selected === level.id
              ? 'border-[#6B46C1] shadow-lg'
              : 'border-border bg-white hover:border-[#6B46C1]/50 hover:shadow-md'
            }
          `}
        >
          {/* 背景渐变 */}
          {selected === level.id && (
            <div className={`absolute inset-0 bg-gradient-to-br ${level.color} opacity-20`} />
          )}
          
          <div className="relative">
            <div className={`
              mb-4 inline-flex p-3 rounded-xl
              ${selected === level.id
                ? `bg-gradient-to-br ${level.color}`
                : 'bg-bg-secondary'
              }
              ${selected === level.id ? level.textColor : 'text-text-secondary'}
            `}>
              {level.icon}
            </div>
            
            <h3 className="text-xl font-bold text-text-primary mb-2">{level.label}</h3>
            <p className="text-sm text-text-secondary">{level.description}</p>
            
            {selected === level.id && (
              <div className="mt-4 flex items-center gap-2">
                <div className="w-6 h-6 bg-[#6B46C1] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-sm font-medium text-[#6B46C1]">已选择</span>
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
