'use client'

import type { Result } from '@/types/result'
import { IconHandOff, IconHandStop, IconSkull, IconTrophy } from '@tabler/icons-react'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const page = () => {
  const { data: session } = useSession()
  const { data: results, error, isLoading } = useSWR<Result[]>('/api/result/all', fetcher)

  if (session === null) {
    return <div>ログインしてください</div>
  }

  if (results === undefined || isLoading) return <div>loading...</div>
  if (results.length === 0) return <div>戦績がありません</div>
  if (error) return <div>failed to load</div>

  return (
    <div className="flex flex-col gap-y-8 text-center">
      <div className="flex flex-col items-center gap-y-5 rounded-md py-8">
        <div className="flex w-full justify-evenly rounded-3xl p-10 ring-4 ring-slate-600/90">
          <div className="flex flex-col items-center justify-center">
            <div className="font-bold">通算勝利数</div>
            <div className="flex items-end">
              <div className="text-6xl">
                {results.filter((result) => result.winner_id === session.user.id).length}
              </div>
              <div className="text-xl">回</div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="font-bold">勝率</div>
            <div className="flex items-end">
              <div className="text-6xl">
                {(results.filter((result) => result.winner_id === session.user.id).length /
                  results.length) *
                  100}
              </div>
              <div className="text-xl">%</div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex w-full justify-start px-3">
          <div className="font-bold">対戦履歴</div>
        </div>
        {results.map((result) => (
          <div
            key={`${result.room_id}-${result.judged_by}`}
            className="flex w-full items-center justify-between rounded-md p-4 ring-2 ring-slate-400/50"
          >
            <p className="truncate font-bold">{result.topic}</p>
            <div className="flex items-center justify-center gap-x-2 text-foreground-300">
              {result.winner_id === session.user.id ? (
                <IconHandStop size={25} color={'#71aaf5'} />
              ) : (
                <IconHandOff size={25} color={'#ff6b7c'} />
              )}
              {result.winner_id === session.user.id ? (
                <IconTrophy size={30} color={'#e0d312'} />
              ) : (
                <IconSkull size={30} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page
