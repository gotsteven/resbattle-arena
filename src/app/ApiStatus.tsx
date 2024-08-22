'use client'
import { apiClient } from '@/lib/apiClient'
import { useEffect, useState } from 'react'
export const ApiStatus = () => {
  const [status, setStatus] = useState<string>('loading')
  useEffect(() => {
    try {
      const fetchAndSet = async () => {
        const res = await apiClient.api.health.$get()
        const json = await res.json()
        setStatus(json.status)
      }
      fetchAndSet()
    } catch (e) {
      setStatus('error')
    }

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
