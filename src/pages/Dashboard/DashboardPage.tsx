import React from "react";
import { Sparkles, Terminal, Check, TrendingUp, HelpCircle, ChevronDown, Star, ArrowRight, UserCheck, Flame, Briefcase } from "lucide-react";
import { DailyMission, ActionItem } from "../../types";
import { FAQS, TESTIMONIALS, SKILL_GAP_DATA } from "../../constants";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Score from "../../components/ui/Score";

interface DashboardPageProps {
  personalName: string;
  targetRole: string;
  streakDays: number;
  dailyScore: number;
  missions: DailyMission[];
  toggleMission: (id: string) => void;
  expandedFaq: string | null;
  setExpandedFaq: (id: string | null) => void;
  onNavigate?: (tab: "home" | "roadmap" | "coach" | "jobs" | "tracker" | "settings") => void;
  todayAction: ActionItem | null;
  onCompleteAction?: (id: string) => void;
  targetCompany: string;
  companyType: string;
  specialization: string;
  targetTimeline: number;
  timeAvailable: string;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  resumeScore: number | null;
  interviewScore: number | null;
  roadmapProgress: string;
}

export default function DashboardPage({
  personalName,
  targetRole,
  streakDays,
  dailyScore,
  missions,
  toggleMission,
  expandedFaq,
  setExpandedFaq,
  onNavigate,
  todayAction,
  onCompleteAction,
  targetCompany,
  companyType,
  specialization,
  targetTimeline,
  timeAvailable,
  easySolved,
  mediumSolved,
  hardSolved,
  resumeScore,
  interviewScore,
  roadmapProgress
}: DashboardPageProps) {
  // Determine personalized greeting based on current local time hours
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning";
    if (hours < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="space-y-8">
      
      {/* 1. Header Greeting (Clean, no marketing copy) */}
      <section className="space-y-1">
        <h2 className="text-xl font-bold text-white tracking-tight">
          {getGreeting()}, {personalName.split(" ")[0]}
        </h2>
        <p className="text-xs text-gray-400">
          Your career preparation workspace is fully synchronized and ready.
        </p>
      </section>

      {/* 2. Top-Level Summary Split (Target Plan CTA & Recommended Next Action) */}
      <div className="grid md:grid-cols-5 gap-6">
        
        {/* Current Target Plan & Primary CTA (3/5 width) */}
        <Card variant="elevated" className="md:col-span-3 border-[#8b5cf6]/20 bg-[#8b5cf6]/5 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#a78bfa] font-mono block">Current Goal Focus</span>
            <h3 className="text-base font-extrabold text-white">{targetRole} {targetCompany ? `at ${targetCompany}` : ""}</h3>
            <p className="text-[11px] text-gray-300 leading-relaxed">
              Company Category: <span className="text-[#60a5fa] font-bold">{companyType || "General"}</span> • Specialization Focus: <span className="text-[#60a5fa] font-bold">{specialization || "Standard"}</span>
            </p>
            <span className="text-[10px] font-mono text-gray-400 block pt-1">
              Timeline Target: <b>{targetTimeline} Months</b> • Daily Commitment: <b>{timeAvailable}</b>
            </span>
          </div>
          
          <Button 
            onClick={() => onNavigate?.("roadmap")}
            variant="primary" 
            className="w-full text-xs font-bold py-3 flex items-center justify-center gap-1.5 shadow-lg shadow-[#2563EB]/20"
          >
            Start Today's Plan <ArrowRight className="w-4 h-4" />
          </Button>
        </Card>

        {/* Recommended Next Action (2/5 width, highly prominent) */}
        {!todayAction ? (
          <Card variant="elevated" className="md:col-span-2 flex flex-col justify-between space-y-4 animate-pulse">
            <div className="space-y-3">
              <div className="h-4 bg-white/10 rounded w-1/3"></div>
              <div className="h-6 bg-white/10 rounded w-3/4"></div>
              <div className="h-10 bg-white/10 rounded w-full"></div>
            </div>
            <div className="h-8 bg-white/10 rounded w-full"></div>
          </Card>
        ) : (
          <Card variant="elevated" className="md:col-span-2 flex flex-col justify-between space-y-4 border-[#2563EB]/20 bg-[#2563EB]/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-5">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
            <div className="space-y-2 relative z-10">
              <Badge variant={todayAction.priority === "High" ? "error" : todayAction.priority === "Medium" ? "warning" : "default"}>
                {todayAction.priority} Priority
              </Badge>
              <h3 className="text-xs uppercase font-extrabold text-white tracking-wider">{todayAction.title}</h3>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                {todayAction.description}
              </p>
              <span className="text-[9.5px] font-mono text-gray-400 block pt-1">
                Impact: <b className="text-emerald-400 font-bold">{todayAction.impactText}</b> • {todayAction.estimatedMinutes} mins
              </span>
            </div>
            
            <Button 
              onClick={() => onCompleteAction?.(todayAction.id)}
              variant="primary" 
              className="w-full text-[10px] tracking-widest py-2"
            >
              Complete Action
            </Button>
          </Card>
        )}

      </div>

      {/* 3. Main Split Grid */}
      <div className="grid md:grid-cols-3 gap-6 items-start">
        
        {/* Left Side: Daily Missions & Skill Gap (2/3 width) */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Daily Missions */}
          <Card className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-gray-300 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#60a5fa]" /> Daily Checklist
              </h3>
              <span className="text-[10px] font-mono text-gray-400 font-bold">
                ({missions.filter(m => m.completed).length}/{missions.length} Completed)
              </span>
            </div>

            <div className="space-y-2.5">
              {missions.map(m => (
                <div 
                  key={m.id} 
                  onClick={() => toggleMission(m.id)}
                  className="flex items-start gap-3 p-2.5 hover:bg-white/2 rounded-xl transition-all cursor-pointer select-none"
                >
                  <div className={`w-4 h-4 mt-0.5 rounded border flex items-center justify-center transition-all shrink-0 ${m.completed ? "bg-[#10B981] border-[#10B981]" : "border-white/20 hover:border-white/40"}`}>
                    {m.completed && <Check className="w-2.5 h-2.5 text-slate-900 stroke-[3px]" />}
                  </div>
                  <div>
                    <p className={`text-xs font-semibold ${m.completed ? "line-through text-gray-500" : "text-gray-200"}`}>{m.description}</p>
                    <span className="text-[10px] text-gray-400 font-mono italic block">{m.metadata}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Skill Gap Summary */}
          <Card className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-gray-300 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#8b5cf6]" /> Primary Skill Gaps
              </h3>
              <button 
                onClick={() => onNavigate?.("roadmap")}
                className="text-[10px] font-bold text-[#60a5fa] hover:underline flex items-center gap-1 uppercase tracking-wider"
              >
                View Skill Gap <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3.5 pt-1">
              {SKILL_GAP_DATA.slice(0, 3).map((skill, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-300">{skill.name}</span>
                    <span className="text-gray-400 font-mono text-[10px]">Current: <b className="text-white">{skill.current}%</b> / Target: {skill.target}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                    <div className="absolute inset-y-0 left-0 bg-white/10 rounded-full" style={{ width: `${skill.target}%` }}></div>
                    <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#2563EB] to-[#4F46E5] rounded-full" style={{ width: `${skill.current}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

        </div>

        {/* Right Side: DSA stats & application pipeline overview (1/3 width) */}
        <div className="space-y-6">
          
          {/* Pipeline overview */}
          <Card className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-gray-300 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#3b82f6]" /> Job Tracker
              </h3>
              <button 
                onClick={() => onNavigate?.("jobs")}
                className="text-[10px] font-bold text-[#60a5fa] hover:underline uppercase tracking-wider"
              >
                View Pipeline
              </button>
            </div>
            
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Track active applications and follow-up deadlines.
            </p>
          </Card>

          {/* DSA solved counters (non-dominant, clean status badges) */}
          <Card className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-gray-300 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#10B981]" /> DSA Progress
              </h3>
              <button 
                onClick={() => onNavigate?.("tracker")}
                className="text-[10px] font-bold text-[#60a5fa] hover:underline uppercase tracking-wider"
              >
                Log Problems
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                <span className="text-[#10b981] font-mono font-bold block text-sm">{streakDays}</span>
                <span className="text-[9px] uppercase font-bold text-gray-400 block font-mono">Streak</span>
              </div>
              <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                <span className="text-white font-mono font-bold block text-sm">{easySolved + mediumSolved + hardSolved}</span>
                <span className="text-[9px] uppercase font-bold text-gray-400 block font-mono">Total Solved</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1 pt-1.5 text-center text-[10px] text-gray-400 font-mono">
              <div>E: <span className="text-[#10b981] font-bold">{easySolved}</span></div>
              <div>M: <span className="text-yellow-400 font-bold">{mediumSolved}</span></div>
              <div>H: <span className="text-red-400 font-bold">{hardSolved}</span></div>
            </div>
          </Card>

        </div>

      </div>

      {/* 4. Bottom Accordions FAQ & testimonies (Whitespace/Dividers layout, card-less design) */}
      <div className="border-t border-white/5 pt-6 space-y-6">
        
        {/* FAQs */}
        <section className="space-y-4 max-w-2xl">
          <h3 className="text-xs uppercase tracking-wider font-extrabold text-gray-300 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-gray-400" /> FAQ Accordion
          </h3>
          <div className="space-y-1.5">
            {FAQS.slice(0, 3).map(faq => (
              <div key={faq.id} className="border-b border-white/5 pb-3">
                <button 
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between text-left py-2 hover:text-white transition-colors"
                >
                  <span className="text-xs font-bold text-gray-300">{faq.question}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${expandedFaq === faq.id ? "rotate-180 text-white" : ""}`} />
                </button>
                {expandedFaq === faq.id && (
                  <p className="text-[11px] text-gray-400 leading-relaxed pt-1.5 animate-fadeIn">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials (Restrained slide layout, minimal cards) */}
        <section className="space-y-4">
          <h3 className="text-xs uppercase tracking-wider font-extrabold text-gray-300 flex items-center gap-2">
            <Star className="w-4 h-4 text-gray-400" /> Feedback
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="border-l-2 border-[#2563EB] pl-4 py-1 text-xs text-gray-300 space-y-3">
                <p className="italic leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full overflow-hidden bg-white/10 border border-white/5">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="font-bold text-white text-[10px]">{t.name} • <span className="text-gray-400 font-normal">{t.role}</span></span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

    </div>
  );
}
