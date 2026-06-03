import { getBookById } from '../../actions';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function BookDetails({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const book = await getBookById(id);

  if (!book) {
    notFound();
  }

  return (
    <div className="container" style={{ padding: '60px 20px' }}>
      <Link href="/" className="btn btn-outline" style={{ marginBottom: '30px' }}>
        ← Back to Search
      </Link>
      
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div>
              <div className="shelf-tag" style={{ fontSize: '1.2rem', padding: '10px 20px' }}>
                📍 Location: {book.shelfLocation}
              </div>
              <h1 style={{ fontSize: '2.5rem', margin: '20px 0 10px' }}>{book.title}</h1>
              <p style={{ fontSize: '1.5rem', color: 'var(--color-terracotta)' }}>By {book.author}</p>
            </div>
            <div style={{ textAlign: 'right', marginTop: '20px' }}>
              <div style={{ 
                backgroundColor: book.totalCount > 0 ? '#E8F5E9' : '#FFEBEE', 
                color: book.totalCount > 0 ? '#2E7D32' : '#C62828',
                padding: '15px 25px',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '1.2rem'
              }}>
                {book.totalCount > 0 ? `${book.totalCount} Copies Available` : 'Currently Unavailable'}
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--color-sand)', margin: '20px 0' }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            <div>
              <p className="form-label">Category</p>
              <p style={{ fontSize: '1.2rem' }}>{book.category}</p>
            </div>
            <div>
              <p className="form-label">ISBN</p>
              <p style={{ fontSize: '1.2rem' }}>{book.isbn || 'N/A'}</p>
            </div>
          </div>

          {book.description && (
            <div style={{ marginTop: '20px' }}>
              <p className="form-label">Description</p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>{book.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
