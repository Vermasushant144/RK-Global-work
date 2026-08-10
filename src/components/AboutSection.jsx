'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

const FALLBACK_IMG = '/images/img/ChatGPT Image Aug 8, 2026, 04_03_52 PM.png';

export default function AboutSection() {
  const { aboutData } = useData();
  const [imgError, setImgError] = useState(false);

  // Always use latest aboutData.image; fallback only on error
  const imageToDisplay = (!imgError && aboutData?.image) ? aboutData.image : FALLBACK_IMG;

  return (
    <section style={{ padding: '90px 0', backgroundColor: '#FFFFFF' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'center' }} className="about-grid">

          {/* Left Visual */}
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
                src={imageToDisplay}
                alt="About R K Global Engineering"
                onError={() => setImgError(true)}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Experience Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  right: '24px',
                  backgroundColor: '#F47B20',
                  color: '#FFFFFF',
                  padding: '16px 24px',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1 }}>{aboutData?.experienceBadgeText || '20+ YEARS'}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
                  {aboutData?.experienceBadgeSub || 'Manufacturing Excellence'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div>
            <div className="eyebrow">{aboutData?.eyebrow || 'OFFICIAL R.K. GLOBAL ENGINEERING'}</div>

            <h2 className="heading-lg" style={{ marginBottom: '18px' }}>
              {aboutData?.title || 'Two Decades of Engineering Excellence in Construction Machinery'}
            </h2>

            <p className="text-body" style={{ marginBottom: '24px', fontSize: '1rem', lineHeight: 1.65 }}>
              {aboutData?.subtitle || 'We combine heavy manufacturing precision with ISO 9001 quality controls to deliver rugged machinery contractors trust implicitly across India.'}
            </p>

            {/* Feature Points */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={22} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)' }}>
                    {aboutData?.feature1Title || 'Factory Direct Pricing & Transparent Warranty'}
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {aboutData?.feature1Desc || 'Eliminate middleman margins with ex-factory pricing and 1-year comprehensive warranty.'}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={22} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)' }}>
                    {aboutData?.feature2Title || 'Pan-India On-Site Technical Service Support'}
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {aboutData?.feature2Desc || 'Dedicated field engineering team for fast installation, operator training, and spare parts delivery.'}
                  </p>
                </div>
              </div>
            </div>

            <Link href="/about" className="btn btn-secondary">
              <span>Read Our Company Story</span>
              <ArrowRight size={16} />
            </Link>

          </div>

        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
