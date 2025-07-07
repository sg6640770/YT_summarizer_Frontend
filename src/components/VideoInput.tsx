// src/components/VideoInput.tsx

import React, { useState } from 'react'
import { getVideoSummary } from '../services/n8nService'
import { useUserData } from '@nhost/nextjs'

import { SummaryCard } from './SummaryCard'
import { VideoSummary } from '../types'
import { Loader2 } from 'lucide-react'
import { saveSummaryToBackend } from '../services/summaryService'

export const VideoInput: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [summaryData, setSummaryData] = useState<VideoSummary | null>(null)
  const [error, setError] = useState<string | null>(null)
   const user = useUserData()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!videoUrl.trim()) return

    setLoading(true)
    setError(null)

   

  try {
  const result = await getVideoSummary(videoUrl)
  const videoId = extractVideoId(videoUrl)

  const newSummary = {
    id: result.id || 'job-' + Date.now(),
    video_url: videoUrl,
    video_title: result.video_title,
    summary: result.summary,
    status: result.status || 'completed',
    video_thumbnail: `https://img.youtube.com/vi/${videoId}/0.jpg`
  }

  setSummaryData(newSummary)

  await saveSummaryToBackend({
    userEmail: user?.email ?? 'anonymous@demo.com',
    videoUrl,
    videoTitle: newSummary.video_title,
    summary: newSummary.summary
  })
} catch (err) {
  console.error(err)
  setError('Failed to fetch summary. Please try again.')
  setSummaryData(null)
}
 finally {
      setLoading(false)
    }
  }

  const extractVideoId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/.*v=|youtu\.be\/)([^&\n?#]+)/
    )
    return match ? match[1] : ''
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 space-y-6">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="url"
          required
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Enter YouTube video URL"
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          disabled={loading}
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Summarize'}
        </button>
      </form>

      {error && (
        <div className="text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">
          {error}
        </div>
      )}

      {summaryData && <SummaryCard summary={summaryData} />}
    </div>
  )
}
