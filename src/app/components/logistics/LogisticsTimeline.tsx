/**
 * 物流时间线组件
 * 展示物流轨迹的时间线视图
 */

import React from 'react';
import { Check, Package, Truck, MapPin, Home } from 'lucide-react';
import { LogisticsEvent, LogisticsStatus } from '@/app/services/logisticsService';
import LogisticsService from '@/app/services/logisticsService';
import { cn } from '@/lib/utils';

// ==================== 类型定义 ====================

export interface LogisticsTimelineProps {
  events: LogisticsEvent[];
  className?: string;
}

// ==================== 组件 ====================

export function LogisticsTimeline({ events, className }: LogisticsTimelineProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-text-secondary">
        暂无物流信息
      </div>
    );
  }

  // 获取状态图标
  const getStatusIcon = (status: LogisticsStatus) => {
    switch (status) {
      case 'picked':
        return <Package className="w-4 h-4" />;
      case 'in_transit':
        return <Truck className="w-4 h-4" />;
      case 'out_for_delivery':
        return <MapPin className="w-4 h-4" />;
      case 'delivered':
        return <Home className="w-4 h-4" />;
      default:
        return <Check className="w-4 h-4" />;
    }
  };

  // 获取状态颜色
  const getStatusBgColor = (status: LogisticsStatus, isFirst: boolean) => {
    if (isFirst) {
      // 最新状态使用更鲜艳的颜色
      switch (status) {
        case 'delivered':
          return 'bg-green-500 text-white';
        case 'out_for_delivery':
          return 'bg-yellow-500 text-white';
        case 'in_transit':
          return 'bg-blue-500 text-white';
        case 'exception':
          return 'bg-red-500 text-white';
        default:
          return 'bg-[#0056b3] text-white';
      }
    } else {
      // 历史状态使用浅色
      return 'bg-gray-200 text-gray-600';
    }
  };

  // 获取连接线颜色
  const getLineColor = (index: number) => {
    return index === 0 ? 'bg-[#0056b3]' : 'bg-gray-300';
  };

  return (
    <div className={cn('relative', className)}>
      <div className="space-y-0">
        {events.map((event, index) => {
          const isFirst = index === 0;
          const isLast = index === events.length - 1;
          const statusBgColor = getStatusBgColor(event.status, isFirst);
          const lineColor = getLineColor(index);

          return (
            <div key={event.id} className="relative flex gap-4 pb-8 last:pb-0">
              {/* 时间线左侧 */}
              <div className="flex flex-col items-center flex-shrink-0">
                {/* 图标 */}
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                    statusBgColor,
                    isFirst && 'ring-4 ring-blue-100 scale-110'
                  )}
                >
                  {getStatusIcon(event.status)}
                </div>

                {/* 连接线 */}
                {!isLast && (
                  <div className={cn('w-0.5 flex-1 mt-2', lineColor)} style={{ minHeight: '40px' }} />
                )}
              </div>

              {/* 内容 */}
              <div className="flex-1 pt-1">
                {/* 时间和位置 */}
                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <span
                    className={cn(
                      'text-sm font-medium',
                      isFirst ? 'text-[#0056b3]' : 'text-text-secondary'
                    )}
                  >
                    {LogisticsService.formatTime(event.time)}
                  </span>
                  {event.location && (
                    <>
                      <span className="text-text-tertiary">·</span>
                      <span className="text-xs text-text-tertiary">
                        {event.location}
                      </span>
                    </>
                  )}
                </div>

                {/* 描述 */}
                <p
                  className={cn(
                    'text-sm',
                    isFirst ? 'text-text-primary font-medium' : 'text-text-secondary'
                  )}
                >
                  {event.description}
                </p>

                {/* 最新状态标签 */}
                {isFirst && (
                  <div className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                    最新
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LogisticsTimeline;
