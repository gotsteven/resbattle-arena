import { debateMessages, debateResults, debateRooms } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import { judgementAI } from '@/lib/judgementAI'
import type { AIResponse } from '@/types/types'
import { zValidator } from '@hono/zod-validator'
import { asc, eq } from 'drizzle-orm'
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

    const allMessages = await dbClient
      .select()
      .from(debateMessages)
      .where(eq(debateMessages.room_id, roomId))
      .orderBy(asc(debateMessages.msg_id))

    const [roomInfo] = await dbClient.select().from(debateRooms).where(eq(debateRooms.id, roomId))
    const organizedMessages = allMessages.map(({ room_id, ...rest }) => ({
      ...rest,
      position:
        roomInfo.player1_id === rest.player_id
          ? roomInfo.player1_position
          : roomInfo.player2_position,
    }))

    const response: AIResponse = await judgementAI(organizedMessages, roomInfo.topic)

    if (allMessages.length >= 10) {
      await dbClient
        .update(debateRooms)
        .set({
          status: 'ended',
        })
        .where(eq(debateRooms.id, roomId))
      const result = response.info
      await dbClient.insert(debateResults).values({
        room_id: roomId,
        winner: result.winner,
        ad_p1: result.advantageRate.player1,
        ad_p2: result.advantageRate.player2,
        reason: result.reason,
        feedback: result.feedback,
      })
    }
    return c.json({ response })
  })
