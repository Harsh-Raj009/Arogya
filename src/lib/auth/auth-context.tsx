"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { SessionUser, RoleType, Permission } from "./types";

interface AuthContextType {
  user: SessionUser | null;
  role: RoleType | null;
  isDemo: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<{ success: boolean; user?: SessionUser; error?: string }>;
  logout: () => Promise<void>;
  hasRole: (roles: RoleType | RoleType[]) => boolean;
  hasPermission: (permission: Permission) => boolean;
  refreshSession: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  initialUser = null,
}: {
  children: React.ReactNode;
  initialUser?: SessionUser | null;
}) {
  const router = useRouter();
  const [user, setUser] = React.useState<SessionUser | null>(initialUser);
  const [isLoading, setIsLoading] = React.useState(!initialUser);

  const refreshSession = React.useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", {
        headers: { "Cache-Control": "no-cache" },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (!initialUser) {
      refreshSession();
    }
  }, [initialUser, refreshSession]);

  const login = React.useCallback(
    async (credentials: { email: string; password: string }) => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setUser(data.user);
          return { success: true, user: data.user };
        } else {
          return { success: false, error: data.error || "Authentication failed." };
        }
      } catch {
        return {
          success: false,
          error: "Unable to reach authentication service. Check connectivity.",
        };
      }
    },
    []
  );

  const logout = React.useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      console.error("Logout request error:", e);
    } finally {
      setUser(null);
      router.push("/login");
      router.refresh();
    }
  }, [router]);

  const hasRole = React.useCallback(
    (roles: RoleType | RoleType[]): boolean => {
      if (!user) return false;
      const roleArray = Array.isArray(roles) ? roles : [roles];
      return roleArray.includes(user.role);
    },
    [user]
  );

  const hasPermission = React.useCallback(
    (permission: Permission): boolean => {
      if (!user) return false;
      return user.permissions.includes(permission);
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isDemo: Boolean(user?.isDemo),
        isLoading,
        isAuthenticated: Boolean(user),
        login,
        logout,
        hasRole,
        hasPermission,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

