import { users } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import { eq } from 'drizzle-orm'

export const userRepo = {
  findOne: async (userId: string) => {
    const [user] = await dbClient.select().from(users).where(eq(users.id, userId))
    return user
  },
}
