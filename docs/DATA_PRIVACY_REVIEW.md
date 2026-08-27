# Career Copilot — Data Privacy & Retention Review

This document audits what user data is saved, how it is isolated, and data purging behaviors to meet compliance and data safety standards.

---

## 1. User Data Classification

| Data Category | Stored Location | Access Policy | Retention Boundary | Exposure to AI Provider |
| :--- | :--- | :--- | :--- | :--- |
| **Profile Credentials** | Supabase Auth / PostgreSQL | Owner only. Encrypted password hashes. | Deleted immediately upon user delete. | None. |
| **Resume Text** | PostgreSQL | Owner only. Raw extracted text. | Retained while active; version history holds 5 revisions. | Sent as context parameter to Gemini API. |
| **ATS Suggestions** | PostgreSQL | Owner only. JSON feedback objects. | Deleted when corresponding version is deleted. | None. |
| **Job Pipelines** | PostgreSQL | Owner only. Title, company, status. | Deleted immediately when card is deleted. | None. |
| **Interview Logs** | PostgreSQL | Owner only. Question & answer logs. | Sessions logs kept for 1 year, then auto-purged. | Sent as conversational context to Gemini. |

---

## 2. Data Deletion & AI Exposure Policies

*   **GDPR / CCPA "Right to be Forgotten"**: When a user selects "Wipe Profile" or deletes their account, database triggers delete the corresponding record cascade-wise across all tables, immediately purging all profile entries, resume text uploads, roadmap tasks checks, and interview history.
*   **AI Provider Privacy Limits**: Data sent to the Gemini API is processed on the fly using standard API pipelines. No candidate resumes or transcripts are used by default to train public LLM models, maintaining confidentiality.
*   **Token Verification Expirations**: JWT tokens expire after 1 hour, forcing the client client-side to request refreshed tokens from Supabase Auth, preventing unauthorized long-term access.
