import { RequestHandler } from "express";
import { z } from "zod";
import type { GeneratePecsCardResponse } from "@shared/pecs";
import { buildPecsPrompt } from "../lib/pecsPrompt";
import { isPromptSafe } from "../lib/contentSafety";
import { checkRateLimit, getClientIp } from "../lib/rateLimit";
import { generateImage, isImageGenerationConfigured } from "../imageProviders";

const bodySchema = z.object({
  text: z.string().min(1).max(120),
  language: z.enum(["en", "tk", "uz", "kk", "ky", "tg"]),
  style: z.enum(["simple", "object", "action", "emotion"]),
});

export const handleGeneratePecsCard: RequestHandler = async (req, res) => {
  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) {
    const response: GeneratePecsCardResponse = {
      success: false,
      error: "Please enter a short word or phrase (1–120 characters) with a supported language and style.",
      code: "validation",
    };
    res.status(400).json(response);
    return;
  }

  const text = parsed.data.text.trim();
  if (text.length < 1) {
    res.status(400).json({
      success: false,
      error: "Please enter a word or phrase.",
      code: "validation",
    } satisfies GeneratePecsCardResponse);
    return;
  }

  const safety = isPromptSafe(text);
  if (!safety.safe) {
    res.status(400).json({
      success: false,
      error: "This request cannot be processed. Please use simple, family-friendly communication words.",
      code: "safety",
    } satisfies GeneratePecsCardResponse);
    return;
  }

  const ip = getClientIp(req);
  const limit = checkRateLimit(ip);
  if (!limit.allowed) {
    res.status(429).json({
      success: false,
      error: "Daily generation limit reached. Please try again tomorrow.",
      code: "rate_limit",
    } satisfies GeneratePecsCardResponse);
    return;
  }

  if (!isImageGenerationConfigured()) {
    res.status(503).json({
      success: false,
      error: "Image generation is not configured. Please set GEMINI_API_KEY on the server.",
      code: "config",
    } satisfies GeneratePecsCardResponse);
    return;
  }

  try {
    const prompt = buildPecsPrompt({
      text,
      language: parsed.data.language,
      style: parsed.data.style,
    });

    const image = await generateImage({ prompt });

    res.status(200).json({
      success: true,
      image: image.base64,
      mimeType: image.mimeType,
    } satisfies GeneratePecsCardResponse);
  } catch (err) {
    console.error("[generate-pecs-card]", err);
    const message =
      err instanceof Error
        ? err.message
        : "We could not generate your card right now. Please try again in a few minutes.";
    res.status(502).json({
      success: false,
      error: message,
      code: "provider",
    } satisfies GeneratePecsCardResponse);
  }
};
