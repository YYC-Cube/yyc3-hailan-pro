import React from 'react';
import { toast } from 'sonner';
import { 
  X, 
  Target, 
  Activity, 
  Bell, 
  Download,
  ChevronRight,
  Lock
} from 'lucide-react';

interface FunctionPanelProps {
  onClose: () => void;
}

export function FunctionPanel({ onClose }: FunctionPanelProps) {
  const functions = [
    {
      id: 'matching-test',
      icon: <Target className="w-5 h-5" />,
      title: '产品匹配测试',
      description: '通过智能问卷帮您找到最适合的产品',
      color: 'from-[#0056b3] to-[#004494]',
      action: '开始测试'
    },
    {
      id: 'health-tracking',
      icon: <Activity className="w-5 h-5" />,
      title: '健康记录跟踪',
      description: '记录和可视化您的健康数据',
      color: 'from-[#38A169] to-[#2f855a]',
      action: '查看记录'
    },
    {
      id: 'reminder-settings',
      icon: <Bell className="w-5 h-5" />,
      title: '提醒设置',
      description: '设置使用频率、清洁和电池更换提醒',
      color: 'from-[#ED8936] to-[#dd7728]',
      action: '设置提醒'
    },
    {
      id: 'export-conversation',
      icon: <Download className="w-5 h-5" />,
      title: '对话导出',
      description: '导出对话记录（加密格式）',
      color: 'from-[#6B46C1] to-[#5a3ba3]',
      action: '导出对话'
    },
  ];

  const handleFunctionClick = (title: string, action: string) => {
    toast.success(title, {
      description: `${action}功能已启动 (演示模式)`,
    });
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
          <h2 className="text-lg font-semibold text-text-primary">功能扩展</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        {/* 功能列表 */}
        <div className="p-6 space-y-4">
          {functions.map((func) => (
            <div
              key={func.id}
              className="
                bg-white 
                border border-border 
                rounded-xl 
                overflow-hidden 
                hover:shadow-lg 
                transition-all
                cursor-pointer
                group
              "
            >
              {/* 顶部色条 */}
              <div className={`h-1 bg-gradient-to-r ${func.color}`} />
              
              {/* 内容 */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${func.color} text-white`}>
                    {func.icon}
                  </div>
                  <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:text-[#0056b3] transition-colors" />
                </div>
                
                <h3 className="font-semibold text-text-primary mb-1">
                  {func.title}
                </h3>
                <p className="text-sm text-text-secondary mb-3">
                  {func.description}
                </p>
                
                <button 
                  onClick={() => handleFunctionClick(func.title, func.action)}
                  className="w-full py-2 px-4 bg-bg-secondary hover:bg-bg-tertiary text-text-primary rounded-lg transition-colors font-medium text-sm"
                >
                  {func.action}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 隐私提示 */}
        <div className="p-6 bg-blue-50 border-t border-border">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-[#0056b3] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-text-primary mb-1">隐私保护</h4>
              <p className="text-sm text-text-secondary">
                所有功能数据都在本地加密存储，您可以随时删除或导出。我们不会将您的数据用于其他目的。
              </p>
            </div>
          </div>
        </div>
      </div>

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
