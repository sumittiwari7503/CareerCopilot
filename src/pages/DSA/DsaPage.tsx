import React from "react";
import { TrendingUp, Plus, Minus, CheckCircle } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

interface DsaPageProps {
  easySolved: number;
  setEasySolved: React.Dispatch<React.SetStateAction<number>>;
  mediumSolved: number;
  setMediumSolved: React.Dispatch<React.SetStateAction<number>>;
  hardSolved: number;
  setHardSolved: React.Dispatch<React.SetStateAction<number>>;
}

export default function DsaPage({
  easySolved,
  setEasySolved,
  mediumSolved,
  setMediumSolved,
  hardSolved,
  setHardSolved
}: DsaPageProps) {
  const total = easySolved + mediumSolved + hardSolved;
  
  // Benchmark target
  const targetGoal = 150;
  const progressPercent = Math.min(Math.round((total / targetGoal) * 100), 100);

  // SVG Circular progress dimensions
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

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
            {/* Background circle */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              className="stroke-white/5"
              strokeWidth="8"
              fill="transparent"
            />
            {/* Foreground circle */}
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

      {/* 3. Incremental updates with adjustments */}
      <Card className="p-6 space-y-5">
        <h3 className="text-xs uppercase font-extrabold text-gray-300 tracking-wider pb-2 border-b border-white/5">
          Log Solved Challenges
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          
          {/* Easy solver counter */}
          <div className="bg-white/2 p-4 rounded-xl border border-white/5 flex flex-col justify-between gap-3">
            <div>
              <span className="text-[#10B981] text-[10px] font-mono font-bold uppercase tracking-wider">Easy Challenges</span>
              <p className="text-[10px] text-gray-400 mt-1">Simple arrays, string manipulation, and hash map searches.</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setEasySolved(prev => Math.max(0, prev - 1))}
                className="w-10 h-10 rounded-xl border border-white/5 hover:border-white/10 flex items-center justify-center text-gray-400 hover:text-white bg-white/2 hover:bg-white/5 transition-all"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setEasySolved(prev => prev + 1)}
                className="flex-1 h-10 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/20 text-[#10B981] font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" /> Log Solve
              </button>
            </div>
          </div>

          {/* Medium solver counter */}
          <div className="bg-white/2 p-4 rounded-xl border border-white/5 flex flex-col justify-between gap-3">
            <div>
              <span className="text-blue-400 text-[10px] font-mono font-bold uppercase tracking-wider">Medium Challenges</span>
              <p className="text-[10px] text-gray-400 mt-1">DFS/BFS trees, sliding windows, and greedy algorithms.</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setMediumSolved(prev => Math.max(0, prev - 1))}
                className="w-10 h-10 rounded-xl border border-white/5 hover:border-white/10 flex items-center justify-center text-gray-400 hover:text-white bg-white/2 hover:bg-white/5 transition-all"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setMediumSolved(prev => prev + 1)}
                className="flex-1 h-10 rounded-xl bg-blue-500/10 hover:bg-blue-500/15 border border-blue-500/20 text-[#60a5fa] font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" /> Log Solve
              </button>
            </div>
          </div>

          {/* Hard solver counter */}
          <div className="bg-white/2 p-4 rounded-xl border border-white/5 flex flex-col justify-between gap-3">
            <div>
              <span className="text-red-400 text-[10px] font-mono font-bold uppercase tracking-wider">Hard Challenges</span>
              <p className="text-[10px] text-gray-400 mt-1">Advanced dynamic programming, graphs, and segment trees.</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setHardSolved(prev => Math.max(0, prev - 1))}
                className="w-10 h-10 rounded-xl border border-white/5 hover:border-white/10 flex items-center justify-center text-gray-400 hover:text-white bg-white/2 hover:bg-white/5 transition-all"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setHardSolved(prev => prev + 1)}
                className="flex-1 h-10 rounded-xl bg-red-500/10 hover:bg-red-500/15 border border-red-500/20 text-red-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" /> Log Solve
              </button>
            </div>
          </div>

        </div>
      </Card>

    </div>
  );
}
