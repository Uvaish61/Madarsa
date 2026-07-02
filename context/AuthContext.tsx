"use client";

// ─── Auth state via React Context ──────────────────────────────────────────────
// Mock auth backed by localStorage — there is no real backend yet. `login`/
// `signup` both just persist a user record and mark the session active; swap
// their bodies for real API calls once a backend exists.

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type AuthUser = { email: string };

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string) => void;
  signup: (email: string) => void;
  logout: () => void;
};

const USER_KEY = "madarsa_user";

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore the session from localStorage on first mount (client-only).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(USER_KEY);
      if (raw) setUser(JSON.parse(raw) as AuthUser);
    } catch {
      window.localStorage.removeItem(USER_KEY);
    }
    setLoading(false);
  }, []);

  function persistUser(nextUser: AuthUser) {
    setUser(nextUser);
    window.localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
  }

  function login(email: string) {
    persistUser({ email });
  }

  function signup(email: string) {
    persistUser({ email });
  }

  function logout() {
    setUser(null);
    window.localStorage.removeItem(USER_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
