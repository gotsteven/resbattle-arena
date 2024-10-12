# ResBattleArena

## Description

"ResBattleArena" is a web application game where you can enjoy real-time 1-on-1 debates online. Players choose a side—either for or against—and take turns sending arguments to support their stance. After the debate ends, an AI determines the winner and provides feedback. Sharpen your logical thinking and enhance your debating skills in this engaging battle of words.

## Tech Stack

### Frontend

- React
- Next.js (AppRouter)
- Tailwind CSS

### Backend

- Next.js (RouteHandler)
- Hono
- NextAuth
- Drizzle
- Vercel AI SDK

### Deployment

- Vercel
- Vercel Postgres
- Cloudflare AI Gateway

## Development

### Setup

1. Install [Node.js](https://nodejs.org/en/download/)
2. Enable pnpm

```bash
corepack enable
```

3. Install dependencies

```bash
pnpm install
```

4. Create environment file

```bash
cp .env.local.example .env.local
```

Copy the required information from `vercel/postgres`, `google cloud`, and some AI services. \
And, execute the following command to generate `AUTH_SECRET`

```bash
npx auth secret
```

5. Migrate database

```bash
pnpm migrate
```

### Commands

- `pnpm dev` - Start development server
- `pnpm check` - Check linting and formatting
- `pnpm fix` - Fix linting and formatting
- `pnpm typecheck` - Check Type errors
- `pnpm generate:drizzle` - Generate migration files for drizzle
- `pnpm migrate` - Migrate database with drizzle
