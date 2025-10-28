/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
   api: {
    bodyParser: {
      sizeLimit: '10mb', // Increase to 10MB (adjust as needed)
    },
  },
}

export default nextConfig


