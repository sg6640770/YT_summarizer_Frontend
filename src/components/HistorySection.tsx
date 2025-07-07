import React from 'react'
import { VideoSummary } from '../types'
import { SummaryCard } from './SummaryCard'
import { History } from 'lucide-react'

interface HistorySectionProps {
  summaries: VideoSummary[]
  loading: boolean
  onRefresh?: () => void // ✅ optional now
}

export const HistorySection: React.FC<HistorySectionProps> = ({
  summaries,
  loading,
  onRefresh
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
            <History className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Summary History
            </h2>
            <p className="text-sm text-gray-600">
              Your previously summarized videos
            </p>
          </div>
        </div>

        {/* ✅ Only show refresh button if onRefresh is provided */}
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M4 4v6h6M20 20v-6h-6M4 20l16-16" />
            </svg>
            <span>Refresh</span>
          </button>
        )}
      </div>

      {loading && summaries.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading your summaries...</p>
        </div>
      ) : summaries.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <History className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No summaries yet
          </h3>
          <p className="text-gray-500">
            Start by summarizing your first YouTube video above
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {summaries.map((summary) => (
            <SummaryCard key={summary.id} summary={summary} />
          ))}
        </div>
      )}
    </div>
  )
}
