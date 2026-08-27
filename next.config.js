/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/:slug((?!about|contact|policy|privacy|product|products|api|_next|favicon.ico).*)',
        destination: '/?slug=:slug',
      },
    ];
  },
};

module.exports = nextConfig;
