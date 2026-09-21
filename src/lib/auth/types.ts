export type RoleType = "DOCTOR" | "CLINICAL_STAFF" | "ADMINISTRATOR" | "PATIENT";

export type Permission =
  | "cases:view"
  | "cases:create"
  | "cases:edit"
  | "patients:create"
  | "patients:view"
  | "review:queue"
  | "review:approve"
  | "activity:view"
  | "admin:users"
  | "settings:configure"
  | "patient:records:view"
  | "patient:profile:view";

export interface RoleMetadata {
  code: RoleType;
  name: string;
  shortLabel: string;
  description: string;
  permissions: Permission[];
}

export const ROLE_DEFINITIONS: Record<RoleType, RoleMetadata> = {
  DOCTOR: {
    code: "DOCTOR",
    name: "Attending Doctor",
    shortLabel: "Doctor",
    description: "Clinical review, AI narrative verification, and final case approval.",
    permissions: [
      "cases:view",
      "cases:create",
      "cases:edit",
      "patients:view",
      "review:queue",
      "review:approve",
      "activity:view",
    ],
  },
  CLINICAL_STAFF: {
    code: "CLINICAL_STAFF",
    name: "Clinical Staff / Health Worker",
    shortLabel: "Clinical Staff",
    description: "Patient intake, vital signs registration, and guided history capture.",
    permissions: [
      "patients:create",
      "patients:view",
      "cases:create",
      "cases:view",
    ],
  },
  ADMINISTRATOR: {
    code: "ADMINISTRATOR",
    name: "Hospital Administrator",
    shortLabel: "Administrator",
    description: "Staff user directory management, audit trail inspection, and facility settings.",
    permissions: [
      "admin:users",
      "activity:view",
      "settings:configure",
    ],
  },
  PATIENT: {
    code: "PATIENT",
    name: "Patient / Care Recipient",
    shortLabel: "Patient",
    description: "Access personal health records, approved visit summaries, and demographic profile.",
    permissions: [
      "patient:records:view",
      "patient:profile:view",
    ],
  },
};

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: RoleType;
  roleName: string;
  permissions: Permission[];
  specialty?: string;
  licenseNumber?: string;
  department?: string;
  patientId?: string; // Associated patient profile ID (e.g. pat-101)
  sessionId: string;
  isDemo: boolean;
  facilityCode: string;
  expiresAt: number; // Unix timestamp in seconds
}

export interface DemoAccountInfo {
  email: string;
  name: string;
  role: RoleType;
  roleName: string;
  department: string;
  licenseNumber: string;
  description: string;
  samplePassword: string;
}

export const DEMO_ACCOUNTS: Record<RoleType, DemoAccountInfo> = {
  DOCTOR: {
    email: "doctor@arogya.gov.in",
    name: "Dr. Priya Sharma, MD",
    role: "DOCTOR",
    roleName: "Attending Physician",
    department: "General Medicine",
    licenseNumber: "AIIMS-DOC-0412",
    description: "Reviews AI intake, verifies clinical notes, and approves final case records.",
    samplePassword: "Doctor@Arogya2026",
  },
  CLINICAL_STAFF: {
    email: "staff@arogya.gov.in",
    name: "Sister Anjali Rao, RN",
    role: "CLINICAL_STAFF",
    roleName: "Clinical Nurse Specialist",
    department: "OPD Triage & Intake",
    licenseNumber: "DEL-NUR-9921",
    description: "Conducts 10-section history capture, vitals recording, and patient intake.",
    samplePassword: "Staff@Arogya2026",
  },
  ADMINISTRATOR: {
    email: "admin@arogya.gov.in",
    name: "Vikram Malhotra",
    role: "ADMINISTRATOR",
    roleName: "Hospital Administrator",
    department: "Clinical IT & Governance",
    licenseNumber: "ADM-AIIMS-008",
    description: "Manages users, views statutory audit trails, and configures facility settings.",
    samplePassword: "Admin@Arogya2026",
  },
  PATIENT: {
    email: "patient@arogya.gov.in",
    name: "Rajesh Gupta",
    role: "PATIENT",
    roleName: "Verified Patient",
    department: "General OPD",
    licenseNumber: "AIIMS-2026-0941",
    description: "Access personal health records, clinical visit summaries, and demographic profile.",
    samplePassword: "Patient@Arogya2026",
  },
};

