import { Router, Response } from "express";
import { requireAuth, AuthenticatedRequest } from "../middleware/auth";
import { prisma } from "../db/prisma";

const router = Router();

// GET /api/actions/today
router.get("/today", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;

  try {
    // 1. Check if there is an active (Pending) ActionItem in PostgreSQL
    const activeAction = await prisma.actionItem.findFirst({
      where: { userId, status: "Pending" },
      orderBy: { createdAt: "desc" }
    });

    if (activeAction) {
      return res.json(activeAction);
    }

    // 2. No active ActionItem. We must generate a new one based on candidate's data
    // Fetch profile
    const profile = await prisma.profile.findFirst({ where: { userId } });
    if (!profile || !profile.targetRole) {
      // Setup Action Item
      const onboardingAction = await prisma.actionItem.create({
        data: {
          userId,
          title: "Complete Profile Specialization",
          description: "Establish your target engineering specialty in profile settings to customize AI career loops.",
          priority: "High",
          source: "Profile",
          estimatedMinutes: 5,
          impactText: "Career recommendations personalization ↑",
          tasks: JSON.stringify([
            { text: "Go to Settings page", completed: false },
            { text: "Set target role (e.g. Frontend Specialist)", completed: false },
            { text: "Set target seniority level", completed: false }
          ])
        }
      });
      return res.json(onboardingAction);
    }

    // Fetch latest resume version analysis
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

    if (!latestResume || latestResume.versions.length === 0) {
      const uploadResumeAction = await prisma.actionItem.create({
        data: {
          userId,
          title: "Upload Candidate Resume",
          description: "Upload your resume in the prep planner to scan for formatting errors, ATS keyword compatibility, and technical evidence gaps.",
          priority: "High",
          source: "Resume",
          estimatedMinutes: 10,
          impactText: "ATS screening score generation ↑",
          tasks: JSON.stringify([
            { text: "Prepare resume PDF or text", completed: false },
            { text: "Go to Prep Planning tab", completed: false },
            { text: "Paste text details in ATS Parser", completed: false }
          ])
        }
      });
      return res.json(uploadResumeAction);
    }

    const latestVersion = latestResume.versions[0];
    const analysis = latestVersion.analysis;

    // Check if resume ATS score is weak or has suggestions
    if (analysis && (analysis.atsScore < 75 || (analysis.suggestions as any[]).length > 0)) {
      const suggestions = analysis.suggestions as any[];
      const firstSuggestion = suggestions[0] || {
        title: "Quantify accomplishments",
        description: "Add clear metrics and project outcomes to your experience description bullets.",
        actionText: "Apply Fix"
      };

      const resumeAction = await prisma.actionItem.create({
        data: {
          userId,
          title: `Resume Improvement: ${firstSuggestion.title}`,
          description: firstSuggestion.description,
          priority: "High",
          source: "Resume",
          estimatedMinutes: 20,
          impactText: "ATS compatibility score ↑",
          tasks: JSON.stringify([
            { text: "Extract target project description", completed: false },
            { text: "Draft rewrites adding numerical metrics", completed: false },
            { text: "Paste updated version in parser", completed: false }
          ])
        }
      });
      return res.json(resumeAction);
    }

    // Check if there are active roadmap milestones
    const roadmap = await prisma.careerRoadmap.findFirst({
      where: { userId },
      include: { milestones: true }
    });

    if (roadmap && roadmap.milestones.length > 0) {
      // Find the first milestone that is active/locked
      const activeMilestone = roadmap.milestones.find(m => m.monthNo === 1) || roadmap.milestones[0];
      const milestoneAction = await prisma.actionItem.create({
        data: {
          userId,
          title: `Milestone Prep: ${activeMilestone.title}`,
          description: "Initiate week goals and task checklists on your target engineering roadmap.",
          priority: "Medium",
          source: "Roadmap",
          estimatedMinutes: 30,
          impactText: "Prep milestone completion ↑",
          tasks: JSON.stringify([
            { text: "Go to Prep Planning tab", completed: false },
            { text: "Review week tasks guidelines", completed: false },
            { text: "Check off at least one task item", completed: false }
          ])
        }
      });
      return res.json(milestoneAction);
    }

    // Default neutral state fallback (Fills specs for general improvement when profile is good)
    const generalAction = await prisma.actionItem.create({
      data: {
        userId,
        title: "Your career profile is in good shape.",
        description: "No critical blockers or skill gaps detected. Engaged in communication prep to strengthen interview performance.",
        priority: "Low",
        source: "General",
        estimatedMinutes: 15,
        impactText: "Technical communication fluency ↑",
        tasks: JSON.stringify([
          { text: "Go to AI Mock Coach tab", completed: false },
          { text: "Initiate a mock screen session", completed: false },
          { text: "Evaluate structured feedback ratings", completed: false }
        ])
      }
    });
    return res.json(generalAction);

  } catch (error: any) {
    console.error("Failed to compile today's action item:", error);
    return res.status(500).json({ error: "Failed to load today's action item" });
  }
});

// POST /api/actions/:id/complete
router.post("/:id/complete", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;

  try {
    // Verify ownership
    const action = await prisma.actionItem.findFirst({
      where: { id, userId }
    });

    if (!action) {
      return res.status(404).json({ error: "Action item not found" });
    }

    const updated = await prisma.actionItem.update({
      where: { id },
      data: {
        status: "Completed",
        updatedAt: new Date()
      }
    });

    return res.json(updated);
  } catch (error: any) {
    console.error("Failed to complete action item:", error);
    return res.status(500).json({ error: "Failed to mark action item as completed" });
  }
});

// PUT /api/actions/:id/tasks - Updates subtasks checked states
router.put("/:id/tasks", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;
  const { tasks } = req.body;

  try {
    const action = await prisma.actionItem.findFirst({
      where: { id, userId }
    });

    if (!action) {
      return res.status(404).json({ error: "Action item not found" });
    }

    let parsedTasks = tasks;
    if (tasks !== undefined && typeof tasks === "string") {
      try { parsedTasks = JSON.parse(tasks); } catch (e) { parsedTasks = tasks; }
    }

    const updated = await prisma.actionItem.update({
      where: { id },
      data: {
        tasks: parsedTasks,
        updatedAt: new Date()
      }
    });

    return res.json(updated);
  } catch (error: any) {
    console.error("Failed to update action tasks:", error);
    return res.status(500).json({ error: "Failed to update checklist tasks" });
  }
});

export default router;
