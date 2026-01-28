import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ChevronLeft,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  Award,
  Eye,
  ThumbsUp,
  Send,
  Flag,
  Lock
} from 'lucide-react';

export function PostDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(true);

  // 模拟数据
  const post = {
    id: id || '1',
    title: '新手选购指南：如何选择第一件产品',
    content: `
      <h2>引言</h2>
      <p>作为初学者，选择合适的产品非常重要。本文将从材质、功能、价格等多个维度为您详细分析如何做出明智的选择。</p>
      
      <h2>一、材质选择</h2>
      <p>产品的材质直接关系到使用的安全性和舒适度。以下是几种常见材质：</p>
      <ul>
        <li><strong>医用级硅胶</strong>：最推荐的材质，安全无毒，触感柔软，易清洁</li>
        <li><strong>ABS塑料</strong>：坚硬耐用，适合某些特定产品</li>
        <li><strong>TPE材质</strong>：柔软度好，但需要更频繁的清洁</li>
      </ul>
      
      <h2>二、功能考虑</h2>
      <p>不同的产品有不同的功能特点：</p>
      <ul>
        <li>震动强度和模式</li>
        <li>防水性能</li>
        <li>噪音水平</li>
        <li>续航能力</li>
      </ul>
      
      <h2>三、价格区间</h2>
      <p>建议新手从中等价位开始（¥200-500），这个价位的产品通常具有良好的性价比。</p>
      
      <h2>四、选购建议</h2>
      <p>1. 从简单的产品开始尝试<br/>
      2. 选择知名品牌，确保质量<br/>
      3. 注意查看用户评价<br/>
      4. 确认退换货政策</p>
      
      <h2>总结</h2>
      <p>选择适合自己的产品需要时间和尝试。不要急于求成，慢慢探索，找到最适合自己的那一款。</p>
    `,
    author: {
      name: '健康顾问 李医生',
      isExpert: true,
      bio: '从业10年的健康顾问，致力于传播正确的健康知识',
      avatar: ''
    },
    stats: {
      views: 12580,
      likes: 856,
      bookmarks: 342,
      comments: 127
    },
    tags: ['新手入门', '选购指南', '产品推荐'],
    publishedAt: '2026-01-25 10:30',
    category: {
      id: 'knowledge',
      label: '知识科普'
    }
  };

  const comments = [
    {
      id: '1',
      author: {
        name: '匿名用户 A',
        isExpert: false
      },
      content: '非常实用的文章！作为新手，这些信息对我帮助很大。',
      likes: 42,
      publishedAt: '2026-01-25 14:20',
      replies: []
    },
    {
      id: '2',
      author: {
        name: '匿名用户 B',
        isExpert: false
      },
      content: '请问医用级硅胶和普通硅胶有什么区别吗？',
      likes: 18,
      publishedAt: '2026-01-25 15:45',
      replies: [
        {
          id: '2-1',
          author: {
            name: '健康顾问 李医生',
            isExpert: true
          },
          content: '医用级硅胶经过更严格的安全测试，不含有害物质，更适合人体接触。',
          likes: 35,
          publishedAt: '2026-01-25 16:10'
        }
      ]
    },
    {
      id: '3',
      author: {
        name: '匿名用户 C',
        isExpert: false
      },
      content: '收藏了，慢慢研究！',
      likes: 12,
      publishedAt: '2026-01-25 17:30',
      replies: []
    }
  ];

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const handleShare = () => {
    alert('分享功能：生成隐私保护的分享链接');
  };

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      alert(`评论已提交审核：${commentText}`);
      setCommentText('');
    }
  };

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 bg-white border-b border-border shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/community')}
              className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-text-primary" />
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
              >
                <Share2 className="w-5 h-5 text-text-tertiary" />
              </button>
              <button className="p-2 hover:bg-bg-secondary rounded-lg transition-colors">
                <Flag className="w-5 h-5 text-text-tertiary" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 文章内容 */}
        <article className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden mb-6">
          {/* 头部信息 */}
          <div className="p-8 border-b border-border">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-[#0056b3] text-sm rounded-full font-medium">
                {post.category.label}
              </span>
              <div className="flex items-center gap-2 text-sm text-text-tertiary">
                <Eye className="w-4 h-4" />
                <span>{post.stats.views.toLocaleString()} 次浏览</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-6 leading-tight">
              {post.title}
            </h1>

            {/* 作者信息 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0056b3] to-[#6B46C1] flex items-center justify-center">
                <span className="text-white text-lg font-bold">
                  {post.author.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-text-primary">{post.author.name}</span>
                  {post.author.isExpert && (
                    <Award className="w-5 h-5 text-[#0056b3]" />
                  )}
                </div>
                <p className="text-sm text-text-secondary">{post.author.bio}</p>
              </div>
              <time className="text-sm text-text-tertiary">
                {post.publishedAt}
              </time>
            </div>
          </div>

          {/* 文章正文 */}
          <div 
            className="prose prose-lg max-w-none p-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* 标签 */}
          <div className="px-8 pb-8">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-bg-secondary text-text-secondary text-sm rounded-lg hover:bg-gray-300 cursor-pointer transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* 互动按钮 */}
          <div className="px-8 py-6 bg-bg-secondary border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    liked
                      ? 'bg-red-100 text-error'
                      : 'bg-white border border-border text-text-tertiary hover:border-error hover:text-error'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                  <span className="font-medium">{post.stats.likes + (liked ? 1 : 0)}</span>
                </button>

                <button
                  onClick={handleBookmark}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    bookmarked
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-white border border-border text-text-tertiary hover:border-yellow-600 hover:text-yellow-600'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
                  <span className="font-medium">{post.stats.bookmarks + (bookmarked ? 1 : 0)}</span>
                </button>

                <button
                  onClick={() => setShowComments(!showComments)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-border text-text-tertiary hover:border-[#0056b3] hover:text-[#0056b3] transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span className="font-medium">{post.stats.comments}</span>
                </button>
              </div>

              <button
                onClick={handleShare}
                className="px-4 py-2 bg-[#0056b3] text-white rounded-lg hover:bg-[#004494] transition-colors font-medium flex items-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                <span>分享</span>
              </button>
            </div>
          </div>
        </article>

        {/* 评论区 */}
        {showComments && (
          <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="text-2xl font-bold text-text-primary mb-2">评论 ({comments.length})</h2>
              <p className="text-sm text-text-secondary">所有评论需审核后显示</p>
            </div>

            {/* 发表评论 */}
            <div className="p-6 bg-bg-secondary border-b border-border">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">我</span>
                </div>
                <div className="flex-1">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="写下您的想法...（支持匿名评论）"
                    rows={3}
                    className="w-full px-4 py-3 bg-white border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors resize-none"
                  />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-text-tertiary" />
                      <span className="text-xs text-text-tertiary">评论将匿名发布</span>
                    </div>
                    <button
                      onClick={handleSubmitComment}
                      disabled={!commentText.trim()}
                      className="px-6 py-2 bg-[#0056b3] text-white rounded-lg hover:bg-[#004494] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>发布</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 评论列表 */}
            <div className="divide-y divide-border">
              {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CommentItem({ comment }: { comment: any }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="p-6">
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-bold">
            {comment.author.name.charAt(0)}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-text-primary">{comment.author.name}</span>
            {comment.author.isExpert && (
              <Award className="w-4 h-4 text-[#0056b3]" />
            )}
            <time className="text-xs text-text-tertiary">{comment.publishedAt}</time>
          </div>
          <p className="text-text-secondary mb-3">{comment.content}</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1 text-sm transition-colors ${
                liked ? 'text-[#0056b3]' : 'text-text-tertiary hover:text-[#0056b3]'
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
              <span>{comment.likes + (liked ? 1 : 0)}</span>
            </button>
            <button className="text-sm text-text-tertiary hover:text-[#0056b3] transition-colors">
              回复
            </button>
          </div>

          {/* 回复 */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment.replies.map((reply: any) => (
                <div key={reply.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-300 to-purple-300 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">
                      {reply.author.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-text-primary text-sm">{reply.author.name}</span>
                      {reply.author.isExpert && (
                        <Award className="w-3 h-3 text-[#0056b3]" />
                      )}
                      <time className="text-xs text-text-tertiary">{reply.publishedAt}</time>
                    </div>
                    <p className="text-sm text-text-secondary">{reply.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
