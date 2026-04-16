import React, { createContext, useContext, useState, useEffect } from "react";

export interface AuthUser {
  id:         string;
  name:       string;
  email:      string;
  phone:      string;
  membership: "starter" | "pro" | "elite" | null;
}

interface AuthContextValue {
  user:    AuthUser | null;
  token:   string | null;
  signIn:  (token: string, user: AuthUser) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user:    null,
  token:   null,
  signIn:  () => {},
  signOut: () => {},
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

  const signIn = (newToken: string, newUser: AuthUser) => {
    localStorage.setItem(STORAGE_KEY_TOKEN, newToken);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const signOut = () => {
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_USER);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
