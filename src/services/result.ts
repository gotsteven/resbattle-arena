import type { debateResults } from '@/drizzle/schema'
import { resultRepo } from '@/repositories/resultRepo'
import type { JudgeResult } from '@/types/judge'
import type { Room } from '@/types/room'
import type { InferInsertModel } from 'drizzle-orm'

export const saveResult = async (
  currentRoom: Room,
  { info: { advantageRate, ...judgeResult } }: JudgeResult,
) => {
  const resultDate = {
    room_id: currentRoom.id,
    topic: currentRoom.topic,
    ...judgeResult,
    winner_id:
      judgeResult.winner === 1 && currentRoom.player1_position === 'agree'
        ? currentRoom.player1_id
        : currentRoom.player2_id,
    ad_p1: advantageRate.player1,
    ad_p2: advantageRate.player2,
    player1_id: currentRoom.player1_id,
    player2_id: currentRoom.player2_id,
  } satisfies InferInsertModel<typeof debateResults>

  const createdResult = await resultRepo.create(resultDate)
  return createdResult
}
