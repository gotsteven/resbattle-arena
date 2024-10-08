export type Room = {
  player1_id: string
  player2_id: string | null
  topic: string
  status: string
  id: string
  player1_position: string | null
  player2_position: string | null
  started_at: Date | null
}
