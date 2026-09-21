import { NextResponse } from "next/server";
import { authorizeApiRequest } from "@/lib/auth/server";
import { defaultMedicineProvider } from "@/lib/medicine/provider";
import { defaultExplanationProvider } from "@/lib/medicine/explanation-service";

export async function POST(request: Request) {
  // 1. Verify authenticated session and enforce PATIENT role
  const auth = await authorizeApiRequest({
    allowedRoles: ["PATIENT"],
  });

  if (!auth.authorized) {
    return auth.response;
  }

  try {
    // 2. Parse request payload
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "BAD_REQUEST", message: "Malformed request payload. JSON required." },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "BAD_REQUEST", message: "Invalid request body." },
        { status: 400 }
      );
    }

    const { medicineName } = body as { medicineName?: unknown };

    // 3. Server-side validation of medicineName
    if (typeof medicineName !== "string") {
      return NextResponse.json(
        { error: "BAD_REQUEST", message: "Medicine name must be a string." },
        { status: 400 }
      );
    }

    const normalizedName = medicineName.trim();

    if (!normalizedName) {
      return NextResponse.json(
        { error: "BAD_REQUEST", message: "Medicine name cannot be empty." },
        { status: 400 }
      );
    }

    if (normalizedName.length > 100) {
      return NextResponse.json(
        {
          error: "BAD_REQUEST",
          message: "Medicine name is too long. Please enter a valid name (maximum 100 characters).",
        },
        { status: 400 }
      );
    }

    // 4. Query the trusted medicine knowledge base (Strict prioritized matching, no LLM hallucination)
    const record = await defaultMedicineProvider.findMedicine(normalizedName);

    if (!record) {
      return NextResponse.json({
        success: true,
        found: false,
        searchedQuery: normalizedName,
        message:
          "Medicine information is not available in the current assistant database. Please check the spelling or consult a doctor/pharmacist for reliable information.",
      });
    }

    // 5. Pass verified reference record to the AI explanation layer
    const explanation = await defaultExplanationProvider.explainMedicine(record);

    return NextResponse.json({
      success: true,
      found: true,
      searchedQuery: normalizedName,
      data: explanation,
    });
  } catch (error) {
    console.error("[Medicine Assistant API] Error processing query:", error);
    return NextResponse.json(
      {
        error: "INTERNAL_ERROR",
        message: "Unable to retrieve medicine information right now. Please try again.",
      },
      { status: 500 }
    );
  }
}
