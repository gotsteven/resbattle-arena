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
})
export const startGameRoute = honoFactory
  .createApp()
  .post('/', zValidator('json', requestBodySchema), async (c) => {
    const { roomId } = c.req.valid('json')
    const startTime = new Date()
    const [roomData] = await dbClient
      .update(debateRooms)
      .set({ started_at: startTime, status: 'playing' })
      .where(eq(debateRooms.id, roomId))
      .returning()
    let remainingTime =
      100 - Math.floor((new Date().getTime() - new Date(startTime).getTime()) / 1000)
    const interval = setInterval(async () => {
      remainingTime =
        100 - Math.floor((new Date().getTime() - new Date(startTime).getTime()) / 1000)
      if (remainingTime <= 0) {
        clearInterval(interval)
        const allMessages = await dbClient
          .select()
          .from(debateMessages)
          .where(eq(debateMessages.room_id, roomId))
          .orderBy(asc(debateMessages.msg_id))

        const [roomInfo] = await dbClient
          .select()
          .from(debateRooms)
          .where(eq(debateRooms.id, roomId))
        const organizedMessages = allMessages.map(({ room_id, ...rest }) => ({
          ...rest,
          position:
            roomInfo.player1_id === rest.player_id
              ? roomInfo.player1_position
              : roomInfo.player2_position,
        }))

        const response: AIResponse = await judgementAI(organizedMessages, roomInfo.topic)
        const result = response.info
        await dbClient.insert(debateResults).values({
          room_id: roomId,
          winner: result.winner,
          winner_id:
            result.winner === 1 && roomInfo.player1_position === 'agree'
              ? roomInfo.player1_id
              : roomInfo.player2_id,
          ad_p1: result.advantageRate.player1,
          ad_p2: result.advantageRate.player2,
          player1_id: roomInfo.player1_id,
          player2_id: roomInfo.player2_id,
          reason: result.reason,
          feedback: result.feedback,
          topic: roomInfo.topic,
        })
        await dbClient
          .update(debateRooms)
          .set({ status: 'ended' })
          .where(eq(debateRooms.id, roomId))
      }
    }, 1000)

    return c.json(startTime)
  })
