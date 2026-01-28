/**
 * 物流跟踪主组件
 * 显示完整的物流信息和轨迹
 */

import React, { useState, useEffect } from 'react';
import { Package, MapPin, Clock, Phone, AlertCircle, Shield, RefreshCw } from 'lucide-react';
import LogisticsService, { LogisticsInfo, LogisticsStatus } from '@/app/services/logisticsService';
import { LogisticsTimeline } from './LogisticsTimeline';
import { PrivacyShippingBadge } from './PrivacyShippingBadge';
import { Button } from '@/app/components/ui/button';
import { StatusIndicator } from '@/app/components/ui/status-indicator';
import { cn } from '@/lib/utils';

// ==================== 类型定义 ====================

export interface LogisticsTrackerProps {
  trackingNumber: string;
  orderId?: string;
  autoRefresh?: boolean;
  refreshInterval?: number; // 秒
  onReportIssue?: () => void;
  className?: string;
}

// ==================== 组件 ====================

export function LogisticsTracker({
  trackingNumber,
  orderId,
  autoRefresh = false,
  refreshInterval = 30,
  onReportIssue,
  className,
}: LogisticsTrackerProps) {
  const [logisticsInfo, setLogisticsInfo] = useState<LogisticsInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // 加载物流信息
  const loadLogisticsInfo = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const info = await LogisticsService.getLogisticsInfo(trackingNumber);
      setLogisticsInfo(info);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载物流信息失败');
    } finally {
      setIsLoading(false);
    }
  };

  // 初始加载
  useEffect(() => {
    loadLogisticsInfo();
  }, [trackingNumber]);

  // 自动刷新
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(loadLogisticsInfo, refreshInterval * 1000);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, trackingNumber]);

  // 手动刷新
  const handleRefresh = () => {
    loadLogisticsInfo();
  };

  // 联系快递员
  const handleContactCourier = () => {
    if (logisticsInfo) {
      const carrier = LogisticsService.getCarrierInfo(logisticsInfo.carrierCode);
      if (carrier) {
        window.open(`tel:${carrier.phone}`);
      }
    }
  };

  if (isLoading && !logisticsInfo) {
    return (
      <div className={cn('bg-white rounded-lg p-8 text-center', className)}>
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#0056b3] mb-4"></div>
        <p className="text-text-secondary">加载物流信息中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('bg-white rounded-lg p-8 text-center', className)}>
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={handleRefresh} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          重试
        </Button>
      </div>
    );
  }

  if (!logisticsInfo) {
    return null;
  }

  const carrier = LogisticsService.getCarrierInfo(logisticsInfo.carrierCode);
  const statusColor = LogisticsService.getStatusColor(logisticsInfo.status);
  const statusName = LogisticsService.getStatusName(logisticsInfo.status);
  const estimatedText = LogisticsService.getEstimatedDeliveryText(logisticsInfo.estimatedDelivery);

  return (
    <div className={cn('bg-white rounded-lg border border-border overflow-hidden', className)}>
      {/* 头部信息 */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Package className="w-6 h-6 text-[#0056b3]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">
                {logisticsInfo.carrier}
              </h3>
              <p className="text-sm text-text-secondary font-mono">
                {trackingNumber}
              </p>
            </div>
          </div>

          {/* 隐私配送标识 */}
          {logisticsInfo.privacyShipping && (
            <PrivacyShippingBadge />
          )}
        </div>

        {/* 当前状态 */}
        <div className="flex items-center gap-2 mb-4">
          <StatusIndicator
            type={logisticsInfo.status === 'delivered' ? 'success' : 
                  logisticsInfo.status === 'exception' ? 'error' : 'info'}
            size="lg"
          >
            {statusName}
          </StatusIndicator>
        </div>

        {/* 当前位置和预计送达 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {logisticsInfo.currentLocation && (
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-text-tertiary flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs text-text-secondary mb-1">当前位置</div>
                <div className="text-sm text-text-primary font-medium">
                  {logisticsInfo.currentLocation}
                </div>
              </div>
            </div>
          )}

          {logisticsInfo.estimatedDelivery && (
            <div className="flex items-start gap-2">
              <Clock className="w-5 h-5 text-text-tertiary flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs text-text-secondary mb-1">预计送达</div>
                <div className="text-sm text-text-primary font-medium">
                  {estimatedText}
                  <span className="text-text-tertiary ml-2">
                    ({LogisticsService.formatTime(logisticsInfo.estimatedDelivery)})
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 收件信息（隐私配送时脱敏） */}
        {logisticsInfo.recipientName && (
          <div className="mt-4 p-3 bg-bg-secondary rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-[#6B46C1]" />
              <span className="text-sm font-medium text-text-primary">
                收件信息（已脱敏）
              </span>
            </div>
            <div className="text-sm text-text-secondary space-y-1">
              <div>收件人：{logisticsInfo.recipientName}</div>
              <div>地址：{logisticsInfo.recipientAddress}</div>
            </div>
          </div>
        )}
      </div>

      {/* 物流轨迹 */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-text-primary">物流轨迹</h4>
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-tertiary">
              最后更新：{LogisticsService.formatTime(lastUpdate)}
            </span>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={cn('w-4 h-4', isLoading && 'animate-spin')} />
            </Button>
          </div>
        </div>

        <LogisticsTimeline events={logisticsInfo.timeline} />
      </div>

      {/* 底部操作 */}
      <div className="p-6 border-t border-border bg-bg-secondary">
        <div className="flex flex-wrap gap-3">
          {carrier && (
            <Button
              variant="outline"
              onClick={handleContactCourier}
              className="flex-1 min-w-[150px]"
            >
              <Phone className="w-4 h-4 mr-2" />
              联系快递：{carrier.phone}
            </Button>
          )}

          {onReportIssue && (
            <Button
              variant="outline"
              onClick={onReportIssue}
              className="flex-1 min-w-[150px]"
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              报告问题
            </Button>
          )}
        </div>

        {/* 温馨提示 */}
        <div className="mt-4 text-xs text-text-tertiary space-y-1">
          <p>• 物流信息每30秒自动更新</p>
          <p>• 如有疑问可联系快递公司客服</p>
          {logisticsInfo.privacyShipping && (
            <p className="text-[#6B46C1]">• 您的收件信息已加密保护</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LogisticsTracker;
