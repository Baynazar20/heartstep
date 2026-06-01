import type { PecsLanguage, PecsStyle } from "@shared/pecs";

const LANGUAGE_NAMES: Record<PecsLanguage, string> = {
  en: "English",
  tk: "Turkmen",
  uz: "Uzbek",
  kk: "Kazakh",
  ky: "Kyrgyz",
  tg: "Tajik",
};

const CULTURE_NOTES: Record<PecsLanguage, string> = {
  en: "Use a global, neutral, family-friendly context.",
  tk: "Use culturally appropriate and respectful Turkmen / Central Asian family-friendly context when relevant.",
  uz: "Use culturally appropriate and respectful Uzbek / Central Asian family-friendly context when relevant.",
  kk: "Use culturally appropriate and respectful Kazakh / Central Asian family-friendly context when relevant.",
  ky: "Use culturally appropriate and respectful Kyrgyz / Central Asian family-friendly context when relevant.",
  tg: "Use culturally appropriate and respectful Tajik / Central Asian family-friendly context when relevant.",
};

const STYLE_DESCRIPTIONS: Record<PecsStyle, string> = {
  simple: "Very simple PECS card with one central object.",
  object: "Single object card.",
  action: "Action-focused card.",
  emotion: "Emotion-focused card with clear facial expression.",
};

export function buildPecsPrompt({
  text,
  language,
  style,
}: {
  text: string;
  language: PecsLanguage;
  style: PecsStyle;
}): string {
  const languageName = LANGUAGE_NAMES[language];
  const cultureNote = CULTURE_NOTES[language];
  const cardType = STYLE_DESCRIPTIONS[style];

  return `Create a PECS communication card for a child with autism.

Illustration style:
- simple educational PECS card
- flat vector illustration
- clean white background
- centered subject
- high contrast
- thick outlines
- child friendly
- calm and positive
- easy to recognize
- no visual clutter
- no complex background
- no shadows
- no photorealism

Interpret the user's request correctly even if written in ${languageName} (or related Central Asian languages: English, Turkmen, Uzbek, Kazakh, Kyrgyz, Tajik).

Concept:
${text}

Card type:
${cardType}

Cultural adaptation:
${cultureNote}

Do not generate:
- text
- letters
- logos
- watermarks
- signatures
- brands
- advertisements
- scary content
- violent content

Square format.
High quality educational illustration.`;
}
