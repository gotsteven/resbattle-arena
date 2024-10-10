'use client'

import { Loading } from '@/components/common/Loading'
import { TypingIndicator } from '@/components/common/TypingIndicator'
import { IconButton } from '@/components/ui/IconButton'
import { TextArea } from '@/components/ui/TextArea'
import { useMessage } from '@/hooks/fetcher/useMessage'
import { useGameTurn } from '@/hooks/useGameTimer'
import { apiClient } from '@/lib/apiClient'
import { aggregateJudgeResults } from '@/services/result'
import type { AggregatedJudgeResult } from '@/types/judge'
import type { Room } from '@/types/room'
import { IconBan, IconLoader2, IconSend } from '@tabler/icons-react'
import { type FC, useCallback, useState } from 'react'
import { twJoin } from 'tailwind-merge'
import { GameInfo } from './game-info'
import { Message } from './message'

type RoomGameProps = {
  room: Room
  userId: string
  userPosition: 1 | 2
}

export const RoomGame: FC<RoomGameProps> = ({ room, userId, userPosition }) => {
  const [messageInput, setMessageInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [result, setResult] = useState<AggregatedJudgeResult>()

  const { messages, isLoading } = useMessage(room.id)

  const sendMessage = useCallback(async () => {
    if (isSending) return

    setMessageInput('')
    setIsSending(true)

    await apiClient.api.message
      .$post({
        json: { roomId: room.id, playerId: userId, message: messageInput },
      })
      .then((res) => res.json())
      .then(({ judgeResults }) => {
        setResult(aggregateJudgeResults(judgeResults))
        setMessageInput('')
      })
      .catch((error) => {
        console.error('メッセージの送信中にエラーが発生しました:', error)
        throw error
      })
      .finally(() => setIsSending(false))
  }, [isSending, room.id, userId, messageInput])

  const { turnUser, leftTurnTime } = useGameTurn(messages ?? [], room, userId, sendMessage)

  if (isLoading) return <Loading />

  return (
    <div className="relative flex h-full grow flex-col gap-y-8 pb-16">
      <GameInfo
        room={room}
        userPosition={userPosition}
        result={result}
        userId={userId}
        turnUser={turnUser}
        leftTurnTime={leftTurnTime}
      />
      {messages !== undefined ? (
        <div className="flex flex-col gap-y-2 overflow-y-auto">
          {messages?.map?.((message) => (
            <Message key={message.msg_id} isOwn={message.player_id === userId}>
              {message.message}
            </Message>
          ))}
          {turnUser !== userId && (
            <Message isOwn={false}>
              <TypingIndicator />
            </Message>
          )}
        </div>
      ) : (
        <Loading />
      )}
      <div className="absolute bottom-0 flex w-full gap-x-2">
        <TextArea
          value={messageInput}
          rows={1}
          maxLength={400}
          disabled={isSending || turnUser !== userId}
          setValue={setMessageInput}
          placeholder={turnUser === userId ? 'メッセージを送信' : '相手のターンです'}
          className={twJoin(
            turnUser !== userId && 'cursor-not-allowed placeholder:text-accent-200',
          )}
          autoHeight={true}
        />
        <IconButton
          icon={isSending ? IconLoader2 : turnUser !== userId ? IconBan : IconSend}
          onClick={sendMessage}
          disabled={isSending || turnUser !== userId}
          iconClassName={twJoin(isSending && 'animate-spin')}
        />
      </div>
    </div>
  )
}
