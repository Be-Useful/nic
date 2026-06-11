import { getVisitorById, updateVisitor } from '../../../../actions';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ConfirmForm from '../../../../../components/ConfirmForm';

export default async function EditVisitor({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const visitor = await getVisitorById(id);

  if (!visitor) {
    notFound();
  }

  // We need to bind the ID to the server action
  const updateVisitorWithId = updateVisitor.bind(null, id);

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <Link href="/admin/visitors" className="btn btn-outline" style={{ marginBottom: '30px' }}>
        ← Back to Visitors
      </Link>

      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '30px' }}>Edit Visitor: {visitor.name}</h1>
        
        <ConfirmForm 
          action={updateVisitorWithId}
          confirmMessage="Are you sure you want to save these changes?"
        >
          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name *</label>
            <input type="text" id="name" name="name" className="form-control" defaultValue={visitor.name} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address *</label>
              <input type="email" id="email" name="email" className="form-control" defaultValue={visitor.email} required />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone Number *</label>
              <input type="tel" id="phone" name="phone" className="form-control" defaultValue={visitor.phone} required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="category">Category *</label>
              <select id="category" name="category" className="form-control" defaultValue={visitor.category} required>
                <option value="">Select Category</option>
                <option value="Researcher">Researcher</option>
                <option value="Student">Student</option>
                <option value="Faculty">Faculty</option>
                <option value="General">General Visitor</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="institution">Institution/Organization</label>
              <input type="text" id="institution" name="institution" className="form-control" defaultValue={visitor.institution || ''} placeholder="e.g. Delhi University" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="purpose">Purpose of Visit *</label>
            <input type="text" id="purpose" name="purpose" className="form-control" defaultValue={visitor.purpose} placeholder="e.g. Academic research, Historical study" required />
          </div>

          <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1, fontSize: '1.2rem', padding: '15px' }}>
              Save Changes
            </button>
            <Link href="/admin/visitors" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 30px' }}>
              Cancel
            </Link>
          </div>
        </ConfirmForm>
      </div>
    </div>
  );
}
