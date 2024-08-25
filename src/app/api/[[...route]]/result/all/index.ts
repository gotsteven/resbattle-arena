import { debateResults } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import { z } from 'zod'
import { honoFactory } from '../../factory'

const querySchema = z.object({
  roomId: z.string(),
})

// export const getResultRoute = honoFactory
//   .createApp()
//   .get('/', zValidator('query', querySchema), async (c) => {
//     const { roomId } = c.req.valid('query')
//     const [result] = await dbClient
//       .select()
//       .from(debateResults)
//       .where(eq(debateResults.room_id, roomId))
//     return c.json(result)
//   })

export const getAllResultsRoute = honoFactory.createApp().get('/', async (c) => {
  const results = await dbClient.select().from(debateResults)
  return c.json(results)
})
