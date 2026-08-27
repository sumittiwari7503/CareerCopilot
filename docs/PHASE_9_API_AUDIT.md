# Phase 9 — API Health Audit

This document inventories all existing backend endpoints, their authorization requirements, request formats, responses, database/AI operations, and error states.

---

## 1. API Endpoints Inventory

### 1.1 Authentication Routes (`/api/auth/*`)

#### POST `/api/auth/signup`
*   **Auth Required**: No
*   **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword",
      "fullName": "Alex Rivera"
    }
    ```
*   **Response Body (200 OK)**:
    ```json
    {
      "session": {
        "access_token": "JWT_STRING",
        "user": { "id": "UUID", "email": "user@example.com", ... }
      }
    }
    ```
*   **Database Operations**: Inserts `User` and transactional `Profile`.
*   **Error States**: `400 Bad Request` if missing fields or duplicate email exists.

#### POST `/api/auth/login`
*   **Auth Required**: No
*   **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword"
    }
    ```
*   **Response Body (200 OK)**: Same as signup.
*   **Database Operations**: Reads `User` details.
*   **Error States**: `400 Bad Request` on invalid email/password mismatch.

---

### 1.2 Profile & Solved Tasks Routes (`/api/profile/*`)

#### GET `/api/profile`
*   **Auth Required**: Yes (Bearer JWT)
*   **Response Body (200 OK)**:
    ```json
    {
      "id": "UUID",
      "userId": "UUID",
      "fullName": "Alex Rivera",
      "targetRole": "Software Developer",
      "targetLevel": "L5",
      "streakDays": 0,
      "dailyScore": 0,
      "easySolved": 0,
      "mediumSolved": 0,
      "hardSolved": 0
    }
    ```
*   **Database Operations**: Reads `Profile` (lazy-creates if missing).

#### PUT `/api/profile`
*   **Auth Required**: Yes (Bearer JWT)
*   **Request Body**:
    ```json
    {
      "fullName": "Alex Rivera",
      "targetRole": "Frontend Specialist",
      "targetLevel": "L5"
    }
    ```
*   **Database Operations**: Updates `Profile`.

#### PUT `/api/profile/dsa`
*   **Auth Required**: Yes (Bearer JWT)
*   **Request Body**:
    ```json
    {
      "easySolved": 12,
      "mediumSolved": 8,
      "hardSolved": 2
    }
    ```
*   **Database Operations**: Updates `Profile` DSA fields (validated non-negative integers).

---

### 1.3 Job Applications Pipeline Routes (`/api/applications/*`)

#### GET `/api/applications`
*   **Auth Required**: Yes (Bearer JWT)
*   **Response Body (200 OK)**: Array of `JobCard` records.

#### POST `/api/applications`
*   **Auth Required**: Yes (Bearer JWT)
*   **Request Body**: `{ title, company, status, priorityFlag, location }`
*   **Response Body (201 Created)**: Created `JobCard`.

#### PUT `/api/applications/:id`
*   **Auth Required**: Yes (Bearer JWT)
*   **Request Body**: `{ status, priorityFlag, ... }`
*   **Database Operations**: Updates user-owned `Application` record.

#### DELETE `/api/applications/:id`
*   **Auth Required**: Yes (Bearer JWT)
*   **Database Operations**: Deletes user-owned `Application` record.

---

### 1.4 AI Services Routes (`/api/ai/*`)

#### POST `/api/ai/generate-roadmap`
*   **Auth Required**: Yes (Bearer JWT)
*   **Request Body**: `{ role, duration, skillLevel }`
*   **AI Operation**: Calls Gemini API to outline structured weeks/months roadmap. Falls back to a procedural roadmap if the API fails.

#### POST `/api/ai/resume-analyze`
*   **Auth Required**: Yes (Bearer JWT)
*   **Request Body**: `{ resumeText, targetRole }`
*   **AI Operation**: Calls Gemini to audit ATS compatibility scores and missing skills with trust checks.

#### POST `/api/ai/mock-interview/question`
*   **Auth Required**: Yes (Bearer JWT)
*   **Request Body**: `{ role, currentQuestion, userAnswer, isEnding }`
*   **AI Operation**: Evaluates answer accuracy and generates follow-up dialog or summary scoring details.

---

### 1.5 Actions & Projects Gaps Routes

#### GET `/api/actions/today`
*   **Auth Required**: Yes (Bearer JWT)
*   **Response Body (200 OK)**: Returns the active `ActionItem` from DB, or creates a new one based on priority metrics.

#### POST `/api/actions/:id/complete`
*   **Auth Required**: Yes (Bearer JWT)
*   **Database Operations**: Marks `ActionItem` status as "Completed".

#### GET `/api/projects/recommendations`
*   **Auth Required**: Yes (Bearer JWT)
*   **Response Body**: Array of `ProjectRecommendation` records.

#### POST `/api/projects/recommendations/generate`
*   **Auth Required**: Yes (Bearer JWT)
*   **AI Operation**: Analyzes gaps and saves 2 advanced blueprints to `ProjectRecommendation`.
