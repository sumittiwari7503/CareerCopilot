# Career Copilot — Existing Product Audit

This document summarizes the current state of the **Career Copilot** application based on an audit of the repository files, code architecture, and functionality. It lists critical problems, bugs, and design debt categorized by severity.

---

## Prioritized Severity System
*   **P0 (Critical)**: Blocks production readiness, causes immediate data loss, or poses severe security risks.
*   **P1 (High)**: Major architectural bottlenecks, poor maintainability, or broken core features.
*   **P2 (Medium)**: Suboptimal user experiences, layout responsiveness issues, or lack of proper user feedback.
*   **P3 (Low)**: Minor visual adjustments, hardcoded static text, or minor refactors.

---

## 1. Product Audit

### What the Application Currently Does
*   **Main Dashboard (`home`)**: Shows a mock welcome banner for "Alex Rivera" (streak days, daily score), a list of mock daily missions, skill competency gap sliders, hardcoded FAQs, and hardcoded placement testimonials.
*   **Multi-Month Prep Planning (`roadmap`)**: Allows selecting target roles (Frontend, Backend, Fullstack, SDE at Google), a duration slider (1–6 months), and complexity tiers (Beginner, Intermediate). Generates a week-by-week roadmap using Gemini or procedural mocks. 
*   **Live Resume ATS Screener**: Textarea to copy-paste resume text for analysis. Returns an ATS score, compatibility text, missing keywords, and suggestions.
*   **AI Active Mock Interlocutor (`coach`)**: Runs an interactive chat-based interview for selected roles. Scores responses on accuracy/confidence/speech rate and presents candidate strengths/weaknesses at the end.
*   **Job Pipeline Tracker (`jobs`)**: A basic list to add target jobs (title, company, status, priority status) and filter by status.
*   **DSA Tracker (`tracker`)**: Standard buttons to increment counts of Easy, Medium, and Hard solved problems.
*   **Candidate Settings (`settings`)**: Forms to edit Candidate Name, Email, and Target Google Level (L3-L6).

### Audit Findings & Gaps

| Severity | Category | Description | Status |
| :--- | :--- | :--- | :--- |
| **P0** | Data Loss | **Zero Data Persistence**: All user modifications (pipeline jobs, solved DSA count, checked roadmap milestones, profile settings) exist only in local React state. Reloading or navigating away wipes out all data. | **Critically Broken** |
| **P0** | Authentication | **No Authentication**: The application serves a single mock user ("Alex Rivera") with no registration, login, session validation, or multi-tenancy separation. | **Not Implemented** |
| **P1** | Core UX | **Resume Text Paste Only**: No support for file uploads (`.pdf`, `.docx`). Users must manually paste plain text into a textarea, losing formatting and structure. | **Missing Feature** |
| **P1** | Navigation | **No Router**: The app uses conditional tab rendering. Refreshing the browser resets the view back to the dashboard, and deep linking to features is impossible. | **Design Debt** |
| **P2** | Forms | **Missing Form Validation**: Users can add blank job pipeline entries, submit empty resume analysis forms, or register invalid settings. | **Product Gap** |
| **P2** | Logic | **DSA Tracker Simplicity**: The DSA tracker is just three simple counter buttons. There is no logs history, integration with platforms (LeetCode), or topic categorization. | **Product Gap** |

---

## 2. UI/UX Audit

### Visual Quality & Design Problems
*   **Dashboard Aesthetics**: The interface relies on dark slate panels and generic neon borders. It looks like a hobbyist dashboard rather than a premium, modern SaaS platform.
*   **Layout & Hierarchy**: The main panel is heavily loaded. The dashboard presents FAQs, testimonials, skill gaps, and missions all in one massive column on desktop.
*   **Responsiveness**: Mobile layouts stack components vertically, but navigation bars and multi-column forms compress tightly, leading to visual clipping on smaller viewports.
*   **Empty and Loading States**: While we added fallback states, there are no loading skeletons for elements like roadmaps or resume analysis. The app just shows a spinning border during API calls.
*   **Accessibility**: Major interactive elements (like checklist tasks and modal close buttons) are built using generic divs/spans instead of semantic HTML buttons. There are no focus outlines, ARIA roles, or screen reader parameters.

---

## 3. Engineering Audit

### Architecture & Code Problems

| Severity | Category | Description | Status |
| :--- | :--- | :--- | :--- |
| **P1** | Maintainability | **Monolithic Frontend**: `src/App.tsx` contains 1180+ lines of code, managing state for 6 different views, rendering complex layouts, controlling modals, and executing API calls. | **Design Debt** |
| **P1** | Backend | **Hardcoded Server Port**: Express server in [server.ts](file:///Users/apple/Desktop/careercopilot/server.ts) hardcoded the port to `3000` (which we patched to support `process.env.PORT` to allow cloud deployments). | **Resolved** |
| **P1** | Database | **No DB Config**: No database adapter, schema, or connection libraries (Prisma, Mongoose, PostgreSQL) exist in the repository. | **Not Implemented** |
| **P2** | State | **Transient App State**: App state is not centralized (e.g., Redux or Zustand). Deeply nested components (if modularized) would suffer from excessive prop-drilling. | **Design Debt** |

---

## 4. AI & Integration Audit

### AI Capabilities & Prompts
*   **Prompts**: Prompts are declared as inline strings in [server.ts](file:///Users/apple/Desktop/careercopilot/server.ts). They are functional but lack version control or systematic dynamic context assembly.
*   **Structured Output**: Uses `@google/genai` schema validation (JSON Schema) which is excellent and guarantees JSON shapes.
*   **API Resilience**: Includes a robust fallback mechanism `generateContentWithFallback` that retries failing calls across three different Gemini models (`gemini-3.5-flash`, `gemini-3.1-flash-lite`, `gemini-flash-latest`).
*   **AI Validation Gaps**: The backend does not validate if the parsed resume text is actually a resume, or if the mock interview answers are relevant to the questions asked. It will blindly attempt to score any text.
*   **Context Gaps**: The interview coach prompt does not take into account the user's uploaded resume, target company, or previous performance history when asking questions. It generates isolated, generic questions.
