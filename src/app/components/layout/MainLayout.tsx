import React from "react";
import { Navbar } from "@/app/components/layout/Navbar";
import { Footer } from "@/app/components/layout/Footer";
import { BottomNav } from "@/app/components/layout/BottomNav";
import { usePrivacy } from "@/app/context/PrivacyContext";
import { cn } from "@/app/components/design-system/utils";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  showFooter?: boolean;
  showBottomNav?: boolean;
  contentClassName?: string;
}

export function MainLayout({ 
  children, 
  className,
  showFooter = true,
  showBottomNav = true,
  contentClassName
}: MainLayoutProps) {
  const { isBlur, setIsBlur } = usePrivacy();

  return (
    <div className={cn("min-h-screen bg-[#FDFDFD] font-sans text-neutral-900 pb-20 md:pb-0 relative", className)}>
      <Navbar 
        privacyMode={isBlur} 
        onPrivacyToggle={setIsBlur}
      />

      <main className={cn("w-full", contentClassName)}>
        {children}
      </main>

      {showFooter && <Footer />}
      {showBottomNav && <BottomNav />}
    </div>
  );
}
