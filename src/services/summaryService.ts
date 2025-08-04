// src/services/summaryService.ts

export const saveSummaryToBackend = async ({
  userEmail,
  videoUrl,
  videoTitle,
  summary
}: {
  userEmail: string
  videoUrl: string
  videoTitle: string
  summary: string
}) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080'

  // Extract YouTube Video ID (works for standard & short URLs)
  const extractVideoId = (url: string): string | null => {
    const match = url.match(/(?:v=|\/|be\/|shorts\/|embed\/)([\w-]{11})/)
    return match ? match[1] : null
  }

  const videoId = extractVideoId(videoUrl)
  const videoThumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    : 'https://via.placeholder.com/320x180?text=No+Thumbnail'

  const response = await fetch(`${BACKEND_URL}/api/summaries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userEmail,
      videoUrl,
      videoTitle,
      summary,
      videoThumbnail
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('Error from backend:', errorText)
    throw new Error(`Failed to save summary: ${errorText}`)
  }

  return await response.text()
}
