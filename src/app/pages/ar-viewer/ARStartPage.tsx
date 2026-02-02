import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from '@/app/components/router';
import { 
  Camera, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  Eye,
  Sun
} from 'lucide-react';
import { BrandLogo } from '@/app/components/BrandLogo';
import { motion } from 'framer-motion';
import { cn } from '@/app/components/design-system/utils';

export function ARStartPage() {
  const navigate = useNavigate();
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [environmentChecked, setEnvironmentChecked] = useState(false);
  const [checkingEnvironment, setCheckingEnvironment] = useState(false);

  useEffect(() => {
    // 检查环境支持
    checkEnvironment();
  }, []);

  const checkEnvironment = async () => {
    setCheckingEnvironment(true);
    // 模拟环境检测
    setTimeout(() => {
      setEnvironmentChecked(true);
      setCheckingEnvironment(false);
    }, 1500);
  };

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      setPermissionGranted(true);
    } catch (error) {
      alert('摄像头权限被拒绝，AR功能需要访问您的摄像头');
    }
  };

  const startARExperience = () => {
    if (permissionGranted && environmentChecked) {
      navigate('/ar-viewer');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
      {/* 顶部导航 - 全局统一风格 */}
      <header className="bg-white/80 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <BrandLogo variant="full" size="sm" />
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 py-8 pb-20">
        {/* 标题区域 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="relative w-24 h-24 mx-auto mb-6 group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
            <div className="relative w-full h-full bg-gradient-to-br from-[#0056b3] to-[#6B46C1] rounded-3xl flex items-center justify-center shadow-xl border border-white/10 overflow-hidden">
               <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <Camera className="w-10 h-10 text-white relative z-10" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            AR 产品试戴
          </h1>
          <p className="text-sm text-neutral-500 max-w-xs mx-auto leading-relaxed">
            利用增强现实技术，将海蓝产品带入您的私密空间，即刻预览真实效果。
          </p>
        </motion.div>

        {/* 使用步骤 - 卡片式设计 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-6 border-b border-neutral-50 pb-3">
            <Eye className="w-5 h-5 text-brand-deep-blue" />
            <h2 className="font-semibold text-neutral-900 text-sm">操作指南</h2>
          </div>
          
          <div className="space-y-6">
            {[
              { id: 1, title: "授权访问", desc: "允许使用摄像头", color: "bg-blue-50 text-blue-600" },
              { id: 2, title: "扫描平面", desc: "对准桌面或地面", color: "bg-purple-50 text-purple-600" },
              { id: 3, title: "放置预览", desc: "点击屏幕放置模型", color: "bg-pink-50 text-pink-600" }
            ].map((step, index) => (
              <div key={step.id} className="flex items-center gap-4 relative">
                {index !== 2 && <div className="absolute left-[19px] top-10 w-0.5 h-6 bg-neutral-100" />}
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0", step.color)}>
                  {step.id}
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900 text-sm">{step.title}</h3>
                  <p className="text-xs text-neutral-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 环境检测状态 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-5 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
             <h3 className="font-medium text-neutral-900 text-sm flex items-center gap-2">
               <Sun className="w-4 h-4 text-amber-500" />
               环境就绪状态
             </h3>
             {checkingEnvironment && <span className="text-xs text-neutral-400">检测中...</span>}
          </div>
          
          <div className="space-y-3">
            <StatusItem 
              label="浏览器兼容性" 
              status={checkingEnvironment ? 'loading' : (environmentChecked ? 'success' : 'error')} 
            />
            <StatusItem 
              label="摄像头权限" 
              status={permissionGranted ? 'success' : 'pending'} 
            />
            <StatusItem 
              label="光线环境" 
              status={environmentChecked ? 'success' : 'unknown'} 
            />
          </div>
        </motion.div>

        {/* 隐私提示 - 紧凑版 */}
        <div className="flex items-start gap-3 p-4 bg-emerald-50/50 rounded-xl mb-8 border border-emerald-100/50">
          <Shield className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
          <p className="text-xs text-emerald-800 leading-relaxed">
            <span className="font-medium block mb-1">隐私安全承诺</span>
            所有 AR 处理均在本地完成，图像数据绝不上传云端，退出即销毁。
          </p>
        </div>

        {/* 底部固定按钮区 */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-neutral-200 safe-area-bottom">
           <div className="max-w-md mx-auto flex flex-col gap-3">
              {!permissionGranted ? (
                <button
                  onClick={requestCameraPermission}
                  className="w-full h-12 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  <Camera className="w-4 h-4" />
                  开启摄像头权限
                </button>
              ) : (
                <button
                  onClick={startARExperience}
                  disabled={!environmentChecked}
                  className="w-full h-12 bg-brand-deep-blue text-white rounded-full font-medium hover:bg-brand-deep-blue/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-brand-deep-blue/20 active:scale-[0.98]"
                >
                  <span>进入 AR 空间</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
           </div>
        </div>
      </main>
    </div>
  );
}

function StatusItem({ label, status }: { label: string, status: 'success' | 'error' | 'loading' | 'pending' | 'unknown' }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-neutral-600">{label}</span>
      <div className="flex items-center">
        {status === 'loading' && <div className="w-4 h-4 border-2 border-brand-deep-blue border-t-transparent rounded-full animate-spin" />}
        {status === 'success' && <CheckCircle className="w-4 h-4 text-emerald-500" />}
        {status === 'error' && <AlertCircle className="w-4 h-4 text-red-500" />}
        {status === 'pending' && <span className="w-2 h-2 rounded-full bg-amber-400" />}
        {status === 'unknown' && <span className="w-2 h-2 rounded-full bg-neutral-300" />}
      </div>
    </div>
  );
}
