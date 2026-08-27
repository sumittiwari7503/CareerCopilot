import React from "react";
import { Settings, ShieldCheck } from "lucide-react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Badge from "../../components/ui/Badge";

interface ProfilePageProps {
  personalName: string;
  setPersonalName: (name: string) => void;
  personalEmail: string;
  setPersonalEmail: (email: string) => void;
  userLevel: string;
  setUserLevel: (level: string) => void;
  
  // Onboarding settings props (Phase 9)
  targetRole: string;
  setTargetRole: (role: string) => void;
  targetCompany: string;
  setTargetCompany: (company: string) => void;
  companyType: string;
  setCompanyType: (type: string) => void;
  specialization: string;
  setSpecialization: (spec: string) => void;
  experienceLevel: string;
  setExperienceLevel: (exp: string) => void;
  duration: number;
  setDuration: (months: number) => void;
  timeAvailable: string;
  setTimeAvailable: (time: string) => void;
}

export default function ProfilePage({
  personalName,
  setPersonalName,
  personalEmail,
  setPersonalEmail,
  userLevel,
  setUserLevel,
  targetRole,
  setTargetRole,
  targetCompany,
  setTargetCompany,
  companyType,
  setCompanyType,
  specialization,
  setSpecialization,
  experienceLevel,
  setExperienceLevel,
  duration,
  setDuration,
  timeAvailable,
  setTimeAvailable
}: ProfilePageProps) {
  const levelOptions = [
    { value: "L3", label: "(L3) Software Developer I" },
    { value: "L4", label: "(L4) Software Developer II" },
    { value: "L5", label: "(L5) Senior Developer" },
    { value: "L6", label: "(L6) Staff Developer" }
  ];

  return (
    <div className="space-y-8">
      
      {/* 1. Header Details */}
      <section className="space-y-1">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-gray-400" /> Account Settings
        </h2>
        <p className="text-xs text-gray-400">
          Configure profile details and target seniority benchmarks.
        </p>
      </section>

      {/* 2. Personal & Career Profile Split */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Personal Details */}
        <Card className="space-y-4">
          <h3 className="text-xs uppercase font-extrabold text-white tracking-wider pb-2 border-b border-white/5">Personal Information</h3>
          
          <div className="space-y-3">
            <Input 
              label="Candidate Full Name"
              value={personalName}
              onChange={(e) => setPersonalName(e.target.value)}
              placeholder="e.g. Alex Rivera"
            />

            <Input 
              label="Email Address"
              value={personalEmail}
              onChange={(e) => setPersonalEmail(e.target.value)}
              placeholder="name@company.com"
              disabled
            />
            
            <Select 
              label="Target Seniority Level"
              value={userLevel}
              onChange={(e) => setUserLevel(e.target.value)}
              options={levelOptions}
            />
          </div>
        </Card>

        {/* Career Targets */}
        <Card className="space-y-4">
          <h3 className="text-xs uppercase font-extrabold text-white tracking-wider pb-2 border-b border-white/5">Target Career Goals</h3>
          
          <div className="space-y-3">
            <Input
              label="Target Role"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Backend Engineer"
            />

            <Input
              label="Target Company"
              value={targetCompany}
              onChange={(e) => setTargetCompany(e.target.value)}
              placeholder="e.g. Google"
            />

            <Select
              label="Company Type"
              value={companyType}
              onChange={(e) => setCompanyType(e.target.value)}
              options={[
                { value: "Product Company", label: "Product Company" },
                { value: "Service Company", label: "Service Company" },
                { value: "Startup", label: "Startup" },
                { value: "Consulting", label: "Consulting" },
                { value: "Government", label: "Government" },
                { value: "Not sure", label: "Not sure" }
              ]}
            />

            <Select
              label="Specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              options={[
                { value: "Frontend", label: "Frontend" },
                { value: "Backend", label: "Backend" },
                { value: "Full Stack", label: "Full Stack" },
                { value: "Mobile", label: "Mobile" },
                { value: "Systems", label: "Systems" },
                { value: "Not sure", label: "Not sure" }
              ]}
            />

            <Select
              label="Experience Level"
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              options={[
                { value: "Student", label: "Student" },
                { value: "Fresher", label: "Fresher" },
                { value: "0–1 years", label: "0–1 years" },
                { value: "1–2 years", label: "1–2 years" },
                { value: "2–3 years", label: "2–3 years" },
                { value: "3+ years", label: "3+ years" }
              ]}
            />

            <Select
              label="Target Timeline"
              value={duration.toString()}
              onChange={(e) => setDuration(parseInt(e.target.value, 10) || 3)}
              options={[
                { value: "1", label: "1 month" },
                { value: "2", label: "2 months" },
                { value: "3", label: "3 months" },
                { value: "4", label: "4 months" },
                { value: "6", label: "6 months" }
              ]}
            />

            <Select
              label="Daily Available Study"
              value={timeAvailable}
              onChange={(e) => setTimeAvailable(e.target.value)}
              options={[
                { value: "30 min", label: "30 min" },
                { value: "1 hour", label: "1 hour" },
                { value: "2 hours", label: "2 hours" },
                { value: "3 hours", label: "3 hours" },
                { value: "4+ hours", label: "4+ hours" }
              ]}
            />
          </div>
        </Card>

      </div>

      {/* 3. System Preferences & Info */}
      <Card className="space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-white/5">
          <h3 className="text-xs uppercase font-extrabold text-white tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" /> Platform Security
          </h3>
          <Badge variant="success">Secured SSL Connection</Badge>
        </div>
        
        <p className="text-[11px] text-gray-400 leading-relaxed">
          Your workspace metrics, compiled resume analyses, and interview sessions logs are safely saved using isolated role-level security databases tethers.
        </p>

        <div className="flex justify-between text-[10.5px] border-t border-white/2 pt-3">
          <span className="text-gray-400">Environment version</span>
          <span className="font-mono text-white font-bold">Aether AI v3.55 (Postgres client synced)</span>
        </div>
      </Card>

    </div>
  );
}
