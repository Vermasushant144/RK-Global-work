'use client';

import { ArrowRight, PhoneCall } from 'lucide-react';

export default function FullWidthCTA({ onOpenQuote }) {
  return (
    <section 
      style={{
        position: 'relative',
        padding: '110px 0',
        backgroundImage: `linear-gradient(rgba(11, 31, 51, 0.88), rgba(11, 31, 51, 0.94)), url('https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1600&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#FFFFFF',
        textAlign: 'center'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '760px' }}>
        <div className="eyebrow eyebrow-dark" style={{ justifyContent: 'center' }}>FAST B2B QUOTATION & PROCUREMENT</div>
        
        <h2 className="heading-lg text-white" style={{ marginBottom: '20px' }}>
          Ready to Build Better?
        </h2>

        <p style={{ fontSize: '1.15rem', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '36px' }}>
          Tell us what your project needs. We'll help you choose the right equipment, calculate batch capacities, and deliver ex-factory pricing across India.
        </p>

        <div style={{ display: 'flex', gap: '18px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-primary" onClick={onOpenQuote}>
            <span>Request a Quote</span>
            <ArrowRight size={18} />
          </button>

          <a href="tel:+919876543210" className="btn btn-outline-white">
            <PhoneCall size={18} />
            <span>Talk to an Expert</span>
          </a>
        </div>
      </div>
    </section>
  );
}
