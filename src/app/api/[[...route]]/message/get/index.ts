import { debateMessages } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import { honoFactory } from '../../factory'

export const getRoomRoute = honoFactory.createApp().get('/', async (c) => {
  const allMessages = await dbClient.select().from(debateMessages)
  return c.json(allMessages)
})
