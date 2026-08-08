'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { industries } from '../data/industries';

export default function IndustrySolutions() {
  return (
    <section style={{ padding: '100px 0', backgroundColor: '#FFFFFF' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '44px' }}>
          <div>
            <div className="eyebrow">INDUSTRY APPLICATIONS</div>
            <h2 className="heading-md">Solutions for Every Industry</h2>
          </div>
          <Link href="/industries" className="btn btn-outline btn-sm">
            <span>View All Sectors</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* 5 Industry Image Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }} className="industry-grid">
          {industries.map((ind) => (
            <Link key={ind.id} href="/industries" className="industry-card-item">
              <img src={ind.image} alt={ind.title} />
              
              <div className="industry-overlay">
                <div style={{ fontSize: '0.725rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: '4px' }}>
                  {ind.subtitle}
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px', lineHeight: 1.2 }}>
                  {ind.title}
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#CBD5E1', marginBottom: '14px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {ind.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: '#FFFFFF' }}>
                  <span>Explore Sector</span>
                  <ArrowRight size={14} style={{ color: 'var(--accent)' }} />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 1200px) {
          .industry-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .industry-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .industry-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
