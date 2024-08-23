import { debateRooms } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { honoFactory } from '../../factory'

const requestBodySchema = z.object({
  topic: z.string(),
  player1_id: z.string(),
})

export const createRoomRoute = honoFactory
  .createApp()
  .post('/', zValidator('json', requestBodySchema), async (c) => {
    const { topic, player1_id } = c.req.valid('json')
    try {
      // 部屋の作成
      const [newRoom] = await dbClient
        .insert(debateRooms)
        .values({
          topic,
          player1_id,
        })
        .returning()

      return c.json({ room_id: newRoom.id, status: newRoom.status }, 201)
    } catch (error) {
      console.error('Error creating room:', error)
      return c.json({ error: 'Internal server error' }, 500)
    }
  })
