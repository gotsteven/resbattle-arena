import { debateRooms } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import { eq } from 'drizzle-orm'
import { honoFactory } from '../../factory'

export const getRoomRoute = honoFactory.createApp().get('/:roomId', async (c) => {
  const roomId = c.req.param('roomId')
  const roomData = await dbClient.select().from(debateRooms).where(eq(debateRooms.id, roomId))
  return c.json(roomData[0])
})
