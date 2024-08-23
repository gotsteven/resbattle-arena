import { apiClient } from '@/lib/apiClient'
import type { Room } from '@/types/types'
import { useState } from 'react'

const Debate = ({ room, user }: { room: Room; user: string }) => {
  const [message, setMessage] = useState('')
  const sendMessage = async () => {
    await apiClient.api.message.send.$post({
      json: { roomId: room.id, playerId: user, message: message },
    })
  }

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)} // ユーザーが入力した内容を state に保存
      />
      <button onClick={sendMessage} type="submit">
        送信
      </button>
    </div>
  )
}

export default Debate
