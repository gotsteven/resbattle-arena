import { eq } from 'drizzle-orm'
import { dbClient } from '../../lib/dbClient'
import { type InsertUser, type SelectUser, userTable } from '../schema'

export const createUser = async (data: InsertUser): Promise<SelectUser> => {
  const [user] = await dbClient.insert(userTable).values(data).returning().execute()
  return user
}

export const getUserById = async (id: SelectUser['id']): Promise<SelectUser> => {
  const [user] = await dbClient.select().from(userTable).where(eq(userTable.id, id)).execute()
  return user
}

export const getUserByGoogleProfileId = async (
  googleProfileId: SelectUser['googleProfileId'],
): Promise<SelectUser> => {
  const [user] = await dbClient
    .select()
    .from(userTable)
    .where(eq(userTable.googleProfileId, googleProfileId))
    .execute()
  return user
}
