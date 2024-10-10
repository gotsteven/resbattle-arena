'use client'

import { Loading } from '@/components/common/Loading'
import { useResult } from '@/hooks/fetcher/useResult'
import { aggregateResults } from '@/services/result'
import type { Result } from '@/types/result'
import { IconHandOff, IconHandStop, IconSkull, IconTrophy } from '@tabler/icons-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

const Stats = () => {
  const { data: session } = useSession()
  const { results, isLoading } = useResult(session?.user.id ?? '')
  const router = useRouter()

  const aggregateJudgeResults = useMemo<Result[][]>(() => {
    if (results === undefined) return []
    const groupedResults = Object.groupBy(results, ({ room_id }) => room_id ?? 'unknown room')
    const resultEntries = Object.entries(groupedResults)
    const sortedResults = resultEntries
      .toSorted(([roomId, _], [roomId2, __]) => roomId.localeCompare(roomId2))
      .map(([_, results]) => results)
      .filter((results) => results !== undefined)
    return sortedResults
  }, [results])

  const winGameCount = useMemo(() => {
    if (aggregateResults === undefined) return 0
    return aggregateJudgeResults
      .map((result) => result.map((r) => r.winner_id))
      .filter((ids) => ids.includes(session?.user.id)).length
  }, [aggregateJudgeResults, session])

  const winGameRate = useMemo(() => {
    if (aggregateJudgeResults === undefined) return 0
    const totalGameCount = aggregateJudgeResults.length
    return Math.round((winGameCount / totalGameCount) * 100)
  }, [aggregateJudgeResults, winGameCount])

  if (session === null) {
    router.push('/')
    return <Loading />
  }

  if (session === undefined) return <Loading />
  if (results === undefined || isLoading) return <Loading />

  return (
    <div className="flex flex-col gap-y-16 py-8">
      <div className="flex items-center justify-center gap-x-16 rounded-lg py-8 ring-2 ring-background-500">
        <div className="flex flex-col items-center gap-y-2">
          <h3 className="font-bold">通算勝利数</h3>
          <p className="flex items-end">
            <span className="text-6xl">{winGameCount}</span>
            <span className="text-xl">回</span>
          </p>
        </div>
        <div className="flex flex-col items-center gap-y-2">
          <h3 className="font-bold">勝率</h3>
          <p className="flex items-end">
            <span className="text-6xl">{winGameRate}</span>
            <span className="text-xl">%</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <h2>対戦履歴</h2>
        {aggregateJudgeResults.map(aggregateResults).map((result) => (
          <div
            key={result.room_id}
            className="flex w-full items-center justify-between rounded-md p-4 ring-2 ring-background-100"
          >
            <p className="truncate font-bold">{result.topic}</p>
            <div className="flex items-center justify-center gap-x-2">
              <div>
                {result.winner_id === session.user.id ? (
                  <IconHandStop size={24} className="text-blue-400" />
                ) : (
                  <IconHandOff size={24} className="text-red-400" />
                )}
              </div>
              <div>
                {result.winner_id === session.user.id ? (
                  <IconTrophy size={24} className="text-yellow-500" />
                ) : (
                  <IconSkull size={24} className="text-foreground-300" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Stats
