import React, { useEffect } from 'react'
import { VideoInput } from './VideoInput'
import { HistorySection } from './HistorySection'
import { useVideoSummaries } from '../hooks/useVideoSummaries'
import { useAuthenticationStatus } from '@nhost/react'

export const Dashboard: React.FC = () => {
  const { summaries, loading, addSummary, fetchSummaries } = useVideoSummaries()
  const { isAuthenticated } = useAuthenticationStatus()

  const handleSummarizationStart = (newSummary: any) => {
    addSummary(newSummary)
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchSummaries()
    }
  }, [isAuthenticated])

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <VideoInput onSummarizationStart={handleSummarizationStart} />
      <HistorySection
        summaries={summaries}
        loading={loading}
        onRefresh={fetchSummaries}
      />
    </div>
  )
}
