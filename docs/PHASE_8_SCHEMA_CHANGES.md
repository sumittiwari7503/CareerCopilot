# Phase 8 — Data Schema Changes

This document proposes minimal, high-impact modifications to the database schema (`prisma/schema.prisma`) to support closed-loop career actions and personalized project recommendations.

---

## 1. Proposed Schema Models

```mermaid
erDiagram
    User ||--o[ ActionItem : has
    User ||--o[ ProjectRecommendation : receives
```

### 1.1 ActionItem Model
Tracks executable milestones and micro-tasks generated to close candidate skill gaps.

| Field Name | Data Type | Nullability | Constraints / Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `UUID` | Non-Null | Primary Key, `uuid()` | Unique task ID. |
| `userId` | `UUID` | Non-Null | Foreign Key -> `User.id` (ON DELETE CASCADE) | Owner reference. |
| `title` | `VARCHAR(100)` | Non-Null | None | E.g. "Build a Vitest API". |
| `description` | `TEXT` | Non-Null | None | Detailed context. |
| `priority` | `VARCHAR(10)` | Non-Null | "Medium" (High/Medium/Low) | Priority level. |
| `status` | `VARCHAR(20)` | Non-Null | "Pending" (Pending/Completed) | Completion status. |
| `estimatedMinutes`| `INTEGER` | Non-Null | `15` | Expected time commitment. |
| `impactText` | `VARCHAR(255)` | Non-Null | None | E.g. "React testing evidence ↑". |
| `tasks` | `JSONB` | Non-Null | `[]` | Nested tasks checklist array. |
| `createdAt` | `TIMESTAMP` | Non-Null | `now()` | Date generated. |

### 1.2 ProjectRecommendation Model
Stores customized project specifications recommended to bridge gaps.

| Field Name | Data Type | Nullability | Constraints / Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `UUID` | Non-Null | Primary Key, `uuid()` | Unique project ID. |
| `userId` | `UUID` | Non-Null | Foreign Key -> `User.id` (ON DELETE CASCADE) | Owner reference. |
| `title` | `VARCHAR(100)` | Non-Null | None | Project name. |
| `description` | `TEXT` | Non-Null | None | Project overview. |
| `techStack` | `VARCHAR(100)[]`| Non-Null | `[]` | Suggested tools. |
| `difficulty` | `VARCHAR(20)` | Non-Null | "Medium" | Beginner/Intermediate/Advanced. |
| `resumeValue` | `TEXT` | Non-Null | None | Expected impact description. |
| `createdAt` | `TIMESTAMP` | Non-Null | `now()` | Date generated. |

---

## 2. Model Deletion & Ownership Security
*   **Cascading Deletes**: Both `ActionItem` and `ProjectRecommendation` records reference `userId` and use `onDelete: Cascade` to ensure that deleting a user account immediately purges all associated recommendations and actions from PostgreSQL.
*   **Row-Level Isolation**: Access policies mandate filtering all queries by the authenticated user ID (`where: { userId: req.user.id }`).
