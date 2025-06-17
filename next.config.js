/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure proper handling of client components
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    return config
  },
}

module.exports = nextConfig 