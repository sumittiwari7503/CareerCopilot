# Career Copilot — Auth & Database Architecture

This document establishes the official architecture for user authentication, database persistence, and application APIs in **Career Copilot**.

---

## 1. Core Architecture Pattern (Three-Tier decoupled Stack)

```
[React SPA Client] <--- JWT Auth Session ---> [Supabase Auth Server]
       │
  API Requests (with Bearer Token)
       │
       ▼
[Express Server API]
       │
   (Auth Middleware checks token using Supabase Secret JWT Key)
       │
  Prisma Client Queries
       │
       ▼
[PostgreSQL Database]
```

### Components:
1.  **Authentication**: Managed by **Supabase Auth** on the frontend client. Users sign up/log in directly with the Supabase API. The client receives a signed JWT access token.
2.  **Application API**: An **Express Server** that serves all business endpoints. Any protected endpoint requires the client to send the JWT in the `Authorization: Bearer <JWT>` header.
3.  **Authentication Middleware**: The Express backend uses `jsonwebtoken` (or similar library) to verify the signature of the incoming JWT token against the `SUPABASE_JWT_SECRET` environment variable. The backend extracts the verified user `uuid` (Sub claim) from the token.
4.  **Database Layer**: **PostgreSQL** database managed remotely (e.g. Supabase DB).
5.  **ORM (Object-Relational Mapping)**: **Prisma** interacts with the PostgreSQL database. The backend uses the Prisma Client to perform queries scoped strictly to the verified `uuid`.

---

## 2. Technical Justification

*   **Supabase Auth**: Offloads password hashing, salt storage, OAuth2 protocols, session lifecycles, and email confirmation workflows. This ensures high security without manual encryption logic in Express.
*   **Prisma ORM**: Offers direct auto-generated TypeScript typings matching the database tables. This prevents type mismatches between Express API controllers and database fields.
*   **PostgreSQL**: A standard relational database that allows foreign-key constraints to guarantee user isolation and cascading deletes of nested entities (e.g. purging roadmaps when an account is deleted).

---

## 3. Data Isolation & Security Boundaries

### Identity Extraction Rule:
The frontend **never** dictates its own `userId` in API payloads. The backend *only* relies on the cryptographically verified `userId` retrieved from the JWT token:

```typescript
// Safe Controller Flow
const userId = req.user.id; // Populated by JWT validation middleware
const userProfile = await prisma.profile.findUnique({
  where: { userId }
});
```

### Database Isolation (RLS):
The database enforces Row-Level Security (RLS) policies based on the owner `userId` to ensure that even a misconfigured backend query cannot leak user data.
