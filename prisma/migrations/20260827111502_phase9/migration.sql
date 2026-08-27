-- AlterTable
ALTER TABLE "CareerRoadmap" ADD COLUMN     "checkedTasks" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "companyType" TEXT,
ADD COLUMN     "currentSkills" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "experienceLevel" TEXT,
ADD COLUMN     "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "specialization" TEXT,
ADD COLUMN     "targetCompany" TEXT,
ADD COLUMN     "targetTimeline" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "timeAvailable" TEXT DEFAULT '2 hours';
