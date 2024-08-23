import { debateRooms } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import { eq } from 'drizzle-orm'
import { honoFactory } from '../../factory'

export const getRoomRoute = honoFactory.createApp().get('/:roomId', async (c) => {
  const roomId = c.req.param('roomId')
  const roomTopic = await dbClient
    .select({
      topic: debateRooms.topic,
    })
    .from(debateRooms)
    .where(eq(debateRooms.id, roomId))
  return c.json(roomTopic[0].topic)
})
