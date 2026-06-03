import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { loginAdmin } from '../../actions';

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const cookieStore = await cookies();
  if (cookieStore.get('admin_session')?.value === 'authenticated') {
    redirect('/admin');
  }

  const { error } = await searchParams;

  return (
    <div className="container" style={{ padding: '80px 20px', display: 'flex', justifyContent: 'center' }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🔐</div>
        <h1 style={{ marginBottom: '20px' }}>Admin Login</h1>
        
        {error && (
          <div style={{ backgroundColor: '#FFEBEE', color: '#C62828', padding: '10px', borderRadius: '8px', marginBottom: '20px' }}>
            Invalid ID or Password
          </div>
        )}

        <form action={loginAdmin} style={{ textAlign: 'left' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="adminId">Admin ID</label>
            <input type="text" id="adminId" name="adminId" className="form-control" required />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input type="password" id="password" name="password" className="form-control" required />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
