"use client";
import { useEffect, useRef, useState } from "react";
import catalogs from "../../../data/catalogs.json";
import QRCode from "qrcode";
import Link from "next/link";

export 
  // @ts-ignore
  const catalogs = (await import("../../../data/catalogs.json")).default || [];
  return catalogs.map((c: any) => ({ id: c.id }));
}

export default function CatalogPage({ params }: { params: { id: string } }) {
  const item = catalogs.find((c: any) => c.id === params.id);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (!item) return;
    const url = typeof window !== "undefined" ? window.location.href : "";
    setShareUrl(url);
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, { width: 160 }, (err) => {
        if (err) console.error(err);
      });
    }
  }, [item]);

  if (!item) {
    return (
      <main>
        <p>Catalog inexistent.</p>
        <Link href="/">Înapoi</Link>
      </main>
    );
  }

  return (
    <main>
      <div className="topbar">
        <h1>{item.title}</h1>
        <Link href="/" className="badge">Înapoi</Link>
      </div>
      <p><strong>Brand:</strong> {item.brand} · <strong>An:</strong> {item.year}</p>
      <div className="tags">
        {item.tags.map((t: string) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", margin: "1rem 0" }}>
        <a className="badge" href={item.pdf_url} target="_blank" rel="noreferrer">Descarcă PDF</a>
        <button
          className="badge"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(shareUrl);
              alert("Link copiat în clipboard");
            } catch {}
          }}
        >
          Copiază link
        </button>
        <div className="qr">
          <canvas ref={canvasRef} />
        </div>
      </div>
      <embed className="viewer" src={item.pdf_url} type="application/pdf" />
      <p style={{ color: "#666", fontSize: ".9rem" }}>
        Dacă viewer-ul nu pornește, folosește butonul “Descarcă PDF”.
      </p>
    </main>
  );
}