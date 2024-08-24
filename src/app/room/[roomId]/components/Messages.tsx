import { apiClient } from '@/lib/apiClient'
import type { Room } from '@/types/types'
import useSWR from 'swr'

const msgFetcher = async () => {
  const res = await apiClient.api.message.get.$get()
  const data = await res.json()
  return data
}

const Messages = ({ room }: { room: Room }) => {
  const { data: messages, error } = useSWR(apiClient.api.message.get.$url(), msgFetcher, {
    refreshInterval: 1000,
  })
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
