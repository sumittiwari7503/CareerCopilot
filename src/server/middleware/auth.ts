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

  try {
    // 1. Decode token to inspect alg and iss
    const decoded = jwt.decode(token, { complete: true }) as any;
    if (!decoded || !decoded.header || !decoded.payload) {
      throw new Error("Invalid JWT format");
    }

    const alg = decoded.header.alg;
    const iss = decoded.payload.iss;

    let userId: string;
    let email: string | undefined;

    if (alg && alg.startsWith("RS")) {
      // Asymmetric token verification (e.g. RS256 via JWKS)
      if (!iss) {
        throw new Error("Missing issuer (iss) claim in token payload");
      }
      const jwksUrl = `${iss}/.well-known/jwks.json`;
      const JWKS = jose.createRemoteJWKSet(new URL(jwksUrl));
      
      const { payload } = await jose.jwtVerify(token, JWKS, {
        audience: "authenticated"
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
        payload = jwt.verify(token, decodedSecret);
      } catch (err1) {
        payload = jwt.verify(token, jwtSecret);
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
    let decodedHeader: any = null;
    let decodedClaims: any = null;
    try {
      const decodedComplete = jwt.decode(token, { complete: true }) as any;
      if (decodedComplete) {
        decodedHeader = decodedComplete.header;
        decodedClaims = decodedComplete.payload;
      }
    } catch (decodeErr) {
      // ignore
    }

    const diagnostics = {
      errorName: err.name,
      errorMessage: err.message,
      tokenLength: token ? token.length : 0,
      secretLength: jwtSecret ? jwtSecret.length : 0,
      decodedHeader: decodedHeader ? {
        alg: decodedHeader.alg,
        kid: decodedHeader.kid,
        typ: decodedHeader.typ
      } : null,
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
