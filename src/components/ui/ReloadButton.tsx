'use client'

import { reloadRoom } from '@/app/actions/reloadRoom'
import { IconReload } from '@tabler/icons-react'
import { useTransition } from 'react'

const ReloadButton = () => {
  const [isPending, startTransition] = useTransition()

  return (
    <form
      className="rounded-xl p-3 ring-1 ring-slate-400"
      action={() => {
        startTransition(async () => {
          await reloadRoom()
        })
      }}
    >
      <button type="submit" className="flex items-center gap-x-2 text-sm" disabled={isPending}>
        <IconReload size={17} className={isPending ? 'animate-spin' : ''} />
        再読み込み
      </button>
    </form>
  )
}

export default ReloadButton
