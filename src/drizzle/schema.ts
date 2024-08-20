import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const sessionTable = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
})

export const userTable = pgTable('user', {
  id: text('id').primaryKey(),
  googleProfileId: text('google_profile_id').notNull().unique(),
  iconUrl: text('icon_url'),
  displayName: text('display_name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export type InsertUser = typeof userTable.$inferInsert
export type SelectUser = typeof userTable.$inferSelect
