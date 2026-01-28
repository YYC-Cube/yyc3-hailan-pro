import React, { useState, useEffect } from 'react';
import { Moon, Bath, Home, Car, Briefcase, Coffee } from 'lucide-react';

interface ScenarioQuestionProps {
  questionId: number;
  value?: string[];
  onChange: (value: string[]) => void;
}

const getScenarios = (questionId: number) => {
  const scenariosMap: Record<number, any[]> = {
    4: [
      { 
        id: 'bedroom', 
        label: '卧室', 
        icon: <Moon className="w-8 h-8" />,
        description: '私密空间，安静环境',
        image: '🛏️',
      },
      { 
        id: 'bathroom', 
        label: '浴室', 
        icon: <Bath className="w-8 h-8" />,
        description: '防水环境，清洁方便',
        image: '🛁',
      },
      { 
        id: 'home', 
        label: '客厅/家中', 
        icon: <Home className="w-8 h-8" />,
        description: '日常居家环境',
        image: '🏠',
      },
      { 
        id: 'travel', 
        label: '旅行/出差', 
        icon: <Briefcase className="w-8 h-8" />,
        description: '便携需求，隐私收纳',
        image: '✈️',
      },
    ],
    7: [
      { 
        id: 'solo', 
        label: '独自使用', 
        icon: <Moon className="w-8 h-8" />,
        description: '个人探索和放松',
        image: '🌙',
      },
      { 
        id: 'partner', 
        label: '伴侣共同', 
        icon: <Coffee className="w-8 h-8" />,
        description: '增进亲密关系',
        image: '💑',
      },
      { 
        id: 'variety', 
        label: '多样场景', 
        icon: <Home className="w-8 h-8" />,
        description: '适应不同情况',
        image: '🎯',
      },
    ],
  };

  return scenariosMap[questionId] || scenariosMap[4];
};

export function ScenarioQuestion({ questionId, value = [], onChange }: ScenarioQuestionProps) {
  const [selected, setSelected] = useState<string[]>(value);
  const scenarios = getScenarios(questionId);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const toggleScenario = (id: string) => {
    const newSelected = selected.includes(id)
      ? selected.filter(item => item !== id)
      : [...selected, id];
    
    setSelected(newSelected);
    onChange(newSelected);
  };

  return (
    <div>
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-blue-800">
          💡 可多选，选择所有适用的场景
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => toggleScenario(scenario.id)}
            className={`
              p-6 rounded-xl border-2 transition-all text-left relative overflow-hidden
              ${selected.includes(scenario.id)
                ? 'border-[#6B46C1] bg-purple-50 shadow-lg'
                : 'border-border bg-white hover:border-[#6B46C1]/50 hover:shadow-md'
              }
            `}
          >
            {/* 背景图案 */}
            <div className="absolute top-4 right-4 text-6xl opacity-10">
              {scenario.image}
            </div>

            <div className="relative">
              {/* 图标 */}
              <div className={`
                mb-4 inline-flex p-3 rounded-xl
                ${selected.includes(scenario.id)
                  ? 'bg-[#6B46C1] text-white'
                  : 'bg-bg-secondary text-text-secondary'
                }
              `}>
                {scenario.icon}
              </div>

              {/* 标题 */}
              <h3 className="text-lg font-bold text-text-primary mb-2">
                {scenario.label}
              </h3>
              
              {/* 描述 */}
              <p className="text-sm text-text-secondary mb-4">
                {scenario.description}
              </p>

              {/* 选中标识 */}
              {selected.includes(scenario.id) && (
                <div className="flex items-center gap-2">
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
    </div>
  );
}
