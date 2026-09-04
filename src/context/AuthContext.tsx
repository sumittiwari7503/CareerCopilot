import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase";

export type AuthStatus = 
  | "INITIALIZING" 
  | "UNAUTHENTICATED" 
  | "AUTHENTICATED" 
  | "HYDRATING_PROFILE" 
  | "READY";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  authStatus: AuthStatus;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ user: User | null; session: Session | null }>;
  signIn: (email: string, password: string) => Promise<{ user: User | null; session: Session | null }>;
  signOut: () => Promise<void>;
  getAccessToken: () => Promise<string | null>;
  signInWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  setAuthStatus: (status: AuthStatus) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [authStatus, setAuthStatus] = useState<AuthStatus>("INITIALIZING");

  const isPlaceholderSupabase = !import.meta.env.VITE_SUPABASE_URL || 
                                import.meta.env.VITE_SUPABASE_URL.includes("placeholder-project") || 
                                import.meta.env.VITE_SUPABASE_URL.includes("your-project");

  useEffect(() => {
    let isMounted = true;

    // 1. Local offline mock fallback
    if (isPlaceholderSupabase) {
      const mockSessionStr = localStorage.getItem("mock_session");
      if (mockSessionStr) {
        try {
          const parsed = JSON.parse(mockSessionStr);
          if (isMounted) {
            setSession(parsed.session);
            setUser(parsed.user);
            setAuthStatus("AUTHENTICATED");
          }
          return;
        } catch (e) {
          console.error("Failed to parse local session:", e);
        }
      }
      if (isMounted) {
        setSession(null);
        setUser(null);
        setAuthStatus("UNAUTHENTICATED");
      }
      return;
    }

    // 2. Production Supabase: Single source of truth session resolution
    async function initializeSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.warn("[Auth] getSession warning:", error.message);
        }

        if (isMounted) {
          const currentSession = data?.session ?? null;
          if (currentSession && currentSession.user) {
            setSession(currentSession);
            setUser(currentSession.user);
            setAuthStatus("AUTHENTICATED");
          } else {
            setSession(null);
            setUser(null);
            setAuthStatus("UNAUTHENTICATED");
          }
        }
      } catch (err) {
        console.error("[Auth] Session initialization error:", err);
        if (isMounted) {
          setSession(null);
          setUser(null);
          setAuthStatus("UNAUTHENTICATED");
        }
      }
    }

    initializeSession();

    // 3. Supabase Auth listener for token refreshes, logins, and logouts
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (!isMounted) return;

      if (event === "SIGNED_OUT" || !currentSession) {
        setSession(null);
        setUser(null);
        setAuthStatus("UNAUTHENTICATED");
      } else if (currentSession && currentSession.user) {
        setSession(currentSession);
        setUser(currentSession.user);
        setAuthStatus((prev) => (prev === "INITIALIZING" || prev === "UNAUTHENTICATED" ? "AUTHENTICATED" : prev));
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [isPlaceholderSupabase]);

  const signUp = async (email: string, password: string, fullName: string) => {
    if (isPlaceholderSupabase) {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password, fullName: fullName.trim() })
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Local registration failed");
      }
      const data = await res.json();

      const mockUser = {
        id: data.session.user.id,
        email: data.session.user.email,
        user_metadata: { fullName },
        aud: "authenticated",
        role: "authenticated",
        created_at: new Date().toISOString()
      } as any;

      const mockSession = {
        access_token: data.session.access_token,
        token_type: "bearer",
        expires_in: 3600,
        user: mockUser
      } as any;

      localStorage.setItem("mock_session", JSON.stringify({ session: mockSession, user: mockUser }));
      setSession(mockSession);
      setUser(mockUser);
      setAuthStatus("AUTHENTICATED");
      return data;
    }

    // Direct Supabase sign up
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { fullName: fullName.trim() }
      }
    });

    if (error) {
      throw error;
    }

    if (!data.session) {
      throw new Error("Account created, but no active session was returned. Please ensure 'Confirm email' is disabled in your Supabase Auth dashboard.");
    }

    // Commit session state immediately
    setSession(data.session);
    setUser(data.session.user);
    setAuthStatus("AUTHENTICATED");

    return data;
  };

  const signIn = async (email: string, password: string) => {
    if (isPlaceholderSupabase) {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password })
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Local login failed");
      }
      const data = await res.json();

      const mockUser = {
        id: data.session.user.id,
        email: data.session.user.email,
        user_metadata: { fullName: data.session.user.fullName || data.session.user.email },
        aud: "authenticated",
        role: "authenticated",
        created_at: new Date().toISOString()
      } as any;

      const mockSession = {
        access_token: data.session.access_token,
        token_type: "bearer",
        expires_in: 3600,
        user: mockUser
      } as any;

      localStorage.setItem("mock_session", JSON.stringify({ session: mockSession, user: mockUser }));
      setSession(mockSession);
      setUser(mockUser);
      setAuthStatus("AUTHENTICATED");
      return data;
    }

    // Direct Supabase sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password
    });

    if (error) {
      throw error;
    }

    if (!data.session) {
      throw new Error("Authentication failed: No active session received.");
    }

    // Commit session state immediately
    setSession(data.session);
    setUser(data.session.user);
    setAuthStatus("AUTHENTICATED");

    return data;
  };

  const signOut = async () => {
    try {
      if (isPlaceholderSupabase) {
        localStorage.removeItem("mock_session");
      } else {
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.warn("[Auth] signOut caught error:", err);
    } finally {
      setSession(null);
      setUser(null);
      setAuthStatus("UNAUTHENTICATED");
    }
  };

  const getAccessToken = async () => {
    if (isPlaceholderSupabase) {
      const mockSessionStr = localStorage.getItem("mock_session");
      if (mockSessionStr) {
        try {
          const parsed = JSON.parse(mockSessionStr);
          return parsed.session?.access_token ?? null;
        } catch {
          return null;
        }
      }
      return null;
    }

    if (session?.access_token) {
      return session.access_token;
    }

    const { data: { session: currentSession } } = await supabase.auth.getSession();
    return currentSession?.access_token ?? null;
  };

  const signInWithGoogle = async () => {
    if (isPlaceholderSupabase) {
      window.location.href = `${window.location.origin}/auth/callback?code=mock-oauth-code`;
      return;
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    if (error) throw error;
  };

  const resetPassword = async (email: string) => {
    if (isPlaceholderSupabase) {
      console.log("Mock reset password email sent to:", email);
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`
    });
    if (error) throw error;
  };

  const updatePassword = async (password: string) => {
    if (isPlaceholderSupabase) {
      console.log("Mock password updated locally");
      return;
    }
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      authStatus,
      loading: authStatus === "INITIALIZING", 
      signUp, 
      signIn, 
      signOut, 
      getAccessToken, 
      signInWithGoogle, 
      resetPassword, 
      updatePassword,
      setAuthStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

