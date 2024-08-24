import { debateMessages } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import { zValidator } from '@hono/zod-validator'
import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'
import { honoFactory } from '../../factory'

const querySchema = z.object({
  roomId: z.string(),
})

export const getMessageRoute = honoFactory
  .createApp()
  .get('/', zValidator('query', querySchema), async (c) => {
    const { roomId } = c.req.valid('query')
    const allMessages = await dbClient
      .select()
      .from(debateMessages)
      .where(eq(debateMessages.room_id, roomId))
    return c.json(allMessages)
  })
export const getLatestMessageRoute = honoFactory
  .createApp()
  .get('/latest', zValidator('query', querySchema), async (c) => {
    const { roomId } = c.req.valid('query')
    const [Message] = await dbClient
      .select()
      .from(debateMessages)
      .where(eq(debateMessages.room_id, roomId))
      .orderBy(desc(debateMessages.msg_id))
    return c.json(Message)
  })
