import React from "react";
import { TrendingUp, Plus } from "lucide-react";
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

      {/* 2. Solved Metrics Circle Representation (Clean and Restrained) */}
      <Card className="flex flex-col md:flex-row items-center gap-6 p-6">
        
        {/* Total circular visualization */}
        <div className="w-32 h-32 rounded-full border-4 border-white/5 flex flex-col items-center justify-center relative shrink-0">
          {/* Animated gradient ring */}
          <div className="absolute inset-0 rounded-full border-4 border-t-[#10B981] border-r-[#2563EB] border-b-transparent border-l-transparent animate-spin-slow"></div>
          <span className="text-2xl font-mono font-bold text-white relative z-10">{total}</span>
          <span className="text-[9px] uppercase tracking-wider font-bold text-gray-400 relative z-10">Solved</span>
        </div>

        {/* Breakdown indices */}
        <div className="flex-1 w-full space-y-4">
          <div className="space-y-1">
            <h3 className="text-xs uppercase font-extrabold text-white tracking-wider">Algorithmic Benchmarks</h3>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Track solving counts to map technical confidence targets.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-1">
            <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
              <span className="text-[#10B981] font-mono font-bold block text-sm">{easySolved}</span>
              <span className="text-[9px] uppercase font-bold text-gray-400 block font-mono">Easy</span>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
              <span className="text-[#2563EB] font-mono font-bold block text-sm">{mediumSolved}</span>
              <span className="text-[9px] uppercase font-bold text-gray-400 block font-mono">Medium</span>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
              <span className="text-red-400 font-mono font-bold block text-sm">{hardSolved}</span>
              <span className="text-[9px] uppercase font-bold text-gray-400 block font-mono">Hard</span>
            </div>
          </div>
        </div>

      </Card>

      {/* 3. Incremental updates (outline button styles) */}
      <Card className="space-y-4">
        <h3 className="text-xs uppercase font-extrabold text-gray-300 tracking-wider">Log Solved Challenges</h3>
        
        <div className="grid md:grid-cols-3 gap-3">
          <Button 
            onClick={() => setEasySolved(prev => prev + 1)}
            variant="outline"
            className="py-3 border-emerald-500/20 text-[#10B981] hover:bg-[#10B981]/5 hover:border-emerald-500/40"
            icon={<Plus className="w-4 h-4" />}
          >
            Easy Solution
          </Button>

          <Button 
            onClick={() => setMediumSolved(prev => prev + 1)}
            variant="outline"
            className="py-3 border-blue-500/20 text-[#60a5fa] hover:bg-blue-500/5 hover:border-blue-500/40"
            icon={<Plus className="w-4 h-4" />}
          >
            Medium Solution
          </Button>

          <Button 
            onClick={() => setHardSolved(prev => prev + 1)}
            variant="outline"
            className="py-3 border-red-500/20 text-red-300 hover:bg-red-500/5 hover:border-red-500/40"
            icon={<Plus className="w-4 h-4" />}
          >
            Hard Solution
          </Button>
        </div>
      </Card>

    </div>
  );
}
