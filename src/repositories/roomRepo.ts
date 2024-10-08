import { debateRooms } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import { eq } from 'drizzle-orm'

export const roomRepo = {
  findUnique: async (roomId: string) => {
    const [room] = await dbClient.select().from(debateRooms).where(eq(debateRooms.id, roomId))
    return room
  },
  findWaiting: async () => {
    const rooms = await dbClient.select().from(debateRooms).where(eq(debateRooms.status, 'waiting'))
    return rooms
  },
  getStatus: async (roomId: string) => {
    const [{ status }] = await dbClient
      .select({ status: debateRooms.status })
      .from(debateRooms)
      .where(eq(debateRooms.id, roomId))
    return status
  },
  create: async (topic: string, player1_id: string) => {
    const [room] = await dbClient.insert(debateRooms).values({ topic, player1_id }).returning()
    return room
  },
  update: async (roomId: string, status: string, p2_id: string, p1_pos: string, p2_pos: string) => {
    const [room] = await dbClient
      .update(debateRooms)
      .set({ status, player2_id: p2_id, player1_position: p1_pos, player2_position: p2_pos })
      .where(eq(debateRooms.id, roomId))
      .returning()
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
  delete: async (roomId: string) => {
    const [room] = await dbClient.delete(debateRooms).where(eq(debateRooms.id, roomId)).returning()
    return room
  },
}
