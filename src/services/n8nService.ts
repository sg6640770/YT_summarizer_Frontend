// src/services/n8nService.ts

const N8N_WEBHOOK_URL =
  import.meta.env.VITE_N8N_WEBHOOK_URL || 'http://localhost:5678/webhook-test/ytube'

export const getVideoSummary = async (videoUrl: string) => {
  const response = await fetch(N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ videoUrl })
  })

  if (!response.ok) {
    throw new Error('Failed to get summary')
  }

  const data = await response.json()

  return {
    summary: data.summary || data.text,
    videoTitle: data.videoTitle || 'YouTube Video',
    videoUrl: data.videoUrl,
    videoId: data.videoId,
    status: data.status || 'completed'
  }
}
