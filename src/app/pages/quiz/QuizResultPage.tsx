import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Star, 
  TrendingUp, 
  Award, 
  Download, 
  RotateCcw, 
  ShoppingBag,
  Lock,
  CheckCircle,
  Heart,
  Sparkles
} from 'lucide-react';

interface QuizResultPageProps {
  score?: number;
  answers?: any[];
}

interface ProductRecommendation {
  id: number;
  name: string;
  price: string;
  image: string;
  matchScore: number;
  matchReasons: string[];
  rating: number;
  category: string;
}

export function QuizResultPage({ score = 87, answers = [] }: QuizResultPageProps) {
  const navigate = useNavigate();
  const [savedResult, setSavedResult] = useState(false);

  const recommendations: ProductRecommendation[] = [
    {
      id: 1,
      name: '舒适系列 - 经典款',
      price: '¥299',
      image: '',
      matchScore: 95,
      matchReasons: [
        '符合您的预算范围',
        '适合初学者使用',
        '材质安全可靠',
        '用户评价优秀'
      ],
      rating: 4.8,
      category: '舒适系列'
    },
    {
      id: 2,
      name: '智能系列 - 基础版',
      price: '¥599',
      image: '',
      matchScore: 88,
      matchReasons: [
        '智能温控功能',
        '适合进阶使用',
        '静音设计',
        '续航时间长'
      ],
      rating: 4.9,
      category: '智能系列'
    },
    {
      id: 3,
      name: '高端系列 - 旗舰款',
      price: '¥999',
      image: '',
      matchScore: 75,
      matchReasons: [
        '多种模式选择',
        '高级材质',
        'APP智能控制',
        '全方位体验'
      ],
      rating: 4.9,
      category: '高端系列'
    }
  ];

  const personalizedReport = {
    level: '初学者',
    priorities: ['舒适度', '易用性', '性价比'],
    budgetRange: '¥200-500',
    preferences: ['安静', '易清洁', '便携'],
    suggestions: [
      '建议从基础款开始，逐步了解自己的需求',
      '重点关注材质安全和舒适度',
      '选择知名品牌，确保售后服务',
      '定期清洁保养，延长使用寿命'
    ]
  };

  const handleSaveResult = () => {
    setSavedResult(true);
    setTimeout(() => {
      alert('测试结果已加密保存到本地');
    }, 300);
  };

  const handleExportReport = () => {
    alert('个性化报告将以加密PDF格式导出');
  };

  const handleRetakeQuiz = () => {
    navigate('/quiz-intro');
  };

  return (
    <div className="min-h-screen bg-bg-secondary pb-20">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 bg-white border-b border-border shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-text-primary">测试结果</h1>
          <button
            onClick={() => navigate('/')}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            关闭
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* 匹配度分数卡片 */}
        <div className="bg-gradient-to-br from-[#0056b3] to-[#6B46C1] rounded-2xl p-8 text-white shadow-xl">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm mb-4">
              <div className="text-5xl font-bold">{score}%</div>
            </div>
            <h2 className="text-2xl font-bold mb-2">匹配度评分</h2>
            <p className="text-white/80">恭喜！我们为您找到了高度匹配的产品</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <Award className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm text-white/80">匹配等级</div>
              <div className="font-semibold">优秀</div>
            </div>
            <div className="text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm text-white/80">推荐数量</div>
              <div className="font-semibold">{recommendations.length}个</div>
            </div>
            <div className="text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm text-white/80">完成度</div>
              <div className="font-semibold">100%</div>
            </div>
          </div>
        </div>

        {/* 推荐产品列表 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-[#0056b3]" />
            <h3 className="text-xl font-bold text-text-primary">为您推荐</h3>
          </div>

          <div className="space-y-4">
            {recommendations.map((product, index) => (
              <div
                key={product.id}
                className="border border-border rounded-xl p-5 hover:border-[#0056b3] hover:shadow-md transition-all cursor-pointer group"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {/* 排名徽章 */}
                {index === 0 && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 text-xs font-bold rounded-full mb-3">
                    <Award className="w-3 h-3" />
                    <span>最佳匹配</span>
                  </div>
                )}

                <div className="flex gap-4">
                  {/* 产品图片 */}
                  <div className="w-24 h-24 bg-bg-secondary rounded-lg flex-shrink-0 flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-text-tertiary" />
                  </div>

                  {/* 产品信息 */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-text-primary group-hover:text-[#0056b3] transition-colors">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-text-tertiary">{product.category}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-warning fill-warning" />
                            <span className="text-sm font-medium">{product.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#0056b3]">{product.matchScore}%</div>
                        <div className="text-xs text-text-tertiary">匹配度</div>
                      </div>
                    </div>

                    {/* 匹配理由 */}
                    <div className="space-y-1 mb-3">
                      {product.matchReasons.slice(0, 2).map((reason, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-text-secondary">
                          <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                          <span>{reason}</span>
                        </div>
                      ))}
                    </div>

                    {/* 价格和按钮 */}
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-[#0056b3]">{product.price}</span>
                      <button className="px-4 py-2 bg-[#0056b3] text-white rounded-lg hover:bg-[#004494] transition-colors text-sm font-medium">
                        查看详情
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 个性化建议报告 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Heart className="w-5 h-5 text-error" />
            <h3 className="text-xl font-bold text-text-primary">个性化建议报告</h3>
          </div>

          <div className="space-y-6">
            {/* 基本信息 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="text-sm text-text-tertiary mb-1">经验水平</div>
                <div className="font-semibold text-text-primary">{personalizedReport.level}</div>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <div className="text-sm text-text-tertiary mb-1">预算范围</div>
                <div className="font-semibold text-text-primary">{personalizedReport.budgetRange}</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl col-span-2">
                <div className="text-sm text-text-tertiary mb-1">优先考虑</div>
                <div className="font-semibold text-text-primary">
                  {personalizedReport.priorities.join('、')}
                </div>
              </div>
            </div>

            {/* 偏好标签 */}
            <div>
              <div className="text-sm font-medium text-text-secondary mb-3">您的偏好</div>
              <div className="flex flex-wrap gap-2">
                {personalizedReport.preferences.map((pref, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-bg-secondary text-text-primary rounded-full text-sm"
                  >
                    {pref}
                  </span>
                ))}
              </div>
            </div>

            {/* 专业建议 */}
            <div>
              <div className="text-sm font-medium text-text-secondary mb-3">专业建议</div>
              <div className="space-y-2">
                {personalizedReport.suggestions.map((suggestion, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="text-[#0056b3] font-bold flex-shrink-0">{idx + 1}.</span>
                    <span>{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handleSaveResult}
            className={`py-4 px-6 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
              savedResult
                ? 'bg-success text-white'
                : 'bg-white border-2 border-border hover:border-[#0056b3] text-text-primary'
            }`}
          >
            {savedResult ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>已保存</span>
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                <span>保存结果</span>
              </>
            )}
          </button>

          <button
            onClick={handleExportReport}
            className="py-4 px-6 bg-white border-2 border-border hover:border-[#0056b3] text-text-primary rounded-xl font-medium transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            <span>导出报告</span>
          </button>

          <button
            onClick={handleRetakeQuiz}
            className="py-4 px-6 bg-[#0056b3] text-white rounded-xl hover:bg-[#004494] font-medium transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>重新测试</span>
          </button>
        </div>

        {/* 隐私说明 */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-[#0056b3] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-text-primary mb-1">隐私保护</h4>
              <p className="text-sm text-text-secondary">
                您的测试结果已加密存储在本地设备，我们不会将您的数据用于其他目的。您可以随时删除或导出这些数据。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
