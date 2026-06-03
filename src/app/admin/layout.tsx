import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get('admin_session')?.value === 'authenticated';

  return (
    <div>
      {isAdmin && (
        <div style={{ backgroundColor: 'var(--color-indigo)', color: 'white', padding: '10px 20px', textAlign: 'right' }}>
          <span style={{ marginRight: '15px' }}>Logged in as Admin</span>
          <form action={async () => {
            'use server';
            const cookieStore = await cookies();
            cookieStore.delete('admin_session');
            redirect('/admin/login');
          }} style={{ display: 'inline' }}>
            <button type="submit" style={{ background: 'none', border: 'none', color: 'var(--color-mustard)', cursor: 'pointer', fontWeight: 'bold' }}>
              Logout
            </button>
          </form>
        </div>
      )}
      {children}
    </div>
  );
}
