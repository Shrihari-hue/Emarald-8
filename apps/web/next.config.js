//@ts-check

const backendProxyTarget =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  'http://localhost:8000';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: `${backendProxyTarget}/api/auth/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
