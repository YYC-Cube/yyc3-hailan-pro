import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import { BottomNav } from '@/app/components/layout/BottomNav';
import { 
  TrendingUp,
  Users,
  BookOpen,
  Heart,
  MessageSquare,
  PlusCircle,
  Award,
  Eye,
  Lock,
  AlertCircle,
  Star,
  Filter
} from 'lucide-react';

interface CommunityHomePageProps {
  privacyMode?: boolean;
  onPrivacyToggle?: (enabled: boolean) => void;
}

interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: 'knowledge' | 'experience' | 'wellness';
  author: {
    name: string;
    isExpert: boolean;
    avatar: string;
  };
  stats: {
    views: number;
    likes: number;
    comments: number;
  };
  tags: string[];
  publishedAt: string;
  featured?: boolean;
}

export function CommunityHomePage({ privacyMode, onPrivacyToggle }: CommunityHomePageProps) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: '全部', icon: Filter },
    { id: 'knowledge', label: '知识科普', icon: BookOpen },
    { id: 'experience', label: '使用经验', icon: Users },
    { id: 'wellness', label: '健康生活', icon: Heart }
  ];

  const posts: Post[] = [
    {
      id: '1',
      title: '新手选购指南：如何选择第一件产品',
      excerpt: '作为初学者，选择合适的产品非常重要。本文将从材质、功能、价格等多个维度为您详细分析...',
      category: 'knowledge',
      author: {
        name: '健康顾问 李医生',
        isExpert: true,
        avatar: ''
      },
      stats: {
        views: 12580,
        likes: 856,
        comments: 127
      },
      tags: ['新手入门', '选购指南', '产品推荐'],
      publishedAt: '2026-01-25',
      featured: true
    },
    {
      id: '2',
      title: '正确清洁和保养的重要性',
      excerpt: '很多人忽视了产品的清洁和保养，这不仅影响使用体验，还可能对健康造成影响...',
      category: 'knowledge',
      author: {
        name: '专家团队',
        isExpert: true,
        avatar: ''
      },
      stats: {
        views: 8920,
        likes: 542,
        comments: 89
      },
      tags: ['清洁保养', '健康安全', '使用技巧'],
      publishedAt: '2026-01-24',
      featured: true
    },
    {
      id: '3',
      title: '我的体验分享：从陌生到熟悉的旅程',
      excerpt: '作为一个完全的新手，我花了很长时间才找到适合自己的产品。这里分享一些我的心得...',
      category: 'experience',
      author: {
        name: '匿名用户',
        isExpert: false,
        avatar: ''
      },
      stats: {
        views: 5420,
        likes: 328,
        comments: 64
      },
      tags: ['个人经验', '新手分享', '产品评测'],
      publishedAt: '2026-01-23'
    },
    {
      id: '4',
      title: '情侣沟通：如何与伴侣讨论这个话题',
      excerpt: '很多人不知道如何与伴侣沟通这方面的需求和想法。本文分享一些实用的沟通技巧...',
      category: 'wellness',
      author: {
        name: '关系顾问 王老师',
        isExpert: true,
        avatar: ''
      },
      stats: {
        views: 7650,
        likes: 615,
        comments: 142
      },
      tags: ['情侣沟通', '关系建议', '心理健康'],
      publishedAt: '2026-01-22'
    },
    {
      id: '5',
      title: '女性健康：常见误区和正确认知',
      excerpt: '关于女性健康，社会上存在很多误区和偏见。让我们一起了解科学的知识...',
      category: 'knowledge',
      author: {
        name: '妇科专家 张医生',
        isExpert: true,
        avatar: ''
      },
      stats: {
        views: 15230,
        likes: 1124,
        comments: 203
      },
      tags: ['女性健康', '科学知识', '误区纠正'],
      publishedAt: '2026-01-20',
      featured: true
    },
    {
      id: '6',
      title: '长期使用后的感受和建议',
      excerpt: '使用了一年多，有一些心得想和大家分享。包括产品选择、使用频率、注意事项等...',
      category: 'experience',
      author: {
        name: '匿名用户',
        isExpert: false,
        avatar: ''
      },
      stats: {
        views: 4180,
        likes: 267,
        comments: 51
      },
      tags: ['长期使用', '心得分享', '使用建议'],
      publishedAt: '2026-01-19'
    }
  ];

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  const featuredPosts = posts.filter(post => post.featured);

  const handleCreatePost = () => {
    navigate('/community/create');
  };

  return (
    <div className="min-h-screen bg-bg-secondary pb-20">
      <Navbar privacyMode={privacyMode} onPrivacyToggle={onPrivacyToggle} />

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* 顶部横幅 */}
        <div className="bg-gradient-to-br from-[#0056b3] to-[#6B46C1] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-3">健康内容社区</h1>
                <p className="text-white/80 text-lg mb-6">
                  安全、专业、匿名的知识分享平台
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={handleCreatePost}
                    className="px-6 py-3 bg-white text-[#0056b3] rounded-xl hover:bg-white/90 transition-colors font-semibold flex items-center gap-2 shadow-lg"
                  >
                    <PlusCircle className="w-5 h-5" />
                    <span>发布内容</span>
                  </button>
                  <button
                    onClick={() => navigate('/community/qa')}
                    className="px-6 py-3 bg-white/10 backdrop-blur-xl text-white rounded-xl hover:bg-white/20 transition-colors font-semibold"
                  >
                    问答专区
                  </button>
                </div>
              </div>
              <div className="hidden md:block">
                <Users className="w-24 h-24 text-white/20" />
              </div>
            </div>
          </div>
        </div>

        {/* 社区规则提示 */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-[#0056b3] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-text-primary mb-2">社区规则</h3>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• 所有内容需经过审核后才能发布，确保内容健康、安全</li>
                <li>• 支持匿名发布，完全保护您的隐私</li>
                <li>• 禁止发布违法、暴力、歧视性内容</li>
                <li>• 尊重他人，理性讨论，共建友好社区</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 专家推荐 */}
        {featuredPosts.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-[#0056b3]" />
              <h2 className="text-2xl font-bold text-text-primary">专家推荐</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <FeaturedPostCard key={post.id} post={post} onClick={() => navigate(`/community/post/${post.id}`)} />
              ))}
            </div>
          </section>
        )}

        {/* 分类筛选 */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-3 rounded-xl font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#0056b3] text-white shadow-md'
                    : 'bg-white text-text-secondary border border-border hover:border-[#0056b3]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* 内容列表 */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-text-primary">
              {selectedCategory === 'all' ? '全部内容' : categories.find(c => c.id === selectedCategory)?.label}
            </h2>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <TrendingUp className="w-4 h-4" />
              <span>按热度排序</span>
            </div>
          </div>

          <div className="space-y-4">
            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <BookOpen className="w-16 h-16 text-text-tertiary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">暂无内容</h3>
                <p className="text-text-secondary mb-6">该分类下暂时没有内容</p>
                <button
                  onClick={handleCreatePost}
                  className="px-6 py-3 bg-[#0056b3] text-white rounded-xl hover:bg-[#004494] transition-colors font-medium"
                >
                  成为第一个发布者
                </button>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} onClick={() => navigate(`/community/post/${post.id}`)} />
              ))
            )}
          </div>
        </section>
      </div>

      <Footer />
      <BottomNav />
    </div>
  );
}

function FeaturedPostCard({ post, onClick }: { post: Post; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md border-2 border-[#0056b3] overflow-hidden cursor-pointer hover:shadow-xl transition-all group"
    >
      {/* 特色标识 */}
      <div className="bg-gradient-to-r from-[#0056b3] to-[#6B46C1] px-4 py-2 flex items-center gap-2">
        <Star className="w-4 h-4 text-white fill-white" />
        <span className="text-white text-sm font-semibold">专家推荐</span>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-[#0056b3] transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        {/* 作者 */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0056b3] to-[#6B46C1] flex items-center justify-center">
            <span className="text-white text-xs font-bold">
              {post.author.name.charAt(0)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-text-primary">{post.author.name}</span>
            {post.author.isExpert && (
              <Award className="w-4 h-4 text-[#0056b3]" />
            )}
          </div>
        </div>

        {/* 统计 */}
        <div className="flex items-center gap-4 text-xs text-text-tertiary">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {formatNumber(post.stats.views)}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            {formatNumber(post.stats.likes)}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            {formatNumber(post.stats.comments)}
          </span>
        </div>
      </div>
    </div>
  );
}

function PostCard({ post, onClick }: { post: Post; onClick: () => void }) {
  const categoryConfig = {
    knowledge: { label: '知识科普', color: 'blue' },
    experience: { label: '使用经验', color: 'green' },
    wellness: { label: '健康生活', color: 'purple' }
  };

  const config = categoryConfig[post.category];

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-6 shadow-sm border border-border hover:border-[#0056b3] hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex items-start gap-4">
        <div className="flex-1">
          {/* 标题 */}
          <div className="flex items-start gap-3 mb-3">
            <h3 className="text-xl font-bold text-text-primary group-hover:text-[#0056b3] transition-colors flex-1 line-clamp-2">
              {post.title}
            </h3>
            <span className={`px-3 py-1 bg-${config.color}-100 text-${config.color}-600 text-xs rounded-full font-medium whitespace-nowrap`}>
              {config.label}
            </span>
          </div>

          {/* 摘要 */}
          <p className="text-sm text-text-secondary mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
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
            {/* 作者 */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {post.author.name.charAt(0)}
                </span>
              </div>
              <span className="text-sm text-text-secondary">{post.author.name}</span>
              {post.author.isExpert && (
                <Award className="w-4 h-4 text-[#0056b3]" />
              )}
            </div>

            {/* 统计 */}
            <div className="flex items-center gap-4 text-sm text-text-tertiary">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {formatNumber(post.stats.views)}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {formatNumber(post.stats.likes)}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                {formatNumber(post.stats.comments)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatNumber(num: number): string {
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1)}w`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
}
