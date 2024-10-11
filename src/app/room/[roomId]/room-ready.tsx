'use client'

import { Loading } from '@/components/common/Loading'
import { IconButton } from '@/components/ui/IconButton'
import { positionInfoMap } from '@/constants/game'
import { useUser } from '@/hooks/fetcher/useUser'
import { apiClient } from '@/lib/apiClient'
import type { Room } from '@/types/room'
import { IconClockPause, IconDeviceGamepad2, IconLoader2 } from '@tabler/icons-react'
import { type FC, useCallback, useState } from 'react'
import { twJoin } from 'tailwind-merge'

type RoomReadyProps = {
  room: Room
  userPosition: 1 | 2
}

export const RoomReady: FC<RoomReadyProps> = ({ room, userPosition }) => {
  const { user: user1 } = useUser(room.player1_id)
  const { user: user2 } = useUser(room.player2_id ?? '')
  const [isLoading, setIsLoading] = useState(false)

  const handleStartGame = useCallback(async () => {
    setIsLoading(true)
    await apiClient.api.room[':roomId'].status
      .$patch({
        json: { status: 'playing' },
        param: { roomId: room.id },
      })
      .finally(() => setIsLoading(false))
  }, [room.id])

  if (user1 === undefined || user2 === undefined) return <Loading />

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col items-center gap-y-8 rounded-md border border-background-100 px-4 py-8">
        <hgroup className="text-center">
          <p className="truncate font-bold">トピック</p>
          <h2 className="text-4xl text-accent">{room.topic}</h2>
        </hgroup>
        <div className="flex justify-center gap-x-4 ">
          <span
            className={twJoin(
              room.player1_position === 'agree' && `text-${positionInfoMap.agree.color}`,
              room.player1_position === 'disagree' && `text-${positionInfoMap.disagree.color}`,
              'font-bold text-xl',
            )}
          >
            {user1.name}
          </span>
          <span>VS</span>
          <span
            className={twJoin(
              room.player2_position === 'agree' && `text-${positionInfoMap.agree.color}`,
              room.player2_position === 'disagree' && `text-${positionInfoMap.disagree.color}`,
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
              <IconButton
                icon={isLoading ? IconLoader2 : IconDeviceGamepad2}
                label="ゲームを開始する"
                iconClassName={twJoin(isLoading && 'animate-spin text-accent')}
                onClick={handleStartGame}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-y-8 text-center">
            <p>オーナーがゲームを開始するのを待っています</p>
            <div className="flex justify-center">
              <IconClockPause size={48} className="animate-pulse text-accent" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
