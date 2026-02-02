import * as React from "react";
import { cn } from "./utils";
import { motion, HTMLMotionProps } from "framer-motion";

export interface GlassCardProps extends HTMLMotionProps<"div"> {
  hoverEffect?: boolean;
  active?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, hoverEffect = true, active = false, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={hoverEffect ? { 
          y: -4, 
          boxShadow: "0 20px 40px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" 
        } : {}}
        className={cn(
          "relative overflow-hidden rounded-2xl border backdrop-blur-md transition-all duration-300",
          "bg-white/70 border-white/40 shadow-sm", // Light mode default
          "dark:bg-brand-navy/70 dark:border-white/10",
          active && "ring-2 ring-brand-deep-blue/50 border-brand-deep-blue/20 bg-blue-50/50",
          className
        )}
        {...props}
      >
        {/* Shine Effect on Hover */}
        {hoverEffect && (
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        )}
        
        {children}
      </motion.div>
    );
  }
);
GlassCard.displayName = "GlassCard";

// Interactive List Item Component
export interface InteractiveListItemProps extends HTMLMotionProps<"li"> {
  active?: boolean;
}

export const InteractiveListItem = React.forwardRef<HTMLLIElement, InteractiveListItemProps>(
  ({ className, children, active, ...props }, ref) => {
    return (
      <motion.li
        ref={ref}
        layout
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.6)" }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "group flex items-center p-3 rounded-xl mb-2 cursor-pointer border border-transparent transition-colors",
          active 
            ? "bg-brand-deep-blue/5 border-brand-deep-blue/20" 
            : "hover:bg-neutral-50 hover:border-neutral-200",
          className
        )}
        {...props}
      >
        {children}
        
        {/* Chevron/Action Reveal hint */}
        <div className="ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
           {/* Can inject arrow or action here via children, but this is a slot for it */}
        </div>
      </motion.li>
    );
  }
);
InteractiveListItem.displayName = "InteractiveListItem";
