import React from "react";
import { 
  Compass, 
  Map, 
  Code2, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  Circle, 
  Target, 
  Clock, 
  FileText, 
  FolderGit2, 
  ExternalLink,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { ActionItem, JobCard, ProjectRecommendation, CareerRoadmap } from "../../types";
import { ALL_PATTERN_PROBLEMS, TOTAL_PATTERN_PROBLEMS } from "../../data/risingBrainDsa";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";

interface DashboardPageProps {
  personalName: string;
  targetRole: string;
  streakDays: number;
  dailyScore: number;
  expandedFaq?: string | null;
  setExpandedFaq?: (id: string | null) => void;
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
  onNavigate,
  targetCompany,
  companyType,
  specialization,
  targetTimeline,
  timeAvailable,
  easySolved = 0,
  mediumSolved = 0,
  hardSolved = 0,
  resumeScore,
  jobs = [],
  currentSkills = [],
  checkedTasks = {},
  roadmap
}: DashboardPageProps) {
  // Determine greeting based on current local hours
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning";
    if (hours < 17) return "Good afternoon";
    return "Good evening";
  };

  // 1. Profile Strength Calculation (Strictly from real user fields)
  const profileChecklist = [
    { name: "Personal information", completed: !!personalName && personalName.trim() !== "" },
    { name: "Target role", completed: !!targetRole && targetRole.trim() !== "" },
    { name: "Specialization", completed: !!specialization && specialization.trim() !== "" },
    { name: "Skills inventory", completed: Array.isArray(currentSkills) && currentSkills.length > 0 },
    { name: "Resume analyzed", completed: resumeScore !== null }
  ];
  const completedSectionsCount = profileChecklist.filter(item => item.completed).length;
  const profileStrengthPct = Math.round((completedSectionsCount / profileChecklist.length) * 100);
  const remainingSections = profileChecklist.length - completedSectionsCount;

  // 2. Real Metric Progress Calculations
  const totalDsaSolved = easySolved + mediumSolved + hardSolved;
  const dsaPct = totalDsaSolved > 0 ? Math.min(Math.round((totalDsaSolved / TOTAL_PATTERN_PROBLEMS) * 100), 100) : null;

  let checkedRoadmapCount = 0;
  let totalRoadmapTasks = 0;
  if (roadmap && Array.isArray(roadmap.months)) {
    roadmap.months.forEach(m => {
      if (Array.isArray(m.weeks)) {
        m.weeks.forEach(w => {
          if (Array.isArray(w.tasks)) {
            totalRoadmapTasks += w.tasks.length;
          }
        });
      }
    });
    checkedRoadmapCount = Object.keys(checkedTasks || {}).filter(k => checkedTasks[k]).length;
  }
  const roadmapPct = totalRoadmapTasks > 0 
    ? Math.min(Math.round((checkedRoadmapCount / totalRoadmapTasks) * 100), 100) 
    : null;

  // 3. Recommended Next Problem from authentic library
  // Default to first problem in list (Move Zeroes or Two Sum)
  const nextRecommendedProblem = ALL_PATTERN_PROBLEMS[0] || {
    id: "p1",
    title: "Two Sum",
    difficulty: "Easy" as const,
    topicTitle: "Array"
  };

  // 4. Dynamic Today Focus Tasks
  const todayTasks = [
    {
      id: "focus-dsa",
      category: "DSA & Coding",
      title: "Solve " + nextRecommendedProblem.title,
      description: "Pattern: " + (nextRecommendedProblem.topicTitle || "Array") + " · " + nextRecommendedProblem.difficulty + " difficulty",
      actionTab: "dsa",
      actionLabel: "Solve problem"
    },
    {
      id: "focus-roadmap",
      category: "Roadmap",
      title: roadmap ? "Advance this week's preparation milestone" : "Generate your personalized roadmap",
      description: roadmap 
        ? checkedRoadmapCount + " of " + totalRoadmapTasks + " tasks completed"
        : "Set week-by-week goals tailored to your target timeline",
      actionTab: "roadmap",
      actionLabel: roadmap ? "Open roadmap" : "Generate plan"
    },
    {
      id: "focus-portfolio",
      category: "Portfolio",
      title: resumeScore !== null ? "Review your ATS resume match" : "Upload your resume for ATS analysis",
      description: resumeScore !== null 
        ? "Current ATS compatibility score: " + resumeScore + "/100"
        : "Scan your resume against target technical requirements",
      actionTab: "resume",
      actionLabel: "Open resume"
    }
  ];

  return (
    <div className="space-y-8 pb-12 font-sans">
      
      {/* 1. Header Hero Section */}
      <section className="space-y-1.5 border-b border-slate-800/80 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
              {getGreeting()}, {personalName || "Candidate"}
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              {targetRole || "Software Engineer"}{specialization ? " · " + specialization : ""}
            </p>
          </div>
          {remainingSections > 0 && (
            <Button
              onClick={() => onNavigate?.("settings")}
              variant="outline"
              className="text-xs text-slate-300 border-slate-700 hover:bg-slate-800/50"
            >
              Complete profile ({profileStrengthPct}%)
            </Button>
          )}
        </div>
      </section>

      {/* 2. Primary Section: CAREER PROGRESS (Real Metrics Only) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Career Progress
          </h2>
          <span className="text-[11px] text-slate-400 font-medium">Your Data</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Profile Strength */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-1">
            <span className="text-xs text-slate-400 block">Profile strength</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-slate-100">{profileStrengthPct}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-2">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: profileStrengthPct + "%" }}
              ></div>
            </div>
          </div>

          {/* Roadmap Progress */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-1">
            <span className="text-xs text-slate-400 block">Roadmap progress</span>
            <div className="flex items-baseline gap-1.5">
              {roadmapPct !== null ? (
                <>
                  <span className="text-xl font-bold text-slate-100">{roadmapPct}%</span>
                  <span className="text-xs text-slate-500">({checkedRoadmapCount}/{totalRoadmapTasks})</span>
                </>
              ) : (
                <span className="text-sm font-medium text-slate-400 mt-1 block">Not started yet</span>
              )}
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-2">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: (roadmapPct || 0) + "%" }}
              ></div>
            </div>
          </div>

          {/* DSA Progress */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-1">
            <span className="text-xs text-slate-400 block">DSA progress</span>
            <div className="flex items-baseline gap-1.5">
              {totalDsaSolved > 0 ? (
                <>
                  <span className="text-xl font-bold text-slate-100">{dsaPct}%</span>
                  <span className="text-xs text-slate-500">({totalDsaSolved}/{TOTAL_PATTERN_PROBLEMS})</span>
                </>
              ) : (
                <span className="text-sm font-medium text-slate-400 mt-1 block">0 / {TOTAL_PATTERN_PROBLEMS} solved</span>
              )}
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-2">
              <div 
                className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                style={{ width: (dsaPct || 0) + "%" }}
              ></div>
            </div>
          </div>

          {/* Active Applications */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-1">
            <span className="text-xs text-slate-400 block">Applications tracked</span>
            <div className="flex items-baseline gap-1.5">
              {jobs.length > 0 ? (
                <>
                  <span className="text-xl font-bold text-slate-100">{jobs.length}</span>
                  <span className="text-xs text-slate-500">in pipeline</span>
                </>
              ) : (
                <span className="text-sm font-medium text-slate-400 mt-1 block">0 applications</span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 pt-1.5">
              {jobs.length > 0 ? "Tracking pipeline" : "Pipeline is empty"}
            </p>
          </div>

        </div>
      </section>

      {/* 3. Two-Column Core Layout: Today Focus + Career Goal & Profile Strength */}
      <div className="grid md:grid-cols-3 gap-6 items-start">
        
        {/* Left Column (2/3): Today's Focus */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Today's Focus Card */}
          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
              <div>
                <h3 className="text-sm font-bold text-slate-100">Today's focus</h3>
                <p className="text-xs text-slate-400 mt-0.5">Recommended steps based on your active preparation</p>
              </div>
              <Badge variant="default">Your Progress</Badge>
            </div>

            <div className="space-y-3">
              {todayTasks.map(task => (
                <div 
                  key={task.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700/80 transition-colors"
                >
                  <div className="space-y-0.5 pr-4">
                    <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider block">
                      {task.category}
                    </span>
                    <h4 className="text-xs font-semibold text-slate-200">
                      {task.title}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {task.description}
                    </p>
                  </div>
                  <Button
                    onClick={() => onNavigate?.(task.actionTab)}
                    variant="outline"
                    className="text-xs px-3 py-1.5 shrink-0"
                  >
                    {task.actionLabel}
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Next DSA Problem Card */}
          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold text-slate-100">DSA & Coding Practice</h3>
              </div>
              <Badge variant="default">Source: RisingBrain</Badge>
            </div>

            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="space-y-1">
                <span className="text-[11px] text-slate-400 block">Next recommended problem</span>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-slate-100">
                    {nextRecommendedProblem.title}
                  </h4>
                  <Badge 
                    variant={nextRecommendedProblem.difficulty === "Easy" ? "success" : nextRecommendedProblem.difficulty === "Medium" ? "warning" : "error"}
                  >
                    {nextRecommendedProblem.difficulty}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400">
                  Topic: {nextRecommendedProblem.topicTitle || "Array"} · {totalDsaSolved} of {TOTAL_PATTERN_PROBLEMS} problems solved
                </p>
              </div>

              <Button
                onClick={() => onNavigate?.("dsa")}
                variant="primary"
                className="text-xs px-4 py-2 shrink-0 self-start sm:self-auto"
              >
                Open DSA sheet
              </Button>
            </div>
          </Card>

        </div>

        {/* Right Column (1/3): Career Goal & Profile Strength */}
        <div className="space-y-6">
          
          {/* Career Goal Card */}
          <Card className="p-5 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Career Goal</h3>
              </div>
              <Badge variant="default">Your Data</Badge>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[11px] text-slate-400 block">Target role</span>
                <p className="font-semibold text-slate-200 mt-0.5">
                  {targetRole || "Software Engineer"}
                </p>
              </div>

              {specialization && (
                <div>
                  <span className="text-[11px] text-slate-400 block">Specialization</span>
                  <p className="font-medium text-slate-200 mt-0.5">{specialization}</p>
                </div>
              )}

              <div>
                <span className="text-[11px] text-slate-400 block">Target timeline</span>
                <p className="font-medium text-slate-200 mt-0.5">
                  {(targetTimeline || 3) + " months (" + (timeAvailable || "2 hours") + "/day)"}
                </p>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block">Preferred company type</span>
                <p className="font-medium text-slate-200 mt-0.5">
                  {targetCompany 
                    ? targetCompany + (companyType ? " · " + companyType : "")
                    : (companyType || "Open to target tech companies")}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex gap-2">
              <Button
                onClick={() => onNavigate?.("roadmap")}
                variant="primary"
                className="w-full text-xs py-2"
              >
                Open roadmap
              </Button>
              <Button
                onClick={() => onNavigate?.("settings")}
                variant="outline"
                className="text-xs py-2 px-3 shrink-0"
              >
                Edit goal
              </Button>
            </div>
          </Card>

          {/* Profile Strength Checklist */}
          <Card className="p-5 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
              <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Profile Strength</h3>
              <span className="text-xs font-bold text-blue-400">{profileStrengthPct}%</span>
            </div>

            <div className="space-y-2">
              {profileChecklist.map(item => (
                <div key={item.name} className="flex items-center gap-2.5 text-xs">
                  {item.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                  )}
                  <span className={item.completed ? "text-slate-300 font-medium" : "text-slate-500"}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800/80">
              {remainingSections > 0 ? (
                <p className="text-[11px] text-slate-400">
                  {"Complete " + remainingSections + " more " + (remainingSections === 1 ? "section" : "sections") + " to improve your personalized plan."}
                </p>
              ) : (
                <p className="text-[11px] text-emerald-400 font-medium">
                  Your career profile is completely up to date.
                </p>
              )}
            </div>
          </Card>

        </div>

      </div>

    </div>
  );
}
