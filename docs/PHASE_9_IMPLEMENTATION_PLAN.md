# Phase 9 — Implementation Plan (Revised)

This document contains the step-by-step execution plan for the Functional Product Rebuild and Personalized Career Planning Engine.

---

## 1. Architectural Guidelines

### 1.1 Auth & Scoping Rules
*   **Decentralized User Isolation**: The user ID is derived strictly from the JWT Bearer header on the backend. The API never accepts `userId` parameters from client-side JSON bodies.
*   **Validated JSON checkedTasks**: The backend validates checked tasks. It confirms the roadmap belongs to the user, the task exists in the roadmap data structure, and the status value is a boolean.

### 1.2 Onboarding UX Flow
Onboarding will take over the screen as a full-page experience, hiding navigation elements until completion. It steps through:
1.  **Target Role**: (Select from SE, FE, BE, Full Stack, Data Analyst, Data Scientist, DevOps, or input custom role).
2.  **Target Company**: (Choose company or input name).
3.  **Company Type**: (Product Company, Service Company, Startup, Consulting, Government, Not sure).
4.  **Role Specialization**: (Frontend, Backend, Full Stack, Mobile, Systems, Not sure).
5.  **Experience Level**: (Student, Fresher, 0-1 years, 1-2 years, 2-3 years, 3+ years).
6.  **Current Skills**: (Enter/select tags).
7.  **Daily Preparation Time**: (30 min, 1 hour, 2 hours, 3 hours, 4+ hours).
8.  **Target Timeline**: (1, 2, 3, 4, 6 months).
9.  **Resume**: (Optional upload or Skip for now).

---

## 2. API Contracts & Error States

| Path | Method | Auth | Body | 200/201 | Error Handlers (400, 401, 403, 404, 500) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/profile` | `GET` | Yes | N/A | Return Profile | `401` Unauthorized, `500` DB error |
| `/api/profile` | `PUT` | Yes | Onboarding Profile | Return Profile | `400` Validation error, `401` Unauthorized |
| `/api/career-plan` | `GET` | Yes | N/A | Return Roadmap | `404` Plan not found, `401` Unauthorized |
| `/api/career-plan/generate` | `POST` | Yes | N/A | Created Roadmap | `400` Onboarding incomplete, `500` AI error |
| `/api/career-plan/today` | `GET` | Yes | N/A | Return ActionItem | `401` Unauthorized |
| `/api/roadmap/:id/tasks` | `PUT` | Yes | `{ checkedTasks }` | Updated checkedTasks | `400` Invalid format, `403` Access forbidden |
| `/api/actions/:id/complete` | `POST` | Yes | N/A | Return ActionItem | `404` Not found, `403` Access forbidden |

---

## 3. Wave Implementation Order

### Wave 1: Database & Persistence
*   Update `prisma/schema.prisma` models for onboarding Profile fields and CareerRoadmap `checkedTasks`.
*   Apply migration dev and compile client.

### Wave 2: Onboarding UX & AI Generator Route
*   Implement full-screen onboarding wizard screen in the frontend.
*   Update `POST /api/career-plan/generate` (formerly `generate-roadmap`) using Gemini with Zod validation. Prompt adapts week goals based on company type and daily study hours.
*   Save generated plan to PostgreSQL.

### Wave 3: Roadmap Checklist & ActionItem Execution
*   Implement `PUT /api/roadmap/:id/tasks` with validations.
*   Link dashboard checklist actions to this endpoint.

### Wave 4: Dashboard Redesign
*   Provide a primary "Start Today's Plan" CTA button on the dashboard.
*   Incorporate plan timelines progress indicators, removing mock scoring elements when data is not ready.

### Wave 5: Mobile Responsive & E2E Validation
*   Perform E2E test runs verifying signup, onboarding, plan generation, check-off persistence, plan updates, and resume updates.
