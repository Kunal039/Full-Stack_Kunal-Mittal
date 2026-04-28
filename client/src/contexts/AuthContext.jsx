import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { clearAuthSession, loadAuthSession, saveAuthSession } from "../auth";
import { loginUser, registerUser } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => loadAuthSession());

  useEffect(() => {
    if (session) {
      saveAuthSession(session);
    } else {
      clearAuthSession();
    }
  }, [session]);

  async function login(credentials) {
    const nextSession = await loginUser(credentials);
    setSession(nextSession);
    return nextSession;
  }

  async function register(payload) {
    const nextSession = await registerUser(payload);
    setSession(nextSession);
    return nextSession;
  }

  function logout() {
    setSession(null);
  }

  const value = useMemo(
    () => ({
      token: session?.token || "",
      user: session?.user || null,
      isAuthenticated: Boolean(session?.token),
      login,
      register,
      logout
    }),
    [session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
