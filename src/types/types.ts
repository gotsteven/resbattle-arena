import type { debateResults } from '@/drizzle/schema'
import type { InferInsertModel } from 'drizzle-orm'

export interface Room {
  player1_id: string
  player2_id: string | null
  topic: string
  status: string
  id: string
  player1_position: string | null
  player2_position: string | null
}
export interface Message {
  msg_id: number
  room_id: string | null
  player_id: string
  message: string
}
export interface AIResponse {
  info: {
    winner: number
    advantageRate: {
      player1: number
      player2: number
    }
    reason: string
    feedback: string
  }
}

export type Result = InferInsertModel<typeof debateResults>
