# Phase 8 — Implementation Plan

This document establishes the feature prioritizations, estimated complexities, and acceptance criteria for Phase 8.

---

## 1. Feature Prioritization Matrix

| Feature | Priority | User Value | Complexity | Target Screen |
| :--- | :--- | :--- | :--- | :--- |
| **Today's Career Action Card** | `P0` | High (Clear next steps) | Medium | Dashboard |
| **Evidence-Based Resume Checker**| `P0` | High (Reliable feedback) | High | Resume Page |
| **Gap-Closing Project Engine** | `P1` | High (Actionable plans) | High | Roadmap Page |
| **Context-Aware Career Profile** | `P0` | High (Seamless UX) | Medium | Settings/Profile |

---

## 2. Selected Features Specifications

### Feature: Today's Career Action Card (`TSK-8.1`)
*   **User Problem**: Candidates look at dashboards and wonder, "What should I do *right now* to make progress?"
*   **User Value**: Reduces choice fatigue by recommending one high-impact, 15-minute task.
*   **Technical Complexity**: Medium. Requires database query filters matching incomplete checklist items.
*   **Data Requirements**: Active checklist tasks, target role parameters.
*   **AI Requirements**: Evaluates profile gaps to compile a single daily recommendation.
*   **UX Requirements**: Displayed as a primary, prominent card at the top of the Home Dashboard.
*   **Dependencies**: Database profile sync.
*   **Risks**: Suggesting redundant or repeating actions.
*   **Acceptance Criteria**: Displays one clear action card. Checking it off updates the completed counts.

---

### Feature: Evidence-Based Resume Checker (`TSK-8.2`)
*   **User Problem**: Generic ATS checks fabricate suggestions or give vague advice.
*   **User Value**: Tells the user exactly where their resume lacks proof of experience.
*   **Technical Complexity**: High. Requires prompting Gemini with structured schemas.
*   **Data Requirements**: User resume text, target role keywords.
*   **AI Requirements**: Forces output schemas to classify items as *Existing Evidence*, *Missing Evidence*, or *Unsupported Claims*.
*   **UX Requirements**: Side-by-side comparative views in the Resume tab.
*   **Dependencies**: Gemini client setup.
*   **Risks**: False alarms on valid experiences because of syntax phrasing.
*   **Acceptance Criteria**: Parsing a CV generates suggestions divided into structured evidence categories.

---

### Feature: Gap-Closing Project Engine (`TSK-8.3`)
*   **User Problem**: Generic advice says "build a todo app," which doesn't impress hiring managers.
*   **User Value**: Recommends advanced projects designed to prove skills the candidate lacks.
*   **Technical Complexity**: High.
*   **Data Requirements**: Identified skill gaps, target companies, and technologies.
*   **AI Requirements**: Generates complete project templates containing tech stack, deliverables, and interview study topics.
*   **UX Requirements**: Rendered under the Roadmap tab as expandable action cards.
*   **Dependencies**: Skill gap analysis database sync.
*   **Acceptance Criteria**: Recommends 3 detailed projects targeting the user's specific skill gaps.
