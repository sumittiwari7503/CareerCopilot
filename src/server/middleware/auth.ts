import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as jose from "jose";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email?: string;
  };
}

export async function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Missing or malformed authentication header" });
  }

  const token = authHeader.split(" ")[1];
  const jwtSecret = process.env.SUPABASE_JWT_SECRET;

  try {
    // 1. Decode token to inspect alg, kid, and iss
    const decoded = jwt.decode(token, { complete: true }) as any;
    if (!decoded || !decoded.header || !decoded.payload) {
      throw new Error("Invalid JWT format");
    }

    const kid = decoded.header.kid;
    const iss = decoded.payload.iss;

    let userId: string;
    let email: string | undefined;

    if (kid) {
      // Asymmetric token verification (e.g. ES256, RS256 via JWKS)
      if (!iss) {
        throw new Error("Missing issuer (iss) claim in token payload");
      }
      
      const JWKS = jose.createRemoteJWKSet(new URL(`${iss}/.well-known/jwks.json`));
      
      const { payload } = await jose.jwtVerify(token, JWKS, {
        audience: "authenticated",
        algorithms: ["ES256", "RS256"] // Explicitly allow only supported asymmetric algorithms
      });
      
      userId = payload.sub as string;
      email = payload.email as string | undefined;
    } else {
      // Symmetric token verification (fallback to HS256)
      if (!jwtSecret) {
        throw new Error("SUPABASE_JWT_SECRET environment variable is missing on the server");
      }

      let payload: any;
      try {
        const decodedSecret = Buffer.from(jwtSecret, "base64");
        payload = jwt.verify(token, decodedSecret, { algorithms: ["HS256"] });
      } catch (err1) {
        payload = jwt.verify(token, jwtSecret, { algorithms: ["HS256"] });
      }

      userId = payload.sub;
      email = payload.email;
    }

    req.user = {
      id: userId,
      email: email
    };
    next();
  } catch (err: any) {
    console.error("Supabase JWT verification failed:", err.message);
    return res.status(401).json({ 
      error: `Unauthorized: Invalid or expired token: ${err.message}`
    });
  }
}
