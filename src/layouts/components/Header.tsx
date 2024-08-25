import { PROJECT_NAME } from '@/constants/project'
import { IconUserCircle } from '@tabler/icons-react'
import Link from 'next/link'

export const Header = () => (
  <header className="sticky top-0 z-50 border-background-100 border-b bg-background/16 backdrop-blur-md">
    <div className="mx-auto flex max-w-max-content items-center justify-between gap-y-4 px-6 py-4 font-bold text-2xl">
      <Link href="/" className="transition-colors hover:text-accent-400">
        {PROJECT_NAME}
      </Link>
      <Link href={'/statu'}>
        <IconUserCircle size={32} />
      </Link>
    </div>
  </header>
)
