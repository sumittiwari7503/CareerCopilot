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

import { CareerRoadmap, ResumeAnalysis, JobCard, InterviewSummary, ActionItem, ProjectRecommendation, DsaProblemLog, UserProject } from "./types";

// Subcomponents and Pages
import Sidebar, { TabId } from "./components/layout/Sidebar";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import RoadmapPage from "./pages/Roadmap/RoadmapPage";
import ResumePage from "./pages/Resume/ResumePage";
import InterviewPage from "./pages/Interview/InterviewPage";
import PipelinePage from "./pages/Pipeline/PipelinePage";
import DsaPage from "./pages/DSA/DsaPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import OnboardingPage from "./pages/Onboarding/OnboardingPage";
import CompanyPrepPage from "./pages/CompanyPrep/CompanyPrepPage";
import ProjectsPage from "./pages/Projects/ProjectsPage";
import AnalyticsPage from "./pages/Analytics/AnalyticsPage";
import ResourcesPage from "./pages/Resources/ResourcesPage";

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
  updateActionTasksAPI,
  fetchProjectRecommendationsAPI,
  generateProjectRecommendationsAPI,
  fetchCareerPlanAPI,
  generateCareerPlanAPI,
  updateRoadmapTasksAPI,
  fetchLatestResumeAPI,
  applyResumeFixAPI
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
  
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  
  // Hydrated Profile data
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [personalName, setPersonalName] = useState("");
  const [personalEmail, setPersonalEmail] = useState("");
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

  const [resumeText, setResumeText] = useState("");
  const [targetJd, setTargetJd] = useState("");
  const [isAnalyzingResume, setIsAnalyzingResume] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysis | null>(null);

  const [interviewActive, setInterviewActive] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState("Tell me about a time you optimized app performance. What were the metrics, and how did you measure success?");
  const [userAnswer, setUserAnswer] = useState("");
  const [interviewRole, setInterviewRole] = useState("Senior Frontend Engineer");
  const [interviewType, setInterviewType] = useState("Technical");
  const [interviewDifficulty, setInterviewDifficulty] = useState("Mid");
  const [conversationHistory, setConversationHistory] = useState<{ q: string; a: string; score?: number }[]>([]);
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
  const [latestEvaluation, setLatestEvaluation] = useState<{ rating: number; confidence: string; pacingScore?: number; explanation?: string } | null>(null);
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
  const [userProjects, setUserProjects] = useState<UserProject[]>([]);
  const [prepProgress, setPrepProgress] = useState<Record<string, boolean>>({});

  const [todayAction, setTodayAction] = useState<ActionItem | null>(null);
  const [projectRecommendations, setProjectRecommendations] = useState<ProjectRecommendation[]>([]);
  const [dsaProblems, setDsaProblems] = useState<DsaProblemLog[]>([]);
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

        try {
          if (profile.dsaProblems) {
            setDsaProblems(typeof profile.dsaProblems === "string" ? JSON.parse(profile.dsaProblems) : profile.dsaProblems);
          } else {
            setDsaProblems([]);
          }
        } catch (_) {
          setDsaProblems([]);
        }

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

        if (profile.careerProfile) {
          try {
            const parsed = typeof profile.careerProfile === "string" 
              ? JSON.parse(profile.careerProfile) 
              : profile.careerProfile;
            if (parsed.projects && Array.isArray(parsed.projects)) {
              setUserProjects(parsed.projects);
            }
            if (parsed.prepProgress && typeof parsed.prepProgress === "object") {
              setPrepProgress(parsed.prepProgress);
            }
          } catch (cpErr) {
            console.error("Error parsing careerProfile:", cpErr);
          }
        }

        setProfileLoaded(true);

        // Fetch Applications
        const dbJobs = await fetchApplicationsAPI(token);
        setJobs(dbJobs);

        // Fetch Latest Resume
        try {
          const resObj = await fetchLatestResumeAPI(token);
          if (resObj) {
            setResumeText(resObj.text);
            setAnalysisResult(resObj.analysis);
          } else {
            setResumeText("");
            setAnalysisResult(null);
          }
        } catch (resErr) {
          console.error("Error loading latest resume:", resErr);
        }

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

  // 2. Debounced Profile Persistence (Syncs all settings/onboarding targets)
  useEffect(() => {
    if (!user || !profileLoaded || !onboardingCompleted) return;

    const delayDebounce = setTimeout(async () => {
      try {
        const token = await getAccessToken();
        await updateProfileAPI({ 
          fullName: personalName, 
          targetRole, 
          targetLevel: userLevel,
          targetCompany,
          companyType,
          specialization,
          experienceLevel,
          targetTimeline: duration,
          timeAvailable,
          currentSkills
        }, token);
      } catch (err) {
        console.error("Error debouncing profile update:", err);
      }
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [
    personalName, 
    userLevel, 
    targetRole, 
    targetCompany, 
    companyType, 
    specialization, 
    experienceLevel, 
    duration, 
    timeAvailable,
    currentSkills
  ]);

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

  const handleSignOut = async () => {
    try {
      await signOut();
      // Reset all states
      setProfileLoaded(false);
      setPersonalName("");
      setPersonalEmail("");
      setUserLevel("L5");
      setEasySolved(0);
      setMediumSolved(0);
      setHardSolved(0);
      setStreakDays(0);
      setDailyScore(0);
      setTargetRole("Software Engineer");
      setTargetCompany("");
      setCompanyType("");
      setSpecialization("");
      setExperienceLevel("");
      setDuration(3);
      setTimeAvailable("2 hours");
      setOnboardingCompleted(false);
      setRoadmap(null);
      setCheckedTasks({});
      setResumeText("");
      setAnalysisResult(null);
      setTodayAction(null);
      setProjectRecommendations([]);
      setDsaProblems([]);
      setJobs([]);
    } catch (err) {
      console.error("Logout failed:", err);
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

      // Transition out of onboarding wizard immediately
      setOnboardingCompleted(true);
      setOnboardingLoading(false);

      // 2. Scan resume if provided
      if (data.resumeText) {
        setResumeText(data.resumeText);
        try {
          const analysis = await analyzeResumeAPI(data.resumeText, data.targetRole, "", token);
          setAnalysisResult(analysis);
        } catch (resumeErr) {
          console.error("Failed to analyze resume during onboarding:", resumeErr);
        }
      }

      // 3. Generate and save persistent career plan
      let newPlan: any = null;
      try {
        newPlan = await generateCareerPlanAPI(token);
      } catch (planErr) {
        console.warn("Generating procedural roadmap fallback:", planErr);
        newPlan = getProceduralRoadmap(data.targetRole, data.targetTimeline || 3, "Beginner");
      }
      if (newPlan) {
        setRoadmap(newPlan);
        setCheckedTasks(newPlan.checkedTasks || {});
      }

      // 4. Fetch initial today's action item
      try {
        const action = await fetchTodayActionAPI(token);
        setTodayAction(action);
      } catch (actionErr) {
        console.error("Failed to load first action item:", actionErr);
      }
    } catch (err: any) {
      console.error("Onboarding submission failed:", err);
      throw err;
    } finally {
      setOnboardingLoading(false);
    }
  };



  const generateRoadmap = async () => {
    setGeneratingRoadmap(true);
    try {
      const token = await getAccessToken();
      
      // Update target settings on the server first
      await updateProfileAPI({
        targetRole,
        targetTimeline: duration,
        experienceLevel: skillLevel === "Beginner" ? "Fresher" : "1-2 years"
      }, token);

      // Generate & persist plan
      const plan = await generateCareerPlanAPI(token);
      setRoadmap(plan);
      setCheckedTasks(plan.checkedTasks || {});
      
      // Update today action item
      try {
        const action = await fetchTodayActionAPI(token);
        setTodayAction(action);
      } catch (_) {}
    } catch (err) {
      console.error("Error generating persistent roadmap:", err);
      const fallbackPlan = getProceduralRoadmap(targetRole, duration, skillLevel);
      setRoadmap(fallbackPlan as any);
    } finally {
      setGeneratingRoadmap(false);
    }
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

  const handleToggleActionTask = async (taskIdx: number, completed: boolean) => {
    if (!todayAction) return;

    try {
      let tasksList: any[] = [];
      if (typeof todayAction.tasks === "string") {
        tasksList = JSON.parse(todayAction.tasks);
      } else if (Array.isArray(todayAction.tasks)) {
        tasksList = todayAction.tasks;
      }

      const updatedTasks = tasksList.map((t: any, idx: number) => {
        if (idx === taskIdx) {
          if (typeof t === "string") {
            return { text: t, completed };
          }
          return { ...t, completed };
        }
        if (typeof t === "string") {
          return { text: t, completed: false };
        }
        return t;
      });

      const updatedAction = {
        ...todayAction,
        tasks: JSON.stringify(updatedTasks)
      };
      setTodayAction(updatedAction);

      const token = await getAccessToken();
      await updateActionTasksAPI(todayAction.id, updatedTasks, token);

      const allDone = updatedTasks.every((t: any) => t.completed);
      if (allDone) {
        await handleCompleteAction(todayAction.id);
      }
    } catch (err) {
      console.error("Failed to toggle subtask check state:", err);
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
      const data = await analyzeResumeAPI(resumeText, targetRole, targetJd, token);
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

  const handleApplyResumeFix = async (suggestion: any) => {
    const token = await getAccessToken();
    return await applyResumeFixAPI(
      suggestion.title,
      suggestion.description,
      suggestion.evidenceDetail,
      resumeText,
      token
    );
  };

  const handleInitiateInterview = async () => {
    setConversationHistory([]);
    setLatestEvaluation(null);
    setShowSummary(false);
    setInterviewSummary(null);
    setSessionId(null);
    setIsSubmittingAnswer(true);
    setInterviewActive(true);

    try {
      const token = await getAccessToken();
      const data = await submitInterviewAnswerAPI(
        interviewRole,
        "",
        "",
        interviewType,
        interviewDifficulty,
        null,
        token
      );
      setSessionId(data.sessionId);
      setCurrentQuestion(data.nextQuestion);
    } catch (err) {
      console.error("Failed to initiate interview dynamically, falling back to static question:", err);
      setCurrentQuestion("Tell me about a time you optimized app performance. What were the metrics, and how did you measure success?");
    } finally {
      setIsSubmittingAnswer(false);
    }
  };

  const submitInterviewAnswer = async () => {
    const cleanAnswer = userAnswer.trim();
    if (!cleanAnswer) return;
    setIsSubmittingAnswer(true);
    let success = false;
    try {
      const token = await getAccessToken();
      const data = await submitInterviewAnswerAPI(
        interviewRole,
        currentQuestion,
        cleanAnswer,
        interviewType,
        interviewDifficulty,
        sessionId,
        token
      );
      
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
      const data = await endInterviewSessionAPI(
        interviewRole,
        interviewType,
        interviewDifficulty,
        sessionId,
        token
      );
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

  const handleUpdateJobCard = async (id: string, updatedFields: Partial<JobCard>) => {
    try {
      const token = await getAccessToken();
      const updated = await updateApplicationAPI(id, updatedFields as any, token);
      setJobs(prev => prev.map(job => job.id === id ? { ...job, ...updated } : job));
    } catch (err) {
      console.error("Failed to update application card in database:", err);
    }
  };

  // Centralized DSA Tracker log handlers
  const handleLogDsaProblem = async (logData: Omit<DsaProblemLog, "id" | "createdAt">) => {
    const newLog: DsaProblemLog = {
      ...logData,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString()
    };

    const updatedList = [newLog, ...dsaProblems];
    setDsaProblems(updatedList);

    // Compute updated counter columns
    const easyCount = updatedList.filter(p => p.difficulty === "Easy").length;
    const mediumCount = updatedList.filter(p => p.difficulty === "Medium").length;
    const hardCount = updatedList.filter(p => p.difficulty === "Hard").length;
    setEasySolved(easyCount);
    setMediumSolved(mediumCount);
    setHardSolved(hardCount);

    // Calculate score gain based on difficulty
    let scoreGain = 10; // Easy
    if (logData.difficulty === "Medium") scoreGain = 20;
    if (logData.difficulty === "Hard") scoreGain = 30;

    const nextScore = dailyScore + scoreGain;
    const nextStreak = streakDays === 0 ? 1 : streakDays + 1;
    setDailyScore(nextScore);
    setStreakDays(nextStreak);

    try {
      const token = await getAccessToken();
      // Update easy/medium/hard aggregate counters
      await updateDsaStatsAPI(easyCount, mediumCount, hardCount, token);
      // Update detailed problems log JSON, dailyScore, and streakDays in profile
      await updateProfileAPI({
        dsaProblems: JSON.stringify(updatedList),
        dailyScore: nextScore,
        streakDays: nextStreak
      }, token);
    } catch (err) {
      console.error("Failed to save DSA solved log in database:", err);
    }
  };

  const handleDeleteDsaProblem = async (id: string) => {
    const updatedList = dsaProblems.filter(p => p.id !== id);
    setDsaProblems(updatedList);

    // Compute updated counters
    const easyCount = updatedList.filter(p => p.difficulty === "Easy").length;
    const mediumCount = updatedList.filter(p => p.difficulty === "Medium").length;
    const hardCount = updatedList.filter(p => p.difficulty === "Hard").length;
    setEasySolved(easyCount);
    setMediumSolved(mediumCount);
    setHardSolved(hardCount);

    try {
      const token = await getAccessToken();
      await updateDsaStatsAPI(easyCount, mediumCount, hardCount, token);
      await updateProfileAPI({
        dsaProblems: JSON.stringify(updatedList)
      }, token);
    } catch (err) {
      console.error("Failed to delete DSA solved log in database:", err);
    }
  };

  // Portfolio User Projects handlers
  const handleAddUserProject = async (newProjData: Omit<UserProject, "id" | "createdAt">) => {
    const newProj: UserProject = {
      ...newProjData,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString()
    };
    const updated = [newProj, ...userProjects];
    setUserProjects(updated);
    try {
      const token = await getAccessToken();
      await updateProfileAPI({
        careerProfile: JSON.stringify({
          projects: updated,
          prepProgress
        })
      }, token);
    } catch (err) {
      console.error("Failed to add project:", err);
    }
  };

  const handleUpdateUserProject = async (id: string, updatedFields: Partial<UserProject>) => {
    const updated = userProjects.map(p => p.id === id ? { ...p, ...updatedFields } : p);
    setUserProjects(updated);
    try {
      const token = await getAccessToken();
      await updateProfileAPI({
        careerProfile: JSON.stringify({
          projects: updated,
          prepProgress
        })
      }, token);
    } catch (err) {
      console.error("Failed to update project:", err);
    }
  };

  const handleDeleteUserProject = async (id: string) => {
    const updated = userProjects.filter(p => p.id !== id);
    setUserProjects(updated);
    try {
      const token = await getAccessToken();
      await updateProfileAPI({
        careerProfile: JSON.stringify({
          projects: updated,
          prepProgress
        })
      }, token);
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  const handleTogglePrepItem = async (itemId: string) => {
    const next = { ...prepProgress, [itemId]: !prepProgress[itemId] };
    setPrepProgress(next);
    try {
      const token = await getAccessToken();
      await updateProfileAPI({
        careerProfile: JSON.stringify({
          projects: userProjects,
          prepProgress: next
        })
      }, token);
    } catch (err) {
      console.error("Failed to toggle prep item:", err);
    }
  };

  // Auth/Session views gates
  if (!profileLoaded) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center text-xs text-gray-400 font-mono">
        <span className="w-5 h-5 border-2 border-white/20 border-t-[#60a5fa] rounded-full animate-spin mr-2"></span>
        Synchronizing workspace profile...
      </div>
    );
  }

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
              onClick={() => handleSignOut()}
              className="flex items-center gap-1.5 px-3.5 py-1 text-xs text-gray-400 hover:text-white font-bold transition-colors"
            >
              <LogOut className="w-4 h-4" /> Exit Setup
            </button>
          </div>
        </header>

        {/* Tab view routing mappings */}
        {(activeTab === "overview" || (activeTab as string) === "home") && (
          <DashboardPage 
            personalName={personalName} 
            targetRole={targetRole} 
            streakDays={streakDays} 
            dailyScore={dailyScore} 
            expandedFaq={expandedFaq} 
            setExpandedFaq={setExpandedFaq} 
            onNavigate={(tab) => setActiveTab(tab as TabId)}
            todayAction={todayAction}
            onCompleteAction={handleCompleteAction}
            onToggleActionTask={handleToggleActionTask}
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
            projectRecommendations={projectRecommendations}
            checkedTasks={checkedTasks}
            roadmap={roadmap}
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

        {(activeTab === "dsa" || (activeTab as string) === "tracker") && (
          <DsaPage 
            dsaProblems={dsaProblems}
            onLogDsaProblem={handleLogDsaProblem}
            onDeleteDsaProblem={handleDeleteDsaProblem}
          />
        )}

        {activeTab === "company-product" && (
          <CompanyPrepPage 
            initialTrack="product"
            prepProgress={prepProgress}
            onTogglePrepItem={handleTogglePrepItem}
            onNavigate={(tab) => setActiveTab(tab as TabId)}
          />
        )}

        {activeTab === "company-service" && (
          <CompanyPrepPage 
            initialTrack="service"
            prepProgress={prepProgress}
            onTogglePrepItem={handleTogglePrepItem}
            onNavigate={(tab) => setActiveTab(tab as TabId)}
          />
        )}

        {activeTab === "projects" && (
          <ProjectsPage 
            userProjects={userProjects}
            onAddProject={handleAddUserProject}
            onUpdateProject={handleUpdateUserProject}
            onDeleteProject={handleDeleteUserProject}
            projectRecommendations={projectRecommendations}
            onGenerateRecommendations={handleGenerateProjects}
            generatingRecommendations={generatingProjects}
          />
        )}

        {(activeTab === "interview-technical" || 
          activeTab === "interview-hr" || 
          activeTab === "interview-behavioral" || 
          activeTab === "interview-mock" || 
          (activeTab as string) === "coach") && (
          <InterviewPage 
            initialSubTab={
              activeTab === "interview-technical" ? "technical" :
              activeTab === "interview-hr" ? "hr" :
              activeTab === "interview-behavioral" ? "behavioral" : "mock"
            }
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
            onInitiateInterview={handleInitiateInterview}
          />
        )}

        {activeTab === "resume" && (
          <ResumePage 
            resumeText={resumeText} 
            setResumeText={setResumeText} 
            targetJd={targetJd}
            setTargetJd={setTargetJd}
            handleCustomResumeAnalyze={handleCustomResumeAnalyze} 
            isAnalyzingResume={isAnalyzingResume} 
            analysisResult={analysisResult} 
            targetRole={targetRole}
            applyResumeFix={handleApplyResumeFix}
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
            onUpdateJobCard={handleUpdateJobCard}
          />
        )}

        {activeTab === "analytics" && (
          <AnalyticsPage 
            easySolved={easySolved}
            mediumSolved={mediumSolved}
            hardSolved={hardSolved}
            streakDays={streakDays}
            dailyScore={dailyScore}
            dsaProblems={dsaProblems}
            roadmap={roadmap}
            checkedTasks={checkedTasks}
            jobs={jobs}
            resumeScore={analysisResult ? analysisResult.atsScore : null}
            interviewScore={latestEvaluation ? latestEvaluation.rating : null}
            targetRole={targetRole}
            onNavigate={(tab) => setActiveTab(tab as TabId)}
          />
        )}

        {activeTab === "resources" && (
          <ResourcesPage />
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
            currentSkills={currentSkills}
            setCurrentSkills={setCurrentSkills}
          />
        )}

      </main>

      {/* Mobile view bottom navigation bar panel */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#111827] border-t border-white/5 p-3 flex justify-around items-center z-40 text-gray-400">
        <button onClick={() => setActiveTab("overview")} className={`flex flex-col items-center gap-1 ${activeTab === "overview" ? "text-[#60a5fa]" : ""}`}>
          <Compass className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-wider font-bold">Home</span>
        </button>
        <button onClick={() => setActiveTab("roadmap")} className={`flex flex-col items-center gap-1 ${activeTab === "roadmap" ? "text-[#60a5fa]" : ""}`}>
          <Map className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-wider font-bold">Plan</span>
        </button>
        <button onClick={() => setActiveTab("dsa")} className={`flex flex-col items-center gap-1 ${activeTab === "dsa" ? "text-[#60a5fa]" : ""}`}>
          <TrendingUp className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-wider font-bold">DSA</span>
        </button>
        <button onClick={() => setActiveTab("interview-mock")} className={`flex flex-col items-center gap-1 ${activeTab === "interview-mock" ? "text-[#60a5fa]" : ""}`}>
          <Mic className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-wider font-bold">Coach</span>
        </button>
        <button onClick={() => setActiveTab("resume")} className={`flex flex-col items-center gap-1 ${activeTab === "resume" ? "text-[#60a5fa]" : ""}`}>
          <FileText className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-wider font-bold">Resume</span>
        </button>
        <button onClick={() => setActiveTab("jobs")} className={`flex flex-col items-center gap-1 ${activeTab === "jobs" ? "text-[#60a5fa]" : ""}`}>
          <Briefcase className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-wider font-bold">Jobs</span>
        </button>
        <button onClick={() => setActiveTab("settings")} className={`flex flex-col items-center gap-1 ${activeTab === "settings" ? "text-[#60a5fa]" : ""}`}>
          <Settings className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-wider font-bold">Profile</span>
        </button>
      </nav>

    </div>
  );
}

function LoadingScreen({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center text-xs text-gray-400 font-mono">
      <span className="w-5 h-5 border-2 border-white/20 border-t-[#60a5fa] rounded-full animate-spin mr-2"></span>
      {message}
    </div>
  );
}

function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const { authStatus } = useAuth();
  if (authStatus === "INITIALIZING") {
    return <LoadingScreen message="Checking authentication session..." />;
  }
  return authStatus !== "UNAUTHENTICATED" ? <Navigate to="/dashboard" replace /> : <>{children}</>;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { authStatus } = useAuth();
  if (authStatus === "INITIALIZING") {
    return <LoadingScreen message="Securing connection to Aether platform..." />;
  }
  return authStatus === "UNAUTHENTICATED" ? <Navigate to="/login" replace /> : <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
      <Route path="/signup" element={<PublicOnlyRoute><SignUpPage /></PublicOnlyRoute>} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/auth/callback" element={<AuthCallbackPage />} />

      {/* Protected Main Panel Routes - Keyed by user.id for complete account data isolation */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <MainApp key={user?.id || "unauthenticated"} />
          </ProtectedRoute>
        } 
      />
      
      {/* Fallback to Dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
