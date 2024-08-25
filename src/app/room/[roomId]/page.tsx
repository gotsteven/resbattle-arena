'use client'
import { Loading } from '@/components/ui/Loading'
import { useRoom } from '@/hooks/useRoom'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { RoomGame } from './room-game'
import { RoomReady } from './room-ready'
import { RoomWaiting } from './room-waiting'

const roomPage = ({ params: { roomId } }: { params: { roomId: string } }) => {
  const { room } = useRoom(roomId)
  const { data: session } = useSession()
  const router = useRouter()

  if (session === undefined) return <Loading />

  if (session === null) {
    router.push('/')
    return <p>redirecting...</p>
  }
  if (room === undefined) return <Loading />

  const { id: userId } = session.user

  const userStatus = (() => {
    if (room.player1_id === userId) return 1
    if (room.player2_id === userId) return 2
    if (room.player2_id === null) return 2
    return null // 満員
  })()

  if (userStatus === null) {
    return (
      <p>
        この部屋は満員になりました。
        <Link href="/" className="text-accent">
          部屋一覧へ戻る
        </Link>
      </p>
    )
  }

  if (room.status === 'waiting')
    return <RoomWaiting room={room} userPosition={userStatus} userId={userId} />
  if (room.status === 'ready') return <RoomReady room={room} userPosition={userStatus} />
  if (room.status === 'playing')
    return <RoomGame room={room} userId={userId} userPosition={userStatus} />
  if (room?.status === 'ended') {
    return <div>ゲームが終了しました ここに結果を表示予定</div>
  }
}

export default roomPage
