/** @type {import('next').NextConfig} */
const runtimeCaching = [
  {
    urlPattern: /^https?:\/\/(?:localhost|[\w.-]+)\/.*/,
    handler: 'NetworkFirst',
    options: {
      cacheName: 'html-pages',
      expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 7 },
      networkTimeoutSeconds: 3,
    },
  },
  { urlPattern: /\.(?:js|css)$/, handler: 'StaleWhileRevalidate', options: { cacheName: 'static-resources', expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 } } },
  { urlPattern: /\/covers\/.*\.(?:png|jpg|jpeg|gif|webp|avif)$/, handler: 'CacheFirst', options: { cacheName: 'catalog-covers', expiration: { maxEntries: 40, maxAgeSeconds: 60 * 60 * 24 * 30 } } },
  { urlPattern: /\/pdf\/.*\.pdf$/, handler: 'NetworkFirst', options: { cacheName: 'catalog-pdfs', expiration: { maxEntries: 6, maxAgeSeconds: 60 * 60 * 24 * 7 } } },
  { urlPattern: /\/manifest\.json$/, handler: 'StaleWhileRevalidate', options: { cacheName: 'pwa-manifest' } },
  { urlPattern: /\/icons\/.*\.(?:png|svg|ico)$/, handler: 'CacheFirst', options: { cacheName: 'pwa-icons', expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 } } },
];
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: process.env.NODE_ENV === 'development',
});
const nextConfig = { reactStrictMode: true, images: { unoptimized: true } };
module.exports = withPWA(nextConfig);
