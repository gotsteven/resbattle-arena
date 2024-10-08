import { debateMessages } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import { asc, desc, eq } from 'drizzle-orm'

export const messageRepo = {
  create: async (roomId: string, playerId: string, message: string) => {
    const [newMessage] = await dbClient
      .insert(debateMessages)
      .values({ room_id: roomId, player_id: playerId, message: message })
      .returning()
    return newMessage
  },
  findAllInRoom: async (roomId: string) => {
    const allMessages = await dbClient
      .select()
      .from(debateMessages)
      .where(eq(debateMessages.room_id, roomId))
      .orderBy(asc(debateMessages.msg_id))
    return allMessages
  },
  findLatestInRoom: async (roomId: string) => {
    const [latestMessage] = await dbClient
      .select()
      .from(debateMessages)
      .where(eq(debateMessages.room_id, roomId))
      .orderBy(desc(debateMessages.msg_id))
    return latestMessage
  },
}
