import React, { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { MainLayout } from "@/app/components/layout/MainLayout";
import { GlobalSearchOverlay } from "@/app/components/ai/GlobalSearchOverlay";
import { HeroSection } from "@/app/pages/home/components/HeroSection";
import { CategoryGrid } from "@/app/pages/home/components/CategoryGrid";
import { SmartRecommendations } from "@/app/pages/home/components/SmartRecommendations";
import { ContentFeed } from "@/app/pages/home/components/ContentFeed";
import { AIAssistantQuickAccess } from "@/app/pages/home/components/AIAssistantQuickAccess";
import { SmartFeaturesGrid, FeatureCard, features } from "@/app/pages/home/components/SmartFeaturesGrid";

interface HomePageProps {
  onLogout: () => void;
  privacyMode: boolean;
  onPrivacyToggle: (enabled: boolean) => void;
}

export function HomePage({ onLogout, privacyMode, onPrivacyToggle }: HomePageProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <MainLayout>
      <GlobalSearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <button 
        onClick={() => setIsSearchOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#0056b3] text-white rounded-full shadow-2xl z-40 flex items-center justify-center border border-white/10 group overflow-hidden md:bottom-32 animate-fadeIn"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0056b3] to-[#6B46C1] opacity-0 group-hover:opacity-100 transition-opacity" />
        <Search className="w-6 h-6 relative z-10" />
      </button>

      {/* Mobile Layout (< 1024px) */}
      <div className="lg:hidden flex flex-col">
        <HeroSection />
        <CategoryGrid />
        <SmartFeaturesGrid />
        <AIAssistantQuickAccess />
        <SmartRecommendations privacyMode={privacyMode} />
        <ContentFeed />
      </div>

      {/* Desktop Bento Grid Layout (>= 1024px) */}
      <div className="hidden lg:block container mx-auto px-4 py-8 space-y-8">
        
        {/* Top Bento Grid Area */}
        <div className="grid grid-cols-12 gap-6 h-[600px]">
          {/* Hero Tile - Takes up 8 columns and full height */}
          <div className="col-span-8 h-full rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <HeroSection mode="bento" />
          </div>

          {/* Right Side Tiles - 4 columns */}
          <div className="col-span-4 grid grid-rows-2 gap-6 h-full">
            {/* AR Feature Tile */}
            <div className="row-span-1 h-full">
              <FeatureCard feature={features[0]} compact className="h-full" />
            </div>
            
            {/* Quiz Feature Tile */}
            <div className="row-span-1 h-full">
              <FeatureCard feature={features[1]} compact className="h-full" />
            </div>
          </div>
        </div>

        {/* Secondary Bento Grid Area */}
        <div className="grid grid-cols-12 gap-6">
           {/* Recommendations Tile - 8 columns */}
           <div className="col-span-8">
              <SmartRecommendations privacyMode={privacyMode} compact className="h-full" />
           </div>

           {/* AI Assistant Quick Access - 4 columns */}
           <div className="col-span-4 bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
              <AIAssistantQuickAccess compact />
           </div>
        </div>

        {/* Full Width Sections */}
        {/* We wrap CategoryGrid to reduce top padding if needed, or leave as is */}
        <div className="-mt-8">
            <CategoryGrid />
        </div>
        
        <ContentFeed />

      </div>
    </MainLayout>
  );
}
