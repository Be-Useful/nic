import { addVisitor } from '../../../actions';
import Link from 'next/link';

export default function AddVisitor() {
  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <Link href="/admin/visitors" className="btn btn-outline" style={{ marginBottom: '30px' }}>
        ← Back to Visitors
      </Link>

      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '30px' }}>Add New Visitor/Researcher</h1>
        
        <form action={addVisitor}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name *</label>
            <input type="text" id="name" name="name" className="form-control" required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address *</label>
              <input type="email" id="email" name="email" className="form-control" required />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone Number *</label>
              <input type="tel" id="phone" name="phone" className="form-control" required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="category">Category *</label>
              <select id="category" name="category" className="form-control" required>
                <option value="">Select Category</option>
                <option value="Researcher">Researcher</option>
                <option value="Student">Student</option>
                <option value="Faculty">Faculty</option>
                <option value="General">General Visitor</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="institution">Institution/Organization</label>
              <input type="text" id="institution" name="institution" className="form-control" placeholder="e.g. Delhi University" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="purpose">Purpose of Visit *</label>
            <input type="text" id="purpose" name="purpose" className="form-control" placeholder="e.g. Academic research, Historical study" required />
          </div>

          <div style={{ marginTop: '30px' }}>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '1.2rem', padding: '15px' }}>
              Register Visitor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
