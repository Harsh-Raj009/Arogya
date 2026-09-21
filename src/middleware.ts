import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionJwt, SESSION_COOKIE_NAME } from "@/lib/auth/jwt";

// Public paths that do not require an active session
const PUBLIC_PATHS = ["/login", "/unauthorized", "/api/auth/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip static assets, favicon, and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes(".") // file requests like .ico, .svg, .png
  ) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const user = sessionCookie ? await verifySessionJwt(sessionCookie) : null;

  const isPublicPath =
    pathname === "/" ||
    PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
  const isApiRoute = pathname.startsWith("/api/");

  // 2. Handle expired or invalid token when cookie was present
  if (sessionCookie && !user) {
    const response = isApiRoute
      ? NextResponse.json(
          {
            error: "UNAUTHORIZED",
            message: "Clinical session has expired. Please authenticate again.",
          },
          { status: 401 }
        )
      : NextResponse.redirect(new URL("/login?expired=true", request.url));

    response.cookies.delete(SESSION_COOKIE_NAME);
    return response;
  }

  // 3. Unauthenticated requests
  if (!user) {
    if (isPublicPath) {
      return NextResponse.next();
    }

    if (isApiRoute) {
      return NextResponse.json(
        {
          error: "UNAUTHORIZED",
          message: "Authentication required to access clinical resources.",
        },
        { status: 401 }
      );
    }

    // Redirect to login preserving original intended destination
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 4. Authenticated user visiting /login -> redirect to appropriate dashboard
  if (pathname === "/login") {
    const target = user.role === "PATIENT" ? "/patient/dashboard" : "/dashboard";
    return NextResponse.redirect(new URL(target, request.url));
  }

  // 5. Role-Based Route Guards (Server-Side Enforcement)

  // Patient Portal routes: PATIENT ONLY
  if (pathname.startsWith("/patient") || pathname.startsWith("/api/patient")) {
    if (user.role !== "PATIENT") {
      if (isApiRoute) {
        return NextResponse.json(
          {
            error: "FORBIDDEN",
            message: "Patient portal is restricted to registered patients.",
            role: user.role,
          },
          { status: 403 }
        );
      }
      return NextResponse.redirect(
        new URL(
          `/unauthorized?required=Patient&reason=${encodeURIComponent(
            "Access to patient personal records portal is restricted to registered patients."
          )}`,
          request.url
        )
      );
    }
  }

  // Patient role blocked from all clinical workstation routes
  if (user.role === "PATIENT") {
    if (
      pathname === "/dashboard" ||
      pathname.startsWith("/cases") ||
      pathname.startsWith("/patients") ||
      pathname.startsWith("/review") ||
      pathname === "/activity" ||
      pathname === "/settings" ||
      pathname.startsWith("/admin")
    ) {
      if (isApiRoute) {
        return NextResponse.json(
          {
            error: "FORBIDDEN",
            message: "Clinical workstation routes are restricted to healthcare staff.",
            role: user.role,
          },
          { status: 403 }
        );
      }
      return NextResponse.redirect(
        new URL(
          `/unauthorized?required=Clinical+Staff+or+Doctor&reason=${encodeURIComponent(
            "Access to clinical workstation modules is restricted to healthcare staff and doctors."
          )}`,
          request.url
        )
      );
    }
  }

  // Doctor Review Queue and Console: DOCTOR ONLY
  if (pathname.startsWith("/review")) {
    if (user.role !== "DOCTOR") {
      if (isApiRoute) {
        return NextResponse.json(
          {
            error: "FORBIDDEN",
            message: "Only attending doctors may access clinical review and verification.",
            role: user.role,
          },
          { status: 403 }
        );
      }
      return NextResponse.redirect(
        new URL(
          `/unauthorized?required=Doctor&reason=${encodeURIComponent(
            "Access to clinical review and verification console is restricted to Attending Doctors."
          )}`,
          request.url
        )
      );
    }
  }

  // User Management & Admin Routes: ADMINISTRATOR ONLY
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    if (user.role !== "ADMINISTRATOR") {
      if (isApiRoute) {
        return NextResponse.json(
          {
            error: "FORBIDDEN",
            message: "Administrative privileges required.",
            role: user.role,
          },
          { status: 403 }
        );
      }
      return NextResponse.redirect(
        new URL(
          `/unauthorized?required=Administrator&reason=${encodeURIComponent(
            "User management and institutional administration is restricted to Hospital Administrators."
          )}`,
          request.url
        )
      );
    }
  }

  // Case Intake: CLINICAL_STAFF or DOCTOR ONLY (Administrator blocked from direct clinical intake)
  if (pathname === "/cases/new") {
    if (user.role === "ADMINISTRATOR") {
      return NextResponse.redirect(
        new URL(
          `/unauthorized?required=Clinical+Staff+or+Doctor&reason=${encodeURIComponent(
            "Direct patient case intake is reserved for clinical staff and doctors. Administrative roles cannot initiate patient records."
          )}`,
          request.url
        )
      );
    }
  }

  // Audit Activity Trail: ADMINISTRATOR or DOCTOR ONLY (Clinical Staff blocked)
  if (pathname === "/activity") {
    if (user.role === "CLINICAL_STAFF") {
      return NextResponse.redirect(
        new URL(
          `/unauthorized?required=Doctor+or+Administrator&reason=${encodeURIComponent(
            "Institutional audit trail inspection is restricted to Doctors and Administrators."
          )}`,
          request.url
        )
      );
    }
  }

  // Facility Settings: ADMINISTRATOR or DOCTOR ONLY (Clinical Staff blocked)
  if (pathname === "/settings") {
    if (user.role === "CLINICAL_STAFF") {
      return NextResponse.redirect(
        new URL(
          `/unauthorized?required=Doctor+or+Administrator&reason=${encodeURIComponent(
            "Facility settings configuration is restricted to Administrators and Doctors."
          )}`,
          request.url
        )
      );
    }
  }

  // Pass-through with active session verified
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

