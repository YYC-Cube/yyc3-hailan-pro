import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';

interface BudgetQuestionProps {
  value?: { min: number; max: number };
  onChange: (value: { min: number; max: number }) => void;
}

const budgetRanges = [
  { min: 0, max: 200, label: '¥0 - ¥200', description: '入门级产品' },
  { min: 200, max: 500, label: '¥200 - ¥500', description: '性价比之选' },
  { min: 500, max: 1000, label: '¥500 - ¥1000', description: '中高端产品' },
  { min: 1000, max: 2000, label: '¥1000 - ¥2000', description: '高端产品' },
  { min: 2000, max: 5000, label: '¥2000+', description: '旗舰级产品' },
];

export function BudgetQuestion({ value, onChange }: BudgetQuestionProps) {
  const [budget, setBudget] = useState<number>(value?.max || 500);
  const [selectedRange, setSelectedRange] = useState<number>(1);

  useEffect(() => {
    if (value) {
      setBudget(value.max);
      // 找到对应的范围
      const rangeIndex = budgetRanges.findIndex(
        range => value.max >= range.min && value.max <= range.max
      );
      if (rangeIndex !== -1) {
        setSelectedRange(rangeIndex);
      }
    }
  }, [value]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBudget = parseInt(e.target.value);
    setBudget(newBudget);
    
    // 找到对应的范围
    const rangeIndex = budgetRanges.findIndex(
      range => newBudget >= range.min && newBudget <= range.max
    );
    if (rangeIndex !== -1) {
      setSelectedRange(rangeIndex);
      onChange({ min: budgetRanges[rangeIndex].min, max: newBudget });
    }
  };

  const handleRangeClick = (index: number) => {
    setSelectedRange(index);
    const range = budgetRanges[index];
    const midPoint = Math.floor((range.min + range.max) / 2);
    setBudget(midPoint);
    onChange({ min: range.min, max: midPoint });
  };

  return (
    <div>
      {/* 当前预算显示 */}
      <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <DollarSign className="w-6 h-6 text-[#6B46C1]" />
          <span className="text-sm font-medium text-text-secondary">预算范围</span>
        </div>
        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6B46C1] to-[#ED8936] mb-2">
          ¥{budget}
        </div>
        <div className="text-sm text-text-secondary">
          {budgetRanges[selectedRange]?.description}
        </div>
      </div>

      {/* 滑块 */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="range"
            min="0"
            max="5000"
            step="50"
            value={budget}
            onChange={handleSliderChange}
            className="w-full h-3 bg-gradient-to-r from-purple-200 via-pink-200 to-orange-200 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-6
              [&::-webkit-slider-thumb]:h-6
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-gradient-to-r
              [&::-webkit-slider-thumb]:from-[#6B46C1]
              [&::-webkit-slider-thumb]:to-[#ED8936]
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:shadow-lg
              [&::-webkit-slider-thumb]:hover:scale-110
              [&::-webkit-slider-thumb]:transition-transform
              [&::-moz-range-thumb]:w-6
              [&::-moz-range-thumb]:h-6
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-gradient-to-r
              [&::-moz-range-thumb]:from-[#6B46C1]
              [&::-moz-range-thumb]:to-[#ED8936]
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:cursor-pointer
              [&::-moz-range-thumb]:shadow-lg
            "
          />
          
          {/* 刻度标记 */}
          <div className="flex justify-between mt-2 px-1">
            <span className="text-xs text-text-tertiary">¥0</span>
            <span className="text-xs text-text-tertiary">¥1000</span>
            <span className="text-xs text-text-tertiary">¥2000</span>
            <span className="text-xs text-text-tertiary">¥5000+</span>
          </div>
        </div>
      </div>

      {/* 预设范围选项 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-[#6B46C1]" />
          <h4 className="font-medium text-text-primary">快速选择</h4>
        </div>

        {budgetRanges.map((range, index) => (
          <button
            key={index}
            onClick={() => handleRangeClick(index)}
            className={`
              w-full p-4 rounded-xl border-2 transition-all text-left
              ${selectedRange === index
                ? 'border-[#6B46C1] bg-purple-50 shadow-md'
                : 'border-border bg-white hover:border-[#6B46C1]/50'
              }
            `}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-text-primary mb-1">
                  {range.label}
                </div>
                <div className="text-sm text-text-secondary">
                  {range.description}
                </div>
              </div>
              {selectedRange === index && (
                <div className="w-6 h-6 bg-[#6B46C1] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* 提示信息 */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-800">
          💡 <strong>提示：</strong>我们会根据您的预算推荐性价比最高的产品。预算仅作参考，您随时可以查看其他价位的产品。
        </p>
      </div>
    </div>
  );
}
