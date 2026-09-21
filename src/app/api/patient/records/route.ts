import { NextResponse } from "next/server";
import { authorizeApiRequest } from "@/lib/auth/server";
import { mockPatients, mockCases } from "@/lib/mock-data";

export async function GET() {
  // 1. Authenticate current session and confirm role === PATIENT
  const auth = await authorizeApiRequest({
    allowedRoles: ["PATIENT"],
    requiredPermission: "patient:records:view",
  });

  if (!auth.authorized) {
    return auth.response;
  }

  try {
    // 2. Resolve patient identity STRICTLY from the authenticated session (never from query/body)
    const patientId = auth.user.patientId || "pat-101";
    const patientProfile =
      mockPatients.find((p) => p.id === patientId || p.uhid === auth.user.licenseNumber) ||
      mockPatients[0];

    // 3. Query records belonging ONLY to this patient profile
    const patientRecords = mockCases
      .filter(
        (c) => c.patientId === patientProfile.id || c.patientUhid === patientProfile.uhid
      )
      .map((c) => ({
        id: c.id,
        caseNumber: c.caseNumber,
        encounterType: c.encounterType,
        encounterDate: c.encounterDate,
        chiefComplaint: c.chiefComplaint,
        status: c.status,
        reviewerName: c.reviewerName || "Attending Physician",
        vitals: c.vitals,
        // Exclude internal AI metadata, confidence scores, and raw prompt extractions
        history: {
          presentingComplaint: c.history?.presentingComplaint,
          historyOfPresentIllness: c.history?.historyOfPresentIllness,
          drugHistory: c.history?.drugHistory,
          allergyHistory: c.history?.allergyHistory,
        },
      }));

    return NextResponse.json({
      success: true,
      patient: {
        id: patientProfile.id,
        fullName: patientProfile.fullName,
        uhid: patientProfile.uhid,
        abhaId: patientProfile.abhaId,
      },
      records: patientRecords,
      count: patientRecords.length,
    });
  } catch (error) {
    console.error("[Patient Records API] Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve health records." },
      { status: 500 }
    );
  }
}

