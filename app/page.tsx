'use client';
import Link from 'next/link';
import catalogs from '../../../data/catalogs.json';
import React from 'react';

export default function Home() {
  return (
    <main>
      <div className="topbar">
        <h1>Cataloage</h1>
        <span className="badge">PWA Demo</span>
      </div>
      <Filters />
      <Grid />
    </main>
  );
}

function Filters() {
  return (
    <div className="filters" id="filters">
      <input id="q" placeholder="Caută titlu/etichete…" />
      <select id="brand">
        <option>Toate</option>
        {Array.from(new Set((catalogs as any[]).map((c:any) => c.brand))).map((b:any) => <option key={b}>{b}</option>)}
      </select>
      <select id="year">
        <option>Toți anii</option>
        {Array.from(new Set((catalogs as any[]).map((c:any) => c.year))).sort((a:any,b:any)=>b-a).map((y:any) => <option key={y}>{y}</option>)}
      </select>
      <button onClick={() => {
        const q = (document.getElementById('q') as HTMLInputElement).value.toLowerCase();
        const brand = (document.getElementById('brand') as HTMLSelectElement).value;
        const year = (document.getElementById('year') as HTMLSelectElement).value;
        const url = new URL(window.location.href);
        if(q) url.searchParams.set('q', q); else url.searchParams.delete('q');
        if(brand!=='Toate') url.searchParams.set('brand', brand); else url.searchParams.delete('brand');
        if(year!=='Toți anii') url.searchParams.set('year', year); else url.searchParams.delete('year');
        window.history.replaceState({}, '', url.toString());
        document.dispatchEvent(new Event('filters:changed'));
      }}>Filtrează</button>
    </div>
  );
}

function Grid() {
  // @ts-ignore
  const [_, force] = React.useReducer((x:number)=>x+1, 0);
  React.useEffect(() => {
    const h = () => force();
    document.addEventListener('filters:changed', h);
    return () => document.removeEventListener('filters:changed', h);
  }, []);
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const q = (params.get('q') || '').toLowerCase();
  const brand = params.get('brand') || 'Toate';
  const year = params.get('year') || 'Toți anii';
  const filtered = (catalogs as any[]).filter((c:any) => {
    const okBrand = brand === 'Toate' || c.brand === brand;
    const okYear = year === 'Toți anii' || String(c.year) === year;
    const hay = (c.title + ' ' + c.tags.join(' ')).toLowerCase();
    const okQ = q === '' || hay.includes(q);
    return okBrand && okYear && okQ;
  });
  return (
    <div className="grid">
      {filtered.map((c:any) => (
        <Link key={c.id} className="card" href={`/catalog/${c.id}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.cover_url} alt={c.title} loading="lazy" />
          <div className="meta">
            <h3>{c.title}</h3>
            <p>{c.brand} · {c.year}</p>
            <div className="tags">
              {c.tags.slice(0,4).map((t:string) => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
