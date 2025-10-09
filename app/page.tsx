import Link from 'next/link';
import catalogs from '../data/catalogs.json';

export default function Home() {
  return (
    <main>
      <h1>Catalog Viewer</h1>
      <ul>
        {catalogs.map((catalog: any) => (
          <li key={catalog.id}>
            <Link href={`/catalog/${catalog.id}`}>
              {catalog.title} ({catalog.brand}, {catalog.year})
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
