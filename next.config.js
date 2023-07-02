/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["gateway.storjshare.io"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
