'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutSection() {
  const [imgSrc, setImgSrc] = useState('/images/img/Untitled design - 2026-02-02T154951.040.webp');

  const pillars = [
    { title: 'Quality Focus', desc: 'Dependable equipment suitable for demanding construction applications.' },
    { title: 'Wide Product Portfolio', desc: 'Rebar processing, compaction, concrete & flooring machinery under one roof.' },
    { title: 'Competitive Solutions', desc: 'Practical equipment solutions offering maximum value for investment.' },
    { title: 'Professional Assistance', desc: 'Expert guidance based on application, capacity, performance & budget.' },
  ];

  const handleImageError = () => {
    if (imgSrc !== '/images/rebar-bending.svg') {
      setImgSrc('/images/rebar-bending.svg');
    }
  };

  return (
    <section style={{ padding: '90px 0', backgroundColor: '#FFFFFF' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'center' }} className="about-grid">
          
          {/* Left Single Clean Image Visual */}
          <div style={{ position: 'relative' }}>
            <div 
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border-light)',
                position: 'relative',
                backgroundColor: '#F8FAFC',
                minHeight: '420px',
                display: 'flex',
                alignItems: 'center',
                justify: 'center'
              }}
            >
              <img 
                src={imgSrc} 
                alt="R.K. Global Engineering Machinery" 
                onError={handleImageError}
                style={{ width: '100%', height: '440px', objectFit: 'contain', display: 'block', padding: '16px' }}
              />

              {/* Tag Overlay */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  backgroundColor: 'rgba(11, 31, 51, 0.92)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
              >
                R.K. GLOBAL ENGINEERING
              </div>
            </div>

            {/* Accent badge overlay */}
            <div 
              style={{
                position: 'absolute',
                top: '-16px',
                right: '-16px',
                backgroundColor: 'var(--accent)',
                color: '#FFFFFF',
                padding: '12px 20px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 800,
                fontSize: '0.85rem',
                letterSpacing: '0.05em',
                boxShadow: 'var(--shadow-accent)',
                zIndex: 5
              }}
            >
              BUILDING TRUST
            </div>
          </div>

          {/* Right Content Box */}
          <div>
            <div className="eyebrow">ABOUT R.K. GLOBAL ENGINEERING</div>
            <h2 className="heading-md" style={{ marginBottom: '16px' }}>
              Engineering Equipment. <span style={{ color: 'var(--accent)' }}>Building Trust.</span>
            </h2>

            <p className="text-body" style={{ marginBottom: '18px', fontSize: '1rem', fontWeight: 600, color: 'var(--primary)' }}>
              R.K. GLOBAL ENGINEERING is a professionally managed company engaged in the manufacturing, supply, trading, retailing, and wholesaling of construction machinery and equipment across India.
            </p>

            <p className="text-body" style={{ marginBottom: '28px', fontSize: '0.925rem' }}>
              We provide practical and reliable equipment solutions for contractors, builders, infrastructure firms, civil engineering companies, dealers, and construction professionals. Our objective is simple — to provide the right equipment, at the right value, with dependable service.
            </p>

            {/* Why Choose Us Pillars Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
              {pillars.map((p) => (
                <div key={p.title} style={{ display: 'flex', gap: '12px' }}>
                  <CheckCircle2 size={20} style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary)', marginBottom: '2px' }}>{p.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/about" className="btn btn-secondary">
                <span>Discover Complete Profile</span>
                <ArrowRight size={16} />
              </Link>
            </div>

          </div>

        </div>
      </div>

      <style jsx>{`
        @media (max-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
