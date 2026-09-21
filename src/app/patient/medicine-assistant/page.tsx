"use client";

import * as React from "react";
import Link from "next/link";
import {
  Pill,
  ArrowLeft,
  Search,
  Loader2,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Info,
  AlertTriangle,
  HeartPulse,
  Clock,
  Sparkles,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MedicineExplanationResult } from "@/lib/medicine/types";

const SUGGESTED_MEDICINES = [
  "Paracetamol",
  "Ibuprofen",
  "Cetirizine",
  "Amoxicillin",
  "Omeprazole",
];

export default function MedicineAssistantPage() {
  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<MedicineExplanationResult | null>(null);
  const [searchedTerm, setSearchedTerm] = React.useState<string | null>(null);
  const [notFoundMessage, setNotFoundMessage] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [recentSearches, setRecentSearches] = React.useState<string[]>([]);

  // Source of truth: Reads explicitTerm if provided (e.g. quick chip click),
  // otherwise strictly reads the current text present in the search input state (query).
  const executeSearch = async (explicitTerm?: string) => {
    const rawTerm = typeof explicitTerm === "string" ? explicitTerm : query;
    const term = rawTerm.trim();

    if (!term) {
      setErrorMessage("Please enter a medicine name to search.");
      return;
    }

    if (term.length > 100) {
      setErrorMessage("Medicine name is too long. Please enter 100 characters or fewer.");
      return;
    }

    // Keep input field and state aligned
    setQuery(term);
    setSearchedTerm(term);
    setLoading(true);
    setErrorMessage(null);
    setNotFoundMessage(null);
    setResult(null);

    try {
      const response = await fetch("/api/patient/medicine-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ medicineName: term }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(
          data.message || "Unable to retrieve medicine information right now. Please try again."
        );
        return;
      }

      if (data.found && data.data) {
        setResult(data.data);
        // Track client-side recent searches (maximum 5 items, deduplicated)
        setRecentSearches((prev) => {
          const updated = [term, ...prev.filter((item) => item.toLowerCase() !== term.toLowerCase())];
          return updated.slice(0, 5);
        });
      } else {
        setNotFoundMessage(
          data.message ||
            "We couldn't find this medicine in the current information database. Please check the spelling or consult a doctor/pharmacist for reliable information."
        );
      }
    } catch {
      setErrorMessage(
        "Unable to retrieve medicine information right now. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    executeSearch();
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link href="/patient/dashboard">
          <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="h-3.5 w-3.5" />}>
            Back to Dashboard
          </Button>
        </Link>
        <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
          Module: Educational Assistant
        </span>
      </div>

      {/* Main Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200">
            <Pill className="h-4 w-4" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Medicine Information Assistant
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
          Search for a medicine to understand its general uses, precautions, and important information.
        </p>
      </div>

      {/* Search Console Card */}
      <Card className="border-slate-200 shadow-2xs bg-white">
        <CardContent className="p-5 sm:p-6 space-y-4">
          <form onSubmit={handleFormSubmit} className="space-y-2">
            <label
              htmlFor="medicine-search-input"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Search Medicine Name
            </label>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="h-4 w-4" />
                </div>
                <input
                  id="medicine-search-input"
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="Enter medicine name, e.g. Paracetamol"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 transition-colors bg-white"
                  disabled={loading}
                  aria-describedby="medicine-helper-text"
                  autoComplete="off"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={loading || !query.trim()}
                leftIcon={loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                className="whitespace-nowrap sm:w-auto w-full justify-center"
              >
                {loading ? "Finding medicine information..." : "Get Medicine Information"}
              </Button>
            </div>
            <p id="medicine-helper-text" className="text-[11px] text-slate-500">
              Enter the medicine name exactly as written on your prescription or medicine pack.
            </p>
          </form>

          {/* Quick suggestions & Recent Searches */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1 mr-1">
              <Sparkles className="h-3 w-3 text-teal-600" />
              Suggested medicines:
            </span>
            {SUGGESTED_MEDICINES.map((med) => (
              <button
                key={med}
                type="button"
                onClick={() => {
                  setQuery(med);
                  executeSearch(med);
                }}
                disabled={loading}
                className="text-[11px] font-medium text-teal-900 bg-teal-50/70 hover:bg-teal-100/80 px-2.5 py-1 rounded-full border border-teal-200/80 transition-colors cursor-pointer disabled:opacity-50"
              >
                {med}
              </button>
            ))}
          </div>

          {recentSearches.length > 0 && (
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1 mr-1">
                <Clock className="h-3 w-3 text-slate-400" />
                Recent:
              </span>
              {recentSearches.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setQuery(item);
                    executeSearch(item);
                  }}
                  disabled={loading}
                  className="text-[11px] text-slate-700 bg-slate-100 hover:bg-slate-200/70 px-2.5 py-0.5 rounded-full border border-slate-200 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <Card className="border-slate-200 bg-white p-8 text-center shadow-2xs">
          <div className="flex flex-col items-center justify-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-teal-700" />
            <p className="text-sm font-semibold text-slate-800">Finding medicine information...</p>
            <p className="text-xs text-slate-500">Checking verified clinical reference database.</p>
          </div>
        </Card>
      )}

      {/* Validation Error Message */}
      {errorMessage && (
        <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-4 text-xs text-rose-900 flex items-start gap-3">
          <AlertCircle className="h-4 w-4 text-rose-600 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <p className="font-semibold">{errorMessage}</p>
            <p className="text-rose-800/80 text-[11px]">
              Please check your input or try searching for another medicine.
            </p>
          </div>
        </div>
      )}

      {/* Medicine Not Found State */}
      {!loading && notFoundMessage && (
        <Card className="border-amber-200 bg-white shadow-2xs">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200 shrink-0">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">Medicine not found</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{notFoundMessage}</p>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-3.5 text-xs text-slate-700 space-y-1.5">
              <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5 text-teal-700" />
                Helpful Tips:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-[11px] text-slate-600">
                <li>Check for typos or spelling differences on the packaging.</li>
                <li>Try searching for the generic salt name (e.g. Paracetamol instead of a brand).</li>
                <li>
                  Explore one of the available demo medicines:{" "}
                  <strong className="text-slate-800">
                    Paracetamol, Ibuprofen, Cetirizine, Amoxicillin, Omeprazole
                  </strong>
                  .
                </li>
                <li>
                  For unlisted or specialty medications, always consult your treating doctor or dispensing pharmacist.
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Result Section */}
      {!loading && result && (
        <div className="space-y-4">
          {/* Prominent Educational Safety Notice */}
          <div className="rounded-xl border border-teal-200/90 bg-teal-50/70 p-4 sm:p-5 flex items-start gap-3.5 shadow-2xs">
            <ShieldCheck className="h-5 w-5 text-teal-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-teal-950">
                Educational information only
              </h2>
              <p className="text-xs text-teal-900 leading-relaxed">
                {result.disclaimer}
              </p>
            </div>
          </div>

          {/* Structured Medicine Details Card */}
          <Card className="border-slate-200/90 bg-white shadow-2xs overflow-hidden">
            <CardHeader className="bg-slate-50/60 border-b border-slate-100 p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className="text-xl sm:text-2xl font-bold text-slate-900">
                      {result.medicineName}
                    </CardTitle>
                    <span className="text-xs font-mono font-medium text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {result.genericName}
                    </span>
                    {searchedTerm && searchedTerm.toLowerCase() !== result.medicineName.toLowerCase() && (
                      <span className="text-[11px] font-mono text-teal-900 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                        Query: &quot;{searchedTerm}&quot;
                      </span>
                    )}
                  </div>
                  <CardDescription className="text-xs text-teal-800 font-medium">
                    Category: {result.category}
                  </CardDescription>
                </div>
                <Badge variant="emerald" size="sm" className="self-start sm:self-auto">
                  Verified Reference Data
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 space-y-6 divide-y divide-slate-100">
              {/* 1. What is it? */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Info className="h-4 w-4 text-teal-700" />
                  What is it?
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {result.whatIsIt}
                </p>
              </div>

              {/* 2. Common Uses */}
              <div className="pt-5 space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <HeartPulse className="h-4 w-4 text-teal-700" />
                  Common uses
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {result.commonUses.map((use, idx) => (
                    <li
                      key={idx}
                      className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-200/80 flex items-start gap-2"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{use}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3. How it is generally used */}
              <div className="pt-5 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-teal-700" />
                  How it is generally used
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/60 p-3.5 rounded-lg border border-slate-200/80">
                  {result.howItIsUsed}
                </p>
              </div>

              {/* 4. Important precautions */}
              <div className="pt-5 space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  Important precautions
                </h3>
                <div className="space-y-2 text-xs">
                  {result.precautions.map((prec, idx) => (
                    <div
                      key={idx}
                      className="bg-amber-50/60 border border-amber-200/80 rounded-lg p-3 text-amber-950 flex items-start gap-2.5"
                    >
                      <AlertCircle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{prec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Common side effects */}
              {result.commonSideEffects && result.commonSideEffects.length > 0 && (
                <div className="pt-5 space-y-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <HelpCircle className="h-4 w-4 text-slate-500" />
                    Common side effects
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {result.commonSideEffects.map((effect, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-slate-400">•</span>
                        <span>{effect}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 6. When to contact a healthcare professional */}
              <div className="pt-5 space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
                  <AlertCircle className="h-4 w-4 text-rose-600" />
                  When to contact a healthcare professional
                </h3>
                <div className="rounded-lg border border-rose-200 bg-rose-50/60 p-4 space-y-2 text-xs text-rose-950">
                  <p className="font-semibold">
                    Seek immediate medical advice if you notice any of the following:
                  </p>
                  <ul className="space-y-1.5 pl-4 list-disc text-rose-900 text-[11px] leading-relaxed">
                    {result.whenToContactDoctor.map((warning, idx) => (
                      <li key={idx}>{warning}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>

            <div className="bg-slate-50/80 border-t border-slate-100 p-4 text-[11px] text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>Source: Verified Clinical Reference Database</span>
              <span className="font-mono text-[10px]">
                Explanation Layer: {result.explanationProvider}
              </span>
            </div>
          </Card>
        </div>
      )}

      {/* Empty State / Initial Exploration Guidance */}
      {!loading && !result && !notFoundMessage && (
        <Card className="border-slate-200 bg-white p-6 shadow-2xs">
          <div className="space-y-3 text-xs text-slate-600">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-teal-700" />
              About this assistant:
            </h3>
            <p className="leading-relaxed">
              This tool provides simplified educational information regarding common medications. It helps you understand what a medicine is, why doctors commonly prescribe it, and what precautions to keep in mind.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                <span className="font-semibold text-slate-900 block text-[11px]">1. Non-Diagnostic</span>
                <p className="text-[11px] text-slate-500">Does not diagnose illnesses or assess your personal symptoms.</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                <span className="font-semibold text-slate-900 block text-[11px]">2. Non-Prescriptive</span>
                <p className="text-[11px] text-slate-500">Does not prescribe, change, or recommend altering any medication.</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                <span className="font-semibold text-slate-900 block text-[11px]">3. Verified Information</span>
                <p className="text-[11px] text-slate-500">Anchored to trusted clinical reference data without hallucination.</p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
