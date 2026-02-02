import React from "react";
import { cn } from "./utils";
import { GlassCard } from "./GlassCard";
import { motion, Variants } from "framer-motion";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: number; // Base columns on desktop
}

export function BentoGrid({ children, className, cols = 4 }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(150px,auto)]",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoItemProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2 | 3 | 4;
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  delay?: number;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: delay * 0.1,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad-ish
    },
  }),
};

export function BentoItem({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
  title,
  subtitle,
  headerAction,
  delay = 0,
}: BentoItemProps) {
  // Map span props to tailwind classes
  const colSpanClass = {
    1: "col-span-1",
    2: "col-span-1 md:col-span-2",
    3: "col-span-1 md:col-span-3",
    4: "col-span-1 md:col-span-2 lg:col-span-4",
  }[colSpan];

  const rowSpanClass = {
    1: "row-span-1",
    2: "row-span-2",
    3: "row-span-3",
    4: "row-span-4",
  }[rowSpan];

  return (
    <GlassCard
      className={cn(
        "flex flex-col h-full",
        colSpanClass,
        rowSpanClass,
        className
      )}
      custom={delay}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      hoverEffect={true}
    >
      {(title || subtitle || headerAction) && (
        <div className="flex items-center justify-between p-4 pb-2">
          <div>
            {title && (
              <h3 className="font-bold text-lg text-neutral-800 dark:text-neutral-100">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {subtitle}
              </p>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="flex-1 p-4 pt-2 overflow-hidden relative">
        {children}
      </div>
    </GlassCard>
  );
}
