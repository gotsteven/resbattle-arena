'use client'
import { apiClient } from '@/lib/apiClient'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const createRoomPage = () => {
  const [topic, setTopic] = useState('')
  const { data: session } = useSession()
  const router = useRouter()
  if (!session) {
    return <p>ログインしていません</p>
  }
  const fetchRoom = async () => {
    const res = await apiClient.api.room.create.$post({
      json: { player1_id: session?.user?.id, topic: topic },
    })
    if (res.ok) {
      const data = await res.json()
      router.push(`/room/${data.room_id}`)
    }
  }
  return (
    <div>
      createRoom
      <p>Signed in as {session?.user?.id}</p>
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
    </div>
  )
}

export default createRoomPage
