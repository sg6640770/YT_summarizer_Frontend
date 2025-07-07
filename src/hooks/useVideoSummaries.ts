import { useState, useEffect } from 'react'
import { VideoSummary } from '../types'

export const useVideoSummaries = () => {
  const [summaries, setSummaries] = useState<VideoSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // If needed, load from localStorage or just simulate loading
    const timeout = setTimeout(() => {
      setSummaries([]) // Could load from localStorage or an API in the future
      setLoading(false)
    }, 300) // Simulated fetch delay

    return () => clearTimeout(timeout)
  }, [])

  const fetchSummaries = () => {
    // Optional in local-only app; here we simulate a refresh
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 300)
  }

  const addSummary = (summary: VideoSummary) => {
    setSummaries(prev => [summary, ...prev])
  }

  const updateSummary = (video_id: string, updates: Partial<VideoSummary>) => {
    setSummaries(prev =>
      prev.map(summary =>
        summary.video_id === video_id ? { ...summary, ...updates } : summary
      )
    )
  }

  return {
    summaries,
    loading,
    error,
    fetchSummaries,
    addSummary,
    updateSummary
  }
}
