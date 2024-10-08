import { type Position, positionInfoMap } from '@/constants/game'
import { useUser } from '@/hooks/fetcher/useUser'
import type { AggregatedJudgeResult } from '@/types/judge'
import type { Room } from '@/types/room'
import { IconUser } from '@tabler/icons-react'
import { type FC, useMemo } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'

type GameInfoProps = {
  room: Room
  userPosition: 1 | 2
  result?: AggregatedJudgeResult
  userId: string
  turnUser: string | null
  leftTurnTime: number
}

export const GameInfo: FC<GameInfoProps> = ({
  room,
  userPosition,
  result,
  userId,
  turnUser,
  leftTurnTime,
}) => {
  const myPosition = useMemo(() => {
    const pos = userPosition === 1 ? room.player1_position : room.player2_position
    return pos as Position
  }, [userPosition, room])

  const currentOwnStatus = useMemo(() => {
    if (result === undefined) return '互角です。'
    const { player1, player2 } = result.info.advantageRate
    if (player1 === player2) return '互角です。'
    const superiority = player1 > player2 ? 1 : 2
    return superiority === userPosition ? '優勢です!' : '劣勢です...'
  }, [result, userPosition])

  const enemyUserId = useMemo(
    () => (userPosition === 1 ? room.player2_id : room.player1_id),
    [room, userPosition],
  )

  const { user: enemyUser } = useUser(enemyUserId ?? '')

  return (
    <div className="flex flex-col items-center gap-y-2">
      <h2 className="font-bold text-lg">
        <span>｢{room.topic}について｣</span>
        <span> - </span>
        <span
          className={twJoin(
            myPosition === 'agree' && `text-${positionInfoMap.agree.color}`,
            myPosition === 'disagree' && `text-${positionInfoMap.disagree.color}`,
          )}
        >
          {positionInfoMap[myPosition].label}
        </span>
      </h2>
      <p className="flex items-center gap-x-2 text-foreground-400">
        vs <IconUser size={20} /> {enemyUser?.name}
      </p>
      {result !== undefined && (
        <div className="w-full">
          <div className="flex justify-between">
            <span>{result.info.advantageRate.player1}%</span>
            <span>現在{currentOwnStatus}</span>
            <span> {result.info.advantageRate.player2}%</span>
          </div>
          <div className="flex w-full justify-between overflow-hidden rounded-full">
            <span
              style={{ width: `${result.info.advantageRate.player1}%` }}
              className={twMerge(
                'block h-3 bg-background-50',
                room.player1_id === userId && 'bg-accent/60',
              )}
            />
            <span
              style={{ width: `${result.info.advantageRate.player2}%` }}
              className={twMerge(
                'block h-3 bg-background-50',
                room.player2_id === userId && 'bg-accent/60',
              )}
            />
          </div>
        </div>
      )}
      {turnUser === userId && <p>ターン残り時間：{leftTurnTime}秒</p>}
    </div>
  )
}
