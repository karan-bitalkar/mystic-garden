// import React, { createContext, useState, useEffect, ReactNode } from "react";

// export interface AuthUser {
//   id: string;
//   name: string;
//   email: string;
//   phone?: string;
//   role: "user" | "admin";
// }

// interface AuthContextType {
//   user: AuthUser | null;
//   isLoggedIn: boolean;
//   isLoading: boolean;
//   login: (user: AuthUser, sessionId: string) => void;
//   logout: () => void;
//   register: (user: AuthUser, sessionId: string) => void;
//   sessionId: string | null;
// }

// export const AuthContext = createContext<AuthContextType | undefined>(
//   undefined
// );

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<AuthUser | null>(null);
//   const [sessionId, setSessionId] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Load auth state from localStorage on mount
//   useEffect(() => {
//     const savedUser = localStorage.getItem("homeserve_user");
//     const savedSessionId = localStorage.getItem("homeserve_sessionId");

//     if (savedUser && savedSessionId) {
//       try {
//         setUser(JSON.parse(savedUser));
//         setSessionId(savedSessionId);
//       } catch (error) {
//         console.error("Failed to load auth state:", error);
//         localStorage.removeItem("homeserve_user");
//         localStorage.removeItem("homeserve_sessionId");
//       }
//     }

//     setIsLoading(false);
//   }, []);

//   const login = (newUser: AuthUser, newSessionId: string) => {
//     setUser(newUser);
//     setSessionId(newSessionId);
//     localStorage.setItem("homeserve_user", JSON.stringify(newUser));
//     localStorage.setItem("homeserve_sessionId", newSessionId);
//   };

//   const register = (newUser: AuthUser, newSessionId: string) => {
//     setUser(newUser);
//     setSessionId(newSessionId);
//     localStorage.setItem("homeserve_user", JSON.stringify(newUser));
//     localStorage.setItem("homeserve_sessionId", newSessionId);
//   };

//   const logout = () => {
//     setUser(null);
//     setSessionId(null);
//     localStorage.removeItem("homeserve_user");
//     localStorage.removeItem("homeserve_sessionId");
//   };

//   const value: AuthContextType = {
//     user,
//     isLoggedIn: !!user,
//     isLoading,
//     login,
//     logout,
//     register,
//     sessionId,
//   };

//   return (
//     <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
//   );
// }
















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

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function: backend से current user fetch करो
  const fetchCurrentUser = async (savedSessionId: string) => {
    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // अगर sessionId cookie में है तो automatically जाएगा
          // अगर header में भेजना है तो:
          // "Authorization": `Bearer ${savedSessionId}`,
        },
        credentials: "include", // बहुत जरूरी अगर cookie use कर रहे हो
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.user) {
          setUser(data.user);
          setSessionId(savedSessionId);
        } else {
          // Invalid session → clear
          localStorage.removeItem("homeserve_sessionId");
        }
      } else {
        localStorage.removeItem("homeserve_sessionId");
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      localStorage.removeItem("homeserve_sessionId");
    } finally {
      setIsLoading(false);
    }
  };

  // App load होते ही check करो कि session valid है या नहीं
  useEffect(() => {
    const savedSessionId = localStorage.getItem("homeserve_sessionId");

    if (savedSessionId) {
      fetchCurrentUser(savedSessionId);
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = (newUser: AuthUser, newSessionId: string) => {
    setUser(newUser);
    setSessionId(newSessionId);
    localStorage.setItem("homeserve_sessionId", newSessionId);
  };

  const register = (newUser: AuthUser, newSessionId: string) => {
    setUser(newUser);
    setSessionId(newSessionId);
    localStorage.setItem("homeserve_sessionId", newSessionId);
  };

  const logout = async () => {
    // Optional: backend को logout call करो
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    }

    setUser(null);
    setSessionId(null);
    localStorage.removeItem("homeserve_sessionId");
    localStorage.removeItem("homeserve_user"); // पुराना backup
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}