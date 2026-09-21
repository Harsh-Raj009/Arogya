/**
 * Medicine Information Provider Interface & Local Implementation
 *
 * Decouples medicine data sourcing so external drug databases / APIs can be plugged in later.
 * Enforces strict, prioritized matching to ensure typed queries resolve to their exact record
 * without substring collisions or accidental overrides.
 */

import { TrustedMedicineRecord } from "./types";
import { TRUSTED_MEDICINE_DATABASE } from "./knowledge-base";

export interface MedicineInformationProvider {
  name: string;
  findMedicine(query: string): Promise<TrustedMedicineRecord | null>;
  searchMedicine(query: string): Promise<TrustedMedicineRecord | null>;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export class LocalTrustedMedicineProvider implements MedicineInformationProvider {
  name = "Arogya-Trusted-Medicine-KnowledgeBase (Curated Reference)";

  async searchMedicine(query: string): Promise<TrustedMedicineRecord | null> {
    return this.findMedicine(query);
  }

  async findMedicine(query: string): Promise<TrustedMedicineRecord | null> {
    if (!query || typeof query !== "string") {
      return null;
    }

    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return null;
    }

    // 1. Exact primary medicine name match (highest priority, case-insensitive)
    const exactNameMatch = TRUSTED_MEDICINE_DATABASE.find(
      (item) => item.name.toLowerCase() === normalized
    );
    if (exactNameMatch) {
      return exactNameMatch;
    }

    // 2. Exact alias match (case-insensitive)
    const exactAliasMatch = TRUSTED_MEDICINE_DATABASE.find((item) =>
      item.aliases.some((alias) => alias.toLowerCase() === normalized)
    );
    if (exactAliasMatch) {
      return exactAliasMatch;
    }

    // 3. Exact generic name match
    const exactGenericMatch = TRUSTED_MEDICINE_DATABASE.find(
      (item) => item.genericName.toLowerCase() === normalized
    );
    if (exactGenericMatch) {
      return exactGenericMatch;
    }

    // 4. Word-level match in genericName (e.g. "acetaminophen" in "Paracetamol (Acetaminophen)")
    const genericWordMatch = TRUSTED_MEDICINE_DATABASE.find((item) => {
      const words = item.genericName.toLowerCase().split(/[\s,()/-]+/);
      return words.includes(normalized);
    });
    if (genericWordMatch) {
      return genericWordMatch;
    }

    // 5. Query contains the full medicine name or full alias as a whole-word token
    // (e.g. "Paracetamol 500mg" or "Tab Dolo" -> resolves to Paracetamol)
    const tokenMatch = TRUSTED_MEDICINE_DATABASE.find((item) => {
      const nameRegex = new RegExp(`\\b${escapeRegex(item.name)}\\b`, "i");
      if (nameRegex.test(normalized)) return true;
      return item.aliases.some((alias) => {
        const aliasRegex = new RegExp(`\\b${escapeRegex(alias)}\\b`, "i");
        return aliasRegex.test(normalized);
      });
    });
    if (tokenMatch) {
      return tokenMatch;
    }

    // If no verified record matches, return null (safe not-found state, zero hallucination)
    return null;
  }
}

// Singleton default provider instance
export const defaultMedicineProvider = new LocalTrustedMedicineProvider();
