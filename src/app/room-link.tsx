import { userRepo } from '@/repositories/userRepo'
import type { Room } from '@/types/room'
import { IconUser } from '@tabler/icons-react'
import Link from 'next/link'
import type { FC } from 'react'

type RoomLinkProps = {
  room: Room
}

export const RoomLink: FC<RoomLinkProps> = async ({ room }) => {
  const roomOwnerName = await userRepo.getUserName(room.player1_id)

  return (
    <Link href={`/room/${room.id}`} key={room.id} className="block">
      <div className="flex flex-col gap-y-2 rounded-md border border-background-100 p-4 transition-colors hover:bg-background-50">
        <h3 className="text-bold text-lg">{room.topic}</h3>
        <p className="flex items-center gap-x-2 text-foreground-300">
          <IconUser size={20} />
          {roomOwnerName}
        </p>
      </div>
    </Link>
  )
}
