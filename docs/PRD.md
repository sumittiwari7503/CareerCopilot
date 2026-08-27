# Career Copilot — Product Requirements Document

## 1. Product Overview
*   **What it is**: **Career Copilot** is an AI-powered career growth platform that acts as a personalized coach, helping tech professionals optimize their resumes, map their skill progression, track their application pipelines, and practice mock technical and behavioral interviews.
*   **Who it serves**: Software engineers, product managers, designers, data scientists, and other tech professionals at different career phases.
*   **Core Problem**: Landing a job in the competitive tech market is disjointed. Candidates are forced to jump between different tools to analyze resumes (ATS checkers), find skill gaps, build roadmaps, practice coding/behavioral questions, and track applications (spreadsheets).
*   **Product Vision**: To unify the tech job preparation lifecycle into a single, cohesive, AI-guided hub that transforms candidates from raw applicants into placement-ready professionals.
*   **Product Mission**: To democratize elite career coaching by providing highly personalized, real-time AI benchmarks, structured plans, and interactive feedback loops.

---

## 2. Target Users

### Persona 1: The Recent Graduate (Emily)
*   **Role**: Entry-level Software Engineer.
*   **Context**: Graduated with a Computer Science degree but lacks real-world experience. Needs help building projects, identifying standard industry skill gaps, and preparing for entry-level code screenings.
*   **Core Need**: Structured roadmaps to go from academic Java/C++ to production web frameworks, and a high-pacing mock interviewer to build confidence.

### Persona 2: The Career Switcher (David)
*   **Role**: Transitioning from Marketing to UX Design.
*   **Context**: Completed a UX bootcamp. Has transferable skills but a resume that doesn't pass recruiters' automated ATS screeners for design roles.
*   **Core Need**: Keyword optimization suggestions for UX/UI terms, project roadmap guidance, and behavioral mock interviews to bridge the background gap.

### Persona 3: The Experienced Professional (Sarah)
*   **Role**: L5 Senior Frontend Engineer.
*   **Context**: Has 6 years of industry experience. Aims to land an L6 Staff Engineer position at a FAANG company.
*   **Core Need**: High-level system design mock interviews, advanced performance metrics optimization on their resume, and highly customized scale engineering milestones.

---

## 3. Problem Statement
Users face significant challenges across the job preparation and career planning lifecycle:
*   **Resumes**: Hard to know if a resume matches a target job. Rejections happen silently without constructive feedback.
*   **ATS Optimization**: Most companies use Applicant Tracking Systems (ATS) that automatically screen out candidates if key terminology or structure is missing.
*   **Job Discovery & Matching**: Scanning job descriptions is time-consuming; candidates often apply to roles where they are underqualified or overqualified.
*   **Skill Gaps**: Identifying what specific skills are holding a candidate back from their target level (e.g. L4 vs L5) is speculative.
*   **Interview Preparation**: Standard question banks are static and don't provide real-time interactive feedback on pacing, confidence, and STAR structure.
*   **Career Planning**: Traditional roadmaps are generic and fail to adjust to the candidate's exact deadline or current skill baseline.
*   **Application Tracking**: Keeping tabs on active pipelines in generic sheets is manual, hard to organize, and lacks smart follow-up prompts.

---

## 4. Product Goals
*   **Optimize ATS Compatibility**: Increase users' resume match scores by providing contextual keyword suggestions and rewrite rules.
*   **Shorten Prep Times**: Provide customized weekly milestones that focus exclusively on a candidate's actual skill gaps.
*   **Deliver Highly Realistic Mock Interviews**: Simulate live engineering manager screens with dynamic, context-aware follow-up questions.
*   **Centralize the Prep Workflow**: Replace sheets, copy-pasting, and disjointed web checkers with a single integrated pipeline.

---

## 5. Non-Goals
*   **Direct Job Placement**: Career Copilot does not guarantee job offers or function as a staffing agency.
*   **General Non-Tech Careers**: The initial versions focus strictly on Tech fields (Software Engineering, Product Management, Data, UX Design).
*   **Direct Video/Audio Call Streaming**: The mock interviewer will not handle live WebRTC video/audio feeds in the MVP; interaction is text/dictation-based.

---

## 6. Core Features

### 6.1 Dashboard (Home)
*   **Career Health Overview**: A unified cockpit displaying streaks, daily progress scores, and active pipeline statuses.
*   **Daily Missions Checklist**: Custom generated preparation checklist (e.g., "Solve 3 DP questions," "Refine resume experience metrics") to gamify prep.
*   **Skill Competency Gap**: Interactive metric bars comparing current skills to target level benchmarks.

### 6.2 Resume Intelligence (Proposed)
*   **File Upload Support [Proposed]**: Allow uploading `.pdf` and `.docx` resumes (replaces the current copy-paste text area).
*   **ATS Analysis & Scorer**: Dynamic compatibility score (0-100) and feedback categorizing formatting, quantification gaps, and keyword match rates.
*   **Section Optimization**: Real-time suggestions to rewrite weak bullet points (e.g., transforming passive descriptions into active metrics).

### 6.3 Job Match (Proposed)
*   **Role Compatibility Score [Proposed]**: Input a target job description and evaluate compatibility against the user's parsed resume.
*   **Gap Mapping [Proposed]**: Highlights explicit experience, keyword, or framework mismatches.

### 6.4 Career Roadmap
*   **Dynamic Plan Generation**: Select target roles, duration timeline (1-6 months), and complexity levels to build customized milestone paths.
*   **Interactive Task Board**: Checklist items for each week that save completion states.

### 6.5 Interview Copilot
*   **Active Mock Dialogues**: Real-time Q&A stream evaluating candidate inputs.
*   **Candidate Summary Feedback**: High-quality reports summarizing readiness levels, overall scores, candidate strengths, and growth pathways.

### 6.6 Application Tracker
*   **Kanban Board Pipeline**: Track jobs under Wishlist, Applied, Assessment, Interview, Offer, and Rejected.
*   **Reminder Alerts [Proposed]**: Automated notifications to follow up on applications.

---

## 7. User Stories

### User Story 1: ATS Screening (David)
*   **As a** career switcher,
*   **I want to** upload my resume and compare it against a target job description,
*   **so that** I can identify the specific keywords and metrics I need to add to pass the automated resume filters.

### User Story 2: Timeline Customization (Emily)
*   **As a** busy recent graduate,
*   **I want to** generate a career preparation roadmap restricted strictly to a 3-month timeline,
*   **so that** I can prepare efficiently before my upcoming graduation recruitment cycle begins.

### User Story 3: Realistic Interviewing (Sarah)
*   **As an** experienced engineer,
*   **I want to** practice a mock interview session where the AI asks follow-up questions based on my previous answers,
*   **so that** I can practice answering complex architectural questions dynamically.

---

## 8. Functional Requirements

### 8.1 Resume Upload & Parse (Proposed)
*   **Input**: PDF or DOCX file (Max 5MB).
*   **Processing**: Server extracts raw text and structure. Parses sections (Experience, Skills, Education).
*   **Output**: Renders parsed details and structure back to the UI.
*   **Validation**: File must be of correct type and readable.
*   **Error Behavior**: Shows readable warning if PDF is encrypted, corrupted, or too large.
*   **Permissions**: Only the logged-in owner can access or parse their resume.
*   **Dependencies**: Backend file-parsing utility.

### 8.2 Resume ATS Analysis
*   **Input**: Parsed resume text, target role context.
*   **Processing**: AI evaluates ATS scoring schema (keywords, formatting, metrics).
*   **Output**: Returns ATS Score, Compatibility Text, missing keywords array, and suggestion objects.
*   **Validation**: Input text must be at least 100 characters.
*   **Error Behavior**: Gracefully falls back to mock procedural analysis if Gemini API fails or times out.
*   **Permissions**: Owned by the authenticated user.
*   **Dependencies**: Gemini API connection.

### 8.3 Career Roadmap Planning
*   **Input**: Target role, duration in months (1-6), skill level (Beginner/Intermediate).
*   **Processing**: AI builds a weekly schedule matching the exact months selected.
*   **Output**: Structured JSON containing roadmap details, milestone months, and weeks containing checklist tasks.
*   **Validation**: Month must be in 1-6 range.
*   **Error Behavior**: Graceful fallback to client-side procedural roadmap.
*   **Permissions**: Authenticated user.
*   **Dependencies**: Gemini API.

### 8.4 Interview Dialogue Session
*   **Input**: Target job role, user answer text.
*   **Processing**: Evaluate userAnswer using hiring manager parameters, return rating, confidence score, explanation, and next question.
*   **Output**: Evaluation scores and next question on UI.
*   **Validation**: User answer must not be empty.
*   **Error Behavior**: Returns mock interview dialogue parameters on connection failure.
*   **Permissions**: Authenticated user.
*   **Dependencies**: Gemini API client.

### 8.5 Application tracker (Jobs pipeline)
*   **Input**: Title, Company, Status, Priority Flag, Location.
*   **Processing**: Adds application object to user pipeline database table.
*   **Output**: Updates Kanban pipeline view.
*   **Validation**: Title and Company fields are required.
*   **Error Behavior**: Rejects empty strings with toast notices.
*   **Permissions**: Authenticated user.
*   **Dependencies**: Database.

---

## 9. Non-Functional Requirements
*   **Performance**: Core page load under 1.5s. API response latency under 300ms. AI calls must complete under 8s (with visual loading indicators in the UI).
*   **Security**: All API keys must remain strictly in backend environment variables. User database tables must implement row-level security (RLS) to prevent cross-account leakages.
*   **Scalability**: DB schema design and indexing must support up to 10,000 active users without degraded query performance.
*   **Reliability**: Application must implement graceful fallbacks for all AI endpoints to ensure a functional client experience during transient outages.
*   **Accessibility**: Maintain WCAG 2.1 AA compliance (contrast, semantic HTML structure, aria-labels, and tab focus states).
*   **SEO**: Include standard metadata description, title tags, and OG parameters in the static entrypoint.
*   **Privacy**: GDPR/CCPA compliance regarding the deletion of uploaded resumes. User can completely wipe their profile.
*   **Observability**: Centralized backend logs tracking API latency, Gemini model fallbacks, and validation errors.

---

## 10. AI Requirements
*   **AI Use Cases**: Resume ATS analysis, Dynamic week-by-week roadmap generation, Interactive mock interview Q&A evaluation, Candidate feedback compilation.
*   **Context Passed to AI**: Target role, complexity tier, duration, previous conversation logs, parsed resume metrics.
*   **Prompt Requirements**: Instructions must strictly demand JSON matching schema parameters. Emphasize constructive tech recruiter persona.
*   **Structured Output**: Enforce system schemas at the API gateway level using the `@google/genai` library definitions.
*   **Validation**: Every AI output must be parsed via a backend validator before returning to the UI to intercept half-formed JSON or malformed structures.
*   **Fallback Behavior**: Use local fallback modules if all model tries fail.
*   **Token/Cost considerations**: Limit system instruction sizes and candidate text lengths. Cache common templates.

---

## 11. Success Metrics
*   **Onboarding Completion**: Percentage of users who complete profile setup and upload a resume (> 80%).
*   **Resume Analysis Completion**: Average score increase after applying suggestion recommendations.
*   **Job Match Engagement**: Number of compatibility checks run per session.
*   **Interview Preparation Usage**: Completion rate of initiated mock interview sessions (> 70%).
*   **Retention**: Weekly active users returning to check off roadmap milestones.

---

## 12. MVP vs Future Features

| Module | MVP (Current + Fallbacks) | V1 (Proposed Production-Ready) | V2 & Future |
| :--- | :--- | :--- | :--- |
| **Auth** | Mock user "Alex Rivera" | Email/Password & Google OAuth | Multi-member Org Accounts |
| **Resume** | Copy-paste plain text area | PDF/DOCX file upload, section parser | Direct editing of bullet points |
| **Pipeline** | Memory state card board | PostgreSQL persistent Kanban board | Auto-syncing from LinkedIn/Indeed |
| **AI Coach** | Text-based mock dialogue | Context-aware (uses resume + target job) | Voice dictation & speech evaluation |
| **Roadmap** | Local state checkboxes | Database saved milestone states | Integration with online courses |
