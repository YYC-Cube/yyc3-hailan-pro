import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/app/components/layout/Navbar';
import { 
  Target, 
  Clock, 
  Shield, 
  Lock, 
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface QuizIntroPageProps {
  privacyMode?: boolean;
  onPrivacyToggle?: (enabled: boolean) => void;
}

export function QuizIntroPage({ privacyMode, onPrivacyToggle }: QuizIntroPageProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* 顶部导航 - 复用全局 Navbar */}
      <Navbar privacyMode={privacyMode} onPrivacyToggle={onPrivacyToggle} />

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* 标题区域 */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-[#6B46C1] to-[#ED8936] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
            <Target className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
            智能产品配对问卷
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            通过科学的问卷分析，为您精准匹配最适合的产品
          </p>
        </div>

        {/* 主要信息卡片 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          {/* 问卷特点 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-[#6B46C1]" />
              </div>
              <h3 className="font-semibold text-text-primary mb-1">5-7分钟</h3>
              <p className="text-sm text-text-secondary">快速完成测试</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-8 h-8 text-[#ED8936]" />
              </div>
              <h3 className="font-semibold text-text-primary mb-1">智能匹配</h3>
              <p className="text-sm text-text-secondary">AI精准推荐</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-8 h-8 text-success" />
              </div>
              <h3 className="font-semibold text-text-primary mb-1">隐私保护</h3>
              <p className="text-sm text-text-secondary">数据加密存储</p>
            </div>
          </div>

          {/* 分隔线 */}
          <div className="border-t border-border my-8" />

          {/* 问卷包含内容 */}
          <div className="mb-8">
            <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-[#6B46C1]" />
              问卷内容
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                '个人偏好选择',
                '重要性排序',
                '使用场景选择',
                '预算范围设定',
                '经验水平评估',
                '特殊需求说明'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-bg-secondary rounded-lg">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  <span className="text-sm text-text-primary">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 隐私说明 */}
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Lock className="w-8 h-8 text-success" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-text-primary mb-3">数据使用说明</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>您的回答仅用于产品推荐，不会用于其他目的</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>所有数据都经过AES-256加密存储在您的设备上</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>您可以随时删除或重新测试</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>我们不会将您的数据分享给第三方</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 测试说明 */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <h3 className="font-semibold text-text-primary mb-3">测试说明</h3>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li className="flex items-start gap-2">
              <span className="text-[#0056b3] font-bold">•</span>
              <span>问卷共有10道题，每题都可以跳过</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0056b3] font-bold">•</span>
              <span>请根据真实情况作答，这将帮助我们提供更精准的推荐</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0056b3] font-bold">•</span>
              <span>您可以随时返回修改之前的答案</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0056b3] font-bold">•</span>
              <span>完成后将立即获得个性化推荐报告</span>
            </li>
          </ul>
        </div>

        {/* 开始按钮 */}
        <button
          onClick={() => navigate('/quiz/questions')}
          className="w-full py-4 px-6 bg-gradient-to-r from-[#6B46C1] to-[#ED8936] text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
        >
          <span>开始测试</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-xs text-text-tertiary text-center mt-4">
          预计用时 5-7 分钟 · 随时可以暂停
        </p>
      </div>
    </div>
  );
}
