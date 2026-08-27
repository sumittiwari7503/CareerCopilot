import { Router, Response } from "express";
import { prisma } from "../db/prisma";
import { requireAuth, AuthenticatedRequest } from "../middleware/auth";

const router = Router();

// GET /api/profile - Fetches user profile, lazy-creating it if not exists.
router.get("/profile", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const email = req.user!.email || "";

  try {
    let profile = await prisma.profile.findUnique({
      where: { userId }
    });

    if (!profile) {
      profile = await prisma.profile.create({
        data: {
          userId,
          fullName: email.split("@")[0] || "New User",
          targetRole: "Software Developer",
          targetLevel: "L5",
          streakDays: 0,
          dailyScore: 0,
          easySolved: 0,
          mediumSolved: 0,
          hardSolved: 0,
          targetCompany: "",
          companyType: "",
          specialization: "",
          experienceLevel: "",
          targetTimeline: 3,
          timeAvailable: "2 hours",
          currentSkills: "[]",
          onboardingCompleted: false
        }
      });
    }

    return res.json(profile);
  } catch (err: any) {
    console.error("Error fetching/creating profile:", err);
    return res.status(500).json({ error: "Internal server error retrieving profile context" });
  }
});

// PUT /api/profile - Updates user profile details
router.put("/profile", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const { 
    fullName, 
    targetRole, 
    targetLevel,
    targetCompany,
    companyType,
    specialization,
    experienceLevel,
    targetTimeline,
    timeAvailable,
    currentSkills,
    onboardingCompleted
  } = req.body;

  if (fullName !== undefined && (typeof fullName !== "string" || fullName.trim() === "")) {
    return res.status(400).json({ error: "Full name must be a valid string" });
  }

  try {
    const updated = await prisma.profile.update({
      where: { userId },
      data: {
        ...(fullName !== undefined && { fullName }),
        ...(targetRole !== undefined && { targetRole }),
        ...(targetLevel !== undefined && { targetLevel }),
        ...(targetCompany !== undefined && { targetCompany }),
        ...(companyType !== undefined && { companyType }),
        ...(specialization !== undefined && { specialization }),
        ...(experienceLevel !== undefined && { experienceLevel }),
        ...(targetTimeline !== undefined && { targetTimeline: parseInt(targetTimeline, 10) || 3 }),
        ...(timeAvailable !== undefined && { timeAvailable }),
        ...(currentSkills !== undefined && { currentSkills }),
        ...(onboardingCompleted !== undefined && { onboardingCompleted: !!onboardingCompleted })
      }
    });

    return res.json(updated);
  } catch (err: any) {
    console.error("Error updating profile:", err);
    return res.status(500).json({ error: "Internal server error updating profile" });
  }
});

// PUT /api/profile/dsa - Updates DSA solved statistics with validation
router.put("/profile/dsa", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const { easySolved, mediumSolved, hardSolved } = req.body;

  // Validate that all fields are non-negative integers
  const validateCount = (val: any) => {
    if (val === undefined) return true;
    return Number.isInteger(val) && val >= 0;
  };

  if (!validateCount(easySolved) || !validateCount(mediumSolved) || !validateCount(hardSolved)) {
    return res.status(400).json({ error: "DSA solved counts must be non-negative integers" });
  }

  try {
    const updated = await prisma.profile.update({
      where: { userId },
      data: {
        ...(easySolved !== undefined && { easySolved }),
        ...(mediumSolved !== undefined && { mediumSolved }),
        ...(hardSolved !== undefined && { hardSolved })
      }
    });

    return res.json(updated);
  } catch (err: any) {
    console.error("Error updating DSA stats:", err);
    return res.status(500).json({ error: "Internal server error updating DSA statistics" });
  }
});

export default router;
