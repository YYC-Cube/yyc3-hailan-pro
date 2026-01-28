import * as React from "react";
import { cn } from "./utils";
import { EyeOff } from "lucide-react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  isPrivacyMode?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, isPrivacyMode = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border border-neutral-200 bg-white text-neutral-950 shadow-level-1 overflow-hidden relative",
          className
        )}
        {...props}
      >
        {isPrivacyMode && (
           <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/10 backdrop-blur-md transition-all hover:bg-transparent hover:backdrop-blur-none group cursor-pointer">
              <div className="flex flex-col items-center text-brand-deep-blue group-hover:opacity-0 transition-opacity">
                 <EyeOff className="w-8 h-8 mb-2" />
                 <span className="text-xs font-medium uppercase tracking-wider">Privacy Mode</span>
              </div>
           </div>
        )}
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-neutral-500", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
