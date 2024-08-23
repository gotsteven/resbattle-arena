import { DrizzleAdapter } from '@auth/drizzle-adapter'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { accounts, authenticators, sessions, users, verificationTokens } from './drizzle/schema'
import { dbClient } from './lib/dbClient'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(dbClient, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
    authenticatorsTable: authenticators,
  }),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...user,
        id: user.id,
      },
    }),
  },
  providers: [Google],
})
