import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    MONGO_URI: 'process.env.MONGO_URI',
    NEXT_PUBLIC_API_URL: 'process.env.NEXT_PUBLIC_API_URL',
  },
}

export default nextConfig
