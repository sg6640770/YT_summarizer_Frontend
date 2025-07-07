export const extractVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }

  return null
}

export const isValidYouTubeUrl = (url: string): boolean => {
  return extractVideoId(url) !== null
}

export const getVideoThumbnail = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

export const getVideoTitle = async (videoId: string): Promise<string> => {
  // Placeholder title until you integrate with YouTube Data API (if needed)
  return `YouTube Video (${videoId})`
}
