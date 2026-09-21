import { NextResponse } from "next/server";
import { authorizeApiRequest } from "@/lib/auth/server";
import { listAllUsers } from "@/lib/auth/repository";

export async function GET() {
  // Enforce server-side authorization check strictly
  const auth = await authorizeApiRequest({
    allowedRoles: ["ADMINISTRATOR"],
    requiredPermission: "admin:users",
  });

  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const users = await listAllUsers(auth.user.id);
    return NextResponse.json({
      success: true,
      users,
      count: users.length,
      requestedBy: {
        id: auth.user.id,
        name: auth.user.name,
        role: auth.user.role,
      },
    });
  } catch (error) {
    console.error("[Admin Users API] Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve user registry." },
      { status: 500 }
    );
  }
}

