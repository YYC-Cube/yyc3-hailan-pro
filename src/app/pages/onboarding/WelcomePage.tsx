import React from "react";
import { Button } from "@/app/components/design-system/Button";
import { Shield, ArrowRight, Info } from "lucide-react";
import { BrandLogo } from "@/app/components/BrandLogo";
import { motion } from "framer-motion";

interface WelcomePageProps {
  onStart: () => void;
  onPrivacyPolicy: () => void;
}

export function WelcomePage({ onStart, onPrivacyPolicy }: WelcomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-pink-500 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>
      
      {/* Animated Background Orbs */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto"
      >
        {/* Logo */}
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <BrandLogo variant="full" size="xl" />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-xl md:text-3xl text-white font-light mb-2">
            高端私密 · 健康生活
          </p>
          <p className="text-base md:text-lg text-white/80 mb-12 tracking-widest uppercase">
            Premium Intimate Wellness
          </p>
        </motion.div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <Button 
            size="lg" 
            className="bg-brand-coral hover:bg-brand-coral/90 text-white min-w-[200px] h-14 text-lg rounded-2xl shadow-xl hover:shadow-brand-coral/20"
            onClick={onStart}
          >
            开始探索 <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white/20 text-white hover:bg-white/10 backdrop-blur-md min-w-[200px] h-14 text-lg rounded-2xl"
            onClick={onPrivacyPolicy}
          >
            隐私说明 <Info className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </motion.div>

      {/* Footer Age Confirmation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-0 right-0 text-center px-4 z-10"
      >
        <p className="text-white/60 text-sm">
          需年满 18 岁方可使用此应用。进入即代表您同意我们的服务条款。
          <br />
          <span className="text-xs opacity-50 uppercase tracking-tighter">18+ Only. By entering, you agree to our Terms of Service.</span>
        </p>
      </motion.div>
    </div>
  );
}
