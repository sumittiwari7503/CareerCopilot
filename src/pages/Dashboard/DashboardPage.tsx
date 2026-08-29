import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Terminal, 
  Check, 
  TrendingUp, 
  HelpCircle, 
  ChevronDown, 
  Star, 
  ArrowRight, 
  UserCheck, 
  Flame, 
  Briefcase,
  Layers,
  ChevronRight,
  BookOpen
} from "lucide-react";
import { ActionItem, JobCard, ProjectRecommendation, CareerRoadmap } from "../../types";
import { FAQS, TESTIMONIALS } from "../../constants";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";

interface DashboardPageProps {
  personalName: string;
  targetRole: string;
  streakDays: number;
  dailyScore: number;
  expandedFaq: string | null;
  setExpandedFaq: (id: string | null) => void;
  onNavigate?: (tab: "home" | "roadmap" | "resume" | "coach" | "jobs" | "tracker" | "settings") => void;
  todayAction: ActionItem | null;
  onCompleteAction?: (id: string) => void;
  onToggleActionTask?: (idx: number, completed: boolean) => void;
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
  jobs: JobCard[];
  currentSkills: string[];
  projectRecommendations: ProjectRecommendation[];
  checkedTasks: Record<string, boolean>;
  roadmap: CareerRoadmap | null;
}

export default function DashboardPage({
  personalName,
  targetRole,
  streakDays,
  dailyScore,
  expandedFaq,
  setExpandedFaq,
  onNavigate,
  todayAction,
  onCompleteAction,
  onToggleActionTask,
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
  roadmapProgress,
  jobs,
  currentSkills,
  projectRecommendations,
  checkedTasks,
  roadmap
}: DashboardPageProps) {
  // Local state for sub-tasks of the active action item
  const [checkedSubtasks, setCheckedSubtasks] = useState<Record<number, boolean>>({});

  // Reset checked subtasks when a new action item is loaded
  // Parse tasks array from todayAction (can be strings or {text, completed} objects)
  const getSubtasks = (): { text: string; completed: boolean }[] => {
    if (!todayAction?.tasks) return [];
    try {
      let parsed: any = [];
      if (typeof todayAction.tasks === "string") {
        parsed = JSON.parse(todayAction.tasks);
      } else if (Array.isArray(todayAction.tasks)) {
        parsed = todayAction.tasks;
      }
      return parsed.map((t: any) => {
        if (typeof t === "string") {
          return { text: t, completed: false };
        }
        return { text: t.text || "", completed: !!t.completed };
      });
    } catch (e) {
      console.error("Failed to parse action item tasks:", e);
    }
    return [];
  };

  const subtasks = getSubtasks();
  const allSubtasksChecked = subtasks.length > 0 && subtasks.every(t => t.completed);

  const toggleSubtask = (idx: number) => {
    const task = subtasks[idx];
    if (task && onToggleActionTask) {
      onToggleActionTask(idx, !task.completed);
    }
  };

  // Determine greeting based on current local hours
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning";
    if (hours < 17) return "Good afternoon";
    return "Good evening";
  };

  // Selected metric details modal state
  const [selectedMetric, setSelectedMetric] = useState<{ title: string; score: number; explanation: string; nextStep: string } | null>(null);

  // 1. Resume subscore
  const calculatedResumeScore = resumeScore || 30; // base 30% if not scanned

  // 2. Skills subscore matching
  const targetRoleName = (targetRole || "").toLowerCase();
  let targetSkillsList = ["Data Structures & Algorithms", "System Design", "Git", "Software Engineering"];
  if (targetRoleName.includes("frontend")) {
    targetSkillsList = ["React", "TypeScript", "CSS & Web UI", "System Design"];
  } else if (targetRoleName.includes("backend")) {
    targetSkillsList = ["Node.js", "Databases (SQL/NoSQL)", "System Design", "Docker & CI/CD"];
  } else if (targetRoleName.includes("full stack") || targetRoleName.includes("fullstack")) {
    targetSkillsList = ["React", "Node.js", "Databases (SQL/NoSQL)", "System Design"];
  }
  const matchedSkillsCount = targetSkillsList.filter(ts => 
    currentSkills.some(cs => cs.toLowerCase().replace(/[^a-z0-9]/g, "") === ts.toLowerCase().replace(/[^a-z0-9]/g, ""))
  ).length;
  const calculatedSkillsScore = Math.round((matchedSkillsCount / targetSkillsList.length) * 70) + 30;

  // 3. DSA subscore
  const totalSolved = easySolved + mediumSolved + hardSolved;
  const calculatedDsaScore = Math.min(Math.round((totalSolved / 150) * 70) + 30, 100);

  // 4. Projects subscore
  const completedProjectsCount = projectRecommendations.filter(p => p.status === "Completed").length;
  const calculatedProjectsScore = projectRecommendations.length > 0 
    ? (completedProjectsCount > 0 ? 100 : 75) 
    : 30;

  // 5. Interview subscore
  const calculatedInterviewScore = interviewScore || 30;

  // 6. Applications subscore
  const calculatedApplicationsScore = jobs.length > 0 ? Math.min(50 + jobs.length * 10, 100) : 30;

  // 7. Roadmap subscore
  let checkedCount = Object.keys(checkedTasks || {}).filter(k => checkedTasks[k]).length;
  let totalTasksCount = 24;
  if (roadmap && roadmap.months) {
    let count = 0;
    roadmap.months.forEach(m => {
      m.weeks.forEach(w => {
        count += w.tasks.length;
      });
    });
    if (count > 0) totalTasksCount = count;
  }
  const roadmapPercent = roadmap ? Math.min(Math.round((checkedCount / totalTasksCount) * 100), 100) : 0;
  const calculatedRoadmapScore = Math.round(roadmapPercent * 0.7) + 30;

  // Overall readiness average
  const overallReadinessScore = Math.round(
    (calculatedResumeScore + 
     calculatedSkillsScore + 
     calculatedDsaScore + 
     calculatedProjectsScore + 
     calculatedInterviewScore + 
     calculatedApplicationsScore + 
     calculatedRoadmapScore) / 7
  );

  // Dynamic Skill Gap computation
  const getDynamicSkillGaps = () => {
    const role = (targetRole || "").toLowerCase();
    let requiredSkills: { name: string; target: number }[] = [];
    
    if (role.includes("frontend")) {
      requiredSkills = [
        { name: "React", target: 90 },
        { name: "TypeScript", target: 85 },
        { name: "CSS & Web UI", target: 90 },
        { name: "System Design", target: 70 }
      ];
    } else if (role.includes("backend")) {
      requiredSkills = [
        { name: "Node.js", target: 90 },
        { name: "Databases (SQL/NoSQL)", target: 90 },
        { name: "System Design", target: 85 },
        { name: "Docker & CI/CD", target: 80 }
      ];
    } else if (role.includes("full stack") || role.includes("fullstack")) {
      requiredSkills = [
        { name: "React", target: 85 },
        { name: "Node.js", target: 85 },
        { name: "Databases (SQL/NoSQL)", target: 80 },
        { name: "System Design", target: 80 }
      ];
    } else {
      // General software developer
      requiredSkills = [
        { name: "Data Structures & Algorithms", target: 85 },
        { name: "System Design", target: 80 },
        { name: "Software Engineering Principles", target: 90 },
        { name: "Git & Collaboration", target: 90 }
      ];
    }

    return requiredSkills.map(skill => {
      // Case insensitive skill match
      const hasSkill = currentSkills.some(
        s => s.toLowerCase().replace(/[^a-z0-9]/g, "") === skill.name.toLowerCase().replace(/[^a-z0-9]/g, "")
      );
      return {
        name: skill.name,
        target: skill.target,
        current: hasSkill ? skill.target : 30
      };
    });
  };

  const skillGaps = getDynamicSkillGaps();

  // Job pipeline counts
  const getPipelineStats = () => {
    const stats = {
      Wishlist: 0,
      Applied: 0,
      Assessment: 0,
      Interview: 0,
      Offer: 0
    };
    jobs.forEach(j => {
      if (j.status in stats) {
        stats[j.status as keyof typeof stats]++;
      }
    });
    return stats;
  };

  const pipelineStats = getPipelineStats();

  return (
    <div className="space-y-8">
      
      {/* 1. Header Greeting */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {getGreeting()}, {personalName.split(" ")[0]}
          </h2>
          <p className="text-xs text-gray-400">
            Welcome to your career command center. Let's see what you need to focus on today.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white/5 border border-white/5 px-4 py-2 rounded-2xl flex items-center gap-2">
            <Flame className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-gray-400 block font-mono">Streak</span>
              <span className="text-xs font-bold text-white font-mono">{streakDays} Days</span>
            </div>
          </div>
          <div className="bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 px-4 py-2 rounded-2xl flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#a78bfa]" />
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-gray-400 block font-mono">Total XP</span>
              <span className="text-xs font-bold text-white font-mono">{dailyScore} XP</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Top Summary cards */}
      <div className="grid md:grid-cols-5 gap-6">
        
        {/* Current Plan Card (3/5 width) */}
        <Card variant="elevated" className="md:col-span-3 border-[#8b5cf6]/20 bg-[#8b5cf6]/5 flex flex-col justify-between p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#a78bfa] font-mono block">Primary Target</span>
                <h3 className="text-lg font-bold text-white mt-1">{targetRole}</h3>
              </div>
              <Badge variant="info" className="bg-[#8b5cf6]/15 text-[#c084fc] border-[#8b5cf6]/20">
                {roadmapProgress === "Active Plan" ? "Roadmap Active" : "No Plan Generated"}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
              <div className="text-left">
                <span className="text-[9px] uppercase font-mono text-gray-400 block">Target Company</span>
                <span className="text-xs font-bold text-white mt-0.5 block truncate">{targetCompany || "Undecided"} ({companyType || "Product"})</span>
              </div>
              <div className="text-left">
                <span className="text-[9px] uppercase font-mono text-gray-400 block">Commitment / Timeline</span>
                <span className="text-xs font-bold text-white mt-0.5 block">{timeAvailable} / {targetTimeline} Months</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button 
              onClick={() => onNavigate?.("roadmap")}
              variant="primary" 
              className="flex-1 text-xs font-bold py-3 flex items-center justify-center gap-1.5 shadow-lg shadow-[#2563EB]/20"
            >
              Go to Prep Planner <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => onNavigate?.("settings")}
              variant="outline"
              className="text-xs px-4"
            >
              Edit Target
            </Button>
          </div>
        </Card>

        {/* Recommended Action Card (2/5 width) */}
        <Card variant="elevated" className="md:col-span-2 flex flex-col justify-between border-[#2563EB]/25 bg-[#2563EB]/5 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none">
            <Sparkles className="w-24 h-24 text-white" />
          </div>

          {!todayAction ? (
            <div className="flex-1 flex flex-col justify-center items-center text-center p-4 space-y-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Check className="w-5 h-5 stroke-[3px]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">All Caught Up!</h4>
                <p className="text-[10px] text-gray-400">You've completed all recommended actions. Keep up the momentum!</p>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-3 relative z-10">
                <div className="flex justify-between items-center">
                  <Badge variant={todayAction.priority === "High" ? "error" : todayAction.priority === "Medium" ? "warning" : "default"}>
                    {todayAction.priority} Priority
                  </Badge>
                  <span className="text-[9px] font-mono text-gray-400 font-bold">{todayAction.estimatedMinutes} Mins</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-[#60a5fa] font-mono block">Recommended Action</span>
                  <h4 className="text-xs font-bold text-white tracking-wide mt-1 leading-snug">{todayAction.title}</h4>
                </div>
                <p className="text-[10.5px] text-gray-300 leading-relaxed">
                  {todayAction.description}
                </p>
                <div className="text-[9.5px] font-mono text-gray-400 border-t border-white/5 pt-2">
                  Impact: <span className="text-emerald-400 font-bold">{todayAction.impactText || "High Value"}</span>
                </div>
              </div>
              
              <Button 
                onClick={() => onCompleteAction?.(todayAction.id)}
                variant="primary" 
                disabled={subtasks.length > 0 && !allSubtasksChecked}
                className="w-full text-xs font-bold py-2.5 mt-4"
              >
                {subtasks.length > 0 
                  ? (allSubtasksChecked ? "Complete & Claim +50 XP" : "Complete Checklist Below First") 
                  : "Complete Action"}
              </Button>
            </>
          )}
        </Card>

      </div>

      {/* 3. Main Split Grid */}
      <div className="grid md:grid-cols-3 gap-6 items-start">
        
        {/* Left Columns (Checklist & Skill Gaps) (2/3 width) */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Action Tasks checklist */}
          <Card className="p-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-gray-300 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#60a5fa]" /> Today's Action Checklist
              </h3>
              {todayAction && subtasks.length > 0 && (
                <span className="text-[10px] font-mono text-gray-400 font-bold">
                  ({subtasks.filter(t => t.completed).length}/{subtasks.length} Completed)
                </span>
              )}
            </div>

            <div className="pt-4 space-y-3">
              {!todayAction || subtasks.length === 0 ? (
                <div className="text-center py-8 space-y-2">
                  <BookOpen className="w-8 h-8 text-gray-600 mx-auto" />
                  <p className="text-xs text-gray-500">No active checklist. Generate a roadmap to initiate daily tasks.</p>
                </div>
              ) : (
                subtasks.map((task, idx) => {
                  const isChecked = task.completed;
                  return (
                    <div 
                      key={idx} 
                      onClick={() => toggleSubtask(idx)}
                      className="flex items-start gap-3 p-3 hover:bg-white/2 rounded-xl transition-all cursor-pointer select-none border border-transparent hover:border-white/5"
                    >
                      <div className={`w-4 h-4 mt-0.5 rounded border flex items-center justify-center transition-all shrink-0 ${isChecked ? "bg-emerald-500 border-emerald-500" : "border-white/20 hover:border-white/40"}`}>
                        {isChecked && <Check className="w-2.5 h-2.5 text-slate-900 stroke-[3px]" />}
                      </div>
                      <div className="min-w-0">
                        <p className={`text-xs font-semibold leading-relaxed ${isChecked ? "line-through text-gray-500" : "text-gray-200"}`}>{task.text}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </Card>

          {/* Skill Gaps Competency */}
          <Card className="p-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-gray-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#8b5cf6]" /> Specialization Skill Gaps
              </h3>
              <button 
                onClick={() => onNavigate?.("roadmap")}
                className="text-[10px] font-bold text-[#60a5fa] hover:underline flex items-center gap-0.5 uppercase tracking-wider font-mono"
              >
                View Gaps <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="pt-4 space-y-4">
              {skillGaps.map((skill, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-300">{skill.name}</span>
                    <span className="text-gray-400 font-mono text-[10px]">
                      Competency: <b className="text-white">{skill.current}%</b> / Target: {skill.target}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                    <div className="absolute inset-y-0 left-0 bg-white/10 rounded-full" style={{ width: `${skill.target}%` }}></div>
                    <div 
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#2563EB] to-[#8b5cf6] rounded-full transition-all duration-500" 
                      style={{ width: `${skill.current}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

        </div>

        {/* Right Column (Tracker summaries) (1/3 width) */}
        <div className="space-y-6">
          
          {/* Real Job Tracker summary counts */}
          <Card className="p-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-gray-300 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#3b82f6]" /> Pipeline Summary
              </h3>
              <button 
                onClick={() => onNavigate?.("jobs")}
                className="text-[10px] font-bold text-[#60a5fa] hover:underline uppercase tracking-wider font-mono"
              >
                Tracker
              </button>
            </div>

            <div className="pt-4 space-y-3">
              <div className="flex justify-between items-center p-2.5 bg-white/2 rounded-xl border border-white/5 text-xs">
                <span className="text-gray-400">Total Tracked Vacancies</span>
                <span className="font-bold text-white font-mono">{jobs.length}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-bold">
                <div className="bg-white/2 p-2 rounded-xl border border-white/5 space-y-0.5">
                  <span className="text-yellow-400 font-mono text-xs block">{pipelineStats.Applied}</span>
                  <span className="text-gray-500 uppercase tracking-wider block text-[8.5px]">Applied</span>
                </div>
                <div className="bg-white/2 p-2 rounded-xl border border-white/5 space-y-0.5">
                  <span className="text-blue-400 font-mono text-xs block">{pipelineStats.Interview}</span>
                  <span className="text-gray-500 uppercase tracking-wider block text-[8.5px]">Interviews</span>
                </div>
                <div className="bg-white/2 p-2 rounded-xl border border-white/5 space-y-0.5">
                  <span className="text-emerald-400 font-mono text-xs block">{pipelineStats.Offer}</span>
                  <span className="text-gray-500 uppercase tracking-wider block text-[8.5px]">Offers</span>
                </div>
                <div className="bg-white/2 p-2 rounded-xl border border-white/5 space-y-0.5">
                  <span className="text-gray-300 font-mono text-xs block">{pipelineStats.Wishlist + pipelineStats.Assessment}</span>
                  <span className="text-gray-500 uppercase tracking-wider block text-[8.5px]">Pipeline</span>
                </div>
              </div>
            </div>
          </Card>

          {/* DSA Solved Status */}
          <Card className="p-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-gray-300 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#10B981]" /> DSA Benchmarks
              </h3>
              <button 
                onClick={() => onNavigate?.("tracker")}
                className="text-[10px] font-bold text-[#60a5fa] hover:underline uppercase tracking-wider font-mono"
              >
                Log Solves
              </button>
            </div>

            <div className="pt-4 space-y-3.5">
              <div className="flex justify-around items-center text-center p-3 bg-white/2 rounded-xl border border-white/5">
                <div>
                  <span className="text-lg font-mono font-bold text-white">{easySolved + mediumSolved + hardSolved}</span>
                  <span className="text-[8.5px] uppercase font-bold text-gray-500 block tracking-wider">Total Solved</span>
                </div>
                <div className="w-[1px] h-8 bg-white/5"></div>
                <div>
                  <span className="text-lg font-mono font-bold text-emerald-400">{streakDays}</span>
                  <span className="text-[8.5px] uppercase font-bold text-gray-500 block tracking-wider">Active Streak</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                <div className="p-2 bg-[#10b981]/5 border border-[#10b981]/10 rounded-lg">
                  <span className="text-gray-400 block text-[8px] uppercase">Easy</span>
                  <span className="text-[#10b981] font-bold text-xs mt-0.5 block">{easySolved}</span>
                </div>
                <div className="p-2 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                  <span className="text-gray-400 block text-[8px] uppercase">Medium</span>
                  <span className="text-blue-400 font-bold text-xs mt-0.5 block">{mediumSolved}</span>
                </div>
                <div className="p-2 bg-red-500/5 border border-red-500/10 rounded-lg">
                  <span className="text-gray-400 block text-[8px] uppercase">Hard</span>
                  <span className="text-red-400 font-bold text-xs mt-0.5 block">{hardSolved}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* AI Career Readiness index */}
          <Card className="p-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-gray-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8b5cf6]" /> AI Career Readiness
              </h3>
              <Badge variant="info" className="font-mono text-[9px]">{overallReadinessScore}% Index</Badge>
            </div>

            <div className="pt-4 space-y-3">
              <div className="flex items-center justify-between p-2.5 bg-gradient-to-r from-[#8b5cf6]/10 to-[#2563EB]/10 rounded-xl border border-[#8b5cf6]/20">
                <span className="text-[11px] text-gray-200 font-bold">Overall Readiness Score</span>
                <span className="font-mono text-base font-extrabold text-white">{overallReadinessScore}%</span>
              </div>

              <div className="space-y-2.5">
                {[
                  { 
                    name: "Resume Quality", 
                    score: calculatedResumeScore, 
                    tab: "resume",
                    explanation: resumeScore 
                      ? `Your parsed resume has an ATS keyword compatibility score of ${resumeScore}%. measurable accomplishments and layout are active.`
                      : "No resume analysis found. Please upload/paste your resume in the optimizer to scan for ATS gaps.",
                    nextStep: "Scan or optimize weak resume bullets to improve your score."
                  },
                  { 
                    name: "Target Skills", 
                    score: calculatedSkillsScore, 
                    tab: "settings",
                    explanation: `Matched ${matchedSkillsCount} out of ${targetSkillsList.length} critical skills for target role: ${targetRole}.`,
                    nextStep: "Go to settings to update your current skills array to close gaps."
                  },
                  { 
                    name: "DSA Benchmark", 
                    score: calculatedDsaScore, 
                    tab: "tracker",
                    explanation: `Completed ${totalSolved} algorithmic challenges relative to the 150 benchmark goal.`,
                    nextStep: "Practice and log more challenges in the DSA page."
                  },
                  { 
                    name: "Portfolio Projects", 
                    score: calculatedProjectsScore, 
                    tab: "roadmap",
                    explanation: projectRecommendations.length > 0
                      ? `Generated ${projectRecommendations.length} gaps-closing recommendations, with ${completedProjectsCount} marked completed.`
                      : "No gap-closing projects recommended. Complete onboarding and resume scan first.",
                    nextStep: "Build recommended projects matching your specialization skill gaps."
                  },
                  { 
                    name: "Mock Interview", 
                    score: calculatedInterviewScore, 
                    tab: "coach",
                    explanation: interviewScore
                      ? `Your latest AI mock interview speech and pacing evaluation score is ${interviewScore}%.`
                      : "No mock coach session completed yet. Evaluate technical and behavioral readiness with the AI.",
                    nextStep: "Start a behavioral or technical mock interview to benchmark your fluency."
                  },
                  { 
                    name: "CRM Funnel", 
                    score: calculatedApplicationsScore, 
                    tab: "jobs",
                    explanation: `Currently tracking ${jobs.length} vacancy opportunities in your job pipeline.`,
                    nextStep: "Add new target roles to your pipeline CRM to organize applications."
                  },
                  { 
                    name: "Roadmap Progress", 
                    score: calculatedRoadmapScore, 
                    tab: "roadmap",
                    explanation: roadmap
                      ? `Checked off ${checkedCount} out of ${totalTasksCount} tasks on your target plan.`
                      : "No active career roadmap generated. Redo onboarding or generate a plan first.",
                    nextStep: "Follow week items inside the Prep Planner roadmap and check completed items."
                  }
                ].map((metric, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedMetric({ title: metric.name, score: metric.score, explanation: metric.explanation, nextStep: metric.nextStep })}
                    className="w-full text-left p-2 hover:bg-white/2 rounded-lg border border-transparent hover:border-white/5 transition-all flex items-center justify-between group"
                  >
                    <span className="text-[10px] text-gray-400 font-bold group-hover:text-white transition-colors">{metric.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden hidden sm:block">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${metric.score}%` }}></div>
                      </div>
                      <span className="font-mono text-[10.5px] font-bold text-gray-300 group-hover:text-emerald-400 transition-colors">{metric.score}%</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </Card>

        </div>

      </div>

      {/* 4. Bottom Accordions FAQ & testimonies */}
      <div className="border-t border-white/5 pt-8 space-y-6">
        
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* FAQs (2/3 width) */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xs uppercase tracking-wider font-extrabold text-gray-300 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-gray-500" /> FAQ Accordion
            </h3>
            <div className="space-y-2">
              {FAQS.slice(0, 3).map(faq => (
                <div key={faq.id} className="bg-white/2 rounded-xl border border-white/5 overflow-hidden">
                  <button 
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between text-left p-4 hover:bg-white/2 transition-all"
                  >
                    <span className="text-xs font-bold text-gray-200">{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${expandedFaq === faq.id ? "rotate-180 text-white" : ""}`} />
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="px-4 pb-4 text-[11px] text-gray-400 leading-relaxed border-t border-white/5 pt-3 bg-black/10">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Testimonies (1/3 width) */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-wider font-extrabold text-gray-300 flex items-center gap-2">
              <Star className="w-4 h-4 text-gray-500" /> Member Feedback
            </h3>
            <div className="space-y-4">
              {TESTIMONIALS.map((t, idx) => (
                <div key={idx} className="p-4 bg-white/2 rounded-xl border border-white/5 space-y-3">
                  <p className="italic text-[10.5px] leading-relaxed text-gray-300">"{t.quote}"</p>
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full overflow-hidden bg-white/10 border border-white/10 shrink-0">
                      <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-bold text-white text-[10px] block truncate">{t.name}</span>
                      <span className="text-gray-500 text-[8.5px] block truncate">{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Explanation Modal Overlay */}
      {selectedMetric && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <Card className="max-w-md w-full p-6 space-y-4 relative border-white/10 shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-[#8b5cf6]/20">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">{selectedMetric.title} Breakdown</h3>
              <Badge variant="info" className="font-mono text-xs">{selectedMetric.score}%</Badge>
            </div>
            
            <div className="space-y-3 pt-2">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400 font-mono">Telemetry Findings</span>
                <p className="text-xs text-gray-200 leading-relaxed">{selectedMetric.explanation}</p>
              </div>
              <div className="space-y-1 border-t border-white/5 pt-3">
                <span className="text-[10px] uppercase font-bold text-[#8b5cf6] font-mono">Recommended Next Action</span>
                <p className="text-xs text-gray-300 leading-relaxed">{selectedMetric.nextStep}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-white/5">
              <Button 
                onClick={() => setSelectedMetric(null)}
                variant="outline" 
                className="flex-1 py-2.5 text-xs font-bold"
              >
                Close details
              </Button>
            </div>
          </Card>
        </div>
      )}

    </div>
  );
}
