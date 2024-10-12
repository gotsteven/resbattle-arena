'use client'
import { IconButton } from '@/components/ui/IconButton'
import { apiClient } from '@/lib/apiClient'
import { IconHomePlus, IconLoader2 } from '@tabler/icons-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { type ChangeEvent, useCallback, useState } from 'react'
import { twJoin } from 'tailwind-merge'
import { DEBATE_TOPICS } from '../constants/topics'

export const CreateRoom = () => {
  const [topic, setTopic] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  const inputTopicHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTopic(e.currentTarget.value)
  }, [])

  const createRoomHandler = useCallback(async () => {
    if (session === null) return
    setIsCreating(true)

    await apiClient.api.room
      .$post({
        json: { player1_id: session.user.id, topic: topic },
      })
      .then((res) => res.json())
      .then((data) => {
        router.push(`/room/${data.id}`)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => setIsCreating(false))
  }, [session, topic, router])

  if (session === null) {
    router.push('/auth/login')
  }

  return (
    <>
      <h2>新規ディベート作成</h2>
      <div className="flex items-center gap-x-2">
        <input
          value={topic}
          type="text"
          id="topic"
          name="topic"
          list="topic-list"
          className={twJoin(
            'shrink grow rounded-lg border border-background-100 bg-background-50 p-2 text-sm outline-0',
            'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            '[&::-webkit-calendar-picker-indicator]:opacity-0',
          )}
          placeholder="トピックを選択または入力してください"
          onChange={inputTopicHandler}
        />
        <datalist id="topic-list">
          {DEBATE_TOPICS.map((topic) => (
            <option key={topic} value={topic} />
          ))}
        </datalist>
        <IconButton
          onClick={createRoomHandler}
          label="作成"
          icon={isCreating ? IconLoader2 : IconHomePlus}
          disabled={topic.length === 0}
          iconClassName={twJoin(isCreating && 'animate-spin text-accent')}
        />
      </div>
    </>
  )
}
