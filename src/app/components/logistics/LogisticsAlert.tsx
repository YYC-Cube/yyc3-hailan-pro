/**
 * 物流异常提醒组件
 * 显示物流异常、延迟等提醒信息
 */

import React from 'react';
import { AlertTriangle, Clock, XCircle, MapPinOff, Package } from 'lucide-react';
import { LogisticsException } from '@/app/services/logisticsService';
import { Alert } from '@/app/components/ui/status-indicator';
import { Button } from '@/app/components/ui/button';
import { cn } from '@/lib/utils';

// ==================== 类型定义 ====================

export interface LogisticsAlertProps {
  exception: LogisticsException;
  onContactSupport?: () => void;
  onReportIssue?: () => void;
  className?: string;
}

// ==================== 组件 ====================

export function LogisticsAlert({
  exception,
  onContactSupport,
  onReportIssue,
  className,
}: LogisticsAlertProps) {
  // 获取异常类型的图标
  const getExceptionIcon = (type: LogisticsException['type']) => {
    switch (type) {
      case 'delay':
        return <Clock className="w-5 h-5" />;
      case 'lost':
        return <MapPinOff className="w-5 h-5" />;
      case 'damaged':
        return <Package className="w-5 h-5" />;
      case 'wrong_address':
        return <XCircle className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  // 获取异常类型的标题
  const getExceptionTitle = (type: LogisticsException['type']) => {
    switch (type) {
      case 'delay':
        return '物流延迟';
      case 'lost':
        return '包裹丢失';
      case 'damaged':
        return '包裹损坏';
      case 'wrong_address':
        return '地址错误';
      default:
        return '物流异常';
    }
  };

  // 获取建议操作
  const getSuggestions = (type: LogisticsException['type']): string[] => {
    switch (type) {
      case 'delay':
        return [
          '物流可能因天气、节假日等原因延迟',
          '请耐心等待，我们会持续跟进',
          '如超过3天未更新，请联系客服',
        ];
      case 'lost':
        return [
          '我们已通知快递公司紧急查找',
          '请保持联系方式畅通',
          '如确认丢失，我们将全额赔偿',
        ];
      case 'damaged':
        return [
          '请拒收并拍照取证',
          '联系客服为您重新发货',
          '我们承担所有损失',
        ];
      case 'wrong_address':
        return [
          '请核对收件地址是否正确',
          '可联系快递员修改地址',
          '或联系客服帮您处理',
        ];
      default:
        return [
          '请联系客服了解详情',
          '我们会尽快为您解决',
        ];
    }
  };

  const title = getExceptionTitle(exception.type);
  const suggestions = getSuggestions(exception.type);

  return (
    <div className={cn('space-y-4', className)}>
      {/* 主要提醒 */}
      <Alert
        type="warning"
        title={title}
        closable={false}
      >
        <div className="space-y-2">
          <p className="font-medium">{exception.description}</p>
          <p className="text-sm">
            报告时间：{exception.reportedAt.toLocaleString('zh-CN')}
          </p>
          {exception.resolved && (
            <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
              ✓ 已解决
            </div>
          )}
        </div>
      </Alert>

      {/* 建议操作 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-900 mb-3 flex items-center gap-2">
          {getExceptionIcon(exception.type)}
          处理建议
        </h4>
        <ul className="space-y-2 text-sm text-yellow-800">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-yellow-600 flex-shrink-0">•</span>
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 操作按钮 */}
      <div className="flex flex-wrap gap-3">
        {onContactSupport && (
          <Button
            onClick={onContactSupport}
            className="flex-1 min-w-[150px]"
          >
            联系客服
          </Button>
        )}
        {onReportIssue && (
          <Button
            variant="outline"
            onClick={onReportIssue}
            className="flex-1 min-w-[150px]"
          >
            报告新问题
          </Button>
        )}
      </div>
    </div>
  );
}

export default LogisticsAlert;
