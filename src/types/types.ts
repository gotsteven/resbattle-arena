export interface Room {
  player1_id: string
  player2_id: string | null
  topic: string
  status: string
  id: string
  player1_position: string | null
  player2_position: string | null
}
export type Message = {
  msg_id: number
  room_id: string | null
  player_id: string
  message: string
}
