import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Compass, Mail, Lock, AlertCircle, Sparkles } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function LoginPage() {
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      await signIn(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Login failed:", err);
      let friendlyError = err.message || "Failed to log in. Please check your credentials.";
      if (friendlyError.toLowerCase().includes("email not confirmed")) {
        friendlyError = "Your email address has not been verified yet. Please check your inbox for the activation link.";
      } else if (friendlyError.toLowerCase().includes("invalid login credentials")) {
        friendlyError = "Invalid email or password. Please verify your credentials.";
      }
      setError(friendlyError);
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
    <div className="min-h-screen bg-[#0b0f19] text-gray-200 flex items-center justify-center p-4">
      <Card variant="elevated" className="w-full max-w-sm border-white/10 shadow-2xl space-y-6">
        
        {/* Brand Header */}
        <div className="flex items-center justify-center gap-3 text-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#4F46E5] flex items-center justify-center border border-white/15">
            <Compass className="w-5.5 h-5.5 text-white animate-pulse" />
          </div>
          <div className="text-left font-sans">
            <h1 className="text-base font-extrabold text-white tracking-widest uppercase leading-none">CareerCopilot</h1>
            <span className="text-[9px] font-mono text-[#60a5fa] font-bold uppercase tracking-wider block mt-0.5">Aether OS</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-1">
          <h2 className="text-base font-bold uppercase tracking-wider text-white">
            Access Workspace
          </h2>
          <p className="text-[11px] text-gray-400">
            Sign in to synchronize active preparation metrics
          </p>
        </div>

        {/* Alert box */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/25 p-3 rounded-xl text-[11px] text-red-300 flex gap-2.5 items-start">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
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

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-[10px] uppercase font-mono text-gray-400 font-bold">Password</label>
              <Link 
                to="/forgot-password" 
                className="text-[10px] text-[#60a5fa] font-bold hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <Input 
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              icon={<Lock className="w-3.5 h-3.5 text-gray-500" />}
              disabled={loading}
            />
          </div>

          <Button 
            type="submit"
            loading={loading}
            variant="primary"
            className="w-full py-2.5 font-bold uppercase tracking-wider text-xs"
            disabled={loading}
          >
            Enter Dashboard
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-white/5"></div>
          <span className="px-3 text-[10px] font-mono text-gray-500 uppercase">OR</span>
          <div className="flex-1 border-t border-white/5"></div>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 rounded-xl text-xs font-bold text-white transition-all disabled:opacity-50"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.167 4.114-3.327 0-6.03-2.703-6.03-6.03s2.703-6.03 6.03-6.03c1.524 0 2.923.565 4.004 1.492l3.056-3.056C19.14 2.87 15.932 1.5 12.24 1.5 6.326 1.5 1.5 6.326 1.5 12.24s4.826 10.74 10.74 10.74c5.84 0 10.74-4.826 10.74-10.74 0-.693-.075-1.373-.208-1.955H12.24z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Signup Redirect */}
        <div className="text-center text-[11px] text-gray-400 border-t border-white/5 pt-4">
          <p>
            New to Aether OS?{" "}
            <Link 
              to="/signup" 
              className="text-[#60a5fa] font-bold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

      </Card>
    </div>
  );
}
