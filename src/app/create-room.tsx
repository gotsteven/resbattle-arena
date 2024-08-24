'use client'
import { IconButton } from '@/components/ui/IconButton'
import { apiClient } from '@/lib/apiClient'
import { IconHomePlus } from '@tabler/icons-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { type ChangeEvent, useCallback, useState } from 'react'
import { twJoin } from 'tailwind-merge'

export const CreateRoom = () => {
  const [topic, setTopic] = useState('')
  const { data: session } = useSession()
  const router = useRouter()

  const inputTopicHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTopic(e.currentTarget.value)
  }, [])

  if (session === null) {
    router.push('/auth/login')
    return null
  }

  const createRoomHandler = async () => {
    console.log(apiClient.api.room.create.$url().toJSON())
    const res = await apiClient.api.room.create.$post({
      json: { player1_id: session.user.id, topic: topic },
    })
    if (res.ok) {
      const data = await res.json()
      router.push(`/room/${data.room_id}`)
    }
  }

  return (
    <>
      <h2>新規ディベート作成</h2>
      <div className="flex items-center gap-x-2">
        <input
          id="topic"
          type="text"
          value={topic}
          onChange={inputTopicHandler}
          placeholder="トピックを入力"
          className={twJoin(
            'shrink grow rounded-lg border border-background-100 bg-background-50 p-2 text-sm outline-0',
            'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          )}
        />
        <IconButton
          onClick={createRoomHandler}
          label="作成"
          icon={IconHomePlus}
          disabled={topic.length === 0}
        />
      </div>
    </>
  )
}
