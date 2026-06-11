import { getBookById, updateBook } from '../../../actions';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ConfirmForm from '../../../../components/ConfirmForm';

export default async function EditBook({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const book = await getBookById(id);

  if (!book) {
    notFound();
  }

  // We need to bind the ID to the server action
  const updateBookWithId = updateBook.bind(null, id);

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <Link href="/admin" className="btn btn-outline" style={{ marginBottom: '30px' }}>
        ← Back to Dashboard
      </Link>

      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '30px' }}>Edit Book: {book.title}</h1>
        
        <ConfirmForm 
          action={updateBookWithId}
          confirmMessage="Are you sure you want to save these changes?"
        >
          <div className="form-group">
            <label className="form-label" htmlFor="title">Book Title *</label>
            <input type="text" id="title" name="title" className="form-control" defaultValue={book.title} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="author">Author *</label>
              <input type="text" id="author" name="author" className="form-control" defaultValue={book.author} required />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="isbn">ISBN</label>
              <input type="text" id="isbn" name="isbn" className="form-control" defaultValue={book.isbn || ''} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="category">Category *</label>
              <input type="text" id="category" name="category" className="form-control" defaultValue={book.category} required />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="shelfLocation">Shelf Location *</label>
              <input type="text" id="shelfLocation" name="shelfLocation" className="form-control" defaultValue={book.shelfLocation} required />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="totalCount">Total Copies *</label>
              <input type="number" id="totalCount" name="totalCount" className="form-control" min="0" defaultValue={book.totalCount} required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="price">Price (₹) *</label>
            <input type="number" id="price" name="price" className="form-control" min="0" defaultValue={book.price || 0} required />
          </div>

          <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1, fontSize: '1.2rem', padding: '15px' }}>
              Save Changes
            </button>
            <Link href="/admin" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 30px' }}>
              Cancel
            </Link>
          </div>
        </ConfirmForm>
      </div>
    </div>
  );
}
