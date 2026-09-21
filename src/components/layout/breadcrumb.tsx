import * as React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn("flex items-center text-xs text-slate-500", className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1.5">
        <li>
          <Link
            href="/dashboard"
            className="text-slate-400 hover:text-slate-700 transition-colors flex items-center"
            title="Dashboard Home"
          >
            <Home className="h-3.5 w-3.5" />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-1.5">
            <ChevronRight className="h-3 w-3 text-slate-300 shrink-0" />
            {item.href && !item.current ? (
              <Link
                href={item.href}
                className="text-slate-500 hover:text-slate-900 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-slate-800 truncate max-w-[240px]">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

