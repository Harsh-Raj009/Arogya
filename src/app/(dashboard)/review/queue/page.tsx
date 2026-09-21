"use client";

import * as React from "react";
import Link from "next/link";
import {
  ClipboardCheck,
  AlertTriangle,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { mockCases } from "@/lib/mock-data";

export default function ReviewQueuePage() {
  const pendingCases = mockCases.filter(
    (c) => c.status === "UNDER_REVIEW" || c.status === "AI_STRUCTURED"
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title="Doctor Review Queue"
        eyebrow="Clinician Verification"
        description="Encounters requiring attending physician verification. Review structured intake drafts, amend clinical narratives, and complete clinician approval."
        breadcrumbs={[{ label: "Review Queue", current: true }]}
        badge={<Badge variant="amber">{pendingCases.length} Awaiting Approval</Badge>}
      />

      {/* Clinician Responsibility Assurance Strip */}
      <div className="rounded-lg border border-teal-200/90 bg-teal-50/50 p-4 flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-teal-700 shrink-0 mt-0.5" />
        <div className="text-xs text-teal-950 space-y-1">
          <p className="font-semibold text-teal-950">
            Clinician Oversight Model
          </p>
          <p className="leading-relaxed text-teal-900/90 text-[11px]">
            Arogya AI serves solely as an assistive structuring aid. The reviewing clinician holds final medical authority and diagnostic responsibility. Every case record requires attending physician verification before being archived.
          </p>
        </div>
      </div>

      {/* Review Queue Cards */}
      <div className="space-y-3.5">
        {pendingCases.map((item) => (
          <Card key={item.id} className="hover:border-slate-300 transition-all shadow-[0_1px_3px_rgba(15,23,42,0.02)]">
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {item.caseNumber}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="font-semibold text-slate-900 text-sm">
                      {item.patientName}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      ({item.patientAge}y, {item.patientGender})
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[11px] text-slate-500 font-mono">UHID: {item.patientUhid}</span>
                    <StatusBadge status={item.severityLevel} size="sm" />
                    <StatusBadge status={item.status} size="sm" />
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong className="font-medium text-slate-900">Presenting Complaint:</strong>{" "}
                    {item.chiefComplaint}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      Queued {item.lastUpdated}
                    </span>
                    <span>Intake by: <strong className="text-slate-700 font-medium">{item.authorName}</strong></span>
                    {item.vitals && (
                      <span className="font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/80">
                        BP {item.vitals.systolic}/{item.vitals.diastolic} mmHg • SpO₂ {item.vitals.oxygenSat}%
                      </span>
                    )}
                  </div>
                </div>

                <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-2">
                  <Link href={`/review/${item.id}`}>
                    <Button
                      variant="primary"
                      size="md"
                      rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                    >
                      Review & Approve
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {pendingCases.length === 0 && (
          <div className="p-8 text-center rounded-lg border border-dashed border-slate-200 bg-white">
            <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-slate-900">Your review queue is clear</h3>
            <p className="text-xs text-slate-500 mt-0.5">Nothing requires your clinician review right now.</p>
          </div>
        )}
      </div>
    </div>
  );
}
