"use client";

import * as React from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  Eye,
  ClipboardCheck,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tabs } from "@/components/ui/tabs";
import { mockCases } from "@/lib/mock-data";
import { ClinicalCaseSummary } from "@/types/clinical";
import { useAuth } from "@/lib/auth/auth-context";

export default function CasesPage() {
  const { user } = useAuth();
  const isDoctor = user?.role === "DOCTOR";
  const [selectedStatusTab, setSelectedStatusTab] = React.useState("ALL");

  const filteredCases = React.useMemo(() => {
    if (selectedStatusTab === "ALL") return mockCases;
    return mockCases.filter((c) => c.status === selectedStatusTab);
  }, [selectedStatusTab]);

  const columns: Column<ClinicalCaseSummary>[] = [
    {
      key: "caseNumber",
      header: "Case Identifier",
      render: (item) => (
        <span className="font-mono font-bold text-slate-900 block text-xs">{item.caseNumber}</span>
      ),
    },
    {
      key: "patientName",
      header: "Patient",
      render: (item) => (
        <div>
          <span className="font-semibold text-slate-900 block text-xs">{item.patientName}</span>
          <span className="text-[11px] text-slate-400 font-mono">
            {item.patientUhid} • {item.patientAge}y/{item.patientGender}
          </span>
        </div>
      ),
    },
    {
      key: "chiefComplaint",
      header: "Presenting Complaint",
      render: (item) => (
        <p className="text-slate-700 line-clamp-2 max-w-xs leading-relaxed text-xs">
          {item.chiefComplaint}
        </p>
      ),
    },
    {
      key: "encounterType",
      header: "Encounter Context",
      render: (item) => (
        <div>
          <span className="text-slate-700 block text-xs font-medium">{item.encounterType}</span>
          <span className="text-[11px] text-slate-400 font-mono">{item.encounterDate}</span>
        </div>
      ),
    },
    {
      key: "authorName",
      header: "Intake Officer",
      render: (item) => (
        <div>
          <span className="text-slate-800 block text-xs font-medium">{item.authorName}</span>
          <span className="text-[11px] text-slate-400">{item.authorRole}</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item) => <StatusBadge status={item.status} size="sm" />,
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (item) => (
        <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
          {item.status === "UNDER_REVIEW" && isDoctor ? (
            <Link href={`/review/${item.id}`}>
              <Button variant="primary" size="sm" leftIcon={<ClipboardCheck className="h-3 w-3" />}>
                Review & Approve
              </Button>
            </Link>
          ) : (
            <Link href={`/cases/${item.id}`}>
              <Button variant="outline" size="sm" leftIcon={<Eye className="h-3 w-3" />}>
                View Chart
              </Button>
            </Link>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <PageHeader
        title="Clinical Case Records"
        eyebrow="Electronic Health Records"
        description="Search and inspect patient encounter records, triage history drafts, and clinician-approved documentation."
        breadcrumbs={[{ label: "Cases", current: true }]}
        actions={
          <Link href="/cases/new">
            <Button variant="primary" size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>
              New Case Intake
            </Button>
          </Link>
        }
      />

      {/* Tabs Filter */}
      <Tabs
        variant="underline"
        tabs={[
          { id: "ALL", label: "All Encounters", badge: mockCases.length },
          { id: "UNDER_REVIEW", label: "Awaiting Review", badge: 2 },
          { id: "FINALIZED", label: "Clinician Approved", badge: 1 },
          { id: "DRAFT", label: "Intake Drafts" },
        ]}
        activeTab={selectedStatusTab}
        onChange={setSelectedStatusTab}
      />

      <DataTable
        columns={columns}
        data={filteredCases}
        keyExtractor={(item) => item.id}
        searchFilter={(item, query) =>
          item.patientName.toLowerCase().includes(query) ||
          item.caseNumber.toLowerCase().includes(query) ||
          item.chiefComplaint.toLowerCase().includes(query) ||
          item.patientUhid.toLowerCase().includes(query)
        }
        searchPlaceholder="Filter cases by patient name, UHID, or complaint..."
      />
    </div>
  );
}
