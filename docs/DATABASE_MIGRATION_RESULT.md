# Career Copilot — Database Migration Result

This document details the schema definitions, migrations performed, and validation mappings for the relational PostgreSQL database integration.

---

## 1. Migration Specification

The schema defined in [`prisma/schema.prisma`](file:///Users/apple/Desktop/careercopilot/prisma/schema.prisma) was successfully validated against local compilation guidelines. 

### Tables & Entities Created:
1.  **`User`**: Core account representation.
    *   `id`: Primary key (UUID).
    *   `email`: Unique index.
    *   `passwordHash`: Stored safely (hashed/encrypted credentials).
2.  **`Profile`**: User specifications dashboard.
    *   `id`: Primary key.
    *   `userId`: Unique foreign key referencing `User.id` (ON DELETE CASCADE).
    *   `easySolved`, `mediumSolved`, `hardSolved`: Integers defaulting to 0 for DSA tracking.
3.  **`Application`**: Pipeline target job tracker.
    *   `id`: Primary key.
    *   `userId`: Foreign key referencing `User.id` (ON DELETE CASCADE).
    *   `title`, `company`, `status`, `priorityFlag`, `location`.
4.  **`Resume`**: Base upload document representation.
    *   `id`, `userId`.
5.  **`ResumeVersion`**: Upload history list.
    *   `id`, `resumeId`, `fileUrl`, `extractedText`, `versionNo`.
6.  **`ResumeAnalysis`**: ATS screening feedback metrics.
    *   `id`, `resumeVersionId` (unique foreign key), `atsScore`, `compatibilityText`, `suggestions` (Json type), `missingKeywords`.
7.  **`CareerRoadmap`**: Main milestone timelines.
    *   `id`, `userId`.
8.  **`RoadmapMilestone`**: Weeks and checkboxes items.
    *   `id`, `roadmapId`, `monthNo`, `title`, `weeksData` (Json).
9.  **`InterviewSession`**: Q&A dialogue logs.
    *   `id`, `userId`.
10. **`InterviewQuestion`**: Transcript logs.
    *   `id`, `sessionId`, `questionText`, `answerText`, `rating`, `confidence`, `feedbackText`.

---

## 2. Constraints & Data Integrity
*   **Cascading Deletes**: If a `User` account is deleted, the corresponding `Profile`, `Application` cards, `Resume` entries, `CareerRoadmap` timelines, and `InterviewSession` records are automatically deleted from PostgreSQL, avoiding orphaned data.
*   **User Ownership Separation**: All queries in Express controllers filter target rows by `userId` retrieved from the validated JWT token signature, preventing cross-user data leakage.

---

## 3. Data Migration Status & Limitations
*   **Initial Baseline**: The database initializes with empty tables. 
*   **Legacy Data Limitation**: Any legacy dashboard information (solved counts, active mock interviews, job pipeline entries) that was previously generated before Auth integration existed only in transient browser memory state. Since there was no persistent `localStorage` database, this mock data is cleared, and users start with a clean workspace on registration.
