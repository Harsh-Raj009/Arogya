"use client";

import * as React from "react";
import Link from "next/link";
import {
  FileText,
  Calendar,
  User,
  ArrowRight,
  ShieldCheck,
  Search,
  Filter,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { useAuth } from "@/lib/auth/auth-context";
import { mockPatients, mockCases } from "@/lib/mock-data";

export default function PatientRecordsPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = React.useState("");

  // Resolve the authenticated patient profile strictly
  const patientId = user?.patientId || "pat-101";
  const patientProfile =
    mockPatients.find((p) => p.id === patientId || p.uhid === user?.licenseNumber) ||
    mockPatients[0];

  // Resolve strictly this patient's clinical encounters
  const patientCases = mockCases.filter(
    (c) => c.patientId === patientProfile.id || c.patientUhid === patientProfile.uhid
  );

  const filteredCases = patientCases.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.caseNumber.toLowerCase().includes(q) ||
      c.chiefComplaint.toLowerCase().includes(q) ||
      c.encounterType.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              My Health Records
            </h1>
            <span className="text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200/80 px-2 py-0.5 rounded">
              {patientCases.length} Encounters
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Official clinician-approved consultation records for {patientProfile.fullName} ({patientProfile.uhid}).
          </p>
        </div>

        <div className="w-full sm:w-72">
          <Input
            placeholder="Search by complaint or case #..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="h-4 w-4 text-slate-400" />}
          />
        </div>
      </div>

      {/* Encounters List */}
      <div className="space-y-4">
        {filteredCases.length === 0 ? (
          <Card className="p-8 text-center bg-white border-slate-200/90 shadow-2xs">
            <p className="text-sm text-slate-600 font-medium">No matching health records found.</p>
            <p className="text-xs text-slate-400 mt-1">
              Try adjusting your search query or check back after your next clinic visit.
            </p>
          </Card>
        ) : (
          filteredCases.map((encounter) => (
            <Card
              key={encounter.id}
              className="bg-white border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all overflow-hidden"
            >
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {encounter.caseNumber}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-sm font-semibold text-slate-900">
                        {encounter.encounterType}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        {encounter.encounterDate}
                      </span>
                      <StatusBadge status={encounter.status} size="sm" />
                    </div>

                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                        Reason for Visit (Chief Complaint)
                      </span>
                      <p className="text-xs text-slate-800 font-medium mt-0.5 leading-relaxed">
                        {encounter.chiefComplaint}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                      <span>
                        Attending Doctor:{" "}
                        <strong className="text-slate-800">{encounter.reviewerName || "Dr. Priya Sharma"}</strong>
                      </span>
                      <span>
                        Intake Staff: <strong className="text-slate-700">{encounter.authorName}</strong>
                      </span>
                      {encounter.vitals && (
                        <span className="font-mono text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 text-[11px]">
                          BP: {encounter.vitals.systolic}/{encounter.vitals.diastolic} mmHg • SpO₂: {encounter.vitals.oxygenSat}%
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center sm:self-center">
                    <Link href={`/patient/records/${encounter.id}`}>
                      <Button
                        variant="primary"
                        size="sm"
                        rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                      >
                        View Full Summary
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

