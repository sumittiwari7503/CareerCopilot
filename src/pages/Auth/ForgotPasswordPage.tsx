import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Compass, Mail, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      await resetPassword(email.trim());
      setSuccess(true);
    } catch (err: any) {
      console.error("Password recovery failed:", err);
      setError(err.message || "Failed to trigger recovery. Verify your email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-200 flex items-center justify-center p-4 selection:bg-blue-600/30">
      <div className="w-full max-w-md bg-[#111827] border border-white/10 rounded-2xl p-7 sm:p-8 shadow-2xl shadow-black/60 space-y-6">
        
        {/* Brand Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center border border-white/15 shadow-lg shadow-blue-500/20">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-base font-bold text-white tracking-tight">CareerCopilot</span>
            <span className="text-xs text-blue-400 font-medium block">Account Recovery</span>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Reset your password
          </h2>
          <p className="text-xs text-gray-400">
            Enter your account email and we will send you a password reset link.
          </p>
        </div>

        {/* Alert box */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 p-3.5 rounded-xl text-xs text-red-300 flex gap-2.5 items-start">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Success state */}
        {success ? (
          <div className="space-y-4">
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-3.5 rounded-xl text-xs text-emerald-300 flex gap-2.5 items-start">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
              <span>
                Reset instructions have been sent! Check your inbox to complete the password reset.
              </span>
            </div>
            <Link 
              to="/login"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-white transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              label="Email address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              icon={<Mail className="w-4 h-4 text-gray-500" />}
              disabled={loading}
            />

            <Button 
              type="submit"
              loading={loading}
              variant="primary"
              className="w-full py-2.5 text-xs font-semibold rounded-xl"
              disabled={loading}
            >
              Send Reset Link
            </Button>
          </form>
        )}

        {/* Back Link */}
        {!success && (
          <div className="text-center text-xs text-gray-400 border-t border-white/10 pt-4">
            <Link 
              to="/login" 
              className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Sign In
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
