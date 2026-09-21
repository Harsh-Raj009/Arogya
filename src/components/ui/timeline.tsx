import * as React from "react";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  id: string;
  title: string;
  timestamp: string;
  description?: string;
  actor?: string;
  actorRole?: string;
  status?: "default" | "success" | "warning" | "alert";
  icon?: React.ReactNode;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  const statusColors = {
    default: "bg-slate-400 border-white",
    success: "bg-emerald-600 border-white",
    warning: "bg-amber-500 border-white",
    alert: "bg-rose-600 border-white",
  };

  return (
    <div className={cn("flow-root", className)}>
      <ul className="-mb-8">
        {items.map((item, itemIdx) => (
          <li key={item.id}>
            <div className="relative pb-8">
              {itemIdx !== items.length - 1 ? (
                <span
                  className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex items-start space-x-3">
                <div className="relative">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border-2 text-white shadow-xs",
                      item.icon ? "bg-slate-100 border-slate-200 text-slate-700" : (statusColors[item.status || "default"])
                    )}
                  >
                    {item.icon ? (
                      <span className="h-4 w-4 flex items-center justify-center">{item.icon}</span>
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-current" />
                    )}
                  </div>
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex items-center justify-between text-xs">
                    <p className="font-semibold text-slate-900 tracking-tight">{item.title}</p>
                    <time className="text-slate-400 font-mono text-[11px]">{item.timestamp}</time>
                  </div>
                  {item.description && (
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                  {item.actor && (
                    <p className="mt-1 text-[11px] text-slate-400">
                      by <span className="font-medium text-slate-600">{item.actor}</span>
                      {item.actorRole && ` (${item.actorRole})`}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

