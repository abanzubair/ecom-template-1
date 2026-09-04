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
  async redirects() {
    const portalUrl = process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL || 'https://reseller.weave365.com';
    return [
      {
        source: '/admin',
        destination: portalUrl,
        permanent: false,
      },
      {
        source: '/admin/:path*',
        destination: portalUrl,
        permanent: false,
      },
    ];
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
