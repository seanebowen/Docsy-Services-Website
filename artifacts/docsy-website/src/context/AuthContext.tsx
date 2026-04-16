import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  type AccountIdMeRecord,
  attachIdMeToAccount,
  clearPendingIdMeVerification,
  getPendingIdMeVerification,
} from "@/lib/idme";

export interface AuthUser {
  id:               string;
  name:             string;
  email:            string;
  phone:            string;
  membership:       "starter" | "pro" | "elite" | null;
  idMeVerification?: AccountIdMeRecord | null;
}

interface AuthContextValue {
  user:       AuthUser | null;
  token:      string | null;
  signIn:     (token: string, user: AuthUser) => void;
  signOut:    () => void;
  updateUser: (user: AuthUser) => void;
}

const AuthContext = createContext<AuthContextValue>({
  user:       null,
  token:      null,
  signIn:     () => {},
  signOut:    () => {},
  updateUser: () => {},
});

const STORAGE_KEY_TOKEN = "docsy_auth_token";
const STORAGE_KEY_USER  = "docsy_auth_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    try { return localStorage.getItem(STORAGE_KEY_TOKEN); } catch { return null; }
  });

  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_USER);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });

  const signIn = useCallback((newToken: string, newUser: AuthUser) => {
    localStorage.setItem(STORAGE_KEY_TOKEN, newToken);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_USER);
    setToken(null);
    setUser(null);
  }, []);

  const updateUser = useCallback((nextUser: AuthUser) => {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(nextUser));
    setUser(nextUser);
  }, []);

  /* ── Refresh signed-in user from the server on mount / token change.
        Ensures HonorPass (and any other account-scoped state) picks up
        changes made on other devices. */
  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => {
        if (cancelled) return;
        if (data?.ok && data.user) {
          updateUser(data.user as AuthUser);
        } else if (data && data.ok === false) {
          /* Session is no longer valid — clear it so the UI reflects signed-out state. */
          signOut();
        }
      })
      .catch(() => { /* non-blocking */ });
    return () => { cancelled = true; };
  }, [token, updateUser, signOut]);

  /* ── Migrate any pending local HonorPass up to the signed-in account.
        Runs whenever the session and account state change. */
  useEffect(() => {
    if (!token || !user) return;

    if (user.idMeVerification) {
      /* Account already has a verification — clear any stale local copy. */
      clearPendingIdMeVerification();
      return;
    }

    const pending = getPendingIdMeVerification();
    if (!pending) return;

    let cancelled = false;
    attachIdMeToAccount(token, pending.group).then(record => {
      if (cancelled || !record) return;
      updateUser({ ...user, idMeVerification: record });
      clearPendingIdMeVerification();
    });
    return () => { cancelled = true; };
  }, [token, user, updateUser]);

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
