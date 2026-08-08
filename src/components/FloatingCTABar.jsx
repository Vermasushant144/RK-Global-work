'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, ArrowUp, Phone } from 'lucide-react';

export default function FloatingCTABar({ onOpenQuote }) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTop(true);
      } else {
        setShowTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="floating-widgets">
        {/* WhatsApp Direct Link */}
        <a 
          href="https://wa.me/919876543210?text=Hello%20INFRATECH,%20I%20am%20interested%20in%20learning%20more%20about%20your%20construction%20equipment."
          target="_blank" 
          rel="noopener noreferrer" 
          className="whatsapp-float-btn"
          title="Chat on WhatsApp"
          aria-label="WhatsApp Contact"
        >
          <MessageSquare size={26} />
        </a>

        {/* Back to Top */}
        {showTop && (
          <button 
            type="button" 
            className="back-to-top-btn"
            onClick={scrollToTop}
            title="Scroll to Top"
            aria-label="Scroll to Top"
          >
            <ArrowUp size={20} />
          </button>
        )}
      </div>

      {/* Sticky Mobile Quick Call / Quote Bar at Bottom */}
      <div className="mobile-cta-bottom-bar">
        <a href="tel:+919876543210" className="mobile-call-btn">
          <Phone size={18} />
          <span>Call Sales</span>
        </a>
        <button type="button" className="mobile-quote-btn" onClick={onOpenQuote}>
          Request Quote
        </button>
      </div>

      <style jsx>{`
        .mobile-cta-bottom-bar {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 95;
          background: var(--dark);
          padding: 10px 16px;
          gap: 12px;
          box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.2);
        }
        
        .mobile-call-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background-color: var(--primary-light);
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.85rem;
          padding: 10px;
          border-radius: var(--radius-sm);
          text-decoration: none;
        }

        .mobile-quote-btn {
          flex: 1;
          background-color: var(--accent);
          color: #FFFFFF;
          border: none;
          font-weight: 700;
          font-size: 0.85rem;
          padding: 10px;
          border-radius: var(--radius-sm);
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .mobile-cta-bottom-bar {
            display: flex;
          }
          .floating-widgets {
            bottom: 74px;
          }
        }
      `}</style>
    </>
  );
}
