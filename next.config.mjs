/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@splinetool/react-spline', '@splinetool/runtime'],
  images: {
    domains: ['prod.spline.design'],
  },
  webpack: (config) => {
    config.externals.push({
      'spline-runtime': '@splinetool/runtime',
    });
    config.resolve.alias = {
      ...config.resolve.alias,
      '@splinetool/runtime': '@splinetool/runtime',
    };
    return config;
  },
}

export default nextConfig;
