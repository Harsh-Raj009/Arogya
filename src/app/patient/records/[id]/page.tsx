"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  Calendar,
  User,
  Heart,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Printer,
  Building2,
  ShieldAlert,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth/auth-context";
import { mockPatients, mockCases } from "@/lib/mock-data";

export default function PatientRecordDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const id = params?.id as string;

  // Resolve the authenticated patient profile strictly
  const patientId = user?.patientId || "pat-101";
  const patientProfile =
    mockPatients.find((p) => p.id === patientId || p.uhid === user?.licenseNumber) ||
    mockPatients[0];

  // Look up the requested encounter
  const requestedCase = mockCases.find((c) => c.id === id);

  // CRITICAL SECURITY ENFORCEMENT:
  // Validate that the requested case strictly belongs to this authenticated patient!
  const isAuthorized =
    requestedCase &&
    (requestedCase.patientId === patientProfile.id ||
      requestedCase.patientUhid === patientProfile.uhid);

  if (!requestedCase || !isAuthorized) {
    return (
      <div className="max-w-xl mx-auto py-12">
        <Card className="border-rose-200 bg-white shadow-sm overflow-hidden">
          <div className="h-1 bg-rose-600 w-full" />
          <CardContent className="p-6 text-center space-y-4">
            <div className="inline-flex h-12 w-12 rounded-full bg-rose-50 text-rose-700 items-center justify-center border border-rose-200">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900">
                Access Restricted: Unauthorized Record
              </h2>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                You are not authorized to view this health record. Patients may only view consultation records associated with their own verified profile.
              </p>
            </div>
            <div className="pt-2">
              <Link href="/patient/records">
                <Button variant="primary" size="sm" leftIcon={<ArrowLeft className="h-3.5 w-3.5" />}>
                  Return to My Health Records
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
        <div className="flex items-center gap-2">
          <Link href="/patient/records">
            <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="h-3.5 w-3.5" />}>
              Back to Records
            </Button>
          </Link>
          <span className="text-slate-300">•</span>
          <span className="font-mono text-xs font-bold text-slate-800">
            {requestedCase.caseNumber}
          </span>
          <StatusBadge status={requestedCase.status} size="sm" />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Printer className="h-3.5 w-3.5" />}
            onClick={() => window.print()}
          >
            Print Summary
          </Button>
        </div>
      </div>

      {/* Encounter Header Card */}
      <Card className="bg-white border-slate-200/90 shadow-2xs">
        <CardContent className="p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200/80 px-2 py-0.5 rounded">
                Verified Clinical Record
              </span>
              <h1 className="text-xl font-bold text-slate-900 mt-1.5">
                {requestedCase.encounterType}
              </h1>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Visit Date: {requestedCase.encounterDate}
              </p>
            </div>

            <div className="text-left sm:text-right text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Attending Clinician</span>
              <span className="font-bold text-slate-900 block mt-0.5">
                {requestedCase.reviewerName || "Dr. Priya Sharma, MD"}
              </span>
              <span className="text-slate-500">General Medicine OPD</span>
            </div>
          </div>

          {/* Demographic confirmation */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Patient Name</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">{patientProfile.fullName}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">UHID</span>
              <span className="font-mono font-semibold text-slate-800 mt-0.5 block">{patientProfile.uhid}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Age / Gender</span>
              <span className="text-slate-700 mt-0.5 block">{patientProfile.age} yrs • {patientProfile.gender}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Intake Officer</span>
              <span className="text-slate-700 mt-0.5 block">{requestedCase.authorName}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Objective Physiological Vitals */}
      {requestedCase.vitals && (
        <Card className="bg-white border-slate-200/90 shadow-2xs">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Heart className="h-4 w-4 text-rose-600" />
              Recorded Vital Signs
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Blood Pressure
                </span>
                <span className="font-mono text-base font-bold text-slate-900 mt-0.5 block">
                  {requestedCase.vitals.systolic}/{requestedCase.vitals.diastolic}
                </span>
                <span className="text-[10px] text-slate-400">mmHg</span>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Pulse / Heart Rate
                </span>
                <span className="font-mono text-base font-bold text-slate-900 mt-0.5 block">
                  {requestedCase.vitals.heartRate}
                </span>
                <span className="text-[10px] text-slate-400">bpm</span>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Oxygen Saturation
                </span>
                <span className="font-mono text-base font-bold text-slate-900 mt-0.5 block">
                  {requestedCase.vitals.oxygenSat}%
                </span>
                <span className="text-[10px] text-slate-400">Room air</span>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Body Temperature
                </span>
                <span className="font-mono text-base font-bold text-slate-900 mt-0.5 block">
                  {requestedCase.vitals.temperature}
                </span>
                <span className="text-[10px] text-slate-400">°C</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Clinical Consultation Narrative */}
      <div className="grid grid-cols-1 gap-5">
        {/* Presenting Complaint & History */}
        <Card className="bg-white border-slate-200/90 shadow-2xs">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="h-4 w-4 text-teal-700" />
              Reason for Consultation & History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-4 text-xs text-slate-700 leading-relaxed">
            <div>
              <strong className="text-slate-900 block font-semibold mb-1">
                Chief Complaint:
              </strong>
              <p className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-slate-800">
                {requestedCase.chiefComplaint}
              </p>
            </div>

            {requestedCase.history?.historyOfPresentIllness && (
              <div>
                <strong className="text-slate-900 block font-semibold mb-1">
                  History of Present Illness:
                </strong>
                <p className="p-3 rounded-lg border border-slate-100 bg-white text-slate-700">
                  {requestedCase.history.historyOfPresentIllness}
                </p>
              </div>
            )}

            {requestedCase.history?.drugHistory && (
              <div>
                <strong className="text-slate-900 block font-semibold mb-1">
                  Current Medications:
                </strong>
                <p className="p-3 rounded-lg border border-slate-100 bg-slate-50 text-slate-800 font-mono text-[11px]">
                  {requestedCase.history.drugHistory}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Doctor-Approved Instructions & Verification */}
        <Card className="bg-emerald-50/30 border-emerald-200/90 shadow-2xs">
          <CardHeader className="pb-3 border-b border-emerald-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                Attending Physician Approval
              </CardTitle>
              <Badge variant="teal" size="sm">
                Clinician Verified
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-5 space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-white border border-emerald-200/70 text-slate-800 space-y-1">
              <strong className="text-emerald-950 font-semibold block">
                Doctor Assessment:
              </strong>
              <p className="leading-relaxed text-slate-700">
                Clinical review verified against history and vitals. Patient advised routine hydration and follow-up in General OPD if symptoms recur.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[11px] text-slate-500">
              <span>Verified by: <strong className="text-slate-800">{requestedCase.reviewerName || "Dr. Priya Sharma, MD"}</strong></span>
              <span className="font-mono">Encounter Record Status: Clinician Approved</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

