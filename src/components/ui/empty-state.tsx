import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-lg border border-dashed border-slate-200 bg-slate-50/40",
        className
      )}
    >
      <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 mb-3 border border-slate-200/80 shadow-2xs">
        {icon || <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-teal-700/80" />}
      </div>
      <h3 className="text-sm font-semibold text-slate-900 mb-1 tracking-tight">{title}</h3>
      <p className="text-xs text-slate-500 max-w-sm mb-4 leading-relaxed">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
