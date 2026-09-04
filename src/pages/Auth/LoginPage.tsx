import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { parseAuthError } from "../../utils/authError";
import { Compass, Mail, Lock, AlertCircle, CheckCircle2, ShieldCheck, Code2, Sparkles, Building2 } from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function LoginPage() {
  const { signIn, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      await signIn(email.trim(), password);
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(parseAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      console.error("Google login failed:", err);
      setError(err.message || "OAuth redirection failed.");
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
                Accelerate your software engineering career with clarity.
              </h1>
              <p className="text-sm text-gray-400 leading-relaxed">
                A structured, data-driven career platform combining authentic RisingBrain DSA sheets, personalized roadmaps, company track benchmarks, and ATS resume intelligence.
              </p>
            </div>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Code2 className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-200">Authentic RisingBrain DSA Curriculum</h4>
                  <p className="text-[11px] text-gray-400">386 pattern-wise and 106 high-frequency problems with LeetCode, GFG & YouTube solutions.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-200">Product & Service Company Tracks</h4>
                  <p className="text-[11px] text-gray-400">Clear expectations, architectural interview preparation, and real round rubrics.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-200">Zero Artificial Vanity Metrics</h4>
                  <p className="text-[11px] text-gray-400">Your metrics reflect real solved problems, verified roadmap milestones, and active applications.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <p className="text-xs text-gray-400 italic">
              "Systematic preparation always beats haphazard practice. CareerCopilot keeps every step of your preparation organized in one unified workspace."
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
                Welcome back
              </h2>
              <p className="text-xs text-gray-400">
                Sign in to your account to continue your career progress
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

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-medium text-gray-300">Password</label>
                  <Link 
                    to="/forgot-password" 
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  icon={<Lock className="w-4 h-4 text-gray-500" />}
                  disabled={loading}
                />
              </div>

              <Button 
                type="submit"
                loading={loading}
                variant="primary"
                className="w-full py-2.5 text-xs font-semibold rounded-xl"
                disabled={loading}
              >
                Sign In
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-white/10"></div>
              <span className="px-3 text-[11px] text-gray-500 font-medium uppercase tracking-wider">or</span>
              <div className="flex-1 border-t border-white/10"></div>
            </div>

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 rounded-xl text-xs font-medium text-gray-200 transition-all disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.167 4.114-3.327 0-6.03-2.703-6.03-6.03s2.703-6.03 6.03-6.03c1.524 0 2.923.565 4.004 1.492l3.056-3.056C19.14 2.87 15.932 1.5 12.24 1.5 6.326 1.5 1.5 6.326 1.5 12.24s4.826 10.74 10.74 10.74c5.84 0 10.74-4.826 10.74-10.74 0-.693-.075-1.373-.208-1.955H12.24z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Signup Link */}
            <div className="text-center text-xs text-gray-400 border-t border-white/10 pt-4">
              <p>
                Don't have an account?{" "}
                <Link 
                  to="/signup" 
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Create an account
                </Link>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
