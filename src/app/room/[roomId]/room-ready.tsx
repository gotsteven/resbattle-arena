'use client'

import { IconButton } from '@/components/ui/IconButton'
import { useUser } from '@/hooks/useUser'
import { apiClient } from '@/lib/apiClient'
import type { Room } from '@/types/types'
import { IconDeviceGamepad2, IconLoader2, IconTrash } from '@tabler/icons-react'
import type { FC } from 'react'
import { twJoin } from 'tailwind-merge'

type RoomReadyProps = {
  room: Room
  userPosition: 1 | 2
}

export const RoomReady: FC<RoomReadyProps> = ({ room, userPosition }) => {
  const { user: user1 } = useUser(room.player1_id)
  const { user: user2 } = useUser(room.player2_id ?? '')

  if (user1 === undefined || user2 === undefined) {
    return (
      <div className="flex justify-center gap-y-4">
        <div>loading...</div>
        <IconLoader2 size={48} className="animate-spin text-accent" />
      </div>
    )
  }

  const startGame = async () => {
    await apiClient.api.room.update.status.$post({ json: { status: 'playing', id: room.id } })
  }

  const deleteGame = async () => {
    await apiClient.api.room.delete.$post({ json: { id: room.id } })
  }

  return (
    <div className="flex flex-col gap-y-16">
      <div className="flex flex-col items-center gap-y-8 rounded-md border border-background-100 py-8">
        <hgroup className="text-center">
          <p className="truncate font-bold">トピック</p>
          <h2 className="text-4xl text-accent">{room.topic}</h2>
        </hgroup>
        <div className="flex justify-center gap-x-4 ">
          <span
            className={twJoin(
              room.player1_position === 'agree' ? 'text-blue-500/80' : 'text-red-500/80',
              'font-bold text-xl',
            )}
          >
            {user1.name}
          </span>
          <span>VS</span>
          <span
            className={twJoin(
              room.player2_position === 'agree' ? 'text-blue-500/80' : 'text-red-500/80',
              'font-bold text-xl',
            )}
          >
            {user2.name}
          </span>
        </div>
      </div>
      <div>
        {userPosition === 1 ? (
          <div className="flex flex-col items-center gap-y-8">
            <p>メンバーが全員揃いました。</p>
            <div className="flex gap-x-4">
              <IconButton icon={IconDeviceGamepad2} label="ゲームを開始する" onClick={startGame} />
              <IconButton icon={IconTrash} label="部屋を削除する" onClick={deleteGame} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-y-8 text-center">
            <p>オーナーがゲームを開始するのを待っています</p>
            <div className="flex justify-center">
              <IconLoader2 size={48} className="animate-spin text-accent" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
