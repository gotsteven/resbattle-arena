import { auth } from '@/auth'
import RoomList from '@/components/RoomList'
import { debateRooms } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import { eq } from 'drizzle-orm'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const Home = async () => {
  const allRooms = await dbClient
    .select()
    .from(debateRooms)
    .where(eq(debateRooms.status, 'waiting'))
  const session = await auth()

  if (session === null) redirect('/auth/login')

  return (
    <div className="flex flex-col gap-y-4 bg-background text-foreground">
      <RoomList rooms={allRooms} />
      <div>
        <Link href="/">部屋を更新</Link>
      </div>
      <Link href="/room/create">部屋を作る</Link>
    </div>
  )
}

export default Home
