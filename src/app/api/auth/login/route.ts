import { NextResponse } from "next/server";
import { authenticateCredentials } from "@/lib/auth/repository";
import { createSessionJwt, SESSION_COOKIE_NAME, DEFAULT_EXPIRATION_SECONDS } from "@/lib/auth/jwt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const ipAddress =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "Browser";

    const authResult = await authenticateCredentials(email, password, {
      ipAddress,
      userAgent,
    });

    if (!authResult.success || !authResult.user) {
      return NextResponse.json(
        {
          error: authResult.error || "Authentication failed.",
          isDemo: authResult.isDemo,
        },
        { status: 401 }
      );
    }

    const token = await createSessionJwt(authResult.user);

    const response = NextResponse.json({
      success: true,
      user: authResult.user,
      isDemo: authResult.isDemo,
    });

    // Set secure session cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: DEFAULT_EXPIRATION_SECONDS,
    });

    return response;
  } catch (error) {
    console.error("[Login API] Error:", error);
    return NextResponse.json(
      { error: "Internal server error during authentication." },
      { status: 500 }
    );
  }
}

