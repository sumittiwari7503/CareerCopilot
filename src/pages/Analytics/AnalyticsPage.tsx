import React from "react";
import { 
  BarChart3, 
  TrendingUp, 
  CheckCircle2, 
  Code2, 
  Briefcase, 
  Mic, 
  FileText, 
  ShieldCheck, 
  Award, 
  Activity, 
  Calendar,
  Layers,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { CareerRoadmap, JobCard, DsaProblemLog } from "../../types";
import Card from "../../components/ui/Card";
import Score from "../../components/ui/Score";
import Badge from "../../components/ui/Badge";

interface AnalyticsPageProps {
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  streakDays: number;
  dailyScore: number;
  dsaProblems: DsaProblemLog[];
  roadmap: CareerRoadmap | null;
  checkedTasks: Record<string, boolean>;
  jobs: JobCard[];
  resumeScore: number | null;
  interviewScore: number | null;
  targetRole: string;
  onNavigate?: (tab: string) => void;
}

export default function AnalyticsPage({
  easySolved,
  mediumSolved,
  hardSolved,
  streakDays,
  dailyScore,
  dsaProblems,
  roadmap,
  checkedTasks,
  jobs,
  resumeScore,
  interviewScore,
  targetRole,
  onNavigate
}: AnalyticsPageProps) {
  const totalSolved = easySolved + mediumSolved + hardSolved;

  // Calculate Roadmap Progress
  let totalRoadmapTasks = 0;
  let completedRoadmapTasks = 0;

  if (roadmap?.months) {
    roadmap.months.forEach((month) => {
      month.weeks.forEach((week, wIdx) => {
        week.tasks.forEach((_, tIdx) => {
          const key = `${month.id}-w${wIdx}-t${tIdx}`;
          totalRoadmapTasks++;
          if (checkedTasks[key]) completedRoadmapTasks++;
        });
      });
    });
  }

  const roadmapPercent = totalRoadmapTasks > 0 
    ? Math.round((completedRoadmapTasks / totalRoadmapTasks) * 100) 
    : 0;

  // Topic distribution from solved DSA problems
  const topicCounts: Record<string, number> = {};
  dsaProblems.forEach(p => {
    if (p.topic) {
      topicCounts[p.topic] = (topicCounts[p.topic] || 0) + 1;
    }
  });
  const topTopics = Object.entries(topicCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

  // Pipeline funnel stats
  const savedCount = jobs.filter(j => j.status === "Saved" || j.status === "Wishlist").length;
  const appliedCount = jobs.filter(j => j.status === "Applied").length;
  const oaCount = jobs.filter(j => j.status === "Online Assessment" || j.status === "Assessment").length;
  const techInterviewCount = jobs.filter(j => j.status === "Technical Interview" || j.status === "Interview").length;
  const offerCount = jobs.filter(j => j.status === "Offer").length;

  // Check if candidate has any active signals
  const hasActivity = totalSolved > 0 || completedRoadmapTasks > 0 || jobs.length > 0 || resumeScore !== null || interviewScore !== null;

  // Composite Readiness Score (Transparent Formula based strictly on real records)
  // Weights: DSA (30%), Roadmap (25%), Resume (25%), Mock Interview (20%)
  const dsaComponent = Math.min(100, Math.round((totalSolved / 75) * 100));
  const roadmapComponent = roadmapPercent;
  const resumeComponent = resumeScore || 0;
  const interviewComponent = interviewScore || 0;

  let activeWeightsSum = 0;
  let weightedTotal = 0;

  if (totalSolved > 0) {
    weightedTotal += dsaComponent * 0.30;
    activeWeightsSum += 0.30;
  }
  if (totalRoadmapTasks > 0) {
    weightedTotal += roadmapComponent * 0.25;
    activeWeightsSum += 0.25;
  }
  if (resumeScore !== null) {
    weightedTotal += resumeComponent * 0.25;
    activeWeightsSum += 0.25;
  }
  if (interviewScore !== null) {
    weightedTotal += interviewComponent * 0.20;
    activeWeightsSum += 0.20;
  }

  const computedReadiness = activeWeightsSum > 0 
    ? Math.round(weightedTotal / activeWeightsSum) 
    : 0;

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Your Performance Data
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                PostgreSQL Aggregated
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Performance Analytics & Hiring Readiness</h1>
            <p className="text-xs text-gray-400 mt-1 max-w-xl">
              Honest, data-driven diagnostic breakdown across algorithms, roadmap completion, resume matching, and interview screens.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#0b0f19] p-3 rounded-xl border border-white/10 shrink-0 self-start md:self-auto">
            <Activity className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="text-[10px] font-mono uppercase text-gray-400 block">Activity Streak</span>
              <span className="text-sm font-bold text-white font-mono">{streakDays} Consecutive Days</span>
            </div>
          </div>
        </div>
      </div>

      {!hasActivity ? (
        <div className="bg-[#111827] border border-white/5 rounded-2xl p-12 text-center space-y-3">
          <BarChart3 className="w-12 h-12 text-gray-600 mx-auto" />
          <h3 className="text-sm font-bold text-gray-300">Not enough data to compute comprehensive analytics</h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Complete DSA problems, track job applications, scan your resume, or practice mock interviews to unlock performance insights.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={() => onNavigate && onNavigate("dsa")}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-medium border border-white/10"
            >
              Solve DSA Problems
            </button>
            <button
              onClick={() => onNavigate && onNavigate("resume")}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-medium border border-white/10"
            >
              Scan Resume
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Top Row: Overall Readiness Score Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold">
                    Composite Hiring Readiness
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Transparent Math
                  </span>
                </div>
                <Score 
                  score={computedReadiness}
                  label={computedReadiness >= 75 ? "Interview Ready" : computedReadiness >= 50 ? "Progressing Well" : "Foundation Building"}
                  explanation="Weighted evaluation of your actual solved DSA problems, roadmap progress, resume ATS rating, and mock interview score."
                />
              </div>

              <div className="pt-4 border-t border-white/5 mt-4 space-y-2 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>DSA Benchmark (30%)</span>
                  <span className="font-mono text-white">{dsaComponent}%</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Roadmap Milestones (25%)</span>
                  <span className="font-mono text-white">{roadmapComponent}%</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Resume ATS Fit (25%)</span>
                  <span className="font-mono text-white">{resumeComponent > 0 ? `${resumeComponent}%` : "Not Scanned"}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Mock Interview (20%)</span>
                  <span className="font-mono text-white">{interviewComponent > 0 ? `${interviewComponent}%` : "Not Screened"}</span>
                </div>
              </div>
            </div>

            {/* DSA Problem Solving Breakdown */}
            <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-[#60a5fa]" /> DSA Problem Breakdown
                  </span>
                  <span className="text-xs font-bold text-white font-mono">{totalSolved} Solved</span>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-emerald-400 font-medium">Easy Problems</span>
                      <span className="font-mono text-white font-bold">{easySolved}</span>
                    </div>
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.min(100, (easySolved / 30) * 100)}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-amber-400 font-medium">Medium Problems</span>
                      <span className="font-mono text-white font-bold">{mediumSolved}</span>
                    </div>
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: `${Math.min(100, (mediumSolved / 35) * 100)}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-red-400 font-medium">Hard Problems</span>
                      <span className="font-mono text-white font-bold">{hardSolved}</span>
                    </div>
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                      <div className="bg-red-500 h-full rounded-full" style={{ width: `${Math.min(100, (hardSolved / 15) * 100)}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 mt-4">
                <span className="text-[10px] font-mono text-gray-400 uppercase block mb-1.5">Top Solved Categories</span>
                {topTopics.length === 0 ? (
                  <span className="text-xs text-gray-500 italic">No topic logs registered yet</span>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {topTopics.map(([topic, count], idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-gray-300 border border-white/5">
                        {topic} ({count})
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Application Funnel Breakdown */}
            <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#8b5cf6]" /> Recruitment Funnel
                  </span>
                  <span className="text-xs font-bold text-white font-mono">{jobs.length} Total</span>
                </div>

                <div className="space-y-2.5 pt-1 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#0b0f19] border border-white/5">
                    <span className="text-gray-400">Wishlist / Saved</span>
                    <span className="font-mono font-bold text-white">{savedCount}</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#0b0f19] border border-white/5">
                    <span className="text-gray-400">Applications Submitted</span>
                    <span className="font-mono font-bold text-blue-400">{appliedCount}</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#0b0f19] border border-white/5">
                    <span className="text-gray-400">Online Assessments (OA)</span>
                    <span className="font-mono font-bold text-purple-400">{oaCount}</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#0b0f19] border border-white/5">
                    <span className="text-gray-400">Technical Interviews</span>
                    <span className="font-mono font-bold text-amber-400">{techInterviewCount}</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-emerald-300 font-bold">Offers Received</span>
                    <span className="font-mono font-bold text-emerald-400">{offerCount}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 mt-4 text-[10px] font-mono text-gray-400 flex items-center justify-between">
                <span>Application Conversion Rate</span>
                <span className="text-white font-bold">
                  {appliedCount > 0 ? `${Math.round((techInterviewCount / appliedCount) * 100)}%` : "0%"}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Row: Career Roadmap Progress & Action Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white tracking-tight flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-400" /> Career Roadmap Completion
                </span>
                <span className="text-xs font-mono font-bold text-blue-400">{roadmapPercent}%</span>
              </div>

              <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${roadmapPercent}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400 pt-1 font-mono">
                <span>Completed Milestones</span>
                <span className="text-white font-bold">{completedRoadmapTasks} of {totalRoadmapTasks}</span>
              </div>

              {roadmap && (
                <div className="bg-[#0b0f19] p-3 rounded-xl border border-white/5 text-xs text-gray-400">
                  <span className="text-[10px] font-mono text-[#60a5fa] block uppercase font-bold mb-0.5">Active Target</span>
                  Preparing for <span className="text-white font-medium">{roadmap.roadmapTitle || targetRole}</span> over a {roadmap.duration || 3}-month sprint.
                </div>
              )}
            </div>

            <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white tracking-tight flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" /> Key Focus Recommendations
                </span>
                <Badge variant="info">Diagnostic</Badge>
              </div>

              <div className="space-y-2.5 text-xs">
                {totalSolved < 30 && (
                  <div className="flex items-start gap-2 bg-[#0b0f19] p-2.5 rounded-xl border border-white/5 text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></span>
                    <span>Solve at least 30 foundational DSA problems to build algorithmic muscle memory.</span>
                  </div>
                )}
                {resumeScore === null && (
                  <div className="flex items-start gap-2 bg-[#0b0f19] p-2.5 rounded-xl border border-white/5 text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0"></span>
                    <span>Run an ATS scan on your resume to evaluate keyword match against {targetRole}.</span>
                  </div>
                )}
                {interviewScore === null && (
                  <div className="flex items-start gap-2 bg-[#0b0f19] p-2.5 rounded-xl border border-white/5 text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                    <span>Complete your first AI mock interview screen to assess communication fluency.</span>
                  </div>
                )}
                {jobs.length < 5 && (
                  <div className="flex items-start gap-2 bg-[#0b0f19] p-2.5 rounded-xl border border-white/5 text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                    <span>Track at least 5 target job opportunities in your recruitment pipeline.</span>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
