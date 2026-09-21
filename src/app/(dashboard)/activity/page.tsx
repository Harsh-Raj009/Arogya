"use client";

import * as React from "react";
import { History, ShieldCheck, Download } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timeline } from "@/components/ui/timeline";
import { Tabs } from "@/components/ui/tabs";
import { mockActivityTimeline } from "@/lib/mock-data";

export default function ActivityPage() {
  const [activeTab, setActiveTab] = React.useState("ALL");

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title="Clinical Audit & Activity Log"
        eyebrow="System Governance"
        description="Immutable timestamped record of clinical case generation, AI structuring passes, clinician modifications, and final approvals."
        breadcrumbs={[{ label: "Activity", current: true }]}
        actions={
          <Button variant="outline" size="sm" leftIcon={<Download className="h-3.5 w-3.5" />}>
            Export Audit Trail (CSV)
          </Button>
        }
      />

      <Tabs
        tabs={[
          { id: "ALL", label: "All Events", badge: mockActivityTimeline.length },
          { id: "APPROVALS", label: "Clinician Approvals" },
          { id: "AI_PASS", label: "AI Structuring Passes" },
          { id: "ALERTS", label: "Clinical Alerts" },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <Card className="shadow-[0_1px_3px_rgba(15,23,42,0.03)] border-slate-200/90">
        <CardHeader className="pb-3 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <CardTitle>Audit Timeline for Clinical Care Unit</CardTitle>
            <span className="text-[11px] text-slate-500 font-mono">Shift Log • Room 104</span>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Timeline items={mockActivityTimeline} />
        </CardContent>
      </Card>
    </div>
  );
}
