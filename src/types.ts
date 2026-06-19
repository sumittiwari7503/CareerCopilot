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
  roadmapTitle: string;
  durationText: string;
  completionRateText: string;
  months: RoadmapMonth[];
}

export interface ResumeSuggestion {
  type: string; // 'quantify' | 'alert' | 'keyword'
  title: string;
  description: string;
  actionText: string;
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
