'use client'

import { useEffect, useState } from 'react'
import { apiClient } from '../../lib/apiClient'

const Page = () => {
  const [data, setData] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.api.ai.$get()
        if (res.ok) {
          const responseData = await res.json()
          setData(responseData)
        } else {
          setError(`Error: ${res.status} ${res.statusText}`)
        }
      } catch (err) {
        setError(`Error: ${err instanceof Error ? err.message : String(err)}`)
      }
    }

    fetchData()
  }, [])

  if (error) return <div>Error: {error}</div>
  if (!data) return <div>Loading...</div>

  return <div className="item-center flex justify-center">{JSON.stringify(data)}</div>
}

export default Page
