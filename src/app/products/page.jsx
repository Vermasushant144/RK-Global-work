'use client';

import { useState } from 'react';
import Link from 'next/link';
import { products } from '../../data/products';
import { categories } from '../../data/categories';
import { Search, Eye, Send, Filter, ChevronRight } from 'lucide-react';

export default function ProductsPage() {
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCat === 'all' || p.category === selectedCat;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', paddingBottom: '100px' }}>
      
      {/* Page Hero Banner */}
      <div style={{ backgroundColor: 'var(--primary)', color: '#FFFFFF', padding: '60px 0', borderBottom: '4px solid var(--accent)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem', color: '#94A3B8', marginBottom: '12px' }}>
            <Link href="/" style={{ color: '#94A3B8', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Equipment Catalog</span>
          </div>
          <h1 className="heading-lg text-white" style={{ marginBottom: '12px' }}>
            Industrial Equipment Catalog
          </h1>
          <p style={{ color: '#CBD5E1', fontSize: '1.05rem', maxWidth: '640px' }}>
            Purpose-built machinery engineered for performance, durability and precision across demanding civil & infrastructure projects.
          </p>
        </div>
      </div>

      {/* Main Filter & Grid Container */}
      <div className="container" style={{ paddingTop: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '36px' }} className="catalog-layout">
          
          {/* Left Sidebar Filter */}
          <div>
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '24px', position: 'sticky', top: '90px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border-light)' }}>
                <Filter size={18} style={{ color: 'var(--accent)' }} />
                <span>Filter Categories</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedCat('all')}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    textAlign: 'left',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    backgroundColor: selectedCat === 'all' ? 'var(--accent)' : 'transparent',
                    color: selectedCat === 'all' ? '#FFFFFF' : 'var(--primary)',
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>All Equipment</span>
                  <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>({products.length})</span>
                </button>

                {categories.map((c) => {
                  const count = products.filter(p => p.category === c.id).length;
                  const isSel = selectedCat === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCat(c.id)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: 'none',
                        textAlign: 'left',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        backgroundColor: isSel ? 'var(--accent)' : 'transparent',
                        color: isSel ? '#FFFFFF' : 'var(--text-main)',
                        display: 'flex',
                        justify: 'space-between',
                        alignItems: 'center',
                        transition: 'var(--transition-fast)'
                      }}
                    >
                      <span>{c.name}</span>
                      <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Product Grid */}
          <div>
            {/* Top Search Bar */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '16px 20px', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Search size={20} style={{ color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search products by model code, name, specs (e.g. MX500, Mixer, Cutter)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'inherit',
                  fontSize: '0.95rem',
                  color: 'var(--primary)'
                }}
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 700 }}>
                  Clear
                </button>
              )}
            </div>

            {/* Catalog Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="catalog-grid">
              {filteredProducts.map((p) => (
                <div key={p.id} className="product-card">
                  <div className="product-thumb">
                    <img src={p.image} alt={p.name} />
                    <span className="product-code-badge">{p.code}</span>
                  </div>

                  <div className="product-content">
                    <h3 className="product-title">{p.name}</h3>

                    <div className="product-specs-list">
                      {p.keySpecs.map((s, idx) => (
                        <div key={idx} className="spec-item">
                          <span className="spec-key">{s.label}:</span>
                          <span className="spec-val">{s.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="product-card-actions">
                      <Link href={`/products/${p.id}`} className="btn btn-outline btn-sm" style={{ flex: 1 }}>
                        <Eye size={14} />
                        <span>Specs</span>
                      </Link>

                      <button 
                        type="button" 
                        className="btn btn-primary btn-sm" 
                        style={{ flex: 1 }}
                        onClick={() => {
                          if (typeof window !== 'undefined') {
                            window.dispatchEvent(new CustomEvent('openQuoteModal', { detail: p }));
                          }
                        }}
                      >
                        <Send size={14} />
                        <span>Quote</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <h3 className="heading-sm" style={{ marginBottom: '8px' }}>No machinery found</h3>
                <p className="text-body">Try selecting "All Equipment" or clearing search filters.</p>
              </div>
            )}

          </div>

        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .catalog-layout {
            grid-template-columns: 1fr !important;
          }
          .catalog-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .catalog-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
