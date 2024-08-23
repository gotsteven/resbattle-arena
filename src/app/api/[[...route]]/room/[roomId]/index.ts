import { debateRooms } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import { zValidator } from '@hono/zod-validator'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { honoFactory } from '../../factory'

const pathParamSchema = z.object({
  roomId: z.string(),
})

export const getRoomRoute = honoFactory
  .createApp()
  .get('/:roomId', zValidator('param', pathParamSchema), async (c) => {
    const { roomId } = c.req.valid('param')
    const [roomData] = await dbClient.select().from(debateRooms).where(eq(debateRooms.id, roomId))
    return c.json(roomData)
  })
