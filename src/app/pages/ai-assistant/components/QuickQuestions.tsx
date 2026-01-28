import React from 'react';
import { MessageCircle } from 'lucide-react';

interface QuickQuestionsProps {
  onQuestionClick: (question: string) => void;
}

const quickQuestions = [
  {
    id: 1,
    question: '能推荐一些适合初学者的产品吗？',
    icon: '🌟',
  },
  {
    id: 2,
    question: '如何正确清洁和保养产品？',
    icon: '🧼',
  },
  {
    id: 3,
    question: '有什么健康使用建议吗？',
    icon: '💚',
  },
  {
    id: 4,
    question: '如何选择适合自己的产品？',
    icon: '🎯',
  },
  {
    id: 5,
    question: '产品的材质和安全性如何？',
    icon: '🛡️',
  },
  {
    id: 6,
    question: '可以设置使用提醒吗？',
    icon: '⏰',
  },
];

export function QuickQuestions({ onQuestionClick }: QuickQuestionsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-2 text-text-secondary">
        <MessageCircle className="w-4 h-4" />
        <span className="text-sm font-medium">快速问题</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
        {quickQuestions.map((item) => (
          <button
            key={item.id}
            onClick={() => onQuestionClick(item.question)}
            className="
              p-4 
              bg-white 
              border border-border 
              rounded-xl 
              hover:border-[#0056b3] 
              hover:shadow-md 
              transition-all 
              text-left 
              group
            "
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <span className="text-sm text-text-secondary group-hover:text-[#0056b3] transition-colors">
                {item.question}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
