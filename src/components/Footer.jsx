'use client';

import Link from 'next/link';
import { ShieldCheck, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import Logo from './Logo';

export default function Footer({ onOpenQuote }) {
  return (
    <footer style={{ backgroundColor: 'var(--dark)', color: '#94A3B8', borderTop: '4px solid var(--accent)', paddingTop: '80px', paddingBottom: '30px' }}>
      <div className="container">
        
        {/* Main Footer Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1.2fr 1.2fr 1.4fr', gap: '40px', marginBottom: '60px' }} className="footer-grid">
          
          {/* Col 1: Brand Info */}
          <div>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', marginBottom: '20px' }}>
              <Logo width={220} height={60} lightMode={false} />
            </Link>

            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '24px', color: '#94A3B8' }}>
              R K Global Engineering is a premier Indian manufacturer and B2B supplier of high-performance construction machinery, concrete mixers, floor cutters, and soil compactors.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#E2E8F0', fontWeight: 700 }}>
              <ShieldCheck size={16} style={{ color: 'var(--accent)' }} />
              <span>ISO 9001:2015 CERTIFIED MANUFACTURER</span>
            </div>
          </div>

          {/* Col 2: Company */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, marginBottom: '20px', letterSpacing: '-0.01em' }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0 }}>
              <li><Link href="/about" className="footer-link">About Us</Link></li>
              <li><Link href="/about#story" className="footer-link">Our Story</Link></li>
              <li><Link href="/#quality" className="footer-link">Quality & Testing</Link></li>
              <li><Link href="/industries" className="footer-link">Industries Served</Link></li>
              <li><Link href="/#projects" className="footer-link">Major Projects</Link></li>
            </ul>
          </div>

          {/* Col 3: Products */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, marginBottom: '20px', letterSpacing: '-0.01em' }}>Equipment</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0 }}>
              <li><Link href="/products?category=concrete" className="footer-link">Concrete Equipment</Link></li>
              <li><Link href="/products?category=compaction" className="footer-link">Compaction Equipment</Link></li>
              <li><Link href="/products?category=cutting" className="footer-link">Cutting Equipment</Link></li>
              <li><Link href="/products?category=finishing" className="footer-link">Finishing Equipment</Link></li>
              <li><Link href="/products?category=road" className="footer-link">Road Machinery</Link></li>
            </ul>
          </div>

          {/* Col 4: Resources */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, marginBottom: '20px', letterSpacing: '-0.01em' }}>Resources</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0 }}>
              <li><Link href="/#insights" className="footer-link">Industry Insights</Link></li>
              <li><Link href="/products" className="footer-link">2026 Product Catalog</Link></li>
              <li><button type="button" onClick={onOpenQuote} className="footer-link-btn">Request Datasheets</button></li>
              <li><Link href="/contact" className="footer-link">Pan-India Support</Link></li>
              <li><Link href="/quote" className="footer-link">Quick Quote</Link></li>
            </ul>
          </div>

          {/* Col 5: Contact Info */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, marginBottom: '20px', letterSpacing: '-0.01em' }}>Direct Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.85rem' }}>
              <a href="tel:+919876543210" style={{ color: '#CBD5E1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} style={{ color: 'var(--accent)' }} />
                <span>+91 98765 43210</span>
              </a>
              <a href="mailto:info@rkglobalengineering.com" style={{ color: '#CBD5E1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={15} style={{ color: 'var(--accent)' }} />
                <span>info@rkglobalengineering.com</span>
              </a>
              <div style={{ color: '#94A3B8', display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: 1.4 }}>
                <MapPin size={15} style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }} />
                <span>Plot No. 42, Phase II, Industrial Area, New Delhi - 110020</span>
              </div>
              <button 
                type="button" 
                className="btn btn-primary btn-sm" 
                onClick={onOpenQuote}
                style={{ marginTop: '10px' }}
              >
                <span>Request B2B Quote</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Legal Strip */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '0.78rem' }}>
          <div style={{ color: '#94A3B8' }}>
            © {new Date().getFullYear()} R K Global Engineering. All rights reserved. Engineering Solutions. Building A Better Tomorrow.
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <Link href="/privacy" className="footer-link">Privacy Policy</Link>
            <Link href="/terms" className="footer-link">Terms & Conditions</Link>
            <Link href="/sitemap" className="footer-link">Sitemap</Link>
          </div>
        </div>

      </div>

      <style jsx>{`
        .footer-link, .footer-link:visited {
          color: #CBD5E1 !important;
          text-decoration: none !important;
          font-size: 0.875rem;
          transition: var(--transition-fast);
        }
        .footer-link:hover, .footer-link:active {
          color: var(--accent) !important;
        }
        .footer-link-btn {
          background: none;
          border: none;
          padding: 0;
          font-family: inherit;
          color: #CBD5E1 !important;
          font-size: 0.875rem;
          cursor: pointer;
          transition: var(--transition-fast);
          text-align: left;
        }
        .footer-link-btn:hover {
          color: var(--accent) !important;
        }
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
