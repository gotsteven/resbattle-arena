import { Loading } from '@/components/ui/Loading'
import { apiClient } from '@/lib/apiClient'
import type { Result, Room } from '@/types/types'
import { IconSkull, IconTrophy } from '@tabler/icons-react'
import { type FC, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type RoomResultProps = {
  room: Room
  userId: string
}

const RoomResult: FC<RoomResultProps> = ({ room, userId }) => {
  const [result, setResult] = useState<Result>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchResult = async () => {
      const res = await apiClient.api.result.$get({ query: { roomId: room.id } })
      const result = await res.json()
      setResult(result)
    }
    fetchResult().then(() => setIsLoading(false))
  }, [room.id])

  if (isLoading || result === undefined) return <Loading />

  const winner = result.ad_p1 > result.ad_p2 ? room.player1_id : room.player2_id

  return (
    <div className="flex flex-col items-center gap-y-8">
      <div className="flex flex-col items-center gap-y-4">
        {winner === userId ? (
          <IconTrophy size={48} className="text-orange-400" />
        ) : (
          <IconSkull size={48} className="text-gray-600" />
        )}
        <p className="font-bold text-lg">{winner === userId ? 'YOU WIN!!!' : 'YOU LOSE...'}</p>
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <span>{result.ad_p1}%</span>
          <span> {result.ad_p2}%</span>
        </div>
        <div className="flex w-full overflow-hidden rounded-full">
          <span
            style={{ width: `${result.ad_p1}%` }}
            className={twMerge(
              'block h-3 bg-background-50',
              room.player1_id === userId && 'bg-accent/60',
            )}
          />
          <span
            style={{ width: `${result.ad_p2}%` }}
            className={twMerge(
              'block h-3 bg-background-50',
              room.player2_id === userId && 'bg-accent/60',
            )}
          />
        </div>
      </div>
      <div>
        <h3 className="text-center font-bold text-lg">判定の根拠</h3>
        {result.reason}
      </div>
      <div>
        <h3 className="text-center font-bold text-lg">フィードバック</h3>
        {result.feedback}
      </div>
    </div>
  )
}

export default RoomResult
