import React, { useState } from "react";
import { TrendingUp, Plus, Trash2, BookOpen, Award, CheckCircle, Code, HelpCircle } from "lucide-react";
import { DsaProblemLog } from "../../types";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";

interface DsaPageProps {
  dsaProblems: DsaProblemLog[];
  onLogDsaProblem?: (log: Omit<DsaProblemLog, "id" | "createdAt">) => void;
  onDeleteDsaProblem?: (id: string) => void;
}

export default function DsaPage({
  dsaProblems = [],
  onLogDsaProblem,
  onDeleteDsaProblem
}: DsaPageProps) {
  // Derive counts from solved problems list
  const easySolved = dsaProblems.filter(p => p.difficulty === "Easy").length;
  const mediumSolved = dsaProblems.filter(p => p.difficulty === "Medium").length;
  const hardSolved = dsaProblems.filter(p => p.difficulty === "Hard").length;
  const total = easySolved + mediumSolved + hardSolved;
  
  // Benchmark target
  const targetGoal = 150;
  const progressPercent = Math.min(Math.round((total / targetGoal) * 100), 100);

  // SVG Circular progress dimensions
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  // New problem log form state
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("Array");
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");
  const [timeSpent, setTimeSpent] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onLogDsaProblem?.({
      name: name.trim(),
      topic,
      difficulty,
      timeSpent: parseInt(timeSpent, 10) || 30,
      notes: notes.trim()
    });
    setName("");
    setTimeSpent("");
    setNotes("");
  };

  // Dynamic next problems recommendation logic
  const getDsaRecommendations = () => {
    const topicCounts: Record<string, number> = {};
    dsaProblems.forEach(p => {
      topicCounts[p.topic] = (topicCounts[p.topic] || 0) + 1;
    });

    const candidateProblems = [
      { name: "Two Sum", topic: "Array", difficulty: "Easy", link: "https://leetcode.com/problems/two-sum/" },
      { name: "Container With Most Water", topic: "Array", difficulty: "Medium", link: "https://leetcode.com/problems/container-with-most-water/" },
      { name: "Longest Substring Without Repeating Characters", topic: "String", difficulty: "Medium", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
      { name: "Valid Parentheses", topic: "Stack", difficulty: "Easy", link: "https://leetcode.com/problems/valid-parentheses/" },
      { name: "Merge K Sorted Lists", topic: "Heap", difficulty: "Hard", link: "https://leetcode.com/problems/merge-k-sorted-lists/" },
      { name: "Climbing Stairs", topic: "Dynamic Programming", difficulty: "Easy", link: "https://leetcode.com/problems/climbing-stairs/" },
      { name: "Longest Common Subsequence", topic: "Dynamic Programming", difficulty: "Medium", link: "https://leetcode.com/problems/longest-common-subsequence/" },
      { name: "Number of Islands", topic: "Graph", difficulty: "Medium", link: "https://leetcode.com/problems/number-of-islands/" },
      { name: "Clone Graph", topic: "Graph", difficulty: "Medium", link: "https://leetcode.com/problems/clone-graph/" },
      { name: "Maximum Depth of Binary Tree", topic: "Tree", difficulty: "Easy", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
      { name: "Binary Tree Level Order Traversal", topic: "Tree", difficulty: "Medium", link: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
      { name: "Kth Largest Element in an Array", topic: "Heap", difficulty: "Medium", link: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
      { name: "Search in Rotated Sorted Array", topic: "Binary Search", difficulty: "Medium", link: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
      { name: "Course Schedule", topic: "Graph", difficulty: "Medium", link: "https://leetcode.com/problems/course-schedule/" }
    ];

    const unsolvedCandidates = candidateProblems.filter(cp => 
      !dsaProblems.some(sp => sp.name.toLowerCase().replace(/[^a-z0-9]/g, "") === cp.name.toLowerCase().replace(/[^a-z0-9]/g, ""))
    );

    unsolvedCandidates.sort((a, b) => {
      const aCount = topicCounts[a.topic] || 0;
      const bCount = topicCounts[b.topic] || 0;
      return aCount - bCount;
    });

    return unsolvedCandidates.slice(0, 3);
  };

  const recommendations = getDsaRecommendations();

  const topicOptions = [
    { value: "Array", label: "Array" },
    { value: "String", label: "String" },
    { value: "Hash Table", label: "Hash Table" },
    { value: "Stack", label: "Stack / Queue" },
    { value: "Heap", label: "Heap / Priority Queue" },
    { value: "Dynamic Programming", label: "Dynamic Programming" },
    { value: "Graph", label: "Graph" },
    { value: "Tree", label: "Tree / BST" },
    { value: "Binary Search", label: "Binary Search" }
  ];

  const difficultyOptions = [
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Hard", label: "Hard" }
  ];

  return (
    <div className="space-y-8">
      
      {/* 1. Header Details */}
      <section className="space-y-1">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#10B981]" /> DSA Tracker
        </h2>
        <p className="text-xs text-gray-400">
          Track completed algorithmic exercises and complexity benchmarks.
        </p>
      </section>

      {/* 2. Solved Metrics Circle Representation */}
      <Card className="flex flex-col md:flex-row items-center gap-8 p-6 md:p-8">
        
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
            <span className="text-2xl font-mono font-bold text-white leading-none">{total}</span>
            <span className="text-[8px] uppercase tracking-widest font-extrabold text-gray-500 mt-1 font-mono">Solved</span>
          </div>
        </div>

        {/* Breakdown indices */}
        <div className="flex-1 w-full space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xs uppercase font-extrabold text-white tracking-wider">Algorithmic Benchmarks</h3>
              <Badge variant={progressPercent >= 100 ? "success" : "default"} className="font-mono text-[9px]">
                {progressPercent}% of Goal ({targetGoal})
              </Badge>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Track solving counts to map technical confidence targets. Consistency beats cramming.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-1">
            <div className="bg-white/2 p-3 rounded-xl border border-white/5 text-center">
              <span className="text-[#10B981] font-mono font-bold block text-sm">{easySolved}</span>
              <span className="text-[9px] uppercase font-bold text-gray-500 block font-mono mt-0.5">Easy</span>
            </div>
            <div className="bg-white/2 p-3 rounded-xl border border-white/5 text-center">
              <span className="text-blue-400 font-mono font-bold block text-sm">{mediumSolved}</span>
              <span className="text-[9px] uppercase font-bold text-gray-500 block font-mono mt-0.5">Medium</span>
            </div>
            <div className="bg-white/2 p-3 rounded-xl border border-white/5 text-center">
              <span className="text-red-400 font-mono font-bold block text-sm">{hardSolved}</span>
              <span className="text-[9px] uppercase font-bold text-gray-500 block font-mono mt-0.5">Hard</span>
            </div>
          </div>
        </div>

      </Card>

      {/* 3. Main Split Grid */}
      <div className="grid md:grid-cols-3 gap-6 items-start">
        
        {/* Left Side: Logger Form & Solved logs list (2/3 width) */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Logger Form */}
          <Card className="p-6">
            <h3 className="text-xs uppercase font-extrabold text-gray-300 tracking-wider pb-2 border-b border-white/5 mb-4">
              Log Solved Challenge
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Problem Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Number of Islands"
                  className="text-xs"
                  required
                />
                <Input 
                  label="Time Spent (minutes)"
                  value={timeSpent}
                  onChange={(e) => setTimeSpent(e.target.value)}
                  placeholder="e.g. 45"
                  className="text-xs font-mono"
                  type="number"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Select 
                  label="Topic Tag"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  options={topicOptions}
                />
                <Select 
                  label="Difficulty Level"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  options={difficultyOptions}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Approach & Personal Notes</label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Detail key complexity constraints, data structures, or optimization learnings..."
                  rows={3}
                  className="w-full bg-[#111827] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#10B981]/50 transition-colors resize-none"
                />
              </div>

              <Button 
                type="submit"
                variant="primary"
                className="w-full py-2.5 font-bold text-xs bg-emerald-600 hover:bg-emerald-700 hover:border-emerald-700 flex items-center justify-center gap-1.5"
                icon={<Plus className="w-4 h-4" />}
              >
                Log Solved Challenge
              </Button>
            </form>
          </Card>

          {/* Solved Problems Log Table/List */}
          <Card className="p-6">
            <h3 className="text-xs uppercase font-extrabold text-gray-300 tracking-wider pb-2 border-b border-white/5 mb-4">
              Practice History Log
            </h3>
            
            <div className="space-y-3">
              {dsaProblems.length === 0 ? (
                <div className="text-center py-12 text-xs text-gray-500 space-y-2">
                  <Code className="w-8 h-8 text-gray-600 mx-auto" />
                  <p>No solved challenges logged yet. Log your first challenge above!</p>
                </div>
              ) : (
                dsaProblems.map((p) => (
                  <div key={p.id} className="p-3 bg-white/2 rounded-xl border border-white/5 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white truncate">{p.name}</span>
                        <Badge variant={p.difficulty === "Hard" ? "error" : p.difficulty === "Medium" ? "info" : "success"} className="text-[8px] font-mono py-0 px-1.5">
                          {p.difficulty}
                        </Badge>
                        <Badge variant="default" className="text-[8px] font-mono py-0 px-1.5 bg-white/5 text-gray-400 border-none">
                          {p.topic}
                        </Badge>
                      </div>
                      {p.notes && <p className="text-[10px] text-gray-400 leading-normal">{p.notes}</p>}
                      <p className="text-[8.5px] text-gray-500 font-mono">Logged: {new Date(p.createdAt || Date.now()).toLocaleDateString()} • {p.timeSpent} mins</p>
                    </div>

                    {onDeleteDsaProblem && (
                      <button 
                        onClick={() => onDeleteDsaProblem(p.id)}
                        className="text-gray-500 hover:text-red-400 transition-colors p-1.5 border border-white/5 hover:border-white/10 rounded-lg hover:bg-white/5 shrink-0 self-end sm:self-center"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </Card>

        </div>

        {/* Right Side: AI Recommendations Engine (1/3 width) */}
        <div className="space-y-6">
          
          <Card className="p-6 border-[#10B981]/20 bg-[#10B981]/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none">
              <Award className="w-24 h-24 text-white" />
            </div>

            <div className="flex justify-between items-center border-b border-[#10B981]/25 pb-3">
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-gray-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#10B981]" /> AI Next Problems
              </h3>
            </div>

            <p className="text-[10px] text-gray-400 pt-3 leading-relaxed">
              Targeted recommendations dynamically prioritized to close knowledge gaps and practice weak topics.
            </p>

            <div className="pt-4 space-y-3">
              {recommendations.length === 0 ? (
                <div className="text-center py-6 text-[10px] text-gray-500">
                  Goal reached! All topics covered.
                </div>
              ) : (
                recommendations.map((rec, idx) => (
                  <a 
                    key={idx}
                    href={rec.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-white/2 hover:bg-white/5 border border-white/5 rounded-xl transition-all group"
                  >
                    <div className="flex justify-between items-start gap-1">
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-white group-hover:text-[#10B981] transition-colors truncate block">{rec.name}</span>
                        <span className="text-[9px] font-mono text-gray-500 block mt-0.5">{rec.topic} • {rec.difficulty}</span>
                      </div>
                      <Code className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors shrink-0 mt-0.5" />
                    </div>
                  </a>
                ))
              )}
            </div>
          </Card>

          <Card className="p-6 space-y-3">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-gray-500" /> Focus Guidelines
            </h4>
            <ul className="space-y-2 text-[10.5px] text-gray-400 leading-normal list-disc pl-4">
              <li>Aim to solve at least <b>2 Medium problems</b> for every Easy problem.</li>
              <li>Spend no more than 45 minutes trying before reading discussions.</li>
              <li>Always code the solution from scratch after understanding the approach.</li>
            </ul>
          </Card>

        </div>

      </div>

    </div>
  );
}
