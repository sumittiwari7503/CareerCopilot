import { Router, Response } from "express";
import { requireAuth, AuthenticatedRequest } from "../middleware/auth";
import { prisma } from "../db/prisma";
import { Type } from "@google/genai";
import { getGemini, hasGeminiKey, generateContentWithFallback } from "../services/ai";
import { z } from "zod";

const router = Router();

const WeekTaskSchema = z.object({
  weekNumber: z.number(),
  weekTitle: z.string(),
  focus: z.string(),
  tasks: z.array(z.string())
});

const MilestoneSchema = z.object({
  monthNo: z.number(),
  monthTitle: z.string(),
  monthDesc: z.string(),
  weeks: z.array(WeekTaskSchema)
});

const GeneratedRoadmapSchema = z.object({
  roadmapTitle: z.string(),
  durationText: z.string(),
  completionRateText: z.string(),
  months: z.array(MilestoneSchema)
});

// GET /api/career-plan - Retrieves active persisted roadmap
router.get("/", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;

  try {
    const roadmap = await prisma.careerRoadmap.findFirst({
      where: { userId },
      include: {
        milestones: {
          orderBy: { monthNo: "asc" }
        }
      }
    });

    if (!roadmap) {
      return res.status(404).json({ error: "Career plan not found. Please generate one." });
    }

    // Format output to match frontend shape
    const formatted = {
      id: roadmap.id,
      roadmapTitle: roadmap.title,
      durationText: `${roadmap.duration} Months`,
      duration: roadmap.duration,
      completionRateText: "0% Complete",
      checkedTasks: roadmap.checkedTasks || {},
      months: roadmap.milestones.map(m => ({
        id: m.id,
        monthTitle: m.title,
        monthDesc: "",
        status: m.monthNo === 1 ? "active" : "locked",
        weeks: JSON.parse(JSON.stringify(m.weeksData))
      }))
    };

    return res.json(formatted);
  } catch (error: any) {
    console.error("Error retrieving career plan:", error);
    return res.status(500).json({ error: "Failed to retrieve career plan" });
  }
});

// POST /api/career-plan/generate - Compiles & saves a new roadmap
router.post("/generate", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;

  try {
    const profile = await prisma.profile.findFirst({ where: { userId } });
    if (!profile || !profile.onboardingCompleted) {
      return res.status(400).json({ error: "Please complete onboarding profile setup first" });
    }

    const {
      targetRole,
      targetCompany,
      companyType,
      specialization,
      experienceLevel,
      targetTimeline,
      timeAvailable,
      currentSkills
    } = profile;

    const parsedSkills = currentSkills ? (currentSkills as string[]) : [];

    // Delete existing roadmap to avoid duplicate system tracks
    await prisma.careerRoadmap.deleteMany({ where: { userId } });

    // Procedural Fallback generator
    const getFallbackRoadmap = () => {
      const durationVal = targetTimeline || 3;
      const cleanRole = targetRole || "Software Developer";
      const monthsList = [];
      for (let m = 1; m <= durationVal; m++) {
        monthsList.push({
          monthNo: m,
          monthTitle: `Month ${m}: Tech Focus & Systems`,
          monthDesc: `Preparation milestones targeting ${cleanRole} at ${targetCompany || "Product Company"}.`,
          weeks: [
            {
              weekNumber: (m - 1) * 4 + 1,
              weekTitle: `Week ${(m - 1) * 4 + 1}: Foundations & Core APIs`,
              focus: "Building solid conceptual understandings.",
              tasks: [
                "Study language syntax basics",
                "Practice 5 easy algorithm tasks",
                "Write basic design specifications"
              ]
            },
            {
              weekNumber: (m - 1) * 4 + 2,
              weekTitle: `Week ${(m - 1) * 4 + 2}: Latency, scale & debug tasks`,
              focus: "Tackling intermediate project configurations.",
              tasks: [
                "Implement caching controllers",
                "Resolve testing coverage margins",
                "Run mock interviews screen practice"
              ]
            }
          ]
        });
      }
      return {
        roadmapTitle: `${cleanRole} Plan for ${targetCompany || "Core Roles"}`,
        durationText: `${durationVal} Months`,
        completionRateText: "0% Complete",
        months: monthsList
      };
    };

    let generatedData;

    if (!hasGeminiKey()) {
      console.log("No Gemini API key. Returning procedural template roadmap.");
      generatedData = getFallbackRoadmap();
    } else {
      try {
        const ai = getGemini();
        const prompt = `Generate a structured, personalized career roadmap to achieve the goal:
        Target Role: ${targetRole}
        Target Company: ${targetCompany || "General Placement"}
        Company Type: ${companyType} (Service/Product focus)
        Specialization: ${specialization}
        Experience Level: ${experienceLevel}
        Preparation Timeline: ${targetTimeline} Months
        Daily Available Study: ${timeAvailable}
        Current Skills: ${parsedSkills.join(", ")}
        
        CRITICAL RULE:
        The roadmap must contain exactly ${targetTimeline} months.
        Generate structured weeks per month.
        Balance the tasks to fit a ${timeAvailable} daily study schedule. Do not overload a 30-min user, and do not underload a 4-hour user.
        Format output as valid JSON matching the schema.`;

        const response = await generateContentWithFallback(ai, {
          contents: prompt,
          config: {
            systemInstruction: `You are an elite software engineering director and technical coach. Generate high-quality week-by-week career plan roadmaps. Respond only with valid JSON matching the exact schema specified.`,
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                roadmapTitle: { type: Type.STRING },
                durationText: { type: Type.STRING },
                completionRateText: { type: Type.STRING },
                months: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      monthNo: { type: Type.INTEGER },
                      monthTitle: { type: Type.STRING },
                      monthDesc: { type: Type.STRING },
                      weeks: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            weekNumber: { type: Type.INTEGER },
                            weekTitle: { type: Type.STRING },
                            focus: { type: Type.STRING },
                            tasks: {
                              type: Type.ARRAY,
                              items: { type: Type.STRING }
                            }
                          },
                          required: ["weekNumber", "weekTitle", "focus", "tasks"]
                        }
                      }
                    },
                    required: ["monthNo", "monthTitle", "monthDesc", "weeks"]
                  }
                }
              },
              required: ["roadmapTitle", "durationText", "completionRateText", "months"]
            }
          }
        });

        const text = response.text || "";
        const parsed = JSON.parse(text);
        const validated = GeneratedRoadmapSchema.parse(parsed);
        generatedData = validated;
      } catch (err: any) {
        console.warn("AI generation failed or Zod validation errors. Falling back to procedural roadmap:", err.message);
        generatedData = getFallbackRoadmap();
      }
    }

    // Save generated plan to database
    const createdRoadmap = await prisma.careerRoadmap.create({
      data: {
        userId,
        title: generatedData.roadmapTitle,
        duration: targetTimeline || 3,
        skillLevel: experienceLevel || "Fresher",
        checkedTasks: {},
        milestones: {
          create: generatedData.months.map(m => ({
            monthNo: m.monthNo,
            title: m.monthTitle,
            weeksData: JSON.parse(JSON.stringify(m.weeks))
          }))
        }
      },
      include: {
        milestones: {
          orderBy: { monthNo: "asc" }
        }
      }
    });

    const formatted = {
      id: createdRoadmap.id,
      roadmapTitle: createdRoadmap.title,
      durationText: `${createdRoadmap.duration} Months`,
      duration: createdRoadmap.duration,
      completionRateText: "0% Complete",
      checkedTasks: createdRoadmap.checkedTasks || {},
      months: createdRoadmap.milestones.map(m => ({
        id: m.id,
        monthTitle: m.title,
        monthDesc: "",
        status: m.monthNo === 1 ? "active" : "locked",
        weeks: JSON.parse(JSON.stringify(m.weeksData))
      }))
    };

    return res.status(201).json(formatted);

  } catch (error: any) {
    console.error("Failed to generate career plan:", error);
    return res.status(500).json({ error: "Failed to generate career plan" });
  }
});

// PUT /api/career-plan/:id/tasks - Updates roadmap checked tasks (milestones checklist checkoffs)
router.put("/:id/tasks", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;
  const { checkedTasks } = req.body;

  if (!checkedTasks || typeof checkedTasks !== "object") {
    return res.status(400).json({ error: "checkedTasks must be a valid JSON object" });
  }

  // Validate values inside checkedTasks are booleans
  for (const [key, value] of Object.entries(checkedTasks)) {
    if (typeof value !== "boolean") {
      return res.status(400).json({ error: `Value for task key "${key}" must be a boolean status` });
    }
  }

  try {
    // Ownership check
    const roadmap = await prisma.careerRoadmap.findFirst({
      where: { id, userId }
    });

    if (!roadmap) {
      return res.status(404).json({ error: "Roadmap not found or access forbidden" });
    }

    const updated = await prisma.careerRoadmap.update({
      where: { id },
      data: {
        checkedTasks
      }
    });

    return res.json({ success: true, checkedTasks: updated.checkedTasks });
  } catch (error: any) {
    console.error("Failed to update checked tasks:", error);
    return res.status(500).json({ error: "Failed to update checklist tasks" });
  }
});

export default router;
