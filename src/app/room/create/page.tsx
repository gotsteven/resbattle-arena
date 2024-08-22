'use client'
import { apiClient } from '@/lib/apiClient'
import { useState } from 'react'

const createRoomPage = () => {
  const [playerId, setPlayerId] = useState<string>('')
  const [topic, setTopic] = useState<string>('')
  const [roomId, setroomId] = useState<string>('undefined')
  const [roomStatus, setroomStatus] = useState<string>('undefined')
  const fetchRoom = async () => {
    const res = await apiClient.api.room.create.$post({
      json: { player1_id: playerId, topic: topic },
    })
    if (res.ok) {
      const data = await res.json()
      setroomId(data.room_id)
      setroomStatus(data.status)
    }
  }
  return (
    <div>
      createRoom
      <div>
        playerId:
        <input
          type="text"
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)} // ユーザーが入力した内容を state に保存
        />
      </div>
      <div>
        topic:
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)} // ユーザーが入力した内容を state に保存
        />
      </div>
      <button onClick={fetchRoom} type="button">
        roomを作成
      </button>
      <p>
        roomId:<span>{roomId}</span>
      </p>
      <p>
        roomStatus:<span>{roomStatus}</span>
      </p>
    </div>
  )
}

export default createRoomPage
