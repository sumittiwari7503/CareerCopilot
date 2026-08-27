# Phase 9 — Functional Product Audit

This document records the results of auditing every user-facing button, form, and page interaction to verify functional accuracy and flag placeholders or broken triggers.

---

## 1. Interaction Quality Auditing Logs

### 1.1 Auth Screen
*   **Action**: "Enter Dashboard" (Login Form Submit)
    *   *Expected Behavior*: Submits credentials to Express database, retrieves JWT, and renders user context.
    *   *Actual Behavior*: Works. Bypasses mock auth when keys are absent.
    *   *API Called*: `POST /api/auth/login`
    *   *Status*: `200 OK`
*   **Action**: "Register Account" (Signup Form Submit)
    *   *Expected Behavior*: Saves User and relational Profile to PostgreSQL, returns credentials session.
    *   *Actual Behavior*: Works.
    *   *API Called*: `POST /api/auth/signup`
    *   *Status*: `200 OK`

---

### 1.2 Dashboard Screen
*   **Action**: "Complete Action" (Action Card primary trigger)
    *   *Expected Behavior*: Toggles status of today's action item in PostgreSQL database and hydrates a new prioritized action immediately.
    *   *Actual Behavior*: Works.
    *   *API Called*: `POST /api/actions/:id/complete`
    *   *Status*: `200 OK`
*   **Action**: "FAQ Accordion Click"
    *   *Expected Behavior*: Expands target question context, collapsing previous open ones.
    *   *Actual Behavior*: Works (handled locally in React state).

---

### 1.3 Career Plan Screen
*   **Action**: "Generate Career Plan"
    *   *Expected Behavior*: Sends chosen Target Role, Seniority, and Preparation Timeline options to Gemini AI to generate a week-by-week planner.
    *   *Actual Behavior*: Works. Falls back to a high-quality procedural roadmap if Gemini fails.
    *   *API Called*: `POST /api/ai/generate-roadmap`
*   **Action**: "Scan Resume" (ATS Parser Submit)
    *   *Expected Behavior*: Analyzes candidate skills and layout rules using Gemini, returning structured evidence evaluations.
    *   *Actual Behavior*: Works.
    *   *API Called*: `POST /api/ai/resume-analyze`
*   **Action**: "Generate Projects" (Gap-Closing Projects)
    *   *Expected Behavior*: Calls Gemini to analyze gaps and recommend custom project specs.
    *   *Actual Behavior*: Works.
    *   *API Called*: `POST /api/projects/recommendations/generate`
*   **Action**: "Task Checkbox Click"
    *   *Expected Behavior*: Toggles milestone checklist tasks, updating progress indicators.
    *   *Actual Behavior*: Works (saved locally in client states, needs DB persistence).

---

### 1.4 Interview Coach Screen
*   **Action**: "Start Session"
    *   *Expected Behavior*: Initiates mock interview screen and queries Gemini for the first target-role question.
    *   *Actual Behavior*: Works.
    *   *API Called*: `POST /api/ai/mock-interview/question`
*   **Action**: "Submit Answer"
    *   *Expected Behavior*: Submits speech response text, evaluates pacing/accuracy, and renders the next question.
    *   *Actual Behavior*: Works.
    *   *API Called*: `POST /api/ai/mock-interview/question`
*   **Action**: "End Interview"
    *   *Expected Behavior*: Summarizes the conversation history, lists strengths/weaknesses, and closes active session.
    *   *Actual Behavior*: Works.
    *   *API Called*: `POST /api/ai/mock-interview/question` (with `isEnding: true`)

---

### 1.5 Job Tracker Screen
*   **Action**: "Add Application" (Modal Form Submit)
    *   *Expected Behavior*: Adds a tracked job card to PostgreSQL pipeline.
    *   *Actual Behavior*: Works.
    *   *API Called*: `POST /api/applications`
*   **Action**: "Delete Job Card"
    *   *Expected Behavior*: Removes card from PostgreSQL database.
    *   *Actual Behavior*: Works.
    *   *API Called*: `DELETE /api/applications/:id`

---

### 1.6 Profile Screen
*   **Action**: "Exit Setup" (Sign Out)
    *   *Expected Behavior*: Purges cookies, local storage sessions, and redirects user to Auth onboarding screen.
    *   *Actual Behavior*: Works.
