"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FilePlus2,
  FileText,
  ClipboardCheck,
  History,
  Settings,
  ShieldCheck,
  Stethoscope,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth/auth-context";
import { RoleType } from "@/lib/auth/types";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  highlight?: boolean;
  requiredRoles?: RoleType[];
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export interface AppSidebarProps {
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export function AppSidebar({ isOpenMobile, onCloseMobile }: AppSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const currentRole = user?.role || "DOCTOR";

  const navigationSections: NavSection[] = [
    {
      title: "Clinical Practice",
      items: [
        {
          label: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          label: "Patient Directory",
          href: "/patients",
          icon: Users,
        },
        {
          label: "New Case Intake",
          href: "/cases/new",
          icon: FilePlus2,
          highlight: true,
          requiredRoles: ["DOCTOR", "CLINICAL_STAFF"],
        },
        {
          label: "Clinical Cases",
          href: "/cases",
          icon: FileText,
        },
      ],
    },
    {
      title: "Clinician Verification",
      items: [
        {
          label: "Review Queue",
          href: "/review/queue",
          icon: ClipboardCheck,
          badge: 2,
          requiredRoles: ["DOCTOR"],
        },
      ],
    },
    {
      title: "Governance & System",
      items: [
        {
          label: "Audit Activity",
          href: "/activity",
          icon: History,
          requiredRoles: ["DOCTOR", "ADMINISTRATOR"],
        },
        {
          label: "System Settings",
          href: "/settings",
          icon: Settings,
          requiredRoles: ["DOCTOR", "ADMINISTRATOR"],
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs transition-opacity md:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-40 w-64 border-r border-slate-200/80 bg-white flex flex-col transition-transform duration-200 ease-in-out md:translate-x-0",
          isOpenMobile ? "translate-x-0 shadow-xl" : "-translate-x-full"
        )}
      >
        {/* Brand / Workstation Header */}
        <div className="h-15 px-4 flex items-center justify-between border-b border-slate-100 bg-white">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-700 text-white shadow-2xs group-hover:bg-teal-800 transition-colors">
              <Stethoscope className="h-4.5 w-4.5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-sm tracking-tight leading-none">
                  AROGYA
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200/60 px-1 py-0.2 rounded">
                  Clinical
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium tracking-tight mt-0.5">
                Healthcare Workstation
              </span>
            </div>
          </Link>

          {/* Mobile close button */}
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 md:hidden"
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Clinical Node Status Indicator */}
        <div className="px-3.5 py-1.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-600 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 ring-2 ring-emerald-100" />
            <span className="truncate max-w-[150px]">General OPD • Room 104</span>
          </div>
          {user?.isDemo && (
            <span className="text-[9px] font-mono font-semibold text-amber-800 bg-amber-100/70 border border-amber-200/80 px-1 py-0.2 rounded">
              DEMO
            </span>
          )}
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 px-3 py-3 space-y-4 overflow-y-auto">
          {navigationSections.map((section) => {
            const filteredItems = section.items.filter((item) => {
              if (!item.requiredRoles) return true;
              return item.requiredRoles.includes(currentRole);
            });

            if (filteredItems.length === 0) return null;

            return (
              <div key={section.title} className="space-y-0.5">
                <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                  {section.title}
                </h3>
                <div className="space-y-0.5">
                  {filteredItems.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      pathname === item.href ||
                      (item.href !== "/dashboard" && pathname.startsWith(item.href));

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onCloseMobile}
                        className={cn(
                          "flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-all select-none group border-l-2",
                          isActive
                            ? "bg-teal-50/80 text-teal-950 font-semibold border-teal-700 shadow-2xs"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-transparent",
                          item.highlight && !isActive && "text-teal-800"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon
                            className={cn(
                              "h-4 w-4 shrink-0 transition-colors",
                              isActive
                                ? "text-teal-700 stroke-[2.2]"
                                : "text-slate-400 group-hover:text-slate-600",
                              item.highlight && !isActive && "text-teal-600"
                            )}
                          />
                          <span className="tracking-tight">{item.label}</span>
                        </div>

                        {item.badge !== undefined && (
                          <span
                            className={cn(
                              "px-1.5 py-0.2 rounded text-[10px] font-semibold tabular-nums",
                              isActive
                                ? "bg-teal-700 text-white"
                                : "bg-amber-100 text-amber-900 border border-amber-200/80"
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Clinical Safeguard Assurance Notice */}
        <div className="p-2.5 mx-3 mb-2 rounded-md border border-slate-200/80 bg-slate-50/70 text-[10px] text-slate-500">
          <div className="flex items-center gap-1.5 text-slate-700 font-semibold mb-0.5">
            <ShieldCheck className="h-3.5 w-3.5 text-teal-700 shrink-0" />
            <span className="text-[10px]">Clinician Verification</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-snug">
            AI structuring is assistive. Clinician approval is required on all final encounter records.
          </p>
        </div>

        {/* User Identity & Role Footer */}
        <div className="p-3 border-t border-slate-200/80 bg-slate-50/50 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <Avatar
              name={user?.name || "Dr. Priya Sharma"}
              size="sm"
              roleIndicator={currentRole === "DOCTOR" ? "doctor" : currentRole === "ADMINISTRATOR" ? "admin" : "staff"}
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-900 truncate tracking-tight">
                {user?.name || "Dr. Priya Sharma"}
              </p>
              <p className="text-[10px] text-slate-500 truncate">
                {user?.roleName || "Attending Physician"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => logout()}
            className="p-1.5 text-slate-400 hover:text-rose-700 hover:bg-rose-50 rounded transition-colors"
            title="Sign out of clinical session"
            aria-label="Sign out"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </aside>
    </>
  );
}
