'use client'
import { IconButton } from '@/components/ui/IconButton'
import { Loading } from '@/components/ui/Loading'
import { useMessage } from '@/hooks/useMessage'
import { useUser } from '@/hooks/useUser'
import { apiClient } from '@/lib/apiClient'
import type { Room } from '@/types/types'
import { IconBan, IconLoader2, IconSend, IconUser } from '@tabler/icons-react'
import { type FC, useMemo, useState } from 'react'
import { twJoin } from 'tailwind-merge'

type RoomGameProps = {
  room: Room
  userId: string
  userPosition: 1 | 2
}

export const RoomGame: FC<RoomGameProps> = ({ room, userId, userPosition }) => {
  const [messageInput, setMessageInput] = useState('')
  const enemyUserId = userPosition === 1 ? room.player2_id : room.player1_id
  const { user: enemyUser } = useUser(enemyUserId ?? '')

  const myPosition = userPosition === 1 ? room.player1_position : room.player2_position

  const { messages, setMessages, isLoading } = useMessage(room.id)

  const [isSending, setIsSending] = useState(false)
  const sendMessage = async () => {
    setIsSending(true)
    await apiClient.api.message.send
      .$post({
        json: { roomId: room.id, playerId: userId, message: messageInput },
      })
      .finally(() => {
        setIsSending(false)
        setMessageInput('')
        setMessages((prev) => [
          ...prev,
          { player_id: userId, room_id: room.id, message: messageInput },
        ])
      })
  }

  const turnUser = useMemo(() => {
    if (messages?.length === 0) return room.player2_id
    const lastMessageUser = messages.at(-1)?.player_id
    return lastMessageUser === room.player1_id ? room.player2_id : room.player1_id
  }, [messages, room.player1_id, room.player2_id])

  return (
    <div className="relative flex grow flex-col gap-y-8 pb-16">
      <div className="flex flex-col items-center gap-y-2">
        <h2 className="font-bold text-lg">
          <span>｢{room.topic}について｣</span> -{' '}
          <span className={twJoin(myPosition === 'agree' ? 'text-blue-500' : 'text-red-500')}>
            {myPosition === 'agree' ? '賛成' : '反対'}
          </span>
        </h2>
        <p className="flex items-center gap-x-2 text-foreground-400">
          vs <IconUser size={20} /> {enemyUser?.name}
        </p>
      </div>
      {isLoading || messages !== undefined ? (
        <div className="flex flex-col gap-y-2">
          {messages.map?.((message) => (
            <div key={message.msg_id} className="flex">
              <p
                className={twJoin(
                  'w-fit max-w-[80%] rounded-md p-2',
                  message.player_id === enemyUserId && 'bg-background-50',
                  message.player_id === userId && 'text ml-auto bg-accent text-white',
                )}
              >
                {message.message}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
      <div className="absolute bottom-0 flex w-full gap-x-2">
        <input
          type="text"
          value={messageInput}
          disabled={isSending || turnUser !== userId}
          onChange={(e) => setMessageInput(e.currentTarget.value)}
          placeholder={turnUser === userId ? 'メッセージを送信' : '相手のターンです'}
          className={twJoin(
            'shrink grow rounded-lg border border-background-100 bg-background-50 p-2 text-sm outline-0',
            'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            turnUser !== userId && 'cursor-not-allowed placeholder:text-accent-200',
          )}
        />
        <IconButton
          icon={turnUser !== userId ? IconBan : isSending ? IconLoader2 : IconSend}
          onClick={sendMessage}
          disabled={isSending || turnUser !== userId}
          iconClassName={twJoin(isSending && 'animate-spin')}
        />
      </div>
    </div>
  )
}
