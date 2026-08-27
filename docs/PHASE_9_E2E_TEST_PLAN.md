# Phase 9 — End-to-End Test Plan

This document outlines the validation script required to verify all user onboarding, plan generation, and persistence triggers.

---

## 1. Automated Test Script Steps

### Test Scenario: `E2E-Goal-Setup`
1.  **Register Account**: Create a user account (`email: test-p9@example.com`, `password: password123`).
2.  **Verify Setup UI**: Confirms landing redirection opens the full-screen onboarding questionnaire, hiding the sidebar layout.
3.  **Onboarding Inputs Selection**:
    *   *Role*: Software Engineer
    *   *Specialization*: Backend
    *   *Company*: Target Company
    *   *Company Type*: Product
    *   *Experience*: Fresher
    *   *Time Available*: 2 hours/day
    *   *Timeline*: 4 months
    *   *Skills*: JavaScript, React, Node.js, SQL
    *   *Resume*: Skip for now
4.  **Confirm Generation**: Click "Generate Plan". Check that Express creates a `CareerRoadmap` with exactly 4 milestones and 16 weeks of content in PostgreSQL.
5.  **Dashboard CTA**: Redirects to the Dashboard. Today's action card must appear with high priority action items.
6.  **Complete Action**: Click "Complete Action". Reload the dashboard and verify that the completion status is preserved.
7.  **Check plan persistence**: Navigate to the "Career Plan" tab. Confirm it renders the 16-week plan.
8.  **Session persistence**: Log out of the account, log back in, and verify that the exact same 16-week plan, checked checkbox state, and completed action items are loaded.
9.  **Plan Update**: Change target role in the settings. Verify the prompt "Your target goal changed. Update your plan?" displays and updates the plan.
10. **Resume Gap Personalization**: Paste a resume. Verify that the ATS profile analysis results are generated and that the skill gaps are updated to match missing resume keywords.
