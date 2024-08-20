import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const exampleTable = pgTable('example', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export type InsertExample = typeof exampleTable.$inferInsert
export type SelectExample = typeof exampleTable.$inferSelect
