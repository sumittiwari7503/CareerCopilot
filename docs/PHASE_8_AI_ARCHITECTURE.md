# Phase 8 — AI Architecture & Trust Model

This document establishes the architecture for secure, schema-validated, and hallucination-free AI content orchestration.

---

## 1. Reusable AI Orchestration Pattern

To prevent unstructured outputs, hanging responses, or prompt injections, all intelligence features follow this pipeline:

```
[User SQL Data] ──> [Context Builder] ──> [Prompt Compiler] ──> [Gemini API Client]
                                                                        │
[UI Updates] <── [DB Save] <── [Zod Schema & Evidence Check] <── [JSON Output]
```

### Flow Step Checklist:
1.  **Context Builder**: Gathers profile data (target role, parsed skills, DSA counts) from verified PostgreSQL tables. No raw client parameters are trusted directly.
2.  **Prompt Compiler**: Merges context variables into system prompt templates.
3.  **Gemini Client**: Makes API calls using structured JSON schemas.
4.  **Schema Validation**: The backend parses the raw JSON string and runs it through a **Zod validator** to ensure all required fields are present.
5.  **Evidence Validation (Anti-Hallucination)**: Scans generated text to guarantee the AI has not invented metrics or skills not present in the user's uploaded documents.
6.  **Persistence**: Writes validated output objects directly to database tables. The AI *never* initiates raw SQL mutations.

---

## 2. AI Trust Model (Fact vs. Inference)

To maintain user trust, all generated insights must clearly differentiate between facts, logical deductions, and recommendations:

*   **Fact (Direct Evidence)**: Verified data points present in the user's profile (e.g. *"Your resume lists React and Redux"*).
*   **Inference (Deduction)**: Contextual deductions based on target role parameters (e.g. *"The target Backend Developer role lists SQL optimization. Your profile does not contain SQL database metrics"*).
*   **Recommendation (Action Plan)**: Executable suggestions to bridge the gap (e.g. *"Add a Node.js project demonstrating PostgreSQL index optimization"*).

---

## 3. Anti-Hallucination Guardrails
The prompt templates enforce the following rules:
1.  **Zero Fabrication**: The AI must never invent candidate achievements, dates, grades, past companies, or project details.
2.  **Explicit Scoping**: If evidence is missing for a target technology, the response must state: *"Evidence not found in profile context"*, rather than suggesting a fabricated role description.
3.  **Double-Blind Check**: A secondary backend utility verifies that the recommended technologies in action plans map back to identified target role gaps.
