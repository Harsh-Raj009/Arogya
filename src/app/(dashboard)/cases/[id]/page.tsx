"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FileText,
  ArrowLeft,
  ClipboardCheck,
  User,
  Heart,
  AlertTriangle,
  ShieldCheck,
  Calendar,
  Clock,
  Printer,
  CheckCircle2,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { mockCases } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth/auth-context";

export default function CaseDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { user } = useAuth();
  const isDoctor = user?.role === "DOCTOR";

  const currentCase = mockCases.find((c) => c.id === id) || mockCases[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title={`Clinical Encounter: ${currentCase.caseNumber}`}
        eyebrow="Electronic Health Record"
        description={`Longitudinal encounter record for ${currentCase.patientName} (${currentCase.patientUhid}) recorded on ${currentCase.encounterDate}.`}
        breadcrumbs={[
          { label: "Cases", href: "/cases" },
          { label: currentCase.caseNumber, current: true },
        ]}
        badge={<StatusBadge status={currentCase.status} />}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/cases">
              <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="h-3.5 w-3.5" />}>
                Back
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Printer className="h-3.5 w-3.5" />}
              onClick={() => window.print()}
            >
              Print Record
            </Button>
            {currentCase.status === "UNDER_REVIEW" && isDoctor && (
              <Link href={`/review/${currentCase.id}`}>
                <Button variant="primary" size="sm" leftIcon={<ClipboardCheck className="h-3.5 w-3.5" />}>
                  Review & Approve
                </Button>
              </Link>
            )}
          </div>
        }
      />

      {/* Patient Demographic & Encounter Banner */}
      <Card className="bg-white border-slate-200/90 shadow-[0_1px_3px_rgba(15,23,42,0.02)]">
        <CardContent className="p-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] font-semibold uppercase tracking-wider">Patient</span>
              <span className="text-sm font-bold text-slate-900 block mt-0.5">{currentCase.patientName}</span>
              <span className="text-slate-500 font-mono text-[11px]">{currentCase.patientAge}y • {currentCase.patientGender}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-semibold uppercase tracking-wider">Identifiers</span>
              <span className="font-mono text-slate-800 font-semibold block mt-0.5">{currentCase.patientUhid}</span>
              <span className="text-slate-400 font-mono text-[11px]">ABHA: {currentCase.patientAbha || "Unlinked"}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-semibold uppercase tracking-wider">Encounter Context</span>
              <span className="text-slate-800 font-medium block mt-0.5">{currentCase.encounterType}</span>
              <span className="text-slate-400 text-[11px]">{currentCase.encounterDate}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-semibold uppercase tracking-wider">Intake Staff</span>
              <span className="text-slate-800 font-medium block mt-0.5">{currentCase.authorName}</span>
              <span className="text-slate-400 text-[11px]">{currentCase.authorRole}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Objective Vitals Row */}
      {currentCase.vitals && (
        <Card className="border-slate-200/90 shadow-[0_1px_3px_rgba(15,23,42,0.02)]">
          <CardHeader className="py-3 px-5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-rose-600" />
              <CardTitle className="text-xs sm:text-sm">Objective Physical Vitals</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
              <div className="bg-slate-50/70 p-2.5 rounded-md border border-slate-200/80">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">Blood Pressure</span>
                <span className="text-base font-bold text-slate-900 font-mono">
                  {currentCase.vitals.systolic}/{currentCase.vitals.diastolic}
                </span>
                <span className="text-[10px] text-slate-400 block">mmHg</span>
              </div>
              <div className="bg-slate-50/70 p-2.5 rounded-md border border-slate-200/80">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">Heart Rate</span>
                <span className="text-base font-bold text-slate-900 font-mono">
                  {currentCase.vitals.heartRate}
                </span>
                <span className="text-[10px] text-slate-400 block">bpm</span>
              </div>
              <div className="bg-slate-50/70 p-2.5 rounded-md border border-slate-200/80">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">Oxygen Sat (SpO₂)</span>
                <span className="text-base font-bold text-slate-900 font-mono">
                  {currentCase.vitals.oxygenSat}%
                </span>
                <span className="text-[10px] text-slate-400 block">room air</span>
              </div>
              <div className="bg-slate-50/70 p-2.5 rounded-md border border-slate-200/80">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">Respiratory Rate</span>
                <span className="text-base font-bold text-slate-900 font-mono">
                  {currentCase.vitals.respiratoryRate || "18"}
                </span>
                <span className="text-[10px] text-slate-400 block">breaths/min</span>
              </div>
              <div className="bg-slate-50/70 p-2.5 rounded-md border border-slate-200/80">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">Body Temperature</span>
                <span className="text-base font-bold text-slate-900 font-mono">
                  {currentCase.vitals.temperature || "36.8"}
                </span>
                <span className="text-[10px] text-slate-400 block">°C (oral)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Structured Clinical Sections */}
      <div className="space-y-4">
        {/* Section 1 & 2 */}
        <Card className="border-slate-200/90 shadow-[0_1px_3px_rgba(15,23,42,0.02)]">
          <CardHeader className="py-3 px-5 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs sm:text-sm">1. Presenting Complaint & 2. History of Present Illness</CardTitle>
              {currentCase.history?.aiStructured && (
                <Badge variant="teal" size="sm">AI Assisted Draft</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3 p-5 text-xs leading-relaxed">
            <div>
              <span className="font-semibold text-slate-900 block mb-1">Chief Complaint:</span>
              <p className="bg-slate-50/70 p-3 rounded-md border border-slate-200/80 text-slate-800 font-medium">
                {currentCase.chiefComplaint}
              </p>
            </div>
            <div>
              <span className="font-semibold text-slate-900 block mb-1">History of Present Illness:</span>
              <p className="bg-slate-50/70 p-3 rounded-md border border-slate-200/80 text-slate-800">
                {currentCase.history?.historyOfPresentIllness || "Detailed chronological progression documented during guided triage."}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Section 3, 4, 5, 6 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="border-slate-200/90 shadow-[0_1px_3px_rgba(15,23,42,0.02)]">
            <CardHeader className="py-3 px-4 border-b border-slate-100">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                3. Past Medical & 4. Surgical History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Past Medical:</span>
                <p className="text-slate-800 mt-0.5 font-medium">
                  {currentCase.history?.pastMedicalHistory || "No significant chronic medical illnesses."}
                </p>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Past Surgical:</span>
                <p className="text-slate-800 mt-0.5 font-medium">
                  {currentCase.history?.pastSurgicalHistory || "No prior surgeries."}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/90 shadow-[0_1px_3px_rgba(15,23,42,0.02)]">
            <CardHeader className="py-3 px-4 border-b border-slate-100">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                5. Drug History & 6. Allergy History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Current Medications:</span>
                <p className="text-slate-800 mt-0.5 font-medium">
                  {currentCase.history?.drugHistory || "No regular prescribed medications."}
                </p>
              </div>
              {currentCase.history?.allergyHistory ? (
                <div className="p-2.5 rounded-md bg-rose-50 border border-rose-200 text-rose-900">
                  <div className="flex items-center gap-1 font-semibold text-[11px] text-rose-800 mb-0.5">
                    <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
                    <span>Documented Allergy Alert:</span>
                  </div>
                  <p>{currentCase.history.allergyHistory}</p>
                </div>
              ) : (
                <div>
                  <span className="text-slate-400 block text-[11px]">Allergies:</span>
                  <p className="text-slate-600 mt-0.5">NKDA (No known drug allergies)</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Section 7, 8, 9 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="border-slate-200/90 shadow-[0_1px_3px_rgba(15,23,42,0.02)]">
            <CardHeader className="py-3 px-4 border-b border-slate-100">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                7. Family & 8. Personal/Social History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Family History:</span>
                <p className="text-slate-800 mt-0.5">
                  {currentCase.history?.familyHistory || "Non-contributory family history."}
                </p>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Social & Habits:</span>
                <p className="text-slate-800 mt-0.5">
                  {currentCase.history?.personalSocialHistory || "Non-smoker, active lifestyle."}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/90 shadow-[0_1px_3px_rgba(15,23,42,0.02)]">
            <CardHeader className="py-3 px-4 border-b border-slate-100">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                9. Review of Systems (ROS)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="text-slate-500">Cardiovascular:</span>
                <span className="text-slate-800 font-medium">No chest tightness / palpitations</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="text-slate-500">Respiratory:</span>
                <span className="text-slate-800 font-medium">Clear bilateral air entry</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Gastrointestinal:</span>
                <span className="text-slate-800 font-medium">Epigastric tenderness noted</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section 10: Clinician Review & Approval Status */}
        <Card className="border-teal-200 bg-teal-50/20 shadow-[0_1px_3px_rgba(15,23,42,0.02)]">
          <CardHeader className="py-3 px-5 border-b border-teal-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-teal-700" />
                <CardTitle className="text-xs sm:text-sm">10. Clinician Review & Verification</CardTitle>
              </div>
              <StatusBadge status={currentCase.status} />
            </div>
          </CardHeader>
          <CardContent className="p-5 text-xs space-y-3">
            {currentCase.status === "FINALIZED" ? (
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Clinician Approved by {currentCase.reviewerName || "Dr. Priya Sharma, MD"}</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Attending physician verified history accuracy, confirmed drug allergies, and reviewed objective triage vitals. Record is finalized in longitudinal archive.
                </p>
                <div className="p-2.5 rounded-md bg-white border border-slate-200 text-[11px] text-slate-600 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Reviewing Clinician:</span>
                    <span className="font-medium text-slate-800">{currentCase.reviewerName || "Dr. Priya Sharma, MD"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Verification Timestamp:</span>
                    <span className="font-mono text-slate-700">{currentCase.encounterDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Audit Reference:</span>
                    <span className="font-mono text-slate-700">EVT-{currentCase.caseNumber}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-slate-800 font-medium">
                    This clinical record is currently in draft state awaiting doctor verification.
                  </p>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Attending physician must review the structured draft, make any amendments, and complete clinical approval.
                  </p>
                </div>
                {isDoctor && (
                  <Link href={`/review/${currentCase.id}`}>
                    <Button variant="primary" size="md" leftIcon={<ClipboardCheck className="h-4 w-4" />}>
                      Open Review & Approve
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
