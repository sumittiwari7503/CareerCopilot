import React, { useState } from "react";
import { 
  TrendingUp, 
  Plus, 
  Trash2, 
  Code, 
  CheckCircle, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Filter, 
  Copy, 
  Check, 
  Clock, 
  Award,
  BookOpen
} from "lucide-react";
import { DsaProblemLog, DsaProblemItem } from "../../types";
import { DSA_TOPICS, CANONICAL_DSA_PROBLEMS } from "../../constants";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";

interface DsaPageProps {
  dsaProblems: DsaProblemLog[];
  onLogDsaProblem?: (log: Omit<DsaProblemLog, "id" | "createdAt">) => void;
  onDeleteDsaProblem?: (id: string) => void;
  easySolvedCount?: number;
  mediumSolvedCount?: number;
  hardSolvedCount?: number;
  onUpdateProblemStatus?: (problemId: string, status: "Not Started" | "In Progress" | "Solved") => void;
}

export default function DsaPage({
  dsaProblems = [],
  onLogDsaProblem,
  onDeleteDsaProblem,
  easySolvedCount,
  mediumSolvedCount,
  hardSolvedCount,
  onUpdateProblemStatus
}: DsaPageProps) {
  // Solved counts derived directly from user activity
  const easySolved = easySolvedCount !== undefined 
    ? easySolvedCount 
    : dsaProblems.filter(p => p.difficulty === "Easy").length;
  const mediumSolved = mediumSolvedCount !== undefined 
    ? mediumSolvedCount 
    : dsaProblems.filter(p => p.difficulty === "Medium").length;
  const hardSolved = hardSolvedCount !== undefined 
    ? hardSolvedCount 
    : dsaProblems.filter(p => p.difficulty === "Hard").length;
  const totalSolved = easySolved + mediumSolved + hardSolved;
  
  // Benchmark target
  const targetGoal = 150;
  const progressPercent = Math.min(Math.round((totalSolved / targetGoal) * 100), 100);

  // SVG circular gauge
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  // Filter and Search states
  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Track user-specific problem status overrides
  const [problemStatusMap, setProblemStatusMap] = useState<Record<string, "Not Started" | "In Progress" | "Solved">>({});
  
  // Track expanded problem detail accordion
  const [expandedProblemId, setExpandedProblemId] = useState<string | null>(null);

  // Track copied snippet feedback
  const [copiedProblemId, setCopiedProblemId] = useState<string | null>(null);

  // Problem notes state
  const [problemNotes, setProblemNotes] = useState<Record<string, string>>({});

  // Form state for logging a custom problem
  const [showLogModal, setShowLogModal] = useState(false);
  const [logName, setLogName] = useState("");
  const [logTopic, setLogTopic] = useState("Arrays");
  const [logDifficulty, setLogDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");
  const [logTimeSpent, setLogTimeSpent] = useState("");
  const [logNotes, setLogNotes] = useState("");

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedProblemId(id);
    setTimeout(() => setCopiedProblemId(null), 2000);
  };

  const handleToggleStatus = (id: string, currentStatus: "Not Started" | "In Progress" | "Solved") => {
    const nextStatus = currentStatus === "Solved" 
      ? "Not Started" 
      : currentStatus === "Not Started" 
        ? "In Progress" 
        : "Solved";
    
    setProblemStatusMap(prev => ({ ...prev, [id]: nextStatus }));
    if (onUpdateProblemStatus) {
      onUpdateProblemStatus(id, nextStatus);
    }
  };

  const handleCustomLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logName.trim()) return;
    onLogDsaProblem?.({
      name: logName.trim(),
      topic: logTopic,
      difficulty: logDifficulty,
      timeSpent: parseInt(logTimeSpent, 10) || 30,
      notes: logNotes.trim()
    });
    setLogName("");
    setLogTimeSpent("");
    setLogNotes("");
    setShowLogModal(false);
  };

  // Filter canonical problems
  const filteredProblems = CANONICAL_DSA_PROBLEMS.filter(p => {
    const currentStatus = problemStatusMap[p.id] || p.status;
    const matchesTopic = selectedTopic === "All" || p.topic === selectedTopic;
    const matchesDiff = selectedDifficulty === "All" || p.difficulty === selectedDifficulty;
    const matchesStatus = selectedStatus === "All" || currentStatus === selectedStatus;
    const matchesSearch = !searchQuery.trim() || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesDiff && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* 1. Header Details */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="default" className="text-[9px] font-mono bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20">
              Your Data • 17 Canonical Topics
            </Badge>
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#10B981]" /> DSA & Algorithmic Problem Solving
          </h2>
          <p className="text-xs text-gray-400">
            Curated interview challenges organized across canonical data structures and algorithm patterns.
          </p>
        </div>

        <Button
          onClick={() => setShowLogModal(true)}
          variant="primary"
          className="text-xs font-bold py-2 px-4 flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus className="w-3.5 h-3.5" /> Log Solved Problem
        </Button>
      </section>

      {/* 2. Solved Metrics Telemetry & Empty State */}
      <Card className="flex flex-col md:flex-row items-center gap-8 p-6 bg-[#111827] border-white/10">
        
        {/* Total circular visualization */}
        <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r={radius}
              className="stroke-white/5"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="64"
              cy="64"
              r={radius}
              className="stroke-[#10B981] transition-all duration-500 ease-out"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-2xl font-mono font-extrabold text-white leading-none">{totalSolved}</span>
            <span className="text-[8px] uppercase tracking-widest font-extrabold text-gray-500 mt-1 font-mono">Solved</span>
          </div>
        </div>

        {/* Breakdown statistics */}
        <div className="flex-1 w-full space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs uppercase font-extrabold text-white tracking-wider font-mono">
                Technical Interview Readiness Benchmark
              </h3>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {totalSolved > 0 
                  ? `Completed ${totalSolved} problems toward the standard ${targetGoal} engineering target.`
                  : "No DSA activity yet. Start your first problem below to begin tracking your progress."}
              </p>
            </div>
            <Badge variant={progressPercent >= 100 ? "success" : "default"} className="font-mono text-[9px]">
              {progressPercent}% of Target
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="bg-white/2 p-3 rounded-xl border border-white/5 text-center">
              <span className="text-[#10B981] font-mono font-bold block text-base">{easySolved}</span>
              <span className="text-[9px] uppercase font-bold text-gray-400 block font-mono mt-0.5">Easy</span>
            </div>
            <div className="bg-white/2 p-3 rounded-xl border border-white/5 text-center">
              <span className="text-blue-400 font-mono font-bold block text-base">{mediumSolved}</span>
              <span className="text-[9px] uppercase font-bold text-gray-400 block font-mono mt-0.5">Medium</span>
            </div>
            <div className="bg-white/2 p-3 rounded-xl border border-white/5 text-center">
              <span className="text-red-400 font-mono font-bold block text-base">{hardSolved}</span>
              <span className="text-[9px] uppercase font-bold text-gray-400 block font-mono mt-0.5">Hard</span>
            </div>
          </div>
        </div>

      </Card>

      {/* 3. Filter & Search Controls */}
      <Card className="p-4 bg-[#111827] border-white/10 space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          
          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problem or pattern..."
              className="w-full bg-[#1f2937] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-[#10B981]"
            />
          </div>

          {/* Difficulty & Status Selectors */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-[#1f2937] border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none font-mono"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-[#1f2937] border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none font-mono"
            >
              <option value="All">All Statuses</option>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Solved">Solved</option>
            </select>
          </div>
        </div>

        {/* Topic Pills Bar */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 pt-2 custom-scrollbar">
          <button
            onClick={() => setSelectedTopic("All")}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-semibold shrink-0 transition-all ${
              selectedTopic === "All"
                ? "bg-[#10B981] text-slate-950 font-bold"
                : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            All Topics
          </button>
          {DSA_TOPICS.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-semibold shrink-0 transition-all ${
                selectedTopic === topic
                  ? "bg-[#10B981] text-slate-950 font-bold"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </Card>

      {/* 4. Canonical Problems Curriculum */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <span className="text-xs font-mono text-gray-400 font-bold">
            Showing {filteredProblems.length} Canonical Problems
          </span>
          <span className="text-[10px] font-mono text-gray-500">
            Verified LeetCode links • Complexity verified
          </span>
        </div>

        {filteredProblems.length === 0 ? (
          <Card className="p-8 text-center bg-[#111827] border-white/5 space-y-2">
            <Code className="w-8 h-8 text-gray-600 mx-auto" />
            <p className="text-xs text-gray-400 font-bold">No problems found matching your filters.</p>
            <p className="text-[11px] text-gray-500">Try clearing the search or changing topic filters.</p>
          </Card>
        ) : (
          filteredProblems.map((problem) => {
            const currentStatus = problemStatusMap[problem.id] || problem.status;
            const isExpanded = expandedProblemId === problem.id;
            const isSolved = currentStatus === "Solved";

            return (
              <Card 
                key={problem.id}
                className={`transition-all bg-[#111827] border-white/10 ${
                  isSolved ? "border-emerald-500/20 bg-emerald-950/5" : ""
                }`}
              >
                <div className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  
                  {/* Left: Status toggle, Problem Name & Tags */}
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      onClick={() => handleToggleStatus(problem.id, currentStatus)}
                      title={`Current status: ${currentStatus}. Click to cycle.`}
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0 ${
                        isSolved 
                          ? "bg-emerald-500 border-emerald-500 text-slate-950" 
                          : currentStatus === "In Progress"
                            ? "border-amber-400 bg-amber-400/20 text-amber-400"
                            : "border-white/20 hover:border-white/50"
                      }`}
                    >
                      {isSolved && <Check className="w-3 h-3 stroke-[3px]" />}
                      {currentStatus === "In Progress" && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>}
                    </button>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-bold ${isSolved ? "line-through text-gray-400" : "text-white"}`}>
                          {problem.name}
                        </span>
                        <Badge
                          variant={problem.difficulty === "Easy" ? "success" : problem.difficulty === "Medium" ? "info" : "error"}
                          className="text-[8.5px] font-mono py-0 px-1.5"
                        >
                          {problem.difficulty}
                        </Badge>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300">
                          {problem.topic}
                        </span>
                        <span className="text-[9px] font-mono text-gray-500">
                          {problem.timeComplexity} • {problem.spaceComplexity}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {problem.link && (
                      <a
                        href={problem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                        title="Open on LeetCode"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <button
                      onClick={() => setExpandedProblemId(isExpanded ? null : problem.id)}
                      className="text-xs font-mono font-bold text-[#60a5fa] hover:text-white px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all flex items-center gap-1"
                    >
                      <span>{isExpanded ? "Hide Approach" : "View Approach"}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                </div>

                {/* Expanded Accordion: Explanation & Solution Snippet */}
                {isExpanded && (
                  <div className="p-4 border-t border-white/5 bg-black/20 space-y-4 animate-fade-in">
                    
                    {/* Explanation */}
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#10B981] font-mono">Optimal Engineering Approach</span>
                      <p className="text-xs text-gray-300 leading-relaxed">{problem.explanation}</p>
                    </div>

                    {/* Solution Snippet */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] uppercase font-bold text-gray-400 font-mono">Reference Solution (TypeScript)</span>
                        <button
                          onClick={() => handleCopyCode(problem.id, problem.solutionSnippet)}
                          className="flex items-center gap-1 text-[10px] font-mono text-gray-400 hover:text-white px-2 py-0.5 rounded bg-white/5"
                        >
                          {copiedProblemId === problem.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedProblemId === problem.id ? "Copied" : "Copy Code"}</span>
                        </button>
                      </div>
                      <pre className="p-3.5 rounded-xl bg-[#0b0f19] border border-white/5 text-emerald-300 font-mono text-[11px] overflow-x-auto leading-relaxed">
                        {problem.solutionSnippet}
                      </pre>
                    </div>

                    {/* Notes field */}
                    <div className="space-y-1 pt-1">
                      <label className="text-[10px] uppercase font-bold text-gray-400 font-mono">Your Personal Notes / Learnings</label>
                      <textarea
                        value={problemNotes[problem.id] || ""}
                        onChange={(e) => setProblemNotes(prev => ({ ...prev, [problem.id]: e.target.value }))}
                        placeholder="Write down tricky edge cases, runtime bottlenecks, or alternative approaches..."
                        rows={2}
                        className="w-full bg-[#111827] border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#10B981] resize-none"
                      />
                    </div>

                  </div>
                )}
              </Card>
            );
          })
        )}
      </div>

      {/* 5. Custom Practice History Log */}
      {dsaProblems.length > 0 && (
        <Card className="p-6 bg-[#111827] border-white/10 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-white/5">
            <h3 className="text-xs uppercase font-extrabold text-white tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#10B981]" /> User Practice Logs
            </h3>
            <span className="text-[10px] font-mono text-gray-400 font-bold">{dsaProblems.length} Logged Entries</span>
          </div>

          <div className="space-y-2.5">
            {dsaProblems.map((p) => (
              <div key={p.id} className="p-3 bg-white/2 rounded-xl border border-white/5 flex justify-between items-center gap-3">
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{p.name}</span>
                    <Badge variant={p.difficulty === "Hard" ? "error" : p.difficulty === "Medium" ? "info" : "success"} className="text-[8px] font-mono py-0 px-1.5">
                      {p.difficulty}
                    </Badge>
                    <span className="text-[9px] font-mono text-gray-400">{p.topic}</span>
                  </div>
                  {p.notes && <p className="text-[10.5px] text-gray-300 leading-normal">{p.notes}</p>}
                  <p className="text-[8.5px] text-gray-500 font-mono">Time spent: {p.timeSpent} mins</p>
                </div>

                {onDeleteDsaProblem && (
                  <button
                    onClick={() => onDeleteDsaProblem(p.id)}
                    className="text-gray-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 6. Modal for Logging a Custom Solved Problem */}
      {showLogModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <Card className="max-w-md w-full p-6 space-y-4 bg-[#111827] border-white/10 shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Log Solved Challenge</h3>
              <button onClick={() => setShowLogModal(false)} className="text-gray-400 hover:text-white text-xs">✕</button>
            </div>

            <form onSubmit={handleCustomLogSubmit} className="space-y-3">
              <Input 
                label="Problem Title"
                value={logName}
                onChange={(e) => setLogName(e.target.value)}
                placeholder="e.g. Course Schedule II"
                required
              />

              <div className="grid grid-cols-2 gap-3">
                <Select
                  label="Topic Tag"
                  value={logTopic}
                  onChange={(e) => setLogTopic(e.target.value)}
                  options={DSA_TOPICS.map(t => ({ value: t, label: t }))}
                />

                <Select
                  label="Difficulty"
                  value={logDifficulty}
                  onChange={(e) => setLogDifficulty(e.target.value as any)}
                  options={[
                    { value: "Easy", label: "Easy" },
                    { value: "Medium", label: "Medium" },
                    { value: "Hard", label: "Hard" }
                  ]}
                />
              </div>

              <Input 
                label="Time Spent (minutes)"
                value={logTimeSpent}
                onChange={(e) => setLogTimeSpent(e.target.value)}
                placeholder="e.g. 40"
                type="number"
              />

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase font-mono tracking-wider block">Key Learnings & Notes</label>
                <textarea
                  value={logNotes}
                  onChange={(e) => setLogNotes(e.target.value)}
                  placeholder="Record edge cases, algorithmic insights, or time complexity trade-offs..."
                  rows={3}
                  className="w-full bg-[#1f2937] border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#10B981] resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  type="button" 
                  onClick={() => setShowLogModal(false)} 
                  variant="outline" 
                  className="flex-1 text-xs py-2"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="flex-1 text-xs py-2 bg-emerald-600 hover:bg-emerald-700"
                >
                  Save Solved Log
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

    </div>
  );
}

