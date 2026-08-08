'use client';

import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function QualitySection({ onOpenQuote }) {
  const qualityFeatures = [
    { title: 'Factory Tested', desc: '100% full-load pre-dispatch operational verification.' },
    { title: 'Durable Components', desc: 'Heavy alloy steel, branded motors & Japanese bearings.' },
    { title: 'Quality Inspected', desc: 'ISO 9001:2015 multi-stage quality assurance protocol.' },
    { title: 'Technical Support', desc: 'Pan-India direct mechanic response & spare parts SLAs.' },
  ];

  return (
    <section id="quality" style={{ backgroundColor: 'var(--primary)', color: '#FFFFFF', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background CAD grid */}
      <div className="tech-grid-dark" style={{ position: 'absolute', inset: 0, opacity: 0.15 }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }} className="quality-grid">
          
          {/* Left Narrative */}
          <div>
            <div className="eyebrow eyebrow-dark">QUALITY WITHOUT COMPROMISE</div>
            <h2 className="heading-md text-white" style={{ marginBottom: '20px' }}>
              Built with Precision. <br />
              <span style={{ color: 'var(--accent)' }}>Tested for Performance.</span>
            </h2>

            <p style={{ color: '#94A3B8', fontSize: '1.05rem', lineHeight: 1.65, marginBottom: '32px' }}>
              Every machine bearing the R K Global Engineering emblem is designed and manufactured under strict metallurgical and mechanical quality standards. Our engineering team conducts rigorous vibration analysis, hydraulic pressure checks, and thermal stress tests before dispatch.
            </p>

            {/* Checklist */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '36px' }}>
              {qualityFeatures.map((f) => (
                <div key={f.title} style={{ display: 'flex', gap: '12px' }}>
                  <CheckCircle2 size={22} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#FFFFFF', marginBottom: '2px' }}>
                      {f.title}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                      {f.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button type="button" className="btn btn-primary" onClick={onOpenQuote}>
              <span>Request Certified Spec Datasheet</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Right Image Visual */}
          <div style={{ position: 'relative' }}>
            <div 
              style={{
                position: 'absolute',
                top: '-15px',
                left: '-15px',
                width: '100%',
                height: '100%',
                border: '3px solid var(--accent)',
                borderRadius: 'var(--radius-lg)',
                zIndex: 0,
                opacity: 0.6
              }}
            />

            <div 
              style={{
                position: 'relative',
                zIndex: 1,
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000&auto=format&fit=crop" 
                alt="Quality Inspection of Construction Equipment" 
                style={{ width: '100%', height: '440px', objectFit: 'cover' }}
              />

              <div 
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  right: '24px',
                  backgroundColor: 'var(--dark)',
                  borderLeft: '4px solid var(--accent)',
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-sm)',
                  boxShadow: 'var(--shadow-lg)'
                }}
              >
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent)' }}>100%</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FFFFFF', textTransform: 'uppercase' }}>
                  Pre-Dispatch Quality Certified
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @media (max-width: 992px) {
          .quality-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
