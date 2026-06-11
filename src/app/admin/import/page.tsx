'use client';

import { useState } from 'react';
import { importBooksFromExcel } from '../../actions';
import Link from 'next/link';

export default function ImportBooksPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.name.endsWith('.xlsx') || selectedFile.name.endsWith('.xls') || selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Please upload an Excel file (.xlsx, .xls) or CSV file');
        setFile(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      await importBooksFromExcel(formData);
      setSuccess(true);
      setFile(null);
    } catch (err: any) {
      setError(err?.message || 'Failed to import books. Please check the file format.');
      setSuccess(false);
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
        <h1 style={{ marginBottom: '30px' }}>Import Books from Excel</h1>
        
        <div style={{ backgroundColor: '#E8F5E9', border: '1px solid #4CAF50', borderRadius: '8px', padding: '20px', marginBottom: '30px' }}>
          <p style={{ margin: 0, color: '#1B5E20' }}>
            <strong>📋 Excel Format:</strong> Your file should have the following columns:
          </p>
          <ul style={{ color: '#1B5E20', marginTop: '10px', marginBottom: 0 }}>
            <li>Title (Required)</li>
            <li>Author (Required)</li>
            <li>ISBN</li>
            <li>Category (Required)</li>
            <li>Price</li>
            <li>Total Count</li>
            <li>Shelf Location (Required)</li>
            <li>Description</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="file">
              Select Excel File (.xlsx, .xls, or .csv) *
            </label>
            <input 
              type="file" 
              id="file" 
              name="file"
              className="form-control"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileChange}
              disabled={loading}
            />
          </div>

          {file && (
            <div style={{ 
              backgroundColor: '#F3E5F5', 
              border: '1px solid #7B1FA2', 
              borderRadius: '8px', 
              padding: '15px',
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>
                <strong>Selected:</strong> {file.name}
              </span>
              <button 
                type="button" 
                onClick={() => setFile(null)}
                style={{ background: 'none', border: 'none', color: '#7B1FA2', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>
          )}

          {error && (
            <div style={{ 
              backgroundColor: '#FFEBEE', 
              border: '1px solid #C62828', 
              borderRadius: '8px', 
              padding: '15px',
              marginBottom: '20px',
              color: '#B71C1C'
            }}>
              ⚠️ {error}
            </div>
          )}

          {success && (
            <div style={{ 
              backgroundColor: '#E8F5E9', 
              border: '1px solid #2E7D32', 
              borderRadius: '8px', 
              padding: '15px',
              marginBottom: '20px',
              color: '#1B5E20'
            }}>
              ✓ Books imported successfully! Redirecting...
            </div>
          )}

          <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ flex: 1, fontSize: '1.2rem', padding: '15px' }}
              disabled={!file || loading}
            >
              {loading ? 'Importing...' : 'Import Books'}
            </button>
            <Link href="/admin" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 30px' }}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
