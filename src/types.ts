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

export type JobStage =
  | "Saved"
  | "Applied"
  | "Online Assessment"
  | "Technical Interview"
  | "HR"
  | "Offer"
  | "Rejected"
  | "Wishlist"
  | "Assessment"
  | "Interview";

export interface JobCard {
  id: string;
  title: string;
  company: string;
  logo: string;
  date: string;
  status: JobStage;
  priorityFlag: boolean;
  location: string;
  meta?: {
    salary?: string;
    url?: string;
    interviewDate?: string;
    followUpDate?: string;
    notes?: string;
  };
}

export interface DsaProblemLog {
  id: string;
  name: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  timeSpent: number;
  notes: string;
  createdAt: string;
}

export interface DsaProblemItem {
  id: string;
  name: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
  solutionSnippet: string;
  link?: string;
  status: "Not Started" | "In Progress" | "Solved";
  notes?: string;
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

export interface UserProject {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: "Planned" | "In Progress" | "Completed";
  skillsDemonstrated: string[];
  resumeRelevance: string;
  createdAt: string;
}

export interface CategorizedSkills {
  languages: string[];
  frameworks: string[];
  databases: string[];
  cloud: string[];
  devops: string[];
  tools: string[];
  other: string[];
}

export interface ExtendedCareerProfile {
  education?: string;
  degree?: string;
  graduationYear?: string;
  location?: string;
  expectedSalary?: string;
  preferredLocation?: string;
  workPreference?: "Remote" | "Hybrid" | "On-site";
  categorizedSkills?: CategorizedSkills;
  preferences?: {
    companyTypes?: string[];
    timelineMonths?: number;
    dailyHours?: string;
  };
  portfolioLinks?: {
    github?: string;
    linkedin?: string;
    website?: string;
  };
  projects?: UserProject[];
  dsaItems?: Record<string, { status: "Not Started" | "In Progress" | "Solved"; notes?: string }>;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: "DSA" | "Development" | "CS Fundamentals" | "Interview" | "Resume" | "Company Prep";
  description: string;
  url: string;
  source: string;
  tags: string[];
}

export interface InterviewQuestionItem {
  q: string;
  a: string;
  keyPoints: string[];
  category?: string;
  starGuide?: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
}

export interface InterviewTopicGuide {
  id: string;
  title: string;
  category: "Technical" | "HR" | "Behavioral";
  description: string;
  questions: InterviewQuestionItem[];
}
