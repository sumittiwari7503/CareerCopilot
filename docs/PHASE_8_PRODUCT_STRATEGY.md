# Phase 8 — Product Strategy Audit

This document audits the strategic goals, competitive differentiators, and value propositions of **Career Copilot** to guide its transition into a comprehensive AI Career Operating System.

---

## 1. Competitive Analysis & Current Capabilities

### What Career Copilot Currently Does:
*   Generates customized month-by-month timelines based on target engineering roles, timelines, and difficulty settings.
*   Scans pasted resume text to generate an ATS compatibility score, formatting alerts, and keyword recommendations.
*   Conducts technical and behavioral mock interview screens with rating checkpoints, pacing indicators, and transcript logging.
*   Tracks job applications in pipeline columns and logs solved DSA challenge counts.

### Existing Competitors:
*   **Job Pipeline Tracking**: *Teal*, *Huntr* (provide visual dashboards and browser clip extensions).
*   **Resume ATS Screening**: *Jobscan*, *Resume Worded* (provide strict keyword match checks).
*   **Interview Preparation**: *Google Interview Warmup*, *Interviewing.io* (interactive chat dialogue or live coach matching).
*   **Career Timeline Roadmapping**: *roadmap.sh* (static charts showing technology paths).

### Generic Functionality:
*   Basic copy-paste text ATS keyword checkers (which feel like generic ChatGPT prompt wrappers).
*   Manual pipeline card entry.
*   Standard increment buttons for LeetCode solved counts.

---

## 2. Strategic Differentiators (The Career Operating System)

Rather than forcing users to jump between isolated tools, Career Copilot's key value is the **Closed Career Intelligence Loop**. The system synthesizes data across all modules to tell the user: **"What should I do next?"**

```
                     [Candidate Resume]
                             │
                             ▼
     [Target Role] ──> [Gap Analysis] ──> [Today's Action: Project Recommendation]
                             │
                             ▼
    [Closed Skill Loop] <── [Mock Interview Practice] ──> [Job Pipeline Tracking]
```

### Genuine Differentiators to Build:
1.  **Context-Aware Career Profile**: A single, structured JSON context object that stores candidate experience, parsed skills, target companies, mock interview metrics, and active pipeline statuses. 
2.  **Evidence-Based Resume Intelligence**: The parser never fabricates metrics. It flags recommendations as *Existing Evidence*, *Missing Evidence*, *Weak Evidence* (lacking numbers), or *Unsupported Claims*.
3.  **Gap-Closing Project Recommendation Engine**: Instead of suggesting generic tasks (e.g. "Build a to-do app"), the system recommends projects designed to bridge specific resume gaps (e.g., "Build a TypeScript API using Vitest testing because your target senior roles expect testing evidence").
4.  **Daily Career Action Card**: A single, high-priority dashboard widget recommending a 15-minute task derived from real profile data.

### Features NOT to Build (Out of Scope):
*   **Generic Conversational Chatbot**: Chatbots add cognitive load and dump walls of text. We prefer structured, inline forms.
*   **Fake Job Listings**: Scraping job listings duplicates existing search engines. We focus strictly on preparing candidates for roles they have already identified.
*   **Social Career Feeds**: Leads to clutter and reduces focus.
