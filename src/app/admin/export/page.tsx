'use client';

import { useEffect, useState } from 'react';
import { exportBooksToExcel } from '../../actions';
import Link from 'next/link';

export default function ExportBooksPage() {
  const [loading, setLoading] = useState(false);
  const [exported, setExported] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const buffer = await exportBooksToExcel();
      
      // Create a blob from the buffer
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `books_export_${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      setExported(true);
      setTimeout(() => setExported(false), 3000);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export books');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <Link href="/admin" className="btn btn-outline" style={{ marginBottom: '30px' }}>
        ← Back to Dashboard
      </Link>

      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '30px' }}>Export Books to Excel</h1>
        
        <div style={{ 
          backgroundColor: '#E3F2FD', 
          border: '1px solid #1976D2', 
          borderRadius: '8px', 
          padding: '20px', 
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '1.1rem', margin: '0 0 10px 0', color: '#0D47A1' }}>
            📊 Export all books in your library to an Excel file
          </p>
          <p style={{ fontSize: '0.9rem', margin: 0, color: '#1565C0' }}>
            The exported file will include: Title, Author, ISBN, Category, Price, Total Count, Shelf Location, and Description
          </p>
        </div>

        <div style={{ 
          backgroundColor: '#F5F5F5', 
          border: '2px dashed #BDBDBD', 
          borderRadius: '8px', 
          padding: '40px', 
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📥</div>
          <p style={{ fontSize: '1.2rem', margin: '0 0 15px 0', fontWeight: 'bold' }}>Ready to Export?</p>
          <p style={{ fontSize: '0.95rem', margin: 0, color: '#666' }}>
            Click the button below to download all books data as an Excel spreadsheet
          </p>
        </div>

        {exported && (
          <div style={{ 
            backgroundColor: '#E8F5E9', 
            border: '1px solid #2E7D32', 
            borderRadius: '8px', 
            padding: '15px',
            marginBottom: '20px',
            color: '#1B5E20',
            textAlign: 'center'
          }}>
            ✓ Export completed successfully!
          </div>
        )}

        <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
          <button 
            onClick={handleExport}
            className="btn btn-primary" 
            style={{ flex: 1, fontSize: '1.2rem', padding: '15px' }}
            disabled={loading}
          >
            {loading ? 'Exporting...' : '📥 Export to Excel'}
          </button>
          <Link href="/admin" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 30px' }}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
