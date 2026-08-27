# Career Copilot — Application & Web Flow

This document maps the user flows, page routing paths, and system states (loading, empty, success, error) for the target **Career Copilot** application.

---

## 1. Application Map

```
[Public Landing Page]
       │
       ├──> [Sign Up] ──> [Onboarding Profile Setup] ──> [Upload Resume] ──> [Initial Analysis]
       │                                                                            │
       └──> [Log In] ───────────────────────────────────────────────────────────────┼──> [Dashboard]
                                                                                    │
   ┌──────────────────────┬──────────────────────┬──────────────────────────────────┴───┬──────────────────────┐
   │                      │                      │                                      │                      │
[Dashboard]          [Roadmap]              [AI Coach]                             [Job Board]            [DSA Tracker]
   │                      │                      │                                      │                      │
   ├── Daily Missions     ├── Timeline Slider    ├── Mock Interview Setup               ├── Kanban Pipelines   ├── Solution Logs
   ├── Skill Gap Sliders  ├── Select Target Role ├── Active Dialogue Panel (STAR Form)  ├── Add Target Modal   └── Difficulty Counts
   └── FAQs / Testimon.   └── Generated Timeline └── Performance Review Summary         └── Delete Card
```

---

## 2. Core User Flows

### 2.1 First-Time User Flow (Onboarding)
*   **Entry Point**: Public Landing Page -> "Get Started" button.
*   **User Action**: Enters Email, Password, Name, and clicks "Register".
*   **System Response**: Checks credentials, registers user, sends verification email, and loads the Onboarding Screen.
*   **User Onboarding Steps**:
    1.  Sets target engineering role and timeline expectations.
    2.  Uploads initial resume file (`.pdf` or `.docx`).
*   **Loading State**: Renders an animated parsing skeleton while the parser extracts resume details.
*   **Success State**: Navigates user to the Dashboard with pre-populated initial skill gaps.
*   **Error State**: File too large or unreadable -> Displays toast notice with instructions to upload a clean file.
*   **Next Action**: Navigates to [Dashboard].

### 2.2 Returning User Flow
*   **Entry Point**: Public Landing Page -> "Log In" link.
*   **User Action**: Submits verified credentials.
*   **System Response**: Verifies JWT signature and redirects user immediately to the Dashboard.
*   **Success State**: Mounts dashboard panels with saved state metrics, streak status, active roadmaps, and tracked jobs.
*   **Empty State**: If the user has not completed onboarding, redirects back to Onboarding.
*   **Next Action**: Interactive Dashboard exploration.

### 2.3 Resume Analysis Flow
*   **Entry Point**: [Roadmap] View -> "Resume ATS Screener" panel.
*   **User Action**: Pastes resume details or uploads a file, then clicks "Submit to Parser".
*   **System Response**: Calls `/api/resume-analyze` with the input parameters.
*   **Loading State**: Disables submit button, showing "AI Screening Resume..." with a pulsing progress spinner.
*   **Success State**: Shows ATS Score Index, compatibility badges, missing keywords, and expandable actionable improvement suggestions.
*   **Error State**: Server connection timeout -> Displays warning alert: *"Connection lost. Falling back to offline local screening recommendations."*
*   **Next Action**: User copies suggestions and edits their source document.

### 2.4 Job Match Flow (Proposed)
*   **Entry Point**: Dashboard or Pipeline -> "Check Job Compatibility" link.
*   **User Action**: Pastes target job description text and submits.
*   **System Response**: Analyzes compatibility metrics of the user's active resume against the job description.
*   **Loading State**: Renders animated loading cards indicating: *"Matching skills... Checking experience thresholds..."*
*   **Success State**: Displays overall matching index (e.g. 78% Match), a list of matching frameworks, missing keywords, and compatibility summary text.
*   **Next Action**: "Save to Pipeline" or "Tailor Resume".

### 2.5 Career Roadmap Flow
*   **Entry Point**: [Roadmap] Navigation tab.
*   **User Action**: Selects target role, adjusts timeline slider (1-6 Months), selects complexity tier, and clicks "Generate AI Roadmap".
*   **System Response**: Calls `/api/generate-roadmap` backend controller.
*   **Loading State**: Spinner animation displaying: *"Mapping milestones... Compiling week-by-week targets..."*
*   **Success State**: Renders a vertical timeline containing months with detailed weeks, task focus descriptions, and checklist elements. Checks saved in local database.
*   **Empty State**: Timeline dashboard shows placeholder card: *"Select target specifications above to generate a custom career roadmap."*
*   **Next Action**: Checking off week milestones.

### 2.6 Mock Interview Flow
*   **Entry Point**: [AI Coach] Tab.
*   **User Action**: Selects target role context and clicks "Initiate Mock Session".
*   **System Response**: Generates the first technical/behavioral question from the LLM.
*   **Dialogue Steps**:
    1.  User reads the question panel.
    2.  User drafts response and clicks "Submit Answer".
    3.  System updates rating indices and generates follow-up question.
    4.  User clicks "End Session" to compile feedback.
*   **Loading State**: Renders bouncing voice waveform lines during API calls.
*   **Success State**: Shows Final Candidate Review Summary (readiness levels, strengths, improvements list).
*   **Next Action**: Exit summary to reset.

### 8.7 Application Tracking Flow
*   **Entry Point**: [Pipeline] Board.
*   **User Action**: Clicks "+" button, enters details in modal, and clicks "Add to Pipeline".
*   **System Response**: Saves entry to user's database portfolio.
*   **Success State**: Appends job card to the selected category (e.g., Wishlist, Applied).
*   **Empty State**: Shows: *"No applications match this category. Click '+' to register targets."*
*   **Next Action**: Click trash icon to delete card, or update card status dropdown.

### 8.8 Settings Flow
*   **Entry Point**: Settings Tab.
*   **User Action**: Alters profile details and Google Level targets, then clicks "Save".
*   **System Response**: Saves updates to DB Profile table and flashes success toast.

### 8.9 Logout Flow
*   **Entry Point**: Sidebar / Top header navigation.
*   **User Action**: Clicks "Logout" button.
*   **System Response**: Wipes client-side JWT authorization credentials, resets Zustand state objects, and redirects back to Landing Page.

---

## 3. Current Application Dead Ends & Improvements

We identified the following problems and redundant steps in the existing prototype that must be eliminated:

1.  **Tab Resetting (Dead End)**: Navigating to Settings, saving changes, and then refreshing the page resets the view back to `home`, forcing the user to navigate back to check if changes were persisted.
    *   *Solution*: Implement URL-based routing (`/dashboard`, `/roadmap`, `/coach`, `/settings`).
2.  **No In-Progress Saving for Interviews (Dead End)**: In the AI Coach, if a user has answered 3 questions and accidentally clicks a sidebar link or switches tabs, the entire active session is wiped, and they must start over.
    *   *Solution*: Store active interview sessions in the database under `InterviewSession` or persist session history in `sessionStorage` so it survives accidental tab changes.
3.  **Manual Page Refreshes for Failures (Dead End)**: If the backend fails during roadmap generation, the page shows an empty state with no retry buttons, forcing the user to manually change selectors to try again.
    *   *Solution*: Add an explicit "Retry Generation" action card when APIs fail.
