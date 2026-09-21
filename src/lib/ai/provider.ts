/**
 * LLM Provider Abstraction
 * 
 * Strict boundary: AI assists with structuring data into the 10 clinical sections.
 * The AI does NOT diagnose, prescribe, or bypass the clinician.
 */

import { AIStructuringRequest, AIStructuringResult } from "./types";

export interface LLMProvider {
  name: string;
  isReady(): boolean;
  structureClinicalHistory(request: AIStructuringRequest): Promise<AIStructuringResult>;
}

export class MockClinicalLLMProvider implements LLMProvider {
  name = "Arogya-Clinical-Structuring-Engine (Mock/Contract)";

  isReady(): boolean {
    return true;
  }

  async structureClinicalHistory(request: AIStructuringRequest): Promise<AIStructuringResult> {
    // Contract implementation for Phase 1/2
    return {
      structuredHistory: {
        presentingComplaint: "Fever and mild dry cough for 3 days",
        historyOfPresentIllness:
          "Patient reports low-to-moderate grade intermittent fever without rigors. Dry non-productive cough, worse at night.",
        pastMedicalHistory: "Type 2 Diabetes Mellitus diagnosed 2022. Well-controlled.",
        drugHistory: "Tab Metformin 500mg BD after meals.",
        allergyHistory: "NKDA (No known drug allergies)",
        aiStructured: true,
        aiModelUsed: "Arogya-Clinical-Structuring-Engine",
        structuringConfidence: 0.94,
      },
      modelUsed: "Arogya-Clinical-Structuring-Engine",
      confidenceScore: 0.94,
      extractedEntities: {
        symptoms: ["Intermittent fever", "Dry cough"],
        medications: ["Metformin 500mg"],
        allergies: ["NKDA"],
        timelineEvents: ["Onset 3 days prior"],
      },
      clinicalDisclaimer:
        "AI draft only. Clinician verification and sign-off required prior to locking medical record.",
      processedAt: new Date().toISOString(),
    };
  }
}

