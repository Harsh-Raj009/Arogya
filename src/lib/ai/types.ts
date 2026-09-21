/**
 * AI Provider Contract Types
 * Decoupled abstraction to prevent vendor lock-in
 */

import { ClinicalHistorySections } from "@/types/clinical";

export interface AIStructuringRequest {
  caseId: string;
  unstructuredNotes: string;
  voiceTranscript?: string;
  patientContext: {
    age: number;
    gender: string;
    knownChronicConditions?: string[];
  };
}

export interface AIStructuringResult {
  structuredHistory: Partial<ClinicalHistorySections>;
  modelUsed: string;
  confidenceScore: number;
  extractedEntities: {
    symptoms: string[];
    medications: string[];
    allergies: string[];
    timelineEvents: string[];
  };
  clinicalDisclaimer: string;
  processedAt: string;
}

export interface AIProviderConfig {
  providerName: "mock" | "openai" | "anthropic" | "gemini" | "ollama";
  apiKey?: string;
  baseUrl?: string;
  modelIdentifier?: string;
}

