import { apiClient } from '@/lib/apiClient'
import type { Result, Room } from '@/types/types'
import { useEffect, useState } from 'react'

const RoomResult = ({ room }: { room: Room }) => {
  const [result, setResult] = useState<Result>()
  useEffect(() => {
    const fetchResult = async () => {
      const res = await apiClient.api.result.$get({ query: { roomId: room.id } })
      const result = await res.json()
      setResult(result)
    }
    fetchResult()
  }, [room.id])
  return (
    <div>
      <div>勝者: {result?.winner === 1 ? '賛成派' : '反対派'}</div>
      <div>優勢率</div>
      <p>Player1: {result?.ad_p1}</p>
      <p>Player2: {result?.ad_p2}</p>
      <div>判定の根拠: {result?.reason}</div>
      <div>フィードバック: {result?.feedback}</div>
    </div>
  )
}

export default RoomResult
