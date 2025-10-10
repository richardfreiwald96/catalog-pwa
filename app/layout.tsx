import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Catalog Viewer', description: 'Prezentare cataloage ca PWA' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#111111" />
      </head>
      <body style={{fontFamily:'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', padding: 16}}>
        {children}
      </body>
    </html>
  );
}
