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
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-fadeIn"
        onClick={onClose}
      />

      {/* 面板内容 - 移动端底部抽屉 / 桌面端居中模态框 */}
      <div className="fixed inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center z-50 pointer-events-none">
        <div className="bg-white w-full md:w-[480px] rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] md:max-h-[80vh] pointer-events-auto animate-slideUp">
          
          {/* 移动端拖拽条 */}
          <div className="md:hidden w-full flex justify-center pt-3 pb-1">
             <div className="w-12 h-1.5 bg-neutral-200 rounded-full" />
          </div>

          {/* 头部 */}
          <div className="bg-white border-b border-border px-6 py-4 flex items-center justify-between shrink-0">
            <h2 className="text-lg font-bold text-text-primary">功能扩展</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-bg-secondary rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-text-secondary" />
            </button>
          </div>

          {/* 功能列表 (可滚动) */}
          <div className="p-6 space-y-4 overflow-y-auto overscroll-contain">
            {functions.map((func) => (
              <div
                key={func.id}
                className="
                  bg-white 
                  border border-border 
                  rounded-2xl 
                  overflow-hidden 
                  hover:shadow-lg 
                  hover:border-blue-200
                  transition-all
                  cursor-pointer
                  group
                  relative
                "
              >
                {/* 顶部色条 */}
                <div className={`h-1.5 bg-gradient-to-r ${func.color}`} />
                
                {/* 内容 */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-r ${func.color} text-white shadow-sm`}>
                      {func.icon}
                    </div>
                    <ChevronRight className="w-5 h-5 text-neutral-300 group-hover:text-[#0056b3] transition-colors" />
                  </div>
                  
                  <h3 className="text-base font-bold text-text-primary mb-1">
                    {func.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                    {func.description}
                  </p>
                  
                  <button 
                    onClick={() => handleFunctionClick(func.title, func.action)}
                    className="w-full py-2.5 px-4 bg-bg-secondary group-hover:bg-[#0056b3] group-hover:text-white text-text-primary rounded-xl transition-all font-medium text-sm flex items-center justify-center"
                  >
                    {func.action}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 隐私提示 */}
          <div className="p-5 bg-blue-50/50 border-t border-border shrink-0 pb-8 md:pb-5">
            <div className="flex items-start gap-3">
              <Lock className="w-4 h-4 text-[#0056b3] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#0056b3] mb-0.5">隐私保护</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  所有功能数据都在本地加密存储。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </>
  );
}
