import { apiClient } from '@/lib/apiClient'
import type { InferRequestType } from 'hono'
import { useCallback } from 'react'
import useSWR from 'swr'

export const useResult = (userId: string) => {
  const $api = apiClient.api.result
  const fetcher = useCallback(
    (arg: InferRequestType<typeof $api.$get>) => async () => {
      return $api.$get(arg).then(async (res) => {
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
      })
    },
    [$api.$get],
  )

  const { data, error, isLoading } = useSWR(`${$api.$url().toString()}-${userId}`, fetcher({}), {
    refreshInterval: 100,
    revalidateOnFocus: true,
  })

  return { results: data, isError: error, isLoading }
}
