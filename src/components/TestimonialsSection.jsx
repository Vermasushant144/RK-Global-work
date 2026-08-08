'use client';

import { Star, Quote, ShieldCheck } from 'lucide-react';

export default function TestimonialsSection() {
  const clientLogos = [
    { name: 'LARSEN & TOUBRO', code: 'L&T Construction' },
    { name: 'SHAPOORJI PALLONJI', code: 'SP Group' },
    { name: 'AFCONS INFRASTRUCTURE', code: 'Shapoorji' },
    { name: 'MEIL GROUP', code: 'Megha Infra' },
    { name: 'KEC INTERNATIONAL', code: 'RPG Group' }
  ];

  return (
    <section style={{ padding: '100px 0', backgroundColor: '#FFFFFF' }}>
      <div className="container">
        
        {/* Section Title */}
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>CLIENT TRUST</div>
          <h2 className="heading-md">Trusted by Leading Infrastructure Developers</h2>
        </div>

        {/* Testimonial Box */}
        <div style={{ maxWidth: '880px', margin: '0 auto 60px' }} className="testimonial-card-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Quote size={36} style={{ color: 'var(--accent)', opacity: 0.8 }} />
            <div style={{ display: 'flex', gap: '4px', color: '#F59E0B' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#F59E0B" />
              ))}
            </div>
          </div>

          <blockquote style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', fontWeight: 700, color: 'var(--primary)', lineHeight: 1.4, marginBottom: '28px' }}>
            "R K Global Engineering supplied 12 heavy concrete mixers and floor cutters for our Delhi Metro Phase 4 site. Their machine reliability and prompt on-site technician support ensured zero breakdown delays across a 14-month concreting schedule."
          </blockquote>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', paddingTop: '20px', borderTop: '1px solid var(--border-light)' }}>
            <div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary)' }}>Rakesh Verma</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Senior Project Manager • ABC Infrastructure Ltd</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent)', backgroundColor: 'var(--accent-light)', padding: '6px 14px', borderRadius: 'var(--radius-sm)' }}>
              <ShieldCheck size={16} />
              <span>Verified B2B Client</span>
            </div>
          </div>
        </div>

        {/* Client Logos Strip */}
        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '40px' }}>
          <div style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.12em', color: 'var(--text-light)', textAlign: 'center', marginBottom: '28px' }}>
            EQUIPMENT TRUSTED BY TOP INFRASTRUCTURE CONTRACTORS
          </div>

          <div className="client-logo-grid">
            {clientLogos.map((logo) => (
              <div key={logo.name} className="client-logo-item">
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} />
                <span>{logo.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
