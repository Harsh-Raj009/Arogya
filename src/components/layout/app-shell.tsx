"use client";

import * as React from "react";
import { AppSidebar } from "./app-sidebar";
import { Topbar } from "./topbar";
import { ToastProvider } from "@/components/ui/toast";
import { ShieldCheck } from "lucide-react";

export interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#f8fafb] flex text-slate-900">
        {/* Persistent Navigation Sidebar */}
        <AppSidebar
          isOpenMobile={isMobileNavOpen}
          onCloseMobile={() => setIsMobileNavOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col md:pl-64 min-w-0">
          {/* Top Utility Bar */}
          <Topbar onOpenMobileMenu={() => setIsMobileNavOpen(true)} />

          {/* Clinical Assurance Strip */}
          <div className="bg-slate-100/80 border-b border-slate-200/70 px-4 py-1.5 flex items-center justify-between text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-teal-700 shrink-0" />
              <span>
                <strong className="font-semibold text-slate-700">Assistive Documentation:</strong> AI-generated notes are structured drafts. Attending clinician holds final medical authority.
              </span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-slate-400 font-mono text-[10px]">
              <span>Arogya Workstation</span>
            </div>
          </div>

          {/* Central Page Canvas */}
          <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
