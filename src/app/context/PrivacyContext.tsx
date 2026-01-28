import * as React from 'react';

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

const PrivacyContext = React.createContext<PrivacyContextType | undefined>(undefined);

export const PrivacyProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isBlur, setIsBlur] = React.useState(false);
  const [isLocked, setIsLocked] = React.useState(false); // Default to false for dev convenience, can be true for production
  const [camouflageMode, setCamouflageMode] = React.useState<CamouflageMode>('none');
  const [unlockCode, setUnlockCode] = React.useState('8888'); // Auspicious default number
  const [biometricEnabled, setBiometricEnabled] = React.useState(false);

  const toggleLock = () => setIsLocked(prev => !prev);
  const unlockApp = () => setIsLocked(false);

  return (
    <PrivacyContext.Provider value={{ 
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
    }}>
      {children}
    </PrivacyContext.Provider>
  );
};

export const usePrivacy = () => {
  const context = React.useContext(PrivacyContext);
  if (!context) {
    throw new Error('usePrivacy must be used within a PrivacyProvider');
  }
  return context;
};
