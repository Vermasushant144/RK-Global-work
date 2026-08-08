'use client';

import Link from 'next/link';
import { Tag, ArrowRight } from 'lucide-react';
import { products } from '../data/products';

export default function TopSellingProducts({ onOpenQuote }) {
  const topProducts = products.filter(p => p.isTopSelling).slice(0, 6);

  return (
    <section style={{ padding: '80px 0', backgroundColor: '#F8FAFC' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px' }}>
          <div 
            style={{
              display: 'inline-block',
              backgroundColor: 'rgba(244, 123, 32, 0.1)',
              color: '#F47B20',
              fontWeight: 800,
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              padding: '5px 14px',
              borderRadius: '4px',
              marginBottom: '14px',
              textTransform: 'uppercase',
              border: '1px solid rgba(244, 123, 32, 0.2)'
            }}
          >
            B2B SUPPLY
          </div>

          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0B1F33', marginBottom: '10px', letterSpacing: '-0.02em' }}>
            Top Selling Products
          </h2>

          <p style={{ fontSize: '1rem', color: '#64748B', lineHeight: 1.5 }}>
            Available for bulk orders with factory-direct pricing and Pan India delivery
          </p>
        </div>

        {/* 4-Column / 3-Column Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '48px' }} className="top-selling-grid">
          {topProducts.map((prod) => (
            <div 
              key={prod.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                transition: 'all 0.3s ease'
              }}
              className="top-product-card"
            >
              {/* Product Thumbnail Header Area */}
              <div 
                style={{
                  height: '210px',
                  backgroundColor: '#F8FAFC',
                  borderBottom: '1px solid #F1F5F9',
                  padding: '16px',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center'
                }}
              >
                <div 
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    color: '#F47B20',
                    letterSpacing: '0.05em'
                  }}
                >
                  RK GLOBAL
                </div>

                <img 
                  src={prod.image} 
                  alt={prod.name} 
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                />
              </div>

              {/* Product Content */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    color: '#1E293B',
                    lineHeight: 1.35,
                    marginBottom: '10px',
                    minHeight: '40px'
                  }}
                >
                  {prod.name}
                </h3>

                {/* Price Tag */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 700, color: '#475569', marginBottom: '20px' }}>
                  <Tag size={14} style={{ color: '#F47B20' }} />
                  <span>{prod.priceFormatted}</span>
                </div>

                {/* Buttons Row (View & Get Quote) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: 'auto' }}>
                  <Link 
                    href={`/products/${prod.id}`}
                    style={{
                      border: '1px solid #F47B20',
                      color: '#F47B20',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '4px',
                      padding: '8px',
                      textAlign: 'center',
                      fontWeight: 700,
                      fontSize: '0.825rem',
                      textDecoration: 'none'
                    }}
                    className="top-view-btn"
                  >
                    View
                  </Link>

                  <button
                    type="button"
                    onClick={() => onOpenQuote(prod)}
                    style={{
                      backgroundColor: '#F47B20',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '8px',
                      fontWeight: 700,
                      fontSize: '0.825rem',
                      cursor: 'pointer'
                    }}
                    className="top-quote-btn"
                  >
                    Get Quote
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom Center CTA Button */}
        <div style={{ textAlign: 'center' }}>
          <Link 
            href="/products" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#F47B20',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.925rem',
              padding: '14px 28px',
              borderRadius: '6px',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              boxShadow: '0 4px 14px rgba(244, 123, 32, 0.3)'
            }}
            className="top-view-all-btn"
          >
            <span>VIEW ALL PRODUCTS</span>
            <ArrowRight size={18} />
          </Link>
        </div>

      </div>

      <style jsx>{`
        .top-product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(244, 123, 32, 0.12) !important;
          border-color: #F47B20 !important;
        }
        .top-view-btn:hover {
          background-color: rgba(244, 123, 32, 0.05) !important;
        }
        .top-quote-btn:hover {
          background-color: #E0670F !important;
        }
        .top-view-all-btn:hover {
          background-color: #E0670F !important;
        }
        @media (max-width: 1100px) {
          .top-selling-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .top-selling-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 500px) {
          .top-selling-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
