import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<any>;
  getAccessToken: () => Promise<string | null>;
  signInWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const isPlaceholderSupabase = !import.meta.env.VITE_SUPABASE_URL || 
                                import.meta.env.VITE_SUPABASE_URL.includes("placeholder-project") || 
                                import.meta.env.VITE_SUPABASE_URL.includes("your-project");

  useEffect(() => {
    if (isPlaceholderSupabase) {
      const mockSessionStr = localStorage.getItem("mock_session");
      if (mockSessionStr) {
        try {
          const parsed = JSON.parse(mockSessionStr);
          setSession(parsed.session);
          setUser(parsed.user);
        } catch (e) {
          console.error("Failed to parse local session:", e);
        }
      }
      setLoading(false);
      return;
    }

    let isMounted = true;

    // Check initial active session once
    const checkSession = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        if (isMounted) {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
        }
      } catch (err) {
        console.error("Supabase getSession error:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkSession();

    // Listen to changes in auth state (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      if (isMounted) {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        // Only set loading to false if this is a real user state change event
        if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
          setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    try {
      if (isPlaceholderSupabase) {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, fullName })
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
        return data;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { fullName }
        }
      });
      if (error) throw error;
      
      // Explicitly commit session to state immediately to avoid routing race conditions
      if (data && data.session) {
        setSession(data.session);
        setUser(data.session.user);
      }
      return data;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      if (isPlaceholderSupabase) {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
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
        return data;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;

      // Explicitly commit session to state immediately to avoid routing race conditions
      if (data && data.session) {
        setSession(data.session);
        setUser(data.session.user);
      }
      return data;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      if (isPlaceholderSupabase) {
        localStorage.removeItem("mock_session");
        setSession(null);
        setUser(null);
        return;
      }
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  const getAccessToken = async () => {
    if (isPlaceholderSupabase) {
      const mockSessionStr = localStorage.getItem("mock_session");
      if (mockSessionStr) {
        try {
          const parsed = JSON.parse(mockSessionStr);
          return parsed.session?.access_token ?? null;
        } catch (e) {
          return null;
        }
      }
      return null;
    }
    const { data: { session: currentSession } } = await supabase.auth.getSession();
    return currentSession?.access_token ?? null;
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
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
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      if (isPlaceholderSupabase) {
        console.log("Mock reset password email sent to:", email);
        return;
      }
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      if (error) throw error;
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (password: string) => {
    setLoading(true);
    try {
      if (isPlaceholderSupabase) {
        console.log("Mock password updated locally");
        return;
      }
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      signUp, 
      signIn, 
      signOut, 
      getAccessToken, 
      signInWithGoogle, 
      resetPassword, 
      updatePassword
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
