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
    return res.status(401).json({ 
      error: "Unauthorized: Missing or malformed authentication header",
      diagnostics: {
        hasAuthHeader: !!authHeader,
        headerType: authHeader ? authHeader.split(" ")[0] : null
      }
    });
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
    let decodedClaims: any = null;
    try {
      decodedClaims = jwt.decode(token);
    } catch (decodeErr) {
      // ignore
    }

    const diagnostics = {
      errorName: err.name,
      errorMessage: err.message,
      tokenLength: token ? token.length : 0,
      secretLength: jwtSecret ? jwtSecret.length : 0,
      decodedClaims: decodedClaims ? {
        iss: decodedClaims.iss,
        aud: decodedClaims.aud,
        sub: decodedClaims.sub,
        exp: decodedClaims.exp,
        email: decodedClaims.email
      } : null
    };

    console.error("Supabase JWT verification failed. Diagnostics:", JSON.stringify(diagnostics));
    return res.status(401).json({ 
      error: `Unauthorized: Invalid or expired token: ${err.message}`,
      diagnostics
    });
  }
}
