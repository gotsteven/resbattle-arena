'use client'

import { apiClient } from '@/lib/apiClient'
import { useEffect, useState } from 'react'

const roomPage = ({ params }: { params: { roomId: string } }) => {
  const [topic, setTopic] = useState<string>('')
  const roomId = params.roomId

  useEffect(() => {
    const fetchRoomData = async () => {
      const res = await apiClient.api.room[':roomId'].$get({ param: { roomId } })
      const topicData = await res.json()
      setTopic(topicData)
    }
    fetchRoomData()
  }, [roomId])
  return (
    <div>
      roomPage
      <p>room_id: {roomId}</p>
      <p>topic: {topic}</p>
    </div>
  )
}

export default roomPage
