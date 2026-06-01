const BLOCKED_PATTERNS: RegExp[] = [
  /\b(porn|pornography|nude|naked|sex|sexual|xxx|erotic|nsfw|hentai)\b/i,
  /\b(kill|murder|gore|bloody|torture|weapon|gun|rifle|bomb|stab)\b/i,
  /\b(suicide|self[\s-]?harm|cut myself|kill myself)\b/i,
  /\b(nazi|hitler|terrorist|genocide|ethnic cleansing)\b/i,
  /\b(diagnos(e|is|ed)|prescri(be|ption)|cure autism|autism cure|medical diagnosis)\b/i,
  /\b(election|rally|propaganda|political party|vote for|campaign poster)\b/i,
  /\b(ssn|social security|credit card|passport number)\b/i,
  /\b\d{3}[-.\s]?\d{2}[-.\s]?\d{4}\b/,
  /@\w+\.\w+/,
  /\b\d{10,}\b/,
];

const BLOCKED_SUBSTRINGS = [
  "child porn",
  "cp ",
];

export function isPromptSafe(text: string): { safe: boolean; reason?: string } {
  const normalized = text.trim().toLowerCase();
  if (!normalized) {
    return { safe: false, reason: "empty" };
  }

  for (const sub of BLOCKED_SUBSTRINGS) {
    if (normalized.includes(sub)) {
      return { safe: false, reason: "blocked_content" };
    }
  }

  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(text)) {
      return { safe: false, reason: "blocked_content" };
    }
  }

  return { safe: true };
}
