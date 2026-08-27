# Career Copilot — Production Bugs Triage

This document logs bugs found during manual QA and user journey testing, classified by severity (P0 to P3).

---

## Active Bugs Log

| Bug ID | Screen | Problem Description | Severity | Fix Status | Recommended Action |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `BUG-01` | **Global App** | Native scrollbars render briefly during initial skeleton hydration loads on Safari. | `P3` (Polish) | `MONITORED` | Add `-webkit-overflow-scrolling: touch` style parameters to CSS containers. |
| `BUG-02` | **AI Coach** | Waveform canvas can experience visual clipping if the window is resized aggressively during active dialogue. | `P3` (Polish) | `MONITORED` | Add debounce handlers on the window resize listener. |

---

## Validation Summary
*   **P0 (Critical / Security)**: **0 Active**.
*   **P1 (Major Features)**: **0 Active**.
*   **P2 (Important UX)**: **0 Active**.
*   **P3 (Polish)**: **2 Monitored**.
