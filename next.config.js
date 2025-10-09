/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  fallbacks: {
    document: '/offline.html',
  },
  runtimeCaching: [
    // 🧭 Pagini și interfață
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'pages-cache',
        expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 30 },
      },
    },
    // 🧱 Scripturi și CSS
    {
      urlPattern: /.*\.(?:js|css)$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-cache',
        expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 30 },
      },
    },
    // 🖼️ Imagini (coperți, logo-uri)
    {
      urlPattern: /.*\.(?:png|jpg|jpeg|gif|webp|svg|ico)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'image-cache',
        expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 60 },
      },
    },
    // 📚 PDF-uri (cache complet, pentru mod avion)
    {
      urlPattern: /.*\.pdf$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'pdf-cache',
        expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 60 },
      },
    },
  ],
});

module.exports = withPWA({
  reactStrictMode: true,
  images: { unoptimized: true },
});
