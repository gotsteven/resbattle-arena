import { apiClient } from '@/lib/apiClient'
import type { InferRequestType, InferResponseType } from 'hono'
import { useState } from 'react'
import useSWR from 'swr'

type UnArray<T> = T extends (infer U)[] ? U : T
type PartialArrayChildren<T> = Partial<UnArray<T>>[]

export const useMessage = (roomId: string) => {
  const [messages, setMessages] = useState<
    PartialArrayChildren<InferResponseType<typeof $api.$get>>
  >([])

  const $api = apiClient.api.message.get
  const fetcher = (arg: InferRequestType<typeof $api.$get>) => async () => {
    const res = await $api.$get(arg)
    const data = await res.json()
    setMessages(data)
    return data
  }

  const {
    data: resMessages,
    error,
    isLoading,
  } = useSWR(
    `${$api.$url().toString()}-${roomId}`,
    fetcher({
      query: { roomId },
    }),
    {
      refreshInterval: 500,
      revalidateOnFocus: true,
    },
  )

  return { messages, isError: error, isLoading, setMessages }
}
