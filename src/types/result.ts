import type { debateResults } from '@/drizzle/schema'
import type { InferInsertModel } from 'drizzle-orm'

export type Result = InferInsertModel<typeof debateResults>
