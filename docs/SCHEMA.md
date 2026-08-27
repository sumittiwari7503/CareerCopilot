# Career Copilot — Data Schema Specification

## 1. Current Schema
*   **Current State**: **Not Implemented**.
*   There is no database schema or connection configuration currently in the repository. All application data (jobs, profile settings, solved DSA challenge counts, active roadmaps, checked tasks) exists in ephemeral React memory state. Reloading the browser clears all data.

---

## 2. Proposed Database Schema
This design maps out a normalized relational database schema built for **PostgreSQL** utilizing **Prisma ORM** syntax.

```mermaid
erDiagram
    User ||--|| Profile : has
    User ||--o| Resume : uploads
    User ||--o[ JobMatch : runs
    User ||--o[ Skill : has
    User ||--o[ SkillGap : has
    User ||--o[ Application : tracks
    User ||--o[ InterviewSession : conducts
    User ||--o[ CareerRoadmap : builds

    Resume ||--o[ ResumeVersion : maintains
    ResumeVersion ||--|| ResumeAnalysis : generates
    
    Application ||--o[ ApplicationNote : contains
    InterviewSession ||--o[ InterviewQuestion : contains
    InterviewQuestion ||--o[ InterviewAnswer : receives
    CareerRoadmap ||--o[ RoadmapMilestone : contains
```

### 2.1 User Entity
Tracks user registration credentials and login sessions.

| Field Name | Data Type | Nullability | Constraints / Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `UUID` | Non-Null | Primary Key, `gen_random_uuid()` | Unique user identifier. |
| `email` | `VARCHAR(255)` | Non-Null | Unique constraint | Verified login email. |
| `passwordHash`| `VARCHAR(255)` | Non-Null | None | Encrypted password string. |
| `createdAt` | `TIMESTAMP` | Non-Null | `now()` | Timestamp of signup. |
| `updatedAt` | `TIMESTAMP` | Non-Null | `now()` | Timestamp of profile updates. |

### 2.2 Profile Entity
Saves general career target configurations.

| Field Name | Data Type | Nullability | Constraints / Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `UUID` | Non-Null | Primary Key | Profile record ID. |
| `userId` | `UUID` | Non-Null | Foreign Key -> `User.id` (ON DELETE CASCADE) | Owner reference. |
| `fullName` | `VARCHAR(100)` | Non-Null | None | User's full name. |
| `targetRole` | `VARCHAR(100)` | Nullable | None | E.g., "Senior Frontend Engineer". |
| `targetLevel` | `VARCHAR(10)` | Nullable | "L5" | Candidate seniority level target. |
| `streakDays` | `INTEGER` | Non-Null | `0` | Daily study streak count. |
| `dailyScore` | `INTEGER` | Non-Null | `0` | Calculated prep metric (0-100). |

### 2.3 Resume Entity
Tracks the base resume metadata.

| Field Name | Data Type | Nullability | Constraints / Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `UUID` | Non-Null | Primary Key | Resume record ID. |
| `userId` | `UUID` | Non-Null | Foreign Key -> `User.id` | Owner reference. |
| `title` | `VARCHAR(100)` | Non-Null | "My Resume" | Name of the document. |
| `createdAt` | `TIMESTAMP` | Non-Null | `now()` | Date created. |

### 2.4 ResumeVersion Entity
Tracks revisions of a resume. Storing files in version hierarchies allows comparison of past analyses.

| Field Name | Data Type | Nullability | Constraints / Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `UUID` | Non-Null | Primary Key | Version record ID. |
| `resumeId` | `UUID` | Non-Null | Foreign Key -> `Resume.id` | Base reference. |
| `fileUrl` | `TEXT` | Non-Null | None | URL of file in cloud storage bucket. |
| `extractedText`| `TEXT` | Non-Null | None | Extracted raw text content. |
| `versionNo` | `INTEGER` | Non-Null | `1` | Sequence tracking number. |
| `createdAt` | `TIMESTAMP` | Non-Null | `now()` | Upload date. |

### 2.5 ResumeAnalysis Entity
Saves structured ATS metrics compiled by the Gemini API.

| Field Name | Data Type | Nullability | Constraints / Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `UUID` | Non-Null | Primary Key | Analysis record ID. |
| `resumeVersionId` | `UUID` | Non-Null | Foreign Key -> `ResumeVersion.id` | Version reference. |
| `atsScore` | `INTEGER` | Non-Null | None | Overall index (0-100). |
| `compatibilityText`| `TEXT` | Non-Null | None | AI summary text. |
| `suggestions` | `JSONB` | Non-Null | `[]` | Actionable bullet improvement lists. |
| `missingKeywords`| `VARCHAR(100)[]` | Non-Null | `[]` | List of missing keywords. |
| `createdAt` | `TIMESTAMP` | Non-Null | `now()` | Generation timestamp. |

### 2.6 Application Entity
Tracks application cards inside the pipeline board.

| Field Name | Data Type | Nullability | Constraints / Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `UUID` | Non-Null | Primary Key | Application ID. |
| `userId` | `UUID` | Non-Null | Foreign Key -> `User.id` | Owner reference. |
| `title` | `VARCHAR(100)` | Non-Null | None | Target job title. |
| `company` | `VARCHAR(100)` | Non-Null | None | Company name. |
| `status` | `VARCHAR(20)` | Non-Null | "Wishlist" | Board column status. |
| `priorityFlag` | `BOOLEAN` | Non-Null | `false` | Highlight check. |
| `location` | `VARCHAR(100)` | Nullable | "Remote" | Workplace arrangement. |
| `appliedDate` | `TIMESTAMP` | Nullable | None | Date applied. |
| `createdAt` | `TIMESTAMP` | Non-Null | `now()` | Creation timestamp. |

### 2.7 CareerRoadmap Entity
Saves active week-by-week goals.

| Field Name | Data Type | Nullability | Constraints / Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `UUID` | Non-Null | Primary Key | Roadmap ID. |
| `userId` | `UUID` | Non-Null | Foreign Key -> `User.id` | Owner reference. |
| `title` | `VARCHAR(100)` | Non-Null | None | Target career roadmap title. |
| `duration` | `INTEGER` | Non-Null | `3` | Expected prep months. |
| `skillLevel` | `VARCHAR(20)` | Non-Null | "Beginner" | User skill baseline. |
| `createdAt` | `TIMESTAMP` | Non-Null | `now()` | Creation timestamp. |

### 2.8 RoadmapMilestone Entity
Saves milestones and weeks within a roadmap.

| Field Name | Data Type | Nullability | Constraints / Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `UUID` | Non-Null | Primary Key | Milestone ID. |
| `roadmapId` | `UUID` | Non-Null | Foreign Key -> `CareerRoadmap.id` | Roadmap reference. |
| `monthNo` | `INTEGER` | Non-Null | None | Index of month in roadmap. |
| `title` | `VARCHAR(100)` | Non-Null | None | Month milestone theme description. |
| `weeksData` | `JSONB` | Non-Null | `[]` | Weeks, tasks, and task completed states. |

### 2.9 InterviewSession Entity
Saves active dialogue details.

| Field Name | Data Type | Nullability | Constraints / Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `UUID` | Non-Null | Primary Key | Session ID. |
| `userId` | `UUID` | Non-Null | Foreign Key -> `User.id` | Owner reference. |
| `roleContext` | `VARCHAR(100)` | Non-Null | None | Interview target engineering role. |
| `overallScore` | `INTEGER` | Nullable | None | Score generated at completion. |
| `readinessLevel`| `VARCHAR(20)` | Nullable | None | E.g. "Strong", "Needs Improvement". |
| `strengths` | `TEXT[]` | Nullable | None | Array of candidate strengths. |
| `improvements` | `TEXT[]` | Nullable | None | Array of candidate growth pathways. |
| `createdAt` | `TIMESTAMP` | Non-Null | `now()` | Session creation date. |

### 2.10 InterviewQuestion & Answer Entity
Saves dialog loops within active interviews.

| Field Name | Data Type | Nullability | Constraints / Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `UUID` | Non-Null | Primary Key | Question ID. |
| `sessionId` | `UUID` | Non-Null | Foreign Key -> `InterviewSession.id` | Session reference. |
| `questionText` | `TEXT` | Non-Null | None | The question asked by AI. |
| `answerText` | `TEXT` | Nullable | None | User's raw text response. |
| `rating` | `INTEGER` | Nullable | None | AI accuracy score (0-100). |
| `confidence` | `VARCHAR(20)` | Nullable | None | Speech rate/pacing description. |
| `feedbackText` | `TEXT` | Nullable | None | Constructive evaluation feedback. |

---

## 3. Data Ownership & Security

### Row-Level Isolation
To ensure strict security and user data isolation, database queries must enforce ownership bounds. For example, using **PostgreSQL Row-Level Security (RLS)**:
```sql
ALTER TABLE "Profile" ENABLE ROW LEVEL SECURITY;
CREATE POLICY profile_user_isolation ON "Profile" 
    USING (userId = auth.uid());
```
Any query passing through Prisma or native drivers must explicitly match the verified JWT user token `id`.

---

## 4. Data Retention Policy
*   **Resume Files**: Retained as long as the user account remains active. Deleted versions are purged from storage buckets 30 days after replacement.
*   **AI Analysis Records**: Retained indefinitely to track candidate compatibility score growth over time.
*   **Interview Logs**: History retained for 1 year, allowing users to review past mock evaluations before purging.

---

## 5. Migration Strategy

Since there is currently no database, early adopters might have configuration setups or list details saved in local storage memory (mock states).

### Strategy for Hydrating database:
1.  **Client-Side Check**: During login or registration, the frontend checks `localStorage` for legacy data (e.g. `career_copilot_jobs`, `career_copilot_dsa_count`).
2.  **Payload Submission**: If legacy data exists, the client sends a POST request payload containing the data to `/api/user/migrate`.
3.  **Database Hydration**: The server checks the target profile, populates the respective `Application` and `Profile` tables, and returns confirmation.
4.  **Local Wipe**: The client receives a success response and safely clears the legacy keys from `localStorage` to avoid duplicate migrations.
