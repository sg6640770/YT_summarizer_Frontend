import React from 'react'
import { VideoInput } from './VideoInput'
import { HistorySection } from './HistorySection'
import { useVideoSummaries } from '../hooks/useVideoSummaries'

export const Dashboard: React.FC = () => {
  // This hook now handles summaries fully in memory (no DB)
  const { summaries, loading, addSummary } = useVideoSummaries()

  const handleSummarizationStart = (newSummary: any) => {
    addSummary(newSummary)
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <VideoInput onSummarizationStart={handleSummarizationStart} />
      <HistorySection
        summaries={summaries}
        loading={loading}
        onRefresh={() => {}}
      />
    </div>
  )
}
