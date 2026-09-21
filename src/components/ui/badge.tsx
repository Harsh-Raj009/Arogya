import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "teal" | "blue" | "amber" | "red" | "emerald";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-slate-100 text-slate-700 border-slate-200/90",
    secondary: "bg-slate-100/80 text-slate-800 border-slate-200",
    outline: "border-slate-200 bg-white text-slate-700 shadow-2xs",
    teal: "bg-teal-50 text-teal-900 border-teal-200/80",
    blue: "bg-sky-50 text-sky-900 border-sky-200/80",
    amber: "bg-amber-50 text-amber-900 border-amber-200/90",
    red: "bg-rose-50 text-rose-900 border-rose-200/90",
    emerald: "bg-emerald-50 text-emerald-900 border-emerald-200/80",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[11px] font-medium tracking-tight",
    md: "px-2.5 py-0.5 text-xs font-medium tracking-tight",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded border font-medium select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
