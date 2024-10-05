import type { AiModel } from '@/lib/aiModels'

type commentByAiModels = {
  [key: AiModel['provider']]: string
}

export type JudgeResult = {
  info: {
    winner: number
    advantageRate: {
      player1: number
      player2: number
    }
    reason: commentByAiModels
    feedback: commentByAiModels
  }
}
