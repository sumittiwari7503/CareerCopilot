import React, { useState } from "react";
import { 
  Sparkles, 
  Terminal, 
  Check, 
  TrendingUp, 
  HelpCircle, 
  ChevronDown, 
  ArrowRight, 
  UserCheck, 
  Flame, 
  Briefcase,
  Layers,
  ChevronRight,
  BookOpen,
  Code,
  Target,
  FileText,
  Compass,
  AlertCircle,
  Clock,
  ShieldCheck
} from "lucide-react";
import { ActionItem, JobCard, ProjectRecommendation, CareerRoadmap } from "../../types";
import { FAQS } from "../../constants";
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
  onNavigate?: (tab: any) => void;
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
  jobs = [],
  currentSkills = [],
  projectRecommendations = [],
  checkedTasks = {},
  roadmap
}: DashboardPageProps) {
  // Local mission completed tracker for tasks not bound to backend
  const [localCompletedMissions, setLocalCompletedMissions] = useState<Record<string, boolean>>({});

  // Parse tasks array from todayAction
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

  // 1. WHAT IS MY CAREER GOAL?
  const roleDisplay = targetRole || "Software Engineer";
  const companyDisplay = targetCompany 
    ? `${targetCompany}${companyType ? ` • ${companyType}` : ""}`
    : "Open to target tech companies";
  const timelineDisplay = `${targetTimeline || 3} Months (${timeAvailable || "2 hours"}/day)`;

  // 2. WHERE AM I CURRENTLY? (Profile completeness strictly from genuine data fields)
  const profileFields = [
    { name: "Personal Name", done: !!personalName && personalName.trim() !== "" },
    { name: "Target Engineering Role", done: !!targetRole && targetRole.trim() !== "" },
    { name: "Specialization Track", done: !!specialization && specialization.trim() !== "" },
    { name: "Verified Skills Inventory", done: currentSkills.length > 0 },
    { name: "Resume Analyzed", done: resumeScore !== null },
    { name: "Roadmap Established", done: !!roadmap }
  ];
  const completedFieldCount = profileFields.filter(f => f.done).length;
  const profileCompletenessPct = Math.round((completedFieldCount / profileFields.length) * 100);

  // 3. WHAT IS MY PROGRESS? (Calculated exclusively from verified database records)
  const totalDsaSolved = easySolved + mediumSolved + hardSolved;
  
  let checkedRoadmapCount = Object.keys(checkedTasks || {}).filter(k => checkedTasks[k]).length;
  let totalRoadmapTasks = 0;
  if (roadmap && roadmap.months) {
    roadmap.months.forEach(m => {
      m.weeks.forEach(w => {
        totalRoadmapTasks += w.tasks.length;
      });
    });
  }
  const roadmapPct = totalRoadmapTasks > 0 
    ? Math.min(Math.round((checkedRoadmapCount / totalRoadmapTasks) * 100), 100) 
    : 0;

  // Pipeline counts from real Application records
  const pipelineCounts = {
    Saved: jobs.filter(j => j.status === "Saved" || j.status === "Wishlist").length,
    Applied: jobs.filter(j => j.status === "Applied").length,
    Assessment: jobs.filter(j => j.status === "Online Assessment" || j.status === "Assessment").length,
    Interview: jobs.filter(j => j.status.includes("Interview")).length,
    Offer: jobs.filter(j => j.status === "Offer").length,
    Rejected: jobs.filter(j => j.status === "Rejected").length
  };

  // 4. TODAY'S MISSION (Dynamic from user's actual roadmap / DSA / profile)
  // Build dynamic 4-5 items based on user's real situation
  interface DynamicMission {
    id: string;
    category: "DSA" | "Learning" | "Project" | "Interview" | "Application";
    title: string;
    detail: string;
    actionTab: string;
    completed: boolean;
  }

  const dynamicMissions: DynamicMission[] = [];

  // Item 1: DSA Task
  if (totalDsaSolved === 0) {
    dynamicMissions.push({
      id: "mission-dsa-first",
      category: "DSA",
      title: "Solve your first DSA challenge",
      detail: "Begin with 'Two Sum' or 'Valid Palindrome' in Arrays & Strings",
      actionTab: "dsa",
      completed: !!localCompletedMissions["mission-dsa-first"]
    });
  } else {
    dynamicMissions.push({
      id: "mission-dsa-practice",
      category: "DSA",
      title: "Practice 1 DSA problem from your focus topic",
      detail: `Current milestone: ${totalDsaSolved} completed. Solve a Medium difficulty problem today.`,
      actionTab: "dsa",
      completed: !!localCompletedMissions["mission-dsa-practice"]
    });
  }

  // Item 2: Learning Task (from roadmap or profile)
  if (roadmap && roadmap.months && roadmap.months[0]?.weeks[0]) {
    const currentWeek = roadmap.months[0].weeks[0];
    const firstUncheckedTask = currentWeek.tasks.find(t => !checkedTasks[t]) || currentWeek.tasks[0];
    dynamicMissions.push({
      id: "mission-roadmap-task",
      category: "Learning",
      title: `Roadmap: ${currentWeek.weekTitle}`,
      detail: firstUncheckedTask || "Advance to the next milestone in your prep timeline",
      actionTab: "roadmap",
      completed: firstUncheckedTask ? !!checkedTasks[firstUncheckedTask] : false
    });
  } else {
    dynamicMissions.push({
      id: "mission-generate-roadmap",
      category: "Learning",
      title: "Generate personalized career roadmap",
      detail: "Tailor weekly milestones to your timeline and target specialty",
      actionTab: "roadmap",
      completed: !!roadmap
    });
  }

  // Item 3: Project Task
  if (projectRecommendations.length > 0) {
    const topProj = projectRecommendations[0];
    dynamicMissions.push({
      id: "mission-project-work",
      category: "Project",
      title: `Work on ${topProj.title}`,
      detail: `Tech: ${topProj.techStack.slice(0, 3).join(", ")} • Bridges ${topProj.sourceGap}`,
      actionTab: "projects",
      completed: topProj.status === "Completed"
    });
  } else {
    dynamicMissions.push({
      id: "mission-project-add",
      category: "Project",
      title: "Document a portfolio project",
      detail: "Add your key projects to demonstrate real technical competencies",
      actionTab: "projects",
      completed: !!localCompletedMissions["mission-project-add"]
    });
  }

  // Item 4: Interview Task
  if (interviewScore === null) {
    dynamicMissions.push({
      id: "mission-interview-prep",
      category: "Interview",
      title: "Conduct an initial technical or HR mock screen",
      detail: "Test verbal fluency and engineering depth with the AI Coach",
      actionTab: "interview-mock",
      completed: false
    });
  } else {
    dynamicMissions.push({
      id: "mission-interview-star",
      category: "Interview",
      title: "Refine a STAR behavioral scenario",
      detail: "Structure a past project challenge using Situation, Task, Action, and Result",
      actionTab: "interview-behavioral",
      completed: !!localCompletedMissions["mission-interview-star"]
    });
  }

  // Item 5: Application Task
  if (jobs.length === 0) {
    dynamicMissions.push({
      id: "mission-apply-first",
      category: "Application",
      title: "Add 1 target job opportunity to your pipeline",
      detail: "Track application status, salary range, and interview dates in CRM",
      actionTab: "jobs",
      completed: false
    });
  } else {
    dynamicMissions.push({
      id: "mission-apply-followup",
      category: "Application",
      title: `Review ${jobs.length} tracked pipeline positions`,
      detail: "Check for pending recruiter follow-ups or upcoming interview milestones",
      actionTab: "jobs",
      completed: !!localCompletedMissions["mission-apply-followup"]
    });
  }

  // 5. WHAT ARE MY BIGGEST SKILL GAPS?
  // Dynamic calculation comparing targetRole technical requirements against user's currentSkills
  const getDynamicSkillGaps = () => {
    const roleLower = (targetRole || "").toLowerCase();
    let benchmarks: { name: string; priority: "High" | "Medium"; description: string }[] = [];

    if (roleLower.includes("frontend")) {
      benchmarks = [
        { name: "TypeScript", priority: "High", description: "Static typing, generics, and modern TS design patterns" },
        { name: "React", priority: "High", description: "Component lifecycles, hooks, and client-side state management" },
        { name: "CSS & Web UI Architecture", priority: "High", description: "Responsive layouts, Tailwind, flexbox/grid, and performance" },
        { name: "Web Performance & Core Vitals", priority: "Medium", description: "Bundle optimization, code-splitting, and memoization" },
        { name: "Testing (Vitest/Jest)", priority: "Medium", description: "Unit, integration, and user-event testing" }
      ];
    } else if (roleLower.includes("backend")) {
      benchmarks = [
        { name: "Node.js / Express / Backend Runtime", priority: "High", description: "RESTful API design, middleware, and async execution" },
        { name: "Databases (SQL & NoSQL)", priority: "High", description: "Query optimization, indexing, schema modeling, and ACID transactions" },
        { name: "System Design & Architecture", priority: "High", description: "Caching, microservices, load balancing, and rate limiting" },
        { name: "Docker & Containerization", priority: "Medium", description: "Multi-stage builds, container networking, and CI/CD pipelines" },
        { name: "Cloud Infrastructure (AWS/GCP)", priority: "Medium", description: "Serverless functions, object storage, and managed databases" }
      ];
    } else if (roleLower.includes("full stack") || roleLower.includes("fullstack")) {
      benchmarks = [
        { name: "React / Frontend", priority: "High", description: "Modern reactive UI architecture and state flow" },
        { name: "Node.js / Backend", priority: "High", description: "Server-side services, authentication, and API endpoints" },
        { name: "SQL & Relational Modeling", priority: "High", description: "PostgreSQL, Prisma ORM, migrations, and joins" },
        { name: "System Design", priority: "Medium", description: "End-to-end full stack architecture and caching strategies" },
        { name: "Docker & CI/CD", priority: "Medium", description: "Automated test suites and containerized deployments" }
      ];
    } else {
      benchmarks = [
        { name: "Data Structures & Algorithms", priority: "High", description: "Arrays, hashing, two pointers, trees, graphs, and DP" },
        { name: "Object-Oriented Programming (OOP)", priority: "High", description: "Clean code principles, encapsulation, and design patterns" },
        { name: "System Design Fundamentals", priority: "High", description: "Scalability, API design, database choice, and availability" },
        { name: "Git & Version Control", priority: "Medium", description: "Branching strategies, pull request etiquette, and conflict resolution" }
      ];
    }

    return benchmarks.map(bm => {
      const match = currentSkills.some(cs => 
        cs.toLowerCase().replace(/[^a-z0-9]/g, "") === bm.name.toLowerCase().replace(/[^a-z0-9]/g, "") ||
        bm.name.toLowerCase().includes(cs.toLowerCase()) ||
        cs.toLowerCase().includes(bm.name.toLowerCase().split(" ")[0])
      );
      return {
        ...bm,
        status: match ? ("Strong" as const) : ("Missing" as const)
      };
    });
  };

  const skillGaps = getDynamicSkillGaps();
  const strongSkills = skillGaps.filter(s => s.status === "Strong");
  const missingSkills = skillGaps.filter(s => s.status === "Missing");

  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. Header Greeting & Telemetry Bar */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#60a5fa] bg-[#2563EB]/10 px-2 py-0.5 rounded-md border border-[#2563EB]/20">
              Personal AI Career Operating System
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            {getGreeting()}, {personalName ? personalName.split(" ")[0] : "Engineer"}
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Your daily career command center. Everything below is derived strictly from your verified profile data.
          </p>
        </div>

        <div className="flex gap-3">
          <div className="bg-[#111827] border border-white/10 px-3.5 py-2 rounded-xl flex items-center gap-2.5 shadow-sm">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400/20" />
            <div className="text-left">
              <span className="text-[9px] uppercase font-bold text-gray-400 block font-mono">Streak</span>
              <span className="text-xs font-bold text-white font-mono">{streakDays} Days</span>
            </div>
          </div>
          <div className="bg-[#111827] border border-white/10 px-3.5 py-2 rounded-xl flex items-center gap-2.5 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#60a5fa]" />
            <div className="text-left">
              <span className="text-[9px] uppercase font-bold text-gray-400 block font-mono">XP Score</span>
              <span className="text-xs font-bold text-white font-mono">{dailyScore} XP</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUESTION 1 & 2: WHAT IS MY CAREER GOAL & WHERE AM I CURRENTLY? */}
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Career Goal Card (2/3 width) */}
        <Card variant="elevated" className="md:col-span-2 p-6 border-[#2563EB]/20 bg-[#111827] flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#60a5fa]" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#60a5fa] font-mono">Career Goal</span>
                  <Badge variant="default" className="text-[9px] font-mono bg-white/5 text-gray-300 border-white/10">Your Data</Badge>
                </div>
                <h3 className="text-xl font-extrabold text-white mt-1">{roleDisplay}</h3>
              </div>
              <Badge variant={roadmap ? "success" : "default"} className="text-[10px] font-mono">
                {roadmap ? "Roadmap Active" : "No Roadmap Yet"}
              </Badge>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-3 border-t border-white/5 pt-4">
              <div className="p-2.5 rounded-xl bg-white/2 border border-white/5">
                <span className="text-[9px] uppercase font-mono text-gray-400 block">Target Preference</span>
                <span className="text-xs font-bold text-white mt-0.5 block truncate">{companyDisplay}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/2 border border-white/5">
                <span className="text-[9px] uppercase font-mono text-gray-400 block">Target Timeline</span>
                <span className="text-xs font-bold text-white mt-0.5 block truncate">{timelineDisplay}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/2 border border-white/5">
                <span className="text-[9px] uppercase font-mono text-gray-400 block">Specialization</span>
                <span className="text-xs font-bold text-white mt-0.5 block truncate">{specialization || "General Engineering"}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 mt-5 pt-3 border-t border-white/5">
            <Button 
              onClick={() => onNavigate?.("roadmap")}
              variant="primary" 
              className="text-xs font-bold py-2 px-4 flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5" /> Open Roadmap
            </Button>
            <Button
              onClick={() => onNavigate?.("settings")}
              variant="outline"
              className="text-xs py-2 px-3.5"
            >
              Edit Career Goal
            </Button>
          </div>
        </Card>

        {/* Profile Completeness Card (1/3 width) */}
        <Card variant="elevated" className="p-6 border-white/10 bg-[#111827] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-300 font-mono">Current State</span>
              </div>
              <span className="font-mono text-xs font-extrabold text-emerald-400">{profileCompletenessPct}% Complete</span>
            </div>

            <div className="mt-4 space-y-2">
              {profileFields.map((field, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1">
                  <span className={field.done ? "text-gray-300 font-medium" : "text-gray-500"}>{field.name}</span>
                  {field.done ? (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-bold">
                      <Check className="w-3 h-3 stroke-[3px]" /> Complete
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-gray-500">Pending</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5">
            <p className="text-[10.5px] text-gray-400 leading-relaxed">
              {profileCompletenessPct === 100 
                ? "Your baseline career profile is 100% configured." 
                : `Complete ${profileFields.length - completedFieldCount} more profile section to unlock full AI precision.`}
            </p>
          </div>
        </Card>

      </div>

      {/* 3. QUESTION 3: WHAT IS MY PROGRESS? (Real Data Metrics with Honest Empty States) */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#60a5fa]" />
            <h3 className="text-xs uppercase font-extrabold tracking-wider text-gray-300 font-mono">Verified Progress Telemetry</h3>
            <Badge variant="default" className="text-[9px] font-mono bg-white/5 text-gray-400">Strictly Database Sourced</Badge>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Tile 1: DSA Practice */}
          <Card className="p-4 bg-[#111827] border-white/5 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono uppercase text-gray-400 font-bold">DSA Solved</span>
                <Code className="w-3.5 h-3.5 text-[#10B981]" />
              </div>
              {totalDsaSolved > 0 ? (
                <>
                  <div className="text-xl font-extrabold font-mono text-white">{totalDsaSolved} Problems</div>
                  <div className="flex gap-2 text-[10px] font-mono text-gray-400 pt-1">
                    <span className="text-emerald-400 font-bold">{easySolved}E</span> • 
                    <span className="text-blue-400 font-bold">{mediumSolved}M</span> • 
                    <span className="text-red-400 font-bold">{hardSolved}H</span>
                  </div>
                </>
              ) : (
                <div className="py-2 space-y-1">
                  <span className="text-xs text-gray-400 font-semibold block">No DSA activity yet</span>
                  <span className="text-[10px] text-gray-500 block">Start your first problem in DSA to track progress.</span>
                </div>
              )}
            </div>
            <button 
              onClick={() => onNavigate?.("dsa")} 
              className="text-[10.5px] font-bold text-[#60a5fa] hover:underline mt-3 flex items-center gap-1 font-mono uppercase"
            >
              Open DSA & Coding <ChevronRight className="w-3 h-3" />
            </button>
          </Card>

          {/* Tile 2: Roadmap Milestone Velocity */}
          <Card className="p-4 bg-[#111827] border-white/5 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono uppercase text-gray-400 font-bold">Roadmap Progress</span>
                <Compass className="w-3.5 h-3.5 text-[#60a5fa]" />
              </div>
              {roadmap ? (
                <>
                  <div className="text-xl font-extrabold font-mono text-white">{roadmapPct}% Complete</div>
                  <p className="text-[10px] text-gray-400 pt-1 font-mono">
                    {checkedRoadmapCount} of {totalRoadmapTasks} tasks checked off
                  </p>
                </>
              ) : (
                <div className="py-2 space-y-1">
                  <span className="text-xs text-gray-400 font-semibold block">No active roadmap</span>
                  <span className="text-[10px] text-gray-500 block">Generate a custom timeline in Prep Planner.</span>
                </div>
              )}
            </div>
            <button 
              onClick={() => onNavigate?.("roadmap")} 
              className="text-[10.5px] font-bold text-[#60a5fa] hover:underline mt-3 flex items-center gap-1 font-mono uppercase"
            >
              View Roadmap <ChevronRight className="w-3 h-3" />
            </button>
          </Card>

          {/* Tile 3: Applications CRM */}
          <Card className="p-4 bg-[#111827] border-white/5 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono uppercase text-gray-400 font-bold">Job Pipeline</span>
                <Briefcase className="w-3.5 h-3.5 text-[#a78bfa]" />
              </div>
              {jobs.length > 0 ? (
                <>
                  <div className="text-xl font-extrabold font-mono text-white">{jobs.length} Tracked</div>
                  <p className="text-[10px] text-gray-400 pt-1 font-mono">
                    {pipelineCounts.Applied} applied • {pipelineCounts.Interview} in interview
                  </p>
                </>
              ) : (
                <div className="py-2 space-y-1">
                  <span className="text-xs text-gray-400 font-semibold block">No applications tracked</span>
                  <span className="text-[10px] text-gray-500 block">Add job postings to organize your funnel.</span>
                </div>
              )}
            </div>
            <button 
              onClick={() => onNavigate?.("jobs")} 
              className="text-[10.5px] font-bold text-[#60a5fa] hover:underline mt-3 flex items-center gap-1 font-mono uppercase"
            >
              Open Pipeline CRM <ChevronRight className="w-3 h-3" />
            </button>
          </Card>

          {/* Tile 4: Interview & Resume Status */}
          <Card className="p-4 bg-[#111827] border-white/5 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono uppercase text-gray-400 font-bold">Interview & ATS</span>
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              </div>
              {resumeScore !== null || interviewScore !== null ? (
                <>
                  <div className="text-xl font-extrabold font-mono text-white">
                    {resumeScore !== null ? `${resumeScore}% ATS` : "Resume: —"}
                  </div>
                  <p className="text-[10px] text-gray-400 pt-1 font-mono">
                    {interviewScore !== null ? `Mock Score: ${interviewScore}%` : "No mock screen yet"}
                  </p>
                </>
              ) : (
                <div className="py-2 space-y-1">
                  <span className="text-xs text-gray-400 font-semibold block">No test scores yet</span>
                  <span className="text-[10px] text-gray-500 block">Scan resume or run AI mock interview.</span>
                </div>
              )}
            </div>
            <button 
              onClick={() => onNavigate?.(resumeScore === null ? "resume" : "interview-mock")} 
              className="text-[10.5px] font-bold text-[#60a5fa] hover:underline mt-3 flex items-center gap-1 font-mono uppercase"
            >
              {resumeScore === null ? "Scan Resume" : "Practice Interview"} <ChevronRight className="w-3 h-3" />
            </button>
          </Card>

        </div>
      </section>

      {/* 4. QUESTION 4 & 5: TODAY'S MISSION & SKILL GAPS */}
      <div className="grid lg:grid-cols-3 gap-6 items-start">
        
        {/* Today's Mission (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 bg-[#111827] border-white/10">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#60a5fa]" />
                  <h3 className="text-xs uppercase tracking-wider font-extrabold text-white font-mono">
                    Today's Mission
                  </h3>
                  <Badge variant="default" className="text-[9px] font-mono bg-[#2563EB]/10 text-[#60a5fa] border-[#2563EB]/20">
                    AI-Generated Recommendation
                  </Badge>
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Generated from your target role, roadmap status, and daily available time ({timeAvailable || "2 hours"}).
                </p>
              </div>

              <span className="text-[10px] font-mono text-gray-400 font-bold">
                {dynamicMissions.filter(m => m.completed).length} / {dynamicMissions.length} Done
              </span>
            </div>

            {/* Dynamic mission task list */}
            <div className="pt-4 space-y-2.5">
              {dynamicMissions.map((mission) => {
                const isDone = mission.completed;
                return (
                  <div 
                    key={mission.id}
                    className={`flex items-start justify-between p-3.5 rounded-xl border transition-all ${
                      isDone 
                        ? "bg-white/2 border-white/5 opacity-70" 
                        : "bg-white/3 border-white/5 hover:border-white/15"
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <button 
                        onClick={() => setLocalCompletedMissions(prev => ({ ...prev, [mission.id]: !prev[mission.id] }))}
                        className={`w-4 h-4 mt-0.5 rounded border flex items-center justify-center transition-all shrink-0 ${
                          isDone ? "bg-emerald-500 border-emerald-500 text-slate-950" : "border-white/30 hover:border-white/60"
                        }`}
                      >
                        {isDone && <Check className="w-2.5 h-2.5 stroke-[3px]" />}
                      </button>
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono uppercase font-bold text-gray-400 px-1.5 py-0.2 rounded bg-white/5">
                            {mission.category}
                          </span>
                          <h4 className={`text-xs font-bold truncate ${isDone ? "line-through text-gray-500" : "text-white"}`}>
                            {mission.title}
                          </h4>
                        </div>
                        <p className={`text-[11px] mt-0.5 leading-relaxed ${isDone ? "text-gray-600" : "text-gray-300"}`}>
                          {mission.detail}
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={() => onNavigate?.(mission.actionTab)}
                      className="shrink-0 text-[10.5px] font-bold text-[#60a5fa] hover:text-white px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-all font-mono uppercase"
                    >
                      Start →
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Profile Action Item (if available) */}
            {todayAction && (
              <div className="mt-5 pt-4 border-t border-white/5">
                <div className="p-3.5 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/25 flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="info" className="text-[9px] font-mono">{todayAction.priority} Priority</Badge>
                      <span className="text-[9px] font-mono text-gray-400 font-bold">{todayAction.estimatedMinutes} Mins</span>
                    </div>
                    <h4 className="text-xs font-bold text-white">{todayAction.title}</h4>
                    <p className="text-[11px] text-gray-300">{todayAction.description}</p>
                  </div>
                  <Button 
                    onClick={() => onCompleteAction?.(todayAction.id)}
                    variant="primary" 
                    className="text-xs shrink-0 py-1.5 px-3"
                  >
                    Mark Done
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Skill Gap Analyzer (1/3 width) */}
        <div className="space-y-6">
          <Card className="p-6 bg-[#111827] border-white/10">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#8b5cf6]" />
                  <h3 className="text-xs uppercase tracking-wider font-extrabold text-white font-mono">
                    Skill Gap Analyzer
                  </h3>
                </div>
                <span className="text-[10px] text-gray-400 font-mono">Target: {roleDisplay}</span>
              </div>
              <Badge variant="default" className="text-[9px] font-mono bg-white/5 text-gray-400">
                AI Benchmark
              </Badge>
            </div>

            <div className="pt-4 space-y-3">
              {/* Missing Competencies */}
              {missingSkills.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[9.5px] uppercase font-bold text-red-400 font-mono tracking-wider flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Focus Gaps ({missingSkills.length})
                  </span>
                  {missingSkills.map((gap, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-red-500/5 border border-red-500/10 space-y-0.5">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-white">{gap.name}</span>
                        <span className="text-[9px] font-mono text-red-400 font-bold uppercase">{gap.priority}</span>
                      </div>
                      <p className="text-[10px] text-gray-400 leading-snug">{gap.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Strong Verified Competencies */}
              {strongSkills.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <span className="text-[9.5px] uppercase font-bold text-emerald-400 font-mono tracking-wider flex items-center gap-1">
                    <Check className="w-3 h-3" /> Strong in Profile ({strongSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {strongSkills.map((skill, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-[10px] font-semibold">
                        ✓ {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action link to update skills */}
              <div className="pt-3 border-t border-white/5">
                <button 
                  onClick={() => onNavigate?.("settings")}
                  className="w-full py-2 text-center text-xs font-bold text-[#60a5fa] hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all font-mono"
                >
                  Manage Skills in Profile →
                </button>
              </div>
            </div>
          </Card>
        </div>

      </div>

      {/* 5. Frequently Asked Questions (Factual, no fake testimonials) */}
      <section className="border-t border-white/5 pt-8 space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-gray-400" />
          <h3 className="text-xs uppercase tracking-wider font-extrabold text-gray-300 font-mono">
            Platform Guidance & Principles
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {FAQS.map(faq => (
            <div key={faq.id} className="bg-[#111827] rounded-xl border border-white/5 overflow-hidden">
              <button 
                onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between text-left p-4 hover:bg-white/2 transition-all"
              >
                <span className="text-xs font-bold text-gray-200">{faq.question}</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${expandedFaq === faq.id ? "rotate-180 text-white" : ""}`} />
              </button>
              {expandedFaq === faq.id && (
                <div className="px-4 pb-4 text-[11px] text-gray-400 leading-relaxed border-t border-white/5 pt-3 bg-black/20">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

