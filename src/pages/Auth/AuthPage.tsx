import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Compass, Sparkles, Mail, Lock, User, AlertCircle, ShieldAlert } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Badge from "../../components/ui/Badge";

export default function AuthPage() {
  const { signUp, signIn } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (isSignUp) {
        if (!fullName.trim()) {
          throw new Error("Full name is required");
        }
        await signUp(email, password, fullName);
      } else {
        await signIn(email, password);
      }
    } catch (err: any) {
      console.error("Auth action failed:", err);
      setError(err.message || "Authentication failed. Check credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-200 flex items-center justify-center p-4">
      <Card variant="elevated" className="w-full max-w-sm border-white/10 shadow-2xl space-y-6">
        
        {/* Brand Header */}
        <div className="flex items-center justify-center gap-3 text-center">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#4F46E5] flex items-center justify-center border border-white/15">
            <Compass className="w-4.5 h-4.5 text-white" />
          </div>
          <div className="text-left font-sans">
            <h1 className="text-sm font-extrabold text-white tracking-widest uppercase leading-none">CareerCopilot</h1>
            <span className="text-[9px] font-mono text-[#60a5fa] font-bold uppercase tracking-wider block mt-0.5">Aether OS</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-1">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            {isSignUp ? "Create your Account" : "Access workspace"}
          </h2>
          <p className="text-[11px] text-gray-400">
            {isSignUp ? "Set up your credentials to begin" : "Sign in to synchronize active prep metrics"}
          </p>
        </div>

        {/* Alert message box */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/25 p-3.5 rounded-xl text-[11px] text-red-300 flex gap-2.5 items-start">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Inputs (using design system primitives) */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {isSignUp && (
            <Input 
              label="Full Name"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Alex Rivera"
              icon={<User className="w-3.5 h-3.5 text-gray-500" />}
            />
          )}

          <Input 
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            icon={<Mail className="w-3.5 h-3.5 text-gray-500" />}
          />

          <Input 
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            icon={<Lock className="w-3.5 h-3.5 text-gray-500" />}
          />

          <Button 
            type="submit"
            loading={submitting}
            variant="primary"
            className="w-full py-2.5"
          >
            {isSignUp ? "Register Account" : "Enter Dashboard"}
          </Button>

        </form>

        {/* Action Toggle */}
        <div className="text-center text-[11px] text-gray-400 border-t border-white/5 pt-4">
          {isSignUp ? (
            <p>
              Already have a credentials token?{" "}
              <button 
                type="button"
                onClick={() => { setIsSignUp(false); setError(null); }}
                className="text-[#60a5fa] font-bold hover:underline"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              New to Aether OS?{" "}
              <button 
                type="button"
                onClick={() => { setIsSignUp(true); setError(null); }}
                className="text-[#60a5fa] font-bold hover:underline"
              >
                Sign Up
              </button>
            </p>
          )}
        </div>

      </Card>
    </div>
  );
}
