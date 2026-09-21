import * as React from "react";
import { cn } from "@/lib/utils";
import { CaseStatus, SeverityLevel } from "@/types/clinical";

export interface StatusBadgeProps {
  status: CaseStatus | SeverityLevel | string;
  size?: "sm" | "md";
  className?: string;
  showDot?: boolean;
}

export function StatusBadge({
  status,
  size = "md",
  className,
  showDot = true,
}: StatusBadgeProps) {
  const normalized = status.toUpperCase();

  let config = {
    bg: "bg-slate-100",
    text: "text-slate-700",
    border: "border-slate-200",
    dot: "bg-slate-400",
    label: status,
  };

  switch (normalized) {
    case "DRAFT":
      config = {
        bg: "bg-slate-100/90",
        text: "text-slate-700",
        border: "border-slate-200",
        dot: "bg-slate-400",
        label: "Draft",
      };
      break;
    case "AI_STRUCTURED":
    case "AI_ASSISTED":
    case "AI_DRAFT":
      config = {
        bg: "bg-teal-50/90",
        text: "text-teal-800",
        border: "border-teal-200/80",
        dot: "bg-teal-600",
        label: "AI Assisted Draft",
      };
      break;
    case "UNDER_REVIEW":
    case "PENDING":
    case "PENDING_REVIEW":
      config = {
        bg: "bg-amber-50/90",
        text: "text-amber-900",
        border: "border-amber-200/90",
        dot: "bg-amber-500",
        label: "Pending Review",
      };
      break;
    case "FINALIZED":
    case "SIGNED":
    case "APPROVED":
    case "CLINICIAN_APPROVED":
      config = {
        bg: "bg-emerald-50/90",
        text: "text-emerald-900",
        border: "border-emerald-200/80",
        dot: "bg-emerald-600",
        label: "Clinician Approved",
      };
      break;
    case "AMENDED":
      config = {
        bg: "bg-sky-50/90",
        text: "text-sky-900",
        border: "border-sky-200/80",
        dot: "bg-sky-600",
        label: "Amended",
      };
      break;
    case "CRITICAL":
    case "HIGH":
      config = {
        bg: "bg-rose-50/90",
        text: "text-rose-900",
        border: "border-rose-200/90",
        dot: "bg-rose-600",
        label: normalized === "CRITICAL" ? "Critical" : "High Severity",
      };
      break;
    case "MODERATE":
    case "NEEDS_ATTENTION":
      config = {
        bg: "bg-amber-50/90",
        text: "text-amber-900",
        border: "border-amber-200/80",
        dot: "bg-amber-500",
        label: "Needs Attention",
      };
      break;
    case "LOW":
    case "ROUTINE":
      config = {
        bg: "bg-slate-100/90",
        text: "text-slate-700",
        border: "border-slate-200",
        dot: "bg-slate-400",
        label: "Routine",
      };
      break;
    case "COMPLETED":
      config = {
        bg: "bg-emerald-50/90",
        text: "text-emerald-900",
        border: "border-emerald-200/80",
        dot: "bg-emerald-600",
        label: "Completed",
      };
      break;
  }

  const sizeClasses =
    size === "sm"
      ? "px-2 py-0.5 text-[11px] gap-1.5 font-medium"
      : "px-2.5 py-1 text-xs gap-1.5 font-medium";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border select-none tracking-tight",
        config.bg,
        config.text,
        config.border,
        sizeClasses,
        className
      )}
    >
      {showDot && (
        <span
          className={cn("h-1.5 w-1.5 rounded-full shrink-0", config.dot)}
          aria-hidden="true"
        />
      )}
      <span>{config.label}</span>
    </span>
  );
}
