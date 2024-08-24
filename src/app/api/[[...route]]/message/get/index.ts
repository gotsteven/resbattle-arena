import { debateMessages } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import { eq } from 'drizzle-orm'
import { honoFactory } from '../../factory'

export const getRoomRoute = honoFactory.createApp().get('/:roomId', async (c) => {
  const allMessages = await dbClient
    .select()
    .from(debateMessages)
    .where(eq(debateMessages.room_id, c.req.param('roomId')))
  return c.json(allMessages)
})
