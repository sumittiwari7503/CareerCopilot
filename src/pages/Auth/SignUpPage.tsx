import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Compass, Mail, Lock, User, AlertCircle, CheckCircle } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function SignUpPage() {
  const { signUp, verifyEmailOtp, resendVerificationEmail } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [emailConfirmationRequired, setEmailConfirmationRequired] = useState(false);
  const [loading, setLoading] = useState(false);

  // Verification states
  const [verificationCode, setVerificationCode] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  // Manage resend cooldown timer
  React.useEffect(() => {
    let interval: any;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendCooldown]);

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

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode.length !== 6) {
      setVerificationError("Please enter a valid 6-digit verification code.");
      return;
    }
    setVerificationError(null);
    setVerificationLoading(true);

    try {
      await verifyEmailOtp(email, verificationCode);
      setVerificationSuccess(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err: any) {
      console.error("Verification failed:", err);
      let errMsg = err.message || "Invalid verification code. Please check and try again.";
      if (errMsg.toLowerCase().includes("otp has expired")) {
        errMsg = "Verification code has expired. Please request a new one.";
      }
      setVerificationError(errMsg);
    } finally {
      setVerificationLoading(true); // Keep loading verified true until redirected
      setVerificationLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setVerificationError(null);
    setResendLoading(true);
    try {
      await resendVerificationEmail(email);
      setResendCooldown(60);
    } catch (err: any) {
      console.error("Resend failed:", err);
      setVerificationError(err.message || "Failed to resend verification email. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  if (success && emailConfirmationRequired) {
    return (
      <div className="min-h-screen bg-[#0b0f19] text-gray-200 flex items-center justify-center p-4">
        <Card variant="elevated" className="w-full max-w-sm border-white/10 shadow-2xl space-y-6 py-6 px-5 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#4F46E5] flex items-center justify-center border border-white/15">
              <Compass className="w-6 h-6 text-white animate-pulse" />
            </div>
          </div>

          <div className="space-y-1.5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Confirm Your Email
            </h2>
            <p className="text-[11px] text-gray-400">
              We sent a verification link & code to:
            </p>
            <p className="text-[11px] text-[#60a5fa] font-bold font-mono">
              {email}
            </p>
          </div>

          {verificationError && (
            <div className="bg-red-500/10 border border-red-500/25 p-2.5 rounded-xl text-[11px] text-red-300 text-left flex gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
              <span>{verificationError}</span>
            </div>
          )}

          {verificationSuccess && (
            <div className="bg-emerald-500/10 border border-emerald-500/25 p-2.5 rounded-xl text-[11px] text-emerald-300 text-left flex gap-2">
              <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
              <span>Email verified successfully! Syncing workspace...</span>
            </div>
          )}

          <form onSubmit={handleVerifyOtp} className="space-y-3">
            <div className="text-left space-y-1">
              <label className="text-[9px] uppercase font-mono text-gray-400 font-bold block">Verification Code / OTP</label>
              <input
                type="text"
                required
                maxLength={6}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                placeholder="123456"
                className="w-full text-center tracking-widest font-mono font-bold text-white bg-black/30 border border-white/10 rounded-xl px-3 py-2.5 focus:border-[#60a5fa] focus:ring-1 focus:ring-[#60a5fa] outline-none text-sm transition-all"
                disabled={verificationLoading || verificationSuccess}
              />
            </div>

            <Button
              type="submit"
              loading={verificationLoading}
              variant="primary"
              className="w-full py-2 font-bold uppercase tracking-wider text-[11px]"
              disabled={verificationLoading || verificationSuccess}
            >
              Verify Email
            </Button>
          </form>

          <div className="space-y-2.5 border-t border-white/5 pt-4">
            <button
              onClick={handleResend}
              disabled={resendCooldown > 0 || resendLoading || verificationSuccess}
              className="text-[11px] text-gray-400 hover:text-white font-bold transition-all disabled:opacity-50"
            >
              {resendLoading ? "Sending..." : resendCooldown > 0 ? `Resend Code (${resendCooldown}s)` : "Resend Verification Code"}
            </button>

            <div className="flex justify-center gap-4 text-[10px] text-gray-500">
              <button
                onClick={() => {
                  setSuccess(false);
                  setEmailConfirmationRequired(false);
                  setVerificationCode("");
                  setVerificationError(null);
                }}
                disabled={verificationLoading || verificationSuccess}
                className="hover:underline font-semibold"
              >
                Change Email
              </button>
              <span>•</span>
              <Link
                to="/login"
                className="hover:underline font-semibold text-gray-500"
              >
                Back to Sign In
              </Link>
            </div>
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
