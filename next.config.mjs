/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    staleTimes: {
      dynamic: 1800,
      static: 1800,
    },
  },
};

export default nextConfig;
