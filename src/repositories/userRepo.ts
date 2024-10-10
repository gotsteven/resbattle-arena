import { users } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import { eq } from 'drizzle-orm'

export const userRepo = {
  findOne: async (userId: string) => {
    const [user] = await dbClient.select().from(users).where(eq(users.id, userId))
    return user
  },
  getUserName: async (userId: string) => {
    const [{ name }] = await dbClient
      .select({ name: users.name })
      .from(users)
      .where(eq(users.id, userId))
    return name ?? 'player'
  },
}
