import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrandLogo } from './BrandLogo';

interface BrandSplashProps {
  onComplete?: () => void;
  duration?: number;
}

export function BrandSplash({ onComplete, duration = 2000 }: BrandSplashProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete?.();
      }, 500); // Wait for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-sky-400 via-blue-500 to-pink-500">
      {/* Logo Container */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
          <BrandLogo variant="full" size="xl" />
        </div>
        <div className="text-center">
          <p className="text-white text-lg font-light tracking-wide">高端私密 · 健康生活</p>
          <p className="text-white/80 text-sm mt-1">Premium Intimate Wellness</p>
        </div>
      </div>
    </div>
  );
}
