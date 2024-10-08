import ReloadButton from '@/components/common/ReloadButton'
import type { Room } from '@/types/room'
import type { FC } from 'react'
import { RoomLink } from './room-link'

type RoomListProps = {
  rooms: Room[]
}

export const RoomList: FC<RoomListProps> = ({ rooms }) => (
  <>
    <div className="flex items-center gap-x-4">
      <h2 className="shrink grow ">部屋一覧</h2>
      <ReloadButton />
    </div>
    <div className="flex flex-col gap-y-4">
      {rooms.map((room) => (
        <RoomLink room={room} key={room.id} />
      ))}
    </div>
  </>
)
