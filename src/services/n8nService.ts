// src/services/n8nService.ts

const N8N_WEBHOOK_URL =
  import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://sg6640dev.app.n8n.cloud/webhook/ytube'

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
    video_title: data.video_title || 'YouTube Video',
    id: data.id,
    status: data.status || 'completed'
  }
}
