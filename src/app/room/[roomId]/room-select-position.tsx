'use client'

import { Loading } from '@/components/common/Loading'
import { type Position, positionInfoMap } from '@/constants/game'
import { useUser } from '@/hooks/fetcher/useUser'
import { apiClient } from '@/lib/apiClient'
import type { Room } from '@/types/room'
import { IconCrown } from '@tabler/icons-react'
import { type FC, useState } from 'react'
import { twJoin } from 'tailwind-merge'

type RoomSelectPositionProps = {
  room: Room
  userId: string
}

export const RoomSelectPosition: FC<RoomSelectPositionProps> = ({ room, userId }) => {
  const { user: user1 } = useUser(room.player1_id)
  const [isSelecting, setIsSelecting] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null)

  const selectPositionHandler = async (position: Position) => {
    setIsSelecting(true)
    setSelectedPosition(position)
    const enemyPosition = position === 'agree' ? 'disagree' : 'agree'
    await apiClient.api.room[':roomId'].$put({
      json: {
        p1_pos: enemyPosition,
        p2_pos: position,
        p2_id: userId,
        status: 'ready',
      },
      param: { roomId: room.id },
    })
  }

  return (
    <div className="flex flex-col gap-y-8 text-center">
      <div className="line-clamp-3 flex flex-col items-center gap-y-8 rounded-md border border-background-100 px-4 py-8">
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
          {Object.entries(positionInfoMap).map(([position, { label, color }]) => (
            <button
              key={position}
              type="button"
              onClick={() => selectPositionHandler(position as Position)}
              className={twJoin(
                'w-full shrink rounded-md border p-8 font-bold text-2xl transition-colors',
                `border-${color}`,
                `text-${color}`,
                position === 'agree' && 'hover:bg-blue-500/10',
                position === 'disagree' && 'hover:bg-red-500/10',
              )}
            >
              {isSelecting && selectedPosition === position ? <Loading /> : label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
