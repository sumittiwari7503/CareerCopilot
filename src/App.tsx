import React, { useState, useEffect } from "react";
import { 
  Compass, 
  Map, 
  UserCheck, 
  TrendingUp, 
  BookOpen, 
  Settings, 
  Briefcase, 
  Plus, 
  ArrowRight, 
  Check, 
  Lock, 
  Award, 
  Volume2, 
  Sparkles, 
  Mic, 
  Send, 
  Terminal, 
  LogOut, 
  AlertTriangle,
  Flame,
  ChevronDown,
  Fingerprint,
  Info,
  X,
  CheckCircle2,
  Trash2,
  HelpCircle,
  Play,
  Pause,
  Star
} from "lucide-react";
import { CareerRoadmap, ResumeAnalysis, InterviewQuestionResponse, InterviewSummary, JobCard, DailyMission } from "./types";
import { TESTIMONIALS, FAQS, INITIAL_JOBS, INITIAL_MISSIONS, SKILL_GAP_DATA } from "./constants";

export default function App() {
  const [activeTab, setActiveTab] = useState<"home" | "roadmap" | "coach" | "jobs" | "tracker" | "settings">("home");
  
  const [user, setUser] = useState({
    name: "Alex Rivera",
    role: "Senior Frontend Engineer",
    targetRole: "SDE at Google",
    company: "Google",
    level: "L5",
    isElite: true,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBg8bfg2rEfTRME6dzaMDMzwplwTyDYxg4I2Yl2T37nIAzA07DybYYGPiUcNCo7Vq06GZu4p3fJ8AAMnnRZQjfwYyQ3MaAOTEdeKalB1RuhSBuWwIFDaWkiw3ifLbtuu8CGI9xnBXiREAdX-qn12noo1s9oQ60R5wyr4bqalVRLvwkm9nKX8y1EphMLHlGRaYWzs7NfrLtNAgPYPI5WXHo_xtU4TvP9sPk55Tw7sgMq4PCONSa1HyzW1sTUYECt5BoNnJeVg7QkNMCh",
    dailyScore: 92,
    streakDays: 12,
  });

  const [targetRole, setTargetRole] = useState("Frontend Engineer");
  const [duration, setDuration] = useState<number>(3);
  const [skillLevel, setSkillLevel] = useState<"Beginner" | "Intermediate">("Beginner");
  const [roadmap, setRoadmap] = useState<CareerRoadmap | null>(null);
  const [generatingRoadmap, setGeneratingRoadmap] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});

  const [resumeText, setResumeText] = useState("Alex Rivera\nSenior Web Developer\nSkills: React, TypeScript, Node.js\nExperience: Built modular micro frontend states. Reduced response loops by 40%.");
  const [isAnalyzingResume, setIsAnalyzingResume] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysis | null>({
    atsScore: 85,
    compatibilityText: "Good compatibility",
    missingKeywords: ["Docker", "GraphQL", "Kubernetes", "CI/CD Pipelines"],
    suggestions: [
      {
        type: "quantify",
        title: "Quantify Achievements",
        description: 'In "Project X", instead of "improved performance", explain specifically "optimized query speeds by 40% using Redis caching".',
        actionText: "Apply Fix"
      },
      {
        type: "alert",
        title: "Formatting Alert",
        description: "Your multi-column layout may cause issues with some legacy ATS systems. Consider a single-column layout.",
        actionText: "Format PDF"
      }
    ]
  });

  const [interviewActive, setInterviewActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("Tell me about a time you optimized app performance. What were the metrics, and how did you measure success?");
  const [userAnswer, setUserAnswer] = useState("");
  const [interviewRole, setInterviewRole] = useState("Senior Frontend Engineer");
  const [conversationHistory, setConversationHistory] = useState<{ q: string; a: string; score?: number }[]>([]);
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
  const [latestEvaluation, setLatestEvaluation] = useState<{ rating: number; confidence: string; pacingScore?: number; explanation?: string } | null>({
    rating: 92,
    confidence: "Confident",
    pacingScore: 95,
    explanation: "Awesome start. Let's drill deeper."
  });
  const [isListening, setIsListening] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [interviewSummary, setInterviewSummary] = useState<InterviewSummary | null>(null);
  const [waveformBars, setWaveformBars] = useState<number[]>(new Array(12).fill(12));

  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const [jobs, setJobs] = useState<JobCard[]>(INITIAL_JOBS);
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    status: "Wishlist" as JobCard["status"],
    priorityFlag: false,
    location: "Remote"
  });
  const [pipelineFilter, setPipelineFilter] = useState<string>("All");

  const [missions, setMissions] = useState<DailyMission[]>(INITIAL_MISSIONS);
  const [easySolved, setEasySolved] = useState(48);
  const [mediumSolved, setMediumSolved] = useState(74);
  const [hardSolved, setHardSolved] = useState(20);
  const [selectedDomain, setSelectedDomain] = useState<string>("All");

  const [personalName, setPersonalName] = useState("Alex Rivera");
  const [personalEmail, setPersonalEmail] = useState("alex.rivera@googlemail.com");
  const [pushNotifications, setPushNotifications] = useState(true);

  // Live waveform bouncing effect
  useEffect(() => {
    let interval: any;
    if (isListening || interviewActive) {
      interval = setInterval(() => {
        setWaveformBars(Array.from({ length: 12 }, () => Math.floor(Math.random() * 28) + 4));
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isListening, interviewActive]);

  useEffect(() => {
    generateRoadmap();
  }, []);

  const generateRoadmap = async () => {
    setGeneratingRoadmap(true);
    try {
      const res = await fetch("/api/generate-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: targetRole, duration, skillLevel })
      });
      if (res.ok) {
        const data = await res.json();
        setRoadmap(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGeneratingRoadmap(false);
    }
  };

  const handleCustomResumeAnalyze = async () => {
    setIsAnalyzingResume(true);
    try {
      const res = await fetch("/api/resume-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, targetRole: user.targetRole })
      });
      if (res.ok) {
        const data = await res.json();
        setAnalysisResult(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzingResume(false);
    }
  };

  const submitInterviewAnswer = async () => {
    const cleanAnswer = userAnswer.trim();
    if (!cleanAnswer) return;
    setIsSubmittingAnswer(true);
    try {
      const res = await fetch("/api/mock-interview/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: interviewRole,
          currentQuestion,
          userAnswer: cleanAnswer
        })
      });
      if (res.ok) {
        const data: InterviewQuestionResponse = await res.json();
        
        setConversationHistory(prev => [
          ...prev,
          { q: currentQuestion, a: cleanAnswer, score: data.evaluation?.rating || 85 }
        ]);
        setLatestEvaluation({
          rating: data.evaluation?.rating || 85,
          confidence: data.evaluation?.confidence || "Confident",
          pacingScore: data.evaluation?.pacingScore || 90,
          explanation: data.explanation || "Interesting point regarding metric tracking."
        });
        setCurrentQuestion(data.nextQuestion);
        setUserAnswer("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingAnswer(false);
    }
  };

  const endInterviewSession = async () => {
    setIsListening(false);
    try {
      const res = await fetch("/api/mock-interview/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: interviewRole,
          isEnding: true
        })
      });
      if (res.ok) {
        const data: InterviewSummary = await res.json();
        setInterviewSummary(data);
        setShowSummary(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleMission = (id: string) => {
    setMissions(missions.map(m => m.id === id ? { ...m, completed: !m.completed } : m));
  };

  const handleAddJobCard = () => {
    if (!newJob.title || !newJob.company) return;
    const item: JobCard = {
      id: "job-" + Date.now(),
      title: newJob.title,
      company: newJob.company,
      logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWQ_LJdQUOvsS60sXsRiUxL8iDAz1pZSEo3TnU6GMZvrKdC9qIon2_6h11WAZD_-lA5gAAy8AkgDa9uVzGRrzQtS_2rII3YB7qUk3Z4kxByymTbEQGUh8uXCDjhaxYs5TS3Uku_ExOfPzyqwHJPTT7U7psOYK9nbXN2UmOi7ujJ1JMdjIZSQ0S01E1f1YZEessjLll3mEhUJyPOa84OCIc9o6LSgg9MNfOO2zGzdEVzKlD-k8ZlQtAfL9r80vuZsrgebNbeCSNk9EW",
      date: "Added Today",
      status: newJob.status,
      priorityFlag: newJob.priorityFlag,
      location: newJob.location
    };
    setJobs([item, ...jobs]);
    setNewJob({ title: "", company: "", status: "Wishlist", priorityFlag: false, location: "Remote" });
    setShowAddJobModal(false);
  };

  const deleteJobCard = (id: string) => {
    setJobs(jobs.filter(j => j.id !== id));
  };

  const filteredJobs = pipelineFilter === "All" 
    ? jobs 
    : jobs.filter(j => j.status === pipelineFilter);

  return (
    <div className="min-h-screen pb-24 bg-[#0a0d14] text-[#dfe2f1] font-sans overflow-x-hidden relative select-none">
      
      {/* ----------------- GLOBAL HEADER / NAV ----------------- */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0d14]/80 backdrop-blur-md border-b border-white/10 flex justify-between items-center px-4 md:px-12 h-16 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("home")}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <span className="font-sans text-lg font-bold tracking-tight text-white flex items-center gap-1">
            CareerCopilot <span className="text-[9px] uppercase font-mono tracking-widest text-[#93c5fd] bg-[#1e293b] px-2 py-0.5 rounded-full border border-white/10">Aether AI</span>
          </span>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-semibold">
          <button onClick={() => setActiveTab("home")} className={`pb-1 transition-all border-b-2 hover:text-white ${activeTab === "home" ? "border-[#60a5fa] text-white" : "border-transparent text-gray-400"}`}>Home</button>
          <button onClick={() => setActiveTab("roadmap")} className={`pb-1 transition-all border-b-2 hover:text-white ${activeTab === "roadmap" ? "border-[#60a5fa] text-white" : "border-transparent text-gray-400"}`}>Planning</button>
          <button onClick={() => setActiveTab("coach")} className={`pb-1 transition-all border-b-2 hover:text-white ${activeTab === "coach" ? "border-[#60a5fa] text-white" : "border-transparent text-gray-400"}`}>AI Coach</button>
          <button onClick={() => setActiveTab("jobs")} className={`pb-1 transition-all border-b-2 hover:text-white ${activeTab === "jobs" ? "border-[#60a5fa] text-white" : "border-transparent text-gray-400"}`}>Pipeline</button>
          <button onClick={() => setActiveTab("tracker")} className={`pb-1 transition-all border-b-2 hover:text-white ${activeTab === "tracker" ? "border-[#60a5fa] text-white" : "border-transparent text-gray-400"}`}>DSA Tracker</button>
        </nav>

        {/* Premium Profile Indicator */}
        <div 
          onClick={() => setActiveTab("settings")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-semibold text-white group-hover:text-[#60a5fa] transition-colors">{personalName}</span>
            <span className="text-[9px] text-[#4ade80] font-mono tracking-wider flex items-center justify-end gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] inline-block animate-pulse"></span> ONLINE
            </span>
          </div>
          <div className="w-8 h-8 rounded-full border border-white/20 overflow-hidden bg-cover bg-center transition-transform group-active:scale-95">
            <img 
              src={user.avatar} 
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* ----------------- SUB NAVIGATION FOR MOBILE ----------------- */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#0a0d14]/95 backdrop-blur-lg border-t border-white/10 grid grid-cols-5 z-40 py-2 text-[10px] text-center text-gray-400">
        <button onClick={() => setActiveTab("home")} className={`flex flex-col items-center gap-1 ${activeTab === "home" ? "text-[#60a5fa]" : ""}`}>
          <Compass className="w-4 h-4" />
          <span>Home</span>
        </button>
        <button onClick={() => setActiveTab("roadmap")} className={`flex flex-col items-center gap-1 ${activeTab === "roadmap" ? "text-[#60a5fa]" : ""}`}>
          <Map className="w-4 h-4" />
          <span>Planning</span>
        </button>
        <button onClick={() => setActiveTab("coach")} className={`flex flex-col items-center gap-1 ${activeTab === "coach" ? "text-[#60a5fa]" : ""}`}>
          <Mic className="w-4 h-4" />
          <span>Coach</span>
        </button>
        <button onClick={() => setActiveTab("jobs")} className={`flex flex-col items-center gap-1 ${activeTab === "jobs" ? "text-[#60a5fa]" : ""}`}>
          <Briefcase className="w-4 h-4" />
          <span>Pipeline</span>
        </button>
        <button onClick={() => setActiveTab("tracker")} className={`flex flex-col items-center gap-1 ${activeTab === "tracker" ? "text-[#60a5fa]" : ""}`}>
          <TrendingUp className="w-4 h-4" />
          <span>DSA</span>
        </button>
      </div>

      {/* ----------------- MAIN CONTENTS CONTAINER ----------------- */}
      <main className="pt-24 px-4 max-w-xl mx-auto space-y-8 pb-10">
        
        {/* ==================== TAB 1: HOME ==================== */}
        {activeTab === "home" && (
          <div className="space-y-6">
            
            {/* Custom Welcome Banner */}
            <section className="bg-gradient-to-r from-[#111827] to-[#1f2937] p-6 rounded-2xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles className="w-24 h-24 text-white" />
              </div>
              <div className="space-y-2 relative z-10">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#1d4ed8]/40 border border-[#3b82f6]/40 text-[10px] text-[#93c5fd] font-bold uppercase tracking-wider">
                  <Award className="w-3 h-3 text-[#60a5fa]" /> Elite Access Enabled
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Welcome, {personalName}</h2>
                <p className="text-sm text-gray-300 leading-relaxed">
                  You are currently tethering preparation for <span className="text-[#60a5fa] font-bold">{user.targetRole}</span> with a steady 6-month readiness roadmap.
                </p>
                <div className="flex gap-4 pt-2 text-xs text-gray-400 font-mono">
                  <span className="flex items-center gap-1"><Flame className="w-4 h-4 text-orange-400 fill-orange-400" /> {user.streakDays} Day Streak</span>
                  <span className="flex items-center gap-1"><UserCheck className="w-4 h-4 text-emerald-400" /> Score: {user.dailyScore}%</span>
                </div>
              </div>
            </section>

            {/* Daily Missions Checklist */}
            <section className="bg-[#111827] p-5 rounded-2xl border border-white/5 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm uppercase tracking-wider font-bold text-gray-300 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#60a5fa]" /> Daily Missions
                </h3>
                <span className="text-[10px] font-mono text-gray-400">({missions.filter(m => m.completed).length}/{missions.length} Done)</span>
              </div>
              
              <div className="space-y-3">
                {missions.map(m => (
                  <div 
                    key={m.id} 
                    onClick={() => toggleMission(m.id)}
                    className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 hover:border-white/10 transition-colors cursor-pointer"
                  >
                    <div className={`w-4 h-4 mt-0.5 rounded border flex items-center justify-center transition-all ${m.completed ? "bg-[#34d399] border-[#34d399]" : "border-white/35"}`}>
                      {m.completed && <Check className="w-3 h-3 text-slate-900 stroke-[3px]" />}
                    </div>
                    <div>
                      <p className={`text-xs font-semibold ${m.completed ? "line-through text-gray-500" : "text-gray-200"}`}>{m.description}</p>
                      <span className="text-[10px] text-gray-400 font-mono italic">{m.metadata}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Skill Gap Data / Target metrics */}
            <section className="bg-[#111827] p-5 rounded-2xl border border-white/5 space-y-4">
              <h3 className="text-sm uppercase tracking-wider font-bold text-gray-300 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#c084fc]" /> Target Skill Competency Gap
              </h3>
              <div className="space-y-4 pt-1">
                {SKILL_GAP_DATA.map((skill, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-gray-400 font-mono">Current: <b className="text-white">{skill.current}%</b> / Target: {skill.target}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden relative">
                      <div className="absolute inset-y-0 left-0 bg-white/20 rounded-full" style={{ width: `${skill.target}%` }}></div>
                      <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] rounded-full" style={{ width: `${skill.current}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Real FAQS */}
            <section className="space-y-3">
              <h3 className="text-sm uppercase tracking-wider font-bold text-gray-300 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#818cf8]" /> Frequently Asked Questions
              </h3>
              
              <div className="space-y-2">
                {FAQS.map(faq => (
                  <div key={faq.id} className="bg-[#111827] rounded-xl border border-white/5 transition-all overflow-hidden">
                    <button 
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                    >
                      <span className="text-xs font-bold text-white">{faq.question}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${expandedFaq === faq.id ? "rotate-180" : ""}`} />
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="px-4 pb-4 pt-1 text-[11px] text-gray-400 leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Testimonials */}
            <section className="space-y-3">
              <h3 className="text-sm uppercase tracking-wider font-bold text-gray-300 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> Candidate Placements Feedback
              </h3>
              <div className="grid gap-3">
                {TESTIMONIALS.map((t, idx) => (
                  <div key={idx} className="bg-[#111827]/50 p-4 rounded-xl border border-white/5 text-xs text-gray-300 space-y-2">
                    <p className="italic leading-relaxed">"{t.quote}"</p>
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full overflow-hidden bg-white/15">
                        <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-bold text-white text-[11px]">{t.name} • <span className="text-gray-400 text-[10px] font-normal">{t.role}</span></span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* ==================== TAB 2: ROADMAPS ==================== */}
        {activeTab === "roadmap" && (
          <div className="space-y-6">
            
            {/* Header description */}
            <section className="space-y-1.5">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Map className="w-5 h-5 text-[#3b82f6]" /> Multi-Month Prep Planning
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                Configure your expected planning tethers to generate procedural or automated target sequences below.
              </p>
            </section>

            {/* Configuration Box */}
            <section className="bg-[#111827] p-5 rounded-2xl border border-white/5 space-y-5">
              
              {/* Target Role Selector */}
              <div>
                <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1.5">Target Engineering Role</label>
                <div className="relative">
                  <select 
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full bg-[#1f2937] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white uppercase tracking-wider font-bold focus:outline-none focus:ring-1 focus:ring-[#3b82f6]"
                  >
                    <option value="Frontend Engineer">Frontend Engineer</option>
                    <option value="Backend Engineer">Backend Engineer</option>
                    <option value="Fullstack Developer">Fullstack Developer</option>
                    <option value="SDE at Google">SDE at Google</option>
                  </select>
                </div>
              </div>

              {/* Slider for months */}
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Timeline Duration</label>
                  <span className="text-xs text-[#3b82f6] font-bold bg-[#3b82f6]/10 px-2.5 py-0.5 rounded-md border border-[#3b82f6]/20 font-mono">{duration} Months</span>
                </div>
                <input 
                  type="range"
                  min="1"
                  max="6"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="w-full h-1 bg-[#1e293b] rounded-lg cursor-pointer focus:outline-none accent-[#3b82f6]"
                />
              </div>

              {/* Skill level */}
              <div>
                <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1.5 flex justify-between">Complexity Tier</label>
                <div className="grid grid-cols-2 gap-3">
                  {["Beginner", "Intermediate"].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSkillLevel(level as any)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${skillLevel === level ? "bg-[#3b82f6]/10 border-[#3b82f6] text-white" : "border-white/5 text-gray-400 hover:bg-white/5"}`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate button */}
              <button
                onClick={generateRoadmap}
                disabled={generatingRoadmap}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white font-bold text-xs uppercase tracking-wider hover:scale-[1.01] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {generatingRoadmap ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin"></span>
                    <span>AI Tethering Roadmap...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate AI Roadmap</span>
                  </>
                )}
              </button>
            </section>

            {/* Interactive ATS Resume Screener */}
            <section className="bg-[#111827] p-5 rounded-2xl border border-white/5 space-y-4">
              <div className="flex items-center gap-2">
                <Fingerprint className="w-4 h-4 text-[#c084fc]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Live Resume ATS Screener</h3>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Check credentials against standard candidate extraction models. Correct structures to pass recruitment screening loops.
              </p>

              <div className="space-y-3">
                <textarea 
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste or type resume details to analyze..."
                  rows={4}
                  className="w-full bg-[#1f2937] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#3b82f6]"
                />

                <button 
                  onClick={handleCustomResumeAnalyze}
                  disabled={isAnalyzingResume}
                  className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  {isAnalyzingResume ? "AI Screening Resume..." : "Submit to Parser Screening"}
                </button>
              </div>

              {analysisResult && (
                <div className="pt-4 border-t border-white/5 space-y-4">
                  <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                    <div>
                      <p className="text-[9px] uppercase tracking-wider font-bold text-gray-400">ATS Scorer index</p>
                      <h4 className="text-lg font-mono font-bold text-[#34d399]">{analysisResult.atsScore}/100</h4>
                    </div>
                    <span className="text-[10px] font-bold text-white bg-[#10b981]/20 border border-[#10b981]/30 py-1 px-3 rounded-full">
                      {analysisResult.compatibilityText}
                    </span>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Quantifiable Suggestions</p>
                    {analysisResult.suggestions.map((s, idx) => (
                      <div key={idx} className="p-3 bg-white/5 rounded-xl border-l-2 border-[#60a5fa] text-[11px] text-gray-300">
                        <span className="font-bold text-white block mb-0.5">{s.title}</span>
                        {s.description}
                      </div>
                    ))}
                  </div>

                  {/* Missing keywords */}
                  {analysisResult.missingKeywords.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Candidate Skill Gaps (Highly Missing)</p>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.missingKeywords.map((tag, idx) => (
                          <span key={idx} className="text-[10px] font-semibold bg-red-500/10 text-red-300 border border-red-500/20 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </section>

            {/* Generated Sequence Timeline */}
            {roadmap && (
              <section className="space-y-4">
                <div className="flex justify-between items-center pt-2">
                  <h3 className="text-sm uppercase tracking-wider font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#34d399]" /> Active AI Planning Timelines
                  </h3>
                  <span className="text-xs text-gray-400 font-mono font-bold">{roadmap.completionRateText}</span>
                </div>

                <div className="space-y-4 relative pl-5 border-l border-white/10 ml-2">
                  {roadmap.months.map((m) => (
                    <div key={m.id} className="relative space-y-3">
                      {/* Left timeline pointer */}
                      <span className={`absolute -left-[25px] top-1.5 w-2.5 h-2.5 rounded-full z-10 ${m.status === "active" ? "bg-[#3b82f6] ring-4 ring-[#3b82f6]/20" : m.status === "completed" ? "bg-[#34d399]" : "bg-gray-600"}`}></span>
                      
                      <div className="bg-[#111827] p-4 rounded-xl border border-white/5 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block">Month Plan</span>
                            <h4 className="text-xs font-bold text-white">{m.monthTitle}</h4>
                          </div>
                          {m.status === "locked" && <Lock className="w-3.5 h-3.5 text-gray-500" />}
                        </div>
                        <p className="text-[11px] text-gray-400 leading-relaxed">{m.monthDesc}</p>

                        <div className="space-y-3 pt-2">
                          {m.weeks.map((week, wIdx) => (
                            <div key={wIdx} className="bg-white/5 p-3 rounded-lg border border-white/5 space-y-2">
                              <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#60a5fa]">Week {week.weekNumber}: {week.weekTitle}</span>
                              <p className="text-[10.5px] italic text-gray-300">Focus: {week.focus}</p>

                              <ul className="space-y-1.5 pt-1 border-t border-white/5">
                                {week.tasks.map((task, tIdx) => {
                                  const key = `${m.id}-w${wIdx}-t${tIdx}`;
                                  const done = checkedTasks[key];
                                  return (
                                    <li 
                                      key={tIdx} 
                                      onClick={() => setCheckedTasks(prev => ({ ...prev, [key]: !prev[key] }))}
                                      className="flex items-center gap-2.5 text-[10.5px] cursor-pointer"
                                    >
                                      <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${done ? "bg-[#34d399] border-[#34d399]" : "border-white/30"}`}>
                                        {done && <Check className="w-2.5 h-2.5 text-slate-900 stroke-[3px]" />}
                                      </div>
                                      <span className={`${done ? "line-through text-gray-500" : "text-gray-300"}`}>{task}</span>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ))}
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>
        )}

        {/* ==================== TAB 3: COACH & INTERVIEWS ==================== */}
        {activeTab === "coach" && (
          <div className="space-y-6">
            
            <section className="space-y-1.5">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Mic className="w-5 h-5 text-[#8b5cf6]" /> AI Active Mock Interlocutor
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                Compel high-quality behavioral logic or architectural patterns in responsive chat.
              </p>
            </section>

            {/* Preparation setup */}
            {!interviewActive && (
              <section className="bg-[#111827] p-6 rounded-2xl border border-white/5 space-y-5 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#3b82f6] to-[#af52de] flex items-center justify-center border border-white/10 relative">
                  <div className="absolute inset-0 rounded-full bg-[#3b82f6]/20 animate-ping"></div>
                  <Mic className="w-10 h-10 text-white relative z-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm uppercase tracking-wider font-bold text-white">Elite Connections Simulation</h3>
                  <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
                    Configure your targeted interview specialization, then start the interactive feedback communication session.
                  </p>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">Target Job Context</label>
                  <select 
                    value={interviewRole}
                    onChange={(e) => setInterviewRole(e.target.value)}
                    className="w-full max-w-xs mx-auto bg-[#1f2937] border border-white/10 rounded-xl px-3 py-2 text-xs text-white uppercase tracking-wider font-bold"
                  >
                    <option value="Senior Frontend Engineer">Senior Frontend Engineer</option>
                    <option value="SDE at Google L4/L5">SDE at Google L4/L5</option>
                    <option value="System Designer Lead">System Designer Lead</option>
                    <option value="Assoc. Product Manager">Assoc. Product Manager</option>
                  </select>
                </div>

                <button
                  onClick={() => setInterviewActive(true)}
                  className="px-8 py-3 bg-[#8b5cf6] hover:bg-[#a78bfa] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                >
                  Initiate Mock Session
                </button>
              </section>
            )}

            {/* Active Dialogue Simulation */}
            {interviewActive && (
              <section className="space-y-5">
                
                {/* Visual connection meter */}
                <div className="bg-[#111827] p-4 rounded-xl border border-white/5 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] tracking-wider uppercase font-extrabold text-gray-400">Connection Portal</span>
                    <h4 className="text-xs font-bold text-white">{interviewRole} Interview</h4>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> PREP CONNECTOR ACTIVE
                  </div>
                </div>

                {/* Question panel */}
                <div className="bg-gradient-to-b from-[#1e1b4b] to-[#111827] p-5 rounded-2xl border border-[#312e81] relative overflow-hidden space-y-2">
                  <div className="absolute top-0 left-0 h-full w-1 bg-[#8b5cf6]"></div>
                  <span className="text-[9px] text-[#c084fc] uppercase font-bold tracking-widest block">INTERVIEWER TETHER</span>
                  <p className="text-white text-xs font-medium italic leading-relaxed">
                    "{currentQuestion}"
                  </p>
                </div>

                {/* Custom waveform feedback lines */}
                <div className="flex justify-center items-end gap-1 h-8 bg-black/20 p-2 rounded-xl">
                  {waveformBars.map((bar, idx) => (
                    <div 
                      key={idx} 
                      style={{ height: `${bar}px` }} 
                      className={`w-1 rounded-full transition-all duration-150 ${idx % 2 === 0 ? "bg-[#8b5cf6]" : "bg-[#3b82f6]"}`}
                    ></div>
                  ))}
                </div>

                {/* Feedback log */}
                {latestEvaluation && (
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="bg-[#111827] p-3 rounded-xl border border-white/5 text-center">
                      <p className="text-[9px] text-gray-400 uppercase font-bold">Accuracy rating</p>
                      <h5 className="text-lg font-mono font-bold text-[#34d399]">{latestEvaluation.rating}%</h5>
                    </div>
                    <div className="bg-[#111827] p-3 rounded-xl border border-white/5 text-center">
                      <p className="text-[9px] text-gray-400 uppercase font-bold">Speech Rate</p>
                      <h5 className="text-lg font-sans font-bold text-[#60a5fa]">{latestEvaluation.confidence}</h5>
                    </div>
                  </div>
                )}

                {/* Response Area */}
                <div className="space-y-3">
                  <textarea 
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type or dictate your structured response (STAR format recommended)..."
                    rows={4}
                    className="w-full bg-[#111827] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#8b5cf6]"
                  />

                  <div className="flex gap-3">
                    <button 
                      onClick={submitInterviewAnswer}
                      disabled={isSubmittingAnswer || !userAnswer.trim()}
                      className="flex-1 py-3 bg-[#8b5cf6] hover:bg-[#a78bfa] disabled:opacity-50 disabled:hover:bg-[#8b5cf6] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                    >
                      {isSubmittingAnswer ? "Evaluating response..." : "Submit Answer"}
                    </button>

                    <button 
                      onClick={endInterviewSession}
                      className="px-5 py-3 bg-red-900/30 border border-red-500/30 text-red-300 font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                    >
                      End session
                    </button>
                  </div>
                </div>

                {/* Dialog summary logs (Conversational history) */}
                {conversationHistory.length > 0 && (
                  <div className="space-y-3.5 pt-4 border-t border-white/5">
                    <p className="text-[10px] text-gray-400 uppercase font-bold text-center tracking-wider">Session conversation history</p>
                    {conversationHistory.map((item, idx) => (
                      <div key={idx} className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-1.5 text-xs">
                        <p className="font-bold text-gray-400">Q: <span className="font-normal text-white">{item.q}</span></p>
                        <p className="font-bold text-[#c084fc]">Your answer: <span className="font-normal text-gray-300">{item.a}</span></p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Final summary results */}
                {showSummary && interviewSummary && (
                  <div className="bg-gradient-to-b from-[#111827] to-black p-5 rounded-2xl border border-[#34d399]/30 space-y-4">
                    <div className="text-center space-y-1">
                      <Award className="w-8 h-8 text-[#34d399] mx-auto animate-bounce" />
                      <h4 className="text-sm uppercase tracking-wider font-extrabold text-white">Mock Interview Compilation</h4>
                      <p className="text-xs text-gray-400">Active placement feedback profile</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                        <p className="text-[9px] text-gray-400 uppercase font-bold">Overall Score</p>
                        <h5 className="text-xl font-mono text-white font-bold">{interviewSummary.overallScore}/100</h5>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                        <p className="text-[9px] text-gray-400 uppercase font-bold">Readiness Rating</p>
                        <h5 className="text-xl text-[#34d399] font-bold">{interviewSummary.readinessLevel}</h5>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] uppercase font-bold text-gray-400">Candidate Strengths</p>
                      <ul className="space-y-1.5 list-disc pl-4 text-xs text-gray-300">
                        {interviewSummary.strengths.map((str, idx) => <li key={idx}>{str}</li>)}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] uppercase font-bold text-gray-400">Growth Pathways</p>
                      <ul className="space-y-1.5 list-disc pl-4 text-xs text-gray-300">
                        {interviewSummary.improvements.map((imp, idx) => <li key={idx}>{imp}</li>)}
                      </ul>
                    </div>

                    <button 
                      onClick={() => {
                        setInterviewActive(false);
                        setConversationHistory([]);
                        setCurrentQuestion("Tell me about a time you optimized app performance. What were the metrics, and how did you measure success?");
                        setShowSummary(false);
                        setInterviewSummary(null);
                      }}
                      className="w-full py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
                    >
                      Exit Summary
                    </button>
                  </div>
                )}

              </section>
            )}

          </div>
        )}

        {/* ==================== TAB 4: PIPELINE ==================== */}
        {activeTab === "jobs" && (
          <div className="space-y-6">
            
            <section className="flex justify-between items-center">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#60a5fa]" /> Job Pipeline Tracker
                </h2>
                <p className="text-xs text-gray-400">Configure target applications in pipeline boards.</p>
              </div>
              <button 
                onClick={() => setShowAddJobModal(true)}
                className="w-8 h-8 rounded-xl bg-[#3b82f6] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <Plus className="w-5 h-5" />
              </button>
            </section>

            {/* Selector Filters */}
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
              {["All", "Wishlist", "Applied", "Assessment", "Interview", "Offer"].map((status) => (
                <button
                  key={status}
                  onClick={() => setPipelineFilter(status)}
                  className={`px-3 py-1.5 rounded-full border font-bold font-mono transition-all uppercase text-[10px] ${pipelineFilter === status ? "bg-[#3a82f6]/20 border-[#3b82f6] text-[#60a5fa]" : "border-white/5 text-gray-400 hover:bg-white/5"}`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Pipeline List */}
            <div className="space-y-3">
              {filteredJobs.length === 0 ? (
                <div className="p-12 text-center text-gray-500 text-xs">
                  No applications match this category. Click "+" to register targets.
                </div>
              ) : (
                filteredJobs.map((j) => (
                  <div key={j.id} className="bg-[#111827] p-4 rounded-xl border border-white/5 flex justify-between items-center hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white font-bold font-serif overflow-hidden">
                        {j.logo ? <img src={j.logo} alt="Company" className="w-full h-full object-cover" /> : j.company.slice(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-white">{j.title}</h4>
                          {j.priorityFlag && <span className="bg-red-500/15 border border-red-500/35 text-[9px] font-bold text-red-400 px-1.5 py-0.2 rounded font-mono">PRIORITY</span>}
                        </div>
                        <p className="text-[11px] text-gray-400">{j.company} • <span className="italic font-mono">{j.location}</span></p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] text-gray-400 font-mono italic">{j.date}</span>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#60a5fa] bg-[#3a82f6]/10 px-2 py-0.5 rounded border border-[#3b82f6]/20 block mt-1">{j.status}</span>
                      </div>
                      
                      <button 
                        onClick={() => deleteJobCard(j.id)}
                        className="p-1 text-gray-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))
              )}
            </div>

            {/* Modal */}
            {showAddJobModal && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-[#111827] border border-white/10 rounded-2xl p-5 w-full max-w-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <h4 className="text-sm uppercase font-bold text-white font-sans">Tether target Application</h4>
                    <button onClick={() => setShowAddJobModal(false)}><X className="w-4 h-4 text-gray-400" /></button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-gray-400 mb-1 font-semibold text-[10px] uppercase">Title</label>
                      <input 
                        type="text" 
                        value={newJob.title} 
                        onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                        placeholder="e.g. Frontend Specialist" 
                        className="w-full bg-[#1f2937] border border-white/10 rounded-lg p-2 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1 font-semibold text-[10px] uppercase">Company</label>
                      <input 
                        type="text" 
                        value={newJob.company} 
                        onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                        placeholder="e.g. Vercel Inc" 
                        className="w-full bg-[#1f2937] border border-white/10 rounded-lg p-2 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1 font-semibold text-[10px] uppercase">Status</label>
                      <select 
                        value={newJob.status} 
                        onChange={(e) => setNewJob({ ...newJob, status: e.target.value as any })}
                        className="w-full bg-[#1f2937] border border-white/10 rounded-lg p-2 text-white focus:outline-none"
                      >
                        <option value="Wishlist">Wishlist</option>
                        <option value="Applied">Applied</option>
                        <option value="Assessment">Assessment</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                      </select>
                    </div>
                    <div className="flex gap-4 pt-1">
                      <label className="flex items-center gap-2 cursor-pointer font-semibold text-[10px] uppercase text-gray-400">
                        <input 
                          type="checkbox" 
                          checked={newJob.priorityFlag} 
                          onChange={(e) => setNewJob({ ...newJob, priorityFlag: e.target.checked })}
                          className="rounded border-white/20 accent-[#3b82f6]"
                        />
                        Priority Target
                      </label>
                    </div>
                  </div>

                  <button 
                    onClick={handleAddJobCard}
                    className="w-full py-2.5 bg-[#3b82f6] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 active:scale-95 transition-all"
                  >
                    Add to Pipeline
                  </button>

                </div>
              </div>
            )}

          </div>
        )}

        {/* ==================== TAB 5: DSA TRACKER ==================== */}
        {activeTab === "tracker" && (
          <div className="space-y-6">
            
            <section className="space-y-1">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#c084fc]" /> DSA Tracker
              </h2>
              <p className="text-xs text-gray-400">Track solved interview questions and difficulty levels.</p>
            </section>

            {/* Circular representation */}
            <section className="bg-[#111827] p-5 rounded-2xl border border-white/5 space-y-4">
              <div className="text-center">
                <p className="text-[11px] uppercase tracking-wider font-extrabold text-gray-400">Total Solved Challenges</p>
                <h3 className="text-3xl font-mono font-bold text-white mt-1">{easySolved + mediumSolved + hardSolved} <span className="text-xs text-gray-400 font-normal">Problems</span></h3>
              </div>

              <div className="grid grid-cols-3 gap-3.5 pt-2 text-center text-xs">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="text-[#34d399] font-mono font-bold block text-base">{easySolved}</span>
                  <span className="text-[10px] uppercase font-bold text-gray-400">Easy</span>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="text-[#60a5fa] font-mono font-bold block text-base">{mediumSolved}</span>
                  <span className="text-[10px] uppercase font-bold text-gray-400">Medium</span>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="text-red-400 font-mono font-bold block text-base">{hardSolved}</span>
                  <span className="text-[10px] uppercase font-bold text-gray-400">Hard</span>
                </div>
              </div>
            </section>

            {/* Quick incremental logs */}
            <section className="bg-[#111827] p-5 rounded-2xl border border-white/5 space-y-4">
              <h3 className="text-xs uppercase font-extrabold text-[#c084fc] tracking-wider">Log solved challenge</h3>
              
              <div className="grid grid-cols-3 gap-3">
                <button 
                  onClick={() => setEasySolved(prev => prev + 1)}
                  className="py-2.5 bg-[#10b981]/15 hover:bg-[#10b981]/30 border border-[#10b981]/30 text-[#34d399] font-bold text-xs rounded-xl transition-all uppercase"
                >
                  +1 Easy Solution
                </button>
                <button 
                  onClick={() => setMediumSolved(prev => prev + 1)}
                  className="py-2.5 bg-[#3b82f6]/15 hover:bg-[#3b82f6]/30 border border-[#3b82f6]/30 text-[#60a5fa] font-bold text-xs rounded-xl transition-all uppercase"
                >
                  +1 Medium Solution
                </button>
                <button 
                  onClick={() => setHardSolved(prev => prev + 1)}
                  className="py-2.5 bg-red-500/15 hover:bg-red-500/30 border border-red-500/30 text-red-300 font-bold text-xs rounded-xl transition-all uppercase"
                >
                  +1 Hard Solution
                </button>
              </div>
            </section>

          </div>
        )}

        {/* ==================== TAB 6: SETTINGS ==================== */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            
            <section className="space-y-1">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-gray-400" /> Candidate Settings
              </h2>
              <p className="text-xs text-gray-400">Review notification preferences and credentials.</p>
            </section>

            {/* Forms */}
            <section className="bg-[#111827] p-5 rounded-2xl border border-white/5 space-y-4">
              <div className="text-xs space-y-3">
                <div>
                  <label className="block text-gray-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Candidate Full Name</label>
                  <input 
                    type="text" 
                    value={personalName} 
                    onChange={(e) => setPersonalName(e.target.value)}
                    className="w-full bg-[#1f2937] border border-white/10 rounded-lg p-2 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Email Address</label>
                  <input 
                    type="email" 
                    value={personalEmail} 
                    onChange={(e) => setPersonalEmail(e.target.value)}
                    className="w-full bg-[#1f2937] border border-white/10 rounded-lg p-2 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Target Google Level Target</label>
                  <select 
                    value={user.level} 
                    onChange={(e) => setUser({ ...user, level: e.target.value })}
                    className="w-full bg-[#1f2937] border border-white/10 rounded-lg p-2 text-white focus:outline-none"
                  >
                    <option value="L3">(L3) Software Developer I</option>
                    <option value="L4">(L4) Software Developer II</option>
                    <option value="L5">(L5) Senior Developer</option>
                    <option value="L6">(L6) Staff Developer</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="bg-[#111827] p-5 rounded-2xl border border-white/5 space-y-4 text-xs text-gray-400 leading-relaxed">
              <h3 className="font-bold text-white uppercase tracking-wider text-[10px]">Preparation Environment Details</h3>
              <p>CareerCopilot prep dashboard is synchronized with <b>Google Cloud Run & Cloud SQL services securely</b>.</p>
              <div className="flex justify-between border-t border-white/5 pt-3">
                <span>Version</span>
                <span className="font-mono text-white font-bold">Aether AI v3.55</span>
              </div>
            </section>

          </div>
        )}

      </main>

    </div>
  );
}
