# Career Copilot — Documentation Consistency Audit & Codebase Reality Check

This document contains a strict review of the project documentation against the actual codebase, highlighting contradictions, gaps, architectural decisions, and a prioritized implementation plan.

---

## PART 1 — DOCUMENT CONSISTENCY AUDIT

We reviewed `AUDIT.md`, `PRD.md`, `TRD.md`, `APP_WEB_FLOW.md`, `UI_UX.md`, `SCHEMA.md`, and `IMPLEMENTATION_PLAN.md`. The following contradictions and inconsistencies were found:

### Issue ID: `CON-01` (DSA Tracker Schema Gap)
*   **Documents Involved**: `APP_WEB_FLOW.md`, `UI_UX.md`, `SCHEMA.md`, `IMPLEMENTATION_PLAN.md`
*   **Problem**: `APP_WEB_FLOW.md` and `UI_UX.md` discuss the DSA Tracker's "solution logs" and "difficulty counts". However, `SCHEMA.md` contains **no database tables or fields** to store solved DSA challenge counts (`easySolved`, `mediumSolved`, `hardSolved`).
*   **Why it matters**: Without database representation, the DSA tracker counts will reset to zero on refresh, violating the core requirement of persistent metrics.
*   **Recommended Resolution**: Add `easySolved`, `mediumSolved`, and `hardSolved` integer columns directly to the `Profile` database table in `SCHEMA.md`. This is the simplest MVP approach.
*   **Priority**: `P0` (Critical)

### Issue ID: `CON-02` (Job Match Feature Definition)
*   **Documents Involved**: `PRD.md`, `SCHEMA.md`, `TRD.md`
*   **Problem**: `PRD.md` marks the Job Match module as a **Proposed** post-MVP feature. However, `SCHEMA.md` defines a proposed `JobMatch` table, and `TRD.md` includes `/api/job-match` (under API specs).
*   **Why it matters**: Contradicts the distinction between MVP and post-MVP, which can lead to scope creep during early coding phases.
*   **Recommended Resolution**: Clarify that the basic resume-job compatibility check `/api/resume-analyze` also performs match checks against target role descriptions. Exclude a separate `JobMatch` table from the initial migration, folding compatibility indices directly into the `ResumeAnalysis` table.
*   **Priority**: `P1` (High)

### Issue ID: `CON-03` (Base Path Configuration conflict)
*   **Documents Involved**: `vite.config.ts` (current codebase), `TRD.md`
*   **Problem**: `vite.config.ts` uses `base: './'` for relative asset loading (allowing GitHub Pages subfolder deployments). `TRD.md` proposes standard routing without documenting how relative assets handle routing paths under a subfolder.
*   **Why it matters**: Absolute routing paths in a SPA (e.g. `/dashboard`) fail on GitHub Pages (`/CareerCopilot/dashboard`) unless configured with a router base path.
*   **Recommended Resolution**: Specify in `TRD.md` that the router must use a `basename` matching the subpath (`process.env.PUBLIC_URL` or a fixed path) or use Hash Routing for static Pages deployments.
*   **Priority**: `P1` (High)

---

## PART 2 — CODEBASE REALITY CHECK

This matrix compares the documentation features with the actual state of the codebase.

| Area | Documentation Says | Code Actually Has | Gap | Priority |
| :--- | :--- | :--- | :--- | :--- |
| **Authentication** | Supabase Auth JWT credentials, user session protection. | No authentication. Single hardcoded mock user in local memory state. | Complete login, signup flow, backend JWT middleware verification. | **P0** |
| **Database** | PostgreSQL database configuration with Prisma ORM. | No database. All state resets on browser refresh. | Create database container/service, set up Prisma client, build schemas. | **P0** |
| **APIs** | Protected endpoints for roadmaps, resume parsing, match scoring, and mock Q&As. | Three unsecured API endpoints in `server.ts` with no auth checks. | Protect routes with auth verification, separate routers and controllers. | **P0** |
| **State Management** | Zustand stores for local UI state, React Query for server fetches. | Ephemeral `useState` hooks inside the main monolith. | Extract UI state into Zustand; refactor fetch calls using custom hooks. | **P1** |
| **Routing** | React Router v7 layout structures. | Tab-based state checks (`activeTab === 'home'`). | Setup React Router, configure paths, add auth-guard wrappers. | **P1** |
| **Resume Parser** | Drag-and-drop PDF/DOCX file upload, version history list. | A single textarea for copy-pasting raw text. | Implement file uploader, add backend text extractor (`pdf-parse`). | **P1** |
| **Job Pipeline** | Kanban board layout with draggable stage columns. | Vertical text listing of jobs with a delete button. | Rebuild UI to support status lists, link cards to Postgres database. | **P1** |
| **Interview Coach**| AI dialogue session, dynamic question flow, transcript record. | Simple textarea Q&A, mock evaluation results panel. | Store question transcripts in database, link active session to user ID. | **P1** |
| **Skill Analysis** | Dynamic skill gap comparison bars matching parsed metrics. | Hardcoded `SKILL_GAP_DATA` constant in `src/constants.ts`. | Extract skill categories dynamically from user resume analysis database logs. | **P2** |
| **Dashboard** | Dynamic career health summary, active streak count. | Mock parameters representing "Alex Rivera". | Connect dashboard panels to user database parameters. | **P1** |
| **UI Components** | Reusable, accessible Cobalt Blue component primitives. | Inline styles and Tailwind classes repeated inside the monolith. | Move UI controls (Buttons, Cards, Selects) to modular component files. | **P2** |
| **Error Handling** | Error Boundaries, fallback forms, API retry screens. | Basic `console.error` logs in catch blocks. | Implement unified error boundary, add user-facing retry notices. | **P1** |
| **Responsive Design**| Intentional mobile-first layouts and padded targets. | Responsive classes stacked, but sidebars compress poorly on mobile. | Design mobile-friendly collapsible sidebars, ensure 44px tap targets. | **P2** |
| **Security** | Row-level DB isolation, input validation schemas, rate limiting. | Unsecured routes, no rate limits, no API input checks. | Implement Zod validators, add express-rate-limit, define RLS policies. | **P0** |

---

## PART 3 — ARCHITECTURAL DECISIONS

Before proceeding, we evaluate whether every proposed major architectural change is justified:

### 1. Relational Database (Prisma + PostgreSQL)
*   **What problem does it solve?** Solves critical data loss. User records, roadmap milestones, and application pipeline cards must survive browser refreshes.
*   **Is it required for MVP?** Yes. An app without data persistence is just a mock prototype.
*   **What is the migration risk?** Low. There is no legacy database to migrate. We only need to check if users have old local storage data to hydrate.
*   **Can the existing architecture support the feature?** No.
*   **Simplest production-safe solution**: Supabase Database (managed PostgreSQL) connected via Prisma. This is secure, scales well, and requires zero local infrastructure configuration.

### 2. Supabase Authentication
*   **What problem does it solve?** Enables multi-tenancy and data isolation (User A cannot view or modify User B's pipeline or profile settings).
*   **Is it required for MVP?** Yes. A production SaaS cannot share a single hardcoded profile.
*   **What is the migration risk?** Low.
*   **Can the existing architecture support the feature?** No.
*   **Simplest production-safe solution**: Supabase Auth (JWT credentials check). Supabase handles encryption, signups, and sign-ins automatically, keeping the codebase clean.

### 3. React Router v7 & Modular Refactoring
*   **What problem does it solve?** Resolves the tab resetting bug, enables URL deep linking, and cleans up the monolithic `App.tsx` file (which is currently over 1180 lines, posing a major maintainability risk).
*   **Is it required for MVP?** No, technically tab states can work, but the monolithic code structure makes adding features highly error-prone.
*   **What is the migration risk?** Low. Just modular code reorganization.
*   **Simplest production-safe solution**: Refactor `App.tsx` into modular files (`/components/ui/`, `/views/`). Install React Router v7 and configure standard layout routing.

### 4. Zustand + React Query vs. Context API + Custom Hooks
*   **What problem does it solve?** Zustand solves prop-drilling, and React Query manages server-side state sync.
*   **Is it required for MVP?** No.
*   **Can the existing architecture support the feature?** Yes, React's Context API + standard custom fetch hooks are lighter and sufficient for MVP scope.
*   **Simplest production-safe solution**: **(Recommended Override)** To avoid adding unnecessary dependencies and code complexity in the MVP phase, we will use **React Context** for global Authentication state, and **standard custom fetch hooks** with local state triggers for roadmaps/resume analyses. We will bypass adding Zustand/React Query unless complexity scales in future versions.

---

## PART 4 — RECALCULATED PRIORITIES & IMPLEMENTATION SEQUENCE

Based on our audit, we have aligned tasks into a strict, dependency-aware stabilization sequence:

### Phase 1 — Stabilization & Database Setup (P0 Tasks)
1.  **Refactor Monolith (`TSK-1.1`)**: Split `App.tsx` and `server.ts` into clean directories.
2.  **Initialize Database Schema (`TSK-1.2`)**: Add Postgres, Prisma configurations, and the `Profile` database adjustments (folding solved DSA metrics in).
3.  **Supabase Auth Setup (`TSK-1.3`)**: Implement registration, logins, and API auth token checks.

### Phase 2 — Core Intelligence & App Tracker (P1 Tasks)
4.  **Resume parsing storage (`TSK-2.2`)**: Connect `/api/resume-analyze` output to the `Resume` and `ResumeAnalysis` database tables.
5.  **Job application tracking (`TSK-5.1`)**: Persist Kanban boards to the `Application` database table.
6.  **Roadmap milestone persistence (`TSK-3.1`)**: Connect milestones to the database.
7.  **Interview session transcripts (`TSK-4.2`)**: Save interview logs.

### Phase 3 — UX Polish & Security audits (P2 Tasks)
8.  **PDF Upload parser (`TSK-2.1`)**: Move beyond copy-paste text areas.
9.  **React Router configuration (`TSK-1.4`)**: Setup path routing and auth route guards.
10. **A11y & loading skeletons (`TSK-6.2`)**: Implement skeletons and WCAG AA-compliant components.
11. **Security rate-limiting rules (`TSK-9.1`)**: Implement express-rate-limits on backend controllers.
