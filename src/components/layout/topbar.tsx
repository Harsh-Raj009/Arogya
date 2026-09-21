"use client";

import * as React from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  Bell,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/auth-context";

export interface TopbarProps {
  onOpenMobileMenu: () => void;
}

export function Topbar({ onOpenMobileMenu }: TopbarProps) {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const { user } = useAuth();
  const isClinician = user?.role === "DOCTOR" || user?.role === "CLINICAL_STAFF";

  const notifications = [
    {
      id: "n1",
      title: "Case #AR-2026-0042 ready for review",
      subtitle: "AI structured intake draft completed for Rajesh Gupta",
      time: "10m ago",
      type: "review",
    },
    {
      id: "n2",
      title: "Documented Allergy Flag",
      subtitle: "Penicillin allergy noted in Anita Verma history",
      time: "24m ago",
      type: "alert",
    },
    {
      id: "n3",
      title: "OPD session authenticated",
      subtitle: "General OPD shift session active at Room 104",
      time: "1h ago",
      type: "system",
    },
  ];

  return (
    <header className="sticky top-0 z-30 h-14 bg-white/95 backdrop-blur-xs border-b border-slate-200/80 flex items-center justify-between px-4 sm:px-6">
      {/* Left: Mobile hamburger & Global Search */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 md:hidden"
          aria-label="Open navigation sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative w-full hidden sm:block">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="search"
            placeholder="Search patient UHID, name, or case number..."
            className="w-full h-8.5 rounded-md border border-slate-200 bg-slate-50/60 pl-9 pr-12 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/25 focus-visible:border-teal-700 transition-all shadow-2xs"
          />
          <kbd className="absolute right-2.5 top-2 hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 rounded">
            Ctrl+K
          </kbd>
        </div>
      </div>

      {/* Right: Operational Status, Quick Action & Notifications */}
      <div className="flex items-center gap-2.5">
        {/* Active Shift Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200/80 text-xs text-slate-600 font-medium">
          <Clock className="h-3.5 w-3.5 text-teal-700" />
          <span>General OPD • Room 104</span>
        </div>

        {/* Quick New Case Button */}
        {isClinician && (
          <Link href="/cases/new">
            <Button variant="primary" size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>
              <span className="hidden sm:inline">New Case Intake</span>
              <span className="sm:hidden">Intake</span>
            </Button>
          </Link>
        )}

        {/* Notification Bell with Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-amber-500 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div
              className="absolute right-0 mt-2 w-80 rounded-lg border border-slate-200 bg-white shadow-lg p-2 z-50 animate-in fade-in zoom-in-95 duration-100"
              onBlur={() => setShowNotifications(false)}
            >
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-900 tracking-tight">Clinical Notifications</span>
                <span
                  onClick={() => setShowNotifications(false)}
                  className="text-[10px] text-teal-700 font-medium hover:underline cursor-pointer"
                >
                  Close
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {notifications.map((item) => (
                  <div key={item.id} className="p-2.5 hover:bg-slate-50/80 transition-colors text-xs">
                    <div className="flex items-start gap-2">
                      {item.type === "alert" ? (
                        <AlertTriangle className="h-3.5 w-3.5 text-rose-600 shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 className="h-3.5 w-3.5 text-teal-700 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 leading-tight tracking-tight">{item.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                          {item.subtitle}
                        </p>
                        <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                          {item.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
