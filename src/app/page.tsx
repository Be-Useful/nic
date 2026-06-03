import Link from 'next/link';
import { getBooks } from './actions';

export const dynamic = 'force-dynamic';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams;
  const query = q || '';
  const books = await getBooks(query);

  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>Find Your Book</h1>
          <p>Search for books, authors, or categories to locate them instantly on our shelves.</p>
          <form className="search-bar-large" action="/" method="GET">
            <input 
              type="text" 
              name="q" 
              placeholder="Search by title, author, or category..." 
              defaultValue={query}
              autoComplete="off"
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </section>

      <section className="container" style={{ padding: '60px 20px' }}>
        {query && <h2 style={{ marginBottom: '30px' }}>Search results for "{query}"</h2>}
        {!query && <h2 style={{ marginBottom: '30px' }}>Recently Added</h2>}

        {books.length === 0 ? (
          <div className="text-center" style={{ padding: '50px', backgroundColor: 'white', borderRadius: '12px' }}>
            <h3>No books found</h3>
            <p>Try searching with different keywords.</p>
          </div>
        ) : (
          <div className="book-grid">
            {books.map((book) => (
              <Link href={`/book/${book.id}`} key={book.id} className="card" style={{ display: 'block' }}>
                <div className="shelf-tag">📍 {book.shelfLocation}</div>
                <h3 style={{ marginBottom: '10px' }}>{book.title}</h3>
                <p style={{ color: 'var(--color-terracotta)', fontWeight: 'bold', marginBottom: '10px' }}>{book.author}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid var(--color-sand)' }}>
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>{book.category}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: book.totalCount > 0 ? 'green' : 'red' }}>
                    {book.totalCount > 0 ? `${book.totalCount} Available` : 'Unavailable'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
