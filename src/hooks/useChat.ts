import type { Message } from '@/types/types'
import useSWR from 'swr'

export const useChat = (roomId: string) => {
  const fetcher = (url: string): Promise<Message[]> =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data)

  const {
    data: messages,
    error,
    isLoading,
  } = useSWR(`/api/message/get/${roomId}`, fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: true,
  })

  return { messages, isError: error, isLoading }
}
