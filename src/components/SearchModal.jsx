'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, Search, ArrowRight, Layers } from 'lucide-react';
import { products } from '../data/products';

export default function SearchModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content-box" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close search">
          <X size={20} />
        </button>

        <div style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '2px solid var(--accent)', paddingBottom: '12px', marginBottom: '20px' }}>
            <Search size={22} style={{ color: 'var(--accent)' }} />
            <input 
              type="text" 
              placeholder="Search equipment by code, name, category (e.g. MX500, Mixer, Roller)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                fontSize: '1.1rem',
                fontWeight: 600,
                fontFamily: 'inherit',
                color: 'var(--primary)',
                background: 'transparent'
              }}
            />
          </div>

          <div style={{ maxHeight: '420px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <Link 
                  key={p.id}
                  href={`/products/${p.id}`}
                  onClick={onClose}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)',
                    textDecoration: 'none',
                    backgroundColor: '#FFFFFF',
                    transition: 'var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.backgroundColor = 'var(--accent-light)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }}
                >
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span className="product-code-badge" style={{ position: 'static', fontSize: '0.65rem' }}>{p.code}</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>{p.categoryName}</span>
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)' }}>{p.name}</div>
                  </div>
                  <ArrowRight size={18} style={{ color: 'var(--accent)' }} />
                </Link>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                <Layers size={40} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
                <p style={{ fontWeight: 600 }}>No machinery found matching "{searchTerm}"</p>
                <p style={{ fontSize: '0.85rem' }}>Try searching "Concrete", "Compaction", "Mixer", or "Cutter".</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
