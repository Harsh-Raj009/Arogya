"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldAlert,
  ArrowLeft,
  LogOut,
  Stethoscope,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth/auth-context";

function UnauthorizedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, logout } = useAuth();

  const required = searchParams.get("required") || "Specific Clinical Role";
  const reason =
    searchParams.get("reason") ||
    "The requested module requires additional authorization and access is limited according to your assigned role and clinical responsibilities.";

  return (
    <div className="min-h-screen bg-[#f8fafb] flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-lg space-y-5">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-700 text-white shadow-2xs mb-1">
            <Stethoscope className="h-6 w-6 stroke-[2.2]" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">AROGYA</h1>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200/60 px-1.5 py-0.5 rounded">
              Clinical
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Clinical Workstation & Documentation Platform
          </p>
        </div>

        {/* Clinical Access Restricted Card */}
        <Card className="border-amber-200 shadow-[0_1px_3px_rgba(15,23,42,0.03)] bg-white overflow-hidden">
          <div className="h-1 bg-amber-500 w-full" />
          <CardHeader className="pb-4 border-b border-slate-100">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base text-slate-900">Clinical Access Restricted</CardTitle>
                <p className="text-xs text-slate-500 mt-0.5">
                  Access to this module is strictly bounded by role-based operational permissions.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 pt-4">
            {/* Explanation */}
            <div className="p-3.5 rounded-md bg-amber-50/60 border border-amber-200/70 text-xs text-amber-900 leading-relaxed">
              <p>{reason}</p>
              <p className="mt-2 text-[11px] text-amber-800">
                Access is limited according to the user&apos;s assigned role, permissions, and clinical responsibilities.
              </p>
            </div>

            {/* Current Identity & Role Details */}
            <div className="rounded-md border border-slate-200 bg-slate-50/70 p-3 space-y-2.5 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                <span className="text-slate-500 font-medium">Current User:</span>
                <span className="font-semibold text-slate-900">
                  {user ? user.name : "Authenticated Staff"}
                </span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                <span className="text-slate-500 font-medium">Current Role:</span>
                <Badge
                  variant={
                    user?.role === "DOCTOR"
                      ? "teal"
                      : user?.role === "ADMINISTRATOR"
                      ? "outline"
                      : user?.role === "PATIENT"
                      ? "emerald"
                      : "blue"
                  }
                  size="sm"
                >
                  {user?.roleName || user?.role || "CLINICAL_USER"}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Required Clinical Role:</span>
                <span className="font-mono text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 text-[11px] font-semibold">
                  {required}
                </span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-2.5 pt-3 pb-4 bg-slate-50/40 border-t border-slate-100">
            <Link href={user?.role === "PATIENT" ? "/patient/dashboard" : "/dashboard"} className="w-full sm:flex-1">
              <Button
                variant="outline"
                size="md"
                className="w-full"
                leftIcon={<ArrowLeft className="h-4 w-4" />}
              >
                Return to Dashboard
              </Button>
            </Link>

            <Button
              variant="destructive"
              size="md"
              className="w-full sm:flex-1"
              onClick={() => logout()}
              leftIcon={<LogOut className="h-4 w-4" />}
            >
              Switch Account
            </Button>
          </CardFooter>
        </Card>

        {/* System Footer Notice */}
        <div className="text-center text-[11px] text-slate-400">
          <p>Arogya Workstation • Access Gateway</p>
        </div>
      </div>
    </div>
  );
}

export default function UnauthorizedPage() {
  return (
    <React.Suspense fallback={null}>
      <UnauthorizedContent />
    </React.Suspense>
  );
}
