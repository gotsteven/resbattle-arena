import { apiClient } from '@/lib/apiClient'
import type { Room } from '@/types/types'
import { useEffect, useState } from 'react'

const RoomResult = ({ room }: { room: Room }) => {
  const [result, setResult] = useState({})
  useEffect(() => {
    const fetchResult = async () => {
      const res = await apiClient.api.result.$get({ query: { roomId: room.id } })
      const result = await res.json()
      setResult(result)
    }
    fetchResult()
  }, [room.id])
  return <div>{result.text()}</div>
}

export default RoomResult
