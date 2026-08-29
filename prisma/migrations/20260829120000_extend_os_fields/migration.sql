-- AlterTable
ALTER TABLE "Profile" ADD COLUMN "careerProfile" JSONB DEFAULT '{}';
ALTER TABLE "Profile" ADD COLUMN "dsaProblems" JSONB DEFAULT '[]';
ALTER TABLE "Profile" ADD COLUMN "readinessHistory" JSONB DEFAULT '[]';

-- AlterTable
ALTER TABLE "Application" ADD COLUMN "meta" JSONB DEFAULT '{}';
