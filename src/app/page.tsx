"use client";

import * as React from "react";
import Link from "next/link";
import {
  Stethoscope,
  ShieldCheck,
  ArrowRight,
  Menu,
  X,
  CheckCircle2,
  Clock,
  FileText,
  FilePlus2,
  User,
  Users,
  Building2,
  Activity,
  ClipboardCheck,
  Check,
  Heart,
  ChevronRight,
  Shield,
  FileCheck2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafb] text-slate-900 flex flex-col selection:bg-teal-100 selection:text-teal-900">
      {/* ============================================================ */}
      {/* 1. PUBLIC HEADER NAVIGATION                                 */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xs border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-lg bg-teal-700 text-white flex items-center justify-center shadow-2xs group-hover:bg-teal-800 transition-colors">
                <Stethoscope className="h-5 w-5 stroke-[2.2]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-slate-900">AROGYA</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200/70 px-1.5 py-0.5 rounded">
                  Clinical
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
              <Link href="#" className="text-teal-800 hover:text-teal-900 transition-colors">
                Home
              </Link>
              <Link href="#how-it-works" className="hover:text-slate-900 transition-colors">
                How It Works
              </Link>
              <Link href="#benefits" className="hover:text-slate-900 transition-colors">
                Features
              </Link>
              <Link href="#roles" className="hover:text-slate-900 transition-colors">
                Role Access
              </Link>
              <Link href="#safety" className="hover:text-slate-900 transition-colors">
                Trust & Safety
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <Button variant="outline" size="sm" className="font-medium text-slate-700">
                  Sign In
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="primary"
                  size="sm"
                  rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                  className="font-medium"
                >
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-hidden focus:ring-2 focus:ring-teal-700"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 animate-in slide-in-from-top-2 duration-150">
            <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
              <Link
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-slate-50 text-teal-800 font-semibold"
              >
                Home
              </Link>
              <Link
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-slate-50"
              >
                How It Works
              </Link>
              <Link
                href="#benefits"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-slate-50"
              >
                Features
              </Link>
              <Link
                href="#roles"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-slate-50"
              >
                Role Access
              </Link>
              <Link
                href="#safety"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-slate-50"
              >
                Trust & Safety
              </Link>
            </nav>
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <Button variant="outline" size="md" className="w-full justify-center">
                  Sign In
                </Button>
              </Link>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <Button
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  className="w-full justify-center"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ============================================================ */}
      {/* 2. HERO SECTION                                              */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200/70 bg-gradient-to-b from-white via-white to-[#f8fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Copy & CTAs */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200/90 text-teal-900 text-xs font-semibold tracking-tight shadow-2xs">
                <ShieldCheck className="h-3.5 w-3.5 text-teal-700 shrink-0" />
                <span>Smart India Hackathon 2026 • SIH26047</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
                  AI-Assisted Patient Case-Taking <br className="hidden sm:inline" />
                  <span className="text-teal-800">and Clinical Documentation</span>
                </h1>
              </div>

              {/* Supporting Message */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Arogya helps healthcare teams capture, organize and review patient history while
                keeping the clinician in control.
              </p>

              {/* CTA Group */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link href="/login">
                  <Button
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                    className="w-full sm:w-auto font-medium px-6 py-2.5 shadow-sm hover:shadow transition-all"
                  >
                    Get Started
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto font-medium px-6 py-2.5 bg-white border-slate-300 hover:bg-slate-50 text-slate-800"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>

              {/* Architecture & Institutional note */}
              <div className="pt-2 flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-600 shrink-0" />
                <span>Designed for Indian clinical workflows with an interoperability-ready architecture.</span>
              </div>
            </div>

            {/* Right Column: Realistic Clinical Workflow Visual */}
            <div className="lg:col-span-6">
              <div className="rounded-xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-4">
                {/* Clinical Window Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <span className="font-mono text-xs font-bold text-slate-800">
                      CASE #AR-2026-0041
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[11px] text-slate-500">General OPD • Room 104</span>
                  </div>
                  <StatusBadge status="AI_STRUCTURED" size="sm" />
                </div>

                {/* Patient Demographic Bar */}
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-semibold text-slate-900">Rajesh Gupta</span>
                    <span className="text-slate-500 font-mono text-[11px] ml-1.5">54y, Male</span>
                  </div>
                  <div className="font-mono text-[11px] text-slate-600">
                    UHID: <strong className="text-slate-800">AIIMS-2026-0941</strong>
                  </div>
                  <div className="font-mono text-[11px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/60">
                    ABHA: 91-4821-3920-1102
                  </div>
                </div>

                {/* Presenting Complaint & HPI Preview */}
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-lg border border-slate-100 bg-white space-y-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                      Presenting Complaint
                    </span>
                    <p className="font-medium text-slate-900 leading-snug">
                      Acute epigastric burning pain radiating to back for 2 days.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg border border-teal-100 bg-teal-50/40 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-900">
                        Structured Clinical Narrative (HPI)
                      </span>
                      <span className="text-[10px] font-mono text-teal-700 bg-white px-1.5 py-0.2 rounded border border-teal-200/60">
                        Confidence 94%
                      </span>
                    </div>
                    <p className="text-slate-700 text-[11px] leading-relaxed">
                      54-year-old male presents with continuous sharp epigastric pain following heavy
                      meal 2 days ago. Pain radiates posteriorly towards mid-thoracic spine with mild
                      relief on leaning forward. Associated with 2 episodes of non-bilious vomiting.
                    </p>
                  </div>
                </div>

                {/* Objective Vitals Strip */}
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Objective Physiological Measurements
                  </span>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="rounded-md border border-slate-200 bg-slate-50/60 p-2">
                      <span className="text-[10px] text-slate-400 block font-medium">BP</span>
                      <span className="font-mono text-xs font-bold text-slate-800">148/92</span>
                      <span className="text-[9px] text-slate-400 block">mmHg</span>
                    </div>
                    <div className="rounded-md border border-slate-200 bg-slate-50/60 p-2">
                      <span className="text-[10px] text-slate-400 block font-medium">Pulse</span>
                      <span className="font-mono text-xs font-bold text-slate-800">88</span>
                      <span className="text-[9px] text-slate-400 block">bpm</span>
                    </div>
                    <div className="rounded-md border border-slate-200 bg-slate-50/60 p-2">
                      <span className="text-[10px] text-slate-400 block font-medium">SpO₂</span>
                      <span className="font-mono text-xs font-bold text-slate-800">98%</span>
                      <span className="text-[9px] text-slate-400 block">Room air</span>
                    </div>
                    <div className="rounded-md border border-slate-200 bg-slate-50/60 p-2">
                      <span className="text-[10px] text-slate-400 block font-medium">Temp</span>
                      <span className="font-mono text-xs font-bold text-slate-800">37.1</span>
                      <span className="text-[9px] text-slate-400 block">°C</span>
                    </div>
                  </div>
                </div>

                {/* Clinician Verification Footer */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    <span>Attending: <strong>Dr. Priya Sharma, MD</strong></span>
                  </div>
                  <StatusBadge status="PENDING_REVIEW" size="sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. SECTION 1: HOW AROGYA WORKS                              */}
      {/* ============================================================ */}
      <section id="how-it-works" className="py-16 md:py-24 bg-white border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200/80 px-2.5 py-1 rounded-full">
              Clinical Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              How Arogya Works
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              A structured 5-stage pipeline connecting intake staff, assistive structuring, and
              licensed clinician review to produce verified clinical records.
            </p>
          </div>

          {/* 5-Step Process Flow Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6 relative">
            {/* Step 1 */}
            <div className="rounded-xl border border-slate-200/90 bg-slate-50/50 p-5 space-y-3 relative hover:border-teal-300 transition-colors">
              <div className="h-9 w-9 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold text-sm shadow-2xs">
                01
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Patient Information
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Demographic verification, Unique Healthcare Identifier (UHID), and optional ABHA
                linkage at counter registration.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-xl border border-slate-200/90 bg-slate-50/50 p-5 space-y-3 relative hover:border-teal-300 transition-colors">
              <div className="h-9 w-9 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold text-sm shadow-2xs">
                02
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Structured Case Taking
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Guided 10-section clinical history capture with optional voice dictation and objective
                vitals recording by clinical staff.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-xl border border-teal-200/90 bg-teal-50/40 p-5 space-y-3 relative hover:border-teal-300 transition-colors">
              <div className="h-9 w-9 rounded-lg bg-teal-800 text-white flex items-center justify-center font-bold text-sm shadow-2xs">
                03
              </div>
              <h3 className="font-bold text-teal-950 text-base">
                AI-Assisted Structuring
              </h3>
              <p className="text-xs text-teal-900/90 leading-relaxed">
                Natural language processing converts unstructured notes and audio into formatted
                clinical sections as a preliminary draft.
              </p>
            </div>

            {/* Step 4 */}
            <div className="rounded-xl border border-amber-200/90 bg-amber-50/30 p-5 space-y-3 relative hover:border-amber-300 transition-colors">
              <div className="h-9 w-9 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-sm shadow-2xs">
                04
              </div>
              <h3 className="font-bold text-amber-950 text-base">
                Clinician Review
              </h3>
              <p className="text-xs text-amber-900/90 leading-relaxed">
                Attending physician reviews the case in a dedicated queue, makes direct amendments,
                and adds clinical impressions.
              </p>
            </div>

            {/* Step 5 */}
            <div className="rounded-xl border border-emerald-200/90 bg-emerald-50/40 p-5 space-y-3 relative hover:border-emerald-300 transition-colors">
              <div className="h-9 w-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shadow-2xs">
                05
              </div>
              <h3 className="font-bold text-emerald-950 text-base">
                Final Clinical Record
              </h3>
              <p className="text-xs text-emerald-900/90 leading-relaxed">
                Case marked as Clinician Approved, entered into the permanent longitudinal EHR, and
                ready for printing or export.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. SECTION 2: KEY BENEFITS                                  */}
      {/* ============================================================ */}
      <section id="benefits" className="py-16 md:py-24 bg-[#f8fafb] border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200/80 px-2.5 py-1 rounded-full">
              Clinical Value
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Key Benefits
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Designed specifically to alleviate high patient-volume pressures without ever removing
              medical judgment from the practitioner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Benefit 1 */}
            <div className="rounded-xl border border-slate-200/90 bg-white p-6 space-y-3 shadow-xs">
              <div className="h-10 w-10 rounded-lg bg-teal-50 text-teal-700 border border-teal-200/80 flex items-center justify-center">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Less Documentation Burden
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reduces average case documentation time from 14 minutes to under 5 minutes through
                smart field structuring and voice-enabled intake.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="rounded-xl border border-slate-200/90 bg-white p-6 space-y-3 shadow-xs">
              <div className="h-10 w-10 rounded-lg bg-teal-50 text-teal-700 border border-teal-200/80 flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Structured Patient History
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Adheres to standardized 10-section clinical taxonomy (HPI, PMH, Drug History, Allergies,
                Family History), eliminating fragmented free-text notes.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="rounded-xl border border-slate-200/90 bg-white p-6 space-y-3 shadow-xs">
              <div className="h-10 w-10 rounded-lg bg-teal-50 text-teal-700 border border-teal-200/80 flex items-center justify-center">
                <ClipboardCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Faster Clinical Review
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A 2-column clinician workstation allows attending doctors to scan intake narratives,
                verify vitals, and approve cases in rapid 1-click workflows.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="rounded-xl border border-slate-200/90 bg-white p-6 space-y-3 shadow-xs">
              <div className="h-10 w-10 rounded-lg bg-teal-50 text-teal-700 border border-teal-200/80 flex items-center justify-center">
                <Activity className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Clear Patient Records
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Produces clean, legible, longitudinal EHR encounter records ready for hospital archives,
                referrals, or direct printouts for patients.
              </p>
            </div>

            {/* Benefit 5 (Spanning 2 columns on lg) */}
            <div className="rounded-xl border border-teal-200/90 bg-teal-50/50 p-6 space-y-3 shadow-xs md:col-span-2 lg:col-span-2">
              <div className="h-10 w-10 rounded-lg bg-teal-700 text-white flex items-center justify-center">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-teal-950 text-base">
                Clinician Remains the Final Decision-Maker
              </h3>
              <p className="text-xs text-teal-900/90 leading-relaxed">
                Zero autonomous triage or automatic diagnosis. The AI operates purely as a drafting
                assistant. The attending physician retains total authority, editorial discretion,
                and regulatory responsibility for every committed medical chart.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. SECTION 3: ROLE-BASED ACCESS                             */}
      {/* ============================================================ */}
      <section id="roles" className="py-16 md:py-24 bg-white border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200/80 px-2.5 py-1 rounded-full">
              System Roles
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Role-Based Access
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Strictly segmented permissions and dedicated workflows tailored for every member of the
              healthcare ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Role 1: Patient */}
            <div className="rounded-xl border border-slate-200/90 bg-slate-50/40 p-5 space-y-3 flex flex-col justify-between hover:border-slate-300 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 font-mono">
                    Role 01
                  </span>
                  <Badge variant="outline" size="sm">
                    Citizen
                  </Badge>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Patient</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  View personal records and use the medicine information assistant.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                <p className="font-medium text-slate-700">Capabilities:</p>
                <p>• Access verified discharge records</p>
                <p>• Consult medicine information</p>
                <p>• Track personal encounter history</p>
              </div>
            </div>

            {/* Role 2: Doctor */}
            <div className="rounded-xl border border-teal-200/90 bg-teal-50/30 p-5 space-y-3 flex flex-col justify-between hover:border-teal-300 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-800 font-mono">
                    Role 02
                  </span>
                  <Badge variant="teal" size="sm">
                    Clinical Leader
                  </Badge>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Doctor</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Review and approve clinical cases.
                </p>
              </div>
              <div className="pt-3 border-t border-teal-100 text-[11px] text-teal-950 space-y-1">
                <p className="font-medium text-teal-900">Capabilities:</p>
                <p>• Priority clinical review queue</p>
                <p>• Amend HPI & drug history</p>
                <p>• Authorize & sign case records</p>
              </div>
            </div>

            {/* Role 3: Clinical Staff */}
            <div className="rounded-xl border border-slate-200/90 bg-slate-50/40 p-5 space-y-3 flex flex-col justify-between hover:border-slate-300 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 font-mono">
                    Role 03
                  </span>
                  <Badge variant="blue" size="sm">
                    Triage & Intake
                  </Badge>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Clinical Staff</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Capture patient information and manage case intake.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                <p className="font-medium text-slate-700">Capabilities:</p>
                <p>• 10-section case-taking studio</p>
                <p>• Voice dictation capture</p>
                <p>• Objective vitals recording</p>
              </div>
            </div>

            {/* Role 4: Administrator */}
            <div className="rounded-xl border border-slate-200/90 bg-slate-50/40 p-5 space-y-3 flex flex-col justify-between hover:border-slate-300 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 font-mono">
                    Role 04
                  </span>
                  <Badge variant="default" size="sm">
                    Governance
                  </Badge>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Administrator</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Manage users, activity and system settings.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                <p className="font-medium text-slate-700">Capabilities:</p>
                <p>• Institutional user directory</p>
                <p>• Statutory audit trail review</p>
                <p>• Facility & provider setup</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. SECTION 4: TRUST / SAFETY STATEMENT                      */}
      {/* ============================================================ */}
      <section id="safety" className="py-16 md:py-24 bg-gradient-to-b from-[#f8fafb] to-white border-b border-slate-200/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/90 text-teal-900 text-xs font-semibold tracking-tight">
            <Shield className="h-3.5 w-3.5 text-teal-700" />
            <span>Clinical Governance & Safety Standard</span>
          </div>

          <div className="space-y-4">
            <blockquote className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              &ldquo;AI assists documentation. <br className="hidden sm:inline" />
              <span className="text-teal-800">The clinician remains the final decision-maker.&rdquo;</span>
            </blockquote>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Arogya is designed around strict medical ethics and legal compliance. The artificial
              intelligence structuring engine does not diagnose, prescribe, or bypass the attending
              physician.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-4">
            <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                <Check className="h-4 w-4 text-teal-700" />
                <span>Zero Autonomous Diagnosis</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                The AI never prescribes medications, assigns ICD codes independently, or issues autonomous clinical verdicts.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                <Check className="h-4 w-4 text-teal-700" />
                <span>Physician Sign-Off Mandate</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                No case record is archived or locked into the EHR without explicit review and approval by an authenticated doctor.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                <Check className="h-4 w-4 text-teal-700" />
                <span>Statutory Audit Trail</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Every AI generation, nurse intake, and doctor amendment is recorded in an immutable event log with timestamps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. BOTTOM CTA SECTION                                        */}
      {/* ============================================================ */}
      <section className="py-14 bg-teal-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Ready to Streamline Clinical Case-Taking?
          </h2>
          <p className="text-teal-100 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Experience how Arogya transforms patient intake while keeping medical practitioners firmly in control.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link href="/login">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="h-4 w-4" />}
                className="w-full sm:w-auto bg-white text-teal-950 hover:bg-teal-50 font-semibold px-6 py-2.5"
              >
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-teal-300 text-white hover:bg-teal-800/80 px-6 py-2.5"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. PUBLIC FOOTER                                             */}
      {/* ============================================================ */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-md bg-teal-600 text-white flex items-center justify-center">
                  <Stethoscope className="h-4 w-4" />
                </div>
                <span className="font-bold text-white text-base tracking-tight">AROGYA</span>
                <span className="text-[10px] font-mono text-teal-300 bg-teal-950/80 border border-teal-800 px-1.5 py-0.5 rounded">
                  v0.3.0
                </span>
              </div>
              <p className="text-slate-400 text-xs max-w-md">
                AI-Assisted Patient Case-Taking & Clinical Documentation Platform.
                Smart India Hackathon 2026 (SIH26047).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-medium">
              <Link href="#" className="hover:text-white transition-colors">
                Home
              </Link>
              <Link href="#how-it-works" className="hover:text-white transition-colors">
                How It Works
              </Link>
              <Link href="#benefits" className="hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#roles" className="hover:text-white transition-colors">
                Role Access
              </Link>
              <Link href="/login" className="text-teal-400 hover:text-teal-300 transition-colors">
                Workstation Sign In
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>
              Designed for Indian clinical workflows with an interoperability-ready architecture.
            </p>
            <p className="font-mono">
              Arogya Platform • SIH26047
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
