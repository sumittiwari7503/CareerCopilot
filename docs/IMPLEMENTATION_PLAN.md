# Career Copilot — Implementation Plan

This document outlines the phased roadmap and task sequence required to transform the **Career Copilot** prototype into a secure, production-ready SaaS application.

---

## 1. Task Prioritization Matrix

### Quick Wins (Low Effort, High Impact)
*   **Local Storage Syncing**: Save the active tab and checklist items to local storage so user state persists across page refreshes before the database setup.
*   **Vite Base Path Setup**: Resolve blank screen errors in folder subpaths on GitHub Pages.

### High-Impact Changes (High Effort, High Value)
*   **Database Integration**: Implement a PostgreSQL database to persistently store candidate roadmaps, job boards, and interview history.
*   **Interactive Resume Parser**: Support PDF/DOCX uploads instead of a plain text copy-paste area.

### Technical Debt to Address
*   **Monolithic Restructuring**: Break down `src/App.tsx` (1180+ lines) into modular folders (`/components`, `/views`, `/routes`).
*   **State Management**: Replace generic, drillable `useState` calls with unified Zustand store modules.

---

## 2. Recommended Order & Implementation Phases

```
[Phase 0: Audit] ──> [Phase 1: Foundation (Modularize, Auth, DB)] ──> [Phase 2: Core Intelligence] 
        │
        └──> [Phase 3: Career Planning] ──> [Phase 4: Interview Copilot] ──> [Phase 5: App Tracker] 
                │
                └──> [Phase 6: UX Polish] ──> [Phase 7: Quality & Test] ──> [Phase 8: Production]
```

---

## Phase 0 — Audit & Setup (Completed)
*   Completed codebase walkthrough.
*   Identified P0-P3 severity risks (documented in `docs/AUDIT.md`).
*   Patched hardcoded server port in `server.ts` to support dynamic binding.

---

## Phase 1 — Technical Foundation

### Task ID: `TSK-1.1` — Repository Refactoring & Component Split
*   **Description**: Break down the monolithic `src/App.tsx` into modular components. Create folders `/components/ui/`, `/components/features/`, `/views/`, and `/routes/`.
*   **Priority**: `P1` (High)
*   **Dependencies**: None.
*   **Estimated Complexity**: Medium (2 days).
*   **Files Affected**: `src/App.tsx`, `src/main.tsx`, new files in `/components/` and `/views/`.
*   **Acceptance Criteria**: The project builds successfully with `npm run build`, imports resolve cleanly, and the UI functions identically without errors.

### Task ID: `TSK-1.2` — Database Setup with Prisma ORM
*   **Description**: Initialize Prisma, configure the PostgreSQL client, and declare schema tables (User, Profile, Resume, Application, CareerRoadmap) matching `docs/SCHEMA.md`.
*   **Priority**: `P0` (Critical)
*   **Dependencies**: `TSK-1.1`.
*   **Estimated Complexity**: High (3 days).
*   **Files Affected**: `package.json`, new database files `/prisma/schema.prisma` and `/src/db/`.
*   **Acceptance Criteria**: Running `prisma migrate dev` compiles schemas, creates database tables locally, and Prisma client generates type definitions cleanly.

### Task ID: `TSK-1.3` — Authentication Integration
*   **Description**: Integrate Supabase Auth SDK. Create register, login, session guard middlewares, and protect routes in the UI.
*   **Priority**: `P0` (Critical)
*   **Dependencies**: `TSK-1.2`.
*   **Estimated Complexity**: High (3 days).
*   **Files Affected**: `src/App.tsx`, `server.ts`, `/middleware/auth.ts`.
*   **Acceptance Criteria**: Users can register and log in, receive a secure session token, and access their specific dashboard view. Attempting to access dashboard endpoints without a JWT token returns `401 Unauthorized`.

---

## Phase 2 — Core Career Intelligence

### Task ID: `TSK-2.1` — PDF/DOCX Resume Upload
*   **Description**: Add file upload component in the UI. Configure backend file parser (e.g. `pdf-parse` or similar) to extract raw text from uploaded resumes.
*   **Priority**: `P1` (High)
*   **Dependencies**: `TSK-1.3`.
*   **Estimated Complexity**: Medium (2 days).
*   **Files Affected**: `/views/Roadmap.tsx`, `server.ts`, new file `/services/parser.ts`.
*   **Acceptance Criteria**: Users can drag and drop a `.pdf` file under 5MB. The server parses text successfully and displays it in the screener viewport.

### Task ID: `TSK-2.2` — Database Persistence for Resume Analysis
*   **Description**: Connect `/api/resume-analyze` output to the Postgres database. Save generated analysis, scores, suggestions, and missing keywords under user profiles.
*   **Priority**: `P0` (Critical)
*   **Dependencies**: `TSK-1.2`, `TSK-2.1`.
*   **Estimated Complexity**: Medium (2 days).
*   **Files Affected**: `server.ts`, `/controllers/resumeController.ts`.
*   **Acceptance Criteria**: Rerunning the analyzer saves a new version record. Navigating away and returning to the page loads the saved analysis score from the database.

---

## Phase 3 — Career Planning & Roadmaps

### Task ID: `TSK-3.1` — Database Persistence for Roadmaps
*   **Description**: Update `/api/generate-roadmap` to write to the PostgreSQL `CareerRoadmap` and `RoadmapMilestone` tables. Save completion states of milestones/tasks.
*   **Priority**: `P0` (Critical)
*   **Dependencies**: `TSK-1.2`.
*   **Estimated Complexity**: High (3 days).
*   **Files Affected**: `server.ts`, `/controllers/roadmapController.ts`, `/views/Roadmap.tsx`.
*   **Acceptance Criteria**: Milestone task checks trigger updates to the database. Checked tasks remain active after a page refresh.

---

## Phase 4 — Mock Interview Copilot

### Task ID: `TSK-4.1` — Context-Aware Interview Prompts
*   **Description**: Update mock interview question generation logic to include context from the user's parsed resume and target seniority level.
*   **Priority**: `P1` (High)
*   **Dependencies**: `TSK-2.2`.
*   **Estimated Complexity**: Medium (2 days).
*   **Files Affected**: `server.ts`, `/services/aiService.ts`.
*   **Acceptance Criteria**: The AI mock interviewer generates questions tailored to the candidate's resume (e.g. asking about React if React is listed on their resume).

### Task ID: `TSK-4.2` — Interview Session Persistence
*   **Description**: Save active mock interview question history, user answers, and AI evaluations in the database under `InterviewSession` and `InterviewAnswer` tables.
*   **Priority**: `P0` (Critical)
*   **Dependencies**: `TSK-1.2`.
*   **Estimated Complexity**: Medium (2 days).
*   **Files Affected**: `server.ts`, `/views/Coach.tsx`.
*   **Acceptance Criteria**: Users can review past mock interview transcripts and performance metrics on their dashboard.

---

## Phase 5 — Application Tracker

### Task ID: `TSK-5.1` — Persistent Kanban Board
*   **Description**: Save job application cards, statuses, and locations in PostgreSQL. Support drag-and-drop state changes in the UI.
*   **Priority**: `P0` (Critical)
*   **Dependencies**: `TSK-1.2`.
*   **Estimated Complexity**: Medium (2 days).
*   **Files Affected**: `/views/Pipeline.tsx`, `/controllers/jobController.ts`.
*   **Acceptance Criteria**: Users can drag applications between status categories. The position updates are persisted in the database.

---

## Phase 6 — UI/UX Polish

### Task ID: `TSK-6.1` — Responsive Layout Refinement
*   **Description**: Optimize cards, grids, sidebars, and navigation controls using responsive Tailwind breakpoints. Establish custom mobile menus.
*   **Priority**: `P2` (Medium)
*   **Dependencies**: `TSK-1.1`.
*   **Estimated Complexity**: Medium (2 days).
*   **Files Affected**: Global component styles.
*   **Acceptance Criteria**: Pages scale down to 360px width without clipping or overflowing layout sections.

### Task ID: `TSK-6.2` — Loading Skeletons & Focus Outlines
*   **Description**: Add WCAG AA-compliant tab-focus borders on all interactive elements. Show pulsing loading skeletons during API calls.
*   **Priority**: `P2` (Medium)
*   **Dependencies**: `TSK-1.1`.
*   **Estimated Complexity**: Medium (2 days).
*   **Files Affected**: UI components.
*   **Acceptance Criteria**: Pressing the Tab key cycles focus borders predictably. Skeletons pulse cleanly during network requests.

---

## Phase 7 — Testing & Quality Assurance

### Task ID: `TSK-7.1` — Automated Testing Suite
*   **Description**: Write unit tests for fallback logic and components using Jest. Run integration testing on Express routing endpoints.
*   **Priority**: `P2` (Medium)
*   **Dependencies**: Core features finished.
*   **Estimated Complexity**: Medium (3 days).
*   **Files Affected**: `/tests/` directory.
*   **Acceptance Criteria**: Jest test runs pass with code coverage > 70% across utility functions and controllers.

---

## Phase 8 — Production Deployment

### Task ID: `TSK-8.1` — CI/CD Pipeline & Secrets Configuration
*   **Description**: Setup GitHub Actions workflow to run test suites, containerize the application, push images, and deploy updates to Google Cloud Run automatically.
*   **Priority**: `P0` (Critical)
*   **Dependencies**: All phases completed.
*   **Estimated Complexity**: Medium (2 days).
*   **Files Affected**: `.github/workflows/`, backend configurations.
*   **Acceptance Criteria**: Pushing to the production branch builds the container and updates the live service instance with secure environment variables.

---

## 3. Implementation Risks & Mitigations
*   **Risk**: Gemini API token costs scale heavily with large resumes and long interview sessions.
    *   *Mitigation*: Limit user uploads to 5MB, implement rate-limiting middleware, and cache responses where appropriate.
*   **Risk**: High-load requests might block server performance because of parsing CPU usage.
    *   *Mitigation*: Implement request timeouts and move resource-heavy operations to asynchronous workers if latency scales.

---

## 4. Definition of Done (DoD)
Before the **Career Copilot** application is marked ready for production, the following criteria must be satisfied:

1.  **Code Quality**: TypeScript compiles without warnings or errors. No duplicated component styling code in `index.css`.
2.  **Modular Architecture**: Monolithic codebase is refactored into distinct folders (`components`, `controllers`, `services`, `views`).
3.  **Data Persistence**: All features (jobs, solved DSA count, profile configs, roadmaps, interview records) persist in a PostgreSQL database.
4.  **Security**: No API credentials or configuration keys are exposed in the client build. Backend endpoints implement authentication verification.
5.  **Graceful Degradation**: Outages of the Gemini API are handled gracefully, returning clear fallback responses to the user instead of breaking the UI.
6.  **Accessibility**: Maintain WCAG 2.1 AA compliance with proper color contrast ratios, semantic HTML controls, and keyboard navigation.
7.  **Responsive Layout**: Mobile layouts render without elements clipping or running off the screen.
8.  **Automated Coverage**: Test suites cover core logic utilities and API controllers with a success rate of 100%.
