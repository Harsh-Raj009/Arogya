"use client";

import * as React from "react";
import Link from "next/link";
import {
  FileText,
  User,
  Pill,
  Clock,
  Calendar,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Activity,
  Heart,
  CheckCircle2,
  Building2,
  ExternalLink,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { useAuth } from "@/lib/auth/auth-context";
import { mockPatients, mockCases } from "@/lib/mock-data";

export default function PatientDashboardPage() {
  const { user } = useAuth();

  // Resolve the authenticated patient profile strictly
  const patientId = user?.patientId || "pat-101";
  const patientProfile =
    mockPatients.find((p) => p.id === patientId || p.uhid === user?.licenseNumber) ||
    mockPatients[0];

  // Resolve only this patient's clinical encounters
  const patientCases = mockCases.filter(
    (c) => c.patientId === patientProfile.id || c.patientUhid === patientProfile.uhid
  );

  return (
    <div className="space-y-6">
      {/* 1. Welcome Section */}
      <div className="rounded-xl border border-teal-200/90 bg-gradient-to-r from-teal-50/80 via-white to-teal-50/30 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-800 bg-white border border-teal-200/80 px-2 py-0.5 rounded">
                Verified Patient Portal
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                Last updated today
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Welcome, {patientProfile.fullName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Manage your personal health encounters, doctor-approved clinical records, and care summaries.
            </p>
          </div>

          {/* Demographic Pills */}
          <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-1.5 text-xs">
            <div className="font-mono text-xs font-bold text-slate-800 bg-white px-2.5 py-1 rounded-md border border-slate-200/90 shadow-2xs">
              UHID: {patientProfile.uhid}
            </div>
            {patientProfile.abhaId && (
              <div className="font-mono text-[11px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/80">
                ABHA: {patientProfile.abhaId}
              </div>
            )}
            <div className="text-[11px] text-slate-500 font-medium">
              {patientProfile.age} years • {patientProfile.gender} • Blood Group: <strong className="text-slate-700">{patientProfile.bloodGroup || "B+"}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Prominent Allergy Alert Banner if documented */}
      {patientProfile.allergiesSummary && patientProfile.allergiesSummary.length > 0 && (
        <div className="rounded-lg border border-rose-200 bg-rose-50/90 p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-semibold text-rose-900">
              Documented Medical Allergies
            </p>
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              {patientProfile.allergiesSummary.map((allergy, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded font-mono text-[11px] font-semibold bg-white text-rose-800 border border-rose-200 shadow-2xs"
                >
                  {allergy}
                </span>
              ))}
              <span className="text-[11px] text-rose-700 ml-1">
                Please notify your attending doctor before receiving any medication.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Grid: Health Records Summary & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Metric 1: My Clinical Records */}
        <Card className="shadow-2xs border-slate-200/90 bg-white">
          <CardContent className="p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                My Health Records
              </span>
              <FileText className="h-4 w-4 text-teal-700" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900 font-mono">
                {patientCases.length}
              </span>
              <span className="text-xs text-slate-500">Recorded encounters</span>
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              Primary condition: <strong className="text-slate-800">{patientProfile.primaryCondition}</strong>
            </p>
            <div className="pt-2">
              <Link href="/patient/records">
                <Button variant="outline" size="sm" className="w-full text-xs justify-center" rightIcon={<ArrowRight className="h-3 w-3" />}>
                  View All Records
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Metric 2: Profile Status */}
        <Card className="shadow-2xs border-slate-200/90 bg-white">
          <CardContent className="p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                My Profile
              </span>
              <User className="h-4 w-4 text-teal-700" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {patientProfile.contactPhone}
              </p>
              <p className="text-[11px] text-slate-500">
                Emergency: {patientProfile.emergencyContact}
              </p>
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              Registered at: <strong className="text-slate-800">{patientProfile.district}, {patientProfile.state}</strong>
            </p>
            <div className="pt-2">
              <Link href="/patient/profile">
                <Button variant="outline" size="sm" className="w-full text-xs justify-center" rightIcon={<ArrowRight className="h-3 w-3" />}>
                  Review Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Metric 3: Medicine Information Assistant (Phase 4C Active) */}
        <Card className="shadow-2xs border-teal-200/90 bg-teal-50/40">
          <CardContent className="p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-950">
                Medicine Assistant
              </span>
              <Pill className="h-4 w-4 text-teal-700" />
            </div>
            <div className="space-y-1">
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-teal-100 text-teal-900 border border-teal-200">
                Active • Educational
              </span>
              <p className="text-xs text-slate-900 font-semibold">
                Medicine Information
              </p>
            </div>
            <p className="text-[11px] text-slate-600 pt-1 leading-relaxed">
              Understand general uses, precautions, and side effects for common medications.
            </p>
            <div className="pt-2">
              <Link href="/patient/medicine-assistant">
                <Button variant="outline" size="sm" className="w-full text-xs justify-center border-teal-300 text-teal-950 hover:bg-teal-100/60">
                  Open Assistant
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 2. Recent Clinical Encounters */}
      <Card className="shadow-2xs border-slate-200/90 bg-white">
        <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold text-slate-900">
              Recent Clinical Encounters
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Doctor-verified consultation summaries, vitals, and encounter notes.
            </CardDescription>
          </div>
          <Link href="/patient/records">
            <Button variant="outline" size="sm" className="text-xs">
              View History
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          {patientCases.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              No clinical encounters recorded yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {patientCases.map((encounter) => (
                <div
                  key={encounter.id}
                  className="p-4 sm:p-5 hover:bg-slate-50/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900">
                        {encounter.caseNumber}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs font-semibold text-slate-800">
                        {encounter.encounterType}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-slate-400" />
                        {encounter.encounterDate}
                      </span>
                      <StatusBadge status={encounter.status} size="sm" />
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed">
                      <strong className="font-medium text-slate-900">Presenting Complaint:</strong>{" "}
                      {encounter.chiefComplaint}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-0.5">
                      <span>Attending Doctor: <strong className="text-slate-700">{encounter.reviewerName || "Dr. Priya Sharma"}</strong></span>
                      {encounter.vitals && (
                        <span className="font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/80">
                          BP: {encounter.vitals.systolic}/{encounter.vitals.diastolic} mmHg • SpO₂: {encounter.vitals.oxygenSat}%
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0">
                    <Link href={`/patient/records/${encounter.id}`}>
                      <Button variant="primary" size="sm" rightIcon={<ArrowRight className="h-3 w-3" />}>
                        View Clinical Record
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

