import { debateResults } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import type { InferInsertModel } from 'drizzle-orm'

export const resultRepo = {
  create: async (result: InferInsertModel<typeof debateResults>) => {
    const [createdResult] = await dbClient.insert(debateResults).values(result).returning()
    return createdResult
  },
}
