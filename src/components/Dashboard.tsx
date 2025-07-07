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
    <div className="space-y-8">
      <VideoInput onSummarizationStart={handleSummarizationStart} />
      <HistorySection
        summaries={summaries}
        loading={loading}
        // Removed fetchSummaries (no backend DB anymore)
        onRefresh={() => {}} // No-op or you can remove `onRefresh` prop from `HistorySection`
      />
    </div>
  )
}
