import { useChat } from '@/hooks/useChat'
import { apiClient } from '@/lib/apiClient'
import type { Room } from '@/types/types'
const updateStatus = async (roomId: string) => {
  await apiClient.api.room.update.status.$post({ json: { status: 'end', id: roomId } })
}

const Messages = ({ room }: { room: Room }) => {
  const { messages, isError, isLoading } = useChat(room.id)
  if (messages && messages[0].room_id === room.id && messages?.length === 10) {
    updateStatus(room.id)
  }

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
