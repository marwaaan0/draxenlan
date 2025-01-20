/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['prod.spline.design'],
  },
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig
