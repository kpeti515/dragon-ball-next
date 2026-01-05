/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mcpServer: true
  },
  images: {
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
