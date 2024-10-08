import { DEBATE_TURN_TIME_LIMIT } from '@/constants/config'
import type { Message } from '@/types/message'
import type { Room } from '@/types/room'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export const useGameTurn = (
  messages: Message[],
  room: Room,
  userId: string,
  onTimeout: () => void | Promise<void>,
) => {
  const [leftTurnTime, setLeftTurnTime] = useState(DEBATE_TURN_TIME_LIMIT)
  const timerIdRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const turnUser = useMemo(() => {
    const lastMessageUser = messages?.at(-1)?.player_id ?? room.player1_id
    return lastMessageUser === room.player1_id ? room.player2_id : room.player1_id
  }, [messages, room.player1_id, room.player2_id])

  const lastMessageTime = useMemo(() => {
    const latestMessageTime = messages?.at(-1)?.created_at
    const roomCreatedTime = room.started_at
    return (latestMessageTime ?? roomCreatedTime)?.getTime() ?? Date.now()
  }, [messages, room.started_at])

  const startTimer = useCallback(() => {
    stopTimer()

    const newTimerId = setInterval(() => {
      const currentTime = Date.now()
      const elapsedTime = Math.floor((currentTime - lastMessageTime) / 1000)
      const remainingTime = DEBATE_TURN_TIME_LIMIT - elapsedTime
      setLeftTurnTime(remainingTime >= 0 ? remainingTime : 0)

      if (remainingTime <= 0) {
        stopTimer()
        turnUser === userId && onTimeout()
      }
    }, 1000)
    timerIdRef.current = newTimerId
  }, [lastMessageTime, onTimeout, turnUser, userId])

  const stopTimer = useCallback(() => {
    if (timerIdRef.current === null) return

    clearInterval(timerIdRef.current)
    timerIdRef.current = null
  }, [])

  useEffect(() => {
    if (turnUser === userId) {
      startTimer()
    } else {
      stopTimer()
    }

    return stopTimer
  }, [startTimer, stopTimer, turnUser, userId])

  return { turnUser, leftTurnTime }
}
