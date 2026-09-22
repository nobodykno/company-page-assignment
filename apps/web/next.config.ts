import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      'default-src \'self\'',
      'script-src \'self\' \'unsafe-inline\' \'unsafe-eval\'',
      'style-src \'self\' \'unsafe-inline\'',
      'img-src \'self\' data: blob: http://localhost:1337 http://localhost:3000',
      'font-src \'self\' data:',
      'connect-src \'self\' http://localhost:1337 http://localhost:3000',
      'media-src \'self\' blob:',
      'object-src \'none\'',
      'base-uri \'self\'',
      'form-action \'self\'',
      'frame-ancestors \'self\'',
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],

    dangerouslyAllowLocalIP: true,
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);