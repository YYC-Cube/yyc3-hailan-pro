/**
 * 物流跟踪对话框组件
 * 在对话框中显示完整的物流跟踪信息
 */

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { LogisticsTracker } from './LogisticsTracker';
import { Button } from '@/app/components/ui/button';
import { cn } from '@/lib/utils';

// ==================== 类型定义 ====================

export interface LogisticsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  trackingNumber: string;
  orderId?: string;
  className?: string;
}

// ==================== 组件 ====================

export function LogisticsDialog({
  isOpen,
  onClose,
  trackingNumber,
  orderId,
  className,
}: LogisticsDialogProps) {
  const [showReportIssue, setShowReportIssue] = useState(false);

  if (!isOpen) return null;

  const handleReportIssue = () => {
    setShowReportIssue(true);
    // 这里应该打开报告问题的表单
    alert('报告物流问题功能待实现');
  };

  return (
    <>
      {/* 遮罩层 */}
      <div
        className="fixed inset-0 bg-brand-hailan-blue/40 backdrop-blur-md z-40 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 对话框 */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="min-h-full flex items-center justify-center p-4">
          <div
            className={cn(
              'relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scale-in',
              className
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby="logistics-dialog-title"
          >
            {/* 头部 */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-border bg-white">
              <div>
                <h2 id="logistics-dialog-title" className="text-xl font-semibold text-text-primary">
                  物流跟踪
                </h2>
                {orderId && (
                  <p className="text-sm text-text-secondary mt-1">
                    订单号：{orderId}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-bg-secondary rounded-lg transition-colors focus-ring"
                aria-label="关闭"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 内容 */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              <LogisticsTracker
                trackingNumber={trackingNumber}
                orderId={orderId}
                autoRefresh={true}
                refreshInterval={30}
                onReportIssue={handleReportIssue}
                className="border-0 rounded-none"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogisticsDialog;
