// src/services/n8nService.ts

const N8N_WEBHOOK_URL =
  import.meta.env.VITE_N8N_WEBHOOK_URL || 'http://localhost:5678/webhook-test/ytube'

interface N8nResponse {
  summary?: string
  text?: string
  videoTitle?: string
  videoUrl?: string
  videoId?: string
  status?: string
}

export const getVideoSummary = async (videoUrl: string) => {
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ videoUrl })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('N8N Error Response:', errorText)
      throw new Error(`Failed to get summary. Status: ${response.status}`)
    }

    const data: N8nResponse = await response.json()

    return {
      summary: data.summary || data.text || 'No summary available.',
      videoTitle: data.videoTitle || 'YouTube Video',
      videoUrl: data.videoUrl ?? videoUrl,
      videoId: data.videoId ?? '',
      status: data.status || 'completed'
    }
  } catch (error: any) {
    console.error('Error in getVideoSummary:', error.message)
    throw new Error('Something went wrong while getting the video summary.')
  }
}
