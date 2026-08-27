import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Compass, Mail, AlertCircle, CheckCircle } from "lucide-react";
import Card from "../../components/ui/Card";
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
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err: any) {
      console.error("Password recovery failed:", err);
      setError(err.message || "Failed to trigger recovery. Verify your email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-200 flex items-center justify-center p-4">
      <Card variant="elevated" className="w-full max-w-sm border-white/10 shadow-2xl space-y-6">
        
        {/* Brand Header */}
        <div className="flex items-center justify-center gap-3 text-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#4F46E5] flex items-center justify-center border border-white/15">
            <Compass className="w-5.5 h-5.5 text-white" />
          </div>
          <div className="text-left font-sans">
            <h1 className="text-base font-extrabold text-white tracking-widest uppercase leading-none">CareerCopilot</h1>
            <span className="text-[9px] font-mono text-[#60a5fa] font-bold uppercase tracking-wider block mt-0.5">Aether OS</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-1">
          <h2 className="text-base font-bold uppercase tracking-wider text-white">
            Reset Password
          </h2>
          <p className="text-[11px] text-gray-400">
            Request an authentication recovery session link
          </p>
        </div>

        {/* Alert box */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/25 p-3 rounded-xl text-[11px] text-red-300 flex gap-2.5 items-start">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Success state */}
        {success ? (
          <div className="space-y-4">
            <div className="bg-emerald-500/10 border border-emerald-500/25 p-3.5 rounded-xl text-[11.5px] text-emerald-300 flex gap-2.5 items-start">
              <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
              <span>
                Recovery link dispatched successfully! Check your inbox for reset instructions.
              </span>
            </div>
            <Link 
              to="/login"
              className="block w-full text-center py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-white transition-all"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              icon={<Mail className="w-3.5 h-3.5 text-gray-500" />}
              disabled={loading}
            />

            <Button 
              type="submit"
              loading={loading}
              variant="primary"
              className="w-full py-2.5 font-bold uppercase tracking-wider text-xs"
              disabled={loading}
            >
              Send Recovery Link
            </Button>
          </form>
        )}

        {/* Back Link (if not success state) */}
        {!success && (
          <div className="text-center text-[11px] text-gray-400 border-t border-white/5 pt-4">
            <Link 
              to="/login" 
              className="text-[#60a5fa] font-bold hover:underline"
            >
              Back to Sign In
            </Link>
          </div>
        )}

      </Card>
    </div>
  );
}
