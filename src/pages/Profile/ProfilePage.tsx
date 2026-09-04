import React, { useState, useEffect } from "react";
import { 
  Settings, 
  ShieldCheck, 
  User, 
  Briefcase, 
  Code, 
  Sliders, 
  Globe, 
  Save, 
  Check, 
  Plus, 
  X, 
  GraduationCap, 
  MapPin, 
  DollarSign 
} from "lucide-react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { ExtendedCareerProfile, CategorizedSkills } from "../../types";

interface ProfilePageProps {
  personalName: string;
  setPersonalName: (name: string) => void;
  personalEmail: string;
  setPersonalEmail: (email: string) => void;
  userLevel: string;
  setUserLevel: (level: string) => void;
  
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
  currentSkills: string[];
  setCurrentSkills: (skills: string[]) => void;
  careerProfile?: ExtendedCareerProfile | null;
  onSaveProfile?: (updatedData: any) => Promise<void>;
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
  setTimeAvailable,
  currentSkills,
  setCurrentSkills,
  careerProfile,
  onSaveProfile
}: ProfilePageProps) {
  // Navigation sub-tabs within Career Profile
  const [activeSection, setActiveSection] = useState<"personal" | "career" | "skills" | "preferences" | "portfolio">("personal");

  // Local state for extended profile fields
  const [education, setEducation] = useState(careerProfile?.education || "");
  const [degree, setDegree] = useState(careerProfile?.degree || "");
  const [graduationYear, setGraduationYear] = useState(careerProfile?.graduationYear || "");
  const [location, setLocation] = useState(careerProfile?.location || "");
  const [expectedSalary, setExpectedSalary] = useState(careerProfile?.expectedSalary || "");
  const [preferredLocation, setPreferredLocation] = useState(careerProfile?.preferredLocation || "");
  const [workPreference, setWorkPreference] = useState<"Remote" | "Hybrid" | "On-site">(
    careerProfile?.workPreference || "Hybrid"
  );
  
  // Categorized Skills state
  const [categorized, setCategorized] = useState<CategorizedSkills>({
    languages: careerProfile?.categorizedSkills?.languages || ["TypeScript", "JavaScript", "Python"],
    frameworks: careerProfile?.categorizedSkills?.frameworks || ["React", "Node.js", "Tailwind CSS"],
    databases: careerProfile?.categorizedSkills?.databases || ["PostgreSQL", "Redis"],
    cloud: careerProfile?.categorizedSkills?.cloud || ["AWS", "Vercel"],
    devops: careerProfile?.categorizedSkills?.devops || ["Docker", "Git", "GitHub Actions"],
    tools: careerProfile?.categorizedSkills?.tools || ["VS Code", "Postman"],
    other: careerProfile?.categorizedSkills?.other || ["System Design", "REST APIs"]
  });

  const [newSkillInput, setNewSkillInput] = useState("");
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<keyof CategorizedSkills>("languages");

  // Portfolio links
  const [githubUrl, setGithubUrl] = useState(careerProfile?.portfolioLinks?.github || "");
  const [linkedinUrl, setLinkedinUrl] = useState(careerProfile?.portfolioLinks?.linkedin || "");
  const [websiteUrl, setWebsiteUrl] = useState(careerProfile?.portfolioLinks?.website || "");

  // Saving state & feedback
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync initial careerProfile if updated externally
  useEffect(() => {
    if (careerProfile) {
      if (careerProfile.education) setEducation(careerProfile.education);
      if (careerProfile.degree) setDegree(careerProfile.degree);
      if (careerProfile.graduationYear) setGraduationYear(careerProfile.graduationYear);
      if (careerProfile.location) setLocation(careerProfile.location);
      if (careerProfile.expectedSalary) setExpectedSalary(careerProfile.expectedSalary);
      if (careerProfile.preferredLocation) setPreferredLocation(careerProfile.preferredLocation);
      if (careerProfile.workPreference) setWorkPreference(careerProfile.workPreference);
      if (careerProfile.portfolioLinks?.github) setGithubUrl(careerProfile.portfolioLinks.github);
      if (careerProfile.portfolioLinks?.linkedin) setLinkedinUrl(careerProfile.portfolioLinks.linkedin);
      if (careerProfile.portfolioLinks?.website) setWebsiteUrl(careerProfile.portfolioLinks.website);
    }
  }, [careerProfile]);

  const handleAddSkill = () => {
    const trimmed = newSkillInput.trim();
    if (!trimmed) return;
    
    // Add to categorized skills
    if (!categorized[selectedSkillCategory].includes(trimmed)) {
      setCategorized(prev => ({
        ...prev,
        [selectedSkillCategory]: [...prev[selectedSkillCategory], trimmed]
      }));
    }

    // Add to flat currentSkills if not already present
    if (!currentSkills.includes(trimmed)) {
      setCurrentSkills([...currentSkills, trimmed]);
    }

    setNewSkillInput("");
  };

  const handleRemoveSkill = (category: keyof CategorizedSkills, skillToRemove: string) => {
    setCategorized(prev => ({
      ...prev,
      [category]: prev[category].filter(s => s !== skillToRemove)
    }));
    setCurrentSkills(currentSkills.filter(s => s !== skillToRemove));
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    // Merge all skills for backward compatibility
    const allSkills = Array.from(new Set([
      ...currentSkills,
      ...categorized.languages,
      ...categorized.frameworks,
      ...categorized.databases,
      ...categorized.cloud,
      ...categorized.devops,
      ...categorized.tools,
      ...categorized.other
    ]));

    const updatedCareerProfile: ExtendedCareerProfile = {
      ...(careerProfile || {}),
      education,
      degree,
      graduationYear,
      location,
      expectedSalary,
      preferredLocation,
      workPreference,
      categorizedSkills: categorized,
      preferences: {
        companyTypes: [companyType].filter(Boolean),
        timelineMonths: duration,
        dailyHours: timeAvailable
      },
      portfolioLinks: {
        github: githubUrl,
        linkedin: linkedinUrl,
        website: websiteUrl
      }
    };

    try {
      if (onSaveProfile) {
        await onSaveProfile({
          fullName: personalName,
          targetRole,
          targetLevel: userLevel,
          targetCompany,
          companyType,
          specialization,
          experienceLevel,
          targetTimeline: duration,
          timeAvailable,
          currentSkills: JSON.stringify(allSkills),
          careerProfile: JSON.stringify(updatedCareerProfile)
        });
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save profile:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* 1. Header & Save Action Bar */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="default" className="text-[9px] font-mono bg-[#2563EB]/10 text-[#60a5fa] border-[#2563EB]/20">
              Your Data • Postgres Isolated
            </Badge>
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#60a5fa]" /> Career Profile & Preferences
          </h2>
          <p className="text-xs text-gray-400">
            Define your technical competencies, seniority benchmarks, and target company criteria.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="flex items-center gap-1 text-xs font-mono text-emerald-400 font-bold animate-fade-in">
              <Check className="w-4 h-4 stroke-[3px]" /> Saved
            </span>
          )}
          <Button
            onClick={handleSaveAll}
            disabled={isSaving}
            variant="primary"
            className="text-xs font-bold py-2 px-4 flex items-center gap-1.5 shadow-lg shadow-[#2563EB]/20"
          >
            <Save className="w-3.5 h-3.5" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </section>

      {/* 2. Navigation Tabs for Sections */}
      <div className="flex flex-wrap gap-2 border-b border-white/5 pb-3">
        {[
          { id: "personal", label: "Personal Info", icon: User },
          { id: "career", label: "Career Targets", icon: Briefcase },
          { id: "skills", label: "Categorized Skills", icon: Code },
          { id: "preferences", label: "Work Preferences", icon: Sliders },
          { id: "portfolio", label: "Portfolio & Socials", icon: Globe }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? "bg-[#2563EB]/15 text-white border border-[#2563EB]/30 shadow-sm"
                  : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#60a5fa]" : "text-gray-400"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Tab Content */}
      <div className="space-y-6">
        
        {/* SECTION 1: PERSONAL INFORMATION */}
        {activeSection === "personal" && (
          <Card className="p-6 space-y-4 bg-[#111827] border-white/10">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <h3 className="text-xs uppercase font-extrabold text-white tracking-wider flex items-center gap-2">
                <User className="w-4 h-4 text-[#60a5fa]" /> Personal & Academic Background
              </h3>
              <Badge variant="default" className="text-[9px] font-mono">Profile Foundation</Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-4 pt-2">
              <Input 
                label="Full Name"
                value={personalName}
                onChange={(e) => setPersonalName(e.target.value)}
                placeholder="e.g. Alex Rivera"
              />

              <Input 
                label="Registered Email (Account Key)"
                value={personalEmail}
                onChange={(e) => setPersonalEmail(e.target.value)}
                disabled
                placeholder="name@email.com"
              />

              <Input 
                label="University / Institution"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="e.g. Stanford University / Tech Institute"
              />

              <Input 
                label="Degree / Major"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                placeholder="e.g. B.S. Computer Science"
              />

              <Input 
                label="Graduation Year"
                value={graduationYear}
                onChange={(e) => setGraduationYear(e.target.value)}
                placeholder="e.g. 2024"
              />

              <Input 
                label="Current Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. San Francisco, CA / Bengaluru, India"
              />
            </div>
          </Card>
        )}

        {/* SECTION 2: CAREER TARGETS */}
        {activeSection === "career" && (
          <Card className="p-6 space-y-4 bg-[#111827] border-white/10">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <h3 className="text-xs uppercase font-extrabold text-white tracking-wider flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#60a5fa]" /> Career Goal & Seniority Targets
              </h3>
              <Badge variant="default" className="text-[9px] font-mono">Evaluation Driver</Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-4 pt-2">
              <Input 
                label="Target Engineering Role"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Frontend Engineer"
              />

              <Select 
                label="Target Seniority Benchmark"
                value={userLevel}
                onChange={(e) => setUserLevel(e.target.value)}
                options={[
                  { value: "L3", label: "L3 — Software Engineer I (Junior/Entry)" },
                  { value: "L4", label: "L4 — Software Engineer II (Mid-Level)" },
                  { value: "L5", label: "L5 — Senior Software Engineer" },
                  { value: "L6", label: "L6 — Staff Software Engineer" }
                ]}
              />

              <Select
                label="Experience Level"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                options={[
                  { value: "Student", label: "Student" },
                  { value: "Fresher", label: "Fresher / Recent Graduate" },
                  { value: "0–1 years", label: "0–1 years professional" },
                  { value: "1–2 years", label: "1–2 years professional" },
                  { value: "2–3 years", label: "2–3 years professional" },
                  { value: "3+ years", label: "3+ years professional" }
                ]}
              />

              <Input 
                label="Expected Target Salary"
                value={expectedSalary}
                onChange={(e) => setExpectedSalary(e.target.value)}
                placeholder="e.g. $130,000 / ₹18,00,000"
              />

              <Input 
                label="Preferred Job Location"
                value={preferredLocation}
                onChange={(e) => setPreferredLocation(e.target.value)}
                placeholder="e.g. New York, Remote, or London"
              />

              <Select 
                label="Work Setting Mode"
                value={workPreference}
                onChange={(e) => setWorkPreference(e.target.value as any)}
                options={[
                  { value: "Remote", label: "Fully Remote" },
                  { value: "Hybrid", label: "Hybrid (1-3 days on-site)" },
                  { value: "On-site", label: "On-site" }
                ]}
              />
            </div>
          </Card>
        )}

        {/* SECTION 3: CATEGORIZED SKILLS */}
        {activeSection === "skills" && (
          <Card className="p-6 space-y-5 bg-[#111827] border-white/10">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <div>
                <h3 className="text-xs uppercase font-extrabold text-white tracking-wider flex items-center gap-2">
                  <Code className="w-4 h-4 text-[#60a5fa]" /> Technical Skills Inventory
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Organized by engineering category. These feed your Skill Gap Analyzer and AI Roadmap.
                </p>
              </div>
              <Badge variant="default" className="text-[9px] font-mono">{currentSkills.length} Total Verified</Badge>
            </div>

            {/* Quick add bar */}
            <div className="p-3 bg-white/2 rounded-xl border border-white/5 flex flex-col sm:flex-row gap-2.5 items-center">
              <select
                value={selectedSkillCategory}
                onChange={(e) => setSelectedSkillCategory(e.target.value as any)}
                className="bg-[#1f2937] border border-white/10 rounded-lg text-xs font-mono text-white px-3 py-2 shrink-0 outline-none"
              >
                <option value="languages">Languages</option>
                <option value="frameworks">Frameworks & Libraries</option>
                <option value="databases">Databases & Storage</option>
                <option value="cloud">Cloud & Infra</option>
                <option value="devops">DevOps & Tooling</option>
                <option value="tools">Tools</option>
                <option value="other">Other Concepts</option>
              </select>

              <div className="flex-1 flex gap-2 w-full">
                <input
                  type="text"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                  placeholder={`Add skill to ${selectedSkillCategory}... (press Enter)`}
                  className="w-full bg-[#111827] border border-white/10 rounded-lg text-xs text-white px-3 py-2 outline-none focus:border-[#2563EB]"
                />
                <Button 
                  onClick={handleAddSkill}
                  variant="primary"
                  className="px-3 py-2 text-xs font-bold shrink-0 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </Button>
              </div>
            </div>

            {/* Categorized Displays */}
            <div className="grid md:grid-cols-2 gap-4 pt-2">
              {[
                { key: "languages", title: "Programming Languages" },
                { key: "frameworks", title: "Frameworks & Libraries" },
                { key: "databases", title: "Databases & Storage" },
                { key: "cloud", title: "Cloud Platforms" },
                { key: "devops", title: "DevOps & CI/CD" },
                { key: "tools", title: "Development Tools" }
              ].map(({ key, title }) => {
                const skillsList = categorized[key as keyof CategorizedSkills] || [];
                return (
                  <div key={key} className="p-3.5 rounded-xl bg-white/2 border border-white/5 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono uppercase font-bold text-gray-400">{title}</span>
                      <span className="text-[9px] font-mono text-gray-500">{skillsList.length}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 min-h-[32px] items-center">
                      {skillsList.length === 0 ? (
                        <span className="text-[10px] text-gray-600 italic">No skills listed yet</span>
                      ) : (
                        skillsList.map((skill, idx) => (
                          <span 
                            key={idx}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#93c5fd] text-xs font-medium"
                          >
                            {skill}
                            <button 
                              onClick={() => handleRemoveSkill(key as keyof CategorizedSkills, skill)}
                              className="text-gray-400 hover:text-red-400 ml-0.5"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* SECTION 4: WORK PREFERENCES */}
        {activeSection === "preferences" && (
          <Card className="p-6 space-y-4 bg-[#111827] border-white/10">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <h3 className="text-xs uppercase font-extrabold text-white tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#60a5fa]" /> Preparation Schedule & Company Preference
              </h3>
              <Badge variant="default" className="text-[9px] font-mono">Roadmap Pacing</Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-4 pt-2">
              <Input
                label="Target Company / Organization"
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                placeholder="e.g. Google, Stripe, or Startups"
              />

              <Select
                label="Company Tier Preference"
                value={companyType}
                onChange={(e) => setCompanyType(e.target.value)}
                options={[
                  { value: "Product Company", label: "Product-Based Company (Deep DSA & System Design)" },
                  { value: "Service Company", label: "Service-Based Company (Aptitude & CS Basics)" },
                  { value: "Startup", label: "High-Growth Tech Startup (Full-Stack / Fast Delivery)" },
                  { value: "Consulting", label: "Technology Consulting" },
                  { value: "Government", label: "Government / Public Sector" },
                  { value: "Not sure", label: "Open / Undecided" }
                ]}
              />

              <Select
                label="Preparation Timeline Horizon"
                value={duration.toString()}
                onChange={(e) => setDuration(parseInt(e.target.value, 10) || 3)}
                options={[
                  { value: "1", label: "1 Month (Intensive Sprint)" },
                  { value: "2", label: "2 Months (Focused Pace)" },
                  { value: "3", label: "3 Months (Standard Engineering Track)" },
                  { value: "4", label: "4 Months (Comprehensive Prep)" },
                  { value: "6", label: "6 Months (Foundational to Advanced)" }
                ]}
              />

              <Select
                label="Daily Available Study Time"
                value={timeAvailable}
                onChange={(e) => setTimeAvailable(e.target.value)}
                options={[
                  { value: "30 min", label: "30 minutes / day" },
                  { value: "1 hour", label: "1 hour / day" },
                  { value: "2 hours", label: "2 hours / day (Recommended)" },
                  { value: "3 hours", label: "3 hours / day" },
                  { value: "4+ hours", label: "4+ hours / day (Full-time)" }
                ]}
              />
            </div>
          </Card>
        )}

        {/* SECTION 5: PORTFOLIO & SOCIALS */}
        {activeSection === "portfolio" && (
          <Card className="p-6 space-y-4 bg-[#111827] border-white/10">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <h3 className="text-xs uppercase font-extrabold text-white tracking-wider flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#60a5fa]" /> Online Presence & Portfolio Links
              </h3>
              <Badge variant="default" className="text-[9px] font-mono">Recruiter Visibility</Badge>
            </div>

            <div className="space-y-3 pt-2">
              <Input 
                label="GitHub Profile URL"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/yourhandle"
              />

              <Input 
                label="LinkedIn Profile URL"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/in/yourhandle"
              />

              <Input 
                label="Personal Website / Portfolio URL"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://yourportfolio.dev"
              />
            </div>
          </Card>
        )}

      </div>

      {/* 4. Security & Data Isolation Notice */}
      <Card className="p-4 bg-[#111827] border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <p className="text-[11px] text-gray-400">
            All profile records are isolated by authenticated Supabase UUID in PostgreSQL. Data is never exposed or shared with external parties.
          </p>
        </div>
        <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase shrink-0">Encrypted</span>
      </Card>

    </div>
  );
}

