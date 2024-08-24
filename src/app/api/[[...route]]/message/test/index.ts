import { debateMessages, debateRooms } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import { zValidator } from '@hono/zod-validator'
import { asc, eq } from 'drizzle-orm'
import { z } from 'zod'
import { honoFactory } from '../../factory'

const requestBodySchema = z.object({
  roomId: z.string(),
})

export const testRoute = honoFactory
  .createApp()
  .post('/', zValidator('json', requestBodySchema), async (c) => {
    const { roomId } = c.req.valid('json')
    const messages = await dbClient
      .select()
      .from(debateMessages)
      .where(eq(debateMessages.room_id, roomId))
      .orderBy(asc(debateMessages.msg_id))

    const [roomInfo] = await dbClient.select().from(debateRooms).where(eq(debateRooms.id, roomId))

    const organizedMessages = messages.map(({ room_id, ...rest }) => ({
      ...rest,
      position:
        roomInfo.player1_id === rest.player_id
          ? roomInfo.player1_position
          : roomInfo.player2_position,
    }))

    return c.json(organizedMessages)
  })
