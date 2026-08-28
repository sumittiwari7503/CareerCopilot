export interface TaskItem {
  weekNumber: number;
  weekTitle: string;
  focus: string;
  tasks: string[];
}

export interface RoadmapMonth {
  id: string;
  monthTitle: string;
  monthDesc: string;
  status: "completed" | "active" | "locked";
  weeks: TaskItem[];
}

export interface CareerRoadmap {
  id: string;
  roadmapTitle: string;
  durationText: string;
  duration: number;
  completionRateText: string;
  months: RoadmapMonth[];
  checkedTasks?: Record<string, boolean>;
}

export interface ResumeSuggestion {
  type: string; // 'quantify' | 'alert' | 'keyword'
  title: string;
  description: string;
  actionText: string;
  evidenceClass: "Existing" | "Weak" | "Missing" | "Unsupported";
  evidenceDetail: string;
}

export interface ResumeAnalysis {
  atsScore: number;
  compatibilityText: string;
  missingKeywords: string[];
  suggestions: ResumeSuggestion[];
}

export interface InterviewEvaluation {
  rating: number;
  confidence: string;
  speechRateText: string;
  pacingScore: number;
}

export interface InterviewQuestionResponse {
  sessionId?: string;
  evaluation: InterviewEvaluation;
  nextQuestion: string;
  explanation: string;
}

export interface InterviewSummary {
  readinessLevel: string;
  overallScore: number;
  strengths: string[];
  improvements: string[];
}

export interface JobCard {
  id: string;
  title: string;
  company: string;
  logo: string;
  date: string;
  status: "Wishlist" | "Applied" | "Assessment" | "Interview" | "Offer";
  priorityFlag: boolean;
  location: string;
}

export interface DailyMission {
  id: string;
  description: string;
  metadata: string;
  completed: boolean;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "Completed";
  source: string;
  skillGap?: string;
  estimatedMinutes: number;
  impactText: string;
  tasks: string; // stringified JSON
  createdAt: string;
}

export interface ProjectRecommendation {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  resumeValue: string;
  deliverables: string[];
  interviewPrep: string[];
  sourceGap: string;
  status: string;
  createdAt: string;
}
