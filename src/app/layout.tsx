import { Layout } from '@/layouts/Layout'
import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { Noto_Sans_JP } from 'next/font/google'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import '../styles/globals.css'

const noto = Noto_Sans_JP({ weight: ['400', '600'], subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'ResBattleArena',
  description: 'Debate Game with a sense of res-battle',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ja" className="m-0 h-svh">
      <body
        className={twMerge(
          noto.className,
          'bg-background text-foreground',
          'scrollbar-thin scrollbar-thumb-background-200 scrollbar-thumb-rounded-full scrollbar-track-transparent',
        )}
      >
        <SessionProvider>
          <Layout>{children}</Layout>
        </SessionProvider>
      </body>
    </html>
  )
}
