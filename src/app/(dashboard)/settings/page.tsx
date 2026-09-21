"use client";

import * as React from "react";
import {
  Building2,
  Cpu,
  ShieldCheck,
  User,
  Save,
  Radio,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Tabs } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";

export default function SettingsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = React.useState("general");
  const [isSaving, setIsSaving] = React.useState(false);

  // Settings State
  const [facilityName, setFacilityName] = React.useState("Arogya Clinical Care Center");
  const [facilityCode, setFacilityCode] = React.useState("MED-OPD-104");
  const [department, setDepartment] = React.useState("General Medicine");
  const [aiProvider, setAiProvider] = React.useState("mock");
  const [aiModel, setAiModel] = React.useState("Arogya-Clinical-Structuring-v1");
  const [sttProvider, setSttProvider] = React.useState("webspeech");
  const [requireDoctorApproval, setRequireDoctorApproval] = React.useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        type: "success",
        title: "Settings Saved",
        message: "Clinical workstation preferences and provider configurations updated successfully.",
      });
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title="Clinical System Settings"
        eyebrow="Workstation Administration"
        description="Configure healthcare facility identifiers, decoupled AI/voice provider abstractions, clinician approval policies, and interoperability standards."
        breadcrumbs={[{ label: "Settings", current: true }]}
      />

      <Tabs
        tabs={[
          { id: "general", label: "Facility & OPD", icon: <Building2 className="h-3.5 w-3.5" /> },
          { id: "ai_voice", label: "AI & Voice Providers", icon: <Cpu className="h-3.5 w-3.5" /> },
          { id: "compliance", label: "Interoperability & Policy", icon: <ShieldCheck className="h-3.5 w-3.5" /> },
          { id: "profile", label: "Clinician Profile", icon: <User className="h-3.5 w-3.5" /> },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <form onSubmit={handleSave}>
        {/* TAB 1: General Facility */}
        {activeTab === "general" && (
          <Card className="shadow-[0_1px_3px_rgba(15,23,42,0.03)] border-slate-200/90">
            <CardHeader>
              <CardTitle>Healthcare Facility Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Healthcare Facility Name *"
                  value={facilityName}
                  onChange={(e) => setFacilityName(e.target.value)}
                />
                <Input
                  label="Facility Registry Code *"
                  value={facilityCode}
                  onChange={(e) => setFacilityCode(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Primary Clinical Department *"
                  options={[
                    { value: "General Medicine", label: "General Medicine" },
                    { value: "Pulmonology", label: "Pulmonology" },
                    { value: "Cardiology", label: "Cardiology" },
                    { value: "Pediatrics", label: "Pediatrics" },
                    { value: "Emergency Triage", label: "Emergency Medicine" },
                  ]}
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
                <Select
                  label="Default Clinical Locale / Language"
                  options={[
                    { value: "en-IN", label: "English (India - en-IN)" },
                    { value: "hi-IN", label: "Hindi (India - hi-IN)" },
                  ]}
                  defaultValue="en-IN"
                />
              </div>
            </CardContent>
            <CardFooter className="justify-end p-4 border-t border-slate-100 bg-slate-50/40">
              <Button type="submit" variant="primary" size="md" isLoading={isSaving} leftIcon={<Save className="h-4 w-4" />}>
                Save Facility Changes
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* TAB 2: AI & Voice Decoupled Providers */}
        {activeTab === "ai_voice" && (
          <div className="space-y-4">
            <Card className="shadow-[0_1px_3px_rgba(15,23,42,0.03)] border-slate-200/90">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Decoupled AI Structuring Layer</CardTitle>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Configured via provider interfaces. Swap providers without touching clinical domain code.
                    </p>
                  </div>
                  <Badge variant="teal">Provider Abstraction</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Active LLM Structuring Provider"
                    options={[
                      { value: "mock", label: "Arogya Mock / Local Contract Engine (Zero Latency)" },
                      { value: "openai", label: "OpenAI GPT-4o Clinical" },
                      { value: "anthropic", label: "Anthropic Claude 3.5 Sonnet" },
                      { value: "gemini", label: "Google Gemini 1.5 Pro / Flash" },
                      { value: "ollama", label: "Self-Hosted Local Ollama (MedLlama-3 / Mistral)" },
                    ]}
                    value={aiProvider}
                    onChange={(e) => setAiProvider(e.target.value)}
                  />
                  <Input
                    label="Model Identifier / Deployment Name"
                    value={aiModel}
                    onChange={(e) => setAiModel(e.target.value)}
                  />
                </div>

                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/70 text-xs text-slate-600">
                  <span className="font-semibold text-slate-900 block mb-1">
                    AI Safeguard Configuration:
                  </span>
                  <p>
                    Autonomous clinical diagnosis is strictly disabled. Only assistive structuring into standard clinical history sections is permitted. The attending clinician retains ultimate medical authority.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-[0_1px_3px_rgba(15,23,42,0.03)] border-slate-200/90">
              <CardHeader>
                <CardTitle>Speech-to-Text (Voice Dictation) Provider</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="STT Engine"
                    options={[
                      { value: "webspeech", label: "Browser Native WebSpeech API (No API key needed)" },
                      { value: "whisper-local", label: "Local OpenAI Whisper (On-premise edge)" },
                      { value: "deepgram", label: "Deepgram Nova-2 Medical" },
                    ]}
                    value={sttProvider}
                    onChange={(e) => setSttProvider(e.target.value)}
                  />
                  <Input
                    label="Audio Sample Rate"
                    value="16,000 Hz (Medical Grade PCM)"
                    disabled
                  />
                </div>
              </CardContent>
              <CardFooter className="justify-end p-4 border-t border-slate-100 bg-slate-50/40">
                <Button type="submit" variant="primary" size="md" isLoading={isSaving} leftIcon={<Save className="h-4 w-4" />}>
                  Update Provider Configuration
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {/* TAB 3: Interoperability & Policies */}
        {activeTab === "compliance" && (
          <Card className="shadow-[0_1px_3px_rgba(15,23,42,0.03)] border-slate-200/90">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Interoperability & Clinical Policies</CardTitle>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Designed for Indian clinical workflows with an interoperability-ready architecture.
                  </p>
                </div>
                <Badge variant="teal">Interoperability-Ready</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-xs text-slate-700">
              <div className="p-4 rounded-lg border border-teal-200 bg-teal-50/50 space-y-1">
                <p className="font-semibold text-teal-950">Interoperable Clinical Data Architecture</p>
                <p className="text-teal-900/90 leading-relaxed">
                  Case records are structured to support standard health information exchange, longitudinal patient tracking, and encounter linking.
                </p>
              </div>

              <div className="pt-2 space-y-3">
                <label className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requireDoctorApproval}
                    onChange={(e) => setRequireDoctorApproval(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-700"
                  />
                  <span>
                    <strong className="text-slate-900">Mandatory Clinician Approval:</strong> Require attending physician verification before archiving clinical records.
                  </span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <Input
                    label="Record Retention Policy"
                    value="Standard Statutory Record Retention"
                    disabled
                  />
                  <Input
                    label="Audit Trail Format"
                    value="Structured JSON Timestamped Audit Trail"
                    disabled
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end p-4 border-t border-slate-100 bg-slate-50/40">
              <Button type="submit" variant="primary" size="md" isLoading={isSaving} leftIcon={<Save className="h-4 w-4" />}>
                Save Clinical Policies
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* TAB 4: Clinician Profile */}
        {activeTab === "profile" && (
          <Card className="shadow-[0_1px_3px_rgba(15,23,42,0.03)] border-slate-200/90">
            <CardHeader>
              <CardTitle>Attending Clinician Credentials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Practitioner Full Name"
                  value="Dr. Priya Sharma"
                  disabled
                />
                <Input
                  label="Medical Council Registration #"
                  value="DMC-64821 (Delhi Medical Council)"
                  disabled
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Specialty & Degrees"
                  value="MBBS, MD (General Medicine)"
                  disabled
                />
                <Input
                  label="Hospital Department"
                  value="Department of Internal Medicine, General OPD"
                  disabled
                />
              </div>
            </CardContent>
          </Card>
        )}
      </form>
    </div>
  );
}
