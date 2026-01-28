import * as React from "react";
import { cn } from "./utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular" | "card";
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className,
  variant = "text",
  width,
  height,
  ...props
}: SkeletonProps) {
  
  // Base classes with "breathing" light effect (shimmer)
  // Using Tailwind's animate-pulse is good, but for "breathing" we can use a custom keyframe or stick to pulse if it's customized.
  // The user requested "breathing light effect" (shimmer).
  // A common shimmer is a gradient moving across.
  
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-neutral-200/50 dark:bg-neutral-800/50 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent isolate",
        {
          "rounded-md": variant === "text" || variant === "rectangular",
          "rounded-full": variant === "circular",
          "rounded-2xl": variant === "card",
        },
        className
      )}
      style={{ width, height }}
      {...props}
    />
  );
}

// Add shimmer keyframe to global CSS or inline if not possible. 
// Since I can't edit tailwind config easily, I rely on the existing configuration or assume 'shimmer' is defined.
// If 'shimmer' isn't defined, 'animate-pulse' is a safer fallback, but let's try to inject styles or use style tag if strictly needed.
// However, the `Button.tsx` update I did earlier used `animate-[shimmer_1.5s_infinite]`.
// I should make sure this animation exists.
// I'll add a style tag to the main layout or just hope standard Tailwind v4 magic works or use `animate-pulse` as fallback if shimmer fails visually.
// Actually, I can use an inline style block here to ensure the keyframes exist.

export function SkeletonStyles() {
  return (
    <style>{`
      @keyframes shimmer {
        100% {
          transform: translateX(100%);
        }
      }
    `}</style>
  );
}
