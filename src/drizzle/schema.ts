import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'
import type { AdapterAccountType } from 'next-auth/adapters'

export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
})

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
)

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  }),
)

export const authenticators = pgTable(
  'authenticator',
  {
    credentialID: text('credentialID').notNull().unique(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    providerAccountId: text('providerAccountId').notNull(),
    credentialPublicKey: text('credentialPublicKey').notNull(),
    counter: integer('counter').notNull(),
    credentialDeviceType: text('credentialDeviceType').notNull(),
    credentialBackedUp: boolean('credentialBackedUp').notNull(),
    transports: text('transports'),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  }),
)

export const debateRooms = pgTable('debate_rooms', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()), // 部屋のUUID
  topic: text('topic').notNull(), // ディベートのトピック
  player1_id: text('player1_id').notNull(), // プレイヤー1のID
  player2_id: text('player2_id'), // プレイヤー2のID（後で参加する）
  player1_position: text('player1_position'), //　賛成反対
  player2_position: text('player2_position'),
  status: text('status').notNull().default('waiting'), // 部屋のステータス
  started_at: timestamp('started_at'), // ディベート開始時間
})

export const debateMessages = pgTable('debate_messages', {
  msg_id: serial('msg_id').primaryKey(),
  room_id: uuid('id').references(() => debateRooms.id, { onDelete: 'cascade' }), // 部屋のUUID
  player_id: text('player_id').notNull(),
  message: text('message').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
})

export const judgedByEnum = pgEnum('judged_by', ['gpt', 'claude', 'gemini'])

export const debateResults = pgTable(
  'debate_results',
  {
    room_id: uuid('room_id').references(() => debateRooms.id, { onDelete: 'cascade' }), // 部屋のUUID
    winner: integer('winner'),
    winner_id: text('winner_id'),
    player1_id: text('player1_id'),
    player2_id: text('player2_id'),
    ad_p1: integer('ad_p1').notNull(),
    ad_p2: integer('ad_p2').notNull(),
    reason: text('reason').notNull(),
    feedback: text('feedback').notNull(),
    topic: text('topic'),
    judged_by: judgedByEnum('judged_by').default('gpt').notNull(),
  },
  (debateResults) => ({
    compoundKey: primaryKey({
      columns: [debateResults.room_id, debateResults.judged_by],
    }),
  }),
)
