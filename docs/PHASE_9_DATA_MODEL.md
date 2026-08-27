# Phase 9 — Data Model Specifications

This document outlines the finalized data models in PostgreSQL via Prisma to support onboarding completion, personalized roadmaps, and daily task trackers.

---

## 1. Profile Model Enhancements

We will append the following fields to the `Profile` model in [`prisma/schema.prisma`](file:///Users/apple/Desktop/careercopilot/prisma/schema.prisma):

```prisma
model Profile {
  id                  String   @id @default(uuid())
  userId              String   @unique
  user                User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  fullName            String
  targetRole          String?  // Software Engineer, Frontend Engineer, etc.
  targetLevel         String?  @default("L5")
  streakDays          Int      @default(0)
  dailyScore          Int      @default(0)
  
  // Solved DSA Counters
  easySolved          Int      @default(0)
  mediumSolved        Int      @default(0)
  hardSolved          Int      @default(0)

  // Onboarding parameters (Phase 9)
  targetCompany       String?
  companyType         String?  // Product Company, Service Company, Startup, etc.
  specialization      String?  // Frontend, Backend, Full Stack, Mobile, Systems, etc.
  experienceLevel     String?  // Student, Fresher, 0-1 years, etc.
  targetTimeline      Int      @default(3) // 1, 2, 3, 4, 6 months
  timeAvailable       String?  @default("2 hours") // 30 min, 1 hour, 2 hours, etc.
  currentSkills       Json     @default("[]") // JSON list of strings
  onboardingCompleted Boolean  @default(false)

  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
}
```

---

## 2. CareerRoadmap Model Enhancement

We will update the `CareerRoadmap` model to store completion statuses (checked checkoffs) of tasks to persist checklist progress.

```prisma
model CareerRoadmap {
  id           String             @id @default(uuid())
  userId       String
  user         User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  title        String
  duration     Int                @default(3)
  skillLevel   String             @default("Beginner")
  createdAt    DateTime           @default(now())
  milestones   RoadmapMilestone[]
  
  // Checked tasks checklist (Phase 9)
  // Maps task identifier strings to booleans: e.g. {"milestoneId-w0-t1": true}
  checkedTasks Json               @default("{}")
}
```

---

## 3. Deletion Cascading & User Isolation
All records will remain bound to the root `User` table, ensuring that executing a user deletion cascading purges all profiles, application pipelines, roadmaps, and checklist items.
