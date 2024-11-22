/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    staleTimes: {
      dynamic: 1800, // 30 minutes
      static: 0,
    },
  },
};

export default nextConfig;
