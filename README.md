# ResBattleArena

## Description

<!-- RBAの説明を書く -->
<!-- 現時点では省略 -->

This Project is developed for GeekCamp hackathon.

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

Copy the required information from `vercel/postgres`, `google cloud`. \
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
