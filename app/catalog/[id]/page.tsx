'use client';
import { useEffect, useRef, useState } from 'react';
import catalogs from '../../../data/catalogs.json';
import QRCode from 'qrcode';
import Link from 'next/link';

// PDF offline helper: dacă ești offline, încearcă să ia PDF-ul din cache și creează un Blob URL
async function getPdfUrlOfflineAware(url: string): Promise<string> {
  if (typeof window === 'undefined' || !('caches' in window)) return url;
  if (navigator.onLine) return url; // online -> normal
  try {
    const cache = await caches.open('pdf-cache');
    const res = await cache.match(url);
    if (res) {
      const blob = await res.blob();
      return URL.createObjectURL(blob);
    }
  } catch {}
  return url;
}

export default function CatalogPage({ params }: { params: { id: string } }) {
  const item = (catalogs as any[]).find((c) => c.id === params.id);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shareUrl, setShareUrl] = useState('');
  const [viewerSrc, setViewerSrc] = useState(item?.pdf_url || '');

  useEffect(() => {
    if (!item) return;
    const url = typeof window !== 'undefined' ? window.location.href : '';
    setShareUrl(url);
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, { width: 160 }, (err) => {
        if (err) console.error(err);
      });
    }
  }, [item]);

  // setează src pentru viewer; dacă e offline, folosește Blob din cache
  useEffect(() => {
    if (!item) return;
    getPdfUrlOfflineAware(item.pdf_url).then(setViewerSrc);
  }, [item]);

  if (!item) {
    return (
      <main>
        <h1>Catalog inexistent</h1>
        <p>ID: {params.id}</p>
        <Link href="/">Înapoi</Link>
      </main>
    );
  }

  return (
    <main>
      <div className="topbar">
        <h1>{item.title}</h1>
        {item.logo_url && (
          <img src={item.logo_url} alt={item.brand + ' logo'} style={{height:'40px',marginLeft:'1rem'}} />
        )}
        <Link href="/" className="badge">Înapoi</Link>
      </div>

      <div style={{position:'relative',display:'inline-block'}}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.cover_url} alt={item.title} style={{width:'100%',maxWidth:'400px',borderRadius:'8px'}} />
        {item.logo_url && (
          <img src={item.logo_url} alt={item.brand + ' logo'} style={{position:'absolute',top:'10px',right:'10px',height:'40px',background:'rgba(255,255,255,0.8)',borderRadius:'6px',padding:'4px'}} />
        )}
      </div>
      <p><strong>Brand:</strong> {item.brand} · <strong>An:</strong> {item.year}</p>
      <div className="tags">
        {item.tags.map((t: string) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>

      <div style={{ display:'flex', gap:'1rem', alignItems:'center', margin:'1rem 0' }}>
        <a className="badge" href={item.pdf_url} target="_blank" rel="noreferrer">Descarcă PDF</a>
        <button
          className="badge"
          onClick={async () => {
            try { await navigator.clipboard.writeText(shareUrl); alert('Link copiat în clipboard'); } catch {}
          }}
        >
          Copiază link
        </button>
        <div className="qr"><canvas ref={canvasRef} /></div>
      </div>

      {/* IMPORTANT: folosim viewerSrc (online sau blob din cache când e offline) */}
      <embed className="viewer" src={viewerSrc} type="application/pdf" />
      <p style={{ color:'#666', fontSize:'.9rem' }}>Dacă viewer-ul nu pornește, folosește butonul “Descarcă PDF”.</p>
    </main>
  );
}
