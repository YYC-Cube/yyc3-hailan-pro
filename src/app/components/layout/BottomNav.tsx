import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Grid, Box, Users, User, Hexagon } from "lucide-react";
import { cn } from "@/app/components/design-system/utils";
import { motion } from "motion/react";

export function BottomNav() {
  const location = useLocation();
  const active = location.pathname;

  const navItems = [
    { id: "home", icon: Home, label: "首页", path: "/" },
    { id: "categories", icon: Grid, label: "分类", path: "/category" },
    { id: "ar", icon: Hexagon, label: "AR体验", path: "/ar-start", isCore: true },
    { id: "community", icon: Users, label: "社区", path: "/community" },
    { id: "me", icon: User, label: "我的", path: "/profile" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && active === "/") return true;
    if (path !== "/" && active.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-t border-white/20 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]" />
      
      <div className="relative flex h-[calc(3.5rem+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)] items-center justify-around px-2">
        {navItems.map((item) => {
          const activeState = isActive(item.path);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.id}
              to={item.path}
              className="relative flex flex-col items-center justify-center w-full h-full group"
            >
              {activeState && (
                <motion.div
                  layoutId="bottomNavGlow"
                  className={cn(
                    "absolute -top-6 w-12 h-12 rounded-full blur-xl opacity-60",
                    item.isCore ? "bg-brand-coral" : "bg-brand-deep-blue"
                  )}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                />
              )}
              
              <motion.div
                animate={{
                  y: activeState ? -6 : 0,
                  scale: activeState ? 1.1 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={cn(
                  "relative z-10 flex flex-col items-center",
                  item.isCore && "text-brand-coral"
                )}
              >
                <div className={cn(
                  "p-1 rounded-xl transition-colors duration-300",
                  activeState ? (item.isCore ? "text-brand-coral" : "text-brand-deep-blue") : "text-neutral-400",
                  item.isCore && !activeState && "text-brand-coral/80"
                )}>
                  {item.isCore ? (
                    <div className={cn(
                      "p-2 rounded-2xl",
                      activeState ? "bg-brand-coral text-white shadow-lg shadow-brand-coral/40" : "bg-brand-coral/10"
                    )}>
                      <Icon className="w-6 h-6" fill={activeState ? "currentColor" : "none"} />
                    </div>
                  ) : (
                    <Icon className="w-6 h-6" fill={activeState ? "currentColor" : "none"} strokeWidth={activeState ? 2.5 : 2} />
                  )}
                </div>
                
                <span className={cn(
                  "text-[10px] font-medium transition-all duration-300 mt-1",
                  activeState ? (item.isCore ? "text-brand-coral font-bold" : "text-brand-deep-blue font-bold") : "text-neutral-400",
                  item.isCore && !activeState && "text-brand-coral/80"
                )}>
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
