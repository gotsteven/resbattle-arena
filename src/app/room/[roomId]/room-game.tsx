'use client'
import { IconButton } from '@/components/ui/IconButton'
import { Loading } from '@/components/ui/Loading'
import TextContent from '@/components/ui/textContent'
import { useMessage } from '@/hooks/useMessage'
import { useUser } from '@/hooks/useUser'
import { apiClient } from '@/lib/apiClient'
import type { AIResponse, Room } from '@/types/types'
import { IconBan, IconLoader2, IconSend, IconUser } from '@tabler/icons-react'
import { type FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { twJoin } from 'tailwind-merge'

type RoomGameProps = {
  room: Room
  userId: string
  userPosition: 1 | 2
}

const TURN_TIME_LIMIT = 10 // ターンの制限時間（秒）

export const RoomGame: FC<RoomGameProps> = ({ room, userId, userPosition }) => {
  const [messageInput, setMessageInput] = useState('')
  const [turnTimeLeft, setTurnTimeLeft] = useState(TURN_TIME_LIMIT)
  const [isSending, setIsSending] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const hasTimedOut = useRef(false)
  const hasSentMessage = useRef(false)
  const [result, setResult] = useState<AIResponse>()

  const enemyUserId = userPosition === 1 ? room.player2_id : room.player1_id
  const { user: enemyUser } = useUser(enemyUserId ?? '')
  const myPosition = userPosition === 1 ? room.player1_position : room.player2_position
  const { messages, isError, isLoading } = useMessage(room.id)

  // ターンのユーザーを計算
  const turnUser = useMemo(() => {
    if (messages?.length === 0) return room.player2_id
    const lastMessageUser = messages?.at(-1)?.player_id
    return lastMessageUser === room.player1_id ? room.player2_id : room.player1_id
  }, [messages, room.player1_id, room.player2_id])

  // 前のメッセージの作成日時またはルームの開始日時を取得
  const previousMessageTime = useMemo(() => {
    const created_at = messages?.at(-1)?.created_at
    if (created_at && messages.length > 0) {
      return new Date(created_at).getTime()
    }
    if (room.started_at) {
      return new Date(room.started_at).getTime()
    }
    return Date.now()
  }, [messages, room.started_at])

  // タイマーを開始・停止する関数を定義
  const startTimer = useCallback(() => {
    stopTimer()
    hasTimedOut.current = false
    timerRef.current = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - previousMessageTime) / 1000)
      const remainingTime = TURN_TIME_LIMIT - elapsedSeconds
      setTurnTimeLeft(remainingTime >= 0 ? remainingTime : 0)

      if (remainingTime <= 0 && !hasTimedOut.current) {
        hasTimedOut.current = true
        stopTimer()
        handleTurnTimeOut()
      }
    }, 1000)
  }, [previousMessageTime])

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  // タイムアウト時の処理
  const handleTurnTimeOut = () => {
    sendMessage(messageInput)
  }

  // メッセージを送信する関数
  const sendMessage = async (message: string) => {
    if (isSending || hasSentMessage.current) return
    hasSentMessage.current = true
    setMessageInput('')
    setIsSending(true)
    try {
      const res = await apiClient.api.message.send.$post({
        json: { roomId: room.id, playerId: userId, message },
      })
      const aiData = await res.json()
      setResult(aiData.response)
    } catch (error) {
      console.error('メッセージの送信中にエラーが発生しました:', error)
    } finally {
      setIsSending(false)
    }
  }

  // 送信ボタンのハンドラー
  const handleSendMessage = () => {
    sendMessage(messageInput)
  }

  // ターンユーザーが変わったときにタイマーを再設定
  useEffect(() => {
    if (turnUser === userId) {
      hasSentMessage.current = false
      startTimer()
    } else {
      stopTimer()
    }
    return () => {
      stopTimer()
    }
  }, [turnUser, userId, startTimer, stopTimer])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [messageInput])

  if (isLoading) return <Loading />
  return (
    <div className="relative flex h-full grow flex-col gap-y-8 pb-16">
      <div className="flex flex-col items-center gap-y-2">
        <h2 className="font-bold text-lg">
          <span>｢{room.topic}について｣</span> -{' '}
          <span className={twJoin(myPosition === 'agree' ? 'text-blue-500' : 'text-red-500')}>
            {myPosition === 'agree' ? '賛成' : '反対'}
          </span>
        </h2>
        <p>
          現在
          {room.player1_id === userId
            ? result?.info.advantageRate.player1 && result?.info.advantageRate.player1 >= 50
              ? '優勢です！'
              : '劣勢です…'
            : result?.info.advantageRate.player2 && result?.info.advantageRate.player2 >= 50
              ? '優勢です！'
              : '劣勢です…'}
        </p>
        <p className="flex items-center gap-x-2 text-foreground-400">
          vs <IconUser size={20} /> {enemyUser?.name}
        </p>
        {turnUser === userId && <p>ターン残り時間：{turnTimeLeft}秒</p>}
      </div>
      {isLoading || messages !== undefined ? (
        <div className="flex flex-col gap-y-2 overflow-y-auto">
          {messages?.map?.((message) => (
            <div
              key={message.msg_id}
              className={twJoin(
                'w-fit max-w-[80%] rounded-md px-4 py-2',
                message.player_id === enemyUserId && 'bg-background-50',
                message.player_id === userId && 'text ml-auto bg-accent text-white',
              )}
            >
              <TextContent textContent={message.message} />
            </div>
          ))}
          {turnUser !== userId && (
            <div
              className={twJoin(
                'flex w-fit max-w-[80%] space-x-1 rounded-md px-4 py-2',
                'bg-background-50',
                'text bg-accent text-white',
              )}
            >
              <span
                className={twJoin('animate-bounce text-3xl text-black delay-100')}
                style={{ animationDelay: '100ms' }}
              >
                .
              </span>
              <span
                className={twJoin('animate-bounce text-3xl text-black delay-300')}
                style={{ animationDelay: '200ms' }}
              >
                .
              </span>
              <span
                className={twJoin('animate-bounce text-3xl text-black delay-500')}
                style={{ animationDelay: '300ms' }}
              >
                .
              </span>
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
      <div className="absolute bottom-0 flex w-full gap-x-2">
        <textarea
          ref={textareaRef}
          value={messageInput}
          rows={1}
          maxLength={400}
          disabled={isSending || turnUser !== userId}
          onChange={(e) => setMessageInput(e.currentTarget.value)}
          placeholder={turnUser === userId ? 'メッセージを送信' : '相手のターンです'}
          className={twJoin(
            'shrink grow rounded-lg border border-background-100 bg-background-50 p-2 text-sm outline-0',
            'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            turnUser !== userId && 'cursor-not-allowed placeholder:text-accent-200',
            'resize-none overflow-hidden',
          )}
        />
        <IconButton
          icon={turnUser !== userId ? IconBan : isSending ? IconLoader2 : IconSend}
          onClick={handleSendMessage}
          disabled={isSending || turnUser !== userId}
          iconClassName={twJoin(isSending && 'animate-spin')}
        />
      </div>
    </div>
  )
}
