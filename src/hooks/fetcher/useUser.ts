import { apiClient } from '@/lib/apiClient'
import type { InferRequestType } from 'hono'
import { useCallback } from 'react'
import useSWR from 'swr'

export const useUser = (userId: string) => {
  const $api = apiClient.api.user
  const fetcher = useCallback(
    (arg: InferRequestType<typeof $api.$get>) => async () => {
      return $api.$get(arg).then((res) => res.json())
    },
    [$api.$get],
  )

  const { data, error, isLoading } = useSWR(
    `${$api.$url().toString()}-${userId}`,
    fetcher({ query: { userId } }),
    { refreshInterval: 1000, revalidateOnFocus: true },
  )

  return { user: data, isError: error, isLoading }
}
