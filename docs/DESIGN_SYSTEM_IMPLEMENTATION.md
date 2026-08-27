# Career Copilot — Design System & UI Foundation Implementation

This document details the centralized theme design tokens, reusable UI primitives, and layout variables built to serve as the application's visual foundation.

---

## 1. Design Tokens (Centralized Theme)
Design tokens are declared inside [`src/index.css`](file:///Users/apple/Desktop/careercopilot/src/index.css) as CSS custom variables in the `@theme` directive, aligning with Tailwind v4 standards:

### Theme Colors:
*   `--color-bg-main`: `#0B0F19` (core viewport slate)
*   `--color-surface`: `#111827` (resting cards/sidebars)
*   `--color-surface-elevated`: `#1F2937` (modals/inputs/hover states)
*   `--color-primary-brand`: `#2563EB` (Cobalt blue)
*   `--color-secondary-brand`: `#4F46E5` (Indigo milestones)
*   `--color-text-main`: `#F3F4F6` (high contrast white labels)
*   `--color-text-muted`: `#9CA3AF` (captions/descriptions)

### Theme Radius:
*   `--radius-xs`: `4px`
*   `--radius-sm`: `8px`
*   `--radius-md`: `12px` (standard card/modal curves)
*   `--radius-lg`: `16px`
*   `--radius-xl`: `24px`

---

## 2. Reusable UI Component Primitives

Created the following atomic components under [`src/components/ui/`](file:///Users/apple/Desktop/careercopilot/src/components/ui):
1.  **[`Button`](file:///Users/apple/Desktop/careercopilot/src/components/ui/Button.tsx)**: Implements variants (primary, secondary, outline, ghost, destructive) with loading indicators, disabled triggers, and focus ring outlines.
2.  **[`Card`](file:///Users/apple/Desktop/careercopilot/src/components/ui/Card.tsx)**: Unified card containers (default, elevated, compact, interactive).
3.  **[`Input`](file:///Users/apple/Desktop/careercopilot/src/components/ui/Input.tsx)** / **[`Textarea`](file:///Users/apple/Desktop/careercopilot/src/components/ui/Textarea.tsx)** / **[`Select`](file:///Users/apple/Desktop/careercopilot/src/components/ui/Select.tsx)**: Standardized text, text-block, and drop-down fields. Include label alignment, helper feedback labels, and validation error outlines.
4.  **[`Badge`](file:///Users/apple/Desktop/careercopilot/src/components/ui/Badge.tsx)**: Standard color chips.
5.  **[`Score`](file:///Users/apple/Desktop/careercopilot/src/components/ui/Score.tsx)**: Numeric score parser that splits indices into badges, descriptive compatibility levels, and secondary bar progress graphs.
6.  **[`Skeleton`](file:///Users/apple/Desktop/careercopilot/src/components/ui/Skeleton.tsx)** / **[`Spinner`](file:///Users/apple/Desktop/careercopilot/src/components/ui/Spinner.tsx)**: Core loading modules.
7.  **[`EmptyState`](file:///Users/apple/Desktop/careercopilot/src/components/ui/EmptyState.tsx)**: Illustrated empty-lists indicator explaining context and offering call-to-actions.
8.  **[`ErrorState`](file:///Users/apple/Desktop/careercopilot/src/components/ui/ErrorState.tsx)**: User-friendly error alert displaying safe comments without code stack traces.

---

## 3. Accessibility & Responsive Changes
*   **Semantic Inputs**: Labels are bound to inputs using generated `id` fields (`htmlFor` matching input elements).
*   **Visual Focus Rings**: Added outline offset rings (`focus:ring-2 focus:ring-[#2563EB]/40`) on tab-focus cycles.
*   **Tactile Targets**: Clickable items scale down on active touch (`active:scale-95`) and are padded to support touchscreen targets.

---

## 4. Verification Results & Duplicated Styles
*   Identified inline cards and repeated selector input classes. We are prepared to apply these primitives in the next step to clean up all feature pages.
*   **TypeScript Checks**: `npm run lint` compiles cleanly (0 errors).
*   **Vite packing check**: `npm run build` succeeds (Vite static assets bundle written successfully).
