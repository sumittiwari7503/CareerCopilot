import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email?: string;
  };
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Missing or malformed authentication header" });
  }

  const token = authHeader.split(" ")[1];
  const jwtSecret = process.env.SUPABASE_JWT_SECRET;
  if (!jwtSecret) {
    console.error("Critical Error: SUPABASE_JWT_SECRET environment variable is missing on the server");
    return res.status(500).json({ error: "Internal server configuration error" });
  }

  try {
    const payload = jwt.verify(token, jwtSecret) as any;
    req.user = {
      id: payload.sub,
      email: payload.email
    };
    next();
  } catch (err: any) {
    console.warn("JWT Verification failed:", err.message);
    return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
  }
}
