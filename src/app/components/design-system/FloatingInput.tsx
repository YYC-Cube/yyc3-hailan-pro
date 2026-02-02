import * as React from "react";
import { cn } from "./utils";
import { motion } from "framer-motion";

export interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, label, icon, error, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(!!props.value || !!props.defaultValue);
    const inputId = id || React.useId();

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      props.onBlur?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      props.onChange?.(e);
    };

    return (
      <div className="relative group w-full mb-6">
        <div
          className={cn(
            "relative flex items-center w-full rounded-xl border transition-all duration-300 overflow-hidden",
            isFocused
              ? "bg-white/90 border-brand-deep-blue shadow-lg shadow-brand-deep-blue/5"
              : "bg-neutral-50/50 border-neutral-200 hover:bg-white/80 hover:border-neutral-300",
            error ? "border-semantic-error bg-semantic-error/5" : "",
            className
          )}
        >
          {/* Icon (Left) */}
          {icon && (
            <div className={cn(
              "pl-4 pr-2 transition-colors duration-300",
              isFocused ? "text-brand-deep-blue" : "text-neutral-400"
            )}>
              {icon}
            </div>
          )}

          {/* Input Field */}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "peer w-full bg-transparent px-4 pt-6 pb-2 text-base text-neutral-900 placeholder-transparent focus:outline-none z-10",
              !icon && "pl-4"
            )}
            placeholder={label} // Required for :placeholder-shown trick if we used CSS, but we use state
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />

          {/* Floating Label */}
          <label
            htmlFor={inputId}
            className={cn(
              "absolute left-4 transition-all duration-300 pointer-events-none origin-left",
              icon ? "left-10" : "left-4",
              isFocused || hasValue
                ? "top-2 text-xs font-semibold text-brand-deep-blue"
                : "top-1/2 -translate-y-1/2 text-neutral-500 text-base font-normal",
              error ? "text-semantic-error" : ""
            )}
          >
            {label}
          </label>

          {/* Active Indicator Line (Optional, for extra flair) */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isFocused ? 1 : 0 }}
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-deep-blue origin-left"
          />
        </div>

        {/* Error Message */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-5 left-1 text-xs text-semantic-error font-medium"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);
FloatingInput.displayName = "FloatingInput";

export { FloatingInput };
