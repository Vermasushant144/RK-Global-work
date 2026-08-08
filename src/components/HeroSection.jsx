'use client';

import Link from 'next/link';
import { ArrowRight, ShieldCheck, Award, Truck } from 'lucide-react';

export default function HeroSection({ onOpenQuote }) {
  return (
    <section className="tech-grid-bg" style={{ position: 'relative', overflow: 'hidden', padding: '80px 0 100px', backgroundColor: '#FFFFFF' }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }} className="hero-split-grid">
          
          {/* Left Column */}
          <div>
            <div className="eyebrow">ENGINEERING THE FUTURE OF CONSTRUCTION</div>
            
            <h1 className="heading-lg" style={{ marginBottom: '24px' }}>
              High-Performance Equipment <br />
              <span style={{ color: 'var(--accent)' }}>Built for Real-World Projects.</span>
            </h1>

            <p className="text-body" style={{ fontSize: '1.1rem', marginBottom: '36px', maxWidth: '540px' }}>
              Reliable construction equipment engineered for performance, durability and precision across demanding projects.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}>
              <Link href="/products" className="btn btn-primary">
                <span>Explore Products</span>
                <ArrowRight size={18} />
              </Link>
              <button type="button" className="btn btn-outline" onClick={onOpenQuote}>
                <span>Get a Quote</span>
                <ArrowRight size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', pt: '20px', borderTop: '1px solid var(--border-light)', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} style={{ color: 'var(--accent)' }} />
                <span>ISO 9001:2015 Certified</span>
              </div>
              <span>•</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Truck size={16} style={{ color: 'var(--accent)' }} />
                <span>Pan India Delivery</span>
              </div>
              <span>•</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Award size={16} style={{ color: 'var(--accent)' }} />
                <span>Onsite Support</span>
              </div>
            </div>
          </div>

          {/* Right Column with Product Hero Visual & CAD Accents */}
          <div style={{ position: 'relative' }}>
            {/* Orange Technical Geometry Line Graphic Behind Image */}
            <div 
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '100%',
                height: '100%',
                border: '2px dashed var(--accent)',
                borderRadius: 'var(--radius-lg)',
                zIndex: 0,
                opacity: 0.35
              }} 
            />

            {/* Main Equipment Hero Visual Container */}
            <div 
              style={{
                position: 'relative',
                zIndex: 1,
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border-light)',
                backgroundColor: '#FFFFFF'
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1200&auto=format&fit=crop" 
                alt="R K Global Heavy Industrial Construction Equipment" 
                style={{
                  width: '100%',
                  height: '480px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />

              {/* Dark subtle overlay tag */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  backgroundColor: 'rgba(11, 31, 51, 0.85)',
                  backdropFilter: 'blur(8px)',
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-sm)',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} />
                <span>Heavy Duty Series INF-MX500 Concrete Mixer</span>
              </div>
            </div>

            {/* Floating Spec Card 1: 25+ YEARS EXPERIENCE */}
            <div className="floating-spec-card" style={{ top: '30px', left: '-30px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                <Award size={22} />
              </div>
              <div>
                <div className="badge-stat-num">25+</div>
                <div className="badge-stat-lbl">Years Experience</div>
              </div>
            </div>

            {/* Floating Spec Card 2: 500+ MACHINES DELIVERED */}
            <div className="floating-spec-card floating-spec-card-2" style={{ bottom: '40px', right: '-20px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                <Truck size={22} />
              </div>
              <div>
                <div className="badge-stat-num">500+</div>
                <div className="badge-stat-lbl">Machines Delivered</div>
              </div>
            </div>

          </div>

        </div>
      </div>

      <style jsx>{`
        @media (max-width: 992px) {
          .hero-split-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .floating-spec-card {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
