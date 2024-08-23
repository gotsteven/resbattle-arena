import { debateRooms } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import { honoFactory } from '../../factory'

export const createRoomRoute = honoFactory.createApp().post('/create', async (c) => {
  const { topic, player1_id } = await c.req.json()
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
