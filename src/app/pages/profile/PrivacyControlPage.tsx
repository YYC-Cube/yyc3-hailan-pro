import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft,
  Shield,
  Lock,
  Eye,
  EyeOff,
  Download,
  Trash2,
  Database,
  Bell,
  Smartphone,
  AlertCircle,
  CheckCircle,
  Calendar,
  HardDrive
} from 'lucide-react';

export function PrivacyControlPage() {
  const navigate = useNavigate();
  const [dataStats, setDataStats] = useState({
    totalSize: '2.3 MB',
    itemCount: 127,
    lastBackup: '2026-01-25',
    retentionDays: 30
  });

  const [privacySettings, setPrivacySettings] = useState({
    contentBlur: true,
    discreetNotifications: true,
    autoDeleteHistory: true,
    biometricLock: false,
    dataEncryption: true,
    thirdPartySharing: false
  });

  const toggleSetting = (key: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleExportData = () => {
    alert('数据导出请求已提交，我们将在24小时内发送加密文件到您的邮箱');
  };

  const handleDeleteHistory = (type: string) => {
    if (confirm(`确定要删除${type}吗？此操作无法撤销。`)) {
      alert(`${type}已删除`);
    }
  };

  const handleDeleteAccount = () => {
    navigate('/profile/delete-account');
  };

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
              <h1 className="text-lg font-semibold text-text-primary">隐私控制中心</h1>
              <p className="text-xs text-text-secondary">全面管理您的隐私和数据</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* 数据管理仪表板 */}
        <div className="bg-gradient-to-br from-[#0056b3] to-[#6B46C1] rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-6 h-6" />
            <h2 className="text-xl font-bold">数据管理仪表板</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4">
              <HardDrive className="w-6 h-6 mb-2" />
              <div className="text-2xl font-bold mb-1">{dataStats.totalSize}</div>
              <div className="text-white/80 text-xs">数据大小</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4">
              <Database className="w-6 h-6 mb-2" />
              <div className="text-2xl font-bold mb-1">{dataStats.itemCount}</div>
              <div className="text-white/80 text-xs">数据项</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4">
              <Calendar className="w-6 h-6 mb-2" />
              <div className="text-2xl font-bold mb-1">{dataStats.retentionDays}天</div>
              <div className="text-white/80 text-xs">保留期限</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4">
              <CheckCircle className="w-6 h-6 mb-2" />
              <div className="text-lg font-bold mb-1">{dataStats.lastBackup}</div>
              <div className="text-white/80 text-xs">最后备份</div>
            </div>
          </div>
        </div>

        {/* 隐私设置 */}
        <div className="bg-white rounded-2xl shadow-sm border border-border">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-[#0056b3]" />
              <h2 className="text-xl font-bold text-text-primary">隐私设置</h2>
            </div>
            <p className="text-sm text-text-secondary mt-2">
              调整这些设置以控制您的隐私保护级别
            </p>
          </div>

          <div className="divide-y divide-border">
            <PrivacyToggleItem
              icon={Eye}
              title="内容自动模糊"
              description="在公共场合自动模糊敏感内容"
              enabled={privacySettings.contentBlur}
              onToggle={() => toggleSetting('contentBlur')}
            />
            <PrivacyToggleItem
              icon={Bell}
              title="谨慎通知"
              description="通知消息不显示具体内容"
              enabled={privacySettings.discreetNotifications}
              onToggle={() => toggleSetting('discreetNotifications')}
            />
            <PrivacyToggleItem
              icon={Trash2}
              title="自动删除历史"
              description={`浏览历史在${dataStats.retentionDays}天后自动删除`}
              enabled={privacySettings.autoDeleteHistory}
              onToggle={() => toggleSetting('autoDeleteHistory')}
            />
            <PrivacyToggleItem
              icon={Smartphone}
              title="生物识别锁定"
              description="使用指纹或面部识别验证敏感操作"
              enabled={privacySettings.biometricLock}
              onToggle={() => toggleSetting('biometricLock')}
            />
            <PrivacyToggleItem
              icon={Lock}
              title="数据加密"
              description="本地数据使用端到端加密"
              enabled={privacySettings.dataEncryption}
              onToggle={() => toggleSetting('dataEncryption')}
              recommended
            />
            <PrivacyToggleItem
              icon={AlertCircle}
              title="第三方数据共享"
              description="允许与合作伙伴共享匿名数据"
              enabled={privacySettings.thirdPartySharing}
              onToggle={() => toggleSetting('thirdPartySharing')}
              warning
            />
          </div>
        </div>

        {/* 数据管理工具 */}
        <div className="bg-white rounded-2xl shadow-sm border border-border">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-[#0056b3]" />
              <h2 className="text-xl font-bold text-text-primary">数据管理</h2>
            </div>
          </div>

          <div className="divide-y divide-border">
            <DataManagementItem
              icon={Download}
              title="导出数据"
              description="下载您的所有个人数据副本（加密格式）"
              buttonText="导出数据"
              onClick={handleExportData}
            />
            <DataManagementItem
              icon={Trash2}
              title="清除浏览历史"
              description="删除所有浏览和搜索记录"
              buttonText="立即清除"
              onClick={() => handleDeleteHistory('浏览历史')}
              warning
            />
            <DataManagementItem
              icon={Trash2}
              title="清除订单历史"
              description="删除已完成和已取消的订单记录"
              buttonText="立即清除"
              onClick={() => handleDeleteHistory('订单历史')}
              warning
            />
            <DataManagementItem
              icon={Database}
              title="清除缓存数据"
              description="删除应用缓存以释放空间"
              buttonText="清除缓存"
              onClick={() => handleDeleteHistory('缓存数据')}
            />
          </div>
        </div>

        {/* 账户删除 */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-error" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-error text-lg mb-2">删除账户</h3>
              <p className="text-sm text-text-secondary mb-4">
                删除账户将永久删除您的所有数据，包括订单历史、收藏、偏好设置等。此操作无法撤销。
              </p>
              <button
                onClick={handleDeleteAccount}
                className="px-6 py-3 bg-error text-white rounded-xl hover:bg-red-600 transition-colors font-medium"
              >
                删除我的账户
              </button>
            </div>
          </div>
        </div>

        {/* 隐私政策 */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-[#0056b3] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-text-primary mb-1">我们的承诺</h4>
              <p className="text-sm text-text-secondary mb-3">
                海蓝承诺保护您的隐私。我们不会在未经您同意的情况下出售、出租或共享您的个人信息。
                所有数据传输均经过加密，本地存储使用端到端加密。
              </p>
              <button className="text-sm text-[#0056b3] hover:text-[#004494] font-medium">
                阅读完整隐私政策 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrivacyToggleItem({ 
  icon: Icon, 
  title, 
  description, 
  enabled, 
  onToggle,
  recommended = false,
  warning = false
}: { 
  icon: any; 
  title: string; 
  description: string; 
  enabled: boolean; 
  onToggle: () => void;
  recommended?: boolean;
  warning?: boolean;
}) {
  return (
    <div className="p-5 flex items-center justify-between hover:bg-bg-secondary transition-colors">
      <div className="flex items-start gap-4 flex-1">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          warning ? 'bg-yellow-100' : 'bg-blue-100'
        }`}>
          <Icon className={`w-5 h-5 ${warning ? 'text-yellow-600' : 'text-[#0056b3]'}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-text-primary">{title}</h3>
            {recommended && (
              <span className="px-2 py-0.5 bg-green-100 text-success text-xs rounded-full font-medium">
                推荐
              </span>
            )}
            {warning && (
              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                不推荐
              </span>
            )}
          </div>
          <p className="text-sm text-text-secondary">{description}</p>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer ml-4">
        <input 
          type="checkbox" 
          className="sr-only peer" 
          checked={enabled}
          onChange={onToggle}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0056b3]"></div>
      </label>
    </div>
  );
}

function DataManagementItem({
  icon: Icon,
  title,
  description,
  buttonText,
  onClick,
  warning = false
}: {
  icon: any;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  warning?: boolean;
}) {
  return (
    <div className="p-5 flex items-center justify-between hover:bg-bg-secondary transition-colors">
      <div className="flex items-start gap-4 flex-1">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          warning ? 'bg-red-100' : 'bg-gray-100'
        }`}>
          <Icon className={`w-5 h-5 ${warning ? 'text-error' : 'text-text-tertiary'}`} />
        </div>
        <div>
          <h3 className="font-semibold text-text-primary mb-1">{title}</h3>
          <p className="text-sm text-text-secondary">{description}</p>
        </div>
      </div>
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ml-4 ${
          warning
            ? 'bg-red-100 text-error hover:bg-red-200'
            : 'bg-bg-secondary text-text-primary border border-border hover:border-[#0056b3]'
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
}
