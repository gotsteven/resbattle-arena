import { debateRooms } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import { eq } from 'drizzle-orm'

export const roomRepo = {
  findUnique: async (roomId: string) => {
    const [room] = await dbClient.select().from(debateRooms).where(eq(debateRooms.id, roomId))
    return room
  },
  updateStatus: async (roomId: string, status: string) => {
    const [room] = await dbClient
      .update(debateRooms)
      .set({ status })
      .where(eq(debateRooms.id, roomId))
      .returning()
    return room
  },
}
