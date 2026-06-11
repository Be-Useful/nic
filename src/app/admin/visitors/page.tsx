import Link from 'next/link';
import { getVisitors, deleteVisitor } from '../../actions';
import ConfirmForm from '../../../components/ConfirmForm';

export const dynamic = 'force-dynamic';

export default async function VisitorsPage() {
  const visitors = await getVisitors();

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1>Manage Visitors & Researchers</h1>
        <Link href="/admin/visitors/add" className="btn btn-primary">
          + Add New Visitor
        </Link>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: '20px' }}>Visitors & Researchers ({visitors.length})</h2>
        
        {visitors.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#F9FAFB', borderRadius: '8px' }}>
            <p>No visitors registered yet.</p>
            <Link href="/admin/visitors/add" className="btn btn-primary" style={{ marginTop: '20px' }}>
              Add First Visitor
            </Link>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-sand)' }}>
                  <th style={{ padding: '15px' }}>Name</th>
                  <th style={{ padding: '15px' }}>Email</th>
                  <th style={{ padding: '15px' }}>Phone</th>
                  <th style={{ padding: '15px' }}>Category</th>
                  <th style={{ padding: '15px' }}>Institution</th>
                  <th style={{ padding: '15px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((visitor) => (
                  <tr key={visitor.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '15px', fontWeight: 'bold' }}>{visitor.name}</td>
                    <td style={{ padding: '15px' }}>{visitor.email}</td>
                    <td style={{ padding: '15px' }}>{visitor.phone}</td>
                    <td style={{ padding: '15px' }}>
                      <span className="shelf-tag" style={{ margin: 0, fontSize: '0.8rem', backgroundColor: 'var(--color-indigo)', color: 'white' }}>
                        {visitor.category}
                      </span>
                    </td>
                    <td style={{ padding: '15px' }}>{visitor.institution}</td>
                    <td style={{ padding: '15px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <Link href={`/admin/visitors/edit/${visitor.id}`} className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.9rem' }}>
                          Edit
                        </Link>
                        <ConfirmForm 
                          action={async () => {
                            "use server";
                            await deleteVisitor(visitor.id);
                          }}
                          confirmMessage={`Are you sure you want to delete "${visitor.name}" from the visitors list?`}
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
        )}
      </div>

      <div style={{ marginTop: '30px' }}>
        <Link href="/admin" className="btn btn-outline">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
