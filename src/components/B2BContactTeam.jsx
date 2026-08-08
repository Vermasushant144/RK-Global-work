'use client';

import { PhoneCall, MessageSquare, Mail } from 'lucide-react';

export default function B2BContactTeam() {
  return (
    <section style={{ backgroundColor: '#FFFFFF', color: '#1E293B', padding: '70px 0', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        
        {/* Orange Eyebrow Badge matching user request */}
        <div 
          style={{
            display: 'inline-block',
            backgroundColor: 'rgba(244, 123, 32, 0.1)',
            color: '#F47B20',
            fontWeight: 800,
            fontSize: '0.725rem',
            letterSpacing: '0.14em',
            padding: '6px 16px',
            borderRadius: '20px',
            marginBottom: '14px',
            textTransform: 'uppercase',
            border: '1px solid rgba(244, 123, 32, 0.3)'
          }}
        >
          GET IN TOUCH
        </div>

        {/* Title */}
        <h2 style={{ fontSize: '2.3rem', fontWeight: 900, color: '#0B1F33', marginBottom: '8px', letterSpacing: '-0.02em' }}>
          Talk to Our B2B Team
        </h2>

        {/* Subtitle */}
        <p style={{ fontSize: '0.95rem', color: '#64748B', fontWeight: 600, marginBottom: '36px' }}>
          Mon – Sat | 9:00 AM – 6:00 PM
        </p>

        {/* 3 Contact Cards with Clean White & Orange Theme */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}
          className="contact-team-grid"
        >
          {/* Card 1: Call Us */}
          <a
            href="tel:+919876543210"
            style={{
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              padding: '28px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justify: 'center',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            className="team-card"
          >
            <PhoneCall size={32} style={{ color: '#F47B20', marginBottom: '12px' }} />
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0B1F33', marginBottom: '4px' }}>
              Call Us
            </div>
            <div style={{ fontSize: '0.9rem', color: '#F47B20', fontWeight: 700 }}>
              +91 98765 43210
            </div>
          </a>

          {/* Card 2: WhatsApp */}
          <a
            href="https://wa.me/919876543210?text=Hello%20R.K.%20Global%20Engineering%20B2B%20Team,%20I%20have%20an%20enquiry"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              padding: '28px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justify: 'center',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            className="team-card"
          >
            <MessageSquare size={32} style={{ color: '#F47B20', marginBottom: '12px' }} />
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0B1F33', marginBottom: '4px' }}>
              WhatsApp
            </div>
            <div style={{ fontSize: '0.9rem', color: '#F47B20', fontWeight: 700 }}>
              Chat on WhatsApp
            </div>
          </a>

          {/* Card 3: Email Us */}
          <a
            href="mailto:info@rkglobalengineering.com"
            style={{
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              padding: '28px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justify: 'center',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            className="team-card"
          >
            <Mail size={32} style={{ color: '#F47B20', marginBottom: '12px' }} />
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0B1F33', marginBottom: '4px' }}>
              Email Us
            </div>
            <div style={{ fontSize: '0.9rem', color: '#F47B20', fontWeight: 700 }}>
              info@rkglobalengineering.com
            </div>
          </a>
        </div>

      </div>

      <style jsx>{`
        .team-card:hover {
          background-color: #FFFFFF !important;
          border-color: #F47B20 !important;
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(244, 123, 32, 0.12) !important;
        }
        @media (max-width: 768px) {
          .contact-team-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
