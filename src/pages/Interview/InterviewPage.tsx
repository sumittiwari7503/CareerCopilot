import React, { useState, useEffect } from "react";
import { 
  Mic, 
  Award, 
  Send, 
  Play, 
  Sparkles, 
  RefreshCw, 
  XCircle, 
  CheckCircle2, 
  BookOpen, 
  HelpCircle, 
  Layers, 
  Search, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  UserCheck, 
  Target, 
  BrainCircuit,
  MessageSquare
} from "lucide-react";
import { InterviewSummary, InterviewTopicGuide } from "../../types";
import { INTERVIEW_TOPIC_GUIDES } from "../../constants";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Score from "../../components/ui/Score";
import Textarea from "../../components/ui/Textarea";
import Select from "../../components/ui/Select";

export type InterviewSubTab = "technical" | "hr" | "behavioral" | "mock";

interface InterviewPageProps {
  initialSubTab?: InterviewSubTab;
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

// Additional verified HR questions
const HR_QUESTIONS_BANK = [
  {
    q: "Tell me about yourself and walk me through your resume.",
    strategy: "Use the Present-Past-Future formula. Keep it under 90-120 seconds. Highlight technical passions and quantifiable project impact.",
    modelAnswer: "I am a software engineer focused on building performant, scalable distributed systems. Currently, I specialize in full-stack architecture with React, TypeScript, Node.js, and PostgreSQL. In my recent work, I architected a high-throughput job queue that cut processing latency by 45%. Earlier in my journey, I developed a strong foundation in data structures, algorithms, and core system design. Looking ahead, I am looking for a team where I can solve high-concurrency challenges and make an impact on mission-critical products like yours.",
    pitfalls: "Do not recite your entire life chronology or school grades. Focus on technical value.",
    keyPoints: ["Present technical stack", "Past quantifiable milestone", "Future alignment with role"]
  },
  {
    q: "Why do you want to work at our company specifically?",
    strategy: "Demonstrate genuine homework. Mention a real technical challenge, open-source library, engineering blog post, or product feature the company built.",
    modelAnswer: "I've been following your engineering blog, particularly how your team migrated to event-driven architectures to handle 10x traffic spikes. The balance between extreme reliability and rapid product experimentation here is inspiring. My experience optimizing database queries and implementing caching strategies directly aligns with the problems your core infrastructure team is solving.",
    pitfalls: "Avoid saying 'because it's a big brand' or 'good salary/perks'. Speak to the engineering culture.",
    keyPoints: ["Specific engineering achievement", "Direct skills overlap", "Enthusiasm for company mission"]
  },
  {
    q: "What are your greatest strengths and greatest areas for improvement?",
    strategy: "For strength: back it with a concrete project story. For weakness: pick a real technical area and explain your proactive improvement steps.",
    modelAnswer: "Strength: My persistence in root-cause debugging under pressure. When an intermittent memory leak caused production crashes, I isolated the issue using heap dump analysis and fixed the unclosed stream. Improvement: In the past, I sometimes hesitated to delegate or ask for assistance when diving into legacy codebases, trying to solve everything myself. I've actively improved by establishing a 45-minute self-debugging threshold before seeking team input or pairing.",
    pitfalls: "Never say 'I am a perfectionist' or 'I work too hard'. Give an authentic weakness with active remediation.",
    keyPoints: ["Evidence-backed strength", "Authentic weakness", "Active steps taken to improve"]
  },
  {
    q: "Where do you see yourself in 3 to 5 years?",
    strategy: "Emphasize technical depth, mentorship, and architectural ownership without sounding overambitious or rigid.",
    modelAnswer: "In the next 3 to 5 years, I see myself growing into a Senior / Staff Engineer who owns end-to-end technical architecture for core domain services. I also want to mentor incoming engineers, contribute to engineering standards and design docs, and deepen my expertise in large-scale distributed systems.",
    pitfalls: "Don't say 'I want to start my own startup in 1 year' or 'I want your job'.",
    keyPoints: ["Technical mastery", "System ownership", "Mentorship and team growth"]
  },
  {
    q: "How do you handle disagreements with peers or engineering leadership?",
    strategy: "Highlight data-driven discussion, active listening, and the principle of 'Disagree and Commit'.",
    modelAnswer: "I separate technical debates from personal egos. I listen carefully to understand the other engineer's constraints and priorities. If we disagree on an architectural approach, I build a small proof-of-concept or benchmark to let data guide the decision. Once the team or lead makes a final decision, I fully commit to executing it regardless of whose idea was originally chosen.",
    pitfalls: "Never complain about former colleagues or managers.",
    keyPoints: ["Data over opinions", "Empathy & active listening", "Disagree and commit"]
  }
];

// Additional verified Behavioral questions with STAR breakdown
const BEHAVIORAL_QUESTIONS_BANK = [
  {
    id: "star-1",
    competency: "Technical Problem Solving & Deep Dive",
    q: "Describe a time when you encountered a severe production bug or performance bottleneck. How did you diagnose and resolve it?",
    star: {
      situation: "During a flash traffic event, our payment processing service began dropping 12% of requests due to database connection pool exhaustion.",
      task: "As the on-call engineer, I had to prevent further transaction failures immediately and find the permanent fix within the 2-hour SLA window.",
      action: "First, I temporarily doubled the connection pool size and enabled aggressive read-replica routing to stabilize traffic. Then, I inspected APM traces and discovered an unindexed query inside a loop doing N+1 queries on user transaction history. I refactored the query to a single JOIN with a composite index on (user_id, status, created_at).",
      result: "Database CPU dropped from 94% to 22%, response times normalized from 3.8s to 45ms, and we processed the remaining $250k in orders with 0 dropped transactions."
    },
    keyTakeaway: "Show composure under pressure, mitigation before root-cause analysis, and permanent preventative measures."
  },
  {
    id: "star-2",
    competency: "Ownership & Initiative",
    q: "Tell me about a time you took initiative on a project outside your assigned responsibilities.",
    star: {
      situation: "Our engineering team's local development setup took over 4 hours for new hires to configure, often failing due to environment discrepancies.",
      task: "While not explicitly in my sprint tasks, I realized this was costing dozens of developer hours and causing frustration for new joiners.",
      action: "Over a weekend and during hack hours, I containerized the entire local microservice dependency stack using Docker Compose and automated database seeding with mock fixtures. I wrote a single setup script (make dev-setup) and created a comprehensive onboarding README.",
      result: "Onboarding time was cut from 4 hours to 15 minutes. The script was adopted company-wide across 35 engineers, reducing setup-related IT support tickets by 80%."
    },
    keyTakeaway: "Demonstrates proactive mindset, empathy for teammates, and multiplying team productivity."
  },
  {
    id: "star-3",
    competency: "Handling Ambiguity & Delivery",
    q: "Tell me about a time you had to deliver a feature with incomplete or shifting requirements.",
    star: {
      situation: "We needed to launch an integration with a third-party partner whose API documentation was incomplete and constantly changing 3 weeks before launch.",
      task: "I needed to design our integration layer so our frontend and core logic wouldn't break every time the third-party schema shifted.",
      action: "I designed an Anti-Corruption Layer (Adapter pattern) between our internal domain models and the external API. I wrote contract tests with mocked payloads and met weekly with the partner's engineering team to clarify edge cases. When their API changed 4 days before launch, only our adapter needed a 20-line update.",
      result: "We launched on schedule with zero breaking bugs in our core domain. The partner team praised our integration resilience."
    },
    keyTakeaway: "Illustrates defensive system architecture, modular design patterns, and effective stakeholder communication."
  }
];

export default function InterviewPage({
  initialSubTab = "mock",
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
  const [activeSubTab, setActiveSubTab] = useState<InterviewSubTab>(initialSubTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechTopic, setSelectedTechTopic] = useState("All");
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({
    "q-tech-0": true,
    "q-hr-0": true,
    "star-1": true
  });

  useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  const toggleQuestion = (id: string) => {
    setExpandedQuestions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const roleOptions = [
    { value: "Software Development Engineer (SDE I/II)", label: "Software Development Engineer (SDE I/II)" },
    { value: "Senior Frontend Engineer", label: "Senior Frontend Engineer" },
    { value: "Backend Systems Engineer", label: "Backend Systems Engineer" },
    { value: "Full Stack Engineer", label: "Full Stack Engineer" },
    { value: "Engineering Lead / Architect", label: "Engineering Lead / Architect" }
  ];

  const typeOptions = [
    { value: "Technical", label: "Technical (Coding / Core CS / System Design)" },
    { value: "Behavioral", label: "Behavioral (STAR Method / Cultural Alignment)" },
    { value: "HR", label: "HR Screen (Motivation / Fit / Logistics)" }
  ];

  const difficultyOptions = [
    { value: "Junior", label: "Junior / Entry Level (0-2 YOE)" },
    { value: "Mid", label: "Mid Level (2-5 YOE)" },
    { value: "Senior", label: "Senior / Lead Level (5+ YOE)" }
  ];

  // Technical guides filtering
  const technicalGuides = INTERVIEW_TOPIC_GUIDES.filter(g => g.category === "Technical");
  const techTopicTitles = ["All", ...technicalGuides.map(g => g.title)];

  const filteredTechGuides = technicalGuides.filter(guide => {
    if (selectedTechTopic !== "All" && guide.title !== selectedTechTopic) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-1">
                <Mic className="w-3 h-3" /> Comprehensive Interview Suite
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Verified Questions
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Interview Preparation & AI Coaching</h1>
            <p className="text-xs text-gray-400 mt-1 max-w-xl">
              Master technical fundamentals, behavioral frameworks (STAR method), and practice interactive mock screens with real-time feedback.
            </p>
          </div>

          {/* Sub-Tab Navigation Bar */}
          <div className="flex flex-wrap items-center bg-[#0b0f19] p-1.5 rounded-xl border border-white/10 self-start md:self-auto gap-1">
            <button
              onClick={() => setActiveSubTab("technical")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === "technical"
                  ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/20"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Technical
            </button>
            <button
              onClick={() => setActiveSubTab("hr")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === "hr"
                  ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/20"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              HR Interview
            </button>
            <button
              onClick={() => setActiveSubTab("behavioral")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === "behavioral"
                  ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/20"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Behavioral (STAR)
            </button>
            <button
              onClick={() => setActiveSubTab("mock")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeSubTab === "mock"
                  ? "bg-[#8b5cf6] text-white shadow-md shadow-purple-500/20"
                  : "text-purple-400 hover:text-purple-300"
              }`}
            >
              <Mic className="w-3 h-3" />
              <span>AI Mock Coach</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: TECHNICAL INTERVIEW */}
      {/* ========================================================================= */}
      {activeSubTab === "technical" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 custom-scrollbar">
              {techTopicTitles.map(topic => (
                <button
                  key={topic}
                  onClick={() => setSelectedTechTopic(topic)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedTechTopic === topic
                      ? "bg-white/10 text-white border border-white/15"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>

            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
              Verified Information
            </span>
          </div>

          <div className="space-y-5">
            {filteredTechGuides.map(guide => (
              <div key={guide.id} className="bg-[#111827] border border-white/5 rounded-2xl p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">{guide.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">{guide.description}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-gray-400 border border-white/5">
                    {guide.questions.length} Questions
                  </span>
                </div>

                <div className="space-y-3 pt-2">
                  {guide.questions.map((qItem, idx) => {
                    const key = `${guide.id}-${idx}`;
                    const isExpanded = !!expandedQuestions[key];

                    return (
                      <div key={idx} className="bg-[#0b0f19] rounded-xl border border-white/5 overflow-hidden transition-all">
                        <button
                          onClick={() => toggleQuestion(key)}
                          className="w-full p-4 text-left flex items-start justify-between gap-3 hover:bg-white/2 transition-colors"
                        >
                          <div className="flex items-start gap-2.5">
                            <span className="text-xs font-mono font-bold text-[#60a5fa] mt-0.5">Q{idx + 1}:</span>
                            <span className="text-xs font-bold text-gray-200">{qItem.q}</span>
                          </div>
                          <span className="text-gray-500 mt-0.5">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </span>
                        </button>

                        {isExpanded && (
                          <div className="px-4 pb-4 pt-1 space-y-3 border-t border-white/5 bg-white/1">
                            <div className="text-xs text-gray-300 leading-relaxed bg-[#111827] p-3.5 rounded-xl border border-white/5 font-sans">
                              <span className="text-[10px] font-mono text-emerald-400 font-bold block mb-1">
                                MODEL TECHNICAL ANSWER:
                              </span>
                              {qItem.a}
                            </div>

                            {qItem.keyPoints && qItem.keyPoints.length > 0 && (
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-[10px] font-mono text-gray-400 mr-1">Must Mention:</span>
                                {qItem.keyPoints.map((point, pIdx) => (
                                  <span key={pIdx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#2563EB]/15 text-[#60a5fa] border border-[#2563EB]/25">
                                    {point}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: HR INTERVIEW */}
      {/* ========================================================================= */}
      {activeSubTab === "hr" && (
        <div className="space-y-6">
          <div className="bg-[#111827] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-white">Authentic HR & Culture Screen Questions</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Understand recruiter evaluation criteria, strategic positioning, and critical red flags to avoid.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Verified Information
              </span>
            </div>

            <div className="space-y-4">
              {HR_QUESTIONS_BANK.map((item, idx) => {
                const key = `hr-${idx}`;
                const isExpanded = !!expandedQuestions[key] || idx === 0;

                return (
                  <div key={idx} className="bg-[#0b0f19] border border-white/5 rounded-xl overflow-hidden transition-all">
                    <button
                      onClick={() => toggleQuestion(key)}
                      className="w-full p-4 text-left flex items-start justify-between gap-3 hover:bg-white/2 transition-colors"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="text-xs font-mono font-bold text-[#8b5cf6] mt-0.5">Q{idx + 1}:</span>
                        <span className="text-xs font-bold text-gray-100">{item.q}</span>
                      </div>
                      <span className="text-gray-500 mt-0.5">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </span>
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 pt-1 space-y-3 border-t border-white/5">
                        
                        {/* Strategy Note */}
                        <div className="bg-purple-500/5 border border-purple-500/15 p-3 rounded-xl text-xs text-purple-300">
                          <span className="font-mono font-bold text-[10px] block uppercase text-purple-400 mb-0.5">
                            Interview Strategy:
                          </span>
                          {item.strategy}
                        </div>

                        {/* Model Answer */}
                        <div className="bg-[#111827] p-3.5 rounded-xl border border-white/5 text-xs text-gray-300 leading-relaxed font-sans">
                          <span className="text-[10px] font-mono text-emerald-400 font-bold block mb-1">
                            RECOMMENDED RESPONSE STRUCTURE:
                          </span>
                          "{item.modelAnswer}"
                        </div>

                        {/* Pitfalls & Key points */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                          <div className="bg-red-500/5 border border-red-500/15 p-2.5 rounded-xl text-xs text-red-300">
                            <span className="font-mono font-bold text-[9px] block uppercase text-red-400 mb-0.5">
                              Pitfalls to Avoid:
                            </span>
                            {item.pitfalls}
                          </div>

                          <div className="bg-blue-500/5 border border-blue-500/15 p-2.5 rounded-xl text-xs text-blue-300">
                            <span className="font-mono font-bold text-[9px] block uppercase text-blue-400 mb-0.5">
                              Key Focal Points:
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.keyPoints.map((pt, pIdx) => (
                                <span key={pIdx} className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-mono">
                                  {pt}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: BEHAVIORAL (STAR METHOD) */}
      {/* ========================================================================= */}
      {activeSubTab === "behavioral" && (
        <div className="space-y-6">
          
          {/* STAR Framework Explanation Card */}
          <div className="bg-[#111827] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold">
                  Verified Framework
                </span>
                <h2 className="text-base font-bold text-white mt-1">The STAR Behavioral Method</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Tier-1 tech companies (Google, Amazon, Meta) evaluate behavioral competency using structured past-experience questions.
                </p>
              </div>
            </div>

            {/* STAR Breakdown Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              <div className="bg-[#0b0f19] border border-blue-500/20 rounded-xl p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-400">Situation</span>
                  <span className="text-[10px] font-mono text-gray-500">15% time</span>
                </div>
                <p className="text-xs text-gray-300">Set the scene. Explain the business context, system environment, and problem statement.</p>
              </div>

              <div className="bg-[#0b0f19] border border-indigo-500/20 rounded-xl p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-400">Task</span>
                  <span className="text-[10px] font-mono text-gray-500">15% time</span>
                </div>
                <p className="text-xs text-gray-300">Define your specific responsibility, goal, and the measurable constraint or deadline.</p>
              </div>

              <div className="bg-[#0b0f19] border border-emerald-500/20 rounded-xl p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">Action</span>
                  <span className="text-[10px] font-mono text-gray-500">50% time</span>
                </div>
                <p className="text-xs text-gray-300">Detail your concrete engineering decisions, trade-offs, and technical implementation steps.</p>
              </div>

              <div className="bg-[#0b0f19] border border-amber-500/20 rounded-xl p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400">Result</span>
                  <span className="text-[10px] font-mono text-gray-500">20% time</span>
                </div>
                <p className="text-xs text-gray-300">Quantify the business impact, metrics improvement (latency, revenue, CPU), and lessons learned.</p>
              </div>
            </div>
          </div>

          {/* Behavioral Questions with STAR Breakdown */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Real-World Leadership Competency Questions</span>
            </h3>

            {BEHAVIORAL_QUESTIONS_BANK.map((item, idx) => {
              const isExpanded = !!expandedQuestions[item.id] || idx === 0;

              return (
                <div key={item.id} className="bg-[#111827] border border-white/5 rounded-2xl overflow-hidden transition-all">
                  <button
                    onClick={() => toggleQuestion(item.id)}
                    className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-white/2 transition-colors"
                  >
                    <div className="space-y-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#8b5cf6]/15 text-[#a78bfa] border border-[#8b5cf6]/25 font-bold">
                        {item.competency}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1">{item.q}</h4>
                    </div>
                    <span className="text-gray-500 mt-2">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 space-y-4 border-t border-white/5 bg-[#0b0f19]/50">
                      
                      <div className="space-y-3 pt-2">
                        {/* S */}
                        <div className="bg-[#111827] p-3 rounded-xl border border-blue-500/20 text-xs">
                          <span className="font-mono text-blue-400 font-bold uppercase text-[10px] block mb-1">
                            S — SITUATION:
                          </span>
                          <p className="text-gray-300 leading-relaxed">{item.star.situation}</p>
                        </div>

                        {/* T */}
                        <div className="bg-[#111827] p-3 rounded-xl border border-indigo-500/20 text-xs">
                          <span className="font-mono text-indigo-400 font-bold uppercase text-[10px] block mb-1">
                            T — TASK:
                          </span>
                          <p className="text-gray-300 leading-relaxed">{item.star.task}</p>
                        </div>

                        {/* A */}
                        <div className="bg-[#111827] p-3.5 rounded-xl border border-emerald-500/20 text-xs">
                          <span className="font-mono text-emerald-400 font-bold uppercase text-[10px] block mb-1">
                            A — ACTION (Core Technical Weight):
                          </span>
                          <p className="text-gray-300 leading-relaxed">{item.star.action}</p>
                        </div>

                        {/* R */}
                        <div className="bg-[#111827] p-3 rounded-xl border border-amber-500/20 text-xs">
                          <span className="font-mono text-amber-400 font-bold uppercase text-[10px] block mb-1">
                            R — RESULT (Quantifiable Impact):
                          </span>
                          <p className="text-gray-300 leading-relaxed">{item.star.result}</p>
                        </div>
                      </div>

                      <div className="bg-[#0b0f19] p-3 rounded-xl border border-white/5 text-xs text-gray-400 font-mono">
                        <span className="text-[#60a5fa] font-bold">Key Evaluator Takeaway:</span> {item.keyTakeaway}
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 4: AI MOCK COACH (Interactive Simulation) */}
      {/* ========================================================================= */}
      {activeSubTab === "mock" && (
        <div className="space-y-6">
          
          {/* Setup Panel (Before session starts) */}
          {!interviewActive && !showSummary && (
            <Card className="p-8 text-center space-y-6 max-w-lg mx-auto bg-[#111827] border border-white/5">
              
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#2563EB] to-[#8b5cf6] flex items-center justify-center border border-white/10 relative">
                <div className="absolute inset-0 rounded-full bg-[#2563EB]/15 animate-ping pointer-events-none"></div>
                <Mic className="w-7 h-7 text-white relative z-10" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> AI-Generated Practice
                  </span>
                </div>
                <h3 className="text-base uppercase font-extrabold text-white tracking-wider">Start Interactive Mock Interview</h3>
                <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
                  Configure your interview parameters. The AI interviewer will ask context-aware questions, evaluate your responses, and grade your overall performance.
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

          {/* Active Dialogue Simulation */}
          {interviewActive && !showSummary && (
            <div className="space-y-6 max-w-3xl mx-auto">
              
              {/* Connection Status Header */}
              <div className="bg-[#111827] p-4 rounded-xl border border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6] animate-pulse"></span>
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-gray-300 block">
                      Session Active • {interviewRole}
                    </span>
                    <span className="text-[9px] font-mono text-gray-500">
                      Format: {interviewType} | Seniority: {interviewDifficulty}
                    </span>
                  </div>
                </div>

                {/* Live audio simulation waveform */}
                <div className="hidden sm:flex items-center gap-1 h-5 px-3 bg-[#0b0f19] rounded-lg border border-white/5">
                  {waveformBars.slice(0, 8).map((height, i) => (
                    <div 
                      key={i} 
                      className="w-1 bg-[#8b5cf6] rounded-full transition-all duration-150"
                      style={{ height: `${Math.max(4, height / 2)}px` }}
                    ></div>
                  ))}
                </div>

                <Button 
                  onClick={endInterviewSession}
                  variant="outline" 
                  className="text-[9px] uppercase tracking-wider py-1 px-3 border-red-500/35 hover:bg-red-500/10 text-red-400 font-bold"
                  icon={<XCircle className="w-3.5 h-3.5" />}
                >
                  End & Grade
                </Button>
              </div>

              {/* Dialogue Transcript Container */}
              <div className="space-y-6 max-h-[500px] overflow-y-auto p-4 bg-[#0b0f19] rounded-2xl border border-white/5 custom-scrollbar">
                
                {/* Conversation list */}
                {conversationHistory.map((item, index) => (
                  <div key={index} className="space-y-4">
                    
                    {/* Interviewer Q (Left) */}
                    <div className="flex items-start gap-3 max-w-[85%]">
                      <div className="w-8 h-8 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center text-[#a78bfa] shrink-0 font-bold text-xs">
                        AI
                      </div>
                      <div className="bg-[#1f2937] p-4 rounded-2xl rounded-tl-none border border-white/5 space-y-1">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#a78bfa] font-mono block">Interviewer</span>
                        <p className="text-xs text-gray-200 leading-relaxed">{item.q}</p>
                      </div>
                    </div>

                    {/* Candidate A (Right) */}
                    <div className="flex items-start gap-3 max-w-[85%] ml-auto flex-row-reverse">
                      <div className="w-8 h-8 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center text-[#60a5fa] shrink-0 font-bold text-xs">
                        YOU
                      </div>
                      <div className="bg-[#2563EB]/10 p-4 rounded-2xl rounded-tr-none border border-[#2563EB]/20 space-y-2 text-right">
                        <div className="flex justify-between items-center gap-4 flex-row-reverse">
                          <span className="text-[9px] uppercase font-bold tracking-widest text-[#60a5fa] font-mono block">Candidate</span>
                          {item.score !== undefined && (
                            <Badge variant={item.score >= 80 ? "success" : item.score >= 60 ? "warning" : "error"}>
                              Turn Score: {item.score}/100
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-200 leading-relaxed text-left">{item.a}</p>
                      </div>
                    </div>

                  </div>
                ))}

                {/* Current Active Question (Left) */}
                <div className="flex items-start gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center text-[#a78bfa] shrink-0 font-bold text-xs">
                    AI
                  </div>
                  <div className="bg-[#1f2937] p-4 rounded-2xl rounded-tl-none border border-white/5 space-y-1 shadow-lg shadow-purple-500/5">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#a78bfa] font-mono block">Interviewer (Current Question)</span>
                    <p className="text-xs text-white font-medium leading-relaxed">{currentQuestion}</p>
                  </div>
                </div>

              </div>

              {/* Latest Evaluation Callout */}
              {latestEvaluation && (
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-3 text-xs text-purple-300 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white">Last Turn Feedback:</span> {latestEvaluation.explanation}
                  </div>
                  <Badge variant="success">Rating: {latestEvaluation.rating}/100</Badge>
                </div>
              )}

              {/* User Input controls */}
              <Card className="p-4 space-y-4 bg-[#111827] border border-white/5">
                <div className="space-y-1.5">
                  <Textarea 
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your detailed response to the interviewer's question..."
                    rows={4}
                    className="text-xs bg-[#0b0f19]"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-[10px] text-gray-500 font-mono">
                    Explain technical reasoning, complexity, and concrete examples.
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

          {/* Complete Session Grading Summary */}
          {showSummary && interviewSummary && (
            <Card className="p-8 max-w-xl mx-auto space-y-6 bg-[#111827] border border-white/5">
              
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Evaluation Summary Result</h3>
                <p className="text-xs text-gray-400">Feedback compiled by the AI Mock Interview Coordinator.</p>
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
      )}

    </div>
  );
}
