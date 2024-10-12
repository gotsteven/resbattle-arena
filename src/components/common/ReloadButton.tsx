'use client'
import { reloadRoom } from '@/app/actions/reloadRoom'
import { IconLoader2, IconReload } from '@tabler/icons-react'
import { useTransition } from 'react'
import { twJoin } from 'tailwind-merge'
import { IconButton } from '../ui/IconButton'

const ReloadButton = () => {
  const [isPending, startTransition] = useTransition()

  return (
    <IconButton
      onClick={async () => {
        startTransition(async () => {
          await reloadRoom()
        })
      }}
      label="更新"
      icon={isPending ? IconLoader2 : IconReload}
      disabled={isPending}
      iconClassName={twJoin(isPending && 'animate-spin text-accent')}
      className="bg-transparent"
    />
  )
}

export default ReloadButton
