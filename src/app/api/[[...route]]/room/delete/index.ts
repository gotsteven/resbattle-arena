import { debateRooms } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import { zValidator } from '@hono/zod-validator'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { honoFactory } from '../../factory'

const requestBodySchema = z.object({
  id: z.string(),
})

export const deleteRoomRoute = honoFactory
  .createApp()
  .post('/', zValidator('json', requestBodySchema), async (c) => {
    const { id } = c.req.valid('json')
    const deleteRoom = await dbClient.delete(debateRooms).where(eq(debateRooms.id, id)).returning()
    return c.json(deleteRoom)
  })
