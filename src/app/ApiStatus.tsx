'use client'
import { apiClient } from '@/lib/apiClient'
import { useEffect, useState } from 'react'
export const ApiStatus = () => {
  const [status, setStatus] = useState<string>('loading')
  useEffect(() => {
    const fetachAndSet = async () => {
      const res = await apiClient.api.health.$get()
      const json = await res.json()
      setStatus(json.status)
    }
    fetachAndSet()

    return () => setStatus('loading')
  }, [])
  return (
    <div>
      <p>API HealthCheck</p>
      <p>
        status: <span>{status}</span>
      </p>
    </div>
  )
}
