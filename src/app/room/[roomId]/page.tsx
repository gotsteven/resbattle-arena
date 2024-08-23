'use client'
import { apiClient } from '@/lib/apiClient'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import Debate from './components/Debate'
import RoomData from './components/RoomData'
import SelectPosition from './components/SelectPosition'

const fetchRoomData = async (roomId: string) => {
  const res = await apiClient.api.room[':roomId'].$get({ param: { roomId } })
  const roomData = await res.json()
  return roomData
}

const roomPage = ({ params }: { params: { roomId: string } }) => {
  const roomId = params.roomId

  const { data: room, error } = useSWR(roomId, fetchRoomData, {
    refreshInterval: 1000,
  })
  const { data: session } = useSession()
  const router = useRouter()

  if (!session) {
    return <p>ログインしていません</p>
  }
  const user = session.user.id
  const deleteRoom = async () => {
    await apiClient.api.room.delete.$post({ json: { id: roomId } })
    router.push('/')
  }

  const startGame = async () => {
    await apiClient.api.room.update.status.$post({ json: { status: 'playing', id: roomId } })
  }
  if (room?.status === 'ready' || room?.status === 'waiting') {
    if (user !== room?.player1_id && room?.player2_id === null) {
      return (
        <div>
          <SelectPosition user={user} roomId={roomId} />
        </div>
      )
    }
    if (
      (user !== room?.player1_id && user !== room?.player2_id && room?.player2_id !== null) ||
      error
    ) {
      return (
        <div>
          この部屋は満員か削除されました。
          <div>
            <Link href="/">ホームに戻る</Link>
          </div>
        </div>
      )
    }
    if (user === room.player1_id) {
      return (
        <div>
          <RoomData room={room} player_id={user} />
          <div>
            <button type="button" onClick={startGame}>
              ゲームを開始する
            </button>
          </div>

          <div>
            <button type="button" onClick={deleteRoom}>
              部屋を削除する
            </button>
          </div>
        </div>
      )
    }
    if (user === room.player2_id) {
      return (
        <div>
          <RoomData room={room} player_id={user} />
        </div>
      )
    }
  }
  if (room?.status === 'playing') {
    return (
      <div>
        ゲーム中です
        <Debate room={room} user={user} />
      </div>
    )
  }
}

export default roomPage
