import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft,
  HelpCircle,
  PlusCircle,
  Award,
  CheckCircle,
  MessageSquare,
  TrendingUp,
  Clock,
  Filter,
  ThumbsUp,
  Search
} from 'lucide-react';

interface Question {
  id: string;
  title: string;
  content: string;
  category: string;
  author: {
    name: string;
    isExpert: boolean;
  };
  stats: {
    answers: number;
    views: number;
    votes: number;
  };
  hasAcceptedAnswer: boolean;
  publishedAt: string;
  tags: string[];
}

export function QAPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'hot' | 'unanswered'>('hot');

  const categories = [
    { id: 'all', label: '全部问题' },
    { id: 'product', label: '产品选购' },
    { id: 'usage', label: '使用方法' },
    { id: 'health', label: '健康安全' },
    { id: 'relationship', label: '关系沟通' }
  ];

  const questions: Question[] = [
    {
      id: '1',
      title: '第一次购买应该选择什么样的产品？',
      content: '完全是新手，不知道从哪里开始。希望能得到一些专业建议...',
      category: 'product',
      author: {
        name: '匿名用户',
        isExpert: false
      },
      stats: {
        answers: 8,
        views: 542,
        votes: 23
      },
      hasAcceptedAnswer: true,
      publishedAt: '2026-01-25',
      tags: ['新手', '选购', '入门']
    },
    {
      id: '2',
      title: '如何清洁和保养产品？具体步骤是什么？',
      content: '买了产品但不太清楚怎么正确清洁，担心清洁不当会影响使用寿命...',
      category: 'usage',
      author: {
        name: '匿名用户',
        isExpert: false
      },
      stats: {
        answers: 5,
        views: 328,
        votes: 15
      },
      hasAcceptedAnswer: true,
      publishedAt: '2026-01-24',
      tags: ['清洁', '保养', '使用']
    },
    {
      id: '3',
      title: '使用过程中有不适感是正常的吗？',
      content: '第一次使用时感觉有点不适，不确定是不是正常现象...',
      category: 'health',
      author: {
        name: '匿名用户',
        isExpert: false
      },
      stats: {
        answers: 12,
        views: 856,
        votes: 34
      },
      hasAcceptedAnswer: true,
      publishedAt: '2026-01-23',
      tags: ['健康', '使用感受', '注意事项']
    },
    {
      id: '4',
      title: '如何和伴侣讨论这方面的话题？',
      content: '想和伴侣沟通但不知道怎么开口，担心会尴尬...',
      category: 'relationship',
      author: {
        name: '匿名用户',
        isExpert: false
      },
      stats: {
        answers: 15,
        views: 1234,
        votes: 67
      },
      hasAcceptedAnswer: true,
      publishedAt: '2026-01-22',
      tags: ['沟通', '情侣', '建议']
    },
    {
      id: '5',
      title: '充电式和电池式哪个更好？',
      content: '在考虑购买，不知道选择充电式还是电池式...',
      category: 'product',
      author: {
        name: '匿名用户',
        isExpert: false
      },
      stats: {
        answers: 0,
        views: 128,
        votes: 5
      },
      hasAcceptedAnswer: false,
      publishedAt: '2026-01-26',
      tags: ['选购', '对比', '建议']
    }
  ];

  const filteredQuestions = questions
    .filter(q => selectedCategory === 'all' || q.category === selectedCategory)
    .filter(q => 
      searchQuery === '' || 
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      } else if (sortBy === 'hot') {
        return b.stats.votes - a.stats.votes;
      } else { // unanswered
        return a.stats.answers - b.stats.answers;
      }
    });

  const handleAskQuestion = () => {
    navigate('/community/ask');
  };

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 bg-white border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/community')}
                className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-text-primary" />
              </button>
              <div className="flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-[#0056b3]" />
                <div>
                  <h1 className="text-lg font-semibold text-text-primary">问答专区</h1>
                  <p className="text-xs text-text-secondary">专业解答，互助成长</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleAskQuestion}
              className="px-6 py-3 bg-[#0056b3] text-white rounded-xl hover:bg-[#004494] transition-colors font-semibold flex items-center gap-2"
            >
              <PlusCircle className="w-5 h-5" />
              <span>提问</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* 搜索栏 */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
          <input
            type="text"
            placeholder="搜索问题..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-border focus:border-[#0056b3] rounded-xl outline-none transition-colors text-text-primary"
          />
        </div>

        {/* 统计信息 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-border">
            <div className="text-2xl font-bold text-text-primary mb-1">{questions.length}</div>
            <div className="text-sm text-text-secondary">总问题</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-border">
            <div className="text-2xl font-bold text-success mb-1">
              {questions.filter(q => q.hasAcceptedAnswer).length}
            </div>
            <div className="text-sm text-text-secondary">已解决</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-border">
            <div className="text-2xl font-bold text-yellow-600 mb-1">
              {questions.filter(q => !q.hasAcceptedAnswer && q.stats.answers > 0).length}
            </div>
            <div className="text-sm text-text-secondary">待解决</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-border">
            <div className="text-2xl font-bold text-error mb-1">
              {questions.filter(q => q.stats.answers === 0).length}
            </div>
            <div className="text-sm text-text-secondary">无回答</div>
          </div>
        </div>

        {/* 分类和排序 */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* 分类筛选 */}
          <div className="flex gap-2 overflow-x-auto pb-2 flex-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-[#0056b3] text-white shadow-md'
                    : 'bg-white text-text-secondary border border-border hover:border-[#0056b3]'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* 排序 */}
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('hot')}
              className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                sortBy === 'hot'
                  ? 'bg-[#0056b3] text-white'
                  : 'bg-white text-text-secondary border border-border'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>最热</span>
            </button>
            <button
              onClick={() => setSortBy('latest')}
              className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                sortBy === 'latest'
                  ? 'bg-[#0056b3] text-white'
                  : 'bg-white text-text-secondary border border-border'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>最新</span>
            </button>
            <button
              onClick={() => setSortBy('unanswered')}
              className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                sortBy === 'unanswered'
                  ? 'bg-[#0056b3] text-white'
                  : 'bg-white text-text-secondary border border-border'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>待回答</span>
            </button>
          </div>
        </div>

        {/* 问题列表 */}
        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center">
              <HelpCircle className="w-16 h-16 text-text-tertiary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">暂无问题</h3>
              <p className="text-text-secondary mb-6">
                {searchQuery ? '没有找到相关问题' : '还没有人提问'}
              </p>
              <button
                onClick={handleAskQuestion}
                className="px-6 py-3 bg-[#0056b3] text-white rounded-xl hover:bg-[#004494] transition-colors font-medium"
              >
                提出第一个问题
              </button>
            </div>
          ) : (
            filteredQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                onClick={() => navigate(`/community/question/${question.id}`)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function QuestionCard({ question, onClick }: { question: Question; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-6 shadow-sm border border-border hover:border-[#0056b3] hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex items-start gap-4">
        {/* 投票区 */}
        <div className="flex flex-col items-center gap-2 min-w-[60px]">
          <button className="p-2 hover:bg-bg-secondary rounded-lg transition-colors">
            <ThumbsUp className="w-5 h-5 text-text-tertiary" />
          </button>
          <div className="text-lg font-bold text-text-primary">{question.stats.votes}</div>
          <div className="text-xs text-text-tertiary">投票</div>
        </div>

        {/* 问题内容 */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-text-primary group-hover:text-[#0056b3] transition-colors flex-1 pr-4 line-clamp-2">
              {question.title}
            </h3>
            {question.hasAcceptedAnswer && (
              <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-success rounded-full text-sm font-semibold whitespace-nowrap">
                <CheckCircle className="w-4 h-4" />
                <span>已解决</span>
              </div>
            )}
            {!question.hasAcceptedAnswer && question.stats.answers === 0 && (
              <div className="px-3 py-1 bg-red-100 text-error rounded-full text-sm font-semibold whitespace-nowrap">
                待回答
              </div>
            )}
          </div>

          <p className="text-sm text-text-secondary mb-4 line-clamp-2">
            {question.content}
          </p>

          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {question.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-bg-secondary text-text-tertiary text-xs rounded-lg"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* 底部信息 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {question.author.name.charAt(0)}
                </span>
              </div>
              <span className="text-sm text-text-secondary">{question.author.name}</span>
              {question.author.isExpert && (
                <Award className="w-4 h-4 text-[#0056b3]" />
              )}
              <span className="text-xs text-text-tertiary">• {question.publishedAt}</span>
            </div>

            <div className="flex items-center gap-4 text-sm text-text-tertiary">
              <span className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                {question.stats.answers} 回答
              </span>
              <span>{question.stats.views} 浏览</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
