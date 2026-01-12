/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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
