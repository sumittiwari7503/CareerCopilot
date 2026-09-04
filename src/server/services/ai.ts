import { GoogleGenAI } from "@google/genai";

export function hasGeminiKey(): boolean {
  return !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY";
}

export function getGemini(): GoogleGenAI {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("Missing GEMINI_API_KEY environment variable on the server");
  }
  return new GoogleGenAI({ apiKey: key });
}

export async function generateContentWithFallback(aiClient: GoogleGenAI, options: { contents: string; config: any }) {
  const models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
  let lastError: any = null;

  for (const model of models) {
    try {
      console.log(`[Gemini] Attempting generation with model: ${model}`);
      const response = await aiClient.models.generateContent({
        model,
        contents: options.contents,
        config: options.config
      });
      return response;
    } catch (err: any) {
      console.warn(`[Gemini] Model ${model} failed: ${err.message || err}`);
      lastError = err;
    }
  }

  throw lastError || new Error("All fallback Gemini models failed to generate content");
}
