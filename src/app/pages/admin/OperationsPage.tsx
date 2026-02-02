import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ChevronLeft,
  Settings,
  MessageSquare,
  Server,
  Shield,
  Users,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Eye,
  FileText,
  DollarSign,
  Search,
  Filter,
  Download,
  Phone,
  Mail,
  Star,
  BarChart3
} from 'lucide-react';

interface SystemMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  threshold: number;
}

interface CustomerServiceAgent {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'busy';
  currentChats: number;
  totalChats: number;
  responseTime: number;
  resolutionRate: number;
}

interface UserFeedback {
  id: string;
  feedbackId: string;
  type: 'order' | 'privacy' | 'product' | 'suggestion';
  title: string;
  content: string;
  userName: string;
  status: 'pending' | 'processing' | 'completed';
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
  assignedTo?: string;
}

export function OperationsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'system' | 'cs' | 'feedback' | 'finance'>('system');

  // 系统监控数据
  const systemMetrics: SystemMetric[] = [
    { id: '1', name: 'CPU使用率', value: 45, unit: '%', status: 'normal', threshold: 80 },
    { id: '2', name: '内存使用率', value: 68, unit: '%', status: 'normal', threshold: 85 },
    { id: '3', name: '磁盘使用率', value: 72, unit: '%', status: 'warning', threshold: 90 },
    { id: '4', name: '接口响应时间', value: 156, unit: 'ms', status: 'normal', threshold: 500 },
    { id: '5', name: '数据库连接数', value: 42, unit: '个', status: 'normal', threshold: 100 },
    { id: '6', name: '错误率', value: 0.3, unit: '%', status: 'normal', threshold: 1 }
  ];

  // 客服数据
  const csAgents: CustomerServiceAgent[] = [
    {
      id: '1',
      name: '客服小张',
      status: 'online',
      currentChats: 3,
      totalChats: 45,
      responseTime: 28,
      resolutionRate: 94.5
    },
    {
      id: '2',
      name: '客服小李',
      status: 'busy',
      currentChats: 5,
      totalChats: 38,
      responseTime: 35,
      resolutionRate: 92.3
    },
    {
      id: '3',
      name: '客服小王',
      status: 'offline',
      currentChats: 0,
      totalChats: 52,
      responseTime: 25,
      resolutionRate: 96.8
    }
  ];

  // 用户反馈数据
  const feedbacks: UserFeedback[] = [
    {
      id: '1',
      feedbackId: 'FB2026012601',
      type: 'privacy',
      title: '隐私包装建议',
      content: '希望包装能更加隐私，不要有任何品牌标识',
      userName: '匿名用户A',
      status: 'processing',
      priority: 'high',
      createdAt: '2026-01-26 10:30',
      assignedTo: '客服小张'
    },
    {
      id: '2',
      feedbackId: 'FB2026012602',
      type: 'order',
      title: '订单配送问题',
      content: '订单已发货3天还未收到',
      userName: '匿名用户B',
      status: 'pending',
      priority: 'high',
      createdAt: '2026-01-26 11:45'
    },
    {
      id: '3',
      feedbackId: 'FB2026012603',
      type: 'product',
      title: '产品使用咨询',
      content: '产品清洁方法是什么？',
      userName: '匿名用户C',
      status: 'completed',
      priority: 'low',
      createdAt: '2026-01-26 09:15',
      assignedTo: '客服小李'
    }
  ];

  const typeConfig = {
    order: { label: '订单问题', color: 'blue', icon: CheckCircle },
    privacy: { label: '隐私问题', color: 'purple', icon: Shield },
    product: { label: '产品问题', color: 'green', icon: Star },
    suggestion: { label: '建议', color: 'yellow', icon: MessageSquare }
  };

  const statusConfig = {
    pending: { label: '待处理', color: 'yellow' },
    processing: { label: '处理中', color: 'blue' },
    completed: { label: '已完成', color: 'green' }
  };

  const priorityConfig = {
    high: { label: '高', color: 'red' },
    medium: { label: '中', color: 'yellow' },
    low: { label: '低', color: 'green' }
  };

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
                <Settings className="w-6 h-6 text-[#0056b3]" />
                <div>
                  <h1 className="text-xl font-bold text-text-primary">运维与客服管理</h1>
                  <p className="text-xs text-text-secondary">高效支撑 · 合规响应</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-lg">
                <Activity className="w-5 h-5 text-success" />
                <span className="font-semibold text-success">系统正常</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 py-8 space-y-6">
        {/* 标签页 */}
        <div className="bg-white rounded-2xl shadow-sm border border-border">
          <div className="flex border-b border-border">
            {[
              { id: 'system', label: '系统运维', icon: Server },
              { id: 'cs', label: '客服管理', icon: MessageSquare },
              { id: 'feedback', label: '用户反馈', icon: Star },
              { id: 'finance', label: '财务协同', icon: DollarSign }
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

          {/* 系统运维 */}
          {activeTab === 'system' && (
            <div className="p-6 space-y-6">
              {/* 系统状态概览 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: '系统在线时间', value: '45天12小时', icon: Activity, color: 'green' },
                  { label: '异常告警', value: '1个', icon: AlertTriangle, color: 'yellow' },
                  { label: '今日访问量', value: '12,458', icon: TrendingUp, color: 'blue' }
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="bg-white rounded-xl p-6 border border-border">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className={`w-6 h-6 ${
                          stat.color === 'green' ? 'text-success' :
                          stat.color === 'yellow' ? 'text-yellow-600' :
                          'text-[#0056b3]'
                        }`} />
                        <span className="text-sm text-text-secondary">{stat.label}</span>
                      </div>
                      <div className="text-3xl font-bold text-text-primary">{stat.value}</div>
                    </div>
                  );
                })}
              </div>

              {/* 系统监控指标 */}
              <div className="bg-white rounded-xl border border-border p-6">
                <h3 className="font-bold text-text-primary mb-6">实时监控指标</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {systemMetrics.map((metric) => (
                    <div key={metric.id} className={`p-4 rounded-xl border-2 ${
                      metric.status === 'critical' ? 'bg-red-50 border-error' :
                      metric.status === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                      'bg-green-50 border-success'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-text-primary">{metric.name}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          metric.status === 'critical' ? 'bg-error text-white' :
                          metric.status === 'warning' ? 'bg-yellow-600 text-white' :
                          'bg-success text-white'
                        }`}>
                          {metric.status === 'critical' ? '严重' :
                           metric.status === 'warning' ? '警告' : '正常'}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-3xl font-bold text-text-primary">{metric.value}</span>
                        <span className="text-text-secondary">{metric.unit}</span>
                      </div>
                      <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            metric.status === 'critical' ? 'bg-error' :
                            metric.status === 'warning' ? 'bg-yellow-600' :
                            'bg-success'
                          }`}
                          style={{ width: `${Math.min((metric.value / metric.threshold) * 100, 100)}%` }}
                        />
                      </div>
                      <div className="text-xs text-text-tertiary mt-1">
                        阈值: {metric.threshold}{metric.unit}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 权限管理 */}
              <div className="bg-white rounded-xl border border-border p-6">
                <h3 className="font-bold text-text-primary mb-6">权限管理</h3>
                <div className="space-y-4">
                  {[
                    { role: '管理员', users: 2, permissions: '全部权限', color: 'purple' },
                    { role: '运营', users: 5, permissions: '商品、订单、内容审核', color: 'blue' },
                    { role: '财务', users: 3, permissions: '财务、佣金结算', color: 'green' },
                    { role: '客服', users: 8, permissions: '订单查询、用户反馈', color: 'yellow' }
                  ].map((role, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-bg-secondary rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          role.color === 'purple' ? 'bg-purple-100' :
                          role.color === 'blue' ? 'bg-blue-100' :
                          role.color === 'green' ? 'bg-green-100' :
                          'bg-yellow-100'
                        }`}>
                          <Users className={`w-6 h-6 ${
                            role.color === 'purple' ? 'text-purple-600' :
                            role.color === 'blue' ? 'text-[#0056b3]' :
                            role.color === 'green' ? 'text-success' :
                            'text-yellow-600'
                          }`} />
                        </div>
                        <div>
                          <div className="font-semibold text-text-primary mb-1">{role.role}</div>
                          <div className="text-sm text-text-secondary">{role.permissions}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-text-secondary mb-1">用户数</div>
                        <div className="text-xl font-bold text-text-primary">{role.users}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 客服管理 */}
          {activeTab === 'cs' && (
            <div className="p-6 space-y-6">
              {/* 客服统计 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: '在线客服', value: '6', icon: CheckCircle, color: 'green' },
                  { label: '今日接待量', value: '135', icon: MessageSquare, color: 'blue' },
                  { label: '平均响应时间', value: '29秒', icon: Clock, color: 'purple' },
                  { label: '平均解决率', value: '94.5%', icon: Star, color: 'yellow' }
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="bg-white rounded-xl p-6 border border-border">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className={`w-6 h-6 ${
                          stat.color === 'green' ? 'text-success' :
                          stat.color === 'blue' ? 'text-[#0056b3]' :
                          stat.color === 'purple' ? 'text-purple-600' :
                          'text-yellow-600'
                        }`} />
                        <span className="text-sm text-text-secondary">{stat.label}</span>
                      </div>
                      <div className="text-3xl font-bold text-text-primary">{stat.value}</div>
                    </div>
                  );
                })}
              </div>

              {/* 客服列表 */}
              <div className="bg-white rounded-xl border border-border overflow-hidden">
                <div className="bg-bg-secondary px-6 py-3 border-b border-border grid grid-cols-12 gap-4 font-semibold text-sm">
                  <div className="col-span-3">客服姓名</div>
                  <div className="col-span-2 text-center">在线状态</div>
                  <div className="col-span-2 text-center">当前接待</div>
                  <div className="col-span-2 text-center">今日接待</div>
                  <div className="col-span-2 text-center">响应时长</div>
                  <div className="col-span-1 text-center">解决率</div>
                </div>
                <div className="divide-y divide-border">
                  {csAgents.map((agent) => (
                    <div key={agent.id} className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-bg-secondary transition-colors">
                      <div className="col-span-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            agent.status === 'online' ? 'bg-success' :
                            agent.status === 'busy' ? 'bg-yellow-600' :
                            'bg-text-tertiary'
                          }`} />
                          <span className="font-semibold text-text-primary">{agent.name}</span>
                        </div>
                      </div>
                      <div className="col-span-2 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          agent.status === 'online' ? 'bg-green-100 text-success' :
                          agent.status === 'busy' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-gray-100 text-text-tertiary'
                        }`}>
                          {agent.status === 'online' ? '在线' :
                           agent.status === 'busy' ? '忙碌' : '离线'}
                        </span>
                      </div>
                      <div className="col-span-2 text-center font-semibold text-text-primary">
                        {agent.currentChats}
                      </div>
                      <div className="col-span-2 text-center font-semibold text-text-primary">
                        {agent.totalChats}
                      </div>
                      <div className="col-span-2 text-center font-semibold text-[#0056b3]">
                        {agent.responseTime}秒
                      </div>
                      <div className="col-span-1 text-center font-semibold text-success">
                        {agent.resolutionRate}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 标准回复模板 */}
              <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-bold text-text-primary mb-2">敏感问题标准回复模板</h3>
                    <p className="text-sm text-text-secondary mb-4">
                      针对隐私投诉、合规咨询等敏感问题，系统提供标准回复模板，确保响应合规
                    </p>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                      查看模板库
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 用户反馈 */}
          {activeTab === 'feedback' && (
            <div className="p-6 space-y-6">
              {/* 反馈统计 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: '待处理', value: '12', color: 'yellow' },
                  { label: '处理中', value: '8', color: 'blue' },
                  { label: '已完成', value: '45', color: 'green' },
                  { label: '平均处理时长', value: '2.5小时', color: 'purple' }
                ].map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 border border-border">
                    <div className="text-sm text-text-secondary mb-2">{stat.label}</div>
                    <div className={`text-3xl font-bold ${
                      stat.color === 'green' ? 'text-success' :
                      stat.color === 'blue' ? 'text-[#0056b3]' :
                      stat.color === 'yellow' ? 'text-yellow-600' :
                      'text-purple-600'
                    }`}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* 操作栏 */}
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                    <input
                      type="text"
                      placeholder="搜索反馈..."
                      className="pl-10 pr-4 py-2 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors w-80"
                    />
                  </div>
                  <select className="px-4 py-2 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors">
                    <option>全部类型</option>
                    <option>订单问题</option>
                    <option>隐私问题</option>
                    <option>产品问题</option>
                    <option>建议</option>
                  </select>
                  <select className="px-4 py-2 bg-bg-secondary border border-border rounded-lg outline-none focus:border-[#0056b3] transition-colors">
                    <option>全部状态</option>
                    <option>待处理</option>
                    <option>处理中</option>
                    <option>已完成</option>
                  </select>
                </div>
                <button className="px-4 py-2 bg-bg-secondary text-text-primary rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>导出</span>
                </button>
              </div>

              {/* 反馈列表 */}
              <div className="space-y-4">
                {feedbacks.map((feedback) => {
                  const TypeIcon = typeConfig[feedback.type].icon;
                  
                  return (
                    <div 
                      key={feedback.id} 
                      className={`bg-white rounded-xl border-2 p-6 ${
                        feedback.priority === 'high' ? 'border-error bg-red-50' :
                        feedback.status === 'pending' ? 'border-yellow-500 bg-yellow-50' :
                        'border-border'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-mono text-sm text-text-tertiary">{feedback.feedbackId}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                              typeConfig[feedback.type].color === 'blue' ? 'bg-blue-100 text-blue-600' :
                              typeConfig[feedback.type].color === 'purple' ? 'bg-purple-100 text-purple-600' :
                              typeConfig[feedback.type].color === 'green' ? 'bg-green-100 text-success' :
                              'bg-yellow-100 text-yellow-600'
                            }`}>
                              <TypeIcon className="w-3 h-3" />
                              {typeConfig[feedback.type].label}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              priorityConfig[feedback.priority].color === 'red' ? 'bg-red-100 text-error' :
                              priorityConfig[feedback.priority].color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-green-100 text-success'
                            }`}>
                              {priorityConfig[feedback.priority].label}优先级
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              statusConfig[feedback.status].color === 'green' ? 'bg-green-100 text-success' :
                              statusConfig[feedback.status].color === 'blue' ? 'bg-blue-100 text-[#0056b3]' :
                              'bg-yellow-100 text-yellow-600'
                            }`}>
                              {statusConfig[feedback.status].label}
                            </span>
                          </div>
                          <h3 className="font-bold text-text-primary text-lg mb-2">{feedback.title}</h3>
                          <p className="text-text-secondary mb-3">{feedback.content}</p>
                          <div className="flex items-center gap-4 text-sm text-text-tertiary">
                            <span>用户：{feedback.userName}</span>
                            <span>•</span>
                            <span>{feedback.createdAt}</span>
                            {feedback.assignedTo && (
                              <>
                                <span>•</span>
                                <span>处理人：{feedback.assignedTo}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 bg-[#0056b3] text-white rounded-lg hover:bg-[#004494] transition-colors text-sm font-medium">
                            处理
                          </button>
                          <button className="px-4 py-2 bg-bg-secondary text-text-primary rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
                            转接
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 财务协同 */}
          {activeTab === 'finance' && (
            <div className="p-6 space-y-6">
              {/* 财务统计 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: '今日收款', value: '¥45,680', icon: DollarSign, color: 'green' },
                  { label: '待结算佣金', value: '¥12,580', icon: Clock, color: 'yellow' },
                  { label: '隐私订单成本', value: '¥3,240', icon: Shield, color: 'purple' },
                  { label: '本月利润', value: '¥234,560', icon: TrendingUp, color: 'blue' }
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="bg-white rounded-xl p-6 border border-border">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className={`w-6 h-6 ${
                          stat.color === 'green' ? 'text-success' :
                          stat.color === 'yellow' ? 'text-yellow-600' :
                          stat.color === 'purple' ? 'text-purple-600' :
                          'text-[#0056b3]'
                        }`} />
                        <span className="text-sm text-text-secondary">{stat.label}</span>
                      </div>
                      <div className="text-3xl font-bold text-text-primary">{stat.value}</div>
                    </div>
                  );
                })}
              </div>

              {/* 财务报表 */}
              <div className="bg-white rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-text-primary">财务报表</h3>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-bg-secondary text-text-primary rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      <span>导出报表</span>
                    </button>
                    <button className="px-4 py-2 bg-[#0056b3] text-white rounded-lg hover:bg-[#004494] transition-colors text-sm font-medium flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>一键对账</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { item: '订单收款', amount: '+¥45,680', type: 'income' },
                    { item: '订单退款', amount: '-¥3,450', type: 'expense' },
                    { item: '佣金结算', amount: '-¥12,580', type: 'expense' },
                    { item: '隐私物流成本', amount: '-¥3,240', type: 'expense' },
                    { item: '隐私包装成本', amount: '-¥890', type: 'expense' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-bg-secondary rounded-lg">
                      <span className="font-medium text-text-primary">{item.item}</span>
                      <span className={`text-xl font-bold ${
                        item.type === 'income' ? 'text-success' : 'text-error'
                      }`}>
                        {item.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 隐私订单成本分析 */}
              <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-bold text-text-primary mb-2">隐私订单成本分析</h3>
                    <p className="text-sm text-text-secondary mb-4">
                      本月隐私订单物流+包装成本：¥4,130，占总成本8.5%
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-sm text-text-secondary mb-1">物流成本</div>
                        <div className="text-2xl font-bold text-purple-600">¥3,240</div>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-sm text-text-secondary mb-1">包装成本</div>
                        <div className="text-2xl font-bold text-purple-600">¥890</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
