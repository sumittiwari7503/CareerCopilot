# Phase 9 — Onboarding Flow Design

This document specifies the UX guidelines, steps, and options for the full-screen onboarding experience.

---

## 1. Visual Presentation Rules
*   **Full Screen Experience**: The onboarding wizard must take over the screen, hiding the sidebar layout navigation until target goals are committed and the plan is successfully initialized.
*   **No Clutter**: Use clean, spacious typography, high-contrast inputs, and a visible progress bar indicator (e.g. `Step 4 of 9`).
*   **Explicit Action Triggers**: Every screen features explicit `Continue` or `Skip for now` options.
*   **Loading State**: During the final submission, the UI displays a clear spinning overlay:
    ```text
    "Creating your personalized preparation plan..."
    ```

---

## 2. Onboarding Wizard Steps

```
[Start]
  │
  ├── Step 1: Target Role ─────────► (SE, FE, BE, DevOps, Custom...)
  │
  ├── Step 2: Target Company ──────► (Google, Microsoft, Accenture, Startup...)
  │
  ├── Step 3: Company Type ────────► (Product Company, Service Company, Startup...)
  │
  ├── Step 4: Specialization ──────► (Frontend, Backend, Mobile, Systems...)
  │
  ├── Step 5: Experience Level ────► (Student, Fresher, 0-1 yrs, 1-2 yrs, 3+ yrs)
  │
  ├── Step 6: Current Skills ──────► (Select tags: JS, React, SQL, Python...)
  │
  ├── Step 7: Time Available ──────► (30 min, 1 hour, 2 hours, 3 hours, 4+ hours)
  │
  ├── Step 8: Target Timeline ─────► (1, 2, 3, 4, 6 months)
  │
  └── Step 9: Resume (Optional) ───► (Upload PDF / paste text or [Skip for now])
        │
  [Generate Plan] ───► Writes to DB ───► Redirects to Dashboard
```

### Step 9 details (Resume Optionality):
*   Features a large toggle: `Have a resume?`
*   Option 1: Paste/Upload text to bind ATS recommendations.
*   Option 2: `Skip for now` button. The onboarding profile saves `onboardingCompleted = true` and proceeds to plan compilation immediately.
