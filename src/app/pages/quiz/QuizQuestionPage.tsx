import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { PreferenceQuestion } from './components/PreferenceQuestion';
import { RankingQuestion } from './components/RankingQuestion';
import { ScenarioQuestion } from './components/ScenarioQuestion';
import { BudgetQuestion } from './components/BudgetQuestion';
import { ExperienceQuestion } from './components/ExperienceQuestion';

interface Answer {
  questionId: number;
  value: any;
}

const questions = [
  {
    id: 1,
    type: 'preference',
    title: '您最看重产品的哪些特点？',
    subtitle: '可多选，选择所有适用的选项',
  },
  {
    id: 2,
    type: 'experience',
    title: '您的使用经验如何？',
    subtitle: '选择最符合您情况的选项',
  },
  {
    id: 3,
    type: 'ranking',
    title: '请按重要性排序以下因素',
    subtitle: '拖动卡片进行排序，最重要的放在最上方',
  },
  {
    id: 4,
    type: 'scenario',
    title: '您主要在什么场景使用？',
    subtitle: '选择最常见的使用场景',
  },
  {
    id: 5,
    type: 'budget',
    title: '您的预算范围是多少？',
    subtitle: '拖动滑块选择您的预算',
  },
  {
    id: 6,
    type: 'preference',
    title: '您偏好的产品功能',
    subtitle: '选择您感兴趣的功能',
  },
  {
    id: 7,
    type: 'scenario',
    title: '您希望产品具备什么特性？',
    subtitle: '选择所有适用的特性',
  },
  {
    id: 8,
    type: 'preference',
    title: '材质偏好',
    subtitle: '选择您喜欢的材质类型',
  },
  {
    id: 9,
    type: 'ranking',
    title: '功能优先级排序',
    subtitle: '按照您的需求排序',
  },
  {
    id: 10,
    type: 'preference',
    title: '附加需求',
    subtitle: '选择您需要的附加功能',
  },
];

export function QuizQuestionPage() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  const handleAnswer = (value: any) => {
    const newAnswers = answers.filter(a => a.questionId !== question.id);
    newAnswers.push({ questionId: question.id, value });
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // 完成问卷，跳转到结果页
      navigate('/quiz/result', { state: { answers } });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleExit = () => {
    setShowExitConfirm(true);
  };

  const confirmExit = () => {
    navigate(-1);
  };

  const getCurrentAnswer = () => {
    return answers.find(a => a.questionId === question.id)?.value;
  };

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* 顶部进度栏 */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handleExit}
              className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-text-secondary" />
            </button>
            <div className="text-sm text-text-secondary font-medium">
              {currentQuestion + 1} / {questions.length}
            </div>
          </div>
          
          {/* 进度条 */}
          <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#6B46C1] to-[#ED8936] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 问题内容 */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 animate-slideUp">
          {/* 问题标题 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              {question.title}
            </h2>
            <p className="text-text-secondary">
              {question.subtitle}
            </p>
          </div>

          {/* 问题内容 - 根据类型渲染不同组件 */}
          <div className="mb-8">
            {question.type === 'preference' && (
              <PreferenceQuestion
                questionId={question.id}
                value={getCurrentAnswer()}
                onChange={handleAnswer}
              />
            )}
            
            {question.type === 'experience' && (
              <ExperienceQuestion
                value={getCurrentAnswer()}
                onChange={handleAnswer}
              />
            )}
            
            {question.type === 'ranking' && (
              <RankingQuestion
                questionId={question.id}
                value={getCurrentAnswer()}
                onChange={handleAnswer}
              />
            )}
            
            {question.type === 'scenario' && (
              <ScenarioQuestion
                questionId={question.id}
                value={getCurrentAnswer()}
                onChange={handleAnswer}
              />
            )}
            
            {question.type === 'budget' && (
              <BudgetQuestion
                value={getCurrentAnswer()}
                onChange={handleAnswer}
              />
            )}
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-3 border-2 border-border text-text-primary rounded-xl hover:border-[#6B46C1] hover:text-[#6B46C1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>上一题</span>
          </button>

          <button
            onClick={handleSkip}
            className="px-6 py-3 text-text-secondary hover:text-text-primary transition-colors"
          >
            跳过
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-3 bg-gradient-to-r from-[#6B46C1] to-[#ED8936] text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-medium"
          >
            <span>{currentQuestion === questions.length - 1 ? '查看结果' : '下一题'}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 退出确认对话框 */}
      {showExitConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowExitConfirm(false)}
          />
          <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              确认退出？
            </h3>
            <p className="text-text-secondary mb-6">
              您的答案将不会被保存，确定要退出吗？
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 py-3 px-4 bg-bg-secondary text-text-primary rounded-xl hover:bg-bg-tertiary transition-colors font-medium"
              >
                继续答题
              </button>
              <button
                onClick={confirmExit}
                className="flex-1 py-3 px-4 bg-error text-white rounded-xl hover:bg-red-600 transition-colors font-medium"
              >
                确认退出
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
