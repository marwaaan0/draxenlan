/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['prod.spline.design'],
  },
}

module.exports = nextConfig
