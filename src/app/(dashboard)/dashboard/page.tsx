"use client";

import * as React from "react";
import Link from "next/link";
import {
  Users,
  FilePlus2,
  ClipboardCheck,
  Clock,
  AlertTriangle,
  Plus,
  ArrowRight,
  Stethoscope,
  Activity,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Building2,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { SectionHeader } from "@/components/layout/section-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { Timeline } from "@/components/ui/timeline";
import { Drawer } from "@/components/ui/drawer";
import { mockCases, mockMetrics, mockActivityTimeline } from "@/lib/mock-data";
import { ClinicalCaseSummary } from "@/types/clinical";
import { useAuth } from "@/lib/auth/auth-context";

export default function DashboardPage() {
  const { user } = useAuth();
  const [selectedCase, setSelectedCase] = React.useState<ClinicalCaseSummary | null>(null);
  const [activeTab, setActiveTab] = React.useState("all");

  const filteredCases = React.useMemo(() => {
    if (activeTab === "pending") return mockCases.filter((c) => c.status === "UNDER_REVIEW");
    if (activeTab === "finalized") return mockCases.filter((c) => c.status === "FINALIZED");
    return mockCases;
  }, [activeTab]);

  const userName = user?.name || "Dr. Priya Sharma";
  const userRole = user?.roleName || "Attending Physician";
  const isDoctor = user?.role === "DOCTOR";
  const isStaff = user?.role === "CLINICAL_STAFF";

  return (
    <div className="space-y-6">
      {/* Clinician Welcome & Shift Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/70">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200/60 px-2 py-0.5 rounded">
              {userRole}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Calendar className="h-3 w-3 text-slate-400" />
              Tuesday, 15 September 2026
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Good morning, {userName}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            General OPD • Room 104 • Clinical Workspace
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <Link href="/patients/new">
            <Button variant="outline" size="sm" leftIcon={<Users className="h-3.5 w-3.5" />}>
              Register Patient
            </Button>
          </Link>
          {(isDoctor || isStaff) && (
            <Link href="/cases/new">
              <Button variant="primary" size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>
                New Case Intake
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* PRIMARY AREA: Today's Clinical Workflow */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500">
            Today&apos;s Clinical Workflow
          </h2>
          <span className="text-[11px] text-slate-400 font-medium">Shift active since 08:30 IST</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Tile 1: Awaiting Review */}
          <Link href={isDoctor ? "/review/queue" : "/cases"} className="block group">
            <div className="p-4 rounded-lg border border-amber-200/80 bg-amber-50/30 hover:bg-amber-50/60 transition-all shadow-[0_1px_3px_rgba(15,23,42,0.02)] flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-900 tracking-tight">
                  Awaiting Review
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-100 text-amber-800 border border-amber-200">
                  <ClipboardCheck className="h-4 w-4" />
                </span>
              </div>
              <div className="mt-3">
                <div className="text-2xl sm:text-3xl font-bold text-amber-950 tabular-nums tracking-tight">
                  {mockMetrics.pendingDoctorReviews}
                </div>
                <p className="text-[11px] text-amber-800/90 mt-0.5 font-medium">
                  Requires clinician review
                </p>
              </div>
            </div>
          </Link>

          {/* Tile 2: New Intakes Today */}
          <Link href="/cases" className="block group">
            <div className="p-4 rounded-lg border border-slate-200/90 bg-white hover:border-slate-300 transition-all shadow-[0_1px_3px_rgba(15,23,42,0.02)] flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 tracking-tight">
                  Intakes Recorded
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-teal-50 text-teal-800 border border-teal-200/60">
                  <FilePlus2 className="h-4 w-4" />
                </span>
              </div>
              <div className="mt-3">
                <div className="text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums tracking-tight">
                  {mockMetrics.activeEncounters}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  General OPD today
                </p>
              </div>
            </div>
          </Link>

          {/* Tile 3: Cases Requiring Attention */}
          <div className="p-4 rounded-lg border border-slate-200/90 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.02)] flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 tracking-tight">
                Requires Attention
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-rose-50 text-rose-700 border border-rose-200/60">
                <AlertTriangle className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums tracking-tight">
                {mockMetrics.highRiskAlerts}
              </div>
              <p className="text-[11px] text-rose-700 font-medium mt-0.5">
                Allergies or flags noted
              </p>
            </div>
          </div>

          {/* Tile 4: Completed & Approved */}
          <div className="p-4 rounded-lg border border-slate-200/90 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.02)] flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 tracking-tight">
                Clinician Approved
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                <CheckCircle2 className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums tracking-tight">
                {mockMetrics.finalizedCasesToday}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Archived in longitudinal record
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Priority Doctor Action Banner (Visible to Doctor if pending reviews exist) */}
      {isDoctor && mockMetrics.pendingDoctorReviews > 0 && (
        <div className="p-4 rounded-lg border border-amber-200/80 bg-amber-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-amber-700 text-white shadow-2xs">
              <ClipboardCheck className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
                {mockMetrics.pendingDoctorReviews} Case Drafts Ready for Clinician Review
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 max-w-2xl leading-relaxed">
                Structured clinical intake has been completed by assisting healthcare staff. Review the draft history, verify findings, and complete clinician approval.
              </p>
            </div>
          </div>
          <Link href="/review/queue" className="shrink-0">
            <Button variant="primary" size="sm" rightIcon={<ChevronRight className="h-3.5 w-3.5" />}>
              Review Queue
            </Button>
          </Link>
        </div>
      )}

      {/* SECONDARY AREA: Active Encounters & Recent Cases */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle>Active Encounters & Intakes</CardTitle>
                  <CardDescription>
                    Select an encounter to preview clinical history, documented allergies, and vitals.
                  </CardDescription>
                </div>
                <Tabs
                  variant="pills"
                  tabs={[
                    { id: "all", label: "All Active", badge: mockCases.length },
                    { id: "pending", label: "Needs Review", badge: 2 },
                    { id: "finalized", label: "Approved", badge: 1 },
                  ]}
                  activeTab={activeTab}
                  onChange={setActiveTab}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {filteredCases.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedCase(item)}
                    className="p-4 hover:bg-slate-50/70 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="flex flex-col">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-xs text-slate-900">
                            {item.patientName}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {item.patientAge}y • {item.patientGender}
                          </span>
                          <span className="text-slate-200">•</span>
                          <span className="text-[11px] font-mono text-slate-500">{item.caseNumber}</span>
                          <StatusBadge status={item.status} size="sm" />
                        </div>
                        <p className="text-xs text-slate-700 mt-1 line-clamp-1">
                          <strong className="font-medium text-slate-800">Complaint:</strong>{" "}
                          {item.chiefComplaint}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                          <span>Intake by {item.authorName}</span>
                          <span>•</span>
                          <span>{item.lastUpdated}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      {item.vitals && (
                        <span className="text-[10px] sm:text-[11px] font-mono bg-slate-50 px-2 py-0.5 rounded text-slate-700 border border-slate-200">
                          BP {item.vitals.systolic}/{item.vitals.diastolic} • SpO₂ {item.vitals.oxygenSat}%
                        </span>
                      )}
                      <Button variant="outline" size="sm">
                        Preview
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* THIRD AREA: Shift Session Context & Activity Log */}
        <div className="space-y-6">
          {/* Clinic Session Context */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Session Context</CardTitle>
                <span className="text-[10px] font-semibold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200/60">
                  Online
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2.5 text-xs text-slate-700">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Attending Clinician</span>
                <span className="font-semibold text-slate-900">{userName}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Assisting Staff</span>
                <span className="font-semibold text-slate-900">Sister Anjali Rao</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">OPD Counter</span>
                <span className="font-semibold text-slate-900">General OPD • Room 104</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Structuring Mode</span>
                <span className="text-[11px] font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                  Assistive Draft Layer
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Shift Activity Audit Timeline */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Clinical Activity Log</CardTitle>
                <Link href="/activity" className="text-xs text-teal-700 font-medium hover:underline">
                  Full Log
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <Timeline items={mockActivityTimeline} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Slide-out Preview Drawer for Selected Encounter */}
      <Drawer
        isOpen={Boolean(selectedCase)}
        onClose={() => setSelectedCase(null)}
        title={selectedCase ? `${selectedCase.patientName} (${selectedCase.caseNumber})` : "Case Details"}
        subtitle={selectedCase ? `UHID: ${selectedCase.patientUhid} • ${selectedCase.encounterType}` : ""}
        width="lg"
        footer={
          selectedCase && (
            <div className="flex items-center justify-between w-full">
              <StatusBadge status={selectedCase.status} />
              <div className="flex items-center gap-2">
                <Link href={`/cases/${selectedCase.id}`}>
                  <Button variant="outline" size="sm">
                    Full Encounter Chart
                  </Button>
                </Link>
                {selectedCase.status === "UNDER_REVIEW" && isDoctor && (
                  <Link href={`/review/${selectedCase.id}`}>
                    <Button variant="primary" size="sm">
                      Review & Approve Case
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          )
        }
      >
        {selectedCase && (
          <div className="space-y-5 text-xs text-slate-700">
            {/* Objective Vitals Strip */}
            {selectedCase.vitals && (
              <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-2">
                  Recorded Clinical Vitals
                </span>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-white p-2 rounded border border-slate-200/80">
                    <span className="text-[10px] text-slate-400 block">BP</span>
                    <span className="font-semibold font-mono text-slate-900 text-xs sm:text-sm">
                      {selectedCase.vitals.systolic}/{selectedCase.vitals.diastolic}
                    </span>
                    <span className="text-[9px] text-slate-400 block">mmHg</span>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200/80">
                    <span className="text-[10px] text-slate-400 block">Pulse</span>
                    <span className="font-semibold font-mono text-slate-900 text-xs sm:text-sm">
                      {selectedCase.vitals.heartRate}
                    </span>
                    <span className="text-[9px] text-slate-400 block">bpm</span>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200/80">
                    <span className="text-[10px] text-slate-400 block">SpO₂</span>
                    <span className="font-semibold font-mono text-slate-900 text-xs sm:text-sm">
                      {selectedCase.vitals.oxygenSat}%
                    </span>
                    <span className="text-[9px] text-slate-400 block">room air</span>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200/80">
                    <span className="text-[10px] text-slate-400 block">Temp</span>
                    <span className="font-semibold font-mono text-slate-900 text-xs sm:text-sm">
                      {selectedCase.vitals.temperature || "36.8"}°C
                    </span>
                    <span className="text-[9px] text-slate-400 block">oral</span>
                  </div>
                </div>
              </div>
            )}

            {/* Documented Allergies Warning */}
            {selectedCase.history?.allergyHistory && (
              <div className="rounded-lg border border-rose-200 bg-rose-50/60 p-3">
                <div className="flex items-center gap-1.5 text-rose-800 font-semibold mb-1">
                  <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
                  <span className="text-xs">Documented Allergy Warning</span>
                </div>
                <p className="text-rose-950 font-medium leading-snug">{selectedCase.history.allergyHistory}</p>
              </div>
            )}

            {/* Presenting Complaint */}
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                1. Presenting Complaint
              </span>
              <p className="bg-slate-50/70 p-3 rounded-md border border-slate-200 text-slate-900 leading-relaxed font-medium">
                {selectedCase.chiefComplaint}
              </p>
            </div>

            {/* History of Present Illness */}
            {selectedCase.history?.historyOfPresentIllness && (
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                  2. History of Present Illness (HPI)
                </span>
                <p className="bg-slate-50/70 p-3 rounded-md border border-slate-200 text-slate-800 leading-relaxed">
                  {selectedCase.history.historyOfPresentIllness}
                </p>
              </div>
            )}

            {/* Past Medical History & Drug History */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                  3. Past Medical History
                </span>
                <p className="p-2.5 rounded-md border border-slate-200 bg-white text-slate-800">
                  {selectedCase.history?.pastMedicalHistory || "None reported"}
                </p>
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                  4. Current Drug History
                </span>
                <p className="p-2.5 rounded-md border border-slate-200 bg-white text-slate-800">
                  {selectedCase.history?.drugHistory || "None reported"}
                </p>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
