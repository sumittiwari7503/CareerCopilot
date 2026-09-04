import { Router, Response } from "express";
import { prisma } from "../db/prisma";
import { requireAuth, AuthenticatedRequest } from "../middleware/auth";

const router = Router();

async function ensureProfileExists(userId: string, email: string) {
  let profile = await prisma.profile.findUnique({
    where: { userId }
  });

  if (!profile) {
    // Ensure the corresponding User record exists in Postgres (required for foreign key constraints)
    let dbUser = await prisma.user.findUnique({ where: { id: userId } });
    if (dbUser) {
      // Sync email if changed in Supabase
      if (email && dbUser.email !== email) {
        console.log(`[ensureProfileExists] Syncing email change for User ${userId}: ${dbUser.email} -> ${email}`);
        dbUser = await prisma.user.update({
          where: { id: userId },
          data: { email }
        });
      }
    } else {
      if (email) {
        const existingUserByEmail = await prisma.user.findUnique({ where: { email } });
        if (existingUserByEmail && existingUserByEmail.id !== userId) {
          console.warn(`[ensureProfileExists] Email conflict: User with email ${email} already exists with ID ${existingUserByEmail.id}. Archiving stale email to preserve user data without collision.`);
          try {
            await prisma.user.update({
              where: { id: existingUserByEmail.id },
              data: { email: `archived_${existingUserByEmail.id.slice(0, 8)}_${email}` }
            });
          } catch (archiveErr: any) {
            console.error(`[ensureProfileExists] Stale email archive warning: ${archiveErr.message}`);
          }
        }
      }

      dbUser = await prisma.user.create({
        data: {
          id: userId,
          email: email || `user_${userId.slice(0, 8)}@placeholder.local`,
          passwordHash: "" // Managed by Supabase Auth / Google OAuth
        }
      });
    }

    profile = await prisma.profile.create({
      data: {
        userId,
        fullName: email ? (email.split("@")[0] || "New User") : "New User",
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
        currentSkills: [],
        onboardingCompleted: false
      }
    });
  }

  return profile;
}

// GET /api/profile - Fetches user profile, lazy-creating it if not exists.
router.get("/profile", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const email = req.user!.email || "";

  try {
    const profile = await ensureProfileExists(userId, email);
    return res.json(profile);
  } catch (err: any) {
    console.error("Error fetching/creating profile:", err);
    return res.status(500).json({ error: "Internal server error retrieving profile context" });
  }
});

// PUT /api/profile - Updates user profile details
router.put("/profile", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const email = req.user!.email || "";
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
    onboardingCompleted,
    dailyScore,
    streakDays,
    careerProfile,
    dsaProblems,
    readinessHistory
  } = req.body;

  if (fullName !== undefined && (typeof fullName !== "string" || fullName.trim() === "")) {
    return res.status(400).json({ error: "Full name must be a valid string" });
  }

  try {
    // Ensure both User and Profile exist before attempting update (crucial for new OAuth registrations)
    await ensureProfileExists(userId, email);

    // Parse JSON strings if needed
    let parsedSkills = currentSkills;
    if (currentSkills !== undefined && typeof currentSkills === "string") {
      try { parsedSkills = JSON.parse(currentSkills); } catch (e) { parsedSkills = currentSkills; }
    }

    let parsedCareerProfile = careerProfile;
    if (careerProfile !== undefined && typeof careerProfile === "string") {
      try { parsedCareerProfile = JSON.parse(careerProfile); } catch (e) { parsedCareerProfile = careerProfile; }
    }

    let parsedDsaProblems = dsaProblems;
    if (dsaProblems !== undefined && typeof dsaProblems === "string") {
      try { parsedDsaProblems = JSON.parse(dsaProblems); } catch (e) { parsedDsaProblems = dsaProblems; }
    }

    let parsedReadinessHistory = readinessHistory;
    if (readinessHistory !== undefined && typeof readinessHistory === "string") {
      try { parsedReadinessHistory = JSON.parse(readinessHistory); } catch (e) { parsedReadinessHistory = readinessHistory; }
    }

    // Timeline parsing check
    const parsedTimeline = targetTimeline !== undefined 
      ? (typeof targetTimeline === "number" ? targetTimeline : (parseInt(targetTimeline, 10) || 3))
      : undefined;

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
        ...(parsedTimeline !== undefined && { targetTimeline: parsedTimeline }),
        ...(timeAvailable !== undefined && { timeAvailable }),
        ...(currentSkills !== undefined && { currentSkills: parsedSkills }),
        ...(onboardingCompleted !== undefined && { onboardingCompleted: !!onboardingCompleted }),
        ...(dailyScore !== undefined && { dailyScore: parseInt(dailyScore, 10) }),
        ...(streakDays !== undefined && { streakDays: parseInt(streakDays, 10) }),
        ...(careerProfile !== undefined && { careerProfile: parsedCareerProfile }),
        ...(dsaProblems !== undefined && { dsaProblems: parsedDsaProblems }),
        ...(readinessHistory !== undefined && { readinessHistory: parsedReadinessHistory })
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
