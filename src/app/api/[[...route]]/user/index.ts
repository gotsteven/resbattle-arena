import { users } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import { zValidator } from '@hono/zod-validator'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { honoFactory } from '../factory'

const QuerySchema = z.object({
  userId: z.string(),
})

export const UserRouter = honoFactory
  .createApp()
  .get('/', zValidator('query', QuerySchema), async (c) => {
    const { userId } = c.req.valid('query')

    try {
      const [user] = await dbClient.select().from(users).where(eq(users.id, userId))
      return c.json(user, 200)
    } catch (e) {
      return c.json({ message: e }, 500)
    }
  })
