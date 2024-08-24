import { apiClient } from '@/lib/apiClient'
import type { InferRequestType } from 'hono'
import useSWR from 'swr'

export const useChat = (roomId: string) => {
  const $get = apiClient.api.message.get.$get
  const fetcher = (arg: InferRequestType<typeof $get>) => async () => {
    const res = await $get(arg)
    return await res.json()
  }

  const {
    data: messages,
    error,
    isLoading,
  } = useSWR(
    apiClient.api.message.get.$url,
    fetcher({
      query: { roomId },
    }),
    {
      refreshInterval: 5000,
      revalidateOnFocus: true,
    },
  )

  return { messages, isError: error, isLoading }
}
