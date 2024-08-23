import { debateMessages } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { honoFactory } from '../../factory'

const requestBodySchema = z.object({
  roomId: z.string(),
  playerId: z.string(),
  message: z.string(),
})

export const sendMessageRoute = honoFactory
  .createApp()
  .post('/', zValidator('json', requestBodySchema), async (c) => {
    const { roomId, playerId, message } = c.req.valid('json')
    const newMessage = await dbClient
      .insert(debateMessages)
      .values({ room_id: roomId, player_id: playerId, message: message })
      .returning()
    return c.json(newMessage)
  })
