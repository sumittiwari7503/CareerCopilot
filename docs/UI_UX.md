# Career Copilot — UI/UX Design Specification

## 1. Design Direction
The product UI should feel **modern, premium, clean, intelligent, and highly professional**. It must look like an enterprise-grade SaaS application. 

### Visual Guidelines:
*   **Colors**: Dominated by deep dark slates (background), off-whites/light grays (text/surface), and a single primary cobalt blue (accents).
*   **Aesthetics**: Flat designs, crisp borders, and subtle contrast changes. Use restrained, meaningful animations.
*   **Avoid**: High-contrast rainbow gradients, heavy glassmorphism, large unreadable headers, and chaotic layout grids.

---

## 2. Design Principles
*   **Visual Hierarchy**: Crucial stats (streak, pipeline count) are prominent; secondary panels (FAQ, Testimonials) are placed lower or collapsed.
*   **Consistency**: All inputs, select elements, textareas, and buttons share identical padding, borders, border-radius, and focus states.
*   **Progressive Disclosure**: Detailed feedback sections (like ATS parse breakdowns) remain hidden under accordion headers until the user explicitly expands them.
*   **Clear State Feedback**: Every button click, form submission, or slider adjustment must trigger immediate visual cues (spinners, disabled states, or toast notifications).

---

## 3. Design System

### 3.1 Color Palette
To ensure compliance with WCAG AA accessibility rules, colors are mapped to strict contrast minimums:

| Color Role | Color Hex | Contrast Target | Description |
| :--- | :--- | :--- | :--- |
| **Primary (Brand)** | `#2563EB` (Cobalt Blue) | 4.5:1 on background | Accent buttons, active highlights, key metrics. |
| **Secondary** | `#4F46E5` (Indigo) | 4.5:1 on background | Special milestones, secondary highlights. |
| **Background** | `#0B0F19` (Deep Slate) | N/A | Core application background. |
| **Surface (Card)** | `#111827` (Dark Gray) | N/A | Cards, tables, forms, and sidebars. |
| **Text (Primary)** | `#F3F4F6` (Off-white) | 7:1 on surface | Content text, title headers. |
| **Text (Muted)** | `#9CA3AF` (Muted Gray) | 4.5:1 on surface | Sub-labels, captions, placeholder text. |
| **Success** | `#10B981` (Emerald Green) | 4.5:1 on surface | Completed status, high scores, active connections. |
| **Warning** | `#F59E0B` (Amber) | 4.5:1 on surface | Incomplete profile, medium scores, alerts. |
| **Error** | `#EF4444` (Crimson) | 4.5:1 on surface | Missing skills, failed connections, delete actions. |

### 3.2 Typography
*   **Font Family**: `Inter` (Sans-Serif) for all controls, buttons, and body. `JetBrains Mono` (Monospace) for scores, streaks, and numeric values.
*   **Display Header**: `font-size: 1.875rem (30px)`, `font-weight: 700`, `letter-spacing: -0.025em`.
*   **Heading**: `font-size: 1.25rem (20px)`, `font-weight: 600`.
*   **Body**: `font-size: 0.875rem (14px)`, `font-weight: 400`, `line-height: 1.5rem`.
*   **Caption/Muted**: `font-size: 0.75rem (12px)`, `font-weight: 500`.
*   **Button/Label**: `font-size: 0.75rem (12px)`, `font-weight: 700`, `letter-spacing: 0.05em` (uppercase).

### 3.3 Spacing Scale
Uses standard 4px multiples:
`space-1 = 4px` \| `space-2 = 8px` \| `space-3 = 12px` \| `space-4 = 16px` \| `space-6 = 24px` \| `space-8 = 32px`

### 3.4 Borders & Shadows
*   **Border Radius**: Components and modals use `rounded-xl` (12px) or `rounded-2xl` (16px). Input elements use `rounded-lg` (8px).
*   **Shadows**: Use restrained, flat shadows: `shadow-md` (`0 4px 6px -1px rgb(0 0 0 / 0.1)`). Avoid neon glow shadows.

---

## 4. Component Library

### 4.1 Card Component
*   **Resting**: `#111827` surface background, 1px border `rgba(255, 255, 255, 0.05)`, padding 20px, `rounded-2xl`.
*   **Hover**: Border shifts to `rgba(255, 255, 255, 0.12)`, shadow deepens slightly.

### 4.2 Button Component
*   **Primary Accent**: `#2563EB` background, text white, `rounded-xl`, uppercase tracking. Active state scales to `98%` of size.
*   **Secondary Outline**: Transparent background, 1px border `rgba(255, 255, 255, 0.1)`, text white. Hover adds `bg-white/5`.
*   **Disabled**: Opacity `50%`, cursor `not-allowed`.

### 4.3 Loading Skeleton
Instead of simple circular loaders, use pulsing structural bars matching the content card shape.
*   Pulsing animation: `animate-pulse` repeating every 1.5s, shifting background from `bg-white/5` to `bg-white/10`.

---

## 5. Dashboard UX Layout

The landing cockpit is organized around actionable items, avoiding massive visual blocks:

*   **Row 1 (Context)**: Welcome card with streak days and target engineering role context.
*   **Row 2 (Main split)**:
    *   *Left (2/3 width)*: Daily preparation checklist (Missions) and skill gap progress meters.
    *   *Right (1/3 width)*: Quick statistics summary (jobs applied, problems solved) and collapsed accordion FAQ list.

---

## 6. Resume Analysis & Job Match UX

*   **Step 1 (Upload)**: A drag-and-drop file upload target area (highlighting accepted formats: `.pdf` and `.docx`).
*   **Step 2 (Processing)**: Renders a skeleton overlay block mimicking a document outline with horizontal scanning lines.
*   **Step 3 (Breakdown)**: Splitting scores into independent metric charts:
    *   *Keyword score* (missing tech tags).
    *   *Quantification score* (metric checklist).
    *   *Layout score* (universal standard formatting check).
*   **Step 4 (Action)**: Under each issue, provide a side-by-side comparison block containing:
    *   *Weak Bullet Point*: "Managed the database server."
    *   *AI Actionable Rewrite*: "Optimized query response latency by 40% utilizing Redis caching clusters."

---

## 7. Responsive Design

*   **Desktop (1024px and up)**: Left navigation sidebar remains fixed. Content panels are organized in multi-column grids (2/3 split).
*   **Tablet (768px - 1023px)**: Sidebar collapses into a compact icon bar. Metrics stack into two columns.
*   **Mobile (under 768px)**: 
    *   Sidebar is hidden behind a bottom navigation menu bar.
    *   Grids collapse to single columns.
    *   Tables are converted into scrollable card listings.
    *   Tap targets are padded to a minimum of 44px by 44px to prevent fat-finger issues on touchscreens.

---

## 8. Accessibility (WCAG 2.1 AA)
*   **Keyboard Navigation**: Users can navigate the pipeline board, sidebar tabs, and modals using only `Tab` and select elements using `Space` / `Enter`.
*   **Semantic Elements**: All generic click listeners on divs are replaced with standard `<button>` tags.
*   **Focus Ring Indicator**: All interactive items display a `focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2` border outline when tabbed.
*   **Contrast Standards**: All labels use contrast colors matching WCAG AA thresholds on slate.

---

## 9. UX Improvements From Current Product

| View / Element | Current Product (Audited) | Proposed UX Specification (Production) |
| :--- | :--- | :--- |
| **Page Navigation** | Tab state buttons that reset on refresh. | URL-based routing showing active links on sidebar. |
| **Resume Upload** | Paste plain text into raw textarea. | Drag-and-drop file target area. |
| **Pipeline UI** | Vertical text list with delete button. | Kanban Board with draggable cards. |
| **Interview Screen** | Dialogue text box and a separate raw history block. | Immersive chat bubble layout with responsive evaluation panels. |
| **DSA Tracker** | Three isolated numeric increment buttons. | Interactive calendar matrix showing daily challenge logs. |
| **Error Screen** | Red text block with no actions. | Illustrated empty state card with retry triggers. |
