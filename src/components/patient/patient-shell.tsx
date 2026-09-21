"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Stethoscope,
  LayoutDashboard,
  FileText,
  User,
  Pill,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Heart,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface PatientShellProps {
  children: React.ReactNode;
}

export function PatientShell({ children }: PatientShellProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    {
      label: "Dashboard",
      href: "/patient/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/patient/dashboard",
    },
    {
      label: "My Health Records",
      href: "/patient/records",
      icon: FileText,
      active: pathname.startsWith("/patient/records"),
    },
    {
      label: "My Profile",
      href: "/patient/profile",
      icon: User,
      active: pathname === "/patient/profile",
    },
    {
      label: "Medicine Assistant",
      href: "/patient/medicine-assistant",
      icon: Pill,
      badge: "Educational",
      active: pathname === "/patient/medicine-assistant",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafb] text-slate-900 flex flex-col selection:bg-teal-100 selection:text-teal-900">
      {/* Patient Portal Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <div className="flex items-center gap-3">
              <Link href="/patient/dashboard" className="flex items-center gap-2.5 group">
                <div className="h-9 w-9 rounded-lg bg-teal-700 text-white flex items-center justify-center shadow-2xs group-hover:bg-teal-800 transition-colors">
                  <Stethoscope className="h-5 w-5 stroke-[2.2]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg tracking-tight text-slate-900">AROGYA</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.5 rounded">
                    Patient Portal
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-xs font-semibold ${
                      item.active
                        ? "bg-teal-50 text-teal-900 border border-teal-200/80"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${item.active ? "text-teal-700" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] font-mono text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200/80">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* User Session & Logout */}
            <div className="hidden md:flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-900 leading-tight">
                  {user?.name || "Rajesh Gupta"}
                </p>
                <p className="text-[10px] text-slate-500 font-mono">
                  UHID: {user?.licenseNumber || "AIIMS-2026-0941"}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => logout()}
                leftIcon={<LogOut className="h-3.5 w-3.5 text-slate-400" />}
                className="text-xs text-slate-700 hover:text-rose-700 hover:border-rose-300"
              >
                Sign Out
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-4 space-y-2 animate-in slide-in-from-top-2 duration-150">
            <div className="pb-2 mb-2 border-b border-slate-100">
              <p className="text-xs font-bold text-slate-900">{user?.name || "Rajesh Gupta"}</p>
              <p className="text-[11px] text-slate-500 font-mono">
                UHID: {user?.licenseNumber || "AIIMS-2026-0941"}
              </p>
            </div>
            <nav className="flex flex-col space-y-1 text-sm font-medium">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold ${
                      item.active
                        ? "bg-teal-50 text-teal-900 border border-teal-200/80"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`h-4 w-4 ${item.active ? "text-teal-700" : "text-slate-400"}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[9px] font-mono text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200/80">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
            <div className="pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full justify-center text-xs text-rose-700 border-rose-200 hover:bg-rose-50"
                leftIcon={<LogOut className="h-3.5 w-3.5" />}
              >
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Main Patient Content Canvas */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>

      {/* Patient Portal Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-teal-700" />
            <span>Arogya Patient Health Portal • Confidential Medical Information</span>
          </div>
          <p className="text-[11px] text-slate-400">
            For medical emergencies, please visit your nearest hospital emergency room.
          </p>
        </div>
      </footer>
    </div>
  );
}

