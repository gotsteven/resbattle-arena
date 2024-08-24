import { useChat } from '@/hooks/useChat'
import type { Room } from '@/types/types'

const Messages = ({ room }: { room: Room }) => {
  const { messages, isError, isLoading } = useChat(room.id)

  return (
    <div>
      Messages
      {messages ? (
        messages.map((msg) => {
          return (
            <p
              key={msg.msg_id}
              className={msg.player_id === room.player1_id ? 'text-red-500' : 'text-blue-500'}
            >
              {msg.message}
            </p>
          )
        })
      ) : (
        <div>メッセージがありません</div>
      )}
    </div>
  )
}

export default Messages
