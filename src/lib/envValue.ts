import { z } from 'zod'

export const BASE_URL =
  process.env.VERCEL_URL === undefined
    ? z.string().url().catch('http://localhost:3000').parse(process.env.BASE_URL)
    : z.string().url().parse(`https://${process.env.VERCEL_URL}`)
export const POSTGRES_URL = String(process.env.POSTGRES_URL)
export const POSTGRES_PRISMA_URL = String(process.env.POSTGRES_PRISMA_URL)
export const POSTGRES_URL_NO_SSL = String(process.env.POSTGRES_URL_NO_SSL)
export const POSTGRES_URL_NON_POOLING = String(process.env.POSTGRES_URL_NON_POOLING)
export const POSTGRES_USER = String(process.env.POSTGRES_USER)
export const POSTGRES_HOST = String(process.env.POSTGRES_HOST)
export const POSTGRES_PASSWORD = String(process.env.POSTGRES_PASSWORD)
export const POSTGRES_DATABASE = String(process.env.POSTGRES_DATABASE)
export const AUTH_GOOGLE_ID = String(process.env.AUTH_GOOGLE_ID)
export const AUTH_GOOGLE_SECRET = String(process.env.AUTH_GOOGLE_SECRET)
