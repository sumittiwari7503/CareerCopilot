# Career Copilot — Production Environment Audit

This document audits the deployment settings, environment configurations, and security boundaries of Career Copilot to ensure dev configurations do not leak into production.

---

## 1. Environment Variable Boundaries

| Variable Name | Environment | Server Only? | Value Placeholder | Verification Result |
| :--- | :--- | :--- | :--- | :--- |
| `GEMINI_API_KEY` | Server | Yes (Critical) | `MY_GEMINI_API_KEY` | Correct. Kept strictly on the backend. |
| `DATABASE_URL` | Server | Yes (Critical) | `postgresql://...` | Correct. Exposed only to Prisma during build/run. |
| `SUPABASE_JWT_SECRET` | Server | Yes (Critical) | `your-jwt-secret` | Correct. Kept on backend to verify JWT tokens. |
| `SUPABASE_URL` | Server/Client | No | `https://...` | Correct. Public endpoint for client connectivity. |
| `SUPABASE_ANON_KEY` | Server/Client | No | `your-anon-key` | Correct. Client public anon key. |
| `VITE_SUPABASE_URL` | Client | No | `https://...` | Bound during Vite compilation. |
| `VITE_SUPABASE_ANON_KEY` | Client | No | `your-anon-key` | Bound during Vite compilation. |

*   ** exposed Secrets Check**: Searched the build output directories and client files; no private credentials (database passwords, JWT secrets, or Gemini developer keys) are bundled into client-side JS.
*   **Localhost URLs Check**: Found no hardcoded `http://localhost:3000` fetches in the client. All frontend API operations utilize relative paths (e.g., `/api/profile`), routing requests dynamically to the serving domain.

---

## 2. Server Deployment & CORS Setup

*   **Unified Domain Hosting**: In production, the Express server acts as both the API provider and the static asset distributor (serving the built `dist/` folder). Because the front and backend share the exact same port and domain, there is no need to configure complex CORS policies, mitigating cross-domain request leakage.
*   **Security Headers**: Recommend adding `helmet` middleware in V2 to automatically configure content-security policies (CSP), frame options, and HSTS headers.
