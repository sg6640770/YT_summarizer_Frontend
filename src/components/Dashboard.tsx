import React, { useEffect, useState } from 'react'
import { VideoInput } from './VideoInput'
import { HistorySection } from './HistorySection'
import { useVideoSummaries } from '../hooks/useVideoSummaries'
import { useAuthenticationStatus } from '@nhost/react'

export const Dashboard: React.FC = () => {
  const { summaries, loading, addSummary, fetchSummaries } = useVideoSummaries()
  const { isAuthenticated } = useAuthenticationStatus()

  
 
  // Fetch summaries if authenticated
  useEffect(() => {
    if (isAuthenticated) fetchSummaries()
  }, [isAuthenticated])

  return (
    <div  className="w-full max-w-5xl mx-auto px-4 space-y-8 transition-colors duration-500">
    

      <VideoInput onSummarizationStart={addSummary} />
      <HistorySection
        summaries={summaries}
        loading={loading}
        onRefresh={fetchSummaries}
      />
    </div>
  )
}
