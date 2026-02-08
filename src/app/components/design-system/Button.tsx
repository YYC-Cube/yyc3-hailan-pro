import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";
import { Loader2, EyeOff } from "lucide-react";
import { motion, HTMLMotionProps } from "framer-motion";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-deep-blue focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-white relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-brand-deep-blue text-white hover:bg-brand-deep-blue/90 shadow-level-1",
        secondary: "border border-brand-deep-blue text-brand-deep-blue hover:bg-brand-deep-blue/10",
        ghost: "hover:bg-neutral-100 text-brand-deep-blue",
        link: "text-brand-deep-blue underline-offset-4 hover:underline",
        privacy: "bg-brand-elegant-purple text-white hover:bg-brand-elegant-purple/90 shadow-level-1 gap-2",
        destructive: "bg-semantic-error text-white hover:bg-semantic-error/90",
        outline: "border border-neutral-300 bg-transparent hover:bg-neutral-100 text-neutral-900",
        
        // New High-End Variants
        liquid: "bg-gradient-to-r from-neutral-700 via-neutral-500 to-neutral-700 text-white bg-[length:200%_auto] hover:bg-[position:right_center] transition-[background-position] duration-500 shadow-lg hover:shadow-xl border border-white/10",
        aurora: "bg-gradient-to-r from-[#0056b3] via-[#6B46C1] to-[#0056b3] text-white bg-[length:200%_auto] hover:bg-[position:right_center] transition-[background-position] duration-700 shadow-lg hover:shadow-brand-deep-blue/20 border border-white/10 backdrop-blur-md",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md text-base",
        icon: "h-10 w-10",
        xl: "h-14 px-10 rounded-xl text-lg font-bold"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Add motion props support
type MotionButtonProps = HTMLMotionProps<"button"> & VariantProps<typeof buttonVariants> & {
  isLoading?: boolean;
  as?: keyof JSX.IntrinsicElements;
};

const Button = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, variant, size, isLoading, children, as = "button", ...props }, ref) => {
    // Determine if we should use specialized animations based on variant
    const isSpecialVariant = variant === "liquid" || variant === "aurora";
    
    // Safety check for motion
    // @ts-ignore
    let Component: any = as || "button";
    
    // Only try to use motion if:
    // 1. motion is defined
    // 2. as is a string (primitive element)
    // 3. motion[as] exists
    if (motion && typeof as === "string" && (motion as any)[as]) {
      Component = (motion as any)[as];
    }
    
    // Fallback to "button" if Component somehow became undefined/null
    if (!Component) {
      Component = "button";
    }

    return (
      <Component
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || (props as any).disabled}
        whileTap={{ scale: 0.96 }}
        whileHover={isSpecialVariant ? { scale: 1.02 } : {}}
        {...props}
      >
        {/* Shimmer effect for special variants */}
        {isSpecialVariant && (
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
        )}
        
        <span className="relative flex items-center gap-2 z-10">
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {!isLoading && variant === 'privacy' && <EyeOff className="w-4 h-4" />}
          {children}
        </span>
      </Component>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
