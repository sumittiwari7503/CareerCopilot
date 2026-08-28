import React from "react";
import { FileText, Sparkles, AlertTriangle, RefreshCw } from "lucide-react";
import { ResumeAnalysis } from "../../types";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Score from "../../components/ui/Score";
import Textarea from "../../components/ui/Textarea";

interface ResumePageProps {
  resumeText: string;
  setResumeText: (text: string) => void;
  handleCustomResumeAnalyze: () => void;
  isAnalyzingResume: boolean;
  analysisResult: ResumeAnalysis | null;
  targetRole: string;
}

export default function ResumePage({
  resumeText,
  setResumeText,
  handleCustomResumeAnalyze,
  isAnalyzingResume,
  analysisResult,
  targetRole
}: ResumePageProps) {
  return (
    <div className="space-y-8">
      
      {/* 1. Header Details */}
      <section className="space-y-1">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#2563EB]" /> ATS Resume Optimizer
        </h2>
        <p className="text-xs text-gray-400">
          Paste your professional resume details to screen against typical Applicant Tracking Systems and recruiter criteria.
        </p>
      </section>

      <div className="grid lg:grid-cols-5 gap-6 items-start">
        
        {/* Editor input block (2/5 width) */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-6 space-y-4">
            <h3 className="text-xs uppercase font-extrabold text-white tracking-wider pb-2 border-b border-white/5">
              Resume Source Text
            </h3>
            
            <div className="space-y-3">
              <Textarea 
                label="Copy & paste text content"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste the raw text representation of your resume here..."
                rows={12}
                className="text-xs font-mono"
              />
              
              <Button 
                onClick={handleCustomResumeAnalyze}
                loading={isAnalyzingResume}
                variant="primary"
                className="w-full py-3 mt-2 flex items-center justify-center gap-2"
                icon={<RefreshCw className={`w-4 h-4 ${isAnalyzingResume ? "animate-spin" : ""}`} />}
              >
                Scan & Optimize ATS Compatibility
              </Button>
            </div>
          </Card>
        </div>

        {/* Results breakdown (3/5 width) */}
        <div className="lg:col-span-3 space-y-4">
          {!analysisResult ? (
            <Card className="text-center py-16 text-xs text-gray-500 border border-dashed border-white/10 bg-transparent flex flex-col justify-center items-center space-y-3">
              <FileText className="w-12 h-12 text-gray-600" />
              <div className="space-y-1 max-w-sm">
                <p className="font-bold text-gray-400">No Analysis Done Yet</p>
                <p className="text-[10px] text-gray-500">Paste your resume in the editor on the left and click scan to receive a personalized compatibility report.</p>
              </div>
            </Card>
          ) : (
            <div className="space-y-6">
              
              {/* Score Indicator */}
              <Card className="p-6">
                <Score 
                  score={analysisResult.atsScore}
                  label={analysisResult.compatibilityText}
                  explanation="Matches against typical engineering screening rules, including keyword counts and action metrics."
                  breakdown={[
                    { name: "ATS Terminology Match", score: Math.round(analysisResult.atsScore * 1.05) > 100 ? 100 : Math.round(analysisResult.atsScore * 1.05) },
                    { name: "Frameworks & Core Tools", score: Math.round(analysisResult.atsScore * 0.95) },
                    { name: "Quantifiable Performance Metrics", score: Math.round(analysisResult.atsScore * 0.8) }
                  ]}
                />
              </Card>

              {/* Suggestions list */}
              <Card className="p-6 space-y-4">
                <h3 className="text-xs uppercase font-extrabold text-white tracking-wider pb-2 border-b border-white/5">
                  Actionable Rewrite Guidance
                </h3>

                <div className="space-y-3.5 pt-1">
                  {analysisResult.suggestions.map((s, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 bg-white/2 rounded-xl border border-white/5 space-y-2.5 text-xs relative overflow-hidden transition-all hover:bg-white/4"
                    >
                      <div className={`absolute top-0 left-0 h-full w-1 ${s.evidenceClass === "Missing" ? "bg-red-500" : s.evidenceClass === "Weak" ? "bg-yellow-500" : "bg-[#2563EB]"}`}></div>
                      
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5 leading-snug">
                          <Sparkles className="w-3.5 h-3.5 text-[#a78bfa] shrink-0" /> {s.title}
                        </h4>
                        <Badge variant={s.evidenceClass === "Missing" ? "error" : s.evidenceClass === "Weak" ? "warning" : "default"}>
                          {s.evidenceClass}
                        </Badge>
                      </div>

                      <p className="text-gray-300 leading-relaxed text-[11px]">{s.description}</p>
                      
                      <div className="text-[10px] text-gray-400 bg-black/20 p-2.5 rounded-lg border border-white/5 space-y-1">
                        <span className="font-bold text-gray-500 uppercase tracking-widest text-[8px] font-mono block">Context / Proof Detail</span>
                        <p className="italic">"{s.evidenceDetail || "No matching proof details detected in resume source."}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Missing keywords badge list */}
              {analysisResult.missingKeywords.length > 0 && (
                <Card className="p-6 space-y-3">
                  <h3 className="text-xs uppercase font-extrabold text-white tracking-wider pb-2 border-b border-white/5">
                    Crucial Missing Keywords
                  </h3>
                  <p className="text-[10.5px] text-gray-400">Recruiter search filters for a {targetRole} role often check for these technologies.</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {analysisResult.missingKeywords.map((tag, idx) => (
                      <Badge key={idx} variant="error" className="text-[10px] font-mono py-1 px-2.5 bg-red-500/10 border-red-500/20 text-red-400 font-bold">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Card>
              )}

            </div>
          )}
        </div>

      </div>

    </div>
  );
}
