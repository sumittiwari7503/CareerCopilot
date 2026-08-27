# Career Copilot — Pre-Refactor Baseline

This document lists the baseline configuration, features, and routing states of the Career Copilot application before starting the stabilization and refactoring phase.

---

## 1. Current Views & Tab Navigation
The application uses tab-based conditional rendering controlled by the `activeTab` React state variable. No external routing libraries (like React Router) are installed or used.

The navigation supports six primary views:
1.  **Home Dashboard (`home`)**: Shows the candidate profile card ("Alex Rivera"), active daily missions checklist, skill gaps graph, accordion FAQs, and user placement testimonials.
2.  **Planning (`roadmap`)**: Contains target role selectors (Frontend, Backend, Fullstack, SDE at Google), timeline duration slider (1-6 months), complexity tier selector, "Generate AI Roadmap" button, week-by-week timeline checklists, and the copy-paste Resume ATS Analyzer text box.
3.  **AI Coach (`coach`)**: The interactive technical/behavioral mock interview portal. Contains target role setup controls, Q&A dialogues panels, voice waveform simulation indicators, live evaluation trackers (rating, confidence), response input forms, and final mock feedback summaries.
4.  **Pipeline (`jobs`)**: The job application tracker list. Includes status filter tabs (All, Wishlist, Applied, Assessment, Interview, Offer), delete icons, and a modal form to add new cards (job title, company, priority status, location).
5.  **DSA Tracker (`tracker`)**: A simple challenge logging sheet with increment buttons (`+1 Easy`, `+1 Medium`, `+1 Hard`) and numeric indicators of solved challenges.
6.  **Settings (`settings`)**: Forms to adjust Profile Full Name, Email Address, and Target Google Level (L3-L6).

---

## 2. Current Features & User Interactions
*   **Daily Mission Checkboxes**: Clicking a mission item checks it off, updates the done counter, and line-throughs the text.
*   **FAQ Accordion**: Clicking an FAQ header expands the card to show the answer, toggling the chevron icon.
*   **Roadmap Generation**: Clicking "Generate AI Roadmap" makes a backend API call, runs a loading spinner, and displays month cards with nested weeks and checklist tasks. Checking week tasks line-throughs the task text.
*   **Resume ATS Analysis**: Clicking "Submit to Parser Screening" sends pasted textarea text to the server, returning a score, compatibility tag, and advice suggestions.
*   **Mock Interview Simulation**: 
    *   Clicking "Initiate Mock Session" generates the first question.
    *   Submitting answers evaluates performance (scores/rate) and pulls the next question.
    *   Clicking "End Session" returns a strengths/improvements review panel.
*   **Job Cards Operations**: Clicking "+" opens a modal overlay. Submitting details adds the card. Clicking the trash icon deletes the card.
*   **DSA Counters**: Clicking any "+1" button increments the corresponding challenge state value by 1.
*   **Profile Save**: Submitting Settings inputs changes the welcome header names in the state.

---

## 3. Current Backend API Endpoints & AI Flows
*   **`POST /api/generate-roadmap`**: Passes `role`, `duration`, and `skillLevel` in JSON. Uses Gemini API with fallback retry loops across three models. If all models fail or the API key is missing, returns local procedural mock arrays.
*   **`POST /api/resume-analyze`**: Passes `resumeText` and `targetRole`. Returns structured ATS scores, compatibility keywords, and action bullet suggestions.
*   **`POST /api/mock-interview/question`**:
    *   *Regular Q&A*: Sends user response text and question logs to evaluate performance and prompt the next question.
    *   *Ending Session*: Set `isEnding: true` to compile candidate strength and improvements matrices.

---

## 4. Current Local State Variables (in `src/App.tsx`)
*   `activeTab`: tab tracking string.
*   `user`: mock user profile object.
*   `targetRole`, `duration`, `skillLevel`: roadmap inputs.
*   `roadmap`: active career plan object.
*   `generatingRoadmap`: loading boolean.
*   `checkedTasks`: checked state map of roadmap items.
*   `resumeText`: pasted resume content string.
*   `isAnalyzingResume`: loading boolean.
*   `analysisResult`: parsed ATS data.
*   `interviewActive`: session state boolean.
*   `currentQuestion`, `userAnswer`, `interviewRole`, `conversationHistory`: interview dialogue states.
*   `isSubmittingAnswer`: loading boolean.
*   `latestEvaluation`: live interview rating indicators.
*   `showSummary`, `interviewSummary`: interview results state.
*   `waveformBars`: numeric array for waveform rendering.
*   `expandedFaq`: ID of the expanded FAQ item.
*   `jobs`: array of active job cards.
*   `showAddJobModal`: modal visibility boolean.
*   `newJob`: modal form data object.
*   `pipelineFilter`: active filter tab.
*   `easySolved`, `mediumSolved`, `hardSolved`: DSA counters.
*   `personalName`, `personalEmail`: profile settings bindings.

---

## 5. Known Bugs & Codebase Issues
*   **Transient Memory state**: Refreshing the browser erases all user changes, resetting jobs, solved DSA questions, and checked roadmap items.
*   **Text-only Resume Parsing**: File uploading is not supported. Users must manually copy/paste plain text.
*   **Direct Tab Rendering Monolith**: Navigating does not update URLs, making page shareability or back button interactions impossible.
