import { CareerRoadmap, ResumeAnalysis, InterviewQuestionResponse, InterviewSummary } from "../types";

export function getProceduralRoadmap(role: string, duration: number, skillLevel: string): CareerRoadmap {
  const generatedId = Math.random().toString(36).substring(7);
  const cleanRole = role.trim();

  const primaryTopic = cleanRole.toLowerCase().includes("frontend") ? "React & Core Web UI" :
                        cleanRole.toLowerCase().includes("backend") ? "System Design & Databases" : 
                        cleanRole.toLowerCase().includes("data") ? "Algorithms & Python Data Science" : "System Architecture Foundations";

  const secondaryTopic = cleanRole.toLowerCase().includes("frontend") ? "Advanced Performance Tethers" :
                          cleanRole.toLowerCase().includes("backend") ? "Distributed Pipelines" : 
                          cleanRole.toLowerCase().includes("data") ? "Machine Learning Pipelines" : "Scale engineering";

  const monthsList = [];
  for (let m = 1; m <= duration; m++) {
    const isFirst = m === 1;
    monthsList.push({
      id: `${generatedId}-m${m}`,
      monthTitle: `Month ${m}: ${m === 1 ? primaryTopic : m === 2 ? secondaryTopic : "Elite Career Readiness Pipeline"}`,
      monthDesc: `Deeper dive into standard operational targets for matching high performance ${cleanRole} positions.`,
      status: (isFirst ? "active" : "locked") as "active" | "locked" | "completed",
      weeks: [
        {
          weekNumber: (m - 1) * 4 + 1,
          weekTitle: `Week ${(m - 1) * 4 + 1}: Foundations & Core API tethers`,
          focus: "Mastering component architecture and baseline state management.",
          tasks: [
            "Deep dive into lifecycle optimization parameters",
            "Custom hooks modeling for decentralized data fetching loops",
            "Performance tracking setup using standard telemetry rules"
          ]
        },
        {
          weekNumber: (m - 1) * 4 + 2,
          weekTitle: `Week ${(m - 1) * 4 + 2}: Distributed design & routing scale`,
          focus: "Securing modular architectures for zero lag state syncing.",
          tasks: [
            "Advanced rendering cache setups",
            "Quantified test matrix reviews to detect bottlenecks",
            "Mock scenarios debugging under high load environments"
          ]
        }
      ]
    });
  }

  return {
    roadmapTitle: `${cleanRole} placement roadmap - ${skillLevel} tier`,
    durationText: `${duration} Months`,
    completionRateText: "34% Complete",
    months: monthsList
  };
}

export function getProceduralResumeAnalysis(text: string, role: string): ResumeAnalysis {
  const scoreBase = text.length > 500 ? 85 : 62;
  const missing = ["Docker", "GraphQL", "Kubernetes", "CI/CD Pipelines"];
  
  return {
    atsScore: scoreBase,
    compatibilityText: scoreBase >= 80 ? "Good compatibility" : "Developments needed",
    missingKeywords: missing,
    suggestions: [
      {
        type: "quantify",
        title: "Quantify Achievements",
        description: 'In "Project X", instead of describing generalized tasks like "improved performance", explain specifically: "optimized query response speeds by 40% using Redis caching tethers".',
        actionText: "Apply Fix"
      },
      {
        type: "alert",
        title: "Formatting Alert",
        description: "Your multi-column layout may cause issues with some legacy applicant tracking ATS tethers. Consider moving to a single-column architecture for universal parsing safety.",
        actionText: "Format PDF"
      }
    ]
  };
}

export function getProceduralInterviewQuestionResponse(role: string, currentQuestion?: string, answer?: string): InterviewQuestionResponse {
  if (!currentQuestion) {
    return {
      evaluation: {
        rating: 100,
        confidence: "Steady",
        speechRateText: "Optimal pacing",
        pacingScore: 95
      },
      nextQuestion: `Let's start. Tell me about a time you optimized app performance. What were the metrics, and how did you measure success for this role as ${role}?`,
      explanation: "Interview initiated successfully. Let's delve deep into technical achievements."
    };
  }

  const ratings = [92, 87, 95, 89];
  const ratingChosen = ratings[Math.floor(Math.random() * ratings.length)];

  return {
    evaluation: {
      rating: ratingChosen,
      confidence: "Confident",
      speechRateText: "Steady speech rate",
      pacingScore: ratingChosen
    },
    nextQuestion: `Excellent. Now tell me about how you design scalable caching policies when multiple microservices depend on live distributed database reads.`,
    explanation: `constructive comments: Your previous answer accurately outlined key speed metrics. Adding Redis cluster setups was an excellent choice!`
  };
}

export function getProceduralInterviewSummary(role: string): InterviewSummary {
  return {
    readinessLevel: "Strong",
    overallScore: 88,
    strengths: [
      "Deep technical knowledge of DOM optimization metrics",
      "Clear articulation of performance targets using STAR structure",
      "Excellent response to live follow-up metric queries"
    ],
    improvements: [
      "Include server-side rendering architecture alternatives under system bottlenecks",
      "Slightly slower, more deliberate pacing during behavioral descriptions"
    ]
  };
}
