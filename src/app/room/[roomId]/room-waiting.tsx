'use client'

import { IconButton } from '@/components/ui/IconButton'
import { Loading } from '@/components/ui/Loading'
import { useUser } from '@/hooks/useUser'
import { apiClient } from '@/lib/apiClient'
import type { Room } from '@/types/types'
import { IconClockPause, IconCrown, IconTrash } from '@tabler/icons-react'
import { type FC, useState } from 'react'

type RoomWaitingProps = {
  room: Room
  userPosition: 1 | 2
  userId: string
}

export const RoomWaiting: FC<RoomWaitingProps> = ({ room, userPosition, userId }) => {
  const { user: user1 } = useUser(room.player1_id)
  const [isSelecting, setIsSelecting] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState<'agree' | 'disagree' | null>(null)

  const deleteRoom = async () => {
    await apiClient.api.room.delete.$post({ json: { id: room.id } })
  }

  if (userPosition === 1) {
    return (
      <div className="flex flex-col items-center justify-center gap-y-4 p-8">
        <p>部屋を作成しました</p>
        <IconClockPause size={48} className="animate-pulse text-accent" />
        <p>相手が入室するのを待っています</p>
        <IconButton icon={IconTrash} onClick={deleteRoom} label="部屋を削除する" />
      </div>
    )
  }

  const selectPositionHandler = async (position: 'agree' | 'disagree') => {
    setIsSelecting(true)
    setSelectedPosition(position)
    const enemyPosition = position === 'agree' ? 'disagree' : 'agree'
    await apiClient.api.room.update.$post({
      json: {
        id: room.id,
        p1_pos: enemyPosition,
        p2_pos: position,
        p2_id: userId,
        status: 'ready',
      },
    })
  }

  return (
    <div className="flex flex-col gap-y-8 text-center">
      <div className="flex flex-col items-center gap-y-8 rounded-md border border-background-100 py-8">
        <hgroup>
          <p className="truncate font-bold">トピック</p>
          <h2 className="text-4xl text-accent">{room.topic}</h2>
        </hgroup>
        <div className="flex items-center justify-center gap-x-2 text-foreground-300">
          <IconCrown size={20} />
          <span>{user1?.name}</span>
        </div>
      </div>
      <div className="flex flex-col gap-y-8">
        <p className="text-xl">どちらの立場でディベートしますか？</p>
        <div className="flex gap-x-4">
          <button
            type="button"
            onClick={() => selectPositionHandler('agree')}
            className="w-full shrink rounded-md border border-blue-500 p-8 font-bold text-2xl text-blue-500 transition-colors hover:bg-blue-500/10"
          >
            {isSelecting && selectedPosition === 'agree' ? <Loading /> : '賛成'}
          </button>
          <button
            type="button"
            onClick={() => selectPositionHandler('disagree')}
            className="w-full shrink rounded-md border border-red-500 p-8 font-bold text-2xl text-red-500 transition-colors hover:bg-red-500/10"
          >
            {isSelecting && selectedPosition === 'disagree' ? <Loading /> : '反対'}
          </button>
        </div>
      </div>
    </div>
  )
}
