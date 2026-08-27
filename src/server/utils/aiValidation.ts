import { z } from "zod";

// 1. Resume Suggestions Zod Schema
export const ResumeSuggestionSchema = z.object({
  type: z.enum(["quantify", "alert", "keyword"]),
  title: z.string().min(1),
  description: z.string().min(1),
  actionText: z.string().min(1),
  evidenceClass: z.enum(["Existing", "Weak", "Missing", "Unsupported"]),
  evidenceDetail: z.string().min(1)
});

// 2. Resume Overall Analysis Zod Schema
export const ResumeAnalysisSchema = z.object({
  atsScore: z.number().int().min(0).max(100),
  compatibilityText: z.string().min(1),
  missingKeywords: z.array(z.string()),
  suggestions: z.array(ResumeSuggestionSchema)
});

// 3. Today's Action Item Zod Schema
export const ActionItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  priority: z.enum(["High", "Medium", "Low"]),
  estimatedMinutes: z.number().int().nonnegative().default(15),
  impactText: z.string().min(1),
  tasks: z.array(z.string())
});

// 4. Project Recommendation Zod Schema
export const ProjectRecommendationSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  techStack: z.array(z.string()),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  resumeValue: z.string().min(1),
  deliverables: z.array(z.string()),
  interviewPrep: z.array(z.string()),
  sourceGap: z.string().min(1)
});

// Helper function to extract JSON block safely from markdown response strings (e.g. ```json ... ```)
export function extractJSON(text: string): string {
  try {
    const trimmed = text.trim();
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      return trimmed;
    }
    const match = trimmed.match(/```json\s*([\s\S]*?)\s*```/) || trimmed.match(/```\s*([\s\S]*?)\s*```/);
    if (match && match[1]) {
      return match[1].trim();
    }
    return trimmed;
  } catch (e) {
    return text;
  }
}

// Reusable schema validation wrapper
export function safeValidateAIJSON<T>(
  rawText: string,
  schema: z.ZodSchema<T>,
  fallback: T
): T {
  try {
    const cleanJSON = extractJSON(rawText);
    const parsed = JSON.parse(cleanJSON);
    const validated = schema.parse(parsed);
    return validated;
  } catch (error) {
    console.error("[AI validation error] Schema mismatch or parse failure. Falling back. Error details:", error);
    return fallback;
  }
}
