'use client'

import { Loading } from '@/components/common/Loading'
import { useRoom } from '@/hooks/fetcher/useRoom'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { RoomFull } from './room-full'
import { RoomGame } from './room-game'
import { RoomReady } from './room-ready'
import RoomResult from './room-result'
import { RoomSelectPosition } from './room-select-position'
import { RoomWaiting } from './room-waiting'

const roomPage = ({ params: { roomId } }: { params: { roomId: string } }) => {
  const { room } = useRoom(roomId)
  const { data: session } = useSession()
  const router = useRouter()

  if (session === undefined) return <Loading />
  if (session === null) {
    router.push('/')
    return <Loading />
  }
  if (room === undefined) return <Loading />

  const { id: userId } = session.user

  const userPosition = (() => {
    if (room.player1_id === userId) return 1
    if (room.player2_id === userId) return 2
    if (room.player2_id === null) return 2
    return null // 満員
  })()

  if (userPosition === null) return <RoomFull />

  if (room.status === 'waiting') {
    if (userPosition === 1) return <RoomWaiting room={room} />
    if (userPosition === 2) return <RoomSelectPosition room={room} userId={userId} />
  }

  if (room.status === 'ready') return <RoomReady room={room} userPosition={userPosition} />
  if (room.status === 'playing')
    return <RoomGame room={room} userId={userId} userPosition={userPosition} />
  if (room?.status === 'ended') {
    return <RoomResult room={room} userId={userId} />
  }
}

export default roomPage
