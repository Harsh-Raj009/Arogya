import * as React from "react";
import { Breadcrumb, BreadcrumbItem } from "./breadcrumb";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  title: string;
  eyebrow?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  eyebrow,
  description,
  breadcrumbs,
  actions,
  badge,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-2 pb-5 border-b border-slate-200/70 mb-6", className)}>
      {breadcrumbs && <Breadcrumb items={breadcrumbs} className="mb-1" />}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          {eyebrow && (
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-teal-800/90 mb-0.5">
              {eyebrow}
            </span>
          )}
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-slate-900 leading-tight">
              {title}
            </h1>
            {badge && <div className="shrink-0">{badge}</div>}
          </div>
          {description && (
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-3xl mt-0.5">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">{actions}</div>}
      </div>
    </div>
  );
}
