import { auth } from '@/auth'
import { debateResults } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import { eq, or } from 'drizzle-orm'
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
  const session = await auth()
  if (session === null) {
    return c.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const results = await dbClient
    .select()
    .from(debateResults)
    .where(
      or(
        eq(debateResults.player1_id, session.user.id),
        eq(debateResults.player2_id, session.user.id),
      ),
    )

  return c.json(results)
})
