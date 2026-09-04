import { CareerRoadmap, ResumeAnalysis, InterviewQuestionResponse, InterviewSummary, JobCard } from "../types";

function getHeaders(token: string | null) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

// ----------------------------------------------------
// Profile & DSA APIs
// ----------------------------------------------------
export async function fetchProfileAPI(token: string | null) {
  const res = await fetch("/api/profile", {
    method: "GET",
    headers: getHeaders(token)
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch profile: ${res.statusText}`);
  }
  return res.json();
}

export async function updateProfileAPI(
  profileData: Partial<{
    fullName: string;
    targetRole: string;
    targetLevel: string;
    targetCompany: string;
    companyType: string;
    specialization: string;
    experienceLevel: string;
    targetTimeline: number;
    timeAvailable: string;
    currentSkills: string; // stringified JSON
    onboardingCompleted: boolean;
    dailyScore: number;
    streakDays: number;
    careerProfile: string;
    dsaProblems: string;
    readinessHistory: string;
  }>,
  token: string | null
) {
  const res = await fetch("/api/profile", {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify(profileData)
  });
  if (!res.ok) {
    let errMsg = res.statusText;
    try {
      const errData = await res.json();
      if (errData && errData.error) {
        errMsg = errData.error;
      }
    } catch (e) {
      // ignore
    }
    throw new Error(`Failed to update profile: ${errMsg}`);
  }
  return res.json();
}

export async function updateDsaStatsAPI(
  easySolved: number, 
  mediumSolved: number, 
  hardSolved: number, 
  token: string | null
) {
  const res = await fetch("/api/profile/dsa", {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify({ easySolved, mediumSolved, hardSolved })
  });
  if (!res.ok) {
    throw new Error(`Failed to update DSA stats: ${res.statusText}`);
  }
  return res.json();
}

// ----------------------------------------------------
// Applications (Job Pipeline) APIs
// ----------------------------------------------------
export async function fetchApplicationsAPI(token: string | null): Promise<JobCard[]> {
  const res = await fetch("/api/applications", {
    method: "GET",
    headers: getHeaders(token)
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch applications: ${res.statusText}`);
  }
  return res.json();
}

export async function createApplicationAPI(
  app: { title: string; company: string; status: string; priorityFlag: boolean; location: string; meta?: any }, 
  token: string | null
): Promise<JobCard> {
  const res = await fetch("/api/applications", {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(app)
  });
  if (!res.ok) {
    throw new Error(`Failed to create application: ${res.statusText}`);
  }
  return res.json();
}

export async function updateApplicationAPI(
  id: string, 
  app: Partial<{ title: string; company: string; status: string; priorityFlag: boolean; location: string; meta: any }>, 
  token: string | null
): Promise<JobCard> {
  const res = await fetch(`/api/applications/${id}`, {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify(app)
  });
  if (!res.ok) {
    throw new Error(`Failed to update application: ${res.statusText}`);
  }
  return res.json();
}

export async function deleteApplicationAPI(id: string, token: string | null): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`/api/applications/${id}`, {
    method: "DELETE",
    headers: getHeaders(token)
  });
  if (!res.ok) {
    throw new Error(`Failed to delete application: ${res.statusText}`);
  }
  return res.json();
}

// ----------------------------------------------------
// AI content APIs
// ----------------------------------------------------
export async function generateRoadmapAPI(
  role: string, 
  duration: number, 
  skillLevel: string, 
  token: string | null
): Promise<CareerRoadmap> {
  const res = await fetch("/api/generate-roadmap", {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify({ role, duration, skillLevel })
  });
  if (!res.ok) {
    throw new Error(`Failed to generate roadmap: ${res.statusText}`);
  }
  return res.json();
}

export async function analyzeResumeAPI(
  resumeText: string, 
  targetRole: string, 
  targetJd: string,
  token: string | null
): Promise<ResumeAnalysis> {
  const res = await fetch("/api/resume-analyze", {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify({ resumeText, targetRole, targetJd })
  });
  if (!res.ok) {
    throw new Error(`Failed to analyze resume: ${res.statusText}`);
  }
  return res.json();
}

export async function submitInterviewAnswerAPI(
  role: string, 
  currentQuestion: string, 
  userAnswer: string, 
  type: string,
  difficulty: string,
  sessionId: string | null,
  token: string | null
): Promise<InterviewQuestionResponse> {
  const res = await fetch("/api/mock-interview/question", {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify({ role, currentQuestion, userAnswer, type, difficulty, sessionId })
  });
  if (!res.ok) {
    throw new Error(`Failed to submit answer: ${res.statusText}`);
  }
  return res.json();
}

export async function endInterviewSessionAPI(
  role: string, 
  type: string,
  difficulty: string,
  sessionId: string | null,
  token: string | null
): Promise<InterviewSummary> {
  const res = await fetch("/api/mock-interview/question", {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify({ role, isEnding: true, type, difficulty, sessionId })
  });
  if (!res.ok) {
    throw new Error(`Failed to end session: ${res.statusText}`);
  }
  return res.json();
}

// ----------------------------------------------------
// Actions APIs
// ----------------------------------------------------
export async function fetchTodayActionAPI(token: string | null) {
  const res = await fetch("/api/actions/today", {
    method: "GET",
    headers: getHeaders(token)
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch today action: ${res.statusText}`);
  }
  return res.json();
}

export async function completeActionAPI(id: string, token: string | null) {
  const res = await fetch(`/api/actions/${id}/complete`, {
    method: "POST",
    headers: getHeaders(token)
  });
  if (!res.ok) {
    throw new Error(`Failed to complete action: ${res.statusText}`);
  }
  return res.json();
}

// ----------------------------------------------------
// Projects APIs
// ----------------------------------------------------
export async function fetchProjectRecommendationsAPI(token: string | null) {
  const res = await fetch("/api/projects/recommendations", {
    method: "GET",
    headers: getHeaders(token)
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch project recommendations: ${res.statusText}`);
  }
  return res.json();
}

export async function generateProjectRecommendationsAPI(token: string | null) {
  const res = await fetch("/api/projects/recommendations/generate", {
    method: "POST",
    headers: getHeaders(token)
  });
  if (!res.ok) {
    throw new Error(`Failed to generate project recommendations: ${res.statusText}`);
  }
  return res.json();
}

// ----------------------------------------------------
// Career Plan APIs (Phase 9)
// ----------------------------------------------------
export async function fetchCareerPlanAPI(token: string | null) {
  const res = await fetch("/api/career-plan", {
    method: "GET",
    headers: getHeaders(token)
  });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Failed to fetch career plan: ${res.statusText}`);
  }
  return res.json();
}

export async function generateCareerPlanAPI(token: string | null) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch("/api/career-plan/generate", {
      method: "POST",
      headers: getHeaders(token),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!res.ok) {
      throw new Error(`Failed to generate career plan: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

export async function updateRoadmapTasksAPI(id: string, checkedTasks: Record<string, boolean>, token: string | null) {
  const res = await fetch(`/api/roadmap/${id}/tasks`, {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify({ checkedTasks })
  });
  if (!res.ok) {
    throw new Error(`Failed to update checklist tasks: ${res.statusText}`);
  }
  return res.json();
}

export async function fetchLatestResumeAPI(token: string | null): Promise<{ id: string; text: string; analysis: ResumeAnalysis | null } | null> {
  const res = await fetch("/api/resume/latest", {
    method: "GET",
    headers: getHeaders(token)
  });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Failed to fetch latest resume: ${res.statusText}`);
  }
  return res.json();
}

export async function applyResumeFixAPI(
  title: string,
  description: string,
  evidenceDetail: string,
  resumeText: string,
  token: string | null
): Promise<{ before: string; after: string }> {
  const res = await fetch("/api/resume/apply-fix", {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify({ title, description, evidenceDetail, resumeText })
  });
  if (!res.ok) {
    throw new Error(`Failed to apply resume fix: ${res.statusText}`);
  }
  return res.json();
}

export async function updateActionTasksAPI(id: string, tasks: any[], token: string | null) {
  const res = await fetch(`/api/actions/${id}/tasks`, {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify({ tasks })
  });
  if (!res.ok) {
    throw new Error(`Failed to update action tasks: ${res.statusText}`);
  }
  return res.json();
}
