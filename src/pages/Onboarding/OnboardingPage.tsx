import React, { useState } from "react";
import { Compass, Sparkles, BookOpen, Clock, Target, ArrowRight, ArrowLeft, Upload, Check, AlertCircle } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Badge from "../../components/ui/Badge";
import Textarea from "../../components/ui/Textarea";

interface OnboardingPageProps {
  onComplete: (data: {
    targetRole: string;
    targetCompany: string;
    companyType: string;
    specialization: string;
    experienceLevel: string;
    currentSkills: string[];
    timeAvailable: string;
    targetTimeline: number;
    resumeText?: string;
  }) => Promise<void>;
  loading: boolean;
}

export default function OnboardingPage({ onComplete, loading }: OnboardingPageProps) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);

  // States for step questions
  const [targetRole, setTargetRole] = useState("Software Engineer");
  const [customRole, setCustomRole] = useState("");
  
  const [targetCompany, setTargetCompany] = useState("");
  const [customCompany, setCustomCompany] = useState("");
  
  const [companyType, setCompanyType] = useState("Product Company");
  
  const [specialization, setSpecialization] = useState("Backend");
  
  const [experienceLevel, setExperienceLevel] = useState("Fresher");
  
  const [skillsSelected, setSkillsSelected] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState("");
  
  const [timeAvailable, setTimeAvailable] = useState("2 hours");
  
  const [targetTimeline, setTargetTimeline] = useState("4 months");
  
  const [resumeText, setResumeText] = useState("");

  const popularSkills = ["JavaScript", "TypeScript", "React", "Node.js", "Python", "SQL", "Docker", "Git", "Java", "C++", "AWS"];

  const handleToggleSkill = (skill: string) => {
    if (skillsSelected.includes(skill)) {
      setSkillsSelected(skillsSelected.filter(s => s !== skill));
    } else {
      setSkillsSelected([...skillsSelected, skill]);
    }
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSkill.trim() && !skillsSelected.includes(customSkill.trim())) {
      setSkillsSelected([...skillsSelected, customSkill.trim()]);
      setCustomSkill("");
    }
  };

  const handleNext = () => {
    setError(null);
    if (step === 1 && targetRole === "Other" && !customRole.trim()) {
      setError("Please specify your custom target role.");
      return;
    }
    if (step === 2 && targetCompany === "Other" && !customCompany.trim()) {
      setError("Please specify your target company name.");
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setError(null);
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    setError(null);
    const finalRole = targetRole === "Other" ? customRole : targetRole;
    
    let finalCompany = "";
    if (targetCompany === "I haven't decided yet") {
      finalCompany = "Undecided";
    } else if (targetCompany === "Other") {
      finalCompany = customCompany;
    } else {
      finalCompany = targetCompany;
    }

    const monthsMapping: Record<string, number> = {
      "1 month": 1,
      "2 months": 2,
      "3 months": 3,
      "4 months": 4,
      "6 months": 6
    };
    const finalTimeline = monthsMapping[targetTimeline] || 3;

    try {
      await onComplete({
        targetRole: finalRole,
        targetCompany: finalCompany,
        companyType,
        specialization,
        experienceLevel,
        currentSkills: skillsSelected,
        timeAvailable,
        targetTimeline: finalTimeline,
        resumeText: resumeText.trim() ? resumeText.trim() : undefined
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong while generating your plan.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-200 flex flex-col justify-between p-6 md:p-10 font-sans">
      
      {/* 1. Header progress tracking */}
      <header className="max-w-xl mx-auto w-full mb-8 space-y-3 shrink-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#2563EB] to-[#8b5cf6] flex items-center justify-center border border-white/10 shadow-lg shadow-[#2563EB]/10">
              <Compass className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-white uppercase font-bold">CareerCopilot</span>
          </div>
          <div className="text-[10px] font-mono text-gray-400 font-bold">
            Step {step} of 9
          </div>
        </div>
        {/* Progress segments bar */}
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex gap-1">
          {Array.from({ length: 9 }).map((_, idx) => (
            <div 
              key={idx} 
              className={`h-full flex-1 transition-all duration-500 rounded-full ${
                idx + 1 <= step 
                  ? "bg-gradient-to-r from-[#2563EB] to-[#8b5cf6]" 
                  : "bg-white/5"
              }`}
            />
          ))}
        </div>
      </header>

      {/* 2. Main Question Card wrapper */}
      <main className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center">
        <Card variant="elevated" className="border-white/10 p-6 md:p-8 space-y-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Sparkles className="w-20 h-20 text-white" />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/25 p-3 rounded-lg text-[10.5px] text-red-300 flex gap-2 items-start">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: Target Role */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <Badge variant="info">Specialization Goal</Badge>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">What role are you preparing for?</h2>
                <p className="text-[11px] text-gray-400">Specify the engineering field or title you target.</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {["Software Engineer", "Frontend Engineer", "Backend Engineer", "Full Stack Engineer", "Data Analyst", "Data Scientist", "DevOps Engineer", "Other"].map(role => (
                  <button
                    key={role}
                    onClick={() => { setTargetRole(role); setError(null); }}
                    className={`p-3 text-[10.5px] rounded-xl border text-left transition-all ${targetRole === role ? "bg-[#2563EB]/10 border-[#2563EB] text-white font-bold" : "border-white/5 bg-white/2 hover:border-white/20 text-gray-300"}`}
                  >
                    {role}
                  </button>
                ))}
              </div>
              {targetRole === "Other" && (
                <Input
                  label="Specify Title"
                  placeholder="e.g., Mobile Architect, Cloud Architect"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  className="text-xs"
                />
              )}
            </div>
          )}

          {/* STEP 2: Target Company */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <Badge variant="info">Placement Goal</Badge>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">Which company are you targeting?</h2>
                <p className="text-[11px] text-gray-400">We will align materials toward their verified interview loop requirements.</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {["Google", "Microsoft", "Amazon", "Infosys", "TCS", "Accenture", "I haven't decided yet", "Other"].map(comp => (
                  <button
                    key={comp}
                    onClick={() => { setTargetCompany(comp); setError(null); }}
                    className={`p-3 text-[10.5px] rounded-xl border text-left transition-all ${targetCompany === comp ? "bg-[#2563EB]/10 border-[#2563EB] text-white font-bold" : "border-white/5 bg-white/2 hover:border-white/20 text-gray-300"}`}
                  >
                    {comp}
                  </button>
                ))}
              </div>
              {targetCompany === "Other" && (
                <Input
                  label="Company Name"
                  placeholder="e.g., Stripe, Vercel"
                  value={customCompany}
                  onChange={(e) => setCustomCompany(e.target.value)}
                  className="text-xs"
                />
              )}
            </div>
          )}

          {/* STEP 3: Company Type */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <Badge variant="info">Company Category</Badge>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">What type of company is it?</h2>
                <p className="text-[11px] text-gray-400">Helps tailor priorities (Product scalability vs. Service fundamentals).</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {["Product Company", "Service Company", "Startup", "Consulting", "Government", "Not sure"].map(type => (
                  <button
                    key={type}
                    onClick={() => { setCompanyType(type); setError(null); }}
                    className={`p-3 text-[10.5px] rounded-xl border text-left transition-all ${companyType === type ? "bg-[#2563EB]/10 border-[#2563EB] text-white font-bold" : "border-white/5 bg-white/2 hover:border-white/20 text-gray-300"}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Specialization focus */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <Badge variant="info">Engineering Focus</Badge>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">What area do you want to focus on?</h2>
                <p className="text-[11px] text-gray-400">Specialize study guidelines (UI performance, backend systems, or networks).</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {["Frontend", "Backend", "Full Stack", "Mobile", "Systems", "Not sure"].map(spec => (
                  <button
                    key={spec}
                    onClick={() => { setSpecialization(spec); setError(null); }}
                    className={`p-3 text-[10.5px] rounded-xl border text-left transition-all ${specialization === spec ? "bg-[#2563EB]/10 border-[#2563EB] text-white font-bold" : "border-white/5 bg-white/2 hover:border-white/20 text-gray-300"}`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: Experience Level */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <Badge variant="info">Seniority Level</Badge>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">What is your current experience level?</h2>
                <p className="text-[11px] text-gray-400">Sets starting complexity of interview and design tasks.</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {["Student", "Fresher", "0–1 years", "1–2 years", "2–3 years", "3+ years"].map(exp => (
                  <button
                    key={exp}
                    onClick={() => { setExperienceLevel(exp); setError(null); }}
                    className={`p-3 text-[10.5px] rounded-xl border text-left transition-all ${experienceLevel === exp ? "bg-[#2563EB]/10 border-[#2563EB] text-white font-bold" : "border-white/5 bg-white/2 hover:border-white/20 text-gray-300"}`}
                  >
                    {exp}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: Current Skills */}
          {step === 6 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <Badge variant="info">Skills Inventory</Badge>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">Select your current skills</h2>
                <p className="text-[11px] text-gray-400">Choose technologies you already have basic understanding of.</p>
              </div>
              
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1 border border-white/5 rounded-xl bg-white/2">
                {popularSkills.map(skill => {
                  const selected = skillsSelected.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleToggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] border transition-all ${selected ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400 font-bold" : "border-white/10 text-gray-400 hover:text-white"}`}
                    >
                      {skill} {selected && "✓"}
                    </button>
                  );
                })}
              </div>

              <form onSubmit={handleAddCustomSkill} className="flex gap-2">
                <Input
                  placeholder="Add custom skill (e.g. Postgres)"
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  className="flex-1 text-xs"
                />
                <Button type="submit" variant="outline" className="text-[10px] px-3.5">Add</Button>
              </form>

              {skillsSelected.length > 0 && (
                <div className="space-y-1 pt-1.5">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-gray-400 block">Selected:</span>
                  <div className="flex flex-wrap gap-1">
                    {skillsSelected.map(s => (
                      <Badge key={s} variant="default" className="text-[9.5px]">
                        {s} <button type="button" className="text-red-400 pl-1 font-bold" onClick={() => handleToggleSkill(s)}>×</button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 7: Daily Preparation Time */}
          {step === 7 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <Badge variant="info">Time Available</Badge>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">How much time can you prepare each day?</h2>
                <p className="text-[11px] text-gray-400">Plan workloads around your availability. We won't generate excessive milestones.</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {["30 min", "1 hour", "2 hours", "3 hours", "4+ hours"].map(time => (
                  <button
                    key={time}
                    onClick={() => { setTimeAvailable(time); setError(null); }}
                    className={`p-3 text-[10.5px] rounded-xl border text-left transition-all ${timeAvailable === time ? "bg-[#2563EB]/10 border-[#2563EB] text-white font-bold" : "border-white/5 bg-white/2 hover:border-white/20 text-gray-300"}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 8: Target Timeline */}
          {step === 8 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <Badge variant="info">Prep Timeline</Badge>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">When do you want to be ready?</h2>
                <p className="text-[11px] text-gray-400">Sets the total number of preparation weeks (e.g. 4 months = 16 weeks).</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {["1 month", "2 months", "3 months", "4 months", "6 months"].map(time => (
                  <button
                    key={time}
                    onClick={() => { setTargetTimeline(time); setError(null); }}
                    className={`p-3 text-[10.5px] rounded-xl border text-left transition-all ${targetTimeline === time ? "bg-[#2563EB]/10 border-[#2563EB] text-white font-bold" : "border-white/5 bg-white/2 hover:border-white/20 text-gray-300"}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 9: Resume Upload (Optional) */}
          {step === 9 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <Badge variant="info">Resume (Optional)</Badge>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">Paste your resume to optimize details</h2>
                <p className="text-[11px] text-gray-400">Enables evidence checks and skill gaps auditing immediately. Feel free to skip.</p>
              </div>
              
              <Textarea
                placeholder="Paste raw text details of your resume..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={5}
                className="text-xs"
              />

              <div className="flex gap-2">
                <Button
                  onClick={handleSubmit}
                  loading={loading}
                  variant="primary"
                  className="flex-1 py-2 text-[10px]"
                >
                  {resumeText.trim() ? "Compile with Resume" : "Generate Plan"}
                </Button>
                
                {!resumeText.trim() && (
                  <Button
                    onClick={handleSubmit}
                    loading={loading}
                    variant="outline"
                    className="text-[10px] px-5"
                  >
                    Skip & Generate
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Footer Navigation Buttons */}
          {step < 9 && (
            <div className="flex justify-between items-center pt-4 border-t border-white/5">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1 uppercase tracking-wider font-bold"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : (
                <div />
              )}
              <Button
                onClick={handleNext}
                variant="primary"
                className="text-[10px] px-6 py-2"
              >
                Continue <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          )}

        </Card>
      </main>

      {/* 3. Footer branding */}
      <footer className="text-center text-[10px] text-gray-500 font-mono mt-8">
        Synced via secure SSL channels • Aether Operations Core v9.1
      </footer>

    </div>
  );
}
