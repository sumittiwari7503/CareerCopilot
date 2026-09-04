import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { parseAuthError } from "../../utils/authError";
import { Compass, Mail, Lock, User, AlertCircle, Code2, Building2, ShieldCheck } from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function SignUpPage() {
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      await signUp(email.trim(), password, fullName.trim());
    } catch (err: any) {
      console.error("Signup failed:", err);
      setError(parseAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-200 flex items-center justify-center p-4 lg:p-12 selection:bg-blue-600/30">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Value Proposition Pane */}
        <div className="hidden lg:flex lg:col-span-6 flex-col justify-between space-y-8 pr-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center border border-white/15 shadow-lg shadow-blue-500/20">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white">CareerCopilot</span>
                <span className="text-xs text-blue-400 font-medium block">Personal AI Career Operating System</span>
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-white tracking-tight leading-snug">
                Build your personalized career operating system.
              </h1>
              <p className="text-sm text-gray-400 leading-relaxed">
                Connect your engineering goals with a guided, step-by-step preparation workflow. From foundational DSA patterns to high-stakes system design and behavioral interviews.
              </p>
            </div>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Code2 className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-200">Curated RisingBrain DSA Problem Sheets</h4>
                  <p className="text-[11px] text-gray-400">Master 67 algorithmic patterns and Last-Minute 100 high-frequency problems.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-200">Product & Service Track Guidance</h4>
                  <p className="text-[11px] text-gray-400">Targeted roadmaps aligned to FAANG/tier-1 product firms and top service companies.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-200">Pure Signal, Zero Noise</h4>
                  <p className="text-[11px] text-gray-400">Direct instant account activation. No spam, no unnecessary OTP friction.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <p className="text-xs text-gray-400 italic">
              "Start today with a tailored roadmap based on your current experience and target engineering level."
            </p>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="w-full lg:col-span-6 max-w-md mx-auto">
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-7 sm:p-8 shadow-2xl shadow-black/60 space-y-6">
            
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 lg:hidden mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Compass className="w-4 h-4 text-white" />
                </div>
                <span className="text-base font-bold text-white">CareerCopilot</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Create your account
              </h2>
              <p className="text-xs text-gray-400">
                Start tracking your preparation with a personalized career workspace
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-3.5 rounded-xl text-xs text-red-300 flex gap-2.5 items-start">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <Input 
                label="Full name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alex Rivera"
                icon={<User className="w-4 h-4 text-gray-500" />}
                disabled={loading}
              />

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

              <Input 
                label="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4 text-gray-500" />}
                disabled={loading}
              />

              <Input 
                label="Confirm password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4 text-gray-500" />}
                disabled={loading}
              />

              <Button 
                type="submit"
                loading={loading}
                variant="primary"
                className="w-full py-2.5 text-xs font-semibold rounded-xl mt-2"
                disabled={loading}
              >
                Create Account
              </Button>
            </form>

            {/* Login Link */}
            <div className="text-center text-xs text-gray-400 border-t border-white/10 pt-4">
              <p>
                Already have an account?{" "}
                <Link 
                  to="/login" 
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
