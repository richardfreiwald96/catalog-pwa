import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Catalog Viewer', description: 'Prezentare cataloage ca PWA' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#111111" />
      </head>
      <body><div className="container">{children}</div></body>
    </html>
  );
}
