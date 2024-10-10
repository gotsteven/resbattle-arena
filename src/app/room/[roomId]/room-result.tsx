import { Loading } from '@/components/common/Loading'
import { aiModelNames } from '@/lib/aiModels'
import { apiClient } from '@/lib/apiClient'
import { aggregateResults } from '@/services/result'
import type { Result } from '@/types/result'
import type { Room } from '@/types/room'
import { IconSkull, IconTrophy } from '@tabler/icons-react'
import { type FC, Fragment, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type RoomResultProps = {
  room: Room
  userId: string
}

const RoomResult: FC<RoomResultProps> = ({ room, userId }) => {
  const [results, setResults] = useState<Result[]>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchResult = async () => {
      const res = await apiClient.api.result[':roomId']
        .$get({ param: { roomId: room.id } })
        .then((res) => res.json())
      return res
    }

    fetchResult()
      .then(setResults)
      .finally(() => setIsLoading(false))
  }, [room.id])

  if (isLoading || results === undefined) return <Loading />

  const totalResult = aggregateResults(results)

  return (
    <div className="flex flex-col items-center gap-y-8">
      <div className="flex flex-col items-center gap-y-4">
        {totalResult.winner_id === userId ? (
          <IconTrophy size={48} className="text-orange-400" />
        ) : (
          <IconSkull size={48} className="text-gray-600" />
        )}
        <p className="font-bold text-lg">
          {totalResult.winner_id === userId ? 'YOU WIN!!!' : 'YOU LOSE...'}
        </p>
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <span>{totalResult.ad_p1}%</span>
          <span> {totalResult.ad_p2}%</span>
        </div>
        <div className="flex w-full overflow-hidden rounded-full">
          <span
            style={{ width: `${totalResult.ad_p1}%` }}
            className={twMerge(
              'block h-3 bg-background-50',
              room.player1_id === userId && 'bg-accent/60',
            )}
          />
          <span
            style={{ width: `${totalResult.ad_p2}%` }}
            className={twMerge(
              'block h-3 bg-background-50',
              room.player2_id === userId && 'bg-accent/60',
            )}
          />
        </div>
      </div>
      <div>
        <h3 className="text-center font-bold text-lg">判定の根拠</h3>
        {totalResult.reason.map((reason, i) => (
          <Fragment key={aiModelNames[i]}>
            <h4>{aiModelNames[i]}</h4>
            <p>{reason}</p>
          </Fragment>
        ))}
      </div>
      <div>
        <h3 className="text-center font-bold text-lg">フィードバック</h3>
        {totalResult.feedback.map((feedback, i) => (
          <Fragment key={aiModelNames[i]}>
            <h4>{aiModelNames[i]}</h4>
            <p>{feedback}</p>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default RoomResult
