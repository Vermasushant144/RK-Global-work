'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Eye, Send } from 'lucide-react';
import { products } from '../data/products';

export default function FeaturedProducts({ onOpenQuote }) {
  const [activeTab, setActiveTab] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All Equipment' },
    { id: 'concrete', label: 'Concrete' },
    { id: 'compaction', label: 'Compaction' },
    { id: 'cutting', label: 'Cutting' },
    { id: 'finishing', label: 'Finishing' },
  ];

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <section style={{ padding: '100px 0', backgroundColor: '#FFFFFF' }}>
      <div className="container">
        
        {/* Header & Category Filter Tabs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
          <div>
            <div className="eyebrow">OUR RANGE</div>
            <h2 className="heading-md">Engineered Products</h2>
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '8px 18px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--accent)' : 'var(--border-light)',
                    backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                    color: isActive ? '#FFFFFF' : 'var(--primary)',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4-Column Product Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }} className="products-grid">
          {filteredProducts.map((p) => (
            <div key={p.id} className="product-card">
              <div className="product-thumb">
                <img src={p.image} alt={p.name} />
                <span className="product-code-badge">{p.code}</span>
              </div>

              <div className="product-content">
                <h3 className="product-title">{p.name}</h3>

                {/* Key Specs */}
                <div className="product-specs-list">
                  {p.keySpecs.map((spec, i) => (
                    <div key={i} className="spec-item">
                      <span className="spec-key">{spec.label}:</span>
                      <span className="spec-val">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Card Actions */}
                <div className="product-card-actions">
                  <Link href={`/products/${p.id}`} className="btn btn-outline btn-sm" style={{ flex: 1 }}>
                    <Eye size={14} />
                    <span>Details</span>
                  </Link>

                  <button 
                    type="button" 
                    className="btn btn-primary btn-sm" 
                    style={{ flex: 1 }}
                    onClick={() => onOpenQuote(p)}
                  >
                    <Send size={14} />
                    <span>Quote</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products CTA */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link href="/products" className="btn btn-secondary">
            <span>View Complete 2026 Equipment Catalog</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 1200px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 900px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 580px) {
          .products-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
