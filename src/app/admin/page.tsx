import Link from 'next/link';
import { getBooks, deleteBook } from '../actions';
import ConfirmForm from '../../components/ConfirmForm';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const books = await getBooks();

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1>Admin Dashboard</h1>
        <Link href="/admin/add" className="btn btn-primary">
          + Add New Book
        </Link>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: '20px' }}>Manage Inventory ({books.length} Books)</h2>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-sand)' }}>
                <th style={{ padding: '15px' }}>Title</th>
                <th style={{ padding: '15px' }}>Author</th>
                <th style={{ padding: '15px' }}>Category</th>
                <th style={{ padding: '15px' }}>Location</th>
                <th style={{ padding: '15px' }}>Count</th>
                <th style={{ padding: '15px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '15px', fontWeight: 'bold' }}>{book.title}</td>
                  <td style={{ padding: '15px' }}>{book.author}</td>
                  <td style={{ padding: '15px' }}>{book.category}</td>
                  <td style={{ padding: '15px' }}>
                    <span className="shelf-tag" style={{ margin: 0, fontSize: '0.8rem' }}>{book.shelfLocation}</span>
                  </td>
                  <td style={{ padding: '15px', fontWeight: 'bold', color: book.totalCount > 0 ? 'green' : 'red' }}>
                    {book.totalCount}
                  </td>
                  <td style={{ padding: '15px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                      <Link href={`/admin/edit/${book.id}`} className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.9rem' }}>
                        Edit
                      </Link>
                      <ConfirmForm 
                        action={async () => {
                          "use server";
                          await deleteBook(book.id);
                        }}
                        confirmMessage={`Are you sure you want to delete "${book.title}" from the library?`}
                      >
                        <button type="submit" className="btn" style={{ padding: '6px 12px', fontSize: '0.9rem', backgroundColor: '#FEE2E2', color: '#DC2626', border: 'none' }}>
                          Delete
                        </button>
                      </ConfirmForm>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
