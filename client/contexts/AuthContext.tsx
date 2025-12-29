import React, { createContext, useState, useEffect, ReactNode } from "react";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: AuthUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (user: AuthUser, sessionId: string) => void;
  logout: () => void;
  register: (user: AuthUser, sessionId: string) => void;
  sessionId: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("homeserve_user");
    const savedSessionId = localStorage.getItem("homeserve_sessionId");

    if (savedUser && savedSessionId) {
      try {
        setUser(JSON.parse(savedUser));
        setSessionId(savedSessionId);
      } catch (error) {
        console.error("Failed to load auth state:", error);
        localStorage.removeItem("homeserve_user");
        localStorage.removeItem("homeserve_sessionId");
      }
    }

    setIsLoading(false);
  }, []);

  const login = (newUser: AuthUser, newSessionId: string) => {
    setUser(newUser);
    setSessionId(newSessionId);
    localStorage.setItem("homeserve_user", JSON.stringify(newUser));
    localStorage.setItem("homeserve_sessionId", newSessionId);
  };

  const register = (newUser: AuthUser, newSessionId: string) => {
    setUser(newUser);
    setSessionId(newSessionId);
    localStorage.setItem("homeserve_user", JSON.stringify(newUser));
    localStorage.setItem("homeserve_sessionId", newSessionId);
  };

  const logout = () => {
    setUser(null);
    setSessionId(null);
    localStorage.removeItem("homeserve_user");
    localStorage.removeItem("homeserve_sessionId");
  };

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    isLoading,
    login,
    logout,
    register,
    sessionId,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}
