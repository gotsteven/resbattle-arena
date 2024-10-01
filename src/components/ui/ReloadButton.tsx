'use client'
import { reloadRoom } from '@/app/actions/reloadRoom'
import { IconReload } from '@tabler/icons-react'
import { useTransition } from 'react'

const ReloadButton = () => {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      onClick={() => {
        startTransition(async () => {
          await reloadRoom()
        })
      }}
      className="flex items-center gap-x-2 text-sm"
      type="button"
    >
      <IconReload size={17} className={isPending ? 'animate-spin' : ''} />
      再読み込み
    </button>
  )
}

export default ReloadButton
