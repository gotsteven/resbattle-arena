import { z } from 'zod'

const isDevelopment = process.env.NODE_ENV === 'development'

export const BASE_URL = isDevelopment
  ? z.string().url().catch('http://localhost:3000').parse(process.env.BASE_URL)
  : z.string().url().parse(process.env.VERCEL_URL)
