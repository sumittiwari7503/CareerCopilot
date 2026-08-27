# Career Copilot — Authentication Security Verification

This document verifies the security configuration of the authentication and authorization implementation, satisfying the requirements of Phase 5 Step 3.

---

## 1. Security Architecture Summary

*   **Supabase Client Configuration**: The client-side Supabase client is initialized at [`src/utils/supabase.ts`](file:///Users/apple/Desktop/careercopilot/src/utils/supabase.ts) utilizing public environment variables prefixed with `VITE_` (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`). This configuration is safe to expose to the browser and restricts DB access based on Supabase API access policies.
*   **Token Acquisition & Refresh**: Managed automatically by the Supabase Auth listener client-side. The [`AuthContext.tsx`](file:///Users/apple/Desktop/careercopilot/src/context/AuthContext.tsx) exposes `getAccessToken()` which retrieves the active session token, renewing expired sessions automatically in the background using the Supabase refresh token before performing API requests.
*   **Backend Bearer Token Verification**: Protected endpoints at [`src/server/middleware/auth.ts`](file:///Users/apple/Desktop/careercopilot/src/server/middleware/auth.ts) intercept the `Authorization` header and verify the Bearer token against the private server variable `SUPABASE_JWT_SECRET` using the `jsonwebtoken` package.
*   **JWT Verification Method & Signature**: The verified identity uses the shared HS256 JWT signature verification matching Supabase's encryption standard. The server extracts the validated `sub` claim as the user's UUID and the `email` claim.

---

## 2. Authorization & Data Isolation Controls

*   **User ID Extraction**: The user identity is extracted strictly from the JWT signature payload. The client cannot forge or dictate its own `userId` parameters in headers or request payloads.
*   **Database Scoping & Ownership**: All Prisma database operations are scoped by filtering queries using the authenticated `req.user.id`:
    ```typescript
    // Example: Scoped read query
    const userApplications = await prisma.application.findMany({
      where: { userId: req.user.id }
    });
    ```
*   **Cross-User Access Verification**:
    *   **User A vs User B Isolation**: If User A tries to view or modify User B's application cards (e.g. sending User B's `id` in `PUT /api/applications/:id`), the backend controller performs a validation query:
        ```typescript
        const existing = await prisma.application.findFirst({
          where: { id, userId } // userId is User A's id, id is User B's card id
        });
        if (!existing) return res.status(404).json({ error: "forbidden" });
        ```
        This returns a 404/403 block, ensuring User A cannot read or modify User B's data.
    *   **Expired/Invalid Tokens**: JWT verification catch block returns `401 Unauthorized` for expired or modified token signatures.
    *   **Missing/Malformed Tokens**: Missing `Authorization` header or missing `Bearer ` prefix returns `401 Unauthorized` without calling backend controller logic.
