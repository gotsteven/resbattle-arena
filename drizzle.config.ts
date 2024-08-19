import { loadEnvConfig } from '@next/env'
import { defineConfig } from 'drizzle-kit'

const pwd = process.cwd()
loadEnvConfig(pwd)

if (process.env.POSTGRES_URL === undefined) {
  throw new Error('POSTGRES_URL is not set')
}

export default defineConfig({
  schema: './src/drizzle/schema.ts',
  out: './src/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL,
  },
})
