import type { ImageGenerationInput, ImageGenerationResult } from "./types";
import { generateWithGemini, isGeminiConfigured } from "./gemini";

export { isGeminiConfigured };

export async function generateImage(input: ImageGenerationInput): Promise<ImageGenerationResult> {
  return generateWithGemini(input);
}

export function isImageGenerationConfigured(): boolean {
  return isGeminiConfigured();
}
