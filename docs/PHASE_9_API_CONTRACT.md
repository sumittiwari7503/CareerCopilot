# Phase 9 — API Contract Specifications

This document outlines the detailed HTTP request/response payloads, authentication criteria, and HTTP response codes.

---

## 1. REST Endpoint Specifications

### 1.1 `GET /api/profile`
*   **Auth Required**: Yes (JWT Bearer Token)
*   **Response (200 OK)**:
    ```json
    {
      "id": "UUID",
      "userId": "UUID",
      "fullName": "Alex Rivera",
      "targetRole": "Software Engineer",
      "targetCompany": "Google",
      "companyType": "Product Company",
      "specialization": "Backend",
      "experienceLevel": "Fresher",
      "targetTimeline": 4,
      "timeAvailable": "2 hours",
      "currentSkills": ["JavaScript", "React", "Node.js", "SQL"],
      "onboardingCompleted": true,
      "easySolved": 0,
      "mediumSolved": 0,
      "hardSolved": 0
    }
    ```
*   **Error Codes**:
    *   `401 Unauthorized`: Token is missing, expired, or signature is invalid.
    *   `500 Internal Error`: Database read exception.

---

### 1.2 `PUT /api/profile`
*   **Auth Required**: Yes (JWT Bearer Token)
*   **Request Body**:
    ```json
    {
      "fullName": "Alex Rivera",
      "targetRole": "Software Engineer",
      "targetCompany": "Google",
      "companyType": "Product Company",
      "specialization": "Backend",
      "experienceLevel": "Fresher",
      "targetTimeline": 4,
      "timeAvailable": "2 hours",
      "currentSkills": ["JavaScript", "React", "Node.js", "SQL"],
      "onboardingCompleted": true
    }
    ```
*   **Response (200 OK)**: Updated Profile object.
*   **Error Codes**:
    *   `400 Bad Request`: Validation failure (e.g. empty targetRole, invalid timeline type).
    *   `401 Unauthorized`: Invalid credentials.

---

### 1.3 `GET /api/career-plan`
*   **Auth Required**: Yes (JWT Bearer Token)
*   **Response (200 OK)**: Retrieves the active persistent roadmap.
    ```json
    {
      "id": "UUID",
      "title": "Software Engineer Prep Roadmap",
      "duration": 4,
      "skillLevel": "Fresher",
      "checkedTasks": { "milestoneId-w0-t1": true },
      "milestones": [
        {
          "id": "UUID",
          "monthNo": 1,
          "title": "Month 1: Core Fundamentals",
          "weeksData": [
            {
              "weekNumber": 1,
              "weekTitle": "Week 1: Programming Fundamentals",
              "focus": "Mastering baseline syntax",
              "tasks": ["Read MDN docs", "Solve 5 array problems"]
            }
          ]
        }
      ]
    }
    ```
*   **Response (404 Not Found)**:
    ```json
    { "error": "Career plan not found. Please generate one." }
    ```

---

### 1.4 `POST /api/career-plan/generate`
*   **Auth Required**: Yes (JWT Bearer Token)
*   **Request Body**: `{}` (Loads data directly from the user's saved Profile to ensure consistency).
*   **Response (201 Created)**: Returns newly compiled and saved `CareerRoadmap` model structure.
*   **Error Codes**:
    *   `400 Bad Request`: Onboarding not completed.
    *   `500 Internal Error`: AI generation or Zod parsing failure.

---

### 1.5 `GET /api/career-plan/today`
*   **Auth Required**: Yes (JWT Bearer Token)
*   **Response (200 OK)**: Retrieves or lazy-compiles today's prioritized `ActionItem`.
*   **Error Codes**: Same as standard profile endpoints.

---

### 1.6 `PUT /api/roadmap/:id/tasks`
*   **Auth Required**: Yes (JWT Bearer Token)
*   **Request Body**:
    ```json
    {
      "checkedTasks": {
        "milestoneId-w0-t1": true
      }
    }
    ```
*   **Response (200 OK)**: Updated `checkedTasks` object.
*   **Error Codes**:
    *   `400 Bad Request`: Invalid payload format or non-boolean values.
    *   `404 Not Found`: Roadmap not found or does not belong to the user.

---

### 1.7 `POST /api/actions/:id/complete`
*   **Auth Required**: Yes (JWT Bearer Token)
*   **Response (200 OK)**:
    ```json
    {
      "id": "UUID",
      "status": "Completed"
    }
    ```
*   **Error Codes**:
    *   `404 Not Found`: Action item not found or does not belong to the user.
