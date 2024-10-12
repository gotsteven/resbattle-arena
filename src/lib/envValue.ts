import { z } from 'zod'

export const BASE_URL = z
  .string()
  .url()
  .catch('http://localhost:3000')
  .parse(process.env.NEXT_PUBLIC_BASE_URL)
export const POSTGRES_URL = process.env.POSTGRES_URL
export const POSTGRES_PRISMA_URL = process.env.POSTGRES_PRISMA_URL
export const POSTGRES_URL_NO_SSL = process.env.POSTGRES_URL_NO_SSL
export const POSTGRES_URL_NON_POOLING = process.env.POSTGRES_URL_NON_POOLING
export const POSTGRES_USER = process.env.POSTGRES_USER
export const POSTGRES_HOST = process.env.POSTGRES_HOST
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
export const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE
export const AUTH_GOOGLE_ID = process.env.AUTH_GOOGLE_ID
export const AUTH_GOOGLE_SECRET = process.env.AUTH_GOOGLE_SECRET

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY
export const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY
export const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY

export const CF_ACCOUNT_ID = process.env.CF_ACCOUNT_ID
export const CF_AIGATEWAY_NAME = process.env.CF_AIGATEWAY_NAME
