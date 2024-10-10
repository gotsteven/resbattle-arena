'use client'

import { IconButton } from '@/components/ui/IconButton'
import { apiClient } from '@/lib/apiClient'
import type { Room } from '@/types/room'
import { IconClockPause, IconTrash } from '@tabler/icons-react'
import { useRouter } from 'next/router'
import { type FC, useCallback } from 'react'

type RoomWaitingProps = {
  room: Room
}

export const RoomWaiting: FC<RoomWaitingProps> = ({ room }) => {
  const router = useRouter()
  const deleteRoom = useCallback(async () => {
    await apiClient.api.room[':roomId'].$delete({ param: { roomId: room.id } })
    router.push('/')
  }, [room.id, router])

  return (
    <div className="flex flex-col items-center justify-center gap-y-4 p-8">
      <p>部屋を作成しました</p>
      <IconClockPause size={48} className="animate-pulse text-accent" />
      <p>相手が入室するのを待っています</p>
      <IconButton icon={IconTrash} onClick={deleteRoom} label="部屋を削除する" />
    </div>
  )
}
