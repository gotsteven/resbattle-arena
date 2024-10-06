import { debateRooms } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import { zValidator } from '@hono/zod-validator'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { honoFactory } from '../../factory'

const requestBodySchema = z.object({
  id: z.string(),
  status: z.string(),
  p1_pos: z.string(),
  p2_pos: z.string(),
  p2_id: z.string(),
})

const statusRequestBodySchema = z.object({
  id: z.string(),
  status: z.string(),
})

export const updateRoomRoute = honoFactory
  .createApp()
  .post('/', zValidator('json', requestBodySchema), async (c) => {
    const { status, p2_id, id, p2_pos, p1_pos } = c.req.valid('json')

    const roomData = await dbClient
      .update(debateRooms)
      .set({
        status: status,
        player2_id: p2_id,
        player1_position: p1_pos,
        player2_position: p2_pos,
      })
      .where(eq(debateRooms.id, id))
      .returning()
    return c.json(roomData[0])
  })
  .post('/status', zValidator('json', statusRequestBodySchema), async (c) => {
    const { id, status } = c.req.valid('json')
    const [roomData] = await dbClient
      .update(debateRooms)
      .set({ status: status, started_at: new Date() })
      .where(eq(debateRooms.id, id))
      .returning()
    return c.json(roomData)
  })
