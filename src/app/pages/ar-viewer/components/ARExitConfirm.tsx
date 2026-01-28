import React, { useState } from 'react';
import { AlertTriangle, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';

interface ARExitConfirmProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function ARExitConfirm({ onConfirm, onCancel }: ARExitConfirmProps) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState<'good' | 'bad' | null>(null);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleExit = () => {
    if (!showFeedback) {
      setShowFeedback(true);
    } else {
      onConfirm();
    }
  };

  const handleSubmitFeedback = () => {
    // 模拟提交反馈
    console.log('Feedback:', { rating, feedback });
    setSubmitted(true);
    setTimeout(() => {
      onConfirm();
    }, 1000);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center z-60 p-4">
      <div 
        className="absolute inset-0 bg-black/70"
        onClick={onCancel}
      />
      
      <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl animate-fadeIn">
        {!showFeedback ? (
          // 退出确认
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-[#ED8936]" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                确认退出AR体验？
              </h3>
              <p className="text-text-secondary">
                退出后将关闭摄像头并返回上一页面
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 py-3 px-4 bg-bg-secondary text-text-primary rounded-xl hover:bg-bg-tertiary transition-colors font-medium"
              >
                继续体验
              </button>
              <button
                onClick={handleExit}
                className="flex-1 py-3 px-4 bg-[#0056b3] text-white rounded-xl hover:bg-[#004494] transition-colors font-medium"
              >
                退出
              </button>
            </div>
          </div>
        ) : submitted ? (
          // 提交成功
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ThumbsUp className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              感谢您的反馈！
            </h3>
            <p className="text-text-secondary">
              您的意见将帮助我们改进AR体验
            </p>
          </div>
        ) : (
          // 反馈收集
          <div className="p-6">
            <h3 className="text-xl font-semibold text-text-primary mb-4 text-center">
              体验反馈
            </h3>
            
            <div className="mb-6">
              <p className="text-sm text-text-secondary mb-3 text-center">
                您对本次AR体验满意吗？
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setRating('good')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    rating === 'good'
                      ? 'border-success bg-green-50'
                      : 'border-border bg-white hover:border-success/50'
                  }`}
                >
                  <ThumbsUp className={`w-8 h-8 ${rating === 'good' ? 'text-success' : 'text-text-tertiary'}`} />
                  <div className="text-xs mt-2 font-medium">满意</div>
                </button>
                
                <button
                  onClick={() => setRating('bad')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    rating === 'bad'
                      ? 'border-error bg-red-50'
                      : 'border-border bg-white hover:border-error/50'
                  }`}
                >
                  <ThumbsDown className={`w-8 h-8 ${rating === 'bad' ? 'text-error' : 'text-text-tertiary'}`} />
                  <div className="text-xs mt-2 font-medium">不满意</div>
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-text-primary mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                您的建议（可选）
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="告诉我们您的想法，帮助我们改进..."
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0056b3] focus:border-transparent resize-none"
                rows={4}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-6">
              <p className="text-xs text-blue-800">
                💡 您可以建议新的功能、报告问题，或分享使用体验。您的反馈对我们非常重要！
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onConfirm}
                className="flex-1 py-3 px-4 bg-bg-secondary text-text-primary rounded-xl hover:bg-bg-tertiary transition-colors font-medium"
              >
                跳过
              </button>
              <button
                onClick={handleSubmitFeedback}
                disabled={!rating}
                className="flex-1 py-3 px-4 bg-[#0056b3] text-white rounded-xl hover:bg-[#004494] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                提交反馈
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
