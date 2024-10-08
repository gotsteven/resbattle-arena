import { apiClient } from '@/lib/apiClient'
import type { Room } from '@/types/room'
import type { InferRequestType } from 'hono'
import { useCallback } from 'react'
import useSWR from 'swr'

export const useRoom = (roomId: string) => {
  const $api = apiClient.api.room[':roomId']
  const fetcher = useCallback(
    (arg: InferRequestType<typeof $api.$get>) => async () => {
      return $api
        .$get(arg)
        .then((res) => res.json())
        .then((room) => ({
          ...room,
          started_at: room.started_at !== null ? new Date(room.started_at) : null,
        }))
    },
    [$api.$get],
  )

  const { data, error, isLoading } = useSWR<Room>(
    $api.$url().toString(),
    fetcher({ param: { roomId } }),
    { refreshInterval: 100, revalidateOnFocus: true },
  )

  return { room: data, isError: error, isLoading }
}
