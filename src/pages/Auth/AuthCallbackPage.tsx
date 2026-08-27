import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Compass, AlertCircle } from "lucide-react";
import Card from "../../components/ui/Card";
import Spinner from "../../components/ui/Spinner";

export default function AuthCallbackPage() {
  const { session, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Wait for auth context loading to finish
    if (authLoading) return;

    if (session) {
      console.log("OAuth Session resolved successfully. Redirecting to dashboard...");
      navigate("/dashboard");
    } else {
      // Check if URL contains error query params
      const params = new URLSearchParams(window.location.search);
      const errorCode = params.get("error");
      const errorDesc = params.get("error_description");

      if (errorCode || errorDesc) {
        setError(errorDesc || `Authentication error: ${errorCode}`);
      } else {
        // Fallback: wait a moment in case session is hydrating asynchronously
        const timer = setTimeout(() => {
          setError("Failed to establish authentication session. Try logging in again.");
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [session, authLoading, navigate]);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-200 flex items-center justify-center p-4">
      <Card variant="elevated" className="w-full max-w-sm border-white/10 shadow-2xl space-y-6 text-center py-8">
        
        {/* Brand Header */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#4F46E5] flex items-center justify-center border border-white/15 animate-spin">
            <Compass className="w-5.5 h-5.5 text-white" />
          </div>
        </div>

        {error ? (
          <div className="space-y-4">
            <div className="bg-red-500/10 border border-red-500/25 p-3 rounded-xl text-[11px] text-red-300 flex gap-2.5 items-start text-left">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => navigate("/login")}
              className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-white transition-all"
            >
              Return to Sign In
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Synchronizing Workspace
            </h2>
            <p className="text-[11px] text-gray-400 flex items-center justify-center gap-2">
              <Spinner className="w-3.5 h-3.5" /> Securing cryptographic tokens...
            </p>
          </div>
        )}

      </Card>
    </div>
  );
}
