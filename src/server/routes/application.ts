import { Router, Response } from "express";
import { prisma } from "../db/prisma";
import { requireAuth, AuthenticatedRequest } from "../middleware/auth";

const router = Router();

// GET /api/applications - Get all job applications for user
router.get("/applications", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;

  try {
    const jobs = await prisma.application.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });
    return res.json(jobs);
  } catch (err: any) {
    console.error("Error fetching applications:", err);
    return res.status(500).json({ error: "Internal server error fetching pipeline cards" });
  }
});

// POST /api/applications - Save a new job application card
router.post("/applications", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const { title, company, status, priorityFlag, location } = req.body;

  if (!title || !company) {
    return res.status(400).json({ error: "Job title and company name are required" });
  }

  try {
    const newJob = await prisma.application.create({
      data: {
        userId,
        title,
        company,
        status: status || "Wishlist",
        priorityFlag: !!priorityFlag,
        location: location || "Remote"
      }
    });
    return res.status(201).json(newJob);
  } catch (err: any) {
    console.error("Error creating application:", err);
    return res.status(500).json({ error: "Internal server error creating job card" });
  }
});

// PUT /api/applications/:id - Update an application card with ownership isolation
router.put("/applications/:id", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;
  const { title, company, status, priorityFlag, location } = req.body;

  try {
    // Check ownership first
    const existing = await prisma.application.findFirst({
      where: { id, userId }
    });

    if (!existing) {
      return res.status(404).json({ error: "Job application card not found or access forbidden" });
    }

    const updated = await prisma.application.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(company !== undefined && { company }),
        ...(status !== undefined && { status }),
        ...(priorityFlag !== undefined && { priorityFlag }),
        ...(location !== undefined && { location })
      }
    });

    return res.json(updated);
  } catch (err: any) {
    console.error("Error updating application:", err);
    return res.status(500).json({ error: "Internal server error updating job card" });
  }
});

// DELETE /api/applications/:id - Delete application card with ownership validation
router.delete("/applications/:id", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;

  try {
    const existing = await prisma.application.findFirst({
      where: { id, userId }
    });

    if (!existing) {
      return res.status(404).json({ error: "Job application card not found or access forbidden" });
    }

    await prisma.application.delete({
      where: { id }
    });

    return res.json({ success: true, message: "Job card deleted successfully" });
  } catch (err: any) {
    console.error("Error deleting application:", err);
    return res.status(500).json({ error: "Internal server error deleting job card" });
  }
});

export default router;
