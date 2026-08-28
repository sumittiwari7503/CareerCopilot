import React, { useState, useEffect } from "react";
import { 
  Compass, 
  Map, 
  FileText,
  UserCheck, 
  TrendingUp, 
  Briefcase, 
  Mic, 
  Settings,
  LogOut,
  AlertTriangle
} from "lucide-react";

import { CareerRoadmap, ResumeAnalysis, JobCard, DailyMission, InterviewSummary, ActionItem, ProjectRecommendation } from "./types";
import { INITIAL_MISSIONS } from "./constants";

// Subcomponents and Pages
import Sidebar from "./components/layout/Sidebar";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import RoadmapPage from "./pages/Roadmap/RoadmapPage";
import ResumePage from "./pages/Resume/ResumePage";
import InterviewPage from "./pages/Interview/InterviewPage";
import PipelinePage from "./pages/Pipeline/PipelinePage";
import DsaPage from "./pages/DSA/DsaPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import OnboardingPage from "./pages/Onboarding/OnboardingPage";

// Auth Provider
import { AuthProvider, useAuth } from "./context/AuthContext";

// Routing and new pages
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/Auth/ResetPasswordPage";
import AuthCallbackPage from "./pages/Auth/AuthCallbackPage";

// Services
import { 
  generateRoadmapAPI, 
  analyzeResumeAPI, 
  submitInterviewAnswerAPI, 
  endInterviewSessionAPI,
  fetchProfileAPI,
  updateProfileAPI,
  updateDsaStatsAPI,
  fetchApplicationsAPI,
  createApplicationAPI,
  updateApplicationAPI,
  deleteApplicationAPI,
  fetchTodayActionAPI,
  completeActionAPI,
  fetchProjectRecommendationsAPI,
  generateProjectRecommendationsAPI,
  fetchCareerPlanAPI,
  generateCareerPlanAPI,
  updateRoadmapTasksAPI
} from "./services/apiService";

// Fallbacks
import { 
  getProceduralRoadmap, 
  getProceduralResumeAnalysis, 
  getProceduralInterviewQuestionResponse, 
  getProceduralInterviewSummary 
} from "./utils/fallback";

function MainApp() {
  const { user, loading: authLoading, signOut, getAccessToken } = useAuth();
  
  const [activeTab, setActiveTab] = useState<"home" | "roadmap" | "resume" | "coach" | "jobs" | "tracker" | "settings">("home");
  
  // Hydrated Profile data
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [personalName, setPersonalName] = useState("Alex Rivera");
  const [personalEmail, setPersonalEmail] = useState("alex.rivera@aether.io");
  const [userLevel, setUserLevel] = useState("L5");
  const [easySolved, setEasySolved] = useState(0);
  const [mediumSolved, setMediumSolved] = useState(0);
  const [hardSolved, setHardSolved] = useState(0);
  const [streakDays, setStreakDays] = useState(0);
  const [dailyScore, setDailyScore] = useState(0);
  
  const [targetRole, setTargetRole] = useState("Software Engineer");
  const [duration, setDuration] = useState<number>(3);
  const [skillLevel, setSkillLevel] = useState<"Beginner" | "Intermediate">("Beginner");
  const [roadmap, setRoadmap] = useState<CareerRoadmap | null>(null);
  const [generatingRoadmap, setGeneratingRoadmap] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});

  // Onboarding parameters states (Phase 9)
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [targetCompany, setTargetCompany] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [timeAvailable, setTimeAvailable] = useState("2 hours");
  const [currentSkills, setCurrentSkills] = useState<string[]>([]);

  const [resumeText, setResumeText] = useState("Alex Rivera\nSenior Web Developer\nSkills: React, TypeScript, Node.js\nExperience: Built modular micro frontend states. Reduced response loops by 40%.");
  const [isAnalyzingResume, setIsAnalyzingResume] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysis | null>({
    atsScore: 85,
    compatibilityText: "Good compatibility",
    missingKeywords: ["Docker", "GraphQL", "Kubernetes", "CI/CD Pipelines"],
    suggestions: [
      {
        type: "quantify",
        title: "Quantify Achievements",
        description: 'In "Project X", instead of "improved performance", explain specifically "optimized query speeds by 40% using Redis caching".',
        actionText: "Apply Fix"
      },
      {
        type: "alert",
        title: "Formatting Alert",
        description: "Your multi-column layout may cause issues with some legacy ATS systems. Consider a single-column layout.",
        actionText: "Format PDF"
      }
    ]
  });

  const [interviewActive, setInterviewActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("Tell me about a time you optimized app performance. What were the metrics, and how did you measure success?");
  const [userAnswer, setUserAnswer] = useState("");
  const [interviewRole, setInterviewRole] = useState("Senior Frontend Engineer");
  const [interviewType, setInterviewType] = useState("Technical");
  const [interviewDifficulty, setInterviewDifficulty] = useState("Mid");
  const [conversationHistory, setConversationHistory] = useState<{ q: string; a: string; score?: number }[]>([]);
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
  const [latestEvaluation, setLatestEvaluation] = useState<{ rating: number; confidence: string; pacingScore?: number; explanation?: string } | null>({
    rating: 92,
    confidence: "Confident",
    pacingScore: 95,
    explanation: "Awesome start. Let's drill deeper."
  });
  const [isListening, setIsListening] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [interviewSummary, setInterviewSummary] = useState<InterviewSummary | null>(null);
  const [waveformBars, setWaveformBars] = useState<number[]>(new Array(12).fill(12));

  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const [jobs, setJobs] = useState<JobCard[]>([]);
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [newJob, setNewJob] = useState<{
    title: string;
    company: string;
    status: "Wishlist" | "Applied" | "Assessment" | "Interview" | "Offer";
    priorityFlag: boolean;
    location: string;
  }>({
    title: "",
    company: "",
    status: "Wishlist",
    priorityFlag: false,
    location: "Remote"
  });

  const [pipelineFilter, setPipelineFilter] = useState("All");
  const [missions, setMissions] = useState<DailyMission[]>(INITIAL_MISSIONS);

  const [todayAction, setTodayAction] = useState<ActionItem | null>(null);
  const [projectRecommendations, setProjectRecommendations] = useState<ProjectRecommendation[]>([]);
  const [loadingAction, setLoadingAction] = useState(false);
  const [generatingProjects, setGeneratingProjects] = useState(false);

  // 1. Initial Database Hydration (Profile & Applications)
  useEffect(() => {
    if (!user) return;
    
    const hydrateData = async () => {
      try {
        const token = await getAccessToken();
        
        // Fetch Profile
        const profile = await fetchProfileAPI(token);
        setPersonalName(profile.fullName);
        setPersonalEmail(user.email || "");
        setUserLevel(profile.targetLevel || "L5");
        setEasySolved(profile.easySolved);
        setMediumSolved(profile.mediumSolved);
        setHardSolved(profile.hardSolved);
        setStreakDays(profile.streakDays || 0);
        setDailyScore(profile.dailyScore || 0);

        // Hydrate onboarding specs (Phase 9)
        setTargetRole(profile.targetRole || "Software Engineer");
        setTargetCompany(profile.targetCompany || "");
        setCompanyType(profile.companyType || "");
        setSpecialization(profile.specialization || "");
        setExperienceLevel(profile.experienceLevel || "");
        setDuration(profile.targetTimeline || 3);
        setTimeAvailable(profile.timeAvailable || "2 hours");
        setOnboardingCompleted(profile.onboardingCompleted || false);
        try {
          setCurrentSkills(JSON.parse(profile.currentSkills || "[]"));
        } catch (_) {
          setCurrentSkills([]);
        }

        setProfileLoaded(true);

        // Fetch Applications
        const dbJobs = await fetchApplicationsAPI(token);
        setJobs(dbJobs);

        // Fetch Active Career Plan
        try {
          const plan = await fetchCareerPlanAPI(token);
          if (plan) {
            setRoadmap(plan);
            setCheckedTasks(plan.checkedTasks || {});
          }
        } catch (planErr) {
          console.error("Error loading persistent career plan:", planErr);
        }

        // Fetch Today Action Item
        try {
          const action = await fetchTodayActionAPI(token);
          setTodayAction(action);
        } catch (actionErr) {
          console.error("Error fetching today action:", actionErr);
        }

        // Fetch Project Recommendations
        try {
          const projects = await fetchProjectRecommendationsAPI(token);
          setProjectRecommendations(projects);
        } catch (projErr) {
          console.error("Error fetching project recommendations:", projErr);
        }
      } catch (err) {
        console.error("Error hydrating profile details from Postgres database:", err);
        setProfileLoaded(true); // fall back to resting inputs
      }
    };

    hydrateData();
  }, [user]);

  // 2. Debounced Profile Persistence (fullName, targetLevel, targetRole)
  useEffect(() => {
    if (!user || !profileLoaded) return;

    const delayDebounce = setTimeout(async () => {
      try {
        const token = await getAccessToken();
        await updateProfileAPI({ fullName: personalName, targetRole, targetLevel: userLevel }, token);
      } catch (err) {
        console.error("Error debouncing profile update:", err);
      }
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [personalName, userLevel, targetRole]);

  // Live waveform bouncing effect
  useEffect(() => {
    let interval: any;
    if (isListening || interviewActive) {
      interval = setInterval(() => {
        setWaveformBars(Array.from({ length: 12 }, () => Math.floor(Math.random() * 28) + 4));
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isListening, interviewActive]);

  const handleToggleRoadmapTask = async (taskKey: string) => {
    if (!roadmap) return;
    const newChecked = {
      ...checkedTasks,
      [taskKey]: !checkedTasks[taskKey]
    };

    // Optimistically update frontend state
    setCheckedTasks(newChecked);

    try {
      const token = await getAccessToken();
      await updateRoadmapTasksAPI(roadmap.id, newChecked, token);
    } catch (err) {
      console.error("Failed to persist checked tasks:", err);
      // Revert local state on error
      setCheckedTasks(checkedTasks);
    }
  };

  const [onboardingLoading, setOnboardingLoading] = useState(false);

  const handleOnboardingComplete = async (data: {
    targetRole: string;
    targetCompany: string;
    companyType: string;
    specialization: string;
    experienceLevel: string;
    currentSkills: string[];
    timeAvailable: string;
    targetTimeline: number;
    resumeText?: string;
  }) => {
    setOnboardingLoading(true);
    try {
      const token = await getAccessToken();
      
      // 1. Update Profile fields in DB
      const profile = await updateProfileAPI({
        targetRole: data.targetRole,
        targetCompany: data.targetCompany,
        companyType: data.companyType,
        specialization: data.specialization,
        experienceLevel: data.experienceLevel,
        targetTimeline: data.targetTimeline,
        timeAvailable: data.timeAvailable,
        currentSkills: JSON.stringify(data.currentSkills),
        onboardingCompleted: true
      }, token);

      // Set local states
      setTargetRole(profile.targetRole);
      setTargetCompany(profile.targetCompany);
      setCompanyType(profile.companyType);
      setSpecialization(profile.specialization);
      setExperienceLevel(profile.experienceLevel);
      setDuration(profile.targetTimeline);
      setTimeAvailable(profile.timeAvailable);
      setCurrentSkills(data.currentSkills);

      // 2. Scan resume if provided
      if (data.resumeText) {
        setResumeText(data.resumeText);
        try {
          const analysis = await analyzeResumeAPI(data.resumeText, data.targetRole, token);
          setAnalysisResult(analysis);
        } catch (resumeErr) {
          console.error("Failed to analyze resume during onboarding:", resumeErr);
        }
      }

      // 3. Generate and save persistent career plan
      const newPlan = await generateCareerPlanAPI(token);
      setRoadmap(newPlan);
      setCheckedTasks(newPlan.checkedTasks || {});

      // 4. Fetch initial today's action item
      try {
        const action = await fetchTodayActionAPI(token);
        setTodayAction(action);
      } catch (actionErr) {
        console.error("Failed to load first action item:", actionErr);
      }

      setOnboardingCompleted(true);
    } catch (err: any) {
      console.error("Onboarding submission failed:", err);
      throw err;
    } finally {
      setOnboardingLoading(false);
    }
  };

  useEffect(() => {
    if (onboardingCompleted) {
      generateRoadmap();
    }
  }, [onboardingCompleted]);

  const generateRoadmap = async () => {
    setGeneratingRoadmap(true);
    let success = false;
    try {
      const token = await getAccessToken();
      const data = await generateRoadmapAPI(targetRole, duration, skillLevel, token);
      setRoadmap(data);
      success = true;
    } catch (err) {
      console.error("API Error - falling back to client procedural generation:", err);
    }

    if (!success) {
      const data = getProceduralRoadmap(targetRole, duration, skillLevel);
      setRoadmap(data);
    }
    setGeneratingRoadmap(false);
  };

  const handleCompleteAction = async (actionId: string) => {
    try {
      const token = await getAccessToken();
      await completeActionAPI(actionId, token);
      
      const nextScore = dailyScore + 50;
      const nextStreak = streakDays === 0 ? 1 : streakDays + 1;
      setDailyScore(nextScore);
      setStreakDays(nextStreak);
      await updateProfileAPI({ dailyScore: nextScore, streakDays: nextStreak }, token);
      
      // Fetch a new today's action item immediately after completing
      const newAction = await fetchTodayActionAPI(token);
      setTodayAction(newAction);
    } catch (err) {
      console.error("Failed to complete action item:", err);
    }
  };

  const handleGenerateProjects = async () => {
    setGeneratingProjects(true);
    try {
      const token = await getAccessToken();
      const list = await generateProjectRecommendationsAPI(token);
      setProjectRecommendations(list);
    } catch (err) {
      console.error("Failed to generate project recommendations:", err);
    } finally {
      setGeneratingProjects(false);
    }
  };

  const handleCustomResumeAnalyze = async () => {
    setIsAnalyzingResume(true);
    let success = false;
    try {
      const token = await getAccessToken();
      const data = await analyzeResumeAPI(resumeText, targetRole, token);
      setAnalysisResult(data);
      success = true;
    } catch (err) {
      console.error("API Error - falling back to client procedural analysis:", err);
    }

    if (!success) {
      const data = getProceduralResumeAnalysis(resumeText, targetRole);
      setAnalysisResult(data);
    }
    setIsAnalyzingResume(false);
  };

  const submitInterviewAnswer = async () => {
    const cleanAnswer = userAnswer.trim();
    if (!cleanAnswer) return;
    setIsSubmittingAnswer(true);
    let success = false;
    try {
      const token = await getAccessToken();
      const data = await submitInterviewAnswerAPI(interviewRole, currentQuestion, cleanAnswer, interviewType, interviewDifficulty, token);
      
      setConversationHistory(prev => [
        ...prev,
        { q: currentQuestion, a: cleanAnswer, score: data.evaluation?.rating || 85 }
      ]);
      setLatestEvaluation({
        rating: data.evaluation?.rating || 85,
        confidence: data.evaluation?.confidence || "Confident",
        pacingScore: data.evaluation?.pacingScore || 90,
        explanation: data.explanation || "Interesting point regarding metric tracking."
      });
      setCurrentQuestion(data.nextQuestion);
      setUserAnswer("");
      success = true;
    } catch (err) {
      console.error("API Error - falling back to client procedural response:", err);
    }

    if (!success) {
      const data = getProceduralInterviewQuestionResponse(interviewRole, currentQuestion, cleanAnswer);
      setConversationHistory(prev => [
        ...prev,
        { q: currentQuestion, a: cleanAnswer, score: data.evaluation?.rating || 85 }
      ]);
      setLatestEvaluation({
        rating: data.evaluation?.rating || 85,
        confidence: data.evaluation?.confidence || "Confident",
        pacingScore: data.evaluation?.pacingScore || 90,
        explanation: data.explanation || "Interesting point regarding metric tracking."
      });
      setCurrentQuestion(data.nextQuestion);
      setUserAnswer("");
    }
    setIsSubmittingAnswer(false);
  };

  const endInterviewSession = async () => {
    setIsListening(false);
    let success = false;
    try {
      const token = await getAccessToken();
      const data = await endInterviewSessionAPI(interviewRole, interviewType, interviewDifficulty, token);
      setInterviewSummary(data);
      setShowSummary(true);
      
      const nextScore = dailyScore + 40;
      const nextStreak = streakDays === 0 ? 1 : streakDays + 1;
      setDailyScore(nextScore);
      setStreakDays(nextStreak);
      await updateProfileAPI({ dailyScore: nextScore, streakDays: nextStreak }, token);
      
      success = true;
    } catch (err) {
      console.error("API Error - falling back to client procedural interview summary:", err);
    }

    if (!success) {
      const data = getProceduralInterviewSummary(interviewRole);
      setInterviewSummary(data);
      setShowSummary(true);
    }
  };

  const resetInterviewState = () => {
    setInterviewActive(false);
    setConversationHistory([]);
    setCurrentQuestion("Tell me about a time you optimized app performance. What were the metrics, and how did you measure success?");
    setShowSummary(false);
    setInterviewSummary(null);
  };

  // Job cards operations
  const handleAddJobCard = async () => {
    const titleVal = newJob.title.trim();
    const compVal = newJob.company.trim();
    if (!titleVal || !compVal) return;

    try {
      const token = await getAccessToken();
      const created = await createApplicationAPI({
        title: titleVal,
        company: compVal,
        status: newJob.status,
        priorityFlag: newJob.priorityFlag,
        location: newJob.location
      }, token);

      setJobs(prev => [created, ...prev]);
      setNewJob({ title: "", company: "", status: "Wishlist", priorityFlag: false, location: "Remote" });
      setShowAddJobModal(false);
    } catch (err) {
      console.error("Failed to save job to database:", err);
    }
  };

  const deleteJobCard = async (id: string) => {
    try {
      const token = await getAccessToken();
      await deleteApplicationAPI(id, token);
      setJobs(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error("Failed to delete job from database:", err);
    }
  };

  const handleUpdateJobStatus = async (id: string, nextStatus: "Wishlist" | "Applied" | "Assessment" | "Interview" | "Offer") => {
    try {
      const token = await getAccessToken();
      await updateApplicationAPI(id, { status: nextStatus }, token);
      setJobs(prev => prev.map(job => job.id === id ? { ...job, status: nextStatus } : job));
    } catch (err) {
      console.error("Failed to update application status in database:", err);
    }
  };

  // Centralized DSA counters update handlers
  const handleUpdateDsaCount = async (difficulty: "easy" | "medium" | "hard", newCount: number) => {
    const e = difficulty === "easy" ? newCount : easySolved;
    const m = difficulty === "medium" ? newCount : mediumSolved;
    const h = difficulty === "hard" ? newCount : hardSolved;

    let scoreGain = 0;
    if (difficulty === "easy" && newCount > easySolved) {
      scoreGain = (newCount - easySolved) * 10;
      setEasySolved(newCount);
    } else if (difficulty === "medium" && newCount > mediumSolved) {
      scoreGain = (newCount - mediumSolved) * 20;
      setMediumSolved(newCount);
    } else if (difficulty === "hard" && newCount > hardSolved) {
      scoreGain = (newCount - hardSolved) * 30;
      setHardSolved(newCount);
    } else {
      // If count was decreased or not changed, just update local state
      if (difficulty === "easy") setEasySolved(newCount);
      if (difficulty === "medium") setMediumSolved(newCount);
      if (difficulty === "hard") setHardSolved(newCount);
    }

    try {
      const token = await getAccessToken();
      await updateDsaStatsAPI(e, m, h, token);

      if (scoreGain > 0) {
        const nextScore = dailyScore + scoreGain;
        const nextStreak = streakDays === 0 ? 1 : streakDays + 1;
        setDailyScore(nextScore);
        setStreakDays(nextStreak);
        await updateProfileAPI({ dailyScore: nextScore, streakDays: nextStreak }, token);
      }
    } catch (err) {
      console.error(`Failed to sync ${difficulty} DSA count to database:`, err);
    }
  };

  const toggleMission = (id: string) => {
    setMissions(prev => 
      prev.map(m => m.id === id ? { ...m, completed: !m.completed } : m)
    );
  };

  // Auth/Session views gates
  if (!onboardingCompleted) {
    return <OnboardingPage onComplete={handleOnboardingComplete} loading={onboardingLoading} />;
  }

  return (
    <div className="flex min-h-screen bg-[#0b0f19] text-gray-200">
      
      {/* Desktop Navigation Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userName={personalName} 
        userLevel={userLevel} 
        avatar={user.user_metadata?.avatar_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuBg8bfg2rEfTRME6dzaMDMzwplwTyDYxg4I2Yl2T37nIAzA07DybYYGPiUcNCo7Vq06GZu4p3fJ8AAMnnRZQjfwYyQ3MaAOTEdeKalB1RuhSBuWwIFDaWkiw3ifLbtuu8CGI9xnBXiREAdX-qn12noo1s9oQ60R5wyr4bqalVRLvwkm9nKX8y1EphMLHlGRaYWzs7NfrLtNAgPYPI5WXHo_xtU4TvP9sPk55Tw7sgMq4PCONSa1HyzW1sTUYECt5BoNnJeVg7QkNMCh"} 
      />

      {/* Main Core Window Page Shell */}
      <main className="flex-1 p-6 lg:p-10 pb-24 lg:pb-10 max-w-4xl mx-auto overflow-y-auto">
        
        {/* Desktop header metrics bar */}
        <header className="hidden lg:flex justify-between items-center mb-8 border-b border-white/5 pb-4">
          <div>
            <h1 className="text-lg font-bold text-white font-sans uppercase tracking-widest">{activeTab}</h1>
            <span className="text-[10px] text-gray-400 font-mono">Sync State Status: PostgreSQL Persistent SSL enabled</span>
          </div>
          <div className="flex gap-4">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-3 py-1 rounded-xl text-[10px] font-mono font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> ONLINE SECURED SESSION
            </span>
            <button 
              onClick={() => signOut()}
              className="flex items-center gap-1.5 px-3.5 py-1 text-xs text-gray-400 hover:text-white font-bold transition-colors"
            >
              <LogOut className="w-4 h-4" /> Exit Setup
            </button>
          </div>
        </header>

        {/* Tab view routing mappings */}
        {activeTab === "home" && (
          <DashboardPage 
            personalName={personalName} 
            targetRole={targetRole} 
            streakDays={streakDays} 
            dailyScore={dailyScore} 
            expandedFaq={expandedFaq} 
            setExpandedFaq={setExpandedFaq} 
            onNavigate={(tab) => setActiveTab(tab)}
            todayAction={todayAction}
            onCompleteAction={handleCompleteAction}
            targetCompany={targetCompany}
            companyType={companyType}
            specialization={specialization}
            targetTimeline={duration}
            timeAvailable={timeAvailable}
            easySolved={easySolved}
            mediumSolved={mediumSolved}
            hardSolved={hardSolved}
            resumeScore={analysisResult ? analysisResult.atsScore : null}
            interviewScore={latestEvaluation ? latestEvaluation.rating : null}
            roadmapProgress={roadmap ? "Active Plan" : "No active plan"}
            jobs={jobs}
            currentSkills={currentSkills}
          />
        )}

        {activeTab === "roadmap" && (
          <RoadmapPage 
            targetRole={targetRole} 
            setTargetRole={setTargetRole} 
            duration={duration} 
            setDuration={setDuration} 
            skillLevel={skillLevel} 
            setSkillLevel={setSkillLevel} 
            generateRoadmap={generateRoadmap} 
            generatingRoadmap={generatingRoadmap} 
            roadmap={roadmap} 
            checkedTasks={checkedTasks} 
            onToggleTask={handleToggleRoadmapTask} 
            projectRecommendations={projectRecommendations}
            onGenerateProjects={handleGenerateProjects}
            generatingProjects={generatingProjects}
          />
        )}

        {activeTab === "resume" && (
          <ResumePage 
            resumeText={resumeText} 
            setResumeText={setResumeText} 
            handleCustomResumeAnalyze={handleCustomResumeAnalyze} 
            isAnalyzingResume={isAnalyzingResume} 
            analysisResult={analysisResult} 
            targetRole={targetRole}
          />
        )}

        {activeTab === "coach" && (
          <InterviewPage 
            interviewActive={interviewActive} 
            setInterviewActive={setInterviewActive} 
            interviewRole={interviewRole} 
            setInterviewRole={setInterviewRole} 
            interviewType={interviewType}
            setInterviewType={setInterviewType}
            interviewDifficulty={interviewDifficulty}
            setInterviewDifficulty={setInterviewDifficulty}
            currentQuestion={currentQuestion} 
            userAnswer={userAnswer} 
            setUserAnswer={setUserAnswer} 
            submitInterviewAnswer={submitInterviewAnswer} 
            isSubmittingAnswer={isSubmittingAnswer} 
            endInterviewSession={endInterviewSession} 
            waveformBars={waveformBars} 
            latestEvaluation={latestEvaluation} 
            conversationHistory={conversationHistory} 
            showSummary={showSummary} 
            interviewSummary={interviewSummary} 
            resetInterviewState={resetInterviewState} 
          />
        )}

        {activeTab === "jobs" && (
          <PipelinePage 
            jobs={jobs} 
            pipelineFilter={pipelineFilter} 
            setPipelineFilter={setPipelineFilter} 
            showAddJobModal={showAddJobModal} 
            setShowAddJobModal={setShowAddJobModal} 
            newJob={newJob} 
            setNewJob={setNewJob} 
            handleAddJobCard={handleAddJobCard} 
            deleteJobCard={deleteJobCard} 
            onUpdateJobStatus={handleUpdateJobStatus}
          />
        )}

        {activeTab === "tracker" && (
          <DsaPage 
            easySolved={easySolved} 
            setEasySolved={(prev) => {
              const nextVal = typeof prev === "function" ? prev(easySolved) : prev;
              handleUpdateDsaCount("easy", nextVal);
            }} 
            mediumSolved={mediumSolved} 
            setMediumSolved={(prev) => {
              const nextVal = typeof prev === "function" ? prev(mediumSolved) : prev;
              handleUpdateDsaCount("medium", nextVal);
            }} 
            hardSolved={hardSolved} 
            setHardSolved={(prev) => {
              const nextVal = typeof prev === "function" ? prev(hardSolved) : prev;
              handleUpdateDsaCount("hard", nextVal);
            }} 
          />
        )}

        {activeTab === "settings" && (
          <ProfilePage 
            personalName={personalName} 
            setPersonalName={setPersonalName} 
            personalEmail={personalEmail} 
            setPersonalEmail={setPersonalEmail} 
            userLevel={userLevel} 
            setUserLevel={setUserLevel}
            targetRole={targetRole}
            setTargetRole={setTargetRole}
            targetCompany={targetCompany}
            setTargetCompany={setTargetCompany}
            companyType={companyType}
            setCompanyType={setCompanyType}
            specialization={specialization}
            setSpecialization={setSpecialization}
            experienceLevel={experienceLevel}
            setExperienceLevel={setExperienceLevel}
            duration={duration}
            setDuration={setDuration}
            timeAvailable={timeAvailable}
            setTimeAvailable={setTimeAvailable}
          />
        )}

      </main>

      {/* Mobile view bottom navigation bar panel */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#111827] border-t border-white/5 p-3 flex justify-around items-center z-40 text-gray-400">
        <button onClick={() => setActiveTab("home")} className={`flex flex-col items-center gap-1 ${activeTab === "home" ? "text-[#60a5fa]" : ""}`}>
          <Compass className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-wider font-bold">Home</span>
        </button>
        <button onClick={() => setActiveTab("roadmap")} className={`flex flex-col items-center gap-1 ${activeTab === "roadmap" ? "text-[#60a5fa]" : ""}`}>
          <Map className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-wider font-bold">Planning</span>
        </button>
        <button onClick={() => setActiveTab("resume")} className={`flex flex-col items-center gap-1 ${activeTab === "resume" ? "text-[#60a5fa]" : ""}`}>
          <FileText className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-wider font-bold">Resume</span>
        </button>
        <button onClick={() => setActiveTab("coach")} className={`flex flex-col items-center gap-1 ${activeTab === "coach" ? "text-[#60a5fa]" : ""}`}>
          <Mic className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-wider font-bold">AI Coach</span>
        </button>
        <button onClick={() => setActiveTab("jobs")} className={`flex flex-col items-center gap-1 ${activeTab === "jobs" ? "text-[#60a5fa]" : ""}`}>
          <Briefcase className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-wider font-bold">Pipeline</span>
        </button>
        <button onClick={() => setActiveTab("tracker")} className={`flex flex-col items-center gap-1 ${activeTab === "tracker" ? "text-[#60a5fa]" : ""}`}>
          <TrendingUp className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-wider font-bold">DSA</span>
        </button>
        <button onClick={() => setActiveTab("settings")} className={`flex flex-col items-center gap-1 ${activeTab === "settings" ? "text-[#60a5fa]" : ""}`}>
          <Settings className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-wider font-bold">Settings</span>
        </button>
      </nav>

    </div>
  );
}

function LoginGate() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center text-xs text-gray-400 font-mono">
        <span className="w-5 h-5 border-2 border-white/20 border-t-[#60a5fa] rounded-full animate-spin mr-2"></span>
        Securing connection to Aether platform...
      </div>
    );
  }
  return user ? <Navigate to="/dashboard" replace /> : <LoginPage />;
}

function SignUpGate() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center text-xs text-gray-400 font-mono">
        <span className="w-5 h-5 border-2 border-white/20 border-t-[#60a5fa] rounded-full animate-spin mr-2"></span>
        Securing connection to Aether platform...
      </div>
    );
  }
  return user ? <Navigate to="/dashboard" replace /> : <SignUpPage />;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center text-xs text-gray-400 font-mono">
        <span className="w-5 h-5 border-2 border-white/20 border-t-[#60a5fa] rounded-full animate-spin mr-2"></span>
        Securing connection to Aether platform...
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<LoginGate />} />
          <Route path="/signup" element={<SignUpGate />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />

          {/* Protected Main Panel Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><MainApp /></ProtectedRoute>} />
          
          {/* Fallback to Dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
