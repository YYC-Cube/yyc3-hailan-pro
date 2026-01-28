import React from 'react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import logoIcon from 'figma:asset/d687e8c6eaff439058d15cc055f57aadc55a2b38.png';
import logoFull from 'figma:asset/923893d6867889983442c75dc0c39278f7c805f0.png';

interface BrandLogoProps {
  variant?: 'icon' | 'full';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function BrandLogo({ variant = 'full', className = '', size = 'md' }: BrandLogoProps) {
  const sizeClasses = {
    sm: variant === 'icon' ? 'w-8 h-8' : 'h-8',
    md: variant === 'icon' ? 'w-12 h-12' : 'h-10',
    lg: variant === 'icon' ? 'w-16 h-16' : 'h-12',
    xl: variant === 'icon' ? 'w-24 h-24' : 'h-16',
  };

  const src = variant === 'icon' ? logoIcon : logoFull;

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <img
        src={src}
        alt="Brand Logo"
        className={`object-contain ${sizeClasses[size]}`}
      />
    </div>
  );
}
