import { debateRooms } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import { eq } from 'drizzle-orm'
import { honoFactory } from '../../factory'

export const deleteRoomRoute = honoFactory.createApp().post('/delete', async (c) => {
  const { id } = await c.req.json<{
    id: string
  }>()
  const deleteRoom = await dbClient.delete(debateRooms).where(eq(debateRooms.id, id)).returning()
  return c.json(deleteRoom)
})
