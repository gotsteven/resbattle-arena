import type { Room } from '@/types/types'
import Link from 'next/link'

const RoomList = ({ rooms }: { rooms: Room[] }) => {
  if (!rooms) {
    return <div>部屋がありません</div>
  }
  return (
    <div>
      {rooms.map((room) => {
        return (
          <div key={room.id}>
            <Link href={`/room/${room.id}`}>{room.topic}</Link>
          </div>
        )
      })}
    </div>
  )
}

export default RoomList
