'use client';

import Link from 'next/link';
import ContactSection from '../../components/ContactSection';
import { ChevronRight } from 'lucide-react';

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: 'var(--bg-main)' }}>
      {/* Banner */}
      <div style={{ backgroundColor: 'var(--primary)', color: '#FFFFFF', padding: '60px 0', borderBottom: '4px solid var(--accent)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem', color: '#94A3B8', marginBottom: '12px' }}>
            <Link href="/" style={{ color: '#94A3B8', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Contact & Tenders</span>
          </div>
          <h1 className="heading-lg text-white" style={{ marginBottom: '12px' }}>
            Contact Engineering Sales
          </h1>
          <p style={{ color: '#CBD5E1', fontSize: '1.05rem', maxWidth: '640px' }}>
            Get in touch with our technical machinery experts for site recommendations, direct ex-factory pricing, and tender support.
          </p>
        </div>
      </div>

      <ContactSection />
    </div>
  );
}
