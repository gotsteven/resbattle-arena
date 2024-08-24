import { debateMessages } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import { zValidator } from '@hono/zod-validator'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { honoFactory } from '../../factory'

const querySchema = z.object({
  roomId: z.string(),
})

export const getRoomRoute = honoFactory
  .createApp()
  .get('/', zValidator('query', querySchema), async (c) => {
    const { roomId } = c.req.valid('query')
    const allMessages = await dbClient
      .select()
      .from(debateMessages)
      .where(eq(debateMessages.room_id, roomId))
    return c.json(allMessages)
  })
