# Phase 8 — Database Schema Result

This document records the finalized schema structure and PostgreSQL table alterations completed to support Career Copilot's product intelligence.

---

## 1. Schema Modifications Details

Two new models were added to [`prisma/schema.prisma`](file:///Users/apple/Desktop/careercopilot/prisma/schema.prisma):

```
┌──────────────┐          ┌──────────────────────┐
│  ActionItem  │◄─────────│         User         │─────────►│ ProjectRecommendation │
└──────────────┘          └──────────────────────┘          └───────────────────────┘
```

### 1.1 ActionItem Table
Stores actionable candidate prepare tasks.
*   `id`: Primary key (UUID).
*   `userId`: Foreign key -> `User.id` (ON DELETE CASCADE).
*   `title` (String), `description` (String).
*   `priority` (String, default "Medium"): "High" | "Medium" | "Low".
*   `status` (String, default "Pending"): "Pending" | "Completed".
*   `source` (String): E.g., "Resume", "DSA", "Roadmap".
*   `estimatedMinutes` (Int, default 15).
*   `impactText` (String).
*   `tasks` (Json, default "[]"): Stringified checklist arrays.

### 1.2 ProjectRecommendation Table
Stores customized projects targeting candidate gaps.
*   `id`: Primary key (UUID).
*   `userId`: Foreign key -> `User.id` (ON DELETE CASCADE).
*   `title` (String), `description` (String).
*   `techStack` (String[], default []).
*   `difficulty` (String, default "Medium"): "Beginner" | "Intermediate" | "Advanced".
*   `resumeValue` (String).
*   `deliverables` (String[], default []).
*   `interviewPrep` (String[], default []).
*   `sourceGap` (String).
*   `status` (String, default "Recommended").

---

## 2. Integrity Verification
*   **Cascading purges**: Validated that executing a User deletion cascades cleanly, purging all associated `ActionItem` and `ProjectRecommendation` records.
*   **Security Scoping**: Verified that queries are filtered strictly by `where: { userId }` using the decoded JWT user UUID.
