# Career Copilot — User Isolation & Authorization QA

This document logs security verification checks proving that User A's data is isolated from User B, preventing data leaks and unauthorized direct object references.

---

## 1. Direct Object Reference (IDOR) Protection Matrix

| API Path | Attack Scenario Tested | Expected Code | Actual Code | Outcome |
| :--- | :--- | :--- | :--- | :--- |
| `GET /api/profile` | User A calls endpoint with User B session token. | `401 Unauthorized` | `401` | **PASS** |
| `PUT /api/profile/dsa` | User A attempts to update User B's DSA solved counts. | `401/403 Forbidden` | `401` | **PASS** |
| `PUT /api/applications/:id` | User A submits User B's application ID in path parameters. | `404 Not Found` | `404` | **PASS** |
| `DELETE /api/applications/:id`| User A attempts to delete User B's job pipeline card. | `404 Not Found` | `404` | **PASS** |
| `GET /api/applications` | User A fetches applications using a malformed JWT signature. | `401 Unauthorized` | `401` | **PASS** |

*   **Rule of Non-Disclosure (404 instead of 403)**: When User A requests a resource ID that belongs to User B (such as a job application card), the backend controller filters queries by `where: { id, userId: req.user.id }`. If the card does not belong to User A, the query returns `null`, causing the Express server to return `404 Not Found`. This prevents User A from learning if the resource ID exists.

---

## 2. Token Security Validation

*   **Expired JWT Signatures**: Expired tokens fail verification checks inside `auth.ts` and are blocked with a `401` error, forcing the client to renew.
*   **Malformed Authorization Headers**: Authorization headers missing the `Bearer ` prefix or lacking credentials are rejected at the middleware level, protecting controllers.
