/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    // About + Why merged into /company.
    return [
      { source: '/about', destination: '/company', permanent: true },
      { source: '/why-san-jose-foods', destination: '/company', permanent: true },
    ]
  },
}

module.exports = nextConfig
