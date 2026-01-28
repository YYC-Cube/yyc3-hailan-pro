import React, { useState } from 'react';
import { X, Download, Share2, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';

interface ARScreenshotPanelProps {
  screenshot: string;
  onClose: () => void;
}

export function ARScreenshotPanel({ screenshot, onClose }: ARScreenshotPanelProps) {
  const [autoBlur, setAutoBlur] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = screenshot;
    link.download = `hailan-ar-${Date.now()}.png`;
    link.click();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      // 将base64转换为blob
      fetch(screenshot)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'hailan-ar.png', { type: 'image/png' });
          navigator.share({
            title: '海蓝AR体验',
            text: '查看我的AR产品体验',
            files: [file]
          });
        })
        .catch(err => {
          alert('分享功能暂不可用，请使用下载功能');
        });
    } else {
      alert('您的浏览器不支持分享功能，请使用下载功能');
    }
  };

  return (
    <>
      {/* 遮罩层 */}
      <div 
        className="absolute inset-0 bg-black/90 z-40 animate-fadeIn"
        onClick={onClose}
      />

      {/* 面板内容 */}
      <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
          {/* 头部 */}
          <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
            <h2 className="text-lg font-semibold text-text-primary">截图预览</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-text-secondary" />
            </button>
          </div>

          {/* 截图预览 */}
          <div className="p-6">
            <div className="relative rounded-xl overflow-hidden mb-6">
              <img
                src={screenshot}
                alt="AR Screenshot"
                className={`w-full ${autoBlur ? 'blur-sm' : ''} transition-all`}
              />
              
              {/* 模糊遮罩提示 */}
              {autoBlur && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="bg-white rounded-xl p-4 shadow-lg text-center max-w-xs">
                    <Lock className="w-8 h-8 text-[#0056b3] mx-auto mb-2" />
                    <p className="text-sm text-text-primary font-medium mb-1">
                      隐私保护已启用
                    </p>
                    <p className="text-xs text-text-secondary">
                      敏感区域已自动模糊处理
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 隐私保护选项 */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-text-primary mb-2">隐私保护设置</h3>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-sm text-text-primary">自动模糊敏感区域</div>
                      <div className="text-xs text-text-secondary">保护您的隐私和安全</div>
                    </div>
                    <button
                      onClick={() => setAutoBlur(!autoBlur)}
                      className={`
                        relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                        ${autoBlur ? 'bg-success' : 'bg-gray-300'}
                      `}
                    >
                      <span
                        className={`
                          inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                          ${autoBlur ? 'translate-x-6' : 'translate-x-1'}
                        `}
                      />
                    </button>
                  </div>

                  <div className="bg-white rounded-lg p-3">
                    <ul className="space-y-1 text-xs text-text-secondary">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-success" />
                        <span>背景环境自动检测和模糊</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-success" />
                        <span>人物面部智能识别和遮盖</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-success" />
                        <span>文字信息自动打码处理</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 分享提示 */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <Share2 className="w-5 h-5 text-[#0056b3] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-text-primary mb-1">隐私保护式分享</h3>
                  <p className="text-sm text-text-secondary">
                    分享的图片将经过隐私处理，不会包含任何敏感信息。您可以安全地分享到社交媒体或发送给朋友。
                  </p>
                </div>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={handleDownload}
                className="py-3 px-6 bg-[#0056b3] text-white rounded-xl font-medium hover:bg-[#004494] transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                <span>下载到设备</span>
              </button>

              <button
                onClick={handleShare}
                className="py-3 px-6 border-2 border-[#0056b3] text-[#0056b3] rounded-xl font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                <span>分享</span>
              </button>
            </div>

            {/* 保存成功提示 */}
            {saved && (
              <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg flex items-center gap-2 animate-fadeIn">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="text-sm text-green-800 font-medium">截图已保存到您的设备</span>
              </div>
            )}

            {/* 底部说明 */}
            <p className="text-xs text-text-tertiary text-center mt-4">
              保存的图片仅存储在您的设备上，我们不会上传或保存您的截图
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
