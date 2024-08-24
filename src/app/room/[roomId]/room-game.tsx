'use client'

import { apiClient } from '@/lib/apiClient'
import type { Room } from '@/types/types'
import { type FC, useState } from 'react'
import { Messages } from './messages'

type RoomGameProps = {
  room: Room
  user: string
}

export const RoomGame: FC<RoomGameProps> = ({ room, user }) => {
  const [message, setMessage] = useState('')
  const sendMessage = async () => {
    await apiClient.api.message.send.$post({
      json: { roomId: room.id, playerId: user, message: message },
    })
    setMessage('')
  }

  return (
    <div>
      <Messages room={room} />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)} // ユーザーが入力した内容を state に保存
      />
      <button onClick={sendMessage} type="button">
        送信
      </button>
    </div>
  )
}