import { dbClient } from '@/lib/dbClient'
import { eq } from 'drizzle-orm'
import { type InsertExample, type SelectExample, exampleTable } from '../schema'

export const createExample = async (data: InsertExample): Promise<SelectExample> => {
  const examples = await dbClient.insert(exampleTable).values(data).returning().execute()
  return examples[0]
}

export const getExamplesWithId = async (id: SelectExample['id']): Promise<SelectExample[]> => {
  return await dbClient.select().from(exampleTable).where(eq(exampleTable.id, id)).execute()
}

export const getExamplesWithName = async (
  name: SelectExample['name'],
): Promise<SelectExample[]> => {
  return await dbClient.select().from(exampleTable).where(eq(exampleTable.name, name)).execute()
}
