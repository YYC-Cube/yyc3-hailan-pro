import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

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
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
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
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden">
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#6B46C1] to-[#9333EA] rounded-xl flex items-center justify-center flex-shrink-0">
              <RefreshCw className={`w-6 h-6 text-white ${isUpdating ? 'animate-spin' : ''}`} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-neutral-900 mb-1">
                {isUpdating ? '正在更新...' : '发现新版本'}
              </h3>
              <p className="text-sm text-neutral-500 mb-3">
                {isUpdating ? '请稍候，正在更新应用...' : '新版本已准备就绪，立即更新以获得最新功能和修复'}
              </p>
              {!isUpdating && (
                <div className="flex gap-2">
                  <Button onClick={handleUpdate} size="sm" className="flex-1">
                    <RefreshCw className="w-4 h-4 mr-2" /> 立即更新
                  </Button>
                  <Button onClick={handleDismiss} variant="ghost" size="sm">
                    稍后
                  </Button>
                </div>
              )}
              {isUpdating && (
                <div className="flex items-center gap-2 text-sm text-neutral-400">
                  <div className="w-4 h-4 border-2 border-[#6B46C1] border-t-transparent rounded-full animate-spin" />
                  <span>更新中...</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-[#6B46C1] to-[#9333EA]" />
      </div>
    </div>
  );
}
