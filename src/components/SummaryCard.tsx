import React, { useState } from 'react'
import { VideoSummary } from '../types'
import { Clock, Copy, ExternalLink, Loader2, CheckCircle, XCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import ReactMarkdown from 'react-markdown'

interface SummaryCardProps {
  summary: VideoSummary
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ summary }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const textToCopy = summary.summary || ''
    if (!textToCopy.trim()) {
      toast.error('No summary text to copy')
      return
    }

    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      toast.success('Summary copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Failed to copy summary')
    }
  }

  const getStatusIcon = () => {
    switch (summary.status) {
      case 'pending':
        return <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusText = () => {
    switch (summary.status) {
      case 'pending':
        return 'Processing...'
      case 'completed':
        return 'Completed'
      case 'failed':
        return 'Failed'
      default:
        return 'Unknown'
    }
  }

  const hasSummaryText = summary.summary?.trim().length > 0

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-shadow">
      {/* Mobile-friendly layout: stack on small screens, row on larger */}
      <div className="flex flex-col sm:flex-row">
        {/* Thumbnail */}
        <div className="flex-shrink-0">
           <img
      src={summary.videoThumbnail || 'https://dummyimage.com/320x180/cccccc/000000&text=No+Thumbnail'}

      alt={summary.videoTitle || 'YouTube Video'}
      className="w-full sm:w-40 h-40 object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
    />
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between mb-2 gap-2">
            <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm sm:text-base flex-1">
              {summary.videoTitle || 'Untitled Video'}
            </h3>
            <a
              href={summary.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Status and Date */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              {getStatusIcon()}
              <span>{getStatusText()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {/* Summary or Status Message */}
          {summary.status === 'completed' && hasSummaryText && (
            <div className="space-y-3">
              <div className="prose max-w-none bg-gray-50 rounded-lg p-3 overflow-x-auto text-sm sm:text-base">
                <ReactMarkdown>{summary.summary}</ReactMarkdown>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center space-x-2 text-sm text-purple-600 hover:text-purple-800 transition-colors"
              >
                <Copy className="w-4 h-4" />
                <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
              </button>
            </div>
          )}

          {summary.status === 'completed' && !hasSummaryText && (
            <div className="bg-orange-50 rounded-lg p-3 text-sm text-orange-700">
              Summary completed but no text available. Check your n8n workflow output.
            </div>
          )}

          {summary.status === 'pending' && (
            <div className="bg-yellow-50 rounded-lg p-3 text-sm text-yellow-700">
              Your video is being processed. This may take a few minutes...
            </div>
          )}

          {summary.status === 'failed' && (
            <div className="bg-red-50 rounded-lg p-3 text-sm text-red-700">
              Failed to process this video. Please try again.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
