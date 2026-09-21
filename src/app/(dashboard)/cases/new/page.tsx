"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FilePlus2,
  ArrowLeft,
  ArrowRight,
  Check,
  Mic,
  MicOff,
  ShieldCheck,
  AlertTriangle,
  Heart,
  Thermometer,
  Activity,
  Wind,
  Stethoscope,
  Info,
  Clock,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Stepper } from "@/components/ui/stepper";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import { mockPatients } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth/auth-context";

export default function NewCasePage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();

  const [currentStep, setCurrentStep] = React.useState(0);
  const [isRecording, setIsRecording] = React.useState(false);
  const [isProcessingAI, setIsProcessingAI] = React.useState(false);

  // Form State for 10 Clinical Sections
  const [formData, setFormData] = React.useState({
    patientId: mockPatients[0].id,
    encounterType: "Outpatient Consultation",
    chiefComplaint: "",
    duration: "3 days",
    historyOfPresentIllness: "",
    pastMedicalHistory: "",
    pastSurgicalHistory: "",
    drugHistory: "",
    allergyHistory: "",
    familyHistory: "",
    personalSocialHistory: "",
    systolic: "120",
    diastolic: "80",
    heartRate: "72",
    oxygenSat: "98",
    temperature: "36.8",
  });

  const steps = [
    { id: "patient", title: "Patient & Encounter", description: "Identity & Clinic Specialty" },
    { id: "hpi", title: "Presenting Illness", description: "Chief Complaint & HPI" },
    { id: "history", title: "Clinical History", description: "Medical, Surgical & Drugs" },
    { id: "vitals", title: "Vitals & Systems", description: "Objective Measurements" },
    { id: "review", title: "Review & Route", description: "Handover to Doctor" },
  ];

  const currentGuidance = [
    {
      where: "Encounter Context",
      capturing: "Verify patient identity, UHID, and department destination.",
      next: "Presenting Complaint & HPI",
    },
    {
      where: "Presenting Illness",
      capturing: "Document chronological onset, location, severity, and modifying factors.",
      next: "Past Medical, Surgical & Drug History",
    },
    {
      where: "Longitudinal History",
      capturing: "Prior hospitalizations, chronic conditions, drug adherence, and allergy flags.",
      next: "Objective Clinical Vitals & Review of Systems",
    },
    {
      where: "Objective Vitals",
      capturing: "Direct physiological measurements recorded at counter.",
      next: "Review & Handover Routing",
    },
    {
      where: "Intake Handover",
      capturing: "Final check of structured draft before placing into attending doctor queue.",
      next: "Doctor Verification Console",
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsProcessingAI(true);
      setTimeout(() => {
        setIsProcessingAI(false);
        toast({
          type: "success",
          title: "Case Submitted for Clinician Review",
          message: "Encounter has been routed to Dr. Priya Sharma's review queue.",
        });
        router.push("/cases");
      }, 800);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const selectedPatientObj = mockPatients.find((p) => p.id === formData.patientId) || mockPatients[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Guided Clinical Case-Taking"
        eyebrow="Clinical Intake Studio"
        description="Structured history capture for Indian clinical workflows. Designed for clinical staff intake with assistive structuring for attending doctor review."
        breadcrumbs={[
          { label: "Cases", href: "/cases" },
          { label: "New Clinical Case", current: true },
        ]}
        actions={
          <Link href="/cases">
            <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="h-3.5 w-3.5" />}>
              Back to Cases
            </Button>
          </Link>
        }
      />

      {/* Guided Progress Stepper */}
      <Card className="p-4 sm:p-5 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.03)] border-slate-200/90">
        <Stepper
          steps={steps}
          currentStepIndex={currentStep}
          onStepClick={(i) => setCurrentStep(i)}
        />
      </Card>

      {/* Where Am I? Context Strip */}
      <div className="rounded-lg border border-slate-200/80 bg-slate-50/70 p-3 sm:px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-teal-900 tracking-tight flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5 text-teal-700 shrink-0" />
            Step {currentStep + 1}: {currentGuidance[currentStep].where}
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500">{currentGuidance[currentStep].capturing}</span>
        </div>
        <div className="text-[11px] text-slate-400 shrink-0 sm:text-right">
          Next: <span className="font-medium text-slate-700">{currentGuidance[currentStep].next}</span>
        </div>
      </div>

      {/* Step Form Content */}
      <Card className="shadow-[0_1px_3px_rgba(15,23,42,0.03)] border-slate-200/90">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{steps[currentStep].title}</CardTitle>
              <CardDescription>{steps[currentStep].description}</CardDescription>
            </div>
            <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/70">
              {currentStep + 1} / {steps.length}
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-2">
          {/* STEP 0: Patient Selection & Encounter Context */}
          {currentStep === 0 && (
            <div className="space-y-5">
              <Select
                label="Select Enrolled Patient *"
                options={mockPatients.map((p) => ({
                  value: p.id,
                  label: `${p.fullName} • UHID: ${p.uhid} • Age: ${p.age} • ${p.gender}`,
                }))}
                value={formData.patientId}
                onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                helperText="Select a registered patient to link longitudinal medical history."
              />

              {/* Patient Quick Context Card */}
              {selectedPatientObj && (
                <div className="rounded-md border border-slate-200 bg-slate-50/50 p-3.5 text-xs text-slate-700 space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
                    <div>
                      <span className="font-semibold text-slate-900 text-sm">{selectedPatientObj.fullName}</span>
                      <span className="text-slate-400 ml-2 font-mono">{selectedPatientObj.uhid}</span>
                    </div>
                    {selectedPatientObj.allergiesSummary && selectedPatientObj.allergiesSummary.length > 0 && (
                      <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200 font-semibold text-[11px] flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3 text-rose-600" />
                        Allergy: {selectedPatientObj.allergiesSummary.join(", ")}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-500">
                    <div>
                      <span className="block text-slate-400">ABHA ID</span>
                      <span className="font-mono text-slate-800 font-medium">{selectedPatientObj.abhaId || "Unlinked"}</span>
                    </div>
                    <div>
                      <span className="block text-slate-400">Primary Condition</span>
                      <span className="text-slate-800 font-medium">{selectedPatientObj.primaryCondition || "None documented"}</span>
                    </div>
                    <div>
                      <span className="block text-slate-400">Contact Phone</span>
                      <span className="font-mono text-slate-800">{selectedPatientObj.contactPhone}</span>
                    </div>
                    <div>
                      <span className="block text-slate-400">Emergency Contact</span>
                      <span className="text-slate-800 truncate">{selectedPatientObj.emergencyContact}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Encounter Clinical Specialty *"
                  options={[
                    { value: "General Medicine", label: "General Outpatient Medicine" },
                    { value: "Pulmonology", label: "Pulmonology Specialty Clinic" },
                    { value: "Cardiology", label: "Cardiology Follow-up" },
                    { value: "Endocrinology", label: "Endocrinology & Diabetes" },
                    { value: "Emergency Triage", label: "Acute Clinical Triage" },
                  ]}
                  value={formData.encounterType}
                  onChange={(e) => setFormData({ ...formData, encounterType: e.target.value })}
                />
                <Input
                  label="Attending Intake Staff"
                  value={user?.name ? `${user.name} (${user.roleName})` : "Sister Anjali Rao (Clinical Nurse Specialist)"}
                  disabled
                  helperText="Logged automatically from authenticated staff session."
                />
              </div>
            </div>
          )}

          {/* STEP 1: Presenting Complaint & HPI */}
          {currentStep === 1 && (
            <div className="space-y-5">
              {/* Assistive Dictation Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-slate-50/80 border border-slate-200/80 gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-teal-100 text-teal-800">
                    <Mic className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-900 block">
                      Voice-Assisted Clinical Capture
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Dictate notes in clinical English or Hindi. Assistant structures raw input into standard sections.
                    </span>
                  </div>
                </div>
                <Button
                  type="button"
                  variant={isRecording ? "destructive" : "outline"}
                  size="sm"
                  onClick={() => setIsRecording(!isRecording)}
                  leftIcon={isRecording ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
                  className="shrink-0"
                >
                  {isRecording ? "Stop Dictation" : "Start Voice Dictation"}
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <Input
                    label="1. Presenting Complaint (Chief Complaint) *"
                    placeholder="e.g. Acute upper epigastric discomfort radiating to back"
                    value={formData.chiefComplaint}
                    onChange={(e) => setFormData({ ...formData, chiefComplaint: e.target.value })}
                  />
                </div>
                <Input
                  label="Duration of Complaint *"
                  placeholder="e.g. 48 hours, 3 days"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>

              <Textarea
                label="2. History of Present Illness (HPI) *"
                placeholder="Document chronological progression, site, onset, character, radiation, exacerbating and relieving factors..."
                rows={5}
                value={formData.historyOfPresentIllness}
                onChange={(e) =>
                  setFormData({ ...formData, historyOfPresentIllness: e.target.value })
                }
                helperText="Include severity, temporal progression, and any self-administered medications."
              />
            </div>
          )}

          {/* STEP 2: Longitudinal Medical History */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Textarea
                  label="3. Past Medical History (PMH)"
                  placeholder="Hypertension, Type 2 Diabetes, Tuberculosis, Asthma, Cardiac disease..."
                  rows={3}
                  value={formData.pastMedicalHistory}
                  onChange={(e) =>
                    setFormData({ ...formData, pastMedicalHistory: e.target.value })
                  }
                />
                <Textarea
                  label="4. Past Surgical History (PSH)"
                  placeholder="Prior surgical interventions, dates, hospitalizations, complications..."
                  rows={3}
                  value={formData.pastSurgicalHistory}
                  onChange={(e) =>
                    setFormData({ ...formData, pastSurgicalHistory: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Textarea
                  label="5. Drug History & Current Medications"
                  placeholder="Medication names, dosage, schedule, patient adherence, OTC drugs..."
                  rows={3}
                  value={formData.drugHistory}
                  onChange={(e) => setFormData({ ...formData, drugHistory: e.target.value })}
                />
                <div className="space-y-1">
                  <Textarea
                    label="6. Documented Allergies (Critical)"
                    placeholder="Specific drug allergies (e.g. Penicillin, NSAIDs), foods, or latex..."
                    rows={3}
                    value={formData.allergyHistory}
                    onChange={(e) => setFormData({ ...formData, allergyHistory: e.target.value })}
                    helperText="Documented allergies will be prominently highlighted to the reviewing doctor."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Textarea
                  label="7. Family History"
                  placeholder="Premature CAD, diabetes, hypertension, hereditary conditions in first-degree relatives..."
                  rows={2}
                  value={formData.familyHistory}
                  onChange={(e) => setFormData({ ...formData, familyHistory: e.target.value })}
                />
                <Textarea
                  label="8. Personal & Social History"
                  placeholder="Tobacco/bidi smoking history, alcohol intake, occupation, dietary habits..."
                  rows={2}
                  value={formData.personalSocialHistory}
                  onChange={(e) =>
                    setFormData({ ...formData, personalSocialHistory: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {/* STEP 3: Objective Vitals & Review of Systems */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div>
                <span className="text-xs font-semibold text-slate-700 tracking-tight block mb-1">
                  Objective Vitals (Measured at Intake)
                </span>
                <p className="text-xs text-slate-500 mb-3">
                  Record direct physiological measurements. Interpretation rests solely with the attending clinician.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <Input
                    label="Systolic (mmHg)"
                    value={formData.systolic}
                    onChange={(e) => setFormData({ ...formData, systolic: e.target.value })}
                    leftIcon={<Activity className="h-3.5 w-3.5" />}
                  />
                  <Input
                    label="Diastolic (mmHg)"
                    value={formData.diastolic}
                    onChange={(e) => setFormData({ ...formData, diastolic: e.target.value })}
                    leftIcon={<Activity className="h-3.5 w-3.5" />}
                  />
                  <Input
                    label="Pulse (bpm)"
                    value={formData.heartRate}
                    onChange={(e) => setFormData({ ...formData, heartRate: e.target.value })}
                    leftIcon={<Heart className="h-3.5 w-3.5" />}
                  />
                  <Input
                    label="SpO₂ (%)"
                    value={formData.oxygenSat}
                    onChange={(e) => setFormData({ ...formData, oxygenSat: e.target.value })}
                    leftIcon={<Wind className="h-3.5 w-3.5" />}
                  />
                  <Input
                    label="Temp (°C)"
                    value={formData.temperature}
                    onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                    leftIcon={<Thermometer className="h-3.5 w-3.5" />}
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60">
                <span className="text-xs font-semibold text-slate-800 block mb-0.5">
                  9. Review of Systems (ROS) Inquiry
                </span>
                <p className="text-xs text-slate-500 mb-3">
                  Mark positive or relevant system inquiries during initial triage:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {["Cardiovascular", "Respiratory", "Gastrointestinal", "Neurological", "Musculoskeletal", "Endocrine"].map((sys) => (
                    <label key={sys} className="flex items-center gap-2 p-2 bg-white rounded border border-slate-200/80 text-slate-700 cursor-pointer hover:bg-slate-50">
                      <input type="checkbox" className="rounded border-slate-300 text-teal-700 focus:ring-teal-700" defaultChecked={false} />
                      <span className="font-medium">{sys}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Review Submission & Handover */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="rounded-lg border border-teal-200/90 bg-teal-50/60 p-4">
                <div className="flex items-center gap-2 text-teal-950 font-semibold text-sm mb-1">
                  <ShieldCheck className="h-4 w-4 text-teal-700" />
                  <span>Clinical Handover & Doctor Review Queue</span>
                </div>
                <p className="text-xs text-teal-900 leading-relaxed">
                  Upon submission, this intake draft will be structured and routed directly to the <strong>Doctor Review Queue</strong> for verification. All findings remain editable by the attending clinician prior to final approval.
                </p>
              </div>

              {/* Summary Table */}
              <div className="rounded-lg border border-slate-200 p-4 space-y-3 text-xs bg-white">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Patient:</span>
                  <span className="font-semibold text-slate-900">{selectedPatientObj.fullName} ({selectedPatientObj.uhid})</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Chief Complaint:</span>
                  <span className="font-medium text-slate-800">{formData.chiefComplaint || "Acute epigastric discomfort"}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Documented Vitals:</span>
                  <span className="font-mono text-slate-800">
                    BP {formData.systolic}/{formData.diastolic} mmHg • Pulse {formData.heartRate} bpm • SpO₂ {formData.oxygenSat}%
                  </span>
                </div>
                {formData.allergyHistory && (
                  <div className="flex justify-between border-b border-slate-100 pb-2 text-rose-800">
                    <span className="font-semibold">Allergies:</span>
                    <span className="font-medium">{formData.allergyHistory}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Reviewing Clinician:</span>
                  <span className="font-semibold text-slate-900">Dr. Priya Sharma, MD</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="justify-between border-t border-slate-100 bg-slate-50/40 p-4">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={handleBack}
            disabled={currentStep === 0 || isProcessingAI}
            leftIcon={<ArrowLeft className="h-3.5 w-3.5" />}
          >
            Previous
          </Button>

          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={handleNext}
            isLoading={isProcessingAI}
            rightIcon={
              currentStep === steps.length - 1 ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <ArrowRight className="h-3.5 w-3.5" />
              )
            }
          >
            {currentStep === steps.length - 1 ? "Submit to Doctor Queue" : "Continue to Next Section"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
