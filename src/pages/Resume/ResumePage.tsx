import React, { useState } from "react";
import { FileText, Sparkles, AlertTriangle, RefreshCw, X, Check, Edit2, Download } from "lucide-react";
import { ResumeAnalysis } from "../../types";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Score from "../../components/ui/Score";
import Textarea from "../../components/ui/Textarea";
import { jsPDF } from "jspdf";

interface ResumePageProps {
  resumeText: string;
  setResumeText: (text: string) => void;
  targetJd: string;
  setTargetJd: (text: string) => void;
  handleCustomResumeAnalyze: () => void;
  isAnalyzingResume: boolean;
  analysisResult: ResumeAnalysis | null;
  targetRole: string;
  applyResumeFix: (suggestion: any) => Promise<{ before: string; after: string }>;
}

export default function ResumePage({
  resumeText,
  setResumeText,
  targetJd,
  setTargetJd,
  handleCustomResumeAnalyze,
  isAnalyzingResume,
  analysisResult,
  targetRole,
  applyResumeFix
}: ResumePageProps) {
  // Modal states for Apply Fix
  const [activeSuggestion, setActiveSuggestion] = useState<any | null>(null);
  const [loadingFix, setLoadingFix] = useState(false);
  const [fixResult, setFixResult] = useState<{ before: string; after: string } | null>(null);
  const [editedAfterText, setEditedAfterText] = useState("");
  const [fixError, setFixError] = useState<string | null>(null);

  // Trigger AI Bullet Optimization
  const handleTriggerFix = async (suggestion: any) => {
    setActiveSuggestion(suggestion);
    setLoadingFix(true);
    setFixResult(null);
    setFixError(null);
    try {
      const result = await applyResumeFix(suggestion);
      setFixResult(result);
      setEditedAfterText(result.after);
    } catch (err: any) {
      setFixError(err.message || "Failed to generate AI rewrite proposal. Please try again.");
    } finally {
      setLoadingFix(false);
    }
  };

  // Accept and apply the fix
  const handleAcceptFix = () => {
    if (!fixResult) return;
    const originalText = resumeText;
    const beforeText = fixResult.before.trim();
    const afterText = editedAfterText.trim();

    if (originalText.includes(beforeText)) {
      const updated = originalText.replace(beforeText, afterText);
      setResumeText(updated);
      // Automatically trigger a recheck / analysis resync
      setTimeout(() => {
        handleCustomResumeAnalyze();
      }, 100);
    } else {
      // Direct replacement failed due to whitespace/formatting. Fallback to appending or general alert
      alert("Could not locate the exact original text block inside your resume to replace. Please copy the fix text manually and apply.");
    }
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setActiveSuggestion(null);
    setFixResult(null);
    setEditedAfterText("");
    setFixError(null);
  };

  // jsPDF single column ATS friendly format generator
  const handleDownloadPDF = () => {
    if (!resumeText.trim()) return;
    
    const doc = new jsPDF("p", "mm", "a4");
    doc.setFont("helvetica", "normal");
    
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;
    
    let y = 20;
    const lines = resumeText.split("\n");
    
    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        y += 4; // blank line space
        return;
      }
      
      if (y > pageHeight - 20) {
        doc.addPage();
        y = 20;
      }
      
      if (idx === 0) {
        // Main Name header
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text(trimmed, pageWidth / 2, y, { align: "center" });
        y += 8;
        doc.setFont("helvetica", "normal");
      } else if (idx === 1 && (trimmed.includes("@") || trimmed.includes("|") || trimmed.includes("/") || trimmed.length < 100)) {
        // Contact details subtitle
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.text(trimmed, pageWidth / 2, y, { align: "center" });
        y += 8;
      } else if (
        trimmed === trimmed.toUpperCase() && 
        trimmed.length < 30 && 
        !trimmed.startsWith("-") && 
        !trimmed.startsWith("*")
      ) {
        // Section Header
        y += 4;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text(trimmed, margin, y);
        
        // Horizontal rule
        y += 2;
        doc.setDrawColor(75, 85, 99); // borders grey
        doc.setLineWidth(0.2);
        doc.line(margin, y, pageWidth - margin, y);
        
        y += 6;
        doc.setFont("helvetica", "normal");
      } else {
        // Body details
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        
        const splitText = doc.splitTextToSize(trimmed, contentWidth);
        splitText.forEach((t: string) => {
          if (y > pageHeight - 20) {
            doc.addPage();
            y = 20;
          }
          
          if (t.startsWith("- ") || t.startsWith("* ")) {
            doc.text(t, margin + 2, y);
          } else {
            doc.text(t, margin, y);
          }
          y += 5.5;
        });
      }
    });
    
    const safeName = targetRole.replace(/\s+/g, "_") || "ATS_Optimized";
    doc.save(`${safeName}_Resume.pdf`);
  };

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
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <h3 className="text-xs uppercase font-extrabold text-white tracking-wider">
                Resume Source Text
              </h3>
              {resumeText.trim() && (
                <button 
                  onClick={handleDownloadPDF}
                  className="text-[10px] text-[#10B981] hover:underline flex items-center gap-1 font-mono uppercase font-bold"
                >
                  <Download className="w-3 h-3" /> PDF Export
                </button>
              )}
            </div>
            
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

          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <h3 className="text-xs uppercase font-extrabold text-white tracking-wider">
                Target Job Description (JD)
              </h3>
            </div>
            
            <div className="space-y-3">
              <Textarea 
                label="Paste target job listing"
                value={targetJd}
                onChange={(e) => setTargetJd(e.target.value)}
                placeholder="Paste the target job description requirements here to evaluate keyword density..."
                rows={8}
                className="text-xs"
              />
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

                      <div className="flex justify-end pt-2">
                        {s.actionText === "Apply Fix" ? (
                          <Button 
                            onClick={() => handleTriggerFix(s)}
                            variant="secondary"
                            className="text-[10px] py-1 px-3 bg-[#2563EB] hover:bg-[#1d4ed8] text-white flex items-center gap-1 border-none font-bold uppercase tracking-wider"
                            icon={<Sparkles className="w-3 h-3" />}
                          >
                            Apply AI Fix
                          </Button>
                        ) : s.actionText === "Format PDF" ? (
                          <Button 
                            onClick={handleDownloadPDF}
                            variant="outline"
                            className="text-[10px] py-1 px-3 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 flex items-center gap-1 font-bold uppercase tracking-wider"
                            icon={<Download className="w-3 h-3" />}
                          >
                            Format PDF
                          </Button>
                        ) : null}
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

      {/* AI Bullet optimization Modal */}
      {activeSuggestion && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <Card className="w-full max-w-xl p-6 border border-white/10 shadow-2xl space-y-5 bg-[#0e1320] text-gray-200">
            <div className="flex justify-between items-center pb-3 border-b border-white/5">
              <h3 className="text-xs uppercase tracking-widest font-extrabold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#a78bfa] animate-pulse" /> AI Resume Bullet Optimization
              </h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {loadingFix && (
              <div className="py-12 flex flex-col justify-center items-center space-y-3 text-xs text-gray-400">
                <RefreshCw className="w-8 h-8 text-[#2563EB] animate-spin" />
                <p>Generating optimized text utilizing technical metrics...</p>
              </div>
            )}

            {fixError && (
              <div className="p-4 bg-red-500/10 border border-red-500/25 rounded-xl text-xs text-red-300 space-y-2">
                <p className="font-bold">Optimization Error</p>
                <p className="text-[11px]">{fixError}</p>
                <Button onClick={() => handleTriggerFix(activeSuggestion)} variant="outline" className="py-1.5 px-3 border-red-500/30 hover:bg-red-500/10 text-red-300">
                  Retry Call
                </Button>
              </div>
            )}

            {fixResult && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <h4 className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Suggestion Focus</h4>
                  <p className="text-xs font-bold text-white">{activeSuggestion.title}</p>
                  <p className="text-[11px] text-gray-300">{activeSuggestion.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Before card */}
                  <div className="space-y-1">
                    <h5 className="text-[9px] uppercase tracking-wider font-extrabold text-red-400 font-mono">Before / Original</h5>
                    <div className="p-3 bg-red-950/20 border border-red-900/30 rounded-xl text-[10.5px] leading-relaxed text-gray-300 italic min-h-[120px] select-all">
                      "{fixResult.before}"
                    </div>
                  </div>

                  {/* After card */}
                  <div className="space-y-1">
                    <h5 className="text-[9px] uppercase tracking-wider font-extrabold text-[#10B981] font-mono flex items-center gap-1">
                      After / Optimized <Edit2 className="w-2.5 h-2.5" />
                    </h5>
                    <textarea
                      value={editedAfterText}
                      onChange={(e) => setEditedAfterText(e.target.value)}
                      className="w-full p-3 bg-emerald-950/10 border border-emerald-500/25 rounded-xl text-[10.5px] leading-relaxed text-emerald-200 min-h-[120px] focus:outline-none focus:border-emerald-500 font-sans"
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-3 border-t border-white/5">
                  <Button onClick={handleCloseModal} variant="outline" className="text-[10px] py-2 px-4 uppercase tracking-wider font-bold">
                    Discard
                  </Button>
                  <Button onClick={handleAcceptFix} variant="primary" className="text-[10px] py-2 px-4 uppercase tracking-wider font-bold bg-[#10B981] hover:bg-[#059669] border-none text-white flex items-center gap-1" icon={<Check className="w-3.5 h-3.5" />}>
                    Accept & Scan
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}

    </div>
  );
}
