import React from "react";
import Badge from "./Badge";

interface ScoreProps {
  score: number;
  label?: string;
  explanation?: string;
  breakdown?: { name: string; score: number }[];
}

export default function Score({ score, label, explanation, breakdown }: ScoreProps) {
  const getQualityText = (val: number) => {
    if (val >= 85) return "Strong Compatibility";
    if (val >= 70) return "Moderate Compatibility";
    return "Action Items Required";
  };

  const getQualityVariant = (val: number) => {
    if (val >= 85) return "success" as const;
    if (val >= 70) return "warning" as const;
    return "error" as const;
  };

  return (
    <div className="bg-[#111827] p-5 rounded-2xl border border-white/5 space-y-4 w-full">
      
      <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
        <div>
          <p className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Score Rating Index</p>
          <h4 className="text-2xl font-mono font-bold text-white mt-0.5">{score} <span className="text-xs text-gray-400 font-normal">/ 100</span></h4>
        </div>
        <Badge variant={getQualityVariant(score)}>
          {label || getQualityText(score)}
        </Badge>
      </div>

      {explanation && (
        <p className="text-[11px] text-gray-400 leading-relaxed">
          {explanation}
        </p>
      )}

      {breakdown && breakdown.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-white/5">
          <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Scoring Breakdown</p>
          <div className="space-y-2">
            {breakdown.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[10.5px]">
                  <span className="text-gray-400">{item.name}</span>
                  <span className="text-white font-mono font-bold">{item.score}%</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-white/20 rounded-full" style={{ width: `${item.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
