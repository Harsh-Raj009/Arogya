import crypto from "crypto";
import { prisma } from "@/lib/db/prisma";
import {
  RoleType,
  SessionUser,
  DEMO_ACCOUNTS,
  ROLE_DEFINITIONS,
  DemoAccountInfo,
} from "./types";

export function isDemoMode(): boolean {
  return process.env.DEMO_MODE === "true";
}

/**
 * Secure password hashing using standard PBKDF2 (SHA-512)
 */
export function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const actualSalt = salt || crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, actualSalt, 100000, 64, "sha512")
    .toString("hex");
  return { hash: `${actualSalt}:${hash}`, salt: actualSalt };
}

export function verifyPassword(password: string, storedHash: string): boolean {
  if (!storedHash) return false;
  const parts = storedHash.split(":");
  if (parts.length !== 2) return false;
  const [salt, originalHash] = parts;
  const testHash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
  return crypto.timingSafeEqual(Buffer.from(testHash), Buffer.from(originalHash));
}

// In-memory session tracking for active demo sessions (with audit fields)
interface StoredSession {
  id: string;
  sessionToken: string;
  userId: string;
  role: RoleType;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
  lastActiveAt: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}

const demoSessionsStore = new Map<string, StoredSession>();

export interface AuthenticateResult {
  success: boolean;
  user?: SessionUser;
  error?: string;
  isDemo: boolean;
}

/**
 * Main authentication entrypoint with explicit DEMO_MODE handling
 */
export async function authenticateCredentials(
  email: string,
  password: string,
  clientContext?: { ipAddress?: string; userAgent?: string }
): Promise<AuthenticateResult> {
  const demoActive = isDemoMode();

  // 1. Explicit DEMO_MODE: Authenticate against cleanly seeded local demo accounts
  if (demoActive) {
    const lowerEmail = email.trim().toLowerCase();

    let matchedDemo: DemoAccountInfo | null = null;
    for (const roleKey of Object.keys(DEMO_ACCOUNTS) as RoleType[]) {
      const demo = DEMO_ACCOUNTS[roleKey];
      if (demo.email.toLowerCase() === lowerEmail) {
        matchedDemo = demo;
        break;
      }
    }

    if (!matchedDemo) {
      return {
        success: false,
        error: "Invalid clinical credentials. In Demo Mode, use one of the seeded accounts.",
        isDemo: true,
      };
    }

    // Allow the specific demo account password or the standard local evaluation password
    const validDemoPasswords = [
      matchedDemo.samplePassword,
      "Arogya@2026",
      "password",
      "admin",
    ];

    const passwordMatches =
      validDemoPasswords.includes(password) ||
      password === matchedDemo.samplePassword.toLowerCase();

    if (!passwordMatches) {
      return {
        success: false,
        error: "Invalid password for this demo account.",
        isDemo: true,
      };
    }

    const sessionId = `demo_sess_${crypto.randomUUID()}`;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 8 * 60 * 60 * 1000);

    const roleDef = ROLE_DEFINITIONS[matchedDemo.role];

    // Persist to demo session store
    demoSessionsStore.set(sessionId, {
      id: sessionId,
      sessionToken: sessionId,
      userId: `usr_demo_${matchedDemo.role.toLowerCase()}`,
      role: matchedDemo.role,
      expiresAt,
      ipAddress: clientContext?.ipAddress,
      userAgent: clientContext?.userAgent,
      lastActiveAt: now,
      createdAt: now,
      updatedAt: now,
      createdBy: "DEMO_MODE_AUTHENTICATOR",
      updatedBy: "DEMO_MODE_AUTHENTICATOR",
    });

    const isPatient = matchedDemo.role === "PATIENT";
    const patientId = isPatient ? "pat-101" : undefined;

    const sessionUser: SessionUser = {
      id: `usr_demo_${matchedDemo.role.toLowerCase()}`,
      email: matchedDemo.email,
      name: matchedDemo.name,
      role: matchedDemo.role,
      roleName: matchedDemo.roleName,
      permissions: roleDef.permissions,
      department: matchedDemo.department,
      licenseNumber: matchedDemo.licenseNumber,
      patientId,
      sessionId,
      isDemo: true,
      facilityCode: process.env.NEXT_PUBLIC_FACILITY_CODE || "AROGYA-OPD-104",
      expiresAt: Math.floor(expiresAt.getTime() / 1000),
    };

    return {
      success: true,
      user: sessionUser,
      isDemo: true,
    };
  }

  // 2. Production Mode (DEMO_MODE=false): PostgreSQL is MANDATORY.
  // Never silently fall back to demo authentication.
  try {
    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
      include: { role: true },
    });

    if (!user) {
      return {
        success: false,
        error: "Invalid institutional credentials or user record does not exist.",
        isDemo: false,
      };
    }

    if (!user.isActive) {
      return {
        success: false,
        error: "Clinical account is deactivated. Contact hospital administration.",
        isDemo: false,
      };
    }

    const isPasswordValid = verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return {
        success: false,
        error: "Invalid password.",
        isDemo: false,
      };
    }

    const sessionToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000);

    const session = await prisma.session.create({
      data: {
        sessionToken,
        userId: user.id,
        expiresAt,
        ipAddress: clientContext?.ipAddress,
        userAgent: clientContext?.userAgent,
        createdBy: user.id,
        updatedBy: user.id,
      },
    });

    // Record audit event for login
    await prisma.auditTrail.create({
      data: {
        actorId: user.id,
        action: "STAFF_LOGIN",
        details: {
          role: user.role.code,
          facilityCode: process.env.NEXT_PUBLIC_FACILITY_CODE || "AROGYA-OPD-104",
        },
        ipAddress: clientContext?.ipAddress,
        createdBy: user.id,
      },
    });

    const parsedPermissions = Array.isArray(user.role.permissions)
      ? (user.role.permissions as SessionUser["permissions"])
      : ROLE_DEFINITIONS[user.role.code]?.permissions || [];

    const sessionUser: SessionUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role.code,
      roleName: user.role.name,
      permissions: parsedPermissions,
      specialty: user.specialty || undefined,
      licenseNumber: user.licenseNumber || undefined,
      department: user.department || undefined,
      patientId: user.patientProfileId || undefined,
      sessionId: session.id,
      isDemo: false,
      facilityCode: process.env.NEXT_PUBLIC_FACILITY_CODE || "AROGYA-OPD-104",
      expiresAt: Math.floor(expiresAt.getTime() / 1000),
    };

    return {
      success: true,
      user: sessionUser,
      isDemo: false,
    };
  } catch (error) {
    console.error("[Auth Repository] PostgreSQL Connection Failure:", error);
    // Explicitly surface database connectivity failure - do NOT fallback to demo
    return {
      success: false,
      error:
        "Database connectivity error: PostgreSQL is unreachable and DEMO_MODE is disabled. Verify database configuration.",
      isDemo: false,
    };
  }
}

/**
 * Invalidate a session (Logout)
 */
export async function invalidateSession(sessionId: string): Promise<void> {
  if (isDemoMode()) {
    demoSessionsStore.delete(sessionId);
    return;
  }

  try {
    await prisma.session.deleteMany({
      where: {
        OR: [{ id: sessionId }, { sessionToken: sessionId }],
      },
    });
  } catch (error) {
    console.error("[Auth Repository] Error deleting session in DB:", error);
  }
}

/**
 * List all users for Administrator console
 */
export async function listAllUsers(adminUserId: string) {
  if (isDemoMode()) {
    return [
      {
        id: "usr_demo_doctor",
        email: DEMO_ACCOUNTS.DOCTOR.email,
        name: DEMO_ACCOUNTS.DOCTOR.name,
        role: "DOCTOR" as RoleType,
        roleName: DEMO_ACCOUNTS.DOCTOR.roleName,
        department: DEMO_ACCOUNTS.DOCTOR.department,
        licenseNumber: DEMO_ACCOUNTS.DOCTOR.licenseNumber,
        isActive: true,
        createdAt: "2026-01-10T08:00:00.000Z",
        lastActiveAt: "Just now",
      },
      {
        id: "usr_demo_clinical_staff",
        email: DEMO_ACCOUNTS.CLINICAL_STAFF.email,
        name: DEMO_ACCOUNTS.CLINICAL_STAFF.name,
        role: "CLINICAL_STAFF" as RoleType,
        roleName: DEMO_ACCOUNTS.CLINICAL_STAFF.roleName,
        department: DEMO_ACCOUNTS.CLINICAL_STAFF.department,
        licenseNumber: DEMO_ACCOUNTS.CLINICAL_STAFF.licenseNumber,
        isActive: true,
        createdAt: "2026-01-15T08:00:00.000Z",
        lastActiveAt: "10 mins ago",
      },
      {
        id: "usr_demo_administrator",
        email: DEMO_ACCOUNTS.ADMINISTRATOR.email,
        name: DEMO_ACCOUNTS.ADMINISTRATOR.name,
        role: "ADMINISTRATOR" as RoleType,
        roleName: DEMO_ACCOUNTS.ADMINISTRATOR.roleName,
        department: DEMO_ACCOUNTS.ADMINISTRATOR.department,
        licenseNumber: DEMO_ACCOUNTS.ADMINISTRATOR.licenseNumber,
        isActive: true,
        createdAt: "2026-01-01T08:00:00.000Z",
        lastActiveAt: "Online",
      },
    ];
  }

  const users = await prisma.user.findMany({
    include: { role: true },
    orderBy: { createdAt: "desc" },
  });

  return users.map((u) => ({
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role.code,
    roleName: u.role.name,
    department: u.department || "General",
    licenseNumber: u.licenseNumber || "N/A",
    isActive: u.isActive,
    createdAt: u.createdAt.toISOString(),
    lastActiveAt: u.updatedAt.toISOString(),
  }));
}

