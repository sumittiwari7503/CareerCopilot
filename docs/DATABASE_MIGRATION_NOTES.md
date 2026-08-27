# Career Copilot — Database Migration Notes (DSA Persistence)

This document outlines the preparation and database changes required to persist DSA challenge counts on the user profile as approved.

---

## 1. Migration Specification

To persist solved DSA challenges (`easySolved`, `mediumSolved`, `hardSolved`) directly on the `Profile` model, we will add three integer columns.

### Profile Table Prisma Schema Addition:
```prisma
model Profile {
  id           String   @id @default(uuid())
  userId       String   @unique
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  fullName     String
  targetRole   String?
  targetLevel  String?  @default("L5")
  streakDays   Int      @default(0)
  dailyScore   Int      @default(0)
  
  // Solved DSA Counters (Added)
  easySolved   Int      @default(0)
  mediumSolved Int      @default(0)
  hardSolved   Int      @default(0)
  
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

### PostgreSQL Raw DDL Command:
```sql
ALTER TABLE "Profile" 
  ADD COLUMN "easySolved" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "mediumSolved" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "hardSolved" INTEGER NOT NULL DEFAULT 0;

-- Constraint check to ensure values can never be negative
ALTER TABLE "Profile"
  ADD CONSTRAINT chk_easy_solved_non_negative CHECK ("easySolved" >= 0),
  ADD CONSTRAINT chk_medium_solved_non_negative CHECK ("mediumSolved" >= 0),
  ADD CONSTRAINT chk_hard_solved_non_negative CHECK ("hardSolved" >= 0);
```

---

## 2. Input Validation (API Gateway Layer)
Before performing updates, the backend validation middleware (using Zod) must verify that incoming values are non-negative integers:

```typescript
import { z } from "zod";

export const updateDsaCountersSchema = z.object({
  easySolved: z.number().int().nonnegative(),
  mediumSolved: z.number().int().nonnegative(),
  hardSolved: z.number().int().nonnegative(),
});
```

---

## 3. UI State Coordination
To make the application ready for database persistence while keeping frontend and backend logic isolated, the DSA tracker state bindings will be prepared as follows:
*   Instead of calling `setEasySolved(prev => prev + 1)` in-line inside visual buttons, the component will trigger a centralized handler `updateDsaCount(difficulty, count)` or via a custom hook `useDSA()`.
*   When database connectivity is introduced in Phase 2, this centralized handler will execute API PATCH calls to `/api/profile/dsa` to update the database, keeping visual components unchanged.
