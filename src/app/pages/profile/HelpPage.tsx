import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ChevronLeft,
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  Search,
  ChevronRight,
  Book,
  Video,
  FileText,
  Send,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

export function HelpPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const categories = [
    {
      id: 'order',
      title: '订单相关',
      icon: Package,
      color: 'blue',
      faqs: [
        { q: '如何查看订单状态？', a: '您可以在"订单管理"页面查看所有订单的实时状态...' },
        { q: '订单可以取消吗？', a: '未发货的订单可以随时取消。已发货的订单需要联系客服...' },
        { q: '如何修改配送地址？', a: '订单发货前，您可以在订单详情页修改配送地址...' }
      ]
    },
    {
      id: 'privacy',
      title: '隐私与安全',
      icon: Shield,
      color: 'purple',
      faqs: [
        { q: '我的数据会被分享给第三方吗？', a: '我们承诺不会在未经您同意的情况下分享您的数据...' },
        { q: '如何启用隐私模式？', a: '在"隐私控制中心"可以启用和配置隐私保护功能...' },
        { q: '包裹包装是否谨慎？', a: '所有包裹使用无标识的普通包装箱，完全保护您的隐私...' }
      ]
    },
    {
      id: 'product',
      title: '产品使用',
      icon: HelpCircle,
      color: 'green',
      faqs: [
        { q: '如何选择适合自己的产品？', a: '您可以使用我们的"智能配对问卷"获得个性化推荐...' },
        { q: '产品的材质安全吗？', a: '我们所有产品均符合国际安全标准，使用医用级材质...' },
        { q: '如何清洁和保养产品？', a: '每个产品都附带详细的清洁和保养说明书...' }
      ]
    },
    {
      id: 'payment',
      title: '支付与退款',
      icon: CreditCard,
      color: 'yellow',
      faqs: [
        { q: '支持哪些支付方式？', a: '我们支持信用卡、支付宝、微信支付等多种支付方式...' },
        { q: '退款需要多久到账？', a: '退款将在3-7个工作日内原路返回...' },
        { q: '可以使用优惠券吗？', a: '是的，在结算时可以使用优惠券和积分抵扣...' }
      ]
    },
    {
      id: 'delivery',
      title: '配送问题',
      icon: Truck,
      color: 'red',
      faqs: [
        { q: '配送需要多长时间？', a: '一般3-5个工作日送达，偏远地区可能需要更长时间...' },
        { q: '可以指定配送时间吗？', a: '是的，您可以在"偏好设置"中设置首选配送时间段...' },
        { q: '如何追踪物流？', a: '订单发货后，您将收到物流单号，可以实时追踪包裹位置...' }
      ]
    },
    {
      id: 'account',
      title: '账户管理',
      icon: User,
      color: 'gray',
      faqs: [
        { q: '如何修改个人信息？', a: '在"账户设置"页面可以修改您的个人信息...' },
        { q: '忘记密码怎么办？', a: '点击登录页的"忘记密码"，通过邮箱或短信重置...' },
        { q: '如何删除账户？', a: '在"隐私控制中心"可以申请删除账户，此操作不可撤销...' }
      ]
    }
  ];

  const contactMethods = [
    {
      id: 'chat',
      title: '在线客服',
      description: '工作时间：9:00-21:00',
      icon: MessageSquare,
      color: 'blue',
      action: () => alert('正在连接客服...')
    },
    {
      id: 'phone',
      title: '电话支持',
      description: '400-123-4567',
      icon: Phone,
      color: 'green',
      action: () => alert('拨打：400-123-4567')
    },
    {
      id: 'email',
      title: '邮件支持',
      description: 'support@hailan.com',
      icon: Mail,
      color: 'purple',
      action: () => alert('发送邮件到：support@hailan.com')
    }
  ];

  const tutorials = [
    {
      id: 'getting-started',
      title: '新手入门指南',
      duration: '5分钟',
      type: 'video',
      icon: Video
    },
    {
      id: 'privacy-setup',
      title: '隐私设置教程',
      duration: '3分钟',
      type: 'article',
      icon: Book
    },
    {
      id: 'ar-guide',
      title: 'AR体验使用指南',
      duration: '4分钟',
      type: 'video',
      icon: Video
    },
    {
      id: 'quiz-guide',
      title: '智能配对问卷指南',
      duration: '2分钟',
      type: 'article',
      icon: Book
    }
  ];

  const filteredCategories = searchQuery
    ? categories.filter(cat =>
        cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.faqs.some(faq =>
          faq.q.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : categories;

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 bg-white border-b border-border shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/profile/center')}
              className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-text-primary" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-text-primary">帮助与支持</h1>
              <p className="text-xs text-text-secondary">我们随时为您服务</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* 搜索栏 */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
          <input
            type="text"
            placeholder="搜索常见问题..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-border focus:border-[#0056b3] rounded-xl outline-none transition-colors text-text-primary"
          />
        </div>

        {/* 联系客服 */}
        <section className="bg-gradient-to-br from-[#0056b3] to-[#6B46C1] rounded-2xl p-6 text-white">
          <h2 className="text-xl font-bold mb-2">需要帮助？</h2>
          <p className="text-white/80 mb-6">选择最适合您的联系方式</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={method.action}
                  className="bg-white/10 backdrop-blur-xl hover:bg-white/20 rounded-xl p-4 text-left transition-all group"
                >
                  <Icon className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-1">{method.title}</h3>
                  <p className="text-sm text-white/80">{method.description}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* 使用教程 */}
        <section className="bg-white rounded-2xl shadow-sm border border-border">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <Book className="w-6 h-6 text-[#0056b3]" />
              <h2 className="text-xl font-bold text-text-primary">使用教程</h2>
            </div>
          </div>
          <div className="divide-y divide-border">
            {tutorials.map((tutorial) => {
              const Icon = tutorial.icon;
              return (
                <button
                  key={tutorial.id}
                  className="w-full p-5 flex items-center gap-4 hover:bg-bg-secondary transition-colors group"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-[#0056b3]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-text-primary group-hover:text-[#0056b3] transition-colors">
                      {tutorial.title}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {tutorial.type === 'video' ? '视频教程' : '图文教程'} · {tutorial.duration}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:text-[#0056b3] transition-colors" />
                </button>
              );
            })}
          </div>
        </section>

        {/* 常见问题分类 */}
        <section>
          <h2 className="text-xl font-bold text-text-primary mb-4">常见问题</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {filteredCategories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(isSelected ? null : category.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-[#0056b3] bg-blue-50 shadow-md'
                      : 'border-border bg-white hover:border-[#0056b3] hover:shadow-sm'
                  }`}
                >
                  <Icon className={`w-8 h-8 mb-2 ${
                    isSelected ? 'text-[#0056b3]' : 'text-text-tertiary'
                  }`} />
                  <h3 className={`font-semibold text-sm ${
                    isSelected ? 'text-[#0056b3]' : 'text-text-primary'
                  }`}>
                    {category.title}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* 问题列表 */}
          {selectedCategory && (
            <div className="bg-white rounded-2xl shadow-sm border border-border">
              {categories
                .find(cat => cat.id === selectedCategory)
                ?.faqs.map((faq, index) => (
                  <FAQItem key={index} question={faq.q} answer={faq.a} />
                ))}
            </div>
          )}
        </section>

        {/* 反馈提交 */}
        <section className="bg-white rounded-2xl shadow-sm border border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <Send className="w-6 h-6 text-[#0056b3]" />
            <h2 className="text-xl font-bold text-text-primary">提交反馈</h2>
          </div>
          <p className="text-text-secondary mb-6">
            没有找到答案？告诉我们您遇到的问题，我们会尽快回复
          </p>
          {!showFeedbackForm ? (
            <button
              onClick={() => setShowFeedbackForm(true)}
              className="w-full py-3 px-4 bg-[#0056b3] text-white rounded-xl hover:bg-[#004494] transition-colors font-medium"
            >
              写反馈
            </button>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  问题类型
                </label>
                <select className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors">
                  <option>选择问题类型</option>
                  <option>订单问题</option>
                  <option>产品问题</option>
                  <option>技术问题</option>
                  <option>其他</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  详细描述
                </label>
                <textarea
                  rows={4}
                  placeholder="请详细描述您遇到的问题..."
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors resize-none"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    alert('反馈已提交，我们会尽快回复');
                    setShowFeedbackForm(false);
                  }}
                  className="flex-1 py-3 px-4 bg-[#0056b3] text-white rounded-xl hover:bg-[#004494] transition-colors font-medium"
                >
                  提交反馈
                </button>
                <button
                  onClick={() => setShowFeedbackForm(false)}
                  className="flex-1 py-3 px-4 bg-bg-secondary text-text-secondary rounded-xl hover:bg-gray-300 transition-colors font-medium"
                >
                  取消
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

// 导入必要的图标
import { Package, Shield, User, CreditCard, Truck } from 'lucide-react';

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [helpful, setHelpful] = useState<boolean | null>(null);

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-start justify-between hover:bg-bg-secondary transition-colors text-left"
      >
        <div className="flex-1">
          <h3 className="font-semibold text-text-primary pr-4">{question}</h3>
          {isOpen && (
            <p className="text-sm text-text-secondary mt-3 leading-relaxed">{answer}</p>
          )}
        </div>
        <ChevronRight className={`w-5 h-5 text-text-tertiary flex-shrink-0 transition-transform ${
          isOpen ? 'rotate-90' : ''
        }`} />
      </button>
      {isOpen && (
        <div className="px-5 pb-5">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <span>这个回答有帮助吗？</span>
            <button
              onClick={() => setHelpful(true)}
              className={`p-2 rounded-lg transition-colors ${
                helpful === true
                  ? 'bg-green-100 text-success'
                  : 'bg-bg-secondary text-text-tertiary hover:bg-green-50'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => setHelpful(false)}
              className={`p-2 rounded-lg transition-colors ${
                helpful === false
                  ? 'bg-red-100 text-error'
                  : 'bg-bg-secondary text-text-tertiary hover:bg-red-50'
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
