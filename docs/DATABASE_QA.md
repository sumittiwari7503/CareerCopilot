# Career Copilot — Database Persistence QA

This document records the persistence verification logs for relational PostgreSQL database CRUD operations, confirming that user state is successfully saved and restored.

---

## 1. Feature Persistence Verification Matrix

| Target Feature | Test Scenario | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Profile** | Modify candidate name and target seniority level. Refresh browser. | State retains newly updated parameters. | Persisted in `Profile` table. | **PASS** |
| **DSA Tracker** | Increment solved easy, medium, and hard counters. Refresh browser. | Counts remain at incremented values. | Saved to database; synced on login. | **PASS** |
| **Applications** | Add a priority job card. Drag/alter status. Delete card. | Card list updates. Survives page reload. | CRUD mapped successfully in Postgres. | **PASS** |
| **Resume Analysis** | Paste resume text. Submit ATS parse. Reload page. | Score index and action suggestion bullets persist. | Mapped in client cache, ready for Phase 2. | **PASS** |
| **Career Roadmap** | Choose role, generate months milestone timeline. Check off week tasks. | Timeline structure and checklist checks persist. | Roadmap checklist states loaded on refresh. | **PASS** |
| **Interview Coach** | Start mock interview, submit answers. End session. | Compilation report (strengths/improvements) saved. | Q&A dialogue logs verified in DB. | **PASS** |

---

## 2. Session Persistence Validation

*   **Browser Reload Test**: Active session token is verified on every reload. The client UI mounts a secure full-page loading placeholder until the Supabase auth listener returns the resolved user object and fetches the database records. No mock placeholder data flashes.
*   **Logout -> Login Cycle Test**: Logging out successfully clears the local session memory state. Logging back in using verified credentials fetches the isolated records from PostgreSQL.
