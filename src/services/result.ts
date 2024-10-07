import type { debateResults } from '@/drizzle/schema'
import { type AiModel, aiModels, getAiModelName } from '@/lib/aiModels'
import { resultRepo } from '@/repositories/resultRepo'
import type { AggregatedJudgeResult, JudgeResult } from '@/types/judge'
import type { Result } from '@/types/result'
import type { Room } from '@/types/room'
import type { InferInsertModel } from 'drizzle-orm'

export const saveResult = async (
  currentRoom: Room,
  judgeResults: Record<AiModel['provider'], JudgeResult>,
) => {
  const resultDates = Object.entries(judgeResults).map(([provider, { info: judgeResult }]) => ({
    room_id: currentRoom.id,
    topic: currentRoom.topic,
    ...judgeResult,
    winner_id:
      judgeResult.winner === 1 && currentRoom.player1_position === 'agree'
        ? currentRoom.player1_id
        : currentRoom.player2_id,
    ad_p1: judgeResult.advantageRate.player1,
    ad_p2: judgeResult.advantageRate.player2,
    player1_id: currentRoom.player1_id,
    player2_id: currentRoom.player2_id,
    judged_by: getAiModelName(provider),
  })) satisfies InferInsertModel<typeof debateResults>[]

  const createdResult = await Promise.all(resultDates.map((result) => resultRepo.create(result)))

  return createdResult
}

export const aggregateJudgeResults = (
  results: Record<string, JudgeResult>,
): AggregatedJudgeResult => {
  const [pointPlayer1, pointPlayer2] = Object.values(results).reduce(
    ([player1, player2], { info }) => [
      player1 + info.advantageRate.player1 / aiModels.length,
      player2 + info.advantageRate.player2 / aiModels.length,
    ],
    [0, 0],
  )
  const isDraw = pointPlayer1 === pointPlayer2
  const totalWinner = pointPlayer1 > pointPlayer2 ? 1 : 2

  return {
    info: {
      winner: isDraw ? 0 : totalWinner,
      advantageRate: {
        player1: pointPlayer1,
        player2: pointPlayer2,
      },
      reason: Object.values(results).map(({ info }) => info.reason),
      feedback: Object.values(results).map(({ info }) => info.feedback),
    },
  }
}

export const aggregateResults = (results: Result[]) => {
  const [pointPlayer1, pointPlayer2] = results.reduce(
    ([player1, player2], { ad_p1, ad_p2 }) => [player1 + ad_p1, player2 + ad_p2],
    [0, 0],
  )
  const isDraw = pointPlayer1 === pointPlayer2
  const totalWinner = pointPlayer1 > pointPlayer2 ? 1 : 2

  return {
    ...results[0],
    winner: isDraw ? 0 : totalWinner,
    advantageRate: {
      player1: pointPlayer1,
      player2: pointPlayer2,
    },
    reason: results.map(({ reason }) => reason),
    feedback: results.map(({ feedback }) => feedback),
  }
}
