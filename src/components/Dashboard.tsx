import React, { useEffect } from 'react'
import { VideoInput } from './VideoInput'
import { HistorySection } from './HistorySection'
import { useVideoSummaries } from '../hooks/useVideoSummaries'
import { useAuthenticationStatus } from '@nhost/react'

interface DashboardProps {
  mode: 'light' | 'dark'
}

export const Dashboard: React.FC<DashboardProps> = ({ mode }) => {
  const { summaries, loading, addSummary, fetchSummaries } = useVideoSummaries()
  const { isAuthenticated } = useAuthenticationStatus()

  useEffect(() => {
    if (isAuthenticated) fetchSummaries()
  }, [isAuthenticated])

  return (
    <div
      className={`w-full max-w-5xl mx-auto px-4 space-y-8 transition-colors duration-500 ${
        mode === 'dark' ? 'text-white' : 'text-black'
      }`}
    >
      <VideoInput onSummarizationStart={addSummary} mode={mode} />

      <HistorySection
        summaries={summaries}
        loading={loading}
        onRefresh={fetchSummaries}
        mode={mode} // pass mode to HistorySection
      />
    </div>
  )
}
