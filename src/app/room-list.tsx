import { users } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import type { Room } from '@/types/types'
import { IconRefresh, IconUser } from '@tabler/icons-react'
import { eq } from 'drizzle-orm'
import Link from 'next/link'
import { LinkButton } from '../components/ui/LinkButton'

export const RoomList = ({ rooms }: { rooms: Room[] }) => {
  if (rooms.length === 0) return <div>部屋がありません</div>

  return (
    <>
      <div className="flex items-center gap-x-4">
        <h2 className="shrink grow">部屋一覧</h2>
        <LinkButton
          href="/"
          icon={<IconRefresh size={20} />}
          aria-label="部屋を更新"
          className="bg-transparent"
        />
      </div>
      <div className="flex flex-col gap-y-4">
        {rooms.map(async (room) => {
          const [{ name }] = await dbClient
            .select({ name: users.name })
            .from(users)
            .where(eq(users.id, room.player1_id))
            .execute()

          return (
            <Link href={`/room/${room.id}`} key={room.id} className="block">
              <div className="flex flex-col gap-y-2 rounded-md border border-background-100 p-4 transition-colors hover:bg-background-50">
                <h3 className="text-bold text-lg">{room.topic}</h3>
                <p className="flex items-center gap-x-2 text-foreground-300">
                  <IconUser size={20} />
                  {name}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
