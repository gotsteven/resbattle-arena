import { DEBATE_MESSAGE_LIMIT } from '@/constants/config'
import { messageRepo } from '@/repositories/messageRepo'
import { roomRepo } from '@/repositories/roomRepo'
import { judgeDebate } from '@/services/judge'
import { saveResult } from '@/services/result'
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

    await messageRepo.create(roomId, playerId, message)
    const allMessages = await messageRepo.findAllInRoom(roomId)
    const currentRoom = await roomRepo.findUnique(roomId)

    const organizedMessages = allMessages.map(({ room_id, ...rest }) => ({
      ...rest,
      position:
        currentRoom.player1_id === rest.player_id
          ? currentRoom.player1_position
          : currentRoom.player2_position,
    }))

    const judgeResults = await judgeDebate(organizedMessages, currentRoom.topic)

    if (allMessages.length >= DEBATE_MESSAGE_LIMIT) {
      await roomRepo.updateStatus(roomId, 'ended')
      await saveResult(currentRoom, judgeResults)
    }

    return c.json({ judgeResults })
  })
