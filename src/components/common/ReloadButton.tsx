'use client'
import { reloadRoom } from '@/app/actions/reloadRoom'
import { IconReload } from '@tabler/icons-react'
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
      icon={IconReload}
      disabled={isPending}
      iconClassName={twJoin(isPending && 'animate-spin')}
    />
  )
}

export default ReloadButton
