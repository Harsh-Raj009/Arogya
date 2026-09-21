/**
 * Medicine Information & Explanation Types (Phase 4C)
 *
 * Strict non-diagnostic educational boundary.
 * The AI is an explanation layer, not the source of medical facts.
 */

export interface TrustedMedicineRecord {
  id: string;
  name: string;
  genericName: string;
  category: string;
  aliases: string[];
  whatIsIt: string;
  commonUses: string[];
  howItIsUsed: string;
  precautions: string[];
  commonSideEffects: string[];
  whenToContactDoctor: string[];
}

export interface MedicineExplanationResult {
  medicineName: string;
  genericName: string;
  category: string;
  whatIsIt: string;
  commonUses: string[];
  howItIsUsed: string;
  precautions: string[];
  commonSideEffects: string[];
  whenToContactDoctor: string[];
  disclaimer: string;
  explanationProvider: string;
  generatedAt: string;
}

export interface MedicineSearchResponse {
  success: boolean;
  found: boolean;
  searchedQuery?: string;
  message?: string;
  data?: MedicineExplanationResult;
}
