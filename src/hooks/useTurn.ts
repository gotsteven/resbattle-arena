import { apiClient } from '@/lib/apiClient'
import type { InferRequestType } from 'hono'
import useSWR from 'swr'

export const useTurn = (roomId: string) => {
  const $get = apiClient.api.message.get.latest.$get
  const fetcher = (arg: InferRequestType<typeof $get>) => async () => {
    const res = await $get(arg)
    return await res.json()
  }

  const {
    data: latestMsg,
    error,
    isLoading,
  } = useSWR(
    apiClient.api.message.get.latest.$url().toString(),
    fetcher({
      query: { roomId },
    }),
    {
      refreshInterval: 1000,
      revalidateOnFocus: true,
    },
  )

  return { latestMsg, isError: error, isLoading }
}
