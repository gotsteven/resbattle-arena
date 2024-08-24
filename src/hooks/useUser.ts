import { apiClient } from '@/lib/apiClient'
import type { InferRequestType } from 'hono'
import useSWR from 'swr'

export const useUser = (userId: string) => {
  const $get = apiClient.api.user.$get
  const fetcher = (arg: InferRequestType<typeof $get>) => async () => {
    const res = await $get(arg)
    return await res.json()
  }

  const { data, error, isLoading } = useSWR(
    `get-user-${userId}`,
    fetcher({
      query: { userId },
    }),
    {
      refreshInterval: 1000,
      revalidateOnFocus: true,
    },
  )

  return { user: data, isError: error, isLoading }
}
