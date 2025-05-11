/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Suppress specific warnings
  experimental: {
    serverComponentsExternalPackages: ['@sendgrid/mail'],
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Suppress specific warnings
  logging: {
    level: 'error',
  },
  // Configure image domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  env: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY
  }
}

// Ensure environment variables are available at build time
const env = {
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
}

module.exports = {
  ...nextConfig,
  // Make environment variables available to the client-side
  env,
  // Disable React Strict Mode to prevent double rendering in development
  reactStrictMode: false,
}
