import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { isDemoMode } from "@/lib/auth/repository";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          authenticated: false,
          user: null,
          isDemoMode: isDemoMode(),
        },
        { status: 401 }
      );
    }

    const nowSeconds = Math.floor(Date.now() / 1000);
    const secondsRemaining = Math.max(0, user.expiresAt - nowSeconds);

    return NextResponse.json({
      authenticated: true,
      user,
      isDemoMode: isDemoMode(),
      sessionSecondsRemaining: secondsRemaining,
    });
  } catch (error) {
    console.error("[Me API] Error:", error);
    return NextResponse.json(
      { error: "Error retrieving session state." },
      { status: 500 }
    );
  }
}

