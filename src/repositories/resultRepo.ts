import { debateResults } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import { type InferInsertModel, eq, or } from 'drizzle-orm'

export const resultRepo = {
  create: async (result: InferInsertModel<typeof debateResults>) => {
    const [createdResult] = await dbClient.insert(debateResults).values(result).returning()
    return createdResult
  },
  findAllInRoom: async (roomId: string) => {
    const results = await dbClient
      .select()
      .from(debateResults)
      .where(eq(debateResults.room_id, roomId))
    return results
  },
  findAllOfUser: async (userId: string) => {
    const results = await dbClient
      .select()
      .from(debateResults)
      .where(or(eq(debateResults.player1_id, userId), eq(debateResults.player2_id, userId)))
    return results
  },
}
