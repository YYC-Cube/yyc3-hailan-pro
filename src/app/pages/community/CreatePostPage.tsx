import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ChevronLeft,
  BookOpen,
  Users,
  Heart,
  Lock,
  AlertCircle,
  Eye,
  EyeOff,
  Send,
  Save
} from 'lucide-react';

export function CreatePostPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'type' | 'edit' | 'preview'>('type');
  const [postType, setPostType] = useState<'knowledge' | 'experience' | 'wellness' | null>(null);
  const [anonymous, setAnonymous] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: [] as string[],
    category: ''
  });
  const [customTag, setCustomTag] = useState('');

  const postTypes = [
    {
      id: 'knowledge' as const,
      label: '知识科普',
      icon: BookOpen,
      description: '分享专业知识、科学信息和健康建议',
      color: 'blue',
      examples: ['产品知识', '健康科普', '使用指南']
    },
    {
      id: 'experience' as const,
      label: '使用经验',
      icon: Users,
      description: '分享个人使用心得和真实体验',
      color: 'green',
      examples: ['产品评测', '使用心得', '踩坑经验']
    },
    {
      id: 'wellness' as const,
      label: '健康生活',
      icon: Heart,
      description: '讨论健康生活方式和关系话题',
      color: 'purple',
      examples: ['情侣沟通', '心理健康', '生活方式']
    }
  ];

  const predefinedTags = {
    knowledge: ['新手入门', '选购指南', '清洁保养', '材质安全', '功能介绍', '品牌对比'],
    experience: ['产品评测', '使用心得', '真实体验', '踩坑避雷', '性价比推荐', '长期使用'],
    wellness: ['情侣沟通', '心理健康', '关系建议', '自我探索', '生活方式', '健康知识']
  };

  const handleTypeSelect = (type: typeof postType) => {
    setPostType(type);
    setFormData(prev => ({ ...prev, category: type || '' }));
    setStep('edit');
  };

  const handleAddTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 5) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
      setCustomTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('请填写标题和内容');
      return;
    }

    alert('内容已提交审核！审核通过后将自动发布。');
    navigate('/community');
  };

  const handleSaveDraft = () => {
    alert('草稿已保存');
  };

  // 内容类型选择页面
  if (step === 'type') {
    return (
      <div className="min-h-screen bg-bg-secondary">
        <header className="sticky top-0 z-10 bg-white border-b border-border shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/community')}
                className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-text-primary" />
              </button>
              <h1 className="text-lg font-semibold text-text-primary">发布新内容</h1>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-2">选择内容类型</h2>
            <p className="text-text-secondary">选择最适合您想分享的内容类型</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {postTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => handleTypeSelect(type.id)}
                  className="bg-white rounded-2xl p-6 border-2 border-border hover:border-[#0056b3] hover:shadow-lg transition-all text-left group"
                >
                  <div className={`w-16 h-16 bg-${type.color}-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-8 h-8 text-${type.color}-600`} />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-[#0056b3] transition-colors">
                    {type.label}
                  </h3>
                  <p className="text-sm text-text-secondary mb-4">
                    {type.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {type.examples.map((example, idx) => (
                      <span key={idx} className="px-2 py-1 bg-bg-secondary text-text-tertiary text-xs rounded-lg">
                        {example}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 发布须知 */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-[#0056b3] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-text-primary mb-3">发布须知</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>• 所有内容需要经过审核，通常在24小时内完成</li>
                  <li>• 请确保内容健康、科学、尊重他人</li>
                  <li>• 支持匿名发布，完全保护您的隐私</li>
                  <li>• 禁止发布违法、暴力、歧视性内容</li>
                  <li>• 保持友善，理性讨论</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 编辑页面
  if (step === 'edit' && postType) {
    const selectedType = postTypes.find(t => t.id === postType)!;
    const Icon = selectedType.icon;

    return (
      <div className="min-h-screen bg-bg-secondary">
        <header className="sticky top-0 z-10 bg-white border-b border-border shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setStep('type')}
                  className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-text-primary" />
                </button>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-${selectedType.color}-100 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 text-${selectedType.color}-600`} />
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-text-primary">{selectedType.label}</h1>
                    <p className="text-xs text-text-secondary">编写您的内容</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveDraft}
                  className="px-4 py-2 bg-bg-secondary text-text-primary rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>保存草稿</span>
                </button>
                <button
                  onClick={() => setStep('preview')}
                  className="px-4 py-2 bg-[#0056b3] text-white rounded-lg hover:bg-[#004494] transition-colors font-medium flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>预览</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
          {/* 匿名选项 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Lock className="w-6 h-6 text-[#0056b3]" />
                <div>
                  <h3 className="font-semibold text-text-primary">匿名发布</h3>
                  <p className="text-sm text-text-secondary">完全保护您的隐私身份</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0056b3]"></div>
              </label>
            </div>
          </div>

          {/* 标题 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
            <label className="block mb-2">
              <span className="text-sm font-semibold text-text-primary">标题</span>
              <span className="text-sm text-error ml-1">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="输入一个吸引人的标题（建议10-50字）"
              maxLength={50}
              className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors text-text-primary"
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-text-tertiary">清晰、准确的标题能获得更多关注</p>
              <span className="text-xs text-text-tertiary">{formData.title.length}/50</span>
            </div>
          </div>

          {/* 内容 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
            <label className="block mb-2">
              <span className="text-sm font-semibold text-text-primary">内容</span>
              <span className="text-sm text-error ml-1">*</span>
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="详细描述您想分享的内容...（支持Markdown格式）"
              rows={15}
              className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors resize-none text-text-primary"
            />
            <p className="text-xs text-text-tertiary mt-2">建议至少300字，内容越详细越有帮助</p>
          </div>

          {/* 标签选择 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
            <label className="block mb-4">
              <span className="text-sm font-semibold text-text-primary">标签</span>
              <span className="text-sm text-text-tertiary ml-2">（最多5个）</span>
            </label>

            {/* 已选标签 */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#0056b3] text-white rounded-lg text-sm flex items-center gap-2"
                  >
                    <span>#{tag}</span>
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:bg-white/20 rounded-full p-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* 预设标签 */}
            <div className="mb-4">
              <p className="text-xs text-text-secondary mb-2">推荐标签</p>
              <div className="flex flex-wrap gap-2">
                {predefinedTags[postType].map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => handleAddTag(tag)}
                    disabled={formData.tags.includes(tag) || formData.tags.length >= 5}
                    className="px-3 py-1 bg-bg-secondary text-text-secondary rounded-lg text-sm hover:bg-[#0056b3] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* 自定义标签 */}
            {formData.tags.length < 5 && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customTag}
                  onChange={(e) => setCustomTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag(customTag);
                    }
                  }}
                  placeholder="自定义标签..."
                  className="flex-1 px-4 py-2 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors text-sm"
                />
                <button
                  onClick={() => handleAddTag(customTag)}
                  disabled={!customTag.trim()}
                  className="px-4 py-2 bg-[#0056b3] text-white rounded-lg hover:bg-[#004494] transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  添加
                </button>
              </div>
            )}
          </div>

          {/* 发布前提示 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-text-secondary">
                <p className="font-semibold text-text-primary mb-1">发布前请检查</p>
                <ul className="space-y-1">
                  <li>✓ 内容准确、真实、有帮助</li>
                  <li>✓ 语言友善、尊重他人</li>
                  <li>✓ 没有违反社区规则的内容</li>
                  <li>✓ 标题和标签准确描述内容</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/community')}
              className="flex-1 py-3 px-6 bg-bg-secondary text-text-secondary rounded-xl hover:bg-gray-300 transition-colors font-medium"
            >
              取消
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 px-6 bg-[#0056b3] text-white rounded-xl hover:bg-[#004494] transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              <span>提交审核</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
