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
    let payload: any;
    try {
      // Supabase JWT secrets are base64-encoded. We decode it to a Buffer first.
      const decodedSecret = Buffer.from(jwtSecret, "base64");
      payload = jwt.verify(token, decodedSecret);
    } catch (err1) {
      // Fallback in case secret is set as raw string
      payload = jwt.verify(token, jwtSecret);
    }

    req.user = {
      id: payload.sub,
      email: payload.email
    };
    next();
  } catch (err: any) {
    console.error("Supabase JWT verification failed. Error name:", err.name, "Error message:", err.message);
    return res.status(401).json({ error: `Unauthorized: Invalid or expired token: ${err.message}` });
  }
}
