export type PecsLanguage = "en" | "tk" | "uz" | "kk" | "ky" | "tg";

export type PecsStyle = "simple" | "object" | "action" | "emotion";

export interface GeneratePecsCardRequest {
  text: string;
  language: PecsLanguage;
  style: PecsStyle;
}

export interface GeneratePecsCardSuccess {
  success: true;
  image: string;
  mimeType: "image/png" | "image/jpeg";
}

export interface GeneratePecsCardError {
  success: false;
  error: string;
  code?: "validation" | "safety" | "rate_limit" | "provider" | "config";
}

export type GeneratePecsCardResponse = GeneratePecsCardSuccess | GeneratePecsCardError;
