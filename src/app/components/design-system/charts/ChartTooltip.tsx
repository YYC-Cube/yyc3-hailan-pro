import React from "react";
import { cn } from "../utils";

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  className?: string;
  valueFormatter?: (value: number) => string;
}

export function ChartTooltip({
  active,
  payload,
  label,
  className,
  valueFormatter = (value: number) => `${value}`,
}: TooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div
        className={cn(
          "bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 p-3 rounded-xl shadow-xl text-sm z-50",
          className
        )}
      >
        <p className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
          {label}
        </p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-neutral-500 dark:text-neutral-400 capitalize">
                {entry.name}:
              </span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                {valueFormatter(entry.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
