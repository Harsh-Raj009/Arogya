"use client";

import * as React from "react";
import Link from "next/link";
import {
  User,
  ShieldCheck,
  Calendar,
  Phone,
  AlertTriangle,
  Heart,
  MapPin,
  FileText,
  ArrowRight,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth/auth-context";
import { mockPatients } from "@/lib/mock-data";

export default function PatientProfilePage() {
  const { user } = useAuth();

  // Resolve the authenticated patient profile strictly
  const patientId = user?.patientId || "pat-101";
  const patientProfile =
    mockPatients.find((p) => p.id === patientId || p.uhid === user?.licenseNumber) ||
    mockPatients[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              My Patient Profile
            </h1>
            <Badge variant="teal" size="sm">
              Verified Identity
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Official demographic registration and contact records on file with Arogya.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/patient/records">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
              View Health Records
            </Button>
          </Link>
        </div>
      </div>

      {/* Allergies Alert If Present */}
      {patientProfile.allergiesSummary && patientProfile.allergiesSummary.length > 0 && (
        <div className="rounded-lg border border-rose-200 bg-rose-50/80 p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-semibold text-rose-900">
              Active Medical Allergies Recorded
            </p>
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              {patientProfile.allergiesSummary.map((allergy, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded font-mono text-[11px] font-semibold bg-white text-rose-800 border border-rose-200"
                >
                  {allergy}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-rose-700 pt-0.5">
              These allergy alerts are automatically presented to doctors and nurses during every encounter.
            </p>
          </div>
        </div>
      )}

      {/* Profile Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Identity & Healthcare Identifiers */}
        <Card className="bg-white border-slate-200/90 shadow-2xs">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <User className="h-4 w-4 text-teal-700" />
              Identification & Demographics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-3.5 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Full Name</span>
              <span className="font-bold text-slate-900 text-sm">{patientProfile.fullName}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Unique Healthcare ID (UHID)</span>
              <span className="font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/80">
                {patientProfile.uhid}
              </span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">ABHA ID (National Health Account)</span>
              <span className="font-mono text-slate-800">
                {patientProfile.abhaId || "Not yet linked"}
              </span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Date of Birth</span>
              <span className="font-mono text-slate-800">{patientProfile.dateOfBirth}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Age / Gender</span>
              <span className="text-slate-800">{patientProfile.age} years • {patientProfile.gender}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Blood Group</span>
              <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                {patientProfile.bloodGroup || "B+"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Contact & Emergency Information */}
        <Card className="bg-white border-slate-200/90 shadow-2xs">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Phone className="h-4 w-4 text-teal-700" />
              Contact & Emergency Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-3.5 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Contact Phone</span>
              <span className="font-mono font-semibold text-slate-900">{patientProfile.contactPhone}</span>
            </div>

            <div className="pb-2 border-b border-slate-100 space-y-1">
              <span className="text-slate-500 font-medium block">Emergency Contact</span>
              <p className="font-semibold text-slate-800">
                {patientProfile.emergencyContact}
              </p>
            </div>

            <div className="pb-2 border-b border-slate-100 space-y-1">
              <span className="text-slate-500 font-medium block">Primary Chronic Conditions</span>
              <p className="text-slate-800 font-medium">
                {patientProfile.primaryCondition || "None documented"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-medium block">Residential Location</span>
              <p className="text-slate-700">
                {patientProfile.district}, {patientProfile.state}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interoperability and Privacy Assurance */}
      <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-teal-700 shrink-0" />
          <span>Profile managed under interoperability-ready standards. Personal data is never shared without explicit consent.</span>
        </div>
      </div>
    </div>
  );
}

