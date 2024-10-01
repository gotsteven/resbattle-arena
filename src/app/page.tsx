import { RoomList } from '@/app/room-list'
import { auth } from '@/auth'
import { LinkButton } from '@/components/ui/LinkButton'
import { debateRooms } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import { IconNote } from '@tabler/icons-react'
import { and, eq, not } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { CreateRoom } from './create-room'

const Home = async () => {
  const session = await auth()

  if (session === null || session === undefined) redirect('/auth/login')

  const allRooms = await dbClient
    .select()
    .from(debateRooms)
    .where(and(eq(debateRooms.status, 'waiting'), not(eq(debateRooms.player1_id, session.user.id))))

  return (
    <div className="flex flex-col gap-y-6 bg-background text-foreground">
      <CreateRoom />
      <LinkButton href="/rule" label="ルール説明を見る" icon={<IconNote />} />
      <RoomList rooms={allRooms.reverse()} />
    </div>
  )
}

export default Home
