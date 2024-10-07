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

type MultiAiComments = {
  reason: string[]
  feedback: string[]
}

export type AggregatedJudgeResult = {
  info: Omit<JudgeResult['info'], keyof MultiAiComments> & MultiAiComments
}
