import React, { useState } from 'react';
import { toast } from 'sonner';
import { 
  X, 
  Shield, 
  Clock, 
  Download, 
  Trash2,
  AlertTriangle,
  CheckCircle,
  Lock
} from 'lucide-react';

interface PrivacyControlPanelProps {
  onClose: () => void;
}

export function PrivacyControlPanel({ onClose }: PrivacyControlPanelProps) {
  const [saveConversations, setSaveConversations] = useState(false);
  const [autoDeleteDays, setAutoDeleteDays] = useState('30');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleExportData = () => {
    // 模拟导出功能
    // 真实场景：生成JSON文件并触发下载
    toast.success('导出准备就绪', {
      description: '对话数据已加密并保存到您的设备',
      icon: <Download className="w-4 h-4 text-green-500" />,
    });
  };

  const handleDeleteAll = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    // 模拟删除功能
    toast.success('数据已清除', {
      description: '所有对话历史和设置已永久删除',
      icon: <Trash2 className="w-4 h-4 text-red-500" />,
    });
    setShowDeleteConfirm(false);
    onClose();
  };

  return (
    <>
      {/* 遮罩层 */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 animate-fadeIn"
        onClick={onClose}
      />

      {/* 面板内容 */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto animate-slideIn">
        {/* 头部 */}
        <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#0056b3]" />
            <h2 className="text-lg font-semibold text-text-primary">隐私控制</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        {/* 设置内容 */}
        <div className="p-6 space-y-6">
          {/* 对话数据保存设置 */}
          <div className="bg-white border border-border rounded-xl p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-text-primary mb-1">保存对话历史</h3>
                <p className="text-sm text-text-secondary">
                  启用后，您的对话将被加密保存在本地设备上
                </p>
              </div>
              <button
                onClick={() => setSaveConversations(!saveConversations)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${saveConversations ? 'bg-[#0056b3]' : 'bg-gray-300'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${saveConversations ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>
            {saveConversations && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg flex items-start gap-2">
                <Lock className="w-4 h-4 text-[#0056b3] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-800">
                  对话数据使用AES-256加密存储在您的设备上
                </p>
              </div>
            )}
          </div>

          {/* 自动删除时间设置 */}
          <div className="bg-white border border-border rounded-xl p-4">
            <div className="flex items-start gap-3 mb-3">
              <Clock className="w-5 h-5 text-[#6B46C1] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-text-primary mb-1">自动删除设置</h3>
                <p className="text-sm text-text-secondary mb-3">
                  选择对话历史的自动删除时间
                </p>
                
                <select
                  value={autoDeleteDays}
                  onChange={(e) => setAutoDeleteDays(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056b3] text-sm"
                >
                  <option value="never">从不删除</option>
                  <option value="7">7天后自动删除</option>
                  <option value="30">30天后自动删除</option>
                  <option value="90">90天后自动删除</option>
                  <option value="immediate">关闭对话时立即删除</option>
                </select>
              </div>
            </div>
          </div>

          {/* 数据导出 */}
          <div className="bg-white border border-border rounded-xl p-4">
            <div className="flex items-start gap-3 mb-3">
              <Download className="w-5 h-5 text-[#38A169] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-text-primary mb-1">导出数据</h3>
                <p className="text-sm text-text-secondary mb-3">
                  导出您的对话历史和设置（加密格式）
                </p>
                
                <button
                  onClick={handleExportData}
                  className="w-full py-2.5 px-4 bg-[#38A169] text-white rounded-lg hover:bg-[#2f855a] transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Download className="w-4 h-4" />
                  <span>导出加密数据</span>
                </button>
              </div>
            </div>
            
            <div className="mt-3 p-3 bg-green-50 rounded-lg">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <p className="text-xs text-green-800">
                  导出的数据文件使用您的密码加密，只有您可以打开
                </p>
              </div>
            </div>
          </div>

          {/* 删除所有历史记录 */}
          <div className="bg-white border-2 border-error/20 rounded-xl p-4">
            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-error mb-1">删除所有数据</h3>
                <p className="text-sm text-text-secondary mb-3">
                  永久删除所有对话历史和设置，此操作不可恢复
                </p>
                
                <button
                  onClick={handleDeleteAll}
                  className="w-full py-2.5 px-4 bg-error text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>删除所有数据</span>
                </button>
              </div>
            </div>
          </div>

          {/* 隐私保证 */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#0056b3]" />
              隐私保证
            </h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-[#0056b3] font-bold">•</span>
                <span>所有对话都经过端到端加密</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0056b3] font-bold">•</span>
                <span>数据仅存储在您的设备上</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0056b3] font-bold">•</span>
                <span>我们不会将您的数据用于训练AI模型</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0056b3] font-bold">•</span>
                <span>您拥有数据的完全控制权</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 保存按钮 */}
        <div className="sticky bottom-0 bg-white border-t border-border p-4">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-[#0056b3] text-white rounded-lg hover:bg-[#004494] transition-colors font-medium"
          >
            保存设置
          </button>
        </div>
      </div>

      {/* 删除确认对话框 */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-60 p-4">
          <div 
            className="absolute inset-0 bg-black/70"
            onClick={() => setShowDeleteConfirm(false)}
          />
          <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-fadeIn">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-error" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                确认删除？
              </h3>
              <p className="text-text-secondary">
                此操作将永久删除所有对话历史和设置，无法恢复。您确定要继续吗？
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 px-4 bg-bg-secondary text-text-primary rounded-lg hover:bg-bg-tertiary transition-colors font-medium"
              >
                取消
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3 px-4 bg-error text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
