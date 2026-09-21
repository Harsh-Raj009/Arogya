import { SignJWT, jwtVerify } from "jose";
import { SessionUser } from "./types";

const SESSION_COOKIE_NAME = "arogya_session";
const DEFAULT_EXPIRATION_SECONDS = 8 * 60 * 60; // 8 hours (clinical shift)

function getJwtSecret(): Uint8Array {
  const secret =
    process.env.JWT_SECRET ||
    process.env.SESSION_SECRET ||
    process.env.NEXTAUTH_SECRET;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "FATAL: JWT_SECRET (or SESSION_SECRET) environment variable is required in production."
      );
    }
    return new TextEncoder().encode(
      "arogya_clinical_session_secret_key_2026_sih26047_secure_random_key_min32bytes"
    );
  }
  return new TextEncoder().encode(secret);
}

export { SESSION_COOKIE_NAME, DEFAULT_EXPIRATION_SECONDS };

export async function createSessionJwt(user: SessionUser): Promise<string> {
  const secretKey = getJwtSecret();
  const token = await new SignJWT({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    roleName: user.roleName,
    permissions: user.permissions,
    specialty: user.specialty,
    licenseNumber: user.licenseNumber,
    department: user.department,
    patientId: user.patientId,
    sessionId: user.sessionId,
    isDemo: user.isDemo,
    facilityCode: user.facilityCode,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(`${DEFAULT_EXPIRATION_SECONDS}s`)
    .sign(secretKey);

  return token;
}

export async function verifySessionJwt(token: string): Promise<SessionUser | null> {
  try {
    const secretKey = getJwtSecret();
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ["HS256"],
    });

    if (
      !payload.userId ||
      !payload.email ||
      !payload.role ||
      !payload.exp
    ) {
      return null;
    }

    return {
      id: payload.userId as string,
      email: payload.email as string,
      name: (payload.name as string) || "Clinical User",
      role: payload.role as SessionUser["role"],
      roleName: (payload.roleName as string) || "Staff",
      permissions: (payload.permissions as SessionUser["permissions"]) || [],
      specialty: payload.specialty as string | undefined,
      licenseNumber: payload.licenseNumber as string | undefined,
      department: payload.department as string | undefined,
      patientId: payload.patientId as string | undefined,
      sessionId: (payload.sessionId as string) || "sess-default",
      isDemo: Boolean(payload.isDemo),
      facilityCode: (payload.facilityCode as string) || process.env.NEXT_PUBLIC_FACILITY_CODE || "AROGYA-OPD-104",
      expiresAt: Number(payload.exp),
    };
  } catch {
    // Tampered, malformed, or expired token
    return null;
  }
}

