import React from 'react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

// Brand logos from public folder
const logoIcon = '/icon.png';
const logoFull = '/icon.png';

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
