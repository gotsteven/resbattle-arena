import { apiClient } from '@/lib/apiClient'
import type { InferRequestType } from 'hono'
import useSWR from 'swr'

export const useRoom = (roomId: string) => {
  const $api = apiClient.api.room[':roomId']
  const fetcher = (arg: InferRequestType<typeof $api.$get>) => async () => {
    const res = await $api.$get(arg)
    return await res.json()
  }

  const { data, error, isLoading } = useSWR(
    $api.$url().toString(),
    fetcher({
      param: { roomId },
    }),
    {
      refreshInterval: 100,
      revalidateOnFocus: true,
    },
  )

  return { room: data, isError: error, isLoading }
}
