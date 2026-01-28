import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserSettings {
  privacyMode: boolean;
  discreetNotifications: boolean;
  biometricLogin: boolean;
  dataRetentionDays: number;
}

interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  memberSince: string;
  tier: 'Standard' | 'Gold' | 'Platinum';
}

interface UserContextType {
  user: UserProfile;
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  updateProfile: (newProfile: Partial<UserProfile>) => void;
  logout: () => void;
}

const defaultSettings: UserSettings = {
  privacyMode: false,
  discreetNotifications: true,
  biometricLogin: false,
  dataRetentionDays: 30,
};

const defaultProfile: UserProfile = {
  name: "Alex Chen",
  email: "alex.chen@example.com",
  memberSince: "2023-11-15",
  tier: "Gold",
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>(defaultProfile);
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);

  // Load from local storage on mount
  useEffect(() => {
    const storedSettings = localStorage.getItem('hailan_user_settings');
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('hailan_user_settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateProfile = (newProfile: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...newProfile }));
  };

  const logout = () => {
    // Clear sensitive data
    localStorage.removeItem('hailan_user_settings');
    // In a real app, this would clear auth tokens
    window.location.href = '/welcome';
  };

  return (
    <UserContext.Provider value={{ user, settings, updateSettings, updateProfile, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
