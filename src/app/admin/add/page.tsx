import { addBook } from '../../actions';
import Link from 'next/link';

export default function AddBook() {
  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <Link href="/admin" className="btn btn-outline" style={{ marginBottom: '30px' }}>
        ← Back to Dashboard
      </Link>

      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '30px' }}>Add New Book</h1>
        
        <form action={addBook}>
          <div className="form-group">
            <label className="form-label" htmlFor="title">Book Title *</label>
            <input type="text" id="title" name="title" className="form-control" required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="author">Author *</label>
              <input type="text" id="author" name="author" className="form-control" required />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="isbn">ISBN</label>
              <input type="text" id="isbn" name="isbn" className="form-control" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="category">Category *</label>
              <input type="text" id="category" name="category" className="form-control" placeholder="e.g. History" required />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="shelfLocation">Shelf Location *</label>
              <input type="text" id="shelfLocation" name="shelfLocation" className="form-control" placeholder="e.g. A01-S04" required />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="totalCount">Total Copies *</label>
              <input type="number" id="totalCount" name="totalCount" className="form-control" min="0" defaultValue="1" required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="price">Price (₹) *</label>
            <input type="number" id="price" name="price" className="form-control" min="0" defaultValue="0" placeholder="e.g. 350" required />
          </div>

          <div style={{ marginTop: '30px' }}>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '1.2rem', padding: '15px' }}>
              Add Book to Library
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
