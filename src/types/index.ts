export interface VideoSummary {
  id: string
  videoUrl: string
  videoTitle?: string
  videoThumbnail?: string
  summary?: string
  status: 'pending' | 'completed' | 'failed'
}
