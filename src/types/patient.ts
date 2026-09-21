/**
 * Patient Demographic & Longitudinal Types
 */

export interface PatientProfile {
  id: string;
  uhid: string;              // Unique Healthcare Identifier
  abhaId?: string;           // Ayushman Bharat Health Account
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  bloodGroup?: string;
  contactPhone: string;
  emergencyContact: string;
  addressLine?: string;
  district?: string;
  state?: string;
  primaryCondition?: string;
  riskCategory: "Low" | "Moderate" | "High";
  totalEncounters: number;
  lastVisitDate: string;
  allergiesSummary?: string[];
}

