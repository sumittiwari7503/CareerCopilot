# Career Copilot — UI Redesign Audit

This document records the visual audit of the current application interface across desktop and mobile screens, identifying inconsistencies and mapping out UX corrections.

---

## 1. UI Audit Matrix

| ID | Screen | Problem Description | Severity | Recommended Solution |
| :--- | :--- | :--- | :--- | :--- |
| `AUD-01` | **App Shell** | Sidebar active tabs use outline borders that create duplicate boundaries. Mobile bottom navigation icons are tightly packed without focus zones. | `P1` (Major) | Simplify active tab styles using a left vertical accent bar and background fill. Pad mobile bottom targets to 44px. |
| `AUD-02` | **Dashboard** | Card-heavy grid ("everything is a rounded rectangle"). Lacks a unified "Career Health" summary and a clear, dominant "Recommended Next Action" card. | `P1` (Major) | Rebuild Dashboard layout to establish visual hierarchy. Introduce a top-level Career Health metric card and a prominent Next Action trigger. |
| `AUD-03` | **Resume** | Plain text area copy-paste. Analysis output returns a wall of JSON text without action-oriented rewrite options. | `P1` (Major) | Replace textarea with a clean file-parsing indicator. Restructure suggestions into clear "Finding -> Why it matters -> Recommendation -> Action" cards. |
| `AUD-04` | **Roadmap** | Week tasks checkmarks are basic boxes. Timeline lacks clear milestone status tracking. | `P2` (Polish) | Use the new custom checkbox design, add milestone status badges, and improve vertical spacing of timelines. |
| `AUD-05` | **AI Coach** | Waveform lines bounce but the response inputs and rating cards are generic blocks. Results page displays unpolished bullet points. | `P1` (Major) | Build an immersive chat bubble view for the Q&A log. Refactor final summary reports into styled lists of strengths and growth pathways. |
| `AUD-06` | **Pipeline** | Standard vertical list cards with basic filter buttons instead of a structured pipeline view. | `P1` (Major) | Rebuild as a professional Kanban layout on desktop, collapsing into a clean staged sequence list on mobile. |
| `AUD-07` | **DSA** | Diff-colored counter blocks look like a student project. Solved metrics are plain numeric text. | `P2` (Polish) | Integrate solved counters into a clean circular graph and use styled outline increment buttons. |
| `AUD-08` | **Profile** | Unstyled inputs that look like standard admin CRUD forms. | `P3` (Minor) | Standardize layout spacing, grouping fields into Personal, Career, and Preferences containers. |
| `AUD-09` | **Auth** | Generic gradients and unaligned inputs. | `P1` (Major) | Redesign login card using theme variables. Emphasize security, simplicity, and clear validation messages. |
