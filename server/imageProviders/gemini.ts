import type { ImageGenerationInput, ImageGenerationResult } from "./types";

const DEFAULT_MODEL = "gemini-2.5-flash-image";
const API_BASE = "https://generativelanguage.googleapis.com/v1beta";

type GeminiPart = {
  text?: string;
  inlineData?: { mimeType?: string; data?: string };
};

type GeminiResponse = {
  candidates?: {
    content?: { parts?: GeminiPart[] };
    finishReason?: string;
  }[];
  error?: { message?: string; code?: number };
};

function getApiKey(): string {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) {
    throw new Error("GEMINI_API_KEY is not configured");
  }
  return key;
}

function getModel(): string {
  return process.env.GEMINI_IMAGE_MODEL?.trim() || DEFAULT_MODEL;
}

export function isGeminiConfigured(): boolean {
  return Boolean(process.env.GEMINI_API_KEY?.trim());
}

export async function generateWithGemini({
  prompt,
}: ImageGenerationInput): Promise<ImageGenerationResult> {
  const apiKey = getApiKey();
  const model = getModel();

  const res = await fetch(`${API_BASE}/models/${model}:generateContent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ["IMAGE"],
        imageConfig: {
          aspectRatio: "1:1",
        },
      },
    }),
  });

  const data = (await res.json()) as GeminiResponse;

  if (!res.ok) {
    const msg = data.error?.message ?? `Gemini API error ${res.status}`;
    throw new Error(msg);
  }

  const parts = data.candidates?.[0]?.content?.parts ?? [];
  for (const part of parts) {
    if (part.inlineData?.data) {
      const mimeType = part.inlineData.mimeType?.includes("jpeg")
        ? "image/jpeg"
        : "image/png";
      return {
        base64: part.inlineData.data,
        mimeType,
      };
    }
  }

  const finishReason = data.candidates?.[0]?.finishReason;
  if (finishReason === "SAFETY" || finishReason === "BLOCKLIST") {
    throw new Error("Content was blocked by safety filters. Please try a different phrase.");
  }

  throw new Error("Gemini returned no image data");
}
