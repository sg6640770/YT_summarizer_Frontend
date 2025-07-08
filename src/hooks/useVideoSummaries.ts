import { useEffect, useState } from 'react'
import { useUserData } from '@nhost/react'
import { VideoSummary } from '../types'

export const useVideoSummaries = () => {
  const user = useUserData()
  const [summaries, setSummaries] = useState<VideoSummary[]>([])
  const [loading, setLoading] = useState(false)

  const addSummary = (summary: VideoSummary) => {
    setSummaries(prev => [summary, ...prev])
  }

  const fetchSummaries = async () => {
    if (!user?.email) return
    setLoading(true)
    try {
      const res = await fetch(`https://ytsummarizerbackend-production.up.railway.app/api/summaries/${user.email}`)
      const data = await res.json()

      const summariesWithStatus = data.map((item: any) => ({
        ...item,
        status: 'completed'
      }))

      setSummaries(summariesWithStatus)
    } catch (error) {
      console.error('❌ Failed to fetch summaries', error)
    } finally {
      setLoading(false)
    }
  }

  return {
    summaries,
    loading,
    addSummary,
    fetchSummaries
  }
}
