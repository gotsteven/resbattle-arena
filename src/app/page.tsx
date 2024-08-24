import { RoomList } from '@/app/room-list'
import { auth } from '@/auth'
import { debateRooms } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { CreateRoom } from './create-room'

const Home = async () => {
  const allRooms = await dbClient
    .select()
    .from(debateRooms)
    .where(eq(debateRooms.status, 'waiting'))
  const session = await auth()

  if (session === null || session === undefined) redirect('/auth/login')

  return (
    <div className="flex flex-col gap-y-6 bg-background text-foreground">
      <p>VEERCEL_URL: {process.env.VERCEL_URL}</p>
      <p>BASE_URL: {process.env.BASE_URL}</p>
      <CreateRoom />
      <RoomList rooms={allRooms} />
    </div>
  )
}

export default Home
