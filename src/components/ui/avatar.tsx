import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  size?: "sm" | "md" | "lg";
  imageUrl?: string;
  roleIndicator?: "doctor" | "worker" | "nurse" | "admin" | "staff";
}

export function Avatar({
  name,
  size = "md",
  imageUrl,
  roleIndicator,
  className,
  ...props
}: AvatarProps) {
  const getInitials = (str: string) => {
    if (!str) return "AR";
    const parts = str.trim().split(" ").filter(Boolean);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const sizeStyles = {
    sm: "h-7 w-7 text-xs font-semibold",
    md: "h-9 w-9 text-sm font-semibold",
    lg: "h-11 w-11 text-base font-semibold",
  };

  return (
    <div className="relative inline-flex shrink-0">
      <div
        className={cn(
          "flex items-center justify-center rounded-full font-medium select-none bg-slate-100 text-slate-700 border border-slate-200 overflow-hidden shadow-2xs",
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>
      {roleIndicator && (
        <span
          className={cn(
            "absolute bottom-0 right-0 block rounded-full ring-2 ring-white",
            size === "sm" ? "h-2 w-2" : "h-2.5 w-2.5",
            roleIndicator === "doctor"
              ? "bg-teal-600"
              : roleIndicator === "worker"
              ? "bg-sky-600"
              : roleIndicator === "admin"
              ? "bg-slate-700"
              : "bg-emerald-600"
          )}
          title={`Role: ${roleIndicator}`}
        />
      )}
    </div>
  );
}
