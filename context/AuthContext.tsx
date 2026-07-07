"use client";

// ─── Auth state via React Context ──────────────────────────────────────────────
// Mock auth backed by localStorage — there is no real backend yet. `login`/
// `signup` both just persist a user record and mark the session active; swap
// their bodies for real API calls once a backend exists.

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  clearCurrentUser,
  createMockUser,
  getCurrentUser,
  getUserProfile,
  saveCurrentUser,
  saveUserProfile,
} from "@/lib/app-store";
import type { AuthUser, UserProfile } from "@/lib/domain";

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string) => void;
  signup: (email: string, name?: string) => void;
  updateProfile: (profile: UserProfile) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore the session from localStorage on first mount (client-only).
  useEffect(() => {
    setUser(getCurrentUser());
    setLoading(false);
  }, []);

  function persistUser(nextUser: AuthUser) {
    setUser(nextUser);
    saveCurrentUser(nextUser);
  }

  function login(email: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const profile = getUserProfile();
    persistUser(createMockUser(normalizedEmail, profile?.email === normalizedEmail ? profile.name : undefined));
  }

  function signup(email: string, name?: string) {
    persistUser(createMockUser(email, name));
  }

  function updateProfile(profile: UserProfile) {
    saveUserProfile(profile);
    setUser(getCurrentUser());
  }

  function logout() {
    setUser(null);
    clearCurrentUser();
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
