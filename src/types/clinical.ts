/**
 * Clinical Domain Types for Arogya Platform
 * Aligned with SIH26047 Patient Case-Taking taxonomy
 */

export type CaseStatus = "DRAFT" | "AI_STRUCTURED" | "UNDER_REVIEW" | "FINALIZED" | "AMENDED";

export type SeverityLevel = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

export interface VitalsData {
  systolic?: number;       // mmHg
  diastolic?: number;      // mmHg
  heartRate?: number;      // bpm
  respiratoryRate?: number;// breaths/min
  temperature?: number;    // Celsius
  oxygenSat?: number;      // SpO2 %
  bloodGlucose?: number;   // mg/dL
  bmi?: number;
  recordedAt: string;
}

export interface ClinicalHistorySections {
  // 1. Presenting Complaint (Chief Complaint & duration)
  presentingComplaint: string;
  // 2. History of Present Illness (HPI)
  historyOfPresentIllness: string;
  // 3. Past Medical History (PMH - hypertension, diabetes, asthma, etc.)
  pastMedicalHistory?: string;
  // 4. Past Surgical History (PSH - previous procedures, dates)
  pastSurgicalHistory?: string;
  // 5. Drug History (Current medications, dosages, adherence)
  drugHistory?: string;
  // 6. Allergy History (Substances, manifestations, severity)
  allergyHistory?: string;
  // 7. Family History (Hereditary risk factors, family illnesses)
  familyHistory?: string;
  // 8. Personal & Social History (Habits, smoking, alcohol, occupation, living conditions)
  personalSocialHistory?: string;
  // 9. Review of Systems (ROS - multi-system physical inquiry)
  reviewOfSystems?: Record<string, string>;
  // 10. AI Structuring metadata
  aiStructured?: boolean;
  aiModelUsed?: string;
  structuringConfidence?: number;
}

export interface DoctorReviewData {
  reviewerId: string;
  reviewerName: string;
  reviewerSpecialty?: string;
  doctorNotes?: string;
  modificationsSummary?: string;
  severityLevel: SeverityLevel;
  isSigned: boolean;
  signedAt?: string;
  digitalSignatureHash?: string;
}

export interface ClinicalCaseSummary {
  id: string;
  caseNumber: string;
  patientId: string;
  patientName: string;
  patientUhid: string;
  patientAbha?: string;
  patientAge: number;
  patientGender: "Male" | "Female" | "Other";
  encounterType: string;
  encounterDate: string;
  chiefComplaint: string;
  status: CaseStatus;
  severityLevel: SeverityLevel;
  authorName: string;
  authorRole: string;
  reviewerName?: string;
  lastUpdated: string;
  vitals?: VitalsData;
  history?: ClinicalHistorySections;
  review?: DoctorReviewData;
}

