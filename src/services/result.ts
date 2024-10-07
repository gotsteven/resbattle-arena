import type { debateResults } from '@/drizzle/schema'
import { type AiModel, getAiModelName } from '@/lib/aiModels'
import { resultRepo } from '@/repositories/resultRepo'
import type { JudgeResult } from '@/types/judge'
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
