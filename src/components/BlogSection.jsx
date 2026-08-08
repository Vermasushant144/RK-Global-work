'use client';

import Link from 'next/link';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { insights } from '../data/insights';

export default function BlogSection() {
  return (
    <section id="insights" style={{ padding: '100px 0', backgroundColor: '#FFFFFF' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 54px' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>TECHNICAL KNOWLEDGE</div>
          <h2 className="heading-md">Construction Industry Insights</h2>
          <p className="text-body" style={{ marginTop: '12px' }}>
            Expert guides on equipment maintenance, concrete mixing technology, and site safety standards.
          </p>
        </div>

        {/* 3 Editorial Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }} className="blog-grid">
          {insights.map((item) => (
            <article 
              key={item.id}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'var(--transition)'
              }}
              className="product-card"
            >
              <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                />
                <span 
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'var(--primary)',
                    color: 'var(--accent)',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '4px'
                  }}
                >
                  {item.category}
                </span>
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={13} />
                    <span>{item.date}</span>
                  </div>
                  <span>•</span>
                  <span>{item.readTime}</span>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', lineHeight: 1.35, marginBottom: '12px' }}>
                  {item.title}
                </h3>

                <p className="text-body" style={{ fontSize: '0.875rem', marginBottom: '20px' }}>
                  {item.excerpt}
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent)' }}>
                  <span>Read Article</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 992px) {
          .blog-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
