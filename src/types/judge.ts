export type JudgeResult = {
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
