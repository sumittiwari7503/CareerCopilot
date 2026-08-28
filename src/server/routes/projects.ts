import { Router, Response } from "express";
import { requireAuth, AuthenticatedRequest } from "../middleware/auth";
import { prisma } from "../db/prisma";
import { Type } from "@google/genai";
import { getGemini, hasGeminiKey, generateContentWithFallback } from "../services/ai";
import { safeValidateAIJSON, ProjectRecommendationSchema } from "../utils/aiValidation";
import { z } from "zod";

const router = Router();

const ProjectListSchema = z.array(ProjectRecommendationSchema);

// GET /api/projects/recommendations
router.get("/recommendations", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;

  try {
    const list = await prisma.projectRecommendation.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });

    return res.json(list);
  } catch (error: any) {
    console.error("Failed to fetch project recommendations:", error);
    return res.status(500).json({ error: "Failed to fetch project recommendations" });
  }
});

// POST /api/projects/recommendations/generate
router.post("/recommendations/generate", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  let role = "Software Developer";
  let missingSkills: string[] = ["TypeScript", "Vitest", "Docker"];

  try {
    // Fetch profile
    const profile = await prisma.profile.findFirst({ where: { userId } });
    if (profile?.targetRole) role = profile.targetRole;

    // Fetch latest resume version text
    const latestResume = await prisma.resume.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        versions: {
          orderBy: { createdAt: "desc" },
          take: 1,
          include: { analysis: true }
        }
      }
    });

    const resumeText = latestResume?.versions[0]?.extractedText || "";
    if (latestResume?.versions[0]?.analysis?.missingKeywords) {
      missingSkills = latestResume.versions[0].analysis.missingKeywords;
    }

    // 1. If Gemini API key is missing, fall back to procedural project recommendations
    if (!hasGeminiKey()) {
      console.log("No API key available. Returning procedural project recommendations.");
      const fallbacks = getProceduralProjects(userId, role, missingSkills);
      
      // Save in DB
      await prisma.projectRecommendation.deleteMany({ where: { userId } });
      const created = await Promise.all(
        fallbacks.map(p => prisma.projectRecommendation.create({ data: p }))
      );
      return res.json(created);
    }

    // 2. Build AI prompt
    const ai = getGemini();
    const prompt = `Based on the candidate's target role ("${role}"), resume details, and identified skill gaps (missing skills: ${missingSkills.join(", ")}), recommend 2 advanced software engineering projects.
    
    Resume Details:
    """
    ${resumeText.slice(0, 3000)}
    """`;

    const response = await generateContentWithFallback(ai, {
      contents: prompt,
      config: {
        systemInstruction: `You are an elite software engineering director and technical coach. Generate a list of detailed project recommendations designed specifically to bridge a candidate's resume skill gaps.
CRITICAL SAFETY RULE: You must never promise or guarantee employment, salaries, or specific hiring outcomes. Use conditional trust statements such as "can strengthen evidence for" or "helps demonstrate proficiency".
You must never fabricate company requirements or fake recruiter statistics.
Output valid JSON matching the exact schema specified.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              techStack: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              difficulty: { type: Type.STRING }, // "Beginner" | "Intermediate" | "Advanced"
              resumeValue: { type: Type.STRING },
              deliverables: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              interviewPrep: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              sourceGap: { type: Type.STRING }
            },
            required: ["title", "description", "techStack", "difficulty", "resumeValue", "deliverables", "interviewPrep", "sourceGap"]
          }
        }
      }
    });

    const text = response.text;
    const validated = safeValidateAIJSON(
      text || "",
      ProjectListSchema,
      getProceduralProjects(userId, role, missingSkills)
    );

    // Save validated results to DB
    await prisma.projectRecommendation.deleteMany({ where: { userId } });
    const created = await Promise.all(
      validated.map(p => prisma.projectRecommendation.create({
        data: {
          userId,
          title: p.title,
          description: p.description,
          techStack: p.techStack,
          difficulty: p.difficulty,
          resumeValue: p.resumeValue,
          deliverables: p.deliverables,
          interviewPrep: p.interviewPrep,
          sourceGap: p.sourceGap
        }
      }))
    );

    return res.json(created);

  } catch (error: any) {
    console.warn("AI project generation failed. Falling back to procedural projects:", error.message);
    try {
      const fallbacks = getProceduralProjects(userId, role, missingSkills);
      await prisma.projectRecommendation.deleteMany({ where: { userId } });
      const created = await Promise.all(
        fallbacks.map(p => prisma.projectRecommendation.create({ data: p }))
      );
      return res.json(created);
    } catch (fallbackErr: any) {
      console.error("Failed to run projects fallback generation:", fallbackErr);
      return res.status(500).json({ error: "Failed to generate project recommendations" });
    }
  }
});

// Helper for procedural projects
function getProceduralProjects(userId: string, role: string, missingSkills: string[]) {
  const gap = missingSkills[0] || "Testing";
  return [
    {
      userId,
      title: `${gap} Automation Framework`,
      description: `Create an end-to-end testing harness designed to validate asynchronous microservices workloads. This targets the candidate's target ${role} requirement for testing metrics.`,
      techStack: [gap, "Node.js", "Vitest", "Playwright"],
      difficulty: "Intermediate" as const,
      resumeValue: `Helps demonstrate testing efficiency metrics on candidate profile, showing proof of code reliability.`,
      deliverables: [
        "Setup automated runner scripts",
        "Write mock REST controller assertions",
        "Document unit testing code coverage indexes (>85%)"
      ],
      interviewPrep: [
        "How do you test race conditions in async tasks?",
        "Explain testing vs profiling tools."
      ],
      sourceGap: gap
    },
    {
      userId,
      title: "Distributed Query Caching Tier",
      description: "Implement a latency-optimized query caching framework using key-value clusters to demonstrate systems performance knowledge.",
      techStack: ["Redis", "PostgreSQL", "Docker", "Express"],
      difficulty: "Advanced" as const,
      resumeValue: "Can strengthen evidence for database performance optimizations and scaling skills.",
      deliverables: [
        "Docker compose cluster configurations",
        "Read-through queries route controller",
        "Implement memory invalidation TTL tags"
      ],
      interviewPrep: [
        "Explain cache stampede and mitigation strategies.",
        "How do you design high-availability Redis nodes?"
      ],
      sourceGap: "Scalability"
    }
  ];
}

export default router;
