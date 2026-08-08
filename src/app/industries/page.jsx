'use client';

import Link from 'next/link';
import { industries } from '../../data/industries';
import { ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';

export default function IndustriesPage() {
  return (
    <div style={{ backgroundColor: 'var(--bg-main)', paddingBottom: '100px' }}>
      <div style={{ backgroundColor: 'var(--primary)', color: '#FFFFFF', padding: '60px 0', borderBottom: '4px solid var(--accent)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem', color: '#94A3B8', marginBottom: '12px' }}>
            <Link href="/" style={{ color: '#94A3B8', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Industry Solutions</span>
          </div>
          <h1 className="heading-lg text-white" style={{ marginBottom: '12px' }}>
            Machinery Engineered for Specific Sectors
          </h1>
          <p style={{ color: '#CBD5E1', fontSize: '1.05rem', maxWidth: '640px' }}>
            Explore how our equipment delivers high output, low maintenance, and continuous performance across diverse construction sectors.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '60px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {industries.map((ind, i) => (
            <div 
              key={ind.id}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: i % 2 === 0 ? '1.2fr 1fr' : '1fr 1.2fr'
              }}
            >
              <div style={{ padding: '40px' }}>
                <div className="eyebrow">{ind.subtitle}</div>
                <h2 className="heading-md" style={{ marginBottom: '16px' }}>{ind.title}</h2>
                <p className="text-body" style={{ marginBottom: '24px' }}>{ind.description}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                  {ind.features.map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)' }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--accent)' }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <Link href="/products" className="btn btn-primary btn-sm">
                  <span>View Equipment for {ind.title}</span>
                  <ArrowRight size={15} />
                </Link>
              </div>

              <div style={{ height: '100%', minHeight: '320px' }}>
                <img src={ind.image} alt={ind.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
