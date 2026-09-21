import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { invalidateSession } from "@/lib/auth/repository";
import { SESSION_COOKIE_NAME } from "@/lib/auth/jwt";

export async function POST() {
  try {
    const user = await getCurrentUser();

    if (user?.sessionId) {
      await invalidateSession(user.sessionId);
    }

    const response = NextResponse.json({
      success: true,
      message: "Session terminated successfully.",
    });

    // Clear session cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.error("[Logout API] Error:", error);
    return NextResponse.json(
      { error: "Error during session invalidation." },
      { status: 500 }
    );
  }
}

