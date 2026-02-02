import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Lock, Eye, EyeOff } from "lucide-react";
import { cn } from "./utils";

interface PanicButtonProps {
  isActive: boolean;
  onToggle: (newState: boolean) => void;
  className?: string;
  variant?: "floating" | "navbar";
}

export function PanicButton({ isActive, onToggle, className, variant = "floating" }: PanicButtonProps) {
  const handleClick = () => {
    // Haptic feedback (Vibration)
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      // Distinct vibration patterns for ON and OFF
      if (!isActive) {
        navigator.vibrate([50, 30, 50]); // Double tap for ON (Safe)
      } else {
        navigator.vibrate(200); // Long single tap for OFF (Caution)
      }
    }
    
    onToggle(!isActive);
  };

  if (variant === "navbar") {
    return (
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        className={cn(
          "relative flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 border overflow-hidden group",
          isActive 
            ? "bg-brand-navy border-brand-hailan-blue/40 text-brand-gold hover:bg-brand-navy-light" 
            : "bg-white border-brand-deep-blue/20 text-brand-deep-blue hover:bg-brand-deep-blue/5",
          className
        )}
      >
        <AnimatePresence mode="wait">
          {isActive ? (
            <motion.div
              key="locked"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Lock className="w-4 h-4" />
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -180 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Eye className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
        
        <span className="text-xs font-bold relative z-10">
          {isActive ? "隐私模式" : "标准模式"}
        </span>

        {/* Pulse effect when active */}
        {isActive && (
          <span className="absolute inset-0 bg-brand-gold/10 animate-pulse" />
        )}
      </motion.button>
    );
  }

  // Floating Variant (Default) - High Z-Index "Panic" Button
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className={cn(
        "fixed z-[9999] flex items-center justify-center rounded-full shadow-2xl transition-colors duration-300 backdrop-blur-md border border-white/20",
        isActive 
          ? "bg-gradient-to-br from-green-500 to-emerald-700 text-white shadow-green-900/30" 
          : "bg-gradient-to-br from-brand-navy-light to-brand-navy text-neutral-400 shadow-brand-navy/40",
        className
      )}
      style={{
        width: 56,
        height: 56,
        bottom: 100, // Adjusted to sit above bottom nav
        right: 24,
      }}
    >
      <div className="relative">
        <AnimatePresence mode="wait">
          {isActive ? (
            <motion.div
              key="shield"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Shield className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="eye-off"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <EyeOff className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Ring Animation */}
        {isActive && (
          <span className="absolute -inset-4 rounded-full border-2 border-green-400/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
        )}
      </div>
    </motion.button>
  );
}
