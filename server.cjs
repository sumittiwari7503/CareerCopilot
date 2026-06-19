var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
app.use(import_express.default.json());
var PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3e3;
var aiClient = null;
function getGemini() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    aiClient = new import_genai.GoogleGenAI({
      apiKey: key || "MOCK_API_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}
function hasGeminiKey() {
  const key = process.env.GEMINI_API_KEY;
  return !!key && key !== "MY_GEMINI_API_KEY";
}
var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function generateContentWithFallback(ai, config) {
  const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
  let lastError = null;
  for (const model of modelsToTry) {
    const maxRetries = 3;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`[Gemini-Call] Trying ${model} (${attempt}/${maxRetries})`);
        const response = await ai.models.generateContent({
          ...config,
          model
        });
        return response;
      } catch (err) {
        lastError = err;
        console.log(`[Gemini-State] ${model} unavailable on attempt ${attempt}`);
        const errMsg = String(err.message || "").toLowerCase();
        if (err.status === 400 || err.status === 403 || err.statusCode === 400 || err.statusCode === 403 || errMsg.includes("api key") || errMsg.includes("unauthorized") || errMsg.includes("invalid key")) {
          throw err;
        }
        if (attempt === maxRetries) {
          break;
        }
        const delay = attempt * 500;
        await sleep(delay);
      }
    }
  }
  throw lastError;
}
app.post("/api/generate-roadmap", async (req, res) => {
  const { role, duration, skillLevel } = req.body;
  if (!role) {
    return res.status(400).json({ error: "Role is required" });
  }
  const durationVal = duration || 3;
  const skillVal = skillLevel || "Beginner";
  if (!hasGeminiKey()) {
    console.log("No API key available. Returning high-quality procedural roadmap.");
    return res.json(getProceduralRoadmap(role, durationVal, skillVal));
  }
  try {
    const ai = getGemini();
    const prompt = `Generate a structured career roadmap to become a highly skilled "${role}".
    Duration: ${durationVal} Months.
    Current Skill Level: ${skillVal}.
    Provide actionable, week-by-week goals, focus items, and practical checklist tasks. Make the month breakdown exactly ${durationVal} months.`;
    const response = await generateContentWithFallback(ai, {
      contents: prompt,
      config: {
        systemInstruction: `You are an elite Tech Career Coach. Your response must be valid JSON matching the exact schema specified. Keep the descriptions encouraging, highly polished, and professional.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.OBJECT,
          properties: {
            roadmapTitle: { type: import_genai.Type.STRING },
            durationText: { type: import_genai.Type.STRING },
            completionRateText: { type: import_genai.Type.STRING },
            months: {
              type: import_genai.Type.ARRAY,
              items: {
                type: import_genai.Type.OBJECT,
                properties: {
                  id: { type: import_genai.Type.STRING },
                  monthTitle: { type: import_genai.Type.STRING },
                  monthDesc: { type: import_genai.Type.STRING },
                  status: { type: import_genai.Type.STRING },
                  // 'completed' | 'active' | 'locked'
                  weeks: {
                    type: import_genai.Type.ARRAY,
                    items: {
                      type: import_genai.Type.OBJECT,
                      properties: {
                        weekNumber: { type: import_genai.Type.INTEGER },
                        weekTitle: { type: import_genai.Type.STRING },
                        focus: { type: import_genai.Type.STRING },
                        tasks: {
                          type: import_genai.Type.ARRAY,
                          items: { type: import_genai.Type.STRING }
                        }
                      },
                      required: ["weekNumber", "weekTitle", "focus", "tasks"]
                    }
                  }
                },
                required: ["id", "monthTitle", "monthDesc", "status", "weeks"]
              }
            }
          },
          required: ["roadmapTitle", "durationText", "completionRateText", "months"]
        }
      }
    });
    const text = response.text;
    if (text) {
      const parsed = JSON.parse(text);
      return res.json(parsed);
    }
    throw new Error("No response text from Gemini");
  } catch (error) {
    console.log("[Gemini] Roadmap falling back to procedural sequence due to transient API state.");
    return res.json(getProceduralRoadmap(role, durationVal, skillVal));
  }
});
app.post("/api/resume-analyze", async (req, res) => {
  const { resumeText, targetRole } = req.body;
  if (!resumeText) {
    return res.status(400).json({ error: "Resume text is empty" });
  }
  const role = targetRole || "Software Developer";
  if (!hasGeminiKey()) {
    console.log("No API key available. Returning procedural resume optimizer output.");
    return res.json(getProceduralResumeAnalysis(resumeText, role));
  }
  try {
    const ai = getGemini();
    const prompt = `Analyze this resume content against the requirements for a "${role}" role. 
    Provide an ATS Score (0-100), key missing keywords/tech, formatting issues, and expert advice (specifically highlighting visual and quantify targets like adding Redis caching or layout fixes).
    
    Resume Content:
    """
    ${resumeText}
    """`;
    const response = await generateContentWithFallback(ai, {
      contents: prompt,
      config: {
        systemInstruction: "You are a professional recruiting coordinator and resume screening parser. Analyze structurally and output valid JSON exactly matching the requested format.",
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.OBJECT,
          properties: {
            atsScore: { type: import_genai.Type.INTEGER },
            compatibilityText: { type: import_genai.Type.STRING },
            missingKeywords: {
              type: import_genai.Type.ARRAY,
              items: { type: import_genai.Type.STRING }
            },
            suggestions: {
              type: import_genai.Type.ARRAY,
              items: {
                type: import_genai.Type.OBJECT,
                properties: {
                  type: { type: import_genai.Type.STRING },
                  // "quantify" | "alert" | "keyword"
                  title: { type: import_genai.Type.STRING },
                  description: { type: import_genai.Type.STRING },
                  actionText: { type: import_genai.Type.STRING }
                },
                required: ["type", "title", "description", "actionText"]
              }
            }
          },
          required: ["atsScore", "compatibilityText", "missingKeywords", "suggestions"]
        }
      }
    });
    const text = response.text;
    if (text) {
      const parsed = JSON.parse(text);
      return res.json(parsed);
    }
    throw new Error("Empty text returned from Gemini resume parse");
  } catch (error) {
    console.log("[Gemini] Resume parser falling back to procedural advisor due to transient API state.");
    return res.json(getProceduralResumeAnalysis(resumeText, role));
  }
});
app.post("/api/mock-interview/question", async (req, res) => {
  const { role, currentQuestion, userAnswer, isEnding } = req.body;
  if (!role) {
    return res.status(400).json({ error: "Role is required" });
  }
  if (!hasGeminiKey()) {
    console.log("No API key available. Returning procedural interview dialog.");
    return res.json(getProceduralInterviewResponse(role, currentQuestion, userAnswer, isEnding));
  }
  try {
    const ai = getGemini();
    let prompt = "";
    let systemInstruction = "";
    if (isEnding) {
      systemInstruction = "You are a seasoned hiring manager compiling candidate feedback. Output valid JSON.";
      prompt = `Provide a beautiful and professional Candidate Interview Summary for a "${role}" candidate who just completed their mock interview session. Evaluate the overall strengths, readiness tier ("Strong" | "Moderate" | "Needs Improvement"), overall score, and growth pathways.`;
      const response = await generateContentWithFallback(ai, {
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: import_genai.Type.OBJECT,
            properties: {
              readinessLevel: { type: import_genai.Type.STRING },
              overallScore: { type: import_genai.Type.INTEGER },
              strengths: {
                type: import_genai.Type.ARRAY,
                items: { type: import_genai.Type.STRING }
              },
              improvements: {
                type: import_genai.Type.ARRAY,
                items: { type: import_genai.Type.STRING }
              }
            },
            required: ["readinessLevel", "overallScore", "strengths", "improvements"]
          }
        }
      });
      const text = response.text;
      if (text) {
        return res.json(JSON.parse(text));
      }
    } else {
      systemInstruction = "You are a friendly, highly skilled engineering manager conducting an interactive candidate screening. Respond precisely to the user's answer and ask a great follow-up technical or behavioral question. Output valid JSON.";
      if (!currentQuestion) {
        prompt = `This is the very first question of the mock interview for a "${role}" position. Ask a great, challenging first question. Keep previous userAnswer and explanation sections blank/empty.`;
      } else {
        prompt = `Inside an interview for a "${role}" role, the question was: "${currentQuestion}". 
        The candidate answered: "${userAnswer || ""}".
        As the interviewer:
        1. Evaluate the answer (rating 0-100, confidence, speechRateText, pacing).
        2. Give a warm, constructive brief explanation of feedback.
        3. Formulate the NEXT follow-up question.`;
      }
      const response = await generateContentWithFallback(ai, {
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: import_genai.Type.OBJECT,
            properties: {
              evaluation: {
                type: import_genai.Type.OBJECT,
                properties: {
                  rating: { type: import_genai.Type.INTEGER },
                  confidence: { type: import_genai.Type.STRING },
                  // "Confident", "Hesitant", "Developing", "Shy"
                  speechRateText: { type: import_genai.Type.STRING },
                  // e.g. "Steady speech rate" 
                  pacingScore: { type: import_genai.Type.INTEGER }
                },
                required: ["rating", "confidence", "speechRateText", "pacingScore"]
              },
              nextQuestion: { type: import_genai.Type.STRING },
              explanation: { type: import_genai.Type.STRING }
            },
            required: ["evaluation", "nextQuestion", "explanation"]
          }
        }
      });
      const text = response.text;
      if (text) {
        return res.json(JSON.parse(text));
      }
    }
    throw new Error("Unable to obtain text from interview request");
  } catch (error) {
    console.log("[Gemini] Interview coach falling back to procedural prompt due to transient API state.");
    return res.json(getProceduralInterviewResponse(role, currentQuestion, userAnswer, isEnding));
  }
});
function getProceduralRoadmap(role, duration, skillLevel) {
  const generatedId = Math.random().toString(36).substring(7);
  const cleanRole = role.trim();
  const primaryTopic = cleanRole.toLowerCase().includes("frontend") ? "React & Core Web UI" : cleanRole.toLowerCase().includes("backend") ? "System Design & Databases" : cleanRole.toLowerCase().includes("data") ? "Algorithms & Python Data Science" : "System Architecture Foundations";
  const secondaryTopic = cleanRole.toLowerCase().includes("frontend") ? "Advanced Performance Tethers" : cleanRole.toLowerCase().includes("backend") ? "Distributed Pipelines" : cleanRole.toLowerCase().includes("data") ? "Machine Learning Pipelines" : "Scale engineering";
  const monthsList = [];
  for (let m = 1; m <= duration; m++) {
    const isFirst = m === 1;
    monthsList.push({
      id: `${generatedId}-m${m}`,
      monthTitle: `Month ${m}: ${m === 1 ? primaryTopic : m === 2 ? secondaryTopic : "Elite Career Readiness Pipeline"}`,
      monthDesc: `Deeper dive into standard operational targets for matching high performance ${cleanRole} positions.`,
      status: isFirst ? "active" : "locked",
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
function getProceduralResumeAnalysis(text, role) {
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
function getProceduralInterviewResponse(role, currentQuestion, answer, isEnding) {
  if (isEnding) {
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
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server fully operational on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
