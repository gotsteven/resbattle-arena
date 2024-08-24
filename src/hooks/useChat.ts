import useSWR from 'swr'

export const useChat = () => {
  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data)

  const {
    data: messages,
    error,
    isLoading,
  } = useSWR('/api/message/get', fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: true,
  })

  return { messages, isError: error, isLoading }
}
