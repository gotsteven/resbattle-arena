import { RoomList } from '@/app/room-list'
import { auth } from '@/auth'
import { LinkButton } from '@/components/ui/LinkButton'
import { roomRepo } from '@/repositories/roomRepo'
import { IconNote } from '@tabler/icons-react'
import { redirect } from 'next/navigation'
import { CreateRoom } from './create-room'

const Home = async () => {
  const session = await auth()

  if (session === null || session === undefined) redirect('/auth/login')

  const rooms = await roomRepo.findWaiting()

  return (
    <div className="flex flex-col gap-y-6 bg-background text-foreground">
      <CreateRoom />
      <LinkButton href="/rule" label="ルール説明を見る" icon={<IconNote />} />
      <RoomList rooms={rooms.reverse()} />
    </div>
  )
}

export default Home
