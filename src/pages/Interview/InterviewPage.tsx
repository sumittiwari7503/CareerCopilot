import React from "react";
import { Mic, Award, Send, Play, Sparkles, MessageSquare, ArrowRight, RefreshCw, XCircle } from "lucide-react";
import { InterviewSummary } from "../../types";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Score from "../../components/ui/Score";
import Textarea from "../../components/ui/Textarea";
import Select from "../../components/ui/Select";

interface InterviewPageProps {
  interviewActive: boolean;
  setInterviewActive: (active: boolean) => void;
  interviewRole: string;
  setInterviewRole: (role: string) => void;
  interviewType: string;
  setInterviewType: (type: string) => void;
  interviewDifficulty: string;
  setInterviewDifficulty: (difficulty: string) => void;
  currentQuestion: string;
  userAnswer: string;
  setUserAnswer: (answer: string) => void;
  submitInterviewAnswer: () => void;
  isSubmittingAnswer: boolean;
  endInterviewSession: () => void;
  waveformBars: number[];
  latestEvaluation: { rating: number; confidence: string; pacingScore?: number; explanation?: string } | null;
  conversationHistory: { q: string; a: string; score?: number }[];
  showSummary: boolean;
  interviewSummary: InterviewSummary | null;
  resetInterviewState: () => void;
  onInitiateInterview: () => void;
}

export default function InterviewPage({
  interviewActive,
  setInterviewActive,
  interviewRole,
  setInterviewRole,
  interviewType,
  setInterviewType,
  interviewDifficulty,
  setInterviewDifficulty,
  currentQuestion,
  userAnswer,
  setUserAnswer,
  submitInterviewAnswer,
  isSubmittingAnswer,
  endInterviewSession,
  waveformBars,
  latestEvaluation,
  conversationHistory,
  showSummary,
  interviewSummary,
  resetInterviewState,
  onInitiateInterview
}: InterviewPageProps) {
  const roleOptions = [
    { value: "Senior Frontend Engineer", label: "Senior Frontend Engineer" },
    { value: "SDE at Google L4/L5", label: "SDE at Google L4/L5" },
    { value: "System Designer Lead", label: "System Designer Lead" },
    { value: "Assoc. Product Manager", label: "Assoc. Product Manager" }
  ];

  const typeOptions = [
    { value: "Technical", label: "Technical (Coding/System Design)" },
    { value: "Behavioral", label: "Behavioral (STAR/Culture)" },
    { value: "System Design", label: "System Design (Scalability/Architecture)" }
  ];

  const difficultyOptions = [
    { value: "Junior", label: "Junior Level" },
    { value: "Mid", label: "Mid Level" },
    { value: "Senior", label: "Senior Level" }
  ];

  return (
    <div className="space-y-8">
      
      {/* 1. Header Details */}
      <section className="space-y-1">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Mic className="w-5 h-5 text-[#8b5cf6]" /> AI Mock Interview Coach
        </h2>
        <p className="text-xs text-gray-400">
          Engage in dynamic, context-aware engineering screens to evaluate communication skills.
        </p>
      </section>

      {/* 2. Setup Panel (Before session starts) */}
      {!interviewActive && !showSummary && (
        <Card className="p-8 text-center space-y-6 max-w-lg mx-auto">
          
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#2563EB] to-[#8b5cf6] flex items-center justify-center border border-white/10 relative">
            <div className="absolute inset-0 rounded-full bg-[#2563EB]/15 animate-ping"></div>
            <Mic className="w-7 h-7 text-white relative z-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xs uppercase font-extrabold text-white tracking-wider">Start Mock Interview Session</h3>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
              Configure your interview specialization, type, and difficulty, then begin the interactive feedback loop.
            </p>
          </div>

          <div className="space-y-4 max-w-xs mx-auto text-left">
            <Select 
              label="Target Job Specialization"
              value={interviewRole}
              onChange={(e) => setInterviewRole(e.target.value)}
              options={roleOptions}
            />

            <Select 
              label="Interview Focus Type"
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value)}
              options={typeOptions}
            />

            <Select 
              label="Target Seniority Level"
              value={interviewDifficulty}
              onChange={(e) => setInterviewDifficulty(e.target.value)}
              options={difficultyOptions}
            />
          </div>

          <Button
            onClick={onInitiateInterview}
            loading={isSubmittingAnswer}
            variant="secondary"
            className="w-full max-w-xs py-3 font-bold bg-[#8b5cf6] hover:bg-[#7c3aed] text-white border-none shadow-lg shadow-[#8b5cf6]/20"
            icon={<Play className="w-4 h-4 fill-white" />}
          >
            Initiate Session
          </Button>

        </Card>
      )}

      {/* 3. Active Dialogue Simulation */}
      {interviewActive && !showSummary && (
        <div className="space-y-6 max-w-3xl mx-auto">
          
          {/* Connection Status Header */}
          <div className="bg-[#111827] p-4 rounded-xl border border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6] animate-pulse"></span>
              <span className="text-[10px] font-mono uppercase font-bold text-gray-400">
                Session Active • {interviewRole} ({interviewType})
              </span>
            </div>
            <Button 
              onClick={endInterviewSession}
              variant="outline" 
              className="text-[9px] uppercase tracking-wider py-1 px-3 border-red-500/35 hover:bg-red-500/10 text-red-400 font-bold"
              icon={<XCircle className="w-3.5 h-3.5" />}
            >
              End & Grade Session
            </Button>
          </div>

          {/* Dialogue Transcript Container */}
          <div className="space-y-6 max-h-[500px] overflow-y-auto p-4 bg-white/2 rounded-2xl border border-white/5 space-y-8">
            
            {/* Conversation list */}
            {conversationHistory.map((item, index) => (
              <div key={index} className="space-y-4">
                
                {/* 1. Interviewer Q (Left) */}
                <div className="flex items-start gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center text-[#a78bfa] shrink-0 font-bold text-xs">
                    AI
                  </div>
                  <div className="bg-[#1f2937] p-4 rounded-2xl rounded-tl-none border border-white/5 space-y-1">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#a78bfa] font-mono block">Interviewer</span>
                    <p className="text-xs text-gray-200 leading-relaxed">{item.q}</p>
                  </div>
                </div>

                {/* 2. Candidate A (Right) */}
                <div className="flex items-start gap-3 max-w-[85%] ml-auto flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center text-[#60a5fa] shrink-0 font-bold text-xs">
                    YOU
                  </div>
                  <div className="bg-[#2563EB]/10 p-4 rounded-2xl rounded-tr-none border border-[#2563EB]/20 space-y-2 text-right">
                    <div className="flex justify-between items-center gap-4 flex-row-reverse">
                      <span className="text-[9px] uppercase font-bold tracking-widest text-[#60a5fa] font-mono block">Candidate</span>
                      {item.score !== undefined && (
                        <Badge variant={item.score >= 80 ? "success" : item.score >= 60 ? "warning" : "error"}>
                          Rating: {item.score}/100
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-200 leading-relaxed text-left">{item.a}</p>
                  </div>
                </div>

              </div>
            ))}

            {/* Current/Active Question (Left) */}
            <div className="flex items-start gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center text-[#a78bfa] shrink-0 font-bold text-xs">
                AI
              </div>
              <div className="bg-[#1f2937] p-4 rounded-2xl rounded-tl-none border border-white/5 space-y-1">
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#a78bfa] font-mono block">Interviewer</span>
                <p className="text-xs text-gray-200 leading-relaxed">{currentQuestion}</p>
              </div>
            </div>

          </div>

          {/* User Input controls */}
          <Card className="p-4 space-y-4">
            <div className="space-y-1.5">
              <Textarea 
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your response to the interviewer's question..."
                rows={4}
                className="text-xs"
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-[10px] text-gray-500 font-mono">
                Explain your reasoning clearly. We check technical correctness and communication fluency.
              </div>
              
              <Button 
                onClick={submitInterviewAnswer}
                loading={isSubmittingAnswer}
                disabled={!userAnswer.trim()}
                variant="primary"
                className="text-xs font-bold py-2.5 px-6 flex items-center gap-2 bg-[#8b5cf6] hover:bg-[#7c3aed]"
                icon={<Send className="w-3.5 h-3.5" />}
              >
                Submit Answer
              </Button>
            </div>
          </Card>

        </div>
      )}

      {/* 4. Complete Session Grading Summary */}
      {showSummary && interviewSummary && (
        <Card className="p-8 max-w-xl mx-auto space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Evaluation Summary Result</h3>
            <p className="text-xs text-gray-400">Here is the feedback compiled by the mock manager coordinator.</p>
          </div>

          <Score 
            score={interviewSummary.overallScore}
            label={`Readiness: ${interviewSummary.readinessLevel}`}
            explanation="Calculated by averaging clarity ratings, communication pacing, and technical completeness values."
          />

          <div className="grid md:grid-cols-2 gap-4 border-t border-white/5 pt-6 text-xs">
            <div className="space-y-2">
              <span className="font-extrabold text-emerald-400 uppercase tracking-widest text-[9px] font-mono block">Top Strengths</span>
              <ul className="space-y-1.5 pl-1.5">
                {interviewSummary.strengths.map((str, idx) => (
                  <li key={idx} className="text-gray-300 flex items-start gap-1">
                    <span className="text-emerald-400 mt-0.5">•</span> {str}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <span className="font-extrabold text-yellow-400 uppercase tracking-widest text-[9px] font-mono block">Suggested Improvements</span>
              <ul className="space-y-1.5 pl-1.5">
                {interviewSummary.improvements.map((imp, idx) => (
                  <li key={idx} className="text-gray-300 flex items-start gap-1">
                    <span className="text-yellow-400 mt-0.5">•</span> {imp}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-white/5">
            <Button 
              onClick={resetInterviewState}
              variant="primary" 
              className="flex-1 py-3 text-xs font-bold bg-[#8b5cf6] hover:bg-[#7c3aed]"
              icon={<RefreshCw className="w-4 h-4" />}
            >
              Start New Screen Session
            </Button>
          </div>

        </Card>
      )}

    </div>
  );
}
