"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ShieldCheck,
  ArrowLeft,
  Check,
  Edit3,
  AlertTriangle,
  Clock,
  Heart,
  Save,
  CheckCircle2,
  FileText,
  User,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { useToast } from "@/components/ui/toast";
import { mockCases } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth/auth-context";

export default function DoctorReviewDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  const id = params?.id as string;

  const currentCase = mockCases.find((c) => c.id === id) || mockCases[0];

  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = React.useState(false);
  const [isApproving, setIsApproving] = React.useState(false);

  // Editable fields for attending clinician
  const [editedHpi, setEditedHpi] = React.useState(
    currentCase.history?.historyOfPresentIllness || ""
  );
  const [editedMeds, setEditedMeds] = React.useState(
    currentCase.history?.drugHistory || ""
  );
  const [doctorImpression, setDoctorImpression] = React.useState(
    "Probable acute gastritis secondary to dietary indiscretion vs early biliary colic. Exclude acute coronary syndrome in view of paternal CAD history."
  );
  const [verifiedByDoctor, setVerifiedByDoctor] = React.useState(false);

  const reviewerName = user?.name || "Dr. Priya Sharma, MD";
  const reviewerRole = user?.roleName || "Attending Physician";

  const handleConfirmApproval = () => {
    setIsApproving(true);
    setTimeout(() => {
      setIsApproving(false);
      setIsApprovalDialogOpen(false);
      toast({
        type: "success",
        title: "Case Approved by Attending Clinician",
        message: `Case ${currentCase.caseNumber} approved by ${reviewerName}. Record finalized in clinical archive.`,
      });
      router.push("/cases");
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <PageHeader
        title={`Review Encounter: ${currentCase.caseNumber}`}
        eyebrow="Clinician Verification Workstation"
        description={`Review structured intake draft for ${currentCase.patientName} (${currentCase.patientUhid}). Review and amend clinical findings prior to approval.`}
        breadcrumbs={[
          { label: "Review Queue", href: "/review/queue" },
          { label: currentCase.caseNumber, current: true },
        ]}
        badge={<StatusBadge status="UNDER_REVIEW" />}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/review/queue">
              <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="h-3.5 w-3.5" />}>
                Back to Queue
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              disabled={!verifiedByDoctor}
              onClick={() => setIsApprovalDialogOpen(true)}
              leftIcon={<CheckCircle2 className="h-3.5 w-3.5" />}
            >
              Approve Case
            </Button>
          </div>
        }
      />

      {/* Patient Demographic Bar */}
      <div className="rounded-lg border border-slate-200/90 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.02)] flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-semibold text-xs">
            {currentCase.patientName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">{currentCase.patientName}</span>
              <span className="text-slate-400 font-mono text-[11px]">{currentCase.patientAge}y • {currentCase.patientGender}</span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              UHID: <strong className="text-slate-700">{currentCase.patientUhid}</strong> • ABHA: {currentCase.patientAbha || "Not linked"}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-slate-500 text-[11px]">
          <div>
            <span className="block text-slate-400">Intake Staff</span>
            <span className="font-medium text-slate-800">{currentCase.authorName}</span>
          </div>
          <div>
            <span className="block text-slate-400">Encounter Date</span>
            <span className="font-medium text-slate-800">{currentCase.encounterDate}</span>
          </div>
          <div>
            <span className="block text-slate-400">Specialty</span>
            <span className="font-medium text-slate-800">{currentCase.encounterType}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Clinical Record (Editable by Doctor) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Assistive Draft Banner */}
          <div className="p-3.5 rounded-lg border border-teal-200/80 bg-teal-50/50 flex items-start gap-2.5 text-xs">
            <ShieldCheck className="h-4 w-4 text-teal-700 shrink-0 mt-0.5" />
            <div className="text-teal-950 space-y-0.5">
              <span className="font-semibold">AI-Assisted Draft Ready for Verification</span>
              <p className="text-teal-900/90 leading-relaxed text-[11px]">
                Intake notes have been structured below into clinical sections. As the attending physician, verify all findings, amend any clinical nuances, and record your clinical impression.
              </p>
            </div>
          </div>

          {/* Presenting Complaint & HPI */}
          <Card className="border-slate-200/90 shadow-[0_1px_3px_rgba(15,23,42,0.02)]">
            <CardHeader className="py-3 px-5 border-b border-slate-100">
              <CardTitle className="text-xs sm:text-sm">1. Presenting Complaint & 2. HPI</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-5">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Presenting Complaint (Recorded at Intake):
                </span>
                <p className="p-3 rounded-md border border-slate-200 bg-slate-50 text-xs text-slate-900 font-medium">
                  {currentCase.chiefComplaint}
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  History of Present Illness (Clinician Editable):
                </label>
                <Textarea
                  rows={5}
                  value={editedHpi}
                  onChange={(e) => setEditedHpi(e.target.value)}
                  helperText="Adjust wording, include pertinent negatives, or refine chronological onset."
                />
              </div>
            </CardContent>
          </Card>

          {/* Past History & Current Medications */}
          <Card className="border-slate-200/90 shadow-[0_1px_3px_rgba(15,23,42,0.02)]">
            <CardHeader className="py-3 px-5 border-b border-slate-100">
              <CardTitle className="text-xs sm:text-sm">3. Past History & 5. Current Medications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Past Medical History:
                  </span>
                  <p className="p-2.5 rounded border border-slate-200 bg-slate-50 text-slate-800">
                    {currentCase.history?.pastMedicalHistory || "None reported"}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Past Surgical History:
                  </span>
                  <p className="p-2.5 rounded border border-slate-200 bg-slate-50 text-slate-800">
                    {currentCase.history?.pastSurgicalHistory || "None reported"}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Current Medications & Prescriptions:
                </label>
                <Textarea
                  rows={3}
                  value={editedMeds}
                  onChange={(e) => setEditedMeds(e.target.value)}
                  helperText="Verify ongoing prescriptions and patient adherence."
                />
              </div>
            </CardContent>
          </Card>

          {/* Doctor Clinical Impression & Provisional Plan */}
          <Card className="border-teal-300 shadow-[0_1px_3px_rgba(15,23,42,0.02)]">
            <CardHeader className="py-3 px-5 bg-teal-50/40 border-b border-teal-100">
              <CardTitle className="text-xs sm:text-sm text-teal-950">
                10. Attending Clinician Impression & Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <Textarea
                rows={4}
                value={doctorImpression}
                onChange={(e) => setDoctorImpression(e.target.value)}
                label="Physician Impression & Management Plan *"
                helperText="AI does NOT provide diagnosis. Enter your verified clinical judgment."
              />

              <div className="pt-2 border-t border-slate-100">
                <label className="flex items-start gap-2.5 p-3 rounded-md bg-slate-50 border border-slate-200 text-xs text-slate-800 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={verifiedByDoctor}
                    onChange={(e) => setVerifiedByDoctor(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-700"
                  />
                  <span className="leading-snug">
                    <strong className="font-semibold text-slate-900">Clinician Verification:</strong> I confirm that I have reviewed this clinical encounter history, checked documented allergies, and verified all recorded clinical data.
                  </span>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Objective Vitals, Allergies & Approval Action Console */}
        <div className="space-y-6">
          {/* Triage Objective Vitals Widget */}
          {currentCase.vitals && (
            <Card className="border-slate-200/90 shadow-[0_1px_3px_rgba(15,23,42,0.02)]">
              <CardHeader className="py-3 px-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-rose-600" />
                  <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Recorded Vitals
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Blood Pressure</span>
                  <span className="font-mono font-semibold text-slate-900">
                    {currentCase.vitals.systolic}/{currentCase.vitals.diastolic} mmHg
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Pulse / Heart Rate</span>
                  <span className="font-mono font-semibold text-slate-900">
                    {currentCase.vitals.heartRate} bpm
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Oxygen Saturation (SpO₂)</span>
                  <span className="font-mono font-semibold text-slate-900">
                    {currentCase.vitals.oxygenSat}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Temperature</span>
                  <span className="font-mono font-semibold text-slate-900">
                    {currentCase.vitals.temperature || "36.8"} °C
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Allergy Warning Box */}
          {currentCase.history?.allergyHistory && (
            <div className="rounded-lg border border-rose-200 bg-rose-50/70 p-4 space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-rose-800 font-semibold">
                <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
                <span>Documented Allergy Warning</span>
              </div>
              <p className="text-rose-950 font-medium leading-snug">{currentCase.history.allergyHistory}</p>
            </div>
          )}

          {/* Clinician Approval Action Console */}
          <Card className="border-teal-200 shadow-[0_1px_3px_rgba(15,23,42,0.02)]">
            <CardHeader className="py-3 px-4 bg-teal-50/40 border-b border-teal-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-teal-700" />
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-teal-950">
                  Clinician Approval Console
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 text-[11px] block">Reviewing Clinician</span>
                <span className="font-semibold text-slate-900 block">{reviewerName}</span>
                <span className="text-slate-500 text-[11px] block">{reviewerRole}</span>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <span className="text-slate-400 text-[11px] block">Clinical Workspace</span>
                <span className="font-medium text-slate-800">General OPD • Room 104</span>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  disabled={!verifiedByDoctor}
                  onClick={() => setIsApprovalDialogOpen(true)}
                  leftIcon={<CheckCircle2 className="h-3.5 w-3.5" />}
                >
                  Approve Case
                </Button>
                {!verifiedByDoctor && (
                  <p className="text-[11px] text-amber-800 mt-1.5 text-center font-medium">
                    Confirm clinical verification above to approve
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Approval Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isApprovalDialogOpen}
        onClose={() => setIsApprovalDialogOpen(false)}
        onConfirm={handleConfirmApproval}
        title="Approve & Finalize Clinical Case"
        message={`You are approving case #${currentCase.caseNumber} for ${currentCase.patientName}. This encounter record will be locked and finalized under your clinical review.`}
        confirmLabel="Confirm Clinician Approval"
        isLoading={isApproving}
      />
    </div>
  );
}
