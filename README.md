# HeartStep

HeartStep supports families and educators with warm, practical tools for early communication—including PECS/AAC-style visual cards generated with **Google Gemini 2.5 Flash Image**.

## Tech stack

- React 18 + Vite + TypeScript + Tailwind CSS
- Express API (local dev) / Netlify serverless (production)
- i18n: English, Turkmen, Uzbek, Kazakh, Kyrgyz, Tajik

## Local development

```bash
pnpm install
cp .env.example .env
```

Add your Gemini API key to `.env` (see below), then:

```bash
pnpm dev
```

Open [http://localhost:8080](http://localhost:8080).

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | **Yes** | Google AI Studio / Gemini API key ([get a key](https://aistudio.google.com/apikey)) |
| `GEMINI_IMAGE_MODEL` | No | Default: `gemini-2.5-flash-image` |
| `PECS_RATE_LIMIT_PER_IP` | No | Max generations per IP per day (default: `10`) |

Optional site variables:

| Variable | Description |
|----------|-------------|
| `PING_MESSAGE` | `/api/ping` response |
| `VITE_PLAY_URL` | Google Play link on hero |
| `VITE_GUIDE_URL` | Parent guide PDF URL |

**Security:** Never commit `.env`. Never use `VITE_` for `GEMINI_API_KEY`. The browser only calls `POST /api/generate-pecs-card`; the server calls Gemini.

## Image generation workflow

1. User enters a phrase, language, and card style in the PECS section.
2. Frontend sends `POST /api/generate-pecs-card` with `{ text, language, style }`.
3. Server validates input, runs content safety checks, and applies rate limiting.
4. Server builds a PECS-optimized prompt via `buildPecsPrompt()` in `server/lib/pecsPrompt.ts`.
5. Server calls **Gemini 2.5 Flash Image** (`server/imageProviders/gemini.ts`).
6. Response: `{ success: true, image: "<base64>", mimeType: "image/png" }`.
7. User previews and downloads `heartstep-pecs-{language}-{slug}.png`.

## Rate limiting

Configured with `PECS_RATE_LIMIT_PER_IP` (default 10 requests per IP per calendar day). Returns HTTP 429 when exceeded.

## Deployment (Netlify)

1. Build publishes `dist/spa`; `/api/*` redirects to `netlify/functions/api`.
2. In **Site settings → Environment variables**, set `GEMINI_API_KEY`.
3. Optionally set `GEMINI_IMAGE_MODEL` and `PECS_RATE_LIMIT_PER_IP`.
4. Redeploy after changing env vars.

For Node production (`pnpm build` + `pnpm start`), set the same variables on the host.

## Editing content

- **Events:** `client/data/cms.ts` → `events`
- **Translations:** `client/i18n/translations.ts`
- **Languages:** `client/i18n/languages.ts`

## Scripts

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Dev server (port 8080) |
| `pnpm build` | Production client + server |
| `pnpm typecheck` | TypeScript |
| `pnpm test` | Vitest |

## Test API locally

```bash
curl -X POST http://localhost:8080/api/generate-pecs-card \
  -H "Content-Type: application/json" \
  -d "{\"text\":\"drink water\",\"language\":\"en\",\"style\":\"simple\"}"
```
