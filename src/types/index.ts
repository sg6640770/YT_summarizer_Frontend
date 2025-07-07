export interface VideoSummary {
  id: string
  video_url: string
  video_title?: string
  video_thumbnail?: string
  summary?: string
  status: 'pending' | 'completed' | 'failed'
}
