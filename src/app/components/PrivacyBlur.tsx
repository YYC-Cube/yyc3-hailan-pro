import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { usePrivacy } from '@/app/context/PrivacyContext';

interface PrivacyBlurProps {
  children: React.ReactNode;
  alwaysBlur?: boolean;
}

export function PrivacyBlur({ children, alwaysBlur = false }: PrivacyBlurProps) {
  const { isBlur } = usePrivacy();
  const shouldBlur = alwaysBlur || isBlur;

  return (
    <div className="relative">
      {children}
      {shouldBlur && (
        <div className="absolute inset-0 backdrop-blur-md bg-slate-900/10 flex items-center justify-center rounded-lg animate-fadeIn">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
            <EyeOff className="w-6 h-6 text-slate-600" />
          </div>
        </div>
      )}
    </div>
  );
}

export function PrivacyToggle() {
  const { isBlur, setIsBlur } = usePrivacy();

  return (
    <button
      onClick={() => setIsBlur(!isBlur)}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full transition-all
        ${isBlur 
          ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30' 
          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
        }
      `}
    >
      {isBlur ? (
        <>
          <EyeOff className="w-4 h-4" />
          <span className="text-sm font-medium">Privacy Mode</span>
        </>
      ) : (
        <>
          <Eye className="w-4 h-4" />
          <span className="text-sm font-medium">Normal Mode</span>
        </>
      )}
    </button>
  );
}
