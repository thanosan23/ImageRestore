/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["upcdn.io", "replicate.delivery"]
  },
  env: {
    DEPLOYMENT: process.env.DEPLOYMENT,
  }
}

module.exports = nextConfig