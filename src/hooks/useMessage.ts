import { apiClient } from '@/lib/apiClient'
import type { InferRequestType } from 'hono'
import useSWR from 'swr'

type UnArray<T> = T extends (infer U)[] ? U : T
type PartialArrayChildren<T> = Partial<UnArray<T>>[]

export const useMessage = (roomId: string) => {
  const $api = apiClient.api.message.get
  const fetcher = (arg: InferRequestType<typeof $api.$get>) => async () => {
    const res = await $api.$get(arg)
    const data = await res.json()
    return data
  }

  const {
    data: messages,
    error,
    isLoading,
  } = useSWR(
    `${$api.$url().toString()}-${roomId}`,
    fetcher({
      query: { roomId },
    }),
    {
      refreshInterval: 100,
      revalidateOnFocus: true,
    },
  )

  return { messages, isError: error, isLoading }
}
