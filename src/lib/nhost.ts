import { NhostClient } from '@nhost/nhost-js'

// Validate environment variables
const subdomain = import.meta.env.VITE_NHOST_SUBDOMAIN
const region = import.meta.env.VITE_NHOST_REGION

if (!subdomain) {
  console.error('❌ VITE_NHOST_SUBDOMAIN is not defined in environment variables')
}

if (!region) {
  console.error('❌ VITE_NHOST_REGION is not defined in environment variables')
}

export const nhost = new NhostClient({
  subdomain: subdomain || 'your-subdomain',
  region: region || 'ap-south-1'
})

// Optional: Log config for debugging
console.log('✅ Nhost Config:', {
  subdomain: subdomain || 'NOT_SET',
  region: region || 'NOT_SET',
  authUrl: nhost.auth.url
})
