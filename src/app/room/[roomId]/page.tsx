'use client'
import { apiClient } from '@/lib/apiClient'
import type { Room } from '@/types/types'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const roomPage = ({ params }: { params: { roomId: string } }) => {
  const [room, setRoom] = useState<Room | null>(null)
  const roomId = params.roomId

  useEffect(() => {
    const fetchRoomData = async () => {
      const res = await apiClient.api.room[':roomId'].$get({ param: { roomId } })
      const roomData = await res.json()
      setRoom(roomData)
    }
    fetchRoomData()
  }, [roomId])
  const { data: session } = useSession()
  if (!session) {
    return <p>ログインしていません</p>
  }
  const updateRoom = async (p2_pos: string) => {
    const p1_pos = p2_pos === 'agree' ? 'disagree' : 'agree'
    const p2_id = session.user.id
    const res = await apiClient.api.room.update.$post({
      json: { id: roomId, p1_pos, p2_pos, p2_id, status: 'ready' },
    })
    const newRoom = await res.json()
    setRoom(newRoom)
  }

  if (session.user.id !== room?.player1_id && session.user.id !== room?.player2_id) {
    return (
      <div>
        賛成反対を選択してください
        <div>
          <button type="submit" onClick={() => updateRoom('agree')}>
            賛成
          </button>
        </div>
        <div>
          <button type="submit" onClick={() => updateRoom('disagree')}>
            反対
          </button>
        </div>
      </div>
    )
  }
  return (
    <div>
      RoomPage
      <p>room_id: {roomId}</p>
      <p>topic: {room?.topic}</p>
      <div>
        <h3>Position</h3>
        <p>player1: {room.player1_position}</p>
        <p>player2: {room.player2_position}</p>
      </div>
    </div>
  )
}

export default roomPage
