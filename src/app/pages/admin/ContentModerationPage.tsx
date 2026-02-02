import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ChevronLeft,
  Shield,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  MessageSquare,
  User,
  Clock,
  TrendingUp,
  Settings,
  Download,
  RotateCcw,
  Sparkles,
  Tag,
  List
} from 'lucide-react';

interface ContentItem {
  id: string;
  type: 'post' | 'comment' | 'qa' | 'review';
  content: string;
  author: {
    id: string;
    name: string;
    level: 'regular' | 'vip' | 'expert';
  };
  sensitivityLevel: 'high' | 'medium' | 'low';
  aiFlags: string[];
  priority: 'urgent' | 'high' | 'normal' | 'low';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNote?: string;
}

export function ContentModerationPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSensitivity, setSelectedSensitivity] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedContent, setSelectedContent] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'queue' | 'keywords' | 'history' | 'stats'>('queue');
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const contentItems: ContentItem[] = [
    {
      id: '1',
      type: 'post',
      content: '分享一些使用心得：这款产品的材质非常好，使用感受很棒...',
      author: { id: 'u001', name: '匿名用户A', level: 'regular' },
      sensitivityLevel: 'high',
      aiFlags: ['可能包含敏感词', '需要人工复核'],
      priority: 'urgent',
      status: 'pending',
      createdAt: '2026-01-26 10:30'
    },
    {
      id: '2',
      type: 'comment',
      content: '感谢分享，这个建议很实用！',
      author: { id: 'u002', name: '匿名用户B', level: 'vip' },
      sensitivityLevel: 'low',
      aiFlags: [],
      priority: 'normal',
      status: 'pending',
      createdAt: '2026-01-26 11:15'
    },
    {
      id: '3',
      type: 'qa',
      content: '请问这款产品的清洁方法是什么？',
      author: { id: 'u003', name: '匿名用户C', level: 'regular' },
      sensitivityLevel: 'low',
      aiFlags: [],
      priority: 'normal',
      status: 'pending',
      createdAt: '2026-01-26 12:00'
    },
    {
      id: '4',
      type: 'review',
      content: '产品质量不错，但包装还可以更谨慎一些...',
      author: { id: 'u004', name: '匿名用户D', level: 'expert' },
      sensitivityLevel: 'medium',
      aiFlags: ['提及隐私问题'],
      priority: 'high',
      status: 'pending',
      createdAt: '2026-01-26 13:20'
    },
    {
      id: '5',
      type: 'post',
      content: '已批准的社区内容示例',
      author: { id: 'u005', name: '匿名用户E', level: 'regular' },
      sensitivityLevel: 'low',
      aiFlags: [],
      priority: 'normal',
      status: 'approved',
      createdAt: '2026-01-25 14:00',
      reviewedBy: '管理员A',
      reviewedAt: '2026-01-25 14:30',
      reviewNote: '内容健康，符合社区规范'
    }
  ];

  const keywords = [
    { id: '1', word: '违禁词示例', category: 'prohibited', action: 'block', source: 'manual' },
    { id: '2', word: '敏感词示例', category: 'sensitive', action: 'replace', source: 'ai' },
    { id: '3', word: '提醒词示例', category: 'warning', action: 'alert', source: 'manual' }
  ];

  const typeConfig = {
    'post': { label: '社区帖子', icon: MessageSquare, color: 'blue' },
    'comment': { label: '评论', icon: MessageSquare, color: 'green' },
    'qa': { label: '问答', icon: MessageSquare, color: 'purple' },
    'review': { label: '评价', icon: Star, color: 'yellow' }
  };

  const sensitivityConfig = {
    'high': { label: '高', color: 'text-error', bg: 'bg-red-100' },
    'medium': { label: '中', color: 'text-yellow-600', bg: 'bg-yellow-100' },
    'low': { label: '低', color: 'text-success', bg: 'bg-green-100' }
  };

  const priorityConfig = {
    'urgent': { label: '紧急', color: 'text-error', bg: 'bg-red-100' },
    'high': { label: '高', color: 'text-yellow-600', bg: 'bg-yellow-100' },
    'normal': { label: '普通', color: 'text-[#0056b3]', bg: 'bg-blue-100' },
    'low': { label: '低', color: 'text-text-tertiary', bg: 'bg-gray-100' }
  };

  const filteredContent = contentItems
    .filter(item => selectedType === 'all' || item.type === selectedType)
    .filter(item => selectedSensitivity === 'all' || item.sensitivityLevel === selectedSensitivity)
    .filter(item => selectedPriority === 'all' || item.priority === selectedPriority)
    .filter(item => 
      searchQuery === '' || 
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const pendingItems = filteredContent.filter(item => item.status === 'pending');
  const aiSuspiciousItems = pendingItems.filter(item => item.aiFlags.length > 0);

  const handleApprove = (ids: string[]) => {
    alert(`批准 ${ids.length} 条内容`);
    setSelectedContent([]);
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      alert('请输入驳回原因');
      return;
    }
    alert(`驳回 ${selectedContent.length} 条内容\n原因：${rejectReason}`);
    setSelectedContent([]);
    setShowRejectDialog(false);
    setRejectReason('');
  };

  const handleFilterAISuspicious = () => {
    setSelectedContent(aiSuspiciousItems.map(item => item.id));
  };

  const rejectTemplates = [
    '内容包含敏感信息，不符合社区规范',
    '内容质量不达标，请修改后重新提交',
    '内容涉及违禁话题，无法通过审核',
    '内容表述不当，请使用更中性的语言',
    '内容可能侵犯他人隐私，请删除相关信息'
  ];

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 bg-white border-b border-border shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin-dashboard')}
                className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-text-primary" />
              </button>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-[#0056b3]" />
                <div>
                  <h1 className="text-xl font-bold text-text-primary">内容审核系统</h1>
                  <p className="text-xs text-text-secondary">合规管控 · 智能过滤</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-yellow-700">
                  {pendingItems.length} 条待审核
                </span>
              </div>
              {aiSuspiciousItems.length > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-red-100 rounded-lg">
                  <Sparkles className="w-5 h-5 text-error" />
                  <span className="font-semibold text-error">
                    {aiSuspiciousItems.length} 条AI可疑
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 py-8 space-y-6">
        {/* 标签页 */}
        <div className="bg-white rounded-2xl shadow-sm border border-border">
          <div className="flex border-b border-border">
            {[
              { id: 'queue', label: '待审核队列', icon: List },
              { id: 'keywords', label: '敏感词管理', icon: Tag },
              { id: 'history', label: '审核历史', icon: Clock },
              { id: 'stats', label: '统计报表', icon: TrendingUp }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? 'text-[#0056b3] bg-blue-50'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0056b3]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* 待审核队列 */}
          {activeTab === 'queue' && (
            <div className="p-6 space-y-6">
              {/* 筛选和操作 */}
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                  <input
                    type="text"
                    placeholder="搜索内容..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors"
                  />
                </div>

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors"
                >
                  <option value="all">全部类型</option>
                  <option value="post">社区帖子</option>
                  <option value="comment">评论</option>
                  <option value="qa">问答</option>
                  <option value="review">评价</option>
                </select>

                <select
                  value={selectedSensitivity}
                  onChange={(e) => setSelectedSensitivity(e.target.value)}
                  className="px-4 py-2 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors"
                >
                  <option value="all">全部敏感等级</option>
                  <option value="high">高</option>
                  <option value="medium">中</option>
                  <option value="low">低</option>
                </select>

                <button
                  onClick={handleFilterAISuspicious}
                  className="px-4 py-2 bg-red-100 text-error rounded-lg hover:bg-red-200 transition-colors font-medium flex items-center gap-2 whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>AI可疑内容</span>
                </button>
              </div>

              {/* 批量操作 */}
              {selectedContent.length > 0 && (
                <div className="bg-blue-50 border-2 border-[#0056b3] rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-text-primary">
                      已选择 {selectedContent.length} 条内容
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleApprove(selectedContent)}
                        className="px-4 py-2 bg-success text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>批量批准</span>
                      </button>
                      <button
                        onClick={() => setShowRejectDialog(true)}
                        className="px-4 py-2 bg-error text-white rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>批量驳回</span>
                      </button>
                      <button
                        onClick={() => setSelectedContent([])}
                        className="px-4 py-2 bg-bg-secondary text-text-secondary rounded-lg hover:bg-gray-300 transition-colors font-medium"
                      >
                        取消选择
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 内容列表 */}
              <div className="space-y-4">
                {pendingItems.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      暂无待审核内容
                    </h3>
                    <p className="text-text-secondary">所有内容都已处理完毕</p>
                  </div>
                ) : (
                  pendingItems.map((item) => (
                    <div
                      key={item.id}
                      className={`bg-white rounded-xl border-2 p-6 transition-all ${
                        item.sensitivityLevel === 'high' ? 'border-error bg-red-50' :
                        item.aiFlags.length > 0 ? 'border-yellow-500 bg-yellow-50' :
                        selectedContent.includes(item.id) ? 'border-[#0056b3] bg-blue-50' :
                        'border-border hover:border-gray-300'
                      }`}
                    >
                      <div className="flex gap-4">
                        {/* 选择框 */}
                        <input
                          type="checkbox"
                          checked={selectedContent.includes(item.id)}
                          onChange={() => {
                            if (selectedContent.includes(item.id)) {
                              setSelectedContent(selectedContent.filter(id => id !== item.id));
                            } else {
                              setSelectedContent([...selectedContent, item.id]);
                            }
                          }}
                          className="w-5 h-5 mt-1"
                        />

                        {/* 内容主体 */}
                        <div className="flex-1">
                          {/* 头部信息 */}
                          <div className="flex items-center gap-3 mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              typeConfig[item.type].color === 'blue' ? 'bg-blue-100 text-blue-600' :
                              typeConfig[item.type].color === 'green' ? 'bg-green-100 text-success' :
                              typeConfig[item.type].color === 'purple' ? 'bg-purple-100 text-purple-600' :
                              'bg-yellow-100 text-yellow-600'
                            }`}>
                              {typeConfig[item.type].label}
                            </span>

                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              sensitivityConfig[item.sensitivityLevel].bg
                            } ${sensitivityConfig[item.sensitivityLevel].color}`}>
                              敏感度: {sensitivityConfig[item.sensitivityLevel].label}
                            </span>

                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              priorityConfig[item.priority].bg
                            } ${priorityConfig[item.priority].color}`}>
                              优先级: {priorityConfig[item.priority].label}
                            </span>

                            {item.aiFlags.length > 0 && (
                              <div className="flex items-center gap-1 px-3 py-1 bg-red-100 rounded-full">
                                <Sparkles className="w-3 h-3 text-error" />
                                <span className="text-xs font-semibold text-error">AI标记</span>
                              </div>
                            )}

                            <span className="text-xs text-text-tertiary ml-auto">
                              {item.createdAt}
                            </span>
                          </div>

                          {/* AI标记 */}
                          {item.aiFlags.length > 0 && (
                            <div className="mb-3 flex flex-wrap gap-2">
                              {item.aiFlags.map((flag, index) => (
                                <span key={index} className="px-2 py-1 bg-red-100 text-error text-xs rounded-lg">
                                  🤖 {flag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* 内容 */}
                          <div className="mb-3 p-4 bg-bg-secondary rounded-lg">
                            <p className="text-text-primary">{item.content}</p>
                          </div>

                          {/* 作者信息 */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-text-secondary">
                              <User className="w-4 h-4" />
                              <span>{item.author.name}</span>
                              <span className={`px-2 py-0.5 rounded-full text-xs ${
                                item.author.level === 'expert' ? 'bg-purple-100 text-purple-600' :
                                item.author.level === 'vip' ? 'bg-yellow-100 text-yellow-600' :
                                'bg-gray-100 text-text-tertiary'
                              }`}>
                                {item.author.level === 'expert' ? '专家' :
                                 item.author.level === 'vip' ? 'VIP' : '普通'}
                              </span>
                            </div>

                            {/* 操作按钮 */}
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleApprove([item.id])}
                                className="px-4 py-2 bg-success text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center gap-2"
                              >
                                <CheckCircle className="w-4 h-4" />
                                <span>批准</span>
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedContent([item.id]);
                                  setShowRejectDialog(true);
                                }}
                                className="px-4 py-2 bg-error text-white rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center gap-2"
                              >
                                <XCircle className="w-4 h-4" />
                                <span>驳回</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* 敏感词管理 */}
          {activeTab === 'keywords' && (
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#0056b3]" />
                  <span className="text-sm text-text-secondary">
                    AI已推荐 {keywords.filter(k => k.source === 'ai').length} 个敏感词
                  </span>
                </div>
                <button className="px-4 py-2 bg-[#0056b3] text-white rounded-lg hover:bg-[#004494] transition-colors font-medium">
                  添加敏感词
                </button>
              </div>

              <div className="bg-white rounded-xl border border-border overflow-hidden">
                <div className="bg-bg-secondary px-6 py-3 border-b border-border grid grid-cols-12 gap-4 font-semibold text-sm">
                  <div className="col-span-3">关键词</div>
                  <div className="col-span-2">分类</div>
                  <div className="col-span-2">处理方式</div>
                  <div className="col-span-2">来源</div>
                  <div className="col-span-3 text-center">操作</div>
                </div>
                <div className="divide-y divide-border">
                  {keywords.map((keyword) => (
                    <div key={keyword.id} className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-bg-secondary transition-colors">
                      <div className="col-span-3 font-medium text-text-primary">
                        {keyword.word}
                      </div>
                      <div className="col-span-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          keyword.category === 'prohibited' ? 'bg-red-100 text-error' :
                          keyword.category === 'sensitive' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {keyword.category === 'prohibited' ? '违禁' :
                           keyword.category === 'sensitive' ? '敏感' : '提醒'}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-sm text-text-secondary">
                          {keyword.action === 'block' ? '拦截' :
                           keyword.action === 'replace' ? '替换' : '提醒'}
                        </span>
                      </div>
                      <div className="col-span-2">
                        {keyword.source === 'ai' ? (
                          <span className="flex items-center gap-1 text-sm text-purple-600">
                            <Sparkles className="w-4 h-4" />
                            <span>AI推荐</span>
                          </span>
                        ) : (
                          <span className="text-sm text-text-tertiary">手动添加</span>
                        )}
                      </div>
                      <div className="col-span-3 flex gap-2 justify-center">
                        <button className="px-3 py-1 bg-[#0056b3] text-white rounded-lg hover:bg-[#004494] transition-colors text-sm">
                          编辑
                        </button>
                        <button className="px-3 py-1 bg-error text-white rounded-lg hover:bg-red-600 transition-colors text-sm">
                          删除
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 审核历史 */}
          {activeTab === 'history' && (
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <select className="px-4 py-2 bg-bg-secondary border border-border rounded-lg">
                    <option>全部操作人</option>
                    <option>管理员A</option>
                    <option>管理员B</option>
                  </select>
                  <select className="px-4 py-2 bg-bg-secondary border border-border rounded-lg">
                    <option>全部内容类型</option>
                    <option>社区帖子</option>
                    <option>评论</option>
                  </select>
                </div>
                <button className="px-4 py-2 bg-bg-secondary text-text-primary rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>导出记录</span>
                </button>
              </div>

              <div className="space-y-4">
                {contentItems.filter(item => item.status !== 'pending').map((item) => (
                  <div key={item.id} className="bg-white rounded-xl border border-border p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === 'approved' ? 'bg-green-100 text-success' : 'bg-red-100 text-error'
                        }`}>
                          {item.status === 'approved' ? '已批准' : '已驳回'}
                        </span>
                        <span className="text-sm text-text-tertiary">
                          {item.reviewedBy} · {item.reviewedAt}
                        </span>
                      </div>
                      <button className="text-sm text-[#0056b3] hover:text-[#004494] font-medium flex items-center gap-1">
                        <RotateCcw className="w-4 h-4" />
                        <span>回滚</span>
                      </button>
                    </div>
                    <div className="p-4 bg-bg-secondary rounded-lg mb-3">
                      <p className="text-text-primary">{item.content}</p>
                    </div>
                    {item.reviewNote && (
                      <div className="text-sm text-text-secondary">
                        审核意见: {item.reviewNote}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 统计报表 */}
          {activeTab === 'stats' && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-[#0056b3]" />
                    </div>
                    <div>
                      <div className="text-sm text-text-secondary">今日审核量</div>
                      <div className="text-2xl font-bold text-text-primary">128</div>
                    </div>
                  </div>
                  <div className="text-xs text-success">较昨日 +15.2%</div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-sm text-text-secondary">敏感内容占比</div>
                      <div className="text-2xl font-bold text-text-primary">8.5%</div>
                    </div>
                  </div>
                  <div className="text-xs text-error">较昨日 +2.1%</div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm text-text-secondary">AI过滤准确率</div>
                      <div className="text-2xl font-bold text-text-primary">94.2%</div>
                    </div>
                  </div>
                  <div className="text-xs text-success">较上周 +3.5%</div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-border">
                <h3 className="font-bold text-text-primary mb-4">审核趋势（近7天）</h3>
                <div className="h-64 bg-bg-secondary rounded-lg flex items-center justify-center">
                  <span className="text-text-tertiary">图表展示区域</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 驳回对话框 */}
      {showRejectDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6">
            <h3 className="text-xl font-bold text-text-primary mb-4">驳回内容</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-primary mb-2">
                驳回原因（必填）
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="请输入驳回原因..."
                rows={4}
                className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors resize-none"
              />
            </div>

            <div className="mb-6">
              <div className="text-sm font-medium text-text-primary mb-2">快速模板</div>
              <div className="flex flex-wrap gap-2">
                {rejectTemplates.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => setRejectReason(template)}
                    className="px-3 py-1 bg-bg-secondary text-text-secondary rounded-lg hover:bg-[#0056b3] hover:text-white transition-colors text-sm"
                  >
                    {template}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleReject}
                className="flex-1 py-3 bg-error text-white rounded-xl hover:bg-red-600 transition-colors font-medium"
              >
                确认驳回
              </button>
              <button
                onClick={() => {
                  setShowRejectDialog(false);
                  setRejectReason('');
                }}
                className="flex-1 py-3 bg-bg-secondary text-text-secondary rounded-xl hover:bg-gray-300 transition-colors font-medium"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 导入必要的图标
import { Star } from 'lucide-react';
