import { getVideoSummary } from './n8nService'

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
  const BACKEND_URL = 'https://ytsummarizerbackend-production.up.railway.app';

  const res = await fetch(`${BACKEND_URL}/api/summaries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userEmail,
      videoUrl,
      videoTitle,
      summary
    })
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to save summary: ${errorText}`);
  }

  return await res.text();
};
