import React from 'react';
import { Sparkles } from 'lucide-react';

// AI logo from public folder
const aiLogo = '/logo.png';

interface AssistantAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

export function AssistantAvatar({ size = 'md', animated = false }: AssistantAvatarProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const imgSizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-16 h-16'
  };

  return (
    <div
      className={`
        ${sizeClasses[size]} 
        rounded-full 
        bg-white
        flex items-center justify-center
        shadow-lg
        ${animated ? 'animate-pulse' : ''}
        relative
        border border-gray-100
      `}
    >
      {/* 替换为 Logo */}
      <img 
        src={aiLogo} 
        alt="AI Assistant" 
        className={`${imgSizeClasses[size]} object-contain`} 
      />
      
      {/* 动画状态下显示外发光 */}
      {animated && (
        <div className="absolute inset-0 rounded-full bg-blue-100 opacity-50 blur-xl animate-pulse -z-10" />
      )}
    </div>
  );
}
