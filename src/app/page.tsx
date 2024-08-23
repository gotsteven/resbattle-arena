import RoomList from '@/components/RoomList'
import { PROJECT_NAME } from '@/constants/project'
import { debateRooms } from '@/drizzle/schema'
import { dbClient } from '@/lib/dbClient'

import Link from 'next/link'

const Home = async () => {
  const allRooms = await dbClient.select().from(debateRooms)
  return (
    <div className="flex flex-col gap-y-4 bg-background text-foreground">
      Hello, {PROJECT_NAME}
      <RoomList rooms={allRooms} />
      <Link href={'/room/create'}>部屋を作る</Link>
      <Link href={'/auth/login'}>ログインする</Link>
    </div>
  )
}

export default Home
