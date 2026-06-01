export interface ImageGenerationInput {
  prompt: string;
}

export interface ImageGenerationResult {
  base64: string;
  mimeType: "image/png" | "image/jpeg";
}
