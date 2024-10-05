export type Message = {
  msg_id: number
  room_id: string | null
  player_id: string
  message: string
}

export type MessageWithPosition = Omit<Message, 'room_id'> & {
  position: string | null
}
