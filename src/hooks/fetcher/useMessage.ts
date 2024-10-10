import { apiClient } from '@/lib/apiClient'
import type { Message } from '@/types/message'
import type { InferRequestType } from 'hono'
import { useCallback } from 'react'
import useSWR from 'swr'

export const useMessage = (roomId: string) => {
  const $api = apiClient.api.message
  const fetcher = useCallback(
    (arg: InferRequestType<typeof $api.$get>) => async () => {
      return $api
        .$get(arg)
        .then((res) => res.json())
        .then((messages) =>
          messages.map((message) => ({ ...message, created_at: new Date(message.created_at) })),
        )
    },
    [$api.$get],
  )

  const { data, error, isLoading } = useSWR<Message[]>(
    `${$api.$url().toString()}-${roomId}`,
    fetcher({ query: { roomId } }),
    { refreshInterval: 100, revalidateOnFocus: true },
  )

  return { messages: data, isError: error, isLoading }
}
