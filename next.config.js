/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Set basePath from env when deploying to GitHub Pages (e.g. /dragon-ball-next).
  // Leave undefined for local development to avoid routing issues.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  experimental: {
    mcpServer: true
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dragonball-api.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
