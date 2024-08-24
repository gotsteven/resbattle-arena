import { debateRooms } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import { eq } from 'drizzle-orm'
import { honoFactory } from '../../factory'

export const updateRoomRoute = honoFactory.createApp().post('/', async (c) => {
  const { status, p2_id, id, p2_pos, p1_pos } = await c.req.json<{
    id: string
    status: string
    p1_pos: string
    p2_pos: string
    p2_id: string
  }>()
  const roomData = await dbClient
    .update(debateRooms)
    .set({ status: status, player2_id: p2_id, player1_position: p1_pos, player2_position: p2_pos })
    .where(eq(debateRooms.id, id))
    .returning()
  return c.json(roomData[0])
})

export const updateRoomStatusRoute = honoFactory.createApp().post('/status', async (c) => {
  const { id, status } = await c.req.json<{
    id: string
    status: string
  }>()
  const [roomData] = await dbClient
    .update(debateRooms)
    .set({ status: status })
    .where(eq(debateRooms.id, id))
    .returning()
  return c.json(roomData)
})
