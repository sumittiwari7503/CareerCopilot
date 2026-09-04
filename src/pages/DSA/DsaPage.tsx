import React, { useState, useMemo, useEffect } from "react";
import { 
  TrendingUp, 
  Plus, 
  Trash2, 
  Code, 
  CheckCircle2, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight,
  Search, 
  Filter, 
  Copy, 
  Check, 
  Clock, 
  Award,
  BookOpen,
  Star,
  Youtube,
  FileText,
  Sparkles,
  Building2,
  CheckSquare,
  Square,
  Bookmark,
  Layers,
  Zap
} from "lucide-react";
import { DsaProblemLog } from "../../types";
import { 
  PATTERN_WISE_TOPICS, 
  LAST_MINUTE_TOPICS, 
  ALL_PATTERN_PROBLEMS, 
  ALL_LAST_MINUTE_PROBLEMS,
  RisingBrainProblem,
  RisingBrainTopic,
  RisingBrainSubtopic
} from "../../data/risingBrainDsa";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Input from "../../components/ui/Input";

interface DsaPageProps {
  dsaProblems: DsaProblemLog[];
  onLogDsaProblem?: (log: Omit<DsaProblemLog, "id" | "createdAt">) => void;
  onDeleteDsaProblem?: (id: string) => void;
  easySolvedCount?: number;
  mediumSolvedCount?: number;
  hardSolvedCount?: number;
  onUpdateProblemStatus?: (problemId: string, status: "Not Started" | "In Progress" | "Solved") => void;
}

type SheetTab = "pattern" | "last_minute" | "history";

export default function DsaPage({
  dsaProblems = [],
  onLogDsaProblem,
  onDeleteDsaProblem,
  easySolvedCount,
  mediumSolvedCount,
  hardSolvedCount,
  onUpdateProblemStatus
}: DsaPageProps) {
  // Active sheet tab
  const [activeSheet, setActiveSheet] = useState<SheetTab>("pattern");

  // Solved sets and custom metadata persisted in localStorage
  const [problemStatusMap, setProblemStatusMap] = useState<Record<string, "Not Started" | "In Progress" | "Solved">>({});
  const [starredIds, setStarredIds] = useState<Set<string>>(new Set());
  const [problemNotes, setProblemNotes] = useState<Record<string, string>>({});

  // Load saved local metadata (starred, in-progress, notes)
  useEffect(() => {
    try {
      const savedMeta = localStorage.getItem("careercopilot_dsa_local_meta");
      if (savedMeta) {
        const parsed = JSON.parse(savedMeta);
        if (parsed.statusMap) setProblemStatusMap(parsed.statusMap);
        if (parsed.starred) setStarredIds(new Set(parsed.starred));
        if (parsed.notes) setProblemNotes(parsed.notes);
      }
    } catch (e) {
      console.error("Failed to load local DSA meta:", e);
    }
  }, []);

  // Save local metadata changes
  const saveLocalMeta = (
    newStatusMap?: Record<string, "Not Started" | "In Progress" | "Solved">,
    newStarred?: Set<string>,
    newNotes?: Record<string, string>
  ) => {
    try {
      const payload = {
        statusMap: newStatusMap || problemStatusMap,
        starred: Array.from(newStarred || starredIds),
        notes: newNotes || problemNotes
      };
      localStorage.setItem("careercopilot_dsa_local_meta", JSON.stringify(payload));
    } catch (e) {
      console.error("Failed to save local DSA meta:", e);
    }
  };

  // Set of solved problem names from actual user database logs
  const solvedProblemNamesSet = useMemo(() => {
    return new Set(dsaProblems.map(p => p.name.trim().toLowerCase()));
  }, [dsaProblems]);

  // Derived real counts
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

  const totalCurriculumProblems = activeSheet === "pattern" ? 386 : 106;
  const progressPercent = Math.min(Math.round((totalSolved / totalCurriculumProblems) * 100), 100);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopicId, setSelectedTopicId] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  // Expanded topic accordion states
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [expandedProblemId, setExpandedProblemId] = useState<string | null>(null);

  // Custom log modal state
  const [showLogModal, setShowLogModal] = useState(false);
  const [logName, setLogName] = useState("");
  const [logTopic, setLogTopic] = useState("Array");
  const [logDifficulty, setLogDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");
  const [logTimeSpent, setLogTimeSpent] = useState("30");
  const [logNotes, setLogNotes] = useState("");

  // Determine current active topics
  const currentTopics = useMemo(() => {
    return activeSheet === "pattern" ? PATTERN_WISE_TOPICS : LAST_MINUTE_TOPICS;
  }, [activeSheet]);

  // Initialize first 2 topics expanded by default when activeSheet changes
  useEffect(() => {
    if (currentTopics.length > 0) {
      const initial: Record<string, boolean> = {};
      currentTopics.slice(0, 3).forEach(t => {
        initial[t.id] = true;
      });
      setExpandedTopics(initial);
    }
  }, [activeSheet, currentTopics]);

  // Helper: check if a RisingBrain problem is solved
  const isProblemSolved = (problem: RisingBrainProblem) => {
    const directStatus = problemStatusMap[problem.id];
    if (directStatus === "Solved") return true;
    return solvedProblemNamesSet.has(problem.title.trim().toLowerCase());
  };

  // Helper: get current status
  const getProblemStatus = (problem: RisingBrainProblem): "Not Started" | "In Progress" | "Solved" => {
    if (isProblemSolved(problem)) return "Solved";
    return problemStatusMap[problem.id] || "Not Started";
  };

  // Toggle solve / unsolve status
  const handleToggleSolved = (problem: RisingBrainProblem) => {
    const currentlySolved = isProblemSolved(problem);

    if (currentlySolved) {
      // Unsolve: delete from database logs if present
      const match = dsaProblems.find(p => p.name.trim().toLowerCase() === problem.title.trim().toLowerCase());
      if (match && onDeleteDsaProblem) {
        onDeleteDsaProblem(match.id);
      }
      const updatedMap = { ...problemStatusMap, [problem.id]: "Not Started" as const };
      setProblemStatusMap(updatedMap);
      saveLocalMeta(updatedMap);
      onUpdateProblemStatus?.(problem.id, "Not Started");
    } else {
      // Solve: log to database
      onLogDsaProblem?.({
        name: problem.title,
        topic: problem.topicTitle || "Algorithms",
        difficulty: problem.difficulty,
        timeSpent: 30,
        notes: problemNotes[problem.id] || ""
      });
      const updatedMap = { ...problemStatusMap, [problem.id]: "Solved" as const };
      setProblemStatusMap(updatedMap);
      saveLocalMeta(updatedMap);
      onUpdateProblemStatus?.(problem.id, "Solved");
    }
  };

  // Cycle status: Not Started -> In Progress -> Solved -> Not Started
  const handleCycleStatus = (problem: RisingBrainProblem) => {
    const current = getProblemStatus(problem);
    if (current === "Not Started") {
      const updatedMap = { ...problemStatusMap, [problem.id]: "In Progress" as const };
      setProblemStatusMap(updatedMap);
      saveLocalMeta(updatedMap);
      onUpdateProblemStatus?.(problem.id, "In Progress");
    } else if (current === "In Progress") {
      handleToggleSolved(problem);
    } else {
      handleToggleSolved(problem);
    }
  };

  // Toggle star / bookmark
  const handleToggleStar = (problemId: string) => {
    const updated = new Set<string>(starredIds);
    if (updated.has(problemId)) {
      updated.delete(problemId);
    } else {
      updated.add(problemId);
    }
    setStarredIds(updated);
    saveLocalMeta(undefined, updated);
  };

  // Update notes
  const handleSaveNotes = (problemId: string, notes: string) => {
    const updated = { ...problemNotes, [problemId]: notes };
    setProblemNotes(updated);
    saveLocalMeta(undefined, undefined, updated);
  };

  // Toggle topic accordion
  const handleToggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const handleExpandAll = () => {
    const expanded: Record<string, boolean> = {};
    currentTopics.forEach(t => { expanded[t.id] = true; });
    setExpandedTopics(expanded);
  };

  const handleCollapseAll = () => {
    setExpandedTopics({});
  };

  // Handle custom problem submission
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
    setLogTimeSpent("30");
    setLogNotes("");
    setShowLogModal(false);
  };

  // Filter topics and problems
  const filteredTopics = useMemo(() => {
    return currentTopics.map(topic => {
      // Check if topic matches selectedTopicId
      if (selectedTopicId !== "All" && topic.id !== selectedTopicId) {
        return null;
      }

      // Filter subtopics
      const filteredSubtopics = topic.subtopics.map(subtopic => {
        const filteredProblems = subtopic.problems.filter(p => {
          // Difficulty
          if (selectedDifficulty !== "All" && p.difficulty !== selectedDifficulty) {
            return false;
          }
          // Status
          const status = getProblemStatus(p);
          const isStarred = starredIds.has(p.id);
          if (selectedStatus === "Solved" && status !== "Solved") return false;
          if (selectedStatus === "In Progress" && status !== "In Progress") return false;
          if (selectedStatus === "Not Started" && status !== "Not Started") return false;
          if (selectedStatus === "Starred" && !isStarred) return false;

          // Search query
          if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            const matchTitle = p.title.toLowerCase().includes(q);
            const matchSub = subtopic.title.toLowerCase().includes(q);
            const matchTopic = topic.title.toLowerCase().includes(q);
            const matchCompany = p.companies?.some(c => c.name.toLowerCase().includes(q));
            if (!matchTitle && !matchSub && !matchTopic && !matchCompany) return false;
          }

          return true;
        });

        return {
          ...subtopic,
          problems: filteredProblems
        };
      }).filter(sub => sub.problems.length > 0);

      if (filteredSubtopics.length === 0) return null;

      return {
        ...topic,
        subtopics: filteredSubtopics
      };
    }).filter(Boolean) as RisingBrainTopic[];
  }, [currentTopics, selectedTopicId, selectedDifficulty, selectedStatus, searchQuery, problemStatusMap, starredIds, solvedProblemNamesSet]);

  // Total visible problems count
  const visibleProblemsCount = useMemo(() => {
    return filteredTopics.reduce((acc, t) => {
      return acc + t.subtopics.reduce((sAcc, s) => sAcc + s.problems.length, 0);
    }, 0);
  }, [filteredTopics]);

  return (
    <div className="space-y-6 pb-12">
      
      {/* 1. Header Details */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <Badge variant="default" className="text-[11px] bg-blue-500/10 text-blue-400 border-blue-500/20 font-medium">
              Source: RisingBrain Curated Curriculum
            </Badge>
            <Badge variant="default" className="text-[11px] bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-medium">
              Your Data • PostgreSQL Synced
            </Badge>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            DSA & Algorithmic Problem Solving
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Master 67 algorithmic patterns and high-frequency interview questions with direct LeetCode, GFG, and YouTube solutions.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            onClick={() => setShowLogModal(true)}
            variant="outline"
            className="text-xs font-semibold py-2 px-3.5 flex items-center gap-1.5 rounded-xl border-white/10 hover:bg-white/5"
          >
            <Plus className="w-3.5 h-3.5 text-gray-300" /> Log Custom Problem
          </Button>
        </div>
      </section>

      {/* 2. Solved Metrics Telemetry & Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Progress Card */}
        <Card className="md:col-span-8 p-6 bg-[#111827] border-white/8 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-medium text-gray-400">Total Solved Progress</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-bold text-white tracking-tight">{totalSolved}</span>
                <span className="text-xs text-gray-400 font-medium">/ {totalCurriculumProblems} problems in {activeSheet === "pattern" ? "Pattern-Wise" : "Last Minute"} sheet</span>
              </div>
            </div>
            <Badge variant={progressPercent >= 100 ? "success" : "default"} className="text-xs font-semibold px-3 py-1 self-start sm:self-auto">
              {progressPercent}% Completed
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden border border-white/5">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.max(progressPercent, 2)}%` }}
              />
            </div>
            <p className="text-[11px] text-gray-400">
              {totalSolved > 0 
                ? `You have logged ${totalSolved} solved problems in your database record.`
                : "No solved problems logged yet. Click the checkbox on any problem below to record your progress."}
            </p>
          </div>

          {/* Difficulty Counters */}
          <div className="grid grid-cols-3 gap-3 pt-1 border-t border-white/5">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
              <span className="text-emerald-400 font-bold text-lg block">{easySolved}</span>
              <span className="text-[11px] text-gray-400 font-medium">Easy Solved</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
              <span className="text-amber-400 font-bold text-lg block">{mediumSolved}</span>
              <span className="text-[11px] text-gray-400 font-medium">Medium Solved</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
              <span className="text-rose-400 font-bold text-lg block">{hardSolved}</span>
              <span className="text-[11px] text-gray-400 font-medium">Hard Solved</span>
            </div>
          </div>
        </Card>

        {/* Quick Provenance & Target Benchmark Card */}
        <Card className="md:col-span-4 p-6 bg-[#111827] border-white/8 rounded-2xl flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-semibold text-white">Curriculum Provenance</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Curated by RisingBrain with verified LeetCode IDs, company tags, and video solutions. Problems are organized by algorithmic pattern to maximize interview transferability.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-white/5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Pattern-Wise Topics:</span>
              <span className="font-semibold text-white">16 Topics (67 Patterns)</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Total Pattern Problems:</span>
              <span className="font-semibold text-white">386 Problems</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Last Minute 100:</span>
              <span className="font-semibold text-white">106 High-Frequency</span>
            </div>
          </div>
        </Card>
      </div>

      {/* 3. Sheet Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveSheet("pattern")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
            activeSheet === "pattern"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
              : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Pattern-Wise Sheet</span>
          <span className="px-1.5 py-0.5 rounded-full bg-black/20 text-[10px] font-bold">386</span>
        </button>

        <button
          onClick={() => setActiveSheet("last_minute")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
            activeSheet === "last_minute"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
              : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Last Minute 100</span>
          <span className="px-1.5 py-0.5 rounded-full bg-black/20 text-[10px] font-bold">106</span>
        </button>

        <button
          onClick={() => setActiveSheet("history")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
            activeSheet === "history"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
              : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Solved History</span>
          <span className="px-1.5 py-0.5 rounded-full bg-black/20 text-[10px] font-bold">{dsaProblems.length}</span>
        </button>
      </div>

      {activeSheet !== "history" ? (
        <>
          {/* 4. Filter & Search Controls */}
          <Card className="p-4 bg-[#111827] border-white/8 rounded-2xl space-y-3">
            <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
              
              {/* Search bar */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search problem, pattern, or company..."
                  className="w-full bg-[#1f2937] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-gray-500 outline-none focus:border-blue-500"
                />
              </div>

              {/* Difficulty, Status & Topic Selectors */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto items-center">
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="bg-[#1f2937] border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-200 outline-none focus:border-blue-500"
                >
                  <option value="All">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-[#1f2937] border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-200 outline-none focus:border-blue-500"
                >
                  <option value="All">All Statuses</option>
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Solved">Solved</option>
                  <option value="Starred">Starred / Saved</option>
                </select>

                <select
                  value={selectedTopicId}
                  onChange={(e) => setSelectedTopicId(e.target.value)}
                  className="bg-[#1f2937] border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-200 outline-none focus:border-blue-500 max-w-[180px]"
                >
                  <option value="All">All Topics ({currentTopics.length})</option>
                  {currentTopics.map(t => (
                    <option key={t.id} value={t.id}>{t.title}</option>
                  ))}
                </select>

                <div className="flex items-center gap-1.5 ml-auto md:ml-0">
                  <button
                    onClick={handleExpandAll}
                    className="px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    Expand All
                  </button>
                  <button
                    onClick={handleCollapseAll}
                    className="px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    Collapse All
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* 5. Topics and Problems List */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1 text-xs text-gray-400">
              <span>Showing {visibleProblemsCount} problems across {filteredTopics.length} topics</span>
              <span className="text-[11px] text-gray-500">Click problem checkbox to mark solved</span>
            </div>

            {filteredTopics.length === 0 ? (
              <Card className="p-12 text-center bg-[#111827] border-white/8 rounded-2xl space-y-3">
                <Code className="w-10 h-10 text-gray-600 mx-auto" />
                <h3 className="text-sm font-semibold text-gray-300">No problems found</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  No questions match your current filters. Try changing your search query or resetting difficulty filters.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedDifficulty("All");
                    setSelectedStatus("All");
                    setSelectedTopicId("All");
                  }}
                  variant="outline"
                  className="text-xs mt-2"
                >
                  Reset all filters
                </Button>
              </Card>
            ) : (
              filteredTopics.map((topic) => {
                const isExpanded = !!expandedTopics[topic.id];
                
                // Calculate topic solved stats
                let topicTotalProblems = 0;
                let topicSolvedProblems = 0;
                topic.subtopics.forEach(sub => {
                  sub.problems.forEach(prob => {
                    topicTotalProblems++;
                    if (isProblemSolved(prob)) topicSolvedProblems++;
                  });
                });

                const topicPercent = topicTotalProblems > 0 
                  ? Math.round((topicSolvedProblems / topicTotalProblems) * 100) 
                  : 0;

                return (
                  <div 
                    key={topic.id} 
                    className="bg-[#111827] border border-white/8 rounded-2xl overflow-hidden transition-all shadow-sm"
                  >
                    {/* Topic Header Accordion Banner */}
                    <div 
                      onClick={() => handleToggleTopic(topic.id)}
                      className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-white/[0.02] transition-colors border-b border-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm font-bold text-white tracking-tight">{topic.title}</h3>
                            <span className="text-[11px] text-gray-400 font-medium">
                              ({topic.subtopics.length} {topic.subtopics.length === 1 ? "pattern" : "patterns"})
                            </span>
                          </div>
                          {topic.description && (
                            <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">{topic.description}</p>
                          )}
                        </div>
                      </div>

                      {/* Topic Solved Badge */}
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="hidden sm:flex flex-col items-end">
                          <span className="text-xs font-semibold text-gray-200">
                            {topicSolvedProblems} / {topicTotalProblems} solved
                          </span>
                          <div className="w-24 bg-white/5 rounded-full h-1.5 overflow-hidden mt-1">
                            <div 
                              className="bg-blue-500 h-full rounded-full transition-all duration-300"
                              style={{ width: `${topicPercent}%` }}
                            />
                          </div>
                        </div>
                        <Badge 
                          variant={topicPercent === 100 ? "success" : "default"} 
                          className="text-[10px] font-semibold py-0.5 px-2"
                        >
                          {topicPercent}%
                        </Badge>
                      </div>
                    </div>

                    {/* Subtopics & Problems Content */}
                    {isExpanded && (
                      <div className="divide-y divide-white/5">
                        {topic.subtopics.map((subtopic) => (
                          <div key={subtopic.id} className="p-4 sm:p-5 space-y-3 bg-white/[0.01]">
                            
                            {/* Subtopic / Pattern Label */}
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                                <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wide">
                                  {subtopic.title}
                                </h4>
                                <span className="text-[11px] text-gray-500">
                                  ({subtopic.problems.length} {subtopic.problems.length === 1 ? "problem" : "problems"})
                                </span>
                              </div>
                              {subtopic.description && (
                                <span className="text-[11px] text-gray-500 italic max-w-md truncate">
                                  {subtopic.description}
                                </span>
                              )}
                            </div>

                            {/* Problems List */}
                            <div className="space-y-2">
                              {subtopic.problems.map((problem) => {
                                const solved = isProblemSolved(problem);
                                const status = getProblemStatus(problem);
                                const isStarred = starredIds.has(problem.id);
                                const isDetailExpanded = expandedProblemId === problem.id;

                                return (
                                  <div
                                    key={problem.id}
                                    className={`p-3 rounded-xl border transition-all ${
                                      solved
                                        ? "bg-emerald-950/10 border-emerald-500/20"
                                        : status === "In Progress"
                                          ? "bg-amber-950/10 border-amber-500/20"
                                          : "bg-white/[0.02] border-white/5 hover:border-white/15"
                                    }`}
                                  >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                                      
                                      {/* Left: Checkbox & Problem Title */}
                                      <div className="flex items-center gap-3 min-w-0">
                                        <button
                                          onClick={() => handleToggleSolved(problem)}
                                          title={solved ? "Mark as unsolved" : "Mark as solved"}
                                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0 ${
                                            solved
                                              ? "bg-emerald-500 border-emerald-500 text-slate-950"
                                              : "border-white/20 hover:border-white/50 text-transparent"
                                          }`}
                                        >
                                          <Check className="w-3.5 h-3.5 stroke-[3px]" />
                                        </button>

                                        <div className="min-w-0">
                                          <div className="flex items-center gap-2 flex-wrap">
                                            <span 
                                              className={`text-xs font-semibold ${
                                                solved ? "line-through text-gray-400" : "text-white"
                                              }`}
                                            >
                                              {problem.title}
                                            </span>

                                            <Badge
                                              variant={
                                                problem.difficulty === "Easy" ? "success" : 
                                                problem.difficulty === "Medium" ? "warning" : "error"
                                              }
                                              className="text-[10px] font-medium py-0 px-2"
                                            >
                                              {problem.difficulty}
                                            </Badge>

                                            {/* In Progress Tag */}
                                            {status === "In Progress" && (
                                              <span className="text-[10px] font-medium text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
                                                In Progress
                                              </span>
                                            )}

                                            {/* Company Badges */}
                                            {problem.companies && problem.companies.length > 0 && (
                                              <div className="hidden md:flex items-center gap-1">
                                                {problem.companies.slice(0, 3).map(comp => (
                                                  <span 
                                                    key={comp.id || comp.name}
                                                    className="text-[9.5px] px-1.5 py-0.5 rounded bg-white/5 text-gray-400 font-medium"
                                                  >
                                                    {comp.name}
                                                  </span>
                                                ))}
                                                {problem.companies.length > 3 && (
                                                  <span className="text-[9.5px] text-gray-500">
                                                    +{problem.companies.length - 3}
                                                  </span>
                                                )}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>

                                      {/* Right: Actions */}
                                      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                                        {/* Star Button */}
                                        <button
                                          onClick={() => handleToggleStar(problem.id)}
                                          title={isStarred ? "Remove from starred" : "Star problem"}
                                          className={`p-1.5 rounded-lg transition-colors ${
                                            isStarred ? "text-amber-400 bg-amber-400/10" : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                                          }`}
                                        >
                                          <Star className={`w-3.5 h-3.5 ${isStarred ? "fill-amber-400" : ""}`} />
                                        </button>

                                        {/* Status Cycle Button */}
                                        <button
                                          onClick={() => handleCycleStatus(problem)}
                                          className="text-[11px] font-medium text-gray-400 hover:text-white px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                                          title="Click to cycle status: Not Started -> In Progress -> Solved"
                                        >
                                          {status}
                                        </button>

                                        {/* LeetCode Link */}
                                        {problem.leetcodeUrl && (
                                          <a
                                            href={problem.leetcodeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-[11px] font-medium text-blue-400 hover:text-blue-300 px-2 py-1 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 transition-colors"
                                            title="Open on LeetCode"
                                          >
                                            <span>LeetCode</span>
                                            <ExternalLink className="w-3 h-3" />
                                          </a>
                                        )}

                                        {/* Practice / GFG Link */}
                                        {problem.practiceUrl && (
                                          <a
                                            href={problem.practiceUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 hover:text-emerald-300 px-2 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors"
                                            title="Practice Problem"
                                          >
                                            <span>GFG</span>
                                            <ExternalLink className="w-3 h-3" />
                                          </a>
                                        )}

                                        {/* YouTube Link */}
                                        {problem.youtubeUrl && (
                                          <a
                                            href={problem.youtubeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1.5 rounded-lg text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 transition-colors"
                                            title="Watch Video Solution"
                                          >
                                            <Youtube className="w-3.5 h-3.5" />
                                          </a>
                                        )}

                                        {/* Notes / Detail Drawer Toggle */}
                                        <button
                                          onClick={() => setExpandedProblemId(isDetailExpanded ? null : problem.id)}
                                          className="p-1.5 rounded-lg text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                                          title="View notes & details"
                                        >
                                          <FileText className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    </div>

                                    {/* Expanded Detail & Notes Area */}
                                    {isDetailExpanded && (
                                      <div className="mt-3 pt-3 border-t border-white/5 space-y-2.5">
                                        <div className="flex justify-between items-center">
                                          <span className="text-[11px] font-medium text-gray-400">
                                            Your Personal Notes & Pattern Observations
                                          </span>
                                          <span className="text-[10px] text-gray-500">Saved locally</span>
                                        </div>
                                        <textarea
                                          value={problemNotes[problem.id] || ""}
                                          onChange={(e) => handleSaveNotes(problem.id, e.target.value)}
                                          placeholder="Note edge cases, time/space complexity, or optimal approach for fast recall..."
                                          rows={2}
                                          className="w-full bg-[#111827] border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-gray-500 outline-none focus:border-blue-500 resize-none"
                                        />
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>

                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </>
      ) : (
        /* 6. Solved History Tab */
        <Card className="p-6 bg-[#111827] border-white/8 rounded-2xl space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-white/5">
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">Your Solved History ({dsaProblems.length})</h2>
              <p className="text-xs text-gray-400">Chronological record of completed questions synced to your PostgreSQL account.</p>
            </div>
            <Button
              onClick={() => setShowLogModal(true)}
              variant="primary"
              className="text-xs font-semibold py-1.5 px-3 rounded-xl"
            >
              <Plus className="w-3 h-3 mr-1" /> Log Problem
            </Button>
          </div>

          {dsaProblems.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Clock className="w-8 h-8 text-gray-600 mx-auto" />
              <p className="text-xs text-gray-400 font-medium">No solved problems recorded in your history yet.</p>
              <p className="text-[11px] text-gray-500">Solve problems in the Pattern-Wise sheet to build your database history.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {dsaProblems.map((problem) => (
                <div key={problem.id} className="py-3.5 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-white">{problem.name}</span>
                      <Badge
                        variant={
                          problem.difficulty === "Easy" ? "success" : 
                          problem.difficulty === "Medium" ? "warning" : "error"
                        }
                        className="text-[10px] font-medium py-0 px-2"
                      >
                        {problem.difficulty}
                      </Badge>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 font-medium">
                        {problem.topic}
                      </span>
                      {problem.timeSpent && (
                        <span className="text-[10px] text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {problem.timeSpent} mins
                        </span>
                      )}
                    </div>
                    {problem.notes && (
                      <p className="text-xs text-gray-400 italic mt-0.5">{problem.notes}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                    <span className="text-[10px] text-gray-500">
                      {new Date(problem.createdAt).toLocaleDateString()}
                    </span>
                    {onDeleteDsaProblem && (
                      <button
                        onClick={() => onDeleteDsaProblem(problem.id)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* 7. Modal for Logging Custom Problem */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <Card className="w-full max-w-md p-6 bg-[#111827] border-white/10 rounded-2xl shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                <Code className="w-4 h-4 text-blue-400" /> Log Solved Problem
              </h3>
              <button 
                onClick={() => setShowLogModal(false)}
                className="text-gray-400 hover:text-white text-xs font-semibold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCustomLogSubmit} className="space-y-3.5">
              <Input
                label="Problem Title"
                type="text"
                required
                value={logName}
                onChange={(e) => setLogName(e.target.value)}
                placeholder="e.g. Trapping Rain Water"
              />

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-300">Topic</label>
                  <select
                    value={logTopic}
                    onChange={(e) => setLogTopic(e.target.value)}
                    className="w-full bg-[#1f2937] border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
                  >
                    {PATTERN_WISE_TOPICS.map(t => (
                      <option key={t.id} value={t.title}>{t.title}</option>
                    ))}
                    <option value="General">General / Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-300">Difficulty</label>
                  <select
                    value={logDifficulty}
                    onChange={(e) => setLogDifficulty(e.target.value as any)}
                    className="w-full bg-[#1f2937] border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <Input
                label="Time Spent (minutes)"
                type="number"
                value={logTimeSpent}
                onChange={(e) => setLogTimeSpent(e.target.value)}
                placeholder="30"
              />

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-300">Notes / Reflection</label>
                <textarea
                  value={logNotes}
                  onChange={(e) => setLogNotes(e.target.value)}
                  placeholder="Key observations, edge cases, optimal approach..."
                  rows={3}
                  className="w-full bg-[#1f2937] border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-gray-500 outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowLogModal(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="text-xs"
                >
                  Save to Database
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

    </div>
  );
}
