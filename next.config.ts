import type {NextConfig} from 'next'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        ...(projectId
          ? {pathname: `/images/${projectId}/**`}
          : {pathname: '/images/**'}),
      },
    ],
  },
}

export default nextConfig
