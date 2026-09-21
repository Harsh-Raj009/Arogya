import { NextResponse } from "next/server";
import { authorizeApiRequest } from "@/lib/auth/server";

export async function POST(request: Request) {
  // Enforce server-side authorization check strictly: DOCTOR ONLY
  const auth = await authorizeApiRequest({
    allowedRoles: ["DOCTOR"],
    requiredPermission: "review:approve",
  });

  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const body = await request.json();
    const { caseId, approvalNotes } = body;

    if (!caseId) {
      return NextResponse.json(
        { error: "caseId is required for clinical approval." },
        { status: 400 }
      );
    }

    const approvedAt = new Date().toISOString();

    // Clinician approval event record (strictly non-regulatory, verified clinical review)
    const approvalRecord = {
      caseId,
      status: "Clinician Approved",
      isApproved: true,
      approvedAt,
      approvedById: auth.user.id,
      approverName: auth.user.name,
      approverLicenseNumber: auth.user.licenseNumber || "UNREGISTERED",
      approverDepartment: auth.user.department || "General Medicine",
      approvalNotes: approvalNotes || "Clinical review verified against history and vitals.",
      auditEvent: {
        action: "CLINICIAN_APPROVED",
        timestamp: approvedAt,
        actorId: auth.user.id,
        actorRole: auth.user.role,
        immutable: true,
      },
    };

    return NextResponse.json({
      success: true,
      message: "Case record successfully approved by attending clinician.",
      data: approvalRecord,
    });
  } catch (error) {
    console.error("[Review Approve API] Error:", error);
    return NextResponse.json(
      { error: "Failed to complete clinical approval." },
      { status: 500 }
    );
  }
}

