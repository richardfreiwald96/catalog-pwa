import Link from 'next/link';
import catalogs from '../data/catalogs.json';

export default function Home() {
  return (
    <main>
      <h1>Catalog Viewer</h1>
      <div className="catalog-list">
        {catalogs.map((catalog: any) => (
          <div key={catalog.id} className="catalog-card" style={{border:'1px solid #eee', borderRadius:8, margin:'1rem 0', padding:'1rem', display:'flex', gap:'1.5rem', alignItems:'center'}}>
            <img src={catalog.cover_url} alt={catalog.title} style={{width:100, height:100, objectFit:'cover', borderRadius:8}} />
            <div style={{flex:1}}>
              <h2 style={{margin:'0 0 .5rem 0'}}>
                <Link href={`/catalog/${catalog.id}`}>{catalog.title}</Link>
              </h2>
              <p style={{margin:0}}><strong>Brand:</strong> {catalog.brand} · <strong>An:</strong> {catalog.year} · <strong>Pagini:</strong> {catalog.pages}</p>
              <div style={{margin:'.5rem 0'}}>
                {catalog.tags.map((tag:string) => (
                  <span key={tag} style={{display:'inline-block', background:'#f3f3f3', borderRadius:4, padding:'2px 8px', marginRight:4, fontSize:'.85rem'}}>{tag}</span>
                ))}
              </div>
              <a href={catalog.pdf_url} target="_blank" rel="noreferrer" style={{color:'#0070f3', textDecoration:'underline', fontSize:'.95rem'}}>Descarcă PDF</a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
