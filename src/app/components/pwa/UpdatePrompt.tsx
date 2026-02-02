/**
 * PWA更新提示组件
 * 当有新版本可用时提示用户更新
 */

import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export function UpdatePrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;

          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (
                newWorker.state === 'installed' &&
                navigator.serviceWorker.controller
              ) {
                // 新版本可用
                setRegistration(reg);
                setShowPrompt(true);
              }
            });
          }
        });
      });
    }
  }, []);

  const handleUpdate = async () => {
    if (!registration || !registration.waiting) return;

    setIsUpdating(true);

    // 发送消息让新SW立即激活
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });

    // 监听控制器变化
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      // 重新加载页面以使用新版本
      window.location.reload();
    });
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50"
      >
        <div className="bg-surface-elevated rounded-2xl shadow-2xl border border-border overflow-hidden">
          <div className="p-4">
            <div className="flex items-start gap-3">
              {/* 图标 */}
              <div className="w-12 h-12 bg-gradient-to-br from-[#6B46C1] to-[#9333EA] rounded-xl flex items-center justify-center flex-shrink-0">
                <RefreshCw 
                  className={`w-6 h-6 text-white ${isUpdating ? 'animate-spin' : ''}`} 
                />
              </div>

              {/* 文字内容 */}
              <div className="flex-1">
                <h3 className="font-semibold text-text-primary mb-1">
                  {isUpdating ? '正在更新...' : '发现新版本'}
                </h3>
                <p className="text-sm text-text-secondary mb-3">
                  {isUpdating 
                    ? '请稍候，正在更新应用...' 
                    : '新版本已准备就绪，立即更新以获得最新功能和修复'}
                </p>

                {/* 按钮 */}
                {!isUpdating && (
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleUpdate} 
                      size="sm"
                      className="flex-1"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      立即更新
                    </Button>
                    <Button 
                      onClick={handleDismiss} 
                      variant="ghost" 
                      size="sm"
                    >
                      稍后
                    </Button>
                  </div>
                )}

                {isUpdating && (
                  <div className="flex items-center gap-2 text-sm text-text-tertiary">
                    <div className="w-4 h-4 border-2 border-[#6B46C1] border-t-transparent rounded-full animate-spin" />
                    <span>更新中...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 底部装饰 */}
          <div className="h-1 bg-gradient-to-r from-[#6B46C1] to-[#9333EA]" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
