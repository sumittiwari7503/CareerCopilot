import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Compass, Mail, Lock, User, AlertCircle, CheckCircle } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function SignUpPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [emailConfirmationRequired, setEmailConfirmationRequired] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email || !password || !confirmPassword) {
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
      const data = await signUp(email, password, fullName);
      
      // If email confirmation is enabled, session is null but user is created
      if (data && data.user && !data.session) {
        setEmailConfirmationRequired(true);
        setSuccess(true);
      } else {
        // Immediately logged in (email confirmation disabled)
        setSuccess(true);
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error("Signup failed:", err);
      setError(err.message || "Registration failed. Try a different email.");
    } finally {
      setLoading(false);
    }
  };

  if (success && emailConfirmationRequired) {
    return (
      <div className="min-h-screen bg-[#0b0f19] text-gray-200 flex items-center justify-center p-4">
        <Card variant="elevated" className="w-full max-w-sm border-white/10 shadow-2xl space-y-6 text-center py-8">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#4F46E5] flex items-center justify-center border border-white/15">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold uppercase tracking-wider text-white">
              Confirm Your Email
            </h2>
            <p className="text-[12px] text-gray-300">
              An activation link has been sent to <strong className="text-white">{email}</strong>.
            </p>
            <p className="text-[11px] text-gray-400">
              Please click the link in the email to complete registration and unlock your Career OS workspace.
            </p>
          </div>

          <div className="border-t border-white/5 pt-6">
            <Link
              to="/login"
              className="block w-full py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl text-xs font-bold text-white uppercase tracking-wider transition-all"
            >
              Go to Sign In
            </Link>
          </div>
        </Card>
      </div>
    );
  }

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
            Create Account
          </h2>
          <p className="text-[11px] text-gray-400">
            Set up your credentials to initialize Career OS
          </p>
        </div>

        {/* Alert box */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/25 p-3 rounded-xl text-[11px] text-red-300 flex gap-2.5 items-start">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/25 p-3.5 rounded-xl text-[11.5px] text-emerald-300 flex gap-2.5 items-start">
            <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
            <span>Registration successful! Redirecting to login...</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label="Full Name"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Alex Rivera"
            icon={<User className="w-3.5 h-3.5 text-gray-500" />}
            disabled={loading || success}
          />

          <Input 
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            icon={<Mail className="w-3.5 h-3.5 text-gray-500" />}
            disabled={loading || success}
          />

          <Input 
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            icon={<Lock className="w-3.5 h-3.5 text-gray-500" />}
            disabled={loading || success}
          />

          <Input 
            label="Confirm Password"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            icon={<Lock className="w-3.5 h-3.5 text-gray-500" />}
            disabled={loading || success}
          />

          <Button 
            type="submit"
            loading={loading}
            variant="primary"
            className="w-full py-2.5 font-bold uppercase tracking-wider text-xs"
            disabled={loading || success}
          >
            Register Account
          </Button>
        </form>

        {/* Login Redirect */}
        <div className="text-center text-[11px] text-gray-400 border-t border-white/5 pt-4">
          <p>
            Already have a credentials token?{" "}
            <Link 
              to="/login" 
              className="text-[#60a5fa] font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>

      </Card>
    </div>
  );
}
