/**
 * PWA安装提示组件
 * 引导用户安装PWA应用
 */

import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // 检查是否已安装
    const checkInstalled = () => {
      const isPWA = window.matchMedia('(display-mode: standalone)').matches ||
                    (window.navigator as any).standalone === true;
      setIsInstalled(isPWA);
    };

    checkInstalled();

    // 检查是否已关闭提示
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed, 10);
      const now = Date.now();
      // 7天后再次显示
      if (now - dismissedTime < 7 * 24 * 60 * 60 * 1000) {
        return;
      }
    }

    // 监听安装提示事件
    const handler = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      
      // 延迟显示提示，避免打扰用户
      setTimeout(() => {
        if (!isInstalled) {
          setShowPrompt(true);
        }
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // 监听安装成功
    window.addEventListener('appinstalled', () => {
      console.log('[PWA] App installed successfully');
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, [isInstalled]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      console.log(`[PWA] User response: ${outcome}`);

      if (outcome === 'accepted') {
        setIsInstalled(true);
      }

      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      console.error('[PWA] Install prompt error:', error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  if (!showPrompt || isInstalled) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50"
      >
        <div className="bg-surface-elevated rounded-2xl shadow-2xl border border-border overflow-hidden">
          {/* 关闭按钮 */}
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-overlay hover:bg-surface-hover flex items-center justify-center text-text-tertiary hover:text-text-primary transition-all z-10"
            aria-label="关闭"
          >
            <X className="w-4 h-4" />
          </button>

          {/* 内容 */}
          <div className="p-6">
            <div className="flex items-start gap-4">
              {/* 图标 */}
              <div className="w-16 h-16 bg-gradient-to-br from-[#0056b3] to-[#003d82] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Smartphone className="w-8 h-8 text-white" />
              </div>

              {/* 文字内容 */}
              <div className="flex-1 pt-1">
                <h3 className="font-semibold text-lg text-text-primary mb-2">
                  安装海蓝应用
                </h3>
                <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                  获得更好的离线体验、更快的加载速度和桌面快捷方式
                </p>

                {/* 特性列表 */}
                <ul className="text-xs text-text-tertiary space-y-1.5 mb-4">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0056b3]" />
                    <span>离线浏览，随时访问</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0056b3]" />
                    <span>更快的加载速度</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0056b3]" />
                    <span>消息推送通知</span>
                  </li>
                </ul>

                {/* 按钮 */}
                <div className="flex gap-2">
                  <Button 
                    onClick={handleInstall} 
                    size="sm"
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    立即安装
                  </Button>
                  <Button 
                    onClick={handleDismiss} 
                    variant="outline" 
                    size="sm"
                  >
                    暂不安装
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 底部装饰 */}
          <div className="h-1 bg-gradient-to-r from-[#0056b3] to-[#6B46C1]" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
