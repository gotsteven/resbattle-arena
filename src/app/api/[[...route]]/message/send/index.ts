import { debateMessages } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import { honoFactory } from '../../factory'

export const sendMessageRoute = honoFactory.createApp().post('/', async (c) => {
  const { roomId, playerId, message } = await c.req.json<{
    roomId: string
    playerId: string
    message: string
  }>()
  const newMessage = await dbClient
    .insert(debateMessages)
    .values({ room_id: roomId, player_id: playerId, message: message })
    .returning()
  return c.json(newMessage)
})
