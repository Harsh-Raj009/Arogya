"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Stethoscope,
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  Clock,
  FlaskConical,
  CheckCircle2,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DEMO_ACCOUNTS, RoleType } from "@/lib/auth/types";
import { useAuth } from "@/lib/auth/auth-context";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const isExpired = searchParams.get("expired") === "true";
  const isUnauthorized = searchParams.get("unauthorized") === "true";
  const redirectTarget = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = React.useState(DEMO_ACCOUNTS.DOCTOR.email);
  const [password, setPassword] = React.useState(DEMO_ACCOUNTS.DOCTOR.samplePassword);
  const [selectedDemoRole, setSelectedDemoRole] = React.useState<RoleType>("DOCTOR");
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const isDemoEnv = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

  // Demo Account Selector fills the login credentials for local development convenience
  const handleSelectDemoAccount = (role: RoleType) => {
    setSelectedDemoRole(role);
    setEmail(DEMO_ACCOUNTS[role].email);
    setPassword(DEMO_ACCOUNTS[role].samplePassword);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const result = await login({ email, password });

    if (result.success) {
      const userRole = result.user?.role || selectedDemoRole;
      let target = redirectTarget;
      if (target === "/dashboard" || target === "/" || !target) {
        target = userRole === "PATIENT" ? "/patient/dashboard" : "/dashboard";
      }
      router.push(target);
      router.refresh();
    } else {
      setIsLoading(false);
      setErrorMessage(result.error || "Authentication failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafb] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-lg space-y-5">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-700 text-white shadow-sm mb-1">
            <Stethoscope className="h-6 w-6 stroke-[2.2]" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">AROGYA</h1>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200/60 px-1.5 py-0.5 rounded">
              Clinical
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Patient Case-Taking & Clinical Documentation Workstation
          </p>
        </div>

        {/* Session Expired Banner */}
        {isExpired && (
          <div className="p-3 rounded-lg border border-rose-200 bg-rose-50 text-rose-900 flex items-start gap-2.5 text-xs shadow-2xs animate-in fade-in">
            <Clock className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Clinical Session Expired</p>
              <p className="text-[11px] text-rose-700 mt-0.5">
                Your clinical session has timed out. Please sign in again with your institutional credentials.
              </p>
            </div>
          </div>
        )}

        {/* Unauthorized Access Attempt Banner */}
        {isUnauthorized && (
          <div className="p-3 rounded-lg border border-amber-200 bg-amber-50 text-amber-900 flex items-start gap-2.5 text-xs shadow-2xs animate-in fade-in">
            <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Authentication Required</p>
              <p className="text-[11px] text-amber-700 mt-0.5">
                Please sign in with appropriate clinical credentials to access that module.
              </p>
            </div>
          </div>
        )}

        {/* Demo Account Quick Switcher (Development/Demo Convenience Only) */}
        {isDemoEnv && (
          <Card className="border-slate-200/90 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.02)]">
            <CardHeader className="py-2.5 px-4 bg-slate-50/50 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <FlaskConical className="h-3.5 w-3.5 text-teal-700" />
                  Quick Account Selection (Demo)
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Evaluation</span>
              </div>
            </CardHeader>
            <CardContent className="p-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => handleSelectDemoAccount("DOCTOR")}
                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                  selectedDemoRole === "DOCTOR"
                    ? "border-teal-600 bg-teal-50/70 ring-1 ring-teal-600"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-900">Doctor</span>
                  {selectedDemoRole === "DOCTOR" && (
                    <CheckCircle2 className="h-3 w-3 text-teal-700" />
                  )}
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5 truncate">Dr. Priya Sharma</p>
                <span className="text-[9px] font-medium text-teal-800 bg-teal-100/70 px-1 py-0.2 rounded mt-1 inline-block">
                  Review & Approve
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectDemoAccount("CLINICAL_STAFF")}
                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                  selectedDemoRole === "CLINICAL_STAFF"
                    ? "border-sky-600 bg-sky-50/70 ring-1 ring-sky-600"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-900">Staff</span>
                  {selectedDemoRole === "CLINICAL_STAFF" && (
                    <CheckCircle2 className="h-3 w-3 text-sky-700" />
                  )}
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5 truncate">Sister Anjali Rao</p>
                <span className="text-[9px] font-medium text-sky-800 bg-sky-100/70 px-1 py-0.2 rounded mt-1 inline-block">
                  Intake & Vitals
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectDemoAccount("ADMINISTRATOR")}
                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                  selectedDemoRole === "ADMINISTRATOR"
                    ? "border-slate-800 bg-slate-100 ring-1 ring-slate-800"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-900">Admin</span>
                  {selectedDemoRole === "ADMINISTRATOR" && (
                    <CheckCircle2 className="h-3 w-3 text-slate-900" />
                  )}
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5 truncate">Vikram Malhotra</p>
                <span className="text-[9px] font-medium text-slate-700 bg-slate-200/80 px-1 py-0.2 rounded mt-1 inline-block">
                  Users & Audit
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectDemoAccount("PATIENT")}
                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                  selectedDemoRole === "PATIENT"
                    ? "border-emerald-600 bg-emerald-50/70 ring-1 ring-emerald-600"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-900">Patient</span>
                  {selectedDemoRole === "PATIENT" && (
                    <CheckCircle2 className="h-3 w-3 text-emerald-700" />
                  )}
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5 truncate">Rajesh Gupta</p>
                <span className="text-[9px] font-medium text-emerald-800 bg-emerald-100/70 px-1 py-0.2 rounded mt-1 inline-block">
                  Patient Portal
                </span>
              </button>
            </CardContent>
          </Card>
        )}

        {/* Authentication Card */}
        <Card className="shadow-[0_1px_3px_rgba(15,23,42,0.03)] border-slate-200/90 bg-white">
          <CardHeader className="pb-4 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm sm:text-base">Staff & Clinician Sign In</CardTitle>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                <span>OPD Online</span>
              </div>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-4">
              {errorMessage && (
                <div className="p-2.5 rounded-md bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <Input
                label="Institutional Email *"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="h-3.5 w-3.5" />}
              />

              <Input
                label="Password *"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="h-3.5 w-3.5" />}
              />

              <div className="p-3 rounded-md bg-slate-50/70 border border-slate-200 text-[11px] text-slate-500 leading-snug">
                <strong className="text-slate-700">Clinical Access Notice:</strong> Authorized healthcare personnel only. Clinical roles and permissions are verified against your institutional identity.
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 pt-2 p-4">
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full"
                isLoading={isLoading}
                rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
              >
                Sign In to Clinical Workspace
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Footer info */}
        <div className="text-center text-[11px] text-slate-400 space-y-0.5">
          <p>Designed for Indian clinical workflows with an interoperability-ready architecture.</p>
          <p className="font-mono text-[10px]">Arogya Workstation • General OPD</p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense fallback={null}>
      <LoginContent />
    </React.Suspense>
  );
}
