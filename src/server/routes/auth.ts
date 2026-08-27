import { Router } from "express";
import { prisma } from "../db/prisma";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const router = Router();

function hashPassword(password: string): string {
  return crypto.createHmac("sha256", "auth-salt").update(password).digest("hex");
}

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  const { email, password, fullName } = req.body;
  if (!email || !password || !fullName) {
    return res.status(400).json({ error: "Email, password, and full name are required" });
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const passwordHash = hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        profile: {
          create: {
            fullName,
            targetRole: "Software Developer"
          }
        }
      }
    });

    const jwtSecret = process.env.SUPABASE_JWT_SECRET || "your-supabase-jwt-secret";
    const token = jwt.sign({ sub: user.id, email: user.email }, jwtSecret, { expiresIn: "7d" });

    return res.json({ session: { access_token: token, user } });
  } catch (error: any) {
    console.error("Local signup failed:", error);
    return res.status(500).json({ error: "Local registration failed" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const passwordHash = hashPassword(password);
    if (user.passwordHash !== passwordHash) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const jwtSecret = process.env.SUPABASE_JWT_SECRET || "your-supabase-jwt-secret";
    const token = jwt.sign({ sub: user.id, email: user.email }, jwtSecret, { expiresIn: "7d" });

    return res.json({ session: { access_token: token, user } });
  } catch (error: any) {
    console.error("Local login failed:", error);
    return res.status(500).json({ error: "Local login verification failed" });
  }
});

export default router;
