/**
 * Medicine AI Explanation Layer
 *
 * Strict Architectural Boundary:
 * The AI is an explanation and plain-language formatting layer for verified medicine reference data.
 * It receives ONLY the retrieved trusted medicine information.
 * It does NOT diagnose, prescribe, recommend starting/stopping medication, or infer diseases.
 */

import { TrustedMedicineRecord, MedicineExplanationResult } from "./types";

export interface MedicineExplanationProvider {
  name: string;
  explainMedicine(record: TrustedMedicineRecord): Promise<MedicineExplanationResult>;
}

export const MANDATORY_SAFETY_DISCLAIMER =
  "This information is provided for educational purposes and does not replace advice from a doctor or pharmacist. Do not start, stop, or change a medicine based only on this information.";

export class StandardMedicineExplanationProvider implements MedicineExplanationProvider {
  name = "Arogya-Educational-Explanation-Engine";

  async explainMedicine(record: TrustedMedicineRecord): Promise<MedicineExplanationResult> {
    // In demo / contract mode or fallback:
    // Format the verified reference record into accessible, patient-oriented structure
    // without hallucinations or diagnostic speculation.
    return {
      medicineName: record.name,
      genericName: record.genericName,
      category: record.category,
      whatIsIt: record.whatIsIt,
      commonUses: [...record.commonUses],
      howItIsUsed: record.howItIsUsed,
      precautions: [...record.precautions],
      commonSideEffects: [...record.commonSideEffects],
      whenToContactDoctor: [...record.whenToContactDoctor],
      disclaimer: MANDATORY_SAFETY_DISCLAIMER,
      explanationProvider: this.name,
      generatedAt: new Date().toISOString(),
    };
  }
}

// Singleton default explanation provider
export const defaultExplanationProvider = new StandardMedicineExplanationProvider();

