"use client";

import * as React from "react";
import Link from "next/link";
import {
  Users,
  UserPlus,
  FilePlus2,
  AlertTriangle,
  Calendar,
  Phone,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable, Column } from "@/components/ui/data-table";
import { Avatar } from "@/components/ui/avatar";
import { Drawer } from "@/components/ui/drawer";
import { mockPatients, mockCases } from "@/lib/mock-data";
import { PatientProfile } from "@/types/patient";

export default function PatientsPage() {
  const [selectedPatient, setSelectedPatient] = React.useState<PatientProfile | null>(null);

  const columns: Column<PatientProfile>[] = [
    {
      key: "fullName",
      header: "Patient",
      render: (patient) => (
        <div className="flex items-center gap-2.5">
          <Avatar name={patient.fullName} size="sm" />
          <div>
            <span className="font-bold text-slate-900 block text-xs">{patient.fullName}</span>
            <span className="text-[11px] text-slate-400">
              {patient.age} yrs • {patient.gender}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "uhid",
      header: "UHID / ABHA ID",
      render: (patient) => (
        <div>
          <span className="font-mono text-slate-900 font-semibold block text-xs">{patient.uhid}</span>
          {patient.abhaId && (
            <span className="text-[11px] font-mono text-slate-400">ABHA: {patient.abhaId}</span>
          )}
        </div>
      ),
    },
    {
      key: "primaryCondition",
      header: "Clinical Profile",
      render: (patient) => (
        <div>
          <span className="text-slate-800 block text-xs font-medium">{patient.primaryCondition || "—"}</span>
          <span className="mt-0.5 inline-block">
            {patient.riskCategory === "High" ? (
              <Badge variant="red" size="sm">High Attention</Badge>
            ) : patient.riskCategory === "Moderate" ? (
              <Badge variant="amber" size="sm">Moderate Attention</Badge>
            ) : (
              <Badge variant="default" size="sm">Routine Care</Badge>
            )}
          </span>
        </div>
      ),
    },
    {
      key: "allergiesSummary",
      header: "Documented Allergies",
      render: (patient) => (
        <div>
          {patient.allergiesSummary && patient.allergiesSummary.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {patient.allergiesSummary.map((allergy, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-800 border border-rose-200"
                >
                  {allergy}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-[11px] text-slate-400">None documented</span>
          )}
        </div>
      ),
    },
    {
      key: "totalEncounters",
      header: "Encounters",
      className: "text-center",
      render: (patient) => (
        <span className="font-semibold text-slate-900 tabular-nums text-xs">
          {patient.totalEncounters}
        </span>
      ),
    },
    {
      key: "lastVisitDate",
      header: "Last Encounter",
      render: (patient) => (
        <span className="text-slate-500 font-mono text-xs">{patient.lastVisitDate}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (patient) => (
        <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
          <Link href={`/cases/new?patientId=${patient.id}`}>
            <Button variant="outline" size="sm" leftIcon={<FilePlus2 className="h-3 w-3" />}>
              New Case
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedPatient(patient)}
          >
            Profile
          </Button>
        </div>
      ),
    },
  ];

  const patientCases = React.useMemo(() => {
    if (!selectedPatient) return [];
    return mockCases.filter((c) => c.patientId === selectedPatient.id);
  }, [selectedPatient]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <PageHeader
        title="Patient Directory"
        eyebrow="Electronic Health Records"
        description="Search longitudinal patient profiles, access previous clinical encounters, and review verified medical histories."
        breadcrumbs={[{ label: "Patients", current: true }]}
        actions={
          <Link href="/patients/new">
            <Button variant="primary" size="sm" leftIcon={<UserPlus className="h-3.5 w-3.5" />}>
              Register Patient
            </Button>
          </Link>
        }
      />

      {/* Patients Data Table */}
      <DataTable
        columns={columns}
        data={mockPatients}
        keyExtractor={(p) => p.id}
        searchPlaceholder="Search by name, UHID, ABHA ID or phone..."
        searchFilter={(patient, query) =>
          patient.fullName.toLowerCase().includes(query) ||
          patient.uhid.toLowerCase().includes(query) ||
          (patient.abhaId?.toLowerCase().includes(query) ?? false) ||
          patient.contactPhone.includes(query)
        }
        onRowClick={(patient) => setSelectedPatient(patient)}
      />

      {/* Patient Detail Drawer */}
      <Drawer
        isOpen={Boolean(selectedPatient)}
        onClose={() => setSelectedPatient(null)}
        title={selectedPatient?.fullName || "Patient Profile"}
        subtitle={selectedPatient ? `UHID: ${selectedPatient.uhid} • ABHA: ${selectedPatient.abhaId || "Not Linked"}` : ""}
        width="lg"
        footer={
          selectedPatient && (
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-slate-500">
                Registered in Clinical Workspace
              </span>
              <div className="flex items-center gap-2">
                <Link href={`/cases/new?patientId=${selectedPatient.id}`}>
                  <Button variant="primary" size="sm" leftIcon={<FilePlus2 className="h-3.5 w-3.5" />}>
                    Initiate Case Intake
                  </Button>
                </Link>
              </div>
            </div>
          )
        }
      >
        {selectedPatient && (
          <div className="space-y-5 text-xs text-slate-700">
            {/* Demographics Card */}
            <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-2.5">
                Demographics & Contact
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Age & Gender</span>
                  <span className="font-semibold text-slate-900">
                    {selectedPatient.age} years • {selectedPatient.gender}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Blood Group</span>
                  <span className="font-semibold text-slate-900">{selectedPatient.bloodGroup || "—"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Phone</span>
                  <span className="font-semibold font-mono text-slate-900">{selectedPatient.contactPhone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Emergency Contact</span>
                  <span className="font-medium text-slate-800">{selectedPatient.emergencyContact}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block text-[11px]">Location</span>
                  <span className="font-medium text-slate-800">
                    {selectedPatient.district}, {selectedPatient.state}
                  </span>
                </div>
              </div>
            </div>

            {/* Documented Allergies */}
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                Documented Allergies
              </span>
              {selectedPatient.allergiesSummary && selectedPatient.allergiesSummary.length > 0 ? (
                <div className="rounded-lg border border-rose-200 bg-rose-50/70 p-3.5 flex items-start gap-2.5">
                  <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-rose-900 block">Critical Substance Alerts</span>
                    <p className="text-rose-950 mt-0.5 font-medium">{selectedPatient.allergiesSummary.join(", ")}</p>
                  </div>
                </div>
              ) : (
                <p className="p-3 rounded-md border border-slate-200 text-slate-500 bg-slate-50/40">
                  No known drug or environmental allergies recorded.
                </p>
              )}
            </div>

            {/* Previous Clinical Encounters */}
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                Previous Encounters ({patientCases.length})
              </span>
              {patientCases.length === 0 ? (
                <p className="p-4 text-center rounded-md border border-dashed border-slate-200 text-slate-400 bg-slate-50/30">
                  No prior case records in this clinical care unit.
                </p>
              ) : (
                <div className="space-y-2.5">
                  {patientCases.map((c) => (
                    <div
                      key={c.id}
                      className="p-3.5 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-slate-900 text-xs">{c.caseNumber}</span>
                        <span className="text-[11px] text-slate-400">{c.encounterDate}</span>
                      </div>
                      <p className="text-slate-800 leading-snug">
                        <strong className="font-medium text-slate-900">Chief Complaint:</strong> {c.chiefComplaint}
                      </p>
                      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100 text-[11px]">
                        <span className="text-slate-500">{c.reviewerName || "Under Review"}</span>
                        <Link href={`/cases/${c.id}`}>
                          <span className="text-teal-700 hover:underline font-medium">
                            View Encounter Chart →
                          </span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
