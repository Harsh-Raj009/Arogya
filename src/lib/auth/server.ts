import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { verifySessionJwt, SESSION_COOKIE_NAME } from "./jwt";
import { RoleType, Permission, SessionUser } from "./types";

/**
 * Reads and verifies the current session from Next.js cookies
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (!sessionCookie?.value) {
    return null;
  }

  const user = await verifySessionJwt(sessionCookie.value);
  return user;
}

/**
 * Server Component guard: requires authentication, redirects to /login if absent
 */
export async function requireAuth(returnUrl?: string): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) {
    const redirectParam = returnUrl ? `?redirect=${encodeURIComponent(returnUrl)}` : "";
    redirect(`/login${redirectParam}`);
  }
  return user;
}

/**
 * Server Component guard: requires one of the specified roles, redirects to /unauthorized if unauthorized
 */
export async function requireRole(
  allowedRoles: RoleType[],
  contextMessage?: string
): Promise<SessionUser> {
  const user = await requireAuth();

  if (!allowedRoles.includes(user.role)) {
    const reasonParam = contextMessage
      ? `?reason=${encodeURIComponent(contextMessage)}&required=${encodeURIComponent(allowedRoles.join(", "))}`
      : `?required=${encodeURIComponent(allowedRoles.join(", "))}`;
    redirect(`/unauthorized${reasonParam}`);
  }

  return user;
}

/**
 * Server Component guard: requires specific granular permission
 */
export async function requirePermission(
  permission: Permission,
  contextMessage?: string
): Promise<SessionUser> {
  const user = await requireAuth();

  if (!user.permissions.includes(permission)) {
    const reasonParam = `?required=${encodeURIComponent(permission)}${
      contextMessage ? `&reason=${encodeURIComponent(contextMessage)}` : ""
    }`;
    redirect(`/unauthorized${reasonParam}`);
  }

  return user;
}

/**
 * API Route Handler Guard: returns 401 or 403 Response or the verified user
 */
export async function authorizeApiRequest(options?: {
  allowedRoles?: RoleType[];
  requiredPermission?: Permission;
}): Promise<
  | { authorized: true; user: SessionUser }
  | { authorized: false; response: NextResponse }
> {
  const user = await getCurrentUser();

  if (!user) {
    return {
      authorized: false,
      response: NextResponse.json(
        {
          error: "UNAUTHORIZED",
          message: "Institutional authentication required. Session missing or expired.",
        },
        { status: 401 }
      ),
    };
  }

  if (options?.allowedRoles && !options.allowedRoles.includes(user.role)) {
    return {
      authorized: false,
      response: NextResponse.json(
        {
          error: "FORBIDDEN",
          message: `Access denied. Clinical role '${user.role}' lacks required role authority: [${options.allowedRoles.join(
            ", "
          )}].`,
          userRole: user.role,
          requiredRoles: options.allowedRoles,
        },
        { status: 403 }
      ),
    };
  }

  if (
    options?.requiredPermission &&
    !user.permissions.includes(options.requiredPermission)
  ) {
    return {
      authorized: false,
      response: NextResponse.json(
        {
          error: "FORBIDDEN",
          message: `Access denied. Clinical role '${user.role}' lacks required permission: '${options.requiredPermission}'.`,
          userRole: user.role,
          requiredPermission: options.requiredPermission,
        },
        { status: 403 }
      ),
    };
  }

  return { authorized: true, user };
}

