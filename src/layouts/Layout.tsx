import type { ReactNode } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-svh flex-col gap-y-8">
    <Header />
    <main className="mx-auto flex w-full max-w-max-content grow flex-col gap-y-8 px-6">
      {children}
    </main>
    <Footer />
  </div>
)
