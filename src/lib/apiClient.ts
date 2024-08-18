import type { AppType } from '@/app/api/[[...route]]/route'
import { hc } from 'hono/client'
import { BASE_URL } from './envValue'

export const apiClient = hc<AppType>(BASE_URL)
