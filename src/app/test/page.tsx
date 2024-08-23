'use client'

import React from 'react'


import { useEffect, useState } from "react"
import { apiClient } from '../../lib/apiClient'

const page = () => {
  const [result, setResult] = useState<string | null>(null)

  useEffect(() => {
    const result = async () => {
      const res = await apiClient.api.ai.$post({
        json: { prompt:"こんにちは" },
      })
      if (res.ok) {
        const data = await res.json()
        setResult(data)
      } else {
        setResult("error")
      }
    }
  }, [])

  return (
    <div className='flex item-center justify-center'>
    {result}
    </div>
  )
}

export default page
