import React from 'react';
import { useUser } from '@/app/context/UserContext';
import { 
  User, 
  ShoppingBag, 
  Shield, 
  Heart, 
  CreditCard, 
  LogOut,
  ChevronRight,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export function ProfileSidebar({ activeTab, onTabChange, className }: SidebarProps) {
  const { user, logout } = useUser();

  const menuItems = [
    { id: 'orders', label: 'Order History', icon: ShoppingBag },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'preferences', label: 'App Preferences', icon: Settings },
  ];

  return (
    <div className={cn("bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden", className)}>
      {/* User Info Header */}
      <div className="p-6 bg-gradient-to-br from-brand-deep-blue to-brand-elegant-purple text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center text-xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="font-bold text-lg">{user.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs bg-brand-coral/90 px-2 py-0.5 rounded-full font-medium shadow-sm">
                {user.tier} Member
              </span>
              <span className="text-xs text-white/80">{user.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-brand-light-grey text-brand-deep-blue shadow-sm" 
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn("w-5 h-5", isActive ? "text-brand-elegant-purple" : "text-neutral-400")} />
                <span>{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 text-brand-elegant-purple" />}
            </button>
          );
        })}

        <div className="pt-4 mt-4 border-t border-neutral-100">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
