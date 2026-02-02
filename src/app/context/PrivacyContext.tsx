import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

export type CamouflageMode = 'calculator' | 'notes' | 'none';

interface PrivacyContextType {
  isBlur: boolean;
  setIsBlur: (value: boolean) => void;
  isLocked: boolean;
  toggleLock: () => void;
  unlockApp: () => void;
  camouflageMode: CamouflageMode;
  setCamouflageMode: (mode: CamouflageMode) => void;
  unlockCode: string;
  setUnlockCode: (code: string) => void;
  biometricEnabled: boolean;
  setBiometricEnabled: (enabled: boolean) => void;
}

const PrivacyContext = createContext<PrivacyContextType | undefined>(undefined);

export function PrivacyProvider({ children }: { children: React.ReactNode }) {
  const [isBlur, setIsBlur] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [camouflageMode, setCamouflageMode] = useState<CamouflageMode>('none');
  const [unlockCode, setUnlockCode] = useState('8888');
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const toggleLock = useCallback(() => setIsLocked(prev => !prev), []);
  const unlockApp = useCallback(() => setIsLocked(false), []);

  const value = useMemo(() => ({
    isBlur, 
    setIsBlur,
    isLocked,
    toggleLock,
    unlockApp,
    camouflageMode,
    setCamouflageMode,
    unlockCode,
    setUnlockCode,
    biometricEnabled,
    setBiometricEnabled
  }), [isBlur, isLocked, toggleLock, unlockApp, camouflageMode, unlockCode, biometricEnabled]);

  return (
    <PrivacyContext.Provider value={value}>
      {children}
    </PrivacyContext.Provider>
  );
}

export function usePrivacy() {
  const context = useContext(PrivacyContext);
  if (context === undefined) {
    throw new Error('usePrivacy must be used within a PrivacyProvider');
  }
  return context;
}

