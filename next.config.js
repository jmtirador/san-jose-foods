/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // WebP only. AVIF encoding of the 2000px source photos stalls the local
    // optimizer for minutes, and WebP is already 25-35% smaller than JPEG.
    formats: ['image/webp'],
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
