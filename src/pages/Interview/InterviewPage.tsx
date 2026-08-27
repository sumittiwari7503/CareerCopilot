import React from "react";
import { Mic, Award, Send, Play, Sparkles, MessageSquare, ArrowRight } from "lucide-react";
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
}

export default function InterviewPage({
  interviewActive,
  setInterviewActive,
  interviewRole,
  setInterviewRole,
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
  resetInterviewState
}: InterviewPageProps) {
  const roleOptions = [
    { value: "Senior Frontend Engineer", label: "Senior Frontend Engineer" },
    { value: "SDE at Google L4/L5", label: "SDE at Google L4/L5" },
    { value: "System Designer Lead", label: "System Designer Lead" },
    { value: "Assoc. Product Manager", label: "Assoc. Product Manager" }
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
      {!interviewActive && (
        <Card className="p-8 text-center space-y-6 max-w-lg mx-auto">
          
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#2563EB] to-[#8b5cf6] flex items-center justify-center border border-white/10 relative">
            <div className="absolute inset-0 rounded-full bg-[#2563EB]/15 animate-ping"></div>
            <Mic className="w-7 h-7 text-white relative z-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xs uppercase font-extrabold text-white tracking-wider">Start Mock Interview Session</h3>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
              Configure your targeted interview specialization, then start the interactive feedback session.
            </p>
          </div>

          <div className="max-w-xs mx-auto">
            <Select 
              label="Target Job Specialization"
              value={interviewRole}
              onChange={(e) => setInterviewRole(e.target.value)}
              options={roleOptions}
            />
          </div>

          <Button
            onClick={() => setInterviewActive(true)}
            variant="secondary"
            className="w-full max-w-xs py-3"
            icon={<Play className="w-4 h-4 fill-white" />}
          >
            Initiate Session
          </Button>

        </Card>
      )}

      {/* 3. Active Dialogue Simulation */}
      {interviewActive && (
        <div className="space-y-6">
          
          {/* Connection Status Header */}
          <div className="bg-[#111827] p-4 rounded-xl border border-white/5 flex justify-between items-center">
            <div>
              <span className="text-[9px] tracking-wider uppercase font-extrabold text-[#9ca3af]">Session Role</span>
              <h4 className="text-xs font-bold text-white">{interviewRole} Screen</h4>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> PORTAL FEED ACTIVE
            </div>
          </div>

          {/* Question Panel */}
          <Card className="bg-gradient-to-b from-[#1e1b4b]/40 to-[#111827] border-[#312e81]/60 relative overflow-hidden space-y-2.5">
            <div className="absolute top-0 left-0 h-full w-1 bg-[#8b5cf6]"></div>
            <span className="text-[9px] text-[#c084fc] uppercase font-bold tracking-widest block">Interviewer Prompt</span>
            <p className="text-white text-xs font-semibold italic leading-relaxed">
              "{currentQuestion}"
            </p>
          </Card>

          {/* Simulated wave panel */}
          <div className="flex justify-center items-end gap-1 h-6 bg-black/10 p-1.5 rounded-xl">
            {waveformBars.map((bar, idx) => (
              <div 
                key={idx} 
                style={{ height: `${bar}px` }} 
                className={`w-1 rounded-full transition-all duration-150 ${idx % 2 === 0 ? "bg-[#8b5cf6]" : "bg-[#2563EB]"}`}
              ></div>
            ))}
          </div>

          {/* Live response evaluation badges */}
          {latestEvaluation && (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#111827] p-3 rounded-xl border border-white/5 text-center space-y-0.5">
                <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">Accuracy Rating</span>
                <span className="text-base font-mono font-bold text-[#10B981] block">{latestEvaluation.rating}%</span>
              </div>
              <div className="bg-[#111827] p-3 rounded-xl border border-white/5 text-center space-y-0.5">
                <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">Speech Pacing</span>
                <span className="text-base font-bold text-[#60a5fa] block truncate">{latestEvaluation.confidence}</span>
              </div>
            </div>
          )}

          {/* Response Text area */}
          <div className="space-y-3">
            <Textarea 
              label="Your response (STAR method: Situation, Task, Action, Result)"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Structure your answer, providing direct metric outcomes..."
              rows={4}
            />

            <div className="flex gap-4">
              <Button 
                onClick={submitInterviewAnswer}
                loading={isSubmittingAnswer}
                disabled={!userAnswer.trim()}
                variant="secondary"
                className="flex-1 py-3"
                icon={<Send className="w-3.5 h-3.5" />}
              >
                Submit Answer
              </Button>

              <Button 
                onClick={endInterviewSession}
                variant="outline"
                className="px-5 py-3 border-red-500/20 text-red-400 hover:bg-red-500/5 hover:border-red-500/40"
              >
                End Session
              </Button>
            </div>
          </div>

          {/* Dialogue History logs (Chat bubbles) */}
          {conversationHistory.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-white/5">
              <p className="text-[10px] text-gray-400 uppercase font-bold text-center tracking-wider flex items-center justify-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" /> Session Conversation History
              </p>
              
              <div className="space-y-4">
                {conversationHistory.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    {/* Interviewer bubble */}
                    <div className="flex items-start gap-3 max-w-[85%]">
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[9px] font-bold text-gray-400 shrink-0 border border-white/5">AI</div>
                      <div className="bg-white/5 p-3 rounded-r-xl rounded-bl-xl border border-white/5 text-xs text-gray-300">
                        {item.q}
                      </div>
                    </div>

                    {/* Candidate bubble */}
                    <div className="flex items-start gap-3 max-w-[85%] ml-auto justify-end">
                      <div className="bg-[#8b5cf6]/10 p-3 rounded-l-xl rounded-br-xl border border-[#8b5cf6]/20 text-xs text-white">
                        {item.a}
                      </div>
                      <div className="w-6 h-6 rounded-full bg-[#8b5cf6]/20 flex items-center justify-center text-[9px] font-bold text-white shrink-0 border border-[#8b5cf6]/20">ME</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Final compiled report summary */}
          {showSummary && interviewSummary && (
            <div className="bg-gradient-to-b from-[#111827] to-[#0b0f19] p-6 rounded-2xl border border-white/10 space-y-5 animate-fadeIn">
              
              <div className="text-center space-y-1.5">
                <Award className="w-8 h-8 text-[#10B981] mx-auto" />
                <h4 className="text-xs uppercase tracking-wider font-extrabold text-white">Session Feedback Compilation</h4>
                <p className="text-[10px] text-gray-400">Complete performance evaluation dashboard</p>
              </div>

              {/* Overall rating */}
              <Score 
                score={interviewSummary.overallScore}
                label={interviewSummary.readinessLevel}
                explanation="Your cumulative score evaluating structural precision and technical consistency."
              />

              {/* Strengths & Weaknesses (whitespace list dividers, clean) */}
              <div className="grid md:grid-cols-2 gap-6 pt-2">
                
                <div className="space-y-2.5">
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Candidate Strengths</p>
                  <div className="space-y-1.5 pl-1.5 border-l-2 border-[#10B981]">
                    {interviewSummary.strengths.map((str, idx) => (
                      <p key={idx} className="text-xs text-gray-300 leading-relaxed py-1 border-b border-white/2 last:border-b-0">
                        {str}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Growth Pathways</p>
                  <div className="space-y-1.5 pl-1.5 border-l-2 border-[#2563EB]">
                    {interviewSummary.improvements.map((imp, idx) => (
                      <p key={idx} className="text-xs text-gray-300 leading-relaxed py-1 border-b border-white/2 last:border-b-0">
                        {imp}
                      </p>
                    ))}
                  </div>
                </div>

              </div>

              <Button 
                onClick={resetInterviewState}
                variant="outline"
                className="w-full py-2.5 mt-2"
              >
                Exit Session Summary
              </Button>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
