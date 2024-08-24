import { useTurn } from '@/hooks/useTurn'
import { apiClient } from '@/lib/apiClient'
import type { Room } from '@/types/types'
import { useState } from 'react'
import Messages from './Messages'

const Debate = ({ room, user }: { room: Room; user: string }) => {
  const [message, setMessage] = useState('')
  const { latestMsg, isError, isLoading } = useTurn(room.id)

  const sendMessage = async () => {
    await apiClient.api.message.send.$post({
      json: { roomId: room.id, playerId: user, message: message },
    })
    setMessage('')
  }

  return (
    <div>
      <Messages room={room} />
      {latestMsg?.player_id !== user ? (
        <div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)} // ユーザーが入力した内容を state に保存
          />
          <button onClick={sendMessage} type="button">
            送信
          </button>
        </div>
      ) : (
        <p>相手のターンです</p>
      )}
    </div>
  )
}

export default Debate
